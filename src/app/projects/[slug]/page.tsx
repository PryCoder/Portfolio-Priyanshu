import { MagicCard } from "@/components/ui/magic-card";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { RainbowButton } from "@/components/ui/rainbow-button";

const project = {
  title: "EpicShot",
  description:
    "A modern social media platform for creators with real-time sharing, media editing, and community engagement features.",
  video: "/videos/epicshot-demo.mp4",
  tech: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
  github: "#",
  live: "#",
};

export default function ProjectPage() {
  return (
    <div className="min-h-screen px-6 py-20 max-w-6xl mx-auto">

      {/* 🔥 Title */}
      <AnimatedGradientText className="text-4xl font-bold mb-6">
        {project.title}
      </AnimatedGradientText>

      {/* 🎥 Video Preview */}
      <div className="mb-10">
        <HeroVideoDialog
          videoSrc={project.video}
          thumbnailSrc="/images/epicshot.png"
          className="rounded-2xl"
        />
      </div>

      {/* ✨ Description Card */}
      <MagicCard className="p-6 mb-10">
        <p className="text-muted-foreground text-lg">
          {project.description}
        </p>
      </MagicCard>

      {/* ⚙️ Tech Stack */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
        <AnimatedList>
          {project.tech.map((tech, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-muted rounded-xl text-sm"
            >
              {tech}
            </div>
          ))}
        </AnimatedList>
      </div>

      {/* 🚀 Buttons */}
      <div className="flex gap-4">
        <RainbowButton asChild>
          <a href={project.github} target="_blank">GitHub</a>
        </RainbowButton>

        <RainbowButton asChild>
          <a href={project.live} target="_blank">Live Demo</a>
        </RainbowButton>
      </div>

    </div>
  );
}