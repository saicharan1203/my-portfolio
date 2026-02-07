import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="relative group p-4 rounded-xl bg-secondary/30 border border-white/5 hover:bg-secondary/50 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-white group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          {skill.proficiency}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}
