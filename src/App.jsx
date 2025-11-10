import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  // Avanzar automáticamente cada 5 segundos
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [images, index]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-rose-100 to-pink-200">
        <p className="text-rose-600 text-xl animate-pulse">
          Cargando recuerdos... 💞
        </p>
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

      {/* Imagen principal con marco */}
      <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] p-2 bg-gradient-to-br from-rose-200 to-pink-100 rounded-3xl shadow-2xl border-4 border-white/70 overflow-hidden">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-inner">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-3 bg-white/70 hover:bg-white text-rose-600 rounded-full p-2 shadow-md transition"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-3 bg-white/70 hover:bg-white text-rose-600 rounded-full p-2 shadow-md transition"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 mt-5 flex-wrap justify-center">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
              index === i
                ? "border-rose-500 scale-105"
                : "border-white/60 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Frase */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 text-rose-700 text-center text-base sm:text-lg max-w-md"
      >
      </motion.p>
    </div>
  );
}
