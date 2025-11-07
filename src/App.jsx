import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

// Carga automática de imágenes desde src/utils/nosotros
const importAllImages = async () => {
  const images = import.meta.glob("./utils/nosotros/*.{jpg,jpeg,png,gif,webp}");
  const paths = await Promise.all(
    Object.keys(images).map(async (path) => {
      const mod = await images[path]();
      return mod.default;
    })
  );
  return paths;
};

export default function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  // Cargar imágenes
  useEffect(() => {
    importAllImages().then(setImages);
  }, []);

  // Avanzar automáticamente cada 4 segundos
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-rose-100 to-pink-200">
        <p className="text-rose-600 text-xl animate-pulse">Cargando recuerdos... 💞</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 px-4">
      {/* Título */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl font-bold text-rose-600 flex items-center gap-2 mb-6 mt-4"
      >
        <FaHeart className="text-rose-500 animate-pulse" /> Nosotros 💕
      </motion.h1>

      {/* Imagen */}
      <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-white/30 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Frase */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 text-rose-700 text-center text-base sm:text-lg"
      >
      </motion.p>
    </div>
  );
}
