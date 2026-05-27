import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const IMAGES = [
  "/images/gallery/gallery-1.png",
  "/images/gallery/gallery-2.png",
  "/images/gallery/gallery-3.png",
  "/images/gallery/gallery-4.png",
  "/images/gallery/gallery-5.png",
  "/images/gallery/gallery-6.png",
  "/images/gallery/gallery-7.png",
  "/images/gallery/gallery-8.png",
  "/images/gallery/gallery-9.png",
  "/images/gallery/gallery-10.png",
  "/images/gallery/gallery-11.png",
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [columnCount, setColumnCount] = useState(5);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) setColumnCount(3);
      else if (window.innerWidth < 1024) setColumnCount(4);
      else setColumnCount(5);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const columnData = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => [] as string[]);
    IMAGES.forEach((img, i) => {
      columns[i % columnCount].push(img);
    });
    return columns.map((col) => [...col, ...col, ...col, ...col]);
  }, [columnCount]);

  return (
    <section
      id="gallery"
      className="w-full bg-[#E7E7E7] overflow-hidden relative"
      style={{
        backgroundImage: 'url("/images/gallery-bg.png")',
        backgroundRepeat: "repeat",
      }}
    >
      <a
        href="#"
        className="rotate-0 transition-all duration-300 hover:-rotate-3 shadow-container bg-black px-6 py-4 text-white rounded-buttons flex items-center gap-2 max-w-[351px] absolute bottom-24 left-1/2 -translate-x-1/2 z-20 active:scale-95"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Upload icon</title>
          <path
            d="M20.987 16C20.991 15.8933 20.9778 15.7866 20.948 15.684L18.948 9.684C18.8817 9.48496 18.7545 9.3118 18.5844 9.18905C18.4142 9.0663 18.2098 9.00016 18 9H14V11H17.279L18.946 16H5.054L6.721 11H10V9H6C5.79021 9.00016 5.58578 9.0663 5.41564 9.18905C5.24551 9.3118 5.11829 9.48496 5.052 9.684L3.052 15.684C3.02221 15.7866 3.00904 15.8933 3.013 16C3 16 3 21 3 21C3 21.2652 3.10536 21.5196 3.29289 21.7071C3.48043 21.8946 3.73478 22 4 22H20C20.2652 22 20.5196 21.8946 20.7071 21.7071C20.8946 21.5196 21 21.2652 21 21C21 21 21 16 20.987 16ZM16 7.904C16.259 7.904 16.518 7.809 16.707 7.621C16.8945 7.43347 16.9998 7.17916 16.9998 6.914C16.9998 6.64884 16.8945 6.39453 16.707 6.207L12 1.5L7.293 6.207C7.10553 6.39453 7.00021 6.64884 7.00021 6.914C7.00021 7.17916 7.10553 7.43347 7.293 7.621C7.482 7.81 7.741 7.904 8 7.904C8.259 7.904 8.518 7.81 8.707 7.621L11 5.328V12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12V5.328L15.293 7.621C15.4821 7.80489 15.7362 7.90661 16 7.904Z"
            fill="white"
          />
        </svg>
        <span className="font-nerko text-nowrap">
          ADD YOUR MEME TO OUR GALLERY
        </span>
      </a>
      <div className="gallery-overlay absolute bottom-0 left-0 z-10 flex items-end pb-16 justify-center pointer-events-none" />

      <div
        className="h-[600px] md:h-[1050px] flex justify-center gap-4 px-4 overflow-hidden"
        style={{
          transform: "rotate(-2deg) skewY(-3deg) scale(1.15)",
        }}
      >
        {columnData.map((images, colIndex) => {
          const isReverse = colIndex % 2 !== 0;
          return (
            <div
              key={colIndex.toString()}
              className="flex-1 min-w-[120px] max-w-[400px] relative"
              style={{ marginTop: `${colIndex * 20}px` }}
            >
              <motion.div
                className="flex flex-col gap-4 will-change-transform"
                animate={{
                  y: isReverse ? ["-50%", "0%"] : ["0%", "-50%"],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {images.map((src, imgIndex) => (
                  <motion.div
                    key={`${colIndex}-${imgIndex.toString()}`}
                    className="relative aspect-square w-full cursor-pointer rounded-3xl overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(src)}
                  >
                    <img
                      src={src}
                      alt={`Gallery image ${imgIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected gallery image"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
