import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

/**
 * RevealOnScroll - Animates children into view with a mystical fade/float effect.
 * Usage: <RevealOnScroll><YourContent /></RevealOnScroll>
 */
export default function RevealOnScroll({ children, delay = 0, y = 40 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        filter: "drop-shadow(0 0 16px #a78bfa88)",
        transition: { duration: 0.8, delay, ease: [0.42, 0, 0.58, 1] },
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "drop-shadow(0 0 0px #0000)" }}
      animate={controls}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
