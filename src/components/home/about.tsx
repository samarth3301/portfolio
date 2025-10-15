// components/AboutSection.tsx
"use client";

import Image from "next/image";
import profile_picture from "../../../public/profilepic.png";

const AboutSection = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#1a1a1a] p-8 text-white">
      {/* Centered container with a max-width to ensure layout consistency */}
      <div className="w-full max-w-7xl">
        
        {/* === Title === */}
        <div className="text-center">
          {/* INCREASED FONT SIZE AND WEIGHT: This will make it a clear heading */}
          <h1 className="mb-20 text-7xl font-bold">
            About Me
          </h1>
        </div>

        {/* === Main Content Area (Text + Image) === */}
        {/* This flex container now holds two columns */}
        <div className="flex flex-col items-center gap-16 md:flex-row md:gap-24">
          
          {/* Left Column: Text */}
          {/* The 'flex-[3]' gives this column more space */}
          <div className="flex-[3]"> 
            <p className="text-xl leading-relaxed text-white/90">
              Hi, I’m Samarth — an experienced backend developer with a strong
              focus on designing and scaling server-side applications that power
              dynamic web services. I work across multiple languages including
              Python, Java, Go, TypeScript, and JavaScript, and I’m proficient
              with frameworks like Flask, Gin, NestJS, and ExpressJS. I’ve built
              and optimized systems backed by PostgreSQL, MongoDB, Redis, and
              MySQL, and I regularly leverage tools such as Docker, Kafka,
              Firebase, Bun, and TensorFlow to streamline development and
              deployment. Over the years, I’ve architected efficient database
              schemas, deployed containerized infrastructures, and implemented
              real-time data streaming pipelines for large-scale solutions. Some
              of my favorite projects include custom Discord bots, IP
              authorization systems, and full-fledged chat services — all built
              with a focus on robustness, modularity, and clean architecture. I’m
              deeply committed to continuous learning and always stay curious
              about new technologies that push my limits and help deliver
              innovative, high-performance solutions.
            </p>
          </div>

          {/* Right Column: Image */}
          {/* The 'flex-[2]' gives this column less space, making the image a bit smaller than the text block */}
          <div className="flex flex-[2] items-center justify-center">
            <Image
              src={profile_picture}
              alt="Profile Picture"
              width={500}
              height={600}
              className="max-w-sm rounded-3xl object-cover md:max-w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;