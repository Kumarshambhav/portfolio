import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Section = ({ title, children }) => (
  <section className="px-6 py-12 md:px-24 bg-[#181818]">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-400 font-mono">{title}</h2>
    {children}
  </section>
);

const Confetti = ({ delay }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: ["-20%", "120%"],
      x: [`0%`, `${Math.random() * 50 - 25}%`],
      rotate: [0, 360],
      opacity: [1, 0.8, 0],
      transition: {
        duration: 3 + Math.random() * 2,
        delay,
        ease: "easeInOut"
      }
    });
  }, [controls, delay]);

  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#F7B801"];
  const size = 2 + Math.random() * 30;
  const left = Math.random() * 300;

  return (
    <motion.div
      className="absolute rounded-md"
      style={{
        left: `${left}%`,
        top: 0,
        width: `2px`,
        height: `${size * 5}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        zIndex: 10
      }}
      animate={controls}
    />
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const contentRef = useRef(null);
  const [confettiList, setConfettiList] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        controls.start({ opacity: 1 });
      } else if (scrollPosition < 100) {
        controls.start({ opacity: 0 });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  useEffect(() => {
    const confettiPieces = Array.from({ length: 30 }).map((_, i) => (
      <Confetti key={i} delay={i * 0.1} />
    ));
    setConfettiList(confettiPieces);
  }, []);

  const contentVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 200 }
  };

  return (
    <div className="bg-[#0f0f0f] text-white font-sans min-h-screen relative overflow-hidden">
      {/* Navbar with Confetti */}
      <nav id="navbar" className="relative flex justify-between items-center p-4 bg-[#1a1a1a] shadow-lg fixed w-full z-10 overflow-visible">
        <div className="absolute inset-0 pointer-events-none z-[-1]">
          {confettiList}
        </div>
        <motion.h1
          className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 animate-blink"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Shambhav Kumar Rao
        </motion.h1>
        <div className="flex space-x-4">
          <a href="mailto:rshambhavkumar@gmail.com" className="text-xl hover:text-cyan-400"><FaEnvelope /></a>
          <a href="https://www.linkedin.com/in/shambhav-kumar-rao-a62749241/" className="text-xl hover:text-blue-500"><FaLinkedin /></a>
          <a href="https://github.com/kumarshambhav/" className="text-xl hover:text-gray-400"><FaGithub /></a>
        </div>
      </nav>

      {/* Content Wrapper */}
      <motion.div
        ref={contentRef}
        className="relative z-10"
        variants={contentVariants}
        initial="visible"
        animate={scrollY.get() > 300 ? "hidden" : "visible"}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className="pt-20 pb-12 flex flex-col items-center justify-center text-center px-4 bg-[#0f0f0f]">
          <div className="max-w-md">
            <img src="https://i.ibb.co/XZVKVrGH/1000091460-removebg-preview.png" alt="Profile" className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Hi! I'm Shambhav Kumar Rao 👋</h1>
            <p className="text-xl text-gray-300 mb-4">Full Stack Developer & AI Enthusiast</p>
            <p className="text-gray-400 mb-6">I build modern web apps, AI interfaces, and innovative tools to solve real-world problems. Let’s innovate together!</p>
            <div className="flex space-x-4 justify-center">
              <a href="mailto:rshambhavkumar@gmail.com" className="bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold px-4 py-2 rounded-full hover:scale-105 transition">Contact me →</a>
              <a href="https://pdf.ac/2qKP9x" className="bg-white text-black font-bold px-4 py-2 rounded-full hover:scale-105 transition">My resume ↓</a>
            </div>
          </div>
        </section>

        {/* Projects */}
        <Section title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "CodeReview",
                desc: "Enhanced Code quality through AI - driven Suggestions.",
                img: "https://i.ibb.co/1fMR1r88/pexels-markusspiske-2764993.jpg",
                link:"https://code-review-teal-six.vercel.app/"
              },
              {
                title: "Instagram Clone",
                desc: "A clone with post, like, comment & auth features.",
                img: "https://i.ibb.co/rGJRjwMp/deeksha-pahariya-PKJLZul-b-Ug-unsplash.jpg",
                link: "https://github.com/Kumarshambhav/Instaclone"
              },
              {
                title: "ERA Montage",
                desc: "Memory sharing website for MMMUT students.",
                img: "https://i.ibb.co/j9Yj5Y7z/karina-lago-w-Euc-G-s-LRs-Y-unsplash.jpg",
                link: "https://github.com/Kumarshambhav/eraMontage"
              },
              {
                title: "Gemini Clone",
                desc: "Google Gemini AI UI clone with conversation features.",
                img: "https://i.ibb.co/21snqhVC/solen-feyissa-Rwo-T2g5-SGRw-unsplash.jpg",
                link: "https://github.com/Kumarshambhav/gimini"  
              },
              {
                title: "Hostel Food Waste Reduction App",
                desc: "Pre-book meals to reduce hostel food wastage. (In progress)",
                img: "https://i.ibb.co/hFzd58PW/shakib-uzzaman-htj6cvrbf7-A-unsplash.jpg"
              },
              {
                title: "StartUpNest",
                desc: "Co-living finder for startup folks in Bangalore. (In progress)",
                img: "https://i.ibb.co/zTFzk10y/antonio-cerbino-xx3-Fh-P88o5-Q-unsplash.jpg"
              }
            ].map((proj, i) => (
              <div key={i} className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <img src={proj.img} alt={proj.title} className="rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-white">{proj.title}</h3>
                <p className="text-gray-400">{proj.desc}</p>
                <a href = {proj.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">Link</a>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-4 justify-center text-white text-lg">
            {["LangChain","RAG","HTML", "CSS", "JavaScript", "ReactJs", "NextJs", "Java", "C++", "MongoDB", "MySQL", "NodeJs", "ExpressJs"].map((skill, idx) => (
              <span key={idx} className="bg-gray-800 px-4 py-2 rounded-full shadow-md border border-cyan-500">
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-white">B.Tech in Electronics and Communication Engineering (2021–2025) CGPA: 6.69/10</h3>
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact Me">
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray-400 mb-6">Let’s collaborate! Drop a message below.</p>
            <input type="text" placeholder="Enter your name" className="w-full p-3 mb-4 rounded-lg bg-white text-black" />
            <input type="email" placeholder="Enter your email" className="w-full p-3 mb-4 rounded-lg bg-white text-black" />
            <textarea placeholder="Write your message" className="w-full p-3 mb-4 rounded-lg bg-white text-black h-32"></textarea>
            <button className="bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition">Send →</button>
            <div className="mt-6 text-gray-400">
              <p>rshambhavkumar@gmail.com</p>
              <div className="flex justify-center gap-4 mt-2">
                <a href="https://github.com/kumarshambhav/" className="hover:text-cyan-400">GitHub</a>
                <a href="https://www.linkedin.com/in/shambhav-kumar-rao-a62749241/" className="hover:text-blue-500">LinkedIn</a>
                <a href="https://www.instagram.com/__shambhav_?igsh=MWd1ZXphcTVmcnRnMA==" className="hover:text-pink-400">Instagram</a>
              </div>
              <p className="text-gray-500 mt-6">© 2025 Shambhav Kumar Rao. All rights reserved.</p>
            </div>
          </div>
        </Section>
      </motion.div>
    </div>
  );
}




