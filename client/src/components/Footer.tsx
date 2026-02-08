import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/saicharan1203", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/koka-venkata-sai-charan-1a371a273/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kokacharan2003@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="p-3 rounded-full bg-secondary/30 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevPortfolio. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">
          Built with React, Tailwind & Framer Motion
        </p>
      </div>
    </footer>
  );
}
