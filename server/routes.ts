import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Skills
  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Seed Projects
    await storage.createProject({
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, secure payments, and an intuitive admin dashboard.",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com"
    });
    
    await storage.createProject({
      title: "Task Management App",
      description: "Collaborative task manager helping teams organize and prioritize work with Kanban boards and real-time updates.",
      imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
      tags: ["TypeScript", "Next.js", "Tailwind CSS"],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com"
    });

    await storage.createProject({
      title: "AI Content Generator",
      description: "Leveraging large language models to assist writers in creating high-quality blog posts and marketing copy.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      tags: ["Python", "FastAPI", "OpenAI", "React"],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com"
    });

    // Seed Skills
    const skills = [
      { name: "React", category: "Frontend", proficiency: 90 },
      { name: "TypeScript", category: "Frontend", proficiency: 85 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 95 },
      { name: "Node.js", category: "Backend", proficiency: 80 },
      { name: "PostgreSQL", category: "Backend", proficiency: 75 },
      { name: "Python", category: "Backend", proficiency: 70 },
      { name: "Git", category: "Tools", proficiency: 90 },
      { name: "Docker", category: "Tools", proficiency: 65 },
      { name: "AWS", category: "Tools", proficiency: 60 },
    ];

    for (const skill of skills) {
      await storage.createSkill(skill);
    }
  }
}
