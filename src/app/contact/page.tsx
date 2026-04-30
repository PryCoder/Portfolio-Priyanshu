// app/contact/page.tsx
"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Meteors } from "@/components/ui/meteors";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <Meteors number={15} />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Section with BlurFade */}
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">Let's Connect</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-primary/60 bg-clip-text text-transparent">
                Get In Touch
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Have a project in mind? I'd love to hear about it. Let's create something amazing together.
              </p>
            </div>
          </BlurFade>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Info - Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Contact Cards with BlurFade */}
              <BlurFade delay={0.2} inView>
                <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-all duration-300">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Contact Information
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                        <a href="mailto:your.email@example.com" className="text-sm sm:text-base font-medium hover:text-primary transition-colors break-all">
                          your.email@example.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                        <a href="tel:+15551234567" className="text-sm sm:text-base font-medium hover:text-primary transition-colors">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                        <p className="text-sm sm:text-base font-medium">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* CTA Card with BlurFade */}
              <BlurFade delay={0.3} inView>
                <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border bg-gradient-to-br from-primary/5 via-primary/10 to-transparent backdrop-blur-sm">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Let's Connect</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    I'm always open to discussing new projects, creative ideas, or opportunities to help you grow.
                  </p>
                  <ShimmerButton className="w-full">
                    <span>Book a free consultation</span>
                  </ShimmerButton>
                </div>
              </BlurFade>

              {/* Working Hours with BlurFade */}
              <BlurFade delay={0.4} inView>
                <div className="p-4 sm:p-5 rounded-xl border bg-card/30 backdrop-blur-sm text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    ⚡ Average response time: &lt; 24 hours
                  </p>
                </div>
              </BlurFade>
            </div>

            {/* Contact Form - Right Column with BlurFade */}
            <BlurFade delay={0.25} inView>
              <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border bg-card/50 backdrop-blur-sm">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Send me a message</h2>
                
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <Send className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Message Sent! 🎉</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Thanks for reaching out. I'll get back to you soon!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 sm:mb-2 block">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="John Doe" 
                        className="bg-background/50 border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1.5 sm:mb-2 block">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="bg-background/50 border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1.5 sm:mb-2 block">
                        Subject
                      </label>
                      <Input 
                        placeholder="Project inquiry / Collaboration / Question" 
                        className="bg-background/50 border-border focus:border-primary transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1.5 sm:mb-2 block">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea 
                        placeholder="Tell me about your project, ideas, or how I can help..." 
                        rows={5}
                        className="bg-background/50 border-border focus:border-primary transition-colors resize-none"
                        required
                      />
                    </div>
                    
                    <RainbowButton type="submit" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </RainbowButton>
                    
                    <p className="text-xs text-center text-muted-foreground pt-2">
                      I respect your privacy. Your information will never be shared.
                    </p>
                  </form>
                )}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}