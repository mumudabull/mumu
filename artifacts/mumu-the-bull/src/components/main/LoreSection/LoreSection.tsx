import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.33, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="inline-block will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.span>
  );
}

function LoreSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"],
  });

  const text1 =
    "The biggest meme IP ever built. Then the bear market came, the bulls got laughed at, and the warrior fell. But the delusional bull never dies. The original. Cute, small, and unshakeably bullish. Strong from something the bears will never have: blind, unbreakable conviction.";

  const text2 =
    "The biggest memes aren't born at the top. They're born right here, in the dark, when everyone has given up. You know who you are. You held. You were called delusional. You were right.";

  const text3 =
    "This is the sanctuary for everyone who refuses to sell the bottom.";

  const words1 = text1.split(" ");
  const words2 = text2.split(" ");
  const words3 = text3.split(" ");
  const totalWords = words1.length + words2.length + words3.length;

  return (
    <section
      id="lore"
      ref={containerRef}
      className="bg-black w-full h-auto relative"
      style={{
        backgroundImage: 'url("/images/hero-bg.png")',
        backgroundRepeat: "repeat",
      }}
    >
      <div className="min-h-[982px] max-w-container container flex items-start justify-center w-full mx-auto relative pt-12">
        <div className="flex flex-col gap-6 text-2xl leading-relaxed text-white font-nerko max-w-[720px]">
          <p className="flex flex-wrap gap-x-[0.3em]">
            {words1.map((word, index) => {
              const start = index / totalWords;
              const end = (index + 1) / totalWords;
              return (
                <Word
                  key={index.toString()}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </p>
          <p className="flex flex-wrap gap-x-[0.3em]">
            {words2.map((word, index) => {
              const wordIdx = index + words1.length;
              const start = wordIdx / totalWords;
              const end = (wordIdx + 1) / totalWords;
              return (
                <Word
                  key={wordIdx}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </p>
          <p className="text-[#00FF61] flex flex-wrap gap-x-[0.3em]">
            {words3.map((word, index) => {
              const wordIdx = index + words1.length + words2.length;
              const start = wordIdx / totalWords;
              const end = (wordIdx + 1) / totalWords;
              return (
                <Word
                  key={wordIdx}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>

      <img
        src="/images/lore-mumu.png"
        alt="Hero Mumu"
        width={300}
        height={300}
        className="object-contain object-center aspect-square absolute left-1/2 -translate-x-1/2 bottom-32 animate-float z-10"
      />
      <img
        src="/images/lore-planet.png"
        alt="Hero Mumu"
        width={1223}
        height={646}
        className="object-contain object-bottom z-0 aspect-square absolute left-1/2 -translate-x-1/2 bottom-0 w-full"
      />
    </section>
  );
}

export default LoreSection;
