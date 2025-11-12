"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const resumeData = {
  name: "Bert Darnell",
  title: "Cybersecurity Professional | Help Desk Specialist",
  contact: {
    email: "bert@helloto.me",
    github: "github.com/bert-darnell",
    location: "Beaver Falls, PA",
  },
  summary:
    "Recently relocated to Beaver Falls, PA to support family, I am a motivated graduate with a proven ability to balance full-time work and academic pursuits. My dedication to continuous learning and extensive work history have equipped me with a diverse set of transferable skills. I am confident in my ability to contribute effectively by ensuring data integrity, confidentiality, and availability while implementing and monitoring critical assets.",
  experience: [
    {
      title: "Help Desk Specialist",
      company: "Questeq",
      period: "October 2024 - Present",
      description: [
        "Create and close support tickets for hospital-wide technical issues",
        "Fix computers and systems throughout the hospital environment",
        "Work with Active Directory for user management and authentication",
        "Manage and troubleshoot TicketPro and 100+ hospital systems",
        "Provide rapid response technical support for critical healthcare operations",
      ],
    },
    {
      title: "Direct Support Specialist",
      company: "Nodaway County Services",
      period: "January 2023 - December 2023",
      location: "Maryville, MO",
      description: [
        "Maintained meticulous documentation, ensuring data integrity and confidentiality",
        "Tracked technical support tickets and user issues with precision",
        "Provided direct support services while maintaining strict confidentiality protocols",
      ],
    },
    {
      title: "Night Auditor",
      company: "Holiday Inn & Suites",
      period: "April 2022 - December 2022",
      location: "Maryville, MO",
      description: [
        "Performed network administrative tasks including system updates and software upgrades",
        "Configured printers and troubleshot customer network connectivity issues (DNS resolution)",
        "Conducted detailed audits, balancing daily financial records and identifying discrepancies",
        "Resolved technical issues, providing overnight support similar to IT help desk operations",
      ],
    },
    {
      title: "Night Auditor",
      company: "Cobblestone Inn & Suites",
      period: "February 2021 - April 2022",
      location: "Maryville, MO",
      description: [
        "Balanced daily financial records with meticulous attention to detail",
        "Provided security monitoring during overnight hours",
        "Troubleshot and resolved guest concerns, showcasing strong problem-solving skills",
      ],
    },
  ],
  homelabProjects: [
    {
      title: "Virtualized Homelab Infrastructure",
      period: "2024 - Present",
      technologies: "Proxmox VE, Ubuntu Server, Arch Linux, WireGuard, Pi-hole, Unbound, TrueNAS, ZFS",
      description: [
        "Designed and deployed virtualized homelab environment using Proxmox VE hypervisor managing 5+ VMs for various services (media server, DNS, VPN, NAS)",
        "Implemented WireGuard VPN server for secure remote access with split-tunneling configurations for mobile and desktop clients across multiple tunnel interfaces",
        "Configured PCI GPU passthrough for hardware-accelerated video transcoding, reducing CPU utilization by 85% during media processing using NVENC/NVDEC",
        "Deployed Pi-hole with Unbound recursive DNS resolver for network-wide ad blocking and enhanced privacy with DNSSEC validation, serving 20+ devices",
        "Administered TrueNAS SCALE with ZFS storage pools for centralized data management, implementing NFS/SMB shares accessible across network infrastructure",
        "Developed comprehensive disaster recovery procedures and automated backup strategies for critical system configurations using shell scripting",
        "Configured advanced firewall rules and network segmentation using iptables for secure service isolation",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Information and Computer Science",
      school: "Park University",
      period: "2024",
      location: "Parkville, MO",
      achievements: [
        "Obtained Cisco CCNAv7 and CyberOps Associate certifications through 15 credit hours",
        "Hands-on experience with NIST SP 800-53 framework",
        "Performed Cybersecurity Threat and Vulnerability Assessments (CTVA)",
      ],
    },
  ],
  hardSkills: [
    "Active Directory",
    "Windows Servers",
    "Linux System Administration",
    "Virtualization (Proxmox VE)",
    "Network Design",
    "Switch and Router Configuration",
    "Network Monitoring (Wireshark, tcpdump)",
    "IPv4/IPv6 Addressing",
    "WAN and LAN Configuration",
    "PowerShell & Python Scripting",
    "Bash Scripting & Automation",
    "Access Control Lists (ACLs)",
    "VLAN Configuration",
    "VPN Technologies (WireGuard, IPsec)",
    "DNS Management (Pi-hole, Unbound, DNSSEC)",
    "Firewall Configuration (iptables, UFW)",
    "Storage Management (ZFS, NAS, NFS/SMB)",
    "GPU Passthrough (VFIO, IOMMU)",
    "Database Management (MySQL)",
    "Network Mapping (Nmap, CDP)",
    "NIST 800-53",
  ],
  softSkills: [
    "Interpersonal Communication",
    "Problem Solving",
    "Documentation",
    "Conflict Resolution",
    "Critical Thinking",
    "Attention to Detail",
    "Team Collaboration",
    "Adaptability",
    "Time Management",
    "Customer Service",
    "Troubleshooting",
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="container mx-auto px-6 py-12 max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.header variants={itemVariants} className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
                {resumeData.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {resumeData.title}
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-600 dark:text-gray-400">
                <a href={`mailto:${resumeData.contact.email}`} className="hover:text-[#4682B4] dark:hover:text-[#5F9EA0]">
                  {resumeData.contact.email}
                </a>
                <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#4682B4] dark:hover:text-[#5F9EA0]">
                  GitHub
                </a>
                <span>{resumeData.contact.location}</span>
              </div>
            </motion.header>

            {/* Summary */}
            <motion.section variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Summary
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {resumeData.summary}
              </p>
            </motion.section>

            {/* Experience */}
            <motion.section variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Experience
              </h2>
              <div className="space-y-8">
                {resumeData.experience.map((job, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <p className="text-[#4682B4] dark:text-[#5F9EA0]">
                          {job.company}
                        </p>
                        {job.location && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {job.location}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                        {job.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      {job.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Homelab Projects */}
            <motion.section variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Personal Projects
              </h2>
              <div className="space-y-8">
                {resumeData.homelabProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#4682B4] dark:text-[#5F9EA0] mb-3 font-medium">
                          {project.technologies}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0 whitespace-nowrap">
                        {project.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      {project.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-[#4682B4] dark:text-[#5F9EA0]">
                        {edu.school}
                      </p>
                      {edu.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {edu.location}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                      {edu.period}
                    </span>
                  </div>
                  {edu.achievements && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </motion.section>

            {/* Skills */}
            <motion.section variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Hard Skills */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.hardSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#B0C4DE] dark:bg-[#36648B] text-[#1e3a5f] dark:text-[#E0F0FF] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Professional Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.softSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#B0C4DE] dark:bg-[#36648B] text-[#1e3a5f] dark:text-[#E0F0FF] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Download Button */}
            <motion.div variants={itemVariants} className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#4682B4] hover:bg-[#36648B] dark:bg-[#5F9EA0] dark:hover:bg-[#4682B4] text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
              >
                Download PDF Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
