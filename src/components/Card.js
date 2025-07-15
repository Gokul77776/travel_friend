"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Users, UserCheck,Locate,DollarSign   } from "lucide-react";
import { useState } from "react";

export function ProfileCard({
  name = "Sophie Bennett",
  description = "Product Designer who focuses on simplicity & usability.",
  image = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&h=800&fit=crop&auto=format&q=80",
  isVerified = true,
  followers = 312,
  following = 48,
  amount = 10,
  enableAnimations = true,
  className = "",
  onFollow = () => {},
  isFollowing = false,
}) {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  
  const containerVariants = {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: shouldAnimate
      ? {
          scale: 1.02,
          y: -4,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.6,
          },
        }
      : {},
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 200,
        mass: 0.8,
      },
    },
  };

  const goToUserProfile = () => {
    const url = `/profile/${isFollowing}/main`;  
    window.open(url, "_blank");  
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={`relative w-80 h-96 rounded-3xl border text-black overflow-hidden shadow-xl cursor-pointer group backdrop-blur-sm ${className}`}
    >
      {/* Background Image */}
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 via-white/20 via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/90 via-white/60 via-white/30 via-white/15 via-white/8 to-transparent backdrop-blur-[1px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/85 via-white/40 to-transparent backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 p-6 space-y-4"
      >
        {/* Name and Verified */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <motion.h2
            className="text-2xl font-bold"
            variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
          >
            {name.split("").map((letter, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
          {isVerified && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
            >
              <Check className="w-2.5 h-2.5" />
            </motion.div>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-sm leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Followers & Following */}
        <motion.div variants={itemVariants} className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Locate className="w-4 h-4 text-rose-600" />
            <span className="font-semibold text-black">{followers}</span>
             
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="font-semibold text-black">{following}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-black">{amount}</span>
          </div>
        </motion.div>

        {/* Follow Button */}
        <motion.button
          variants={itemVariants}
          onClick={goToUserProfile}
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.98 }}
          className={`w-full cursor-pointer py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200 border shadow-sm transform-gpu ${
            isFollowing
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          {isFollowing ?  'Follow': "Follow "}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
