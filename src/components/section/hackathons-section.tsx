/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import { NumberTicker } from "@/components/ui/number-ticker";
import { WordRotate } from "@/components/ui/word-rotate";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Vortex } from "@/components/ui/vortex";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import LogoLoop from "../LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiDocker, SiGit, SiGithub } from 'react-icons/si';

export default function HackathonsSection() {
  const totalHackathons = DATA.hackathons.length;

  // Tech stack logos for the loop
  const techLogos = [
    { node: <SiReact className="w-8 h-8 text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="w-8 h-8 text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="w-8 h-8 text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs className="w-8 h-8 text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiMongodb className="w-8 h-8 text-[#47A248]" />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiPostgresql className="w-8 h-8 text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiDocker className="w-8 h-8 text-[#2496ED]" />, title: "Docker", href: "https://www.docker.com" },
    { node: <SiGit className="w-8 h-8 text-[#F05032]" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub className="w-8 h-8 text-black dark:text-white" />, title: "GitHub", href: "https://github.com" },
  ];

  return (
    <section id="hackathons" className="overflow-hidden relative min-h-screen">
      {/* Vortex as full background */}
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={300}
        baseHue={200}
        className="fixed inset-0 w-full h-full z-0"
      />

      <div className="relative z-10 py-12 px-4">
        <div className="flex min-h-0 flex-col gap-y-8 w-full max-w-6xl mx-auto">
          <div className="flex flex-col gap-y-4 items-center justify-center">
            {/* Animated badge with NumberTicker */}
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-primary/50 via-95% to-transparent" />
              <div className="border bg-primary/10 backdrop-blur-sm z-10 rounded-xl px-4 py-1 flex items-center gap-2">
                <span className="text-primary text-sm font-medium">💻</span>
                <span className="text-primary text-sm font-medium">Hackathons</span>
                <span className="text-primary/60 text-xs">(</span>
                <NumberTicker
                  value={totalHackathons}
                  className="text-primary text-sm font-bold"
                />
                <span className="text-primary/60 text-xs">)</span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-primary/50 via-95% to-transparent" />
            </div>

            <div className="flex flex-col gap-y-3 items-center justify-center">
              <WordRotate
                words={[
                  "Learning through building",
                  "Growing with every challenge",
                  "Collaboration is key",
                  "Embracing the journey",
                ]}
                className="text-3xl font-bold tracking-tighter sm:text-4xl text-center"
              />
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center max-w-2xl">
                During my time in university, I participated in{" "}
                <span className="font-bold text-primary">
                  <NumberTicker value={totalHackathons} />
                </span>{" "}
                hackathons. It was an incredible experience collaborating with
                talented people from around the country, learning to build
                solutions under time pressure, and seeing how teamwork can bring
                ideas to life.
              </p>
            </div>
          </div>

          <Timeline>
            {DATA.hackathons.map((hackathon, idx) => (
              <TimelineItem 
                key={hackathon.title + hackathon.dates} 
                className="w-full flex items-start justify-between gap-10 group"
              >
                <TimelineConnectItem className="flex items-start justify-center">
                  <div className="size-12 z-10 shrink-0 overflow-hidden rounded-full shadow-lg ring-2 ring-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {hackathon.image ? (
                      <img
                        src={hackathon.image}
                        alt={hackathon.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-2xl">🚀</span>
                    )}
                  </div>
                </TimelineConnectItem>
                
                <div className="flex flex-1 flex-col justify-start gap-2 min-w-0 relative">
                  {/* BorderBeam effect on hover */}
                  <div className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <BorderBeam size={200} duration={8} delay={idx * 2} />
                  </div>
                  
                  {hackathon.dates && (
                    <time className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>📅</span> {hackathon.dates}
                    </time>
                  )}
                  
                  {hackathon.title && (
                    <h3 className="font-semibold leading-none text-lg group-hover:text-primary transition-colors">
                      {hackathon.title}
                    </h3>
                  )}
                  
                  {hackathon.location && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>📍</span> {hackathon.location}
                    </p>
                  )}
                  
                  {hackathon.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                      {hackathon.description}
                    </p>
                  )}
                  
                  {hackathon.links && hackathon.links.length > 0 && (
                    <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                      {hackathon.links.map((link: { href: string; icon: React.ReactNode; title: string }, linkIdx) => (
                        <Link
                          href={link.href}
                          key={linkIdx}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ShimmerButton className="h-7 px-3 text-xs gap-1.5">
                            {link.icon}
                            {link.title}
                          </ShimmerButton>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>

      {/* Simple LogoLoop Section - Just one loop */}
      <div className="relative z-10 mt-16 mb-8 w-full">
        <div className="max-w-7xl mx-auto px-4">
          {/* Optional: Small label above the loop */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="inline-block w-8 h-px bg-primary/30"></span>
              <span>Built with modern tools</span>
              <span className="inline-block w-8 h-px bg-primary/30"></span>
            </p>
          </div>

          {/* Single Logo Loop */}
          <div className="relative rounded-2xl bg-background/30 backdrop-blur-sm border border-border/30 p-6">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={50}
              gap={48}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              ariaLabel="Technologies used in hackathons"
              className="py-2"
            />
          </div>

          {/* Optional: Small footer note */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground/60">
              Continuously learning and exploring new technologies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}