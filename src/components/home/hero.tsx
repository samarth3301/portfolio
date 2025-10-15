// components/Hero.tsx
"use client"; // This directive is necessary for Framer Motion to work in App Router components

import { easeOut, motion } from "framer-motion";

const Hero = () => {
  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Animation variants for the circles
  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Transition objects for animations
  const lineTransition = { duration: 0.7, ease: easeOut };
  const circleTransition = { duration: 0.5, ease: easeOut };

  // New animation variants for the profile picture
  const _profileImageVariants = {
    hidden: { opacity: 0, x: 100 }, // Start off-screen to the right
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: 0.8, ease: easeOut },
    }, // Slide in and fade
  };

  return (
    <section className="relative flex h-screen w-screen overflow-hidden text-white">
      <div className="absolute h-full w-full bg-[#1a1a1a] z-[-2]"></div>
      {/* Background "SAMARTH" Text - Using `motion.div` for animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: easeOut }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[35vw] font-black text-white/5 z-[-1]"
      >
        SAMARTH
      </motion.div>

      {/* Decorative Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-white/10"></div>

      {/* Top Left Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute left-10 top-10 z-20 font-bold"
      >
        Samarth
      </motion.div>

      {/* Left Vertical Text */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute left-[40px] top-1/2 z-20 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm text-white/70 [transform-origin:center]"
      >
        Backend Developer <br /> based in India
      </motion.p>

      {/* Bottom Left "Share" Text */}
      <motion.p
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: -90 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-[60px] left-[15px] z-20 text-sm [transform-origin:bottom_left]"
      >
        Share with ▼
      </motion.p>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-5 left-10 z-20 text-white text-xl"
      >
        N
      </motion.div>

      {/* Main Text Content */}
      <div className="relative z-10 ml-[15%] flex h-full flex-col justify-center">
        <motion.h1
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...lineTransition, delay: 0.5 }}
          className="text-[8rem] font-bold leading-none"
        >
          Hello<span className="text-[#ff4d4d]">.</span>
        </motion.h1>
        <motion.h1
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...lineTransition, delay: 0.7 }}
          className="text-[8rem] font-bold leading-none"
        >
          I am
        </motion.h1>
        <motion.h1
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...lineTransition, delay: 0.9 }}
          className="text-[8rem] font-bold leading-none"
        >
          Samarth
        </motion.h1>
      </div>

      {/* Decorative Circles */}
      <motion.div
        variants={circleVariants}
        initial="hidden"
        animate="visible"
        transition={{ ...circleTransition, delay: 1.0 }}
        className="absolute left-[65%] top-[15%] z-10 h-5 w-5 rounded-full border-[3px] border-[#00bfff]"
      ></motion.div>
      <motion.div
        variants={circleVariants}
        initial="hidden"
        animate="visible"
        transition={{ ...circleTransition, delay: 1.2 }}
        className="absolute left-[30%] top-[25%] z-10 h-5 w-5 rounded-full border-[3px] border-[#00bfff]"
      ></motion.div>
      <motion.div
        variants={circleVariants}
        initial="hidden"
        animate="visible"
        transition={{ ...circleTransition, delay: 1.4 }}
        className="absolute left-[10%] top-[60%] z-10 h-5 w-5 rounded-full border-[3px] border-[#00bfff]"
      ></motion.div>
      <motion.div
        variants={circleVariants}
        initial="hidden"
        animate="visible"
        transition={{ ...circleTransition, delay: 1.6 }}
        className="absolute left-[45%] top-[80%] z-10 h-5 w-5 rounded-full border-[3px] border-[#00bfff]"
      ></motion.div>
    </section>
  );
};

export default Hero;
