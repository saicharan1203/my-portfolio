import { db } from "./db";
import {
  projects, skills, messages,
  type Project, type InsertProject,
  type Skill, type InsertSkill,
  type InsertMessage, type Message
} from "@shared/schema";
import { eq } from "drizzle-orm"; // Keep for future use or if needed

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(projects).orderBy(projects.id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    if (!db) throw new Error("Database not initialized");
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async getSkills(): Promise<Skill[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(skills);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    if (!db) throw new Error("Database not initialized");
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    if (!db) throw new Error("Database not initialized");
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
}

export class MemStorage implements IStorage {
  private projects: Project[] = [];
  private skills: Skill[] = [];
  private messages: Message[] = [];
  private currentProjectId = 1;
  private currentSkillId = 1;
  private currentMessageId = 1;

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
      projectUrl: insertProject.projectUrl || null,
      githubUrl: insertProject.githubUrl || null,
      tags: insertProject.tags || null,
    };
    this.projects.push(project);
    return project;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    // Ensure proficiency is a number to match the type, defaulting gracefully
    const proficiency = insertSkill.proficiency ?? 0;
    const id = this.currentSkillId++;
    const skill: Skill = { ...insertSkill, id, proficiency };
    this.skills.push(skill);
    return skill;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = { ...insertMessage, id, createdAt: new Date() };
    this.messages.push(message);
    return message;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
