import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      {/* Progressive Blur background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/0 via-background/50 to-background/0 blur-3xl" />

      <Dock className="relative z-50 pointer-events-auto h-12 p-1.5 w-fit mx-auto flex gap-1.5 bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5 border border-border">
        
        {/* NAV ITEMS */}
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-110 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full"
                >
                  <DockIcon className="cursor-pointer size-9 bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border">
                    <item.icon className="size-5 object-contain" />
                  </DockIcon>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className="tooltip-style">
                <AnimatedShinyText>{item.label}</AnimatedShinyText>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}

        <Separator orientation="vertical" className="separator-style" />

        {/* CONTACT BUTTON */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/contact">
              <RainbowButton className="h-9 px-3 rounded-2xl gap-1.5">
                <Mail className="h-3.5 w-3.5" />
              </RainbowButton>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className="tooltip-style">
            <AnimatedShinyText>Get in touch</AnimatedShinyText>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="separator-style" />

        {/* SOCIAL ICONS */}
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;

            return (
              <Tooltip key={`social-${name}-${index}`}>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-110 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full"
                  >
                    <DockIcon className="cursor-pointer size-9 bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border">
                      <IconComponent className="size-5 object-contain" />
                    </DockIcon>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} className="tooltip-style">
                  <AnimatedShinyText>{name}</AnimatedShinyText>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            );
          })}

        <Separator orientation="vertical" className="separator-style" />

        {/* THEME TOGGLER (UPDATED) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-110 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full">
              
              <DockIcon className="cursor-pointer size-9 flex items-center justify-center bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border">
                <AnimatedThemeToggler className="w-4 h-4" />
              </DockIcon>

            </div>
          </TooltipTrigger>

          <TooltipContent side="top" sideOffset={8} className="tooltip-style">
            <AnimatedShinyText>Theme</AnimatedShinyText>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>

      </Dock>
    </div>
  );
}