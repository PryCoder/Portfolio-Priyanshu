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

export default function HackathonsSection() {
  const totalHackathons = DATA.hackathons.length;

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
                <span className="text-primary text-sm font-medium">🏆</span>
                <span className="text-primary text-sm font-medium">Hackathons</span>
                <span className="text-primary/60 text-xs">(</span>
                <NumberTicker
                  value={totalHackathons}
                  className="text-primary text-sm font-bold"
                />
                <span className="text-primary/60 text-xs">+)</span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-primary/50 via-95% to-transparent" />
            </div>

            <div className="flex flex-col gap-y-3 items-center justify-center">
              <WordRotate
                words={[
                  "I like building things",
                  "I love creating solutions",
                  "I enjoy team collaboration",
                  "I thrive under pressure",
                ]}
                className="text-3xl font-bold tracking-tighter sm:text-4xl text-center"
              />
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center max-w-2xl">
                During my time in university, I attended{" "}
                <span className="font-bold text-primary">
                  <NumberTicker value={totalHackathons} />
                </span>{" "}
                hackathons. People from around the country would come together and
                build incredible things in 2-3 days. It was eye-opening to see the 
                endless possibilities brought to life by a group of motivated and 
                passionate individuals.
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

          {/* Call to Action with hover effect */}
     
        </div>
      </div>
    </section>
  );
}