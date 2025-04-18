import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
}
