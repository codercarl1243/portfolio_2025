import { forwardRef, useEffect } from "react";
import { motion, usePresence } from 'framer-motion';

type SlideProps = React.ComponentPropsWithoutRef<typeof motion.div>;

export const Slide = forwardRef<HTMLDivElement, SlideProps>(function Slide(
    { children, ...props },
    ref
) {
    const [isPresent, safeToRemove] = usePresence()
    // enters left - exits right
    const direction = isPresent ? -1 : 1;

    useEffect(() => {
        if (!isPresent) {
            const timeout = setTimeout(() => {
                safeToRemove()
            }, 150)
            return () => clearTimeout(timeout)
        }
    }, [isPresent])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: direction * 10, scale: 0.98 }}
            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.4,
                },
            }}
            exit={{ opacity: 0, x: direction * -10, scale: 0.95 }}
            {...props}
        >
            {children}
        </motion.div>
    )
})

export default Slide;