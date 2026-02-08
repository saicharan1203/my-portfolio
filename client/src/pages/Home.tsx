import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useProjects, useSkills } from "@/hooks/use-portfolio";
import { ArrowDown, Code2, Database, Layout, Sparkles, FileSpreadsheet } from "lucide-react";
import {
  SiPython, SiNodedotjs, SiReact, SiMongodb, SiPostgresql,
  SiOpencv, SiTensorflow, SiPytorch, SiFlask, SiHtml5,
  SiTypescript, SiJavascript
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skillIcons: Record<string, React.ElementType> = {
  "Python": SiPython,
  "Node.js": SiNodedotjs,
  "React": SiReact,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "SQL": SiPostgresql,
  "OpenCV": SiOpencv,
  "TensorFlow": SiTensorflow,
  "PyTorch": SiPytorch,
  "Flask": SiFlask,
  "HTML/CSS": SiHtml5,
  "Java": FaJava,
  "Power BI": FileSpreadsheet, // Using Lucide icon as fallback
  "Excel": FileSpreadsheet,    // Using Lucide icon as fallback
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,
  "Machine Learning": Sparkles, // Fallback to Lucide icon for generic concept
};

export default function Home() {
  const { data: projects = [], isLoading: loadingProjects } = useProjects();
  const { data: skills = [], isLoading: loadingSkills } = useSkills();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-indigo-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <img
                  src="/profile.png"
                  alt="Koka Venkata Sai Charan"
                  className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white/10 shadow-2xl"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium tracking-wide text-primary-foreground/80 uppercase">Available for work</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight">
              Koka Venkata <br />
              <span className="text-gradient-primary">Sai Charan</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              B.Tech Graduate in CSE with Data Science. Passionate about turning data into actionable insights and building intelligent systems that solve real-world problems.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#projects"
                className="px-8 py-4 rounded-xl font-semibold bg-white text-black hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Technical Arsenal
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          {loadingSkills ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-40 bg-card/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {category === "Frontend" && <Layout className="w-6 h-6" />}
                      {category === "Backend" && <Database className="w-6 h-6" />}
                      {category === "Tools" && <Code2 className="w-6 h-6" />}
                      {!["Frontend", "Backend", "Tools"].includes(category) && <Sparkles className="w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-bold">{category}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {categorySkills.map((skill, index) => (
                      <SkillBadge
                        key={skill.id}
                        skill={skill}
                        index={index}
                        icon={skillIcons[skill.name]}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-secondary/5 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Selected Work
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground max-w-md text-sm md:text-base">
              A collection of projects that showcase my passion for design and engineering.
            </p>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="aspect-video bg-card/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Let's work together
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and interesting ideas.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary shrink-0">
                    <Layout className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-sm text-muted-foreground break-all">kokacharan2003@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-sm text-muted-foreground">+91 6301550164</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      136, 2nd Avenue, Teacher's Colony, Jakkasandra,<br />
                      1st Block Koramangala, HSR Layout 5th Sector,<br />
                      Bengaluru, Karnataka 560034, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-white/5 p-8 rounded-3xl shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
