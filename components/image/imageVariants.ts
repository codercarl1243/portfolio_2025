export const imageVariants = {
    logo: {
        width: 100,
        height: 100,
        sizes: "100px",
        aspectRatio: 1,
    },
    rectangleLogo: {
        width: 400,
        height: 100,
        sizes: "400px",
        aspectRatio: 4,
    },
    default: {
        width: 1200,
        height: 800,
        sizes: "(max-width: 768px) 100vw, 1200px",
        aspectRatio: 1.5,
    },
    hero: {
        width: 1920,
        height: 1080,
        sizes: "(max-width: 768px) 100vw, 1920px",
        aspectRatio: 16 / 9,
    },
    banner: {
        width: 1200,
        height: 400,
        sizes: "(max-width: 768px) 100vw, 1200px",
        aspectRatio: 3,
    },
    general: {
        width: 1080,
        height: 1080,
        sizes: "(max-width: 768px) 100vw, 1080px",
        aspectRatio: 1,
    },
} as const;