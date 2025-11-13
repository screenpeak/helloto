"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

// Portfolio landing page with contact form
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header with Theme Toggle */}
      <header className="fixed top-0 right-0 p-6 z-10">
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-6 py-20 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Bert Darnell
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Cybersecurity Professional | Help Desk Specialist | Technical Writer
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          <Link href="/blog">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#4682B4] to-[#36648B] dark:from-[#5F9EA0] dark:to-[#4682B4] p-12 rounded-2xl shadow-xl cursor-pointer group"
            >
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-3 group-hover:translate-x-2 transition-transform">
                  Blog
                </h2>
                <p className="text-blue-100">
                  Read my technical articles and tutorials
                </p>
              </div>
            </motion.div>
          </Link>

          <Link href="/resume">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#4682B4] to-[#36648B] dark:from-[#5F9EA0] dark:to-[#4682B4] p-12 rounded-2xl shadow-xl cursor-pointer group"
            >
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-3 group-hover:translate-x-2 transition-transform">
                  Resume
                </h2>
                <p className="text-blue-100">
                  View my experience and skills
                </p>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            {/* Hidden fields for Web3Forms */}
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
            <input type="hidden" name="subject" value="New Contact Form Submission from helloto.me" />

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4682B4] focus:border-transparent transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4682B4] focus:border-transparent transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#4682B4] hover:bg-[#36648B] dark:bg-[#5F9EA0] dark:hover:bg-[#4682B4] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              {submitted ? "Sent! ✓" : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
