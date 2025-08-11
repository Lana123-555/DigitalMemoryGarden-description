import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
};

export default function FadeInOnScroll({
  children,
  delay = 0.1,
  y = 40,
}: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
