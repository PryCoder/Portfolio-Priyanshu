"use client";

import { useState, useEffect } from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Meteors } from "@/components/ui/meteors";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AuroraBackground>
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
          <Meteors number={15} />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            {/* HEADER SECTION */}
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <Sparkles className="mx-auto mb-2 sm:mb-3 text-primary h-5 w-5 sm:h-6 sm:w-6" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4 dark:text-white">
                  Get In Touch
                </h1>
                <p className="text-muted-foreground mt-2 sm:mt-3 text-sm sm:text-base px-4 max-w-2xl mx-auto">
                  Let&apos;s build something amazing together
                </p>
              </div>
            </BlurFade>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              
              {/* LEFT SIDE - Contact Information */}
              <BlurFade delay={0.2} inView>
                <div className="space-y-4 md:space-y-5">
                  
                  {/* Email Card */}
                  <div className="group p-4 md:p-5 border rounded-xl bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                        <p className="font-medium text-sm sm:text-base break-all dark:text-white">
                          priyanshugupta007007@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group p-4 md:p-5 border rounded-xl bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                        <p className="font-medium text-sm sm:text-base dark:text-white">
                          +91 93241 48255
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="group p-4 md:p-5 border rounded-xl bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                        <p className="font-medium text-sm sm:text-base dark:text-white">
                          Mumbai, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* RIGHT SIDE - Contact Form */}
              <BlurFade delay={0.3} inView>
                <div className="p-5 md:p-6 border rounded-xl bg-card/80 backdrop-blur-sm">
                  {isSubmitted ? (
                    // Success Message
                    <div className="text-center py-8 sm:py-10 md:py-12">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 dark:bg-green-900/20 mb-3">
                        <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-green-500" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold mt-2 dark:text-white">
                        Message Sent!
                      </h2>
                      <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Thanks for reaching out. I&apos;ll get back to you soon!
                      </p>
                    </div>
                  ) : (
                    // Contact Form
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                      {/* Error Message */}
                      {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 text-sm border border-red-200 dark:border-red-800">
                          {error}
                        </div>
                      )}
                      
                      {/* Name Field */}
                      <div>
                        <Input
  name="name"
  placeholder="Your Name"
  value={formData.name}
  onChange={handleChange}
  disabled={isSubmitting}
  className="
    h-14
    text-base
    px-4
    rounded-xl
    border-2
    bg-background/70
    backdrop-blur-sm
    focus-visible:ring-2
    focus-visible:ring-primary/50
  "
/>
                      </div>

                      {/* Email Field */}
                      <div>
                       <Input
  name="email"
  type="email"
  placeholder="Your Email"
  value={formData.email}
  onChange={handleChange}
  disabled={isSubmitting}
  className="
    h-14
    text-base
    px-4
    rounded-xl
    border-2
    bg-background/70
    backdrop-blur-sm
    focus-visible:ring-2
    focus-visible:ring-primary/50
  "
/>
                      </div>

                      {/* Message Field */}
                      <div>
                       <Textarea
  name="message"
  placeholder="Tell me about your project, idea, or opportunity..."
  value={formData.message}
  onChange={handleChange}
  disabled={isSubmitting}
  className="
    min-h-[220px]
    md:min-h-[280px]
    resize-none
    text-base
    leading-7
    p-5
    rounded-xl
    border-2
    bg-background/70
    backdrop-blur-sm
    focus-visible:ring-2
    focus-visible:ring-primary/50
  "
/>
                      </div>

                      {/* Submit Button */}
                      <RainbowButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gap-2 text-sm sm:text-base"
                      >
                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </RainbowButton>
                    </form>
                  )}
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}