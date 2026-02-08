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
      title: "FinFraudX",
      description: "An AI-powered fraud detection platform that uses machine learning to identify suspicious transactions in real-time. Featuring a modern glassmorphism UI with interactive dashboards, risk calculators, and multi-layer security verification.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      tags: ["React", "Python", "AI", "Fraud Detection"],
      projectUrl: "https://github.com/saicharan1203/FinFraudX",
      githubUrl: "https://github.com/saicharan1203/FinFraudX"
    });

    await storage.createProject({
      title: "CareerVista-AI",
      description: "A scalable web platform for real-time career guidance recommendations. Built with RESTful APIs to handle user data, real-time exam info, and recommendation logic.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
      tags: ["Python", "Flask", "React", "MongoDB"],
      projectUrl: null,
      githubUrl: null
    });

    await storage.createProject({
      title: "Online Grocery Store",
      description: "Full-stack e-commerce application with user authentication, product catalog, cart, and order management. Features secure checkout and database-backed inventory.",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      tags: ["Python", "Flask", "SQL", "Auth"],
      projectUrl: null,
      githubUrl: null
    });

    await storage.createProject({
      title: "Facial Expression Recognition System",
      description: "Real-time emotion analysis system using Flask, DeepFace, and MediaPipe. Designed with privacy features and optimized for social media engagement analysis.",
      imageUrl: "https://images.unsplash.com/photo-1485796826113-174aa68fd81b?w=800&q=80",
      tags: ["Python", "Flask", "DeepFace", "MediaPipe"],
      projectUrl: null,
      githubUrl: null
    });

    await storage.createProject({
      title: "Brain Tumor Detection",
      description: "Deep learning-based detection system using MSCNN and image processing tools like OpenCV and MATLAB. Improved accuracy for medical image analysis.",
      imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
      tags: ["Deep Learning", "MSCNN", "OpenCV", "MATLAB"],
      projectUrl: null,
      githubUrl: null
    });

    await storage.createProject({
      title: "AI Student Performance Tracker",
      description: "Power BI dashboard integrated with AI models to predict students at risk of low performance. Helps institutions make data-driven decisions.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["Power BI", "AI", "Data Science"],
      projectUrl: null,
      githubUrl: null
    });

    // Seed Skills
    const skills = [
      { name: "Python", category: "Backend", proficiency: 90 },
      { name: "SQL", category: "Backend", proficiency: 85 },
      { name: "Machine Learning", category: "AI/ML", proficiency: 80 },
      { name: "Power BI", category: "Tools", proficiency: 85 },
      { name: "Excel", category: "Tools", proficiency: 90 },
      { name: "Flask", category: "Backend", proficiency: 85 },
      { name: "React", category: "Frontend", proficiency: 75 },
      { name: "HTML/CSS", category: "Frontend", proficiency: 80 },
      { name: "Java", category: "Backend", proficiency: 70 },
      { name: "OpenCV", category: "AI/ML", proficiency: 75 },
      { name: "TensorFlow", category: "AI/ML", proficiency: 70 },
      { name: "PyTorch", category: "AI/ML", proficiency: 65 },
    ];

    for (const skill of skills) {
      await storage.createSkill(skill);
    }
  }
}
