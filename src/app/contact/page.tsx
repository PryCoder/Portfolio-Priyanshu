"use client";

import { useState } from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Meteors } from "@/components/ui/meteors";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ FIX: safe fallback (important for production + local)
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://portfolio-p828.onrender.com/api";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setIsSubmitted(true);

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error("Server error:", data);
        alert(data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">

      <Meteors number={15} />

      <div className="relative z-10 container mx-auto px-6 py-20">

        {/* HEADER */}
        <BlurFade delay={0.1}>
          <div className="text-center mb-10">
            <Sparkles className="mx-auto mb-2 text-primary" />
            <h1 className="text-5xl font-bold">Get In Touch</h1>
            <p className="text-muted-foreground mt-2">
              Let's build something amazing
            </p>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT INFO */}
          <div className="space-y-6">

            <div className="p-6 border rounded-xl">
              <div className="flex items-center gap-3">
                <Mail />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>your@email.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-xl">
              <div className="flex items-center gap-3">
                <Phone />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>+91 XXXXX XXXXX</p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-xl">
              <div className="flex items-center gap-3">
                <MapPin />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="p-6 border rounded-xl">

            {isSubmitted ? (
              <div className="text-center py-10">
                <Send className="mx-auto text-green-500" />
                <h2 className="text-xl font-semibold mt-2">
                  Message Sent!
                </h2>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <RainbowButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </RainbowButton>

              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}