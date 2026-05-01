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
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use relative path for same-origin API
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
        // Reset success message after 5 seconds
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

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full">
      <AuroraBackground>
        <div className="relative w-full">
          <Meteors number={15} />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            {/* HEADER */}
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <Sparkles className="mx-auto mb-2 sm:mb-3 text-primary h-6 w-6 sm:h-8 sm:w-8" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold px-4 dark:text-white">
                  Get In Touch
                </h1>
                <p className="text-muted-foreground mt-2 sm:mt-3 text-sm sm:text-base px-4">
                  Let's build something amazing together
                </p>
              </div>
            </BlurFade>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
              {/* LEFT INFO - Contact Details */}
              <BlurFade delay={0.2} inView>
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  {/* Email Card */}
                  <div className="p-4 sm:p-5 lg:p-6 border rounded-xl bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 rounded-full bg-primary/10 shrink-0">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-sm sm:text-base break-all dark:text-white">
                          priyanshugupta007007@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="p-4 sm:p-5 lg:p-6 border rounded-xl bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 rounded-full bg-primary/10 shrink-0">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-sm sm:text-base dark:text-white">+91 93241 48255</p>
                      </div>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="p-4 sm:p-5 lg:p-6 border rounded-xl bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 rounded-full bg-primary/10 shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-sm sm:text-base dark:text-white">Mumbai, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* RIGHT FORM */}
              <BlurFade delay={0.3} inView>
                <div className="p-5 sm:p-6 lg:p-8 border rounded-xl bg-card/80 backdrop-blur-sm">
                  {isSubmitted ? (
                    <div className="text-center py-8 sm:py-10 lg:py-12">
                      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                        <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold mt-2">
                        Message Sent!
                      </h2>
                      <p className="text-muted-foreground mt-2 text-sm sm:text-base px-4">
                        Thanks for reaching out. I'll get back to you soon!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 text-sm">
                          {error}
                        </div>
                      )}
                      
                      <div>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <Textarea
                          name="message"
                          placeholder="Your Message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full resize-none text-sm sm:text-base"
                        />
                      </div>

                      <RainbowButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gap-2 text-sm sm:text-base py-2 sm:py-3"
                      >
                        <Send className="h-4 w-4" />
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