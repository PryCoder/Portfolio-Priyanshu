"use client";
import React, { useId, useEffect, useState, useRef } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Container, Engine } from "@tsparticles/engine";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  
  const [isReady, setIsReady] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const init = async () => {
      // Create a dummy engine object for loadSlim
      const dummyEngine = {} as Engine;
      await loadSlim(dummyEngine);
      setIsReady(true);
    };
    init();
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      await controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  if (!isReady) {
    return <div className={cn("h-full w-full", className)} />;
  }
  
  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      <Particles
        id={id || generatedId}
        className={cn("h-full w-full")}
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: background || "transparent",
            },
          },
          fullScreen: {
            enable: false,
            zIndex: 1,
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: particleColor || "#ffffff",
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "out",
              },
              random: true,
              speed: {
                min: 0.5,
                max: 2,
              },
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: particleDensity || 80,
            },
            opacity: {
              value: {
                min: 0.3,
                max: 0.8,
              },
              animation: {
                enable: true,
                speed: speed || 2,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: {
                min: minSize || 1,
                max: maxSize || 3,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
};