export const frameStyles = {
    "antique-wood": {
        name: "Antique dark wood",
        railWidth: 0.075,
        depth: 0.035,
        color: "#4a2d1c",
        roughness: 0.95,
        metalness: 0.02,
        profile: "plain",
        colorMapUrl: "/frame-textures/dark-wood/dark-wood-color.jpg",
        normalMapUrl: "/frame-textures/dark-wood/dark-wood-normal-gl.jpg",
        roughnessMapUrl: "/frame-textures/dark-wood/dark-wood-roughness.jpg",
        textureTint: "#ffffff",
    },
    "ebonised-wood": {
        name: "Ebonised black wood",
        railWidth: 0.035,
        depth: 0.06,
        color: "#202124",
        roughness: 0.88,
        metalness: 0.02,
        profile: "plain",
        textureTint: "#45484d",
        colorMapUrl:
            "/frame-textures/dark-wood/dark-wood-color.jpg",
        normalMapUrl:
            "/frame-textures/dark-wood/dark-wood-normal-gl.jpg",
        roughnessMapUrl:
            "/frame-textures/dark-wood/dark-wood-roughness.jpg",
    },
    "warm-walnut": {
        name: "Warm walnut",
        railWidth: 0.065,
        depth: 0.035,
        color: "#8a5a32",
        roughness: 0.72,
        metalness: 0.02,
        profile: "plain",
        slopedFace: {
            outerLipWidth: 0.01,
            innerLipWidth: 0.005,
            outerDepth: 0.045,
            innerDepth: 0.012,
        },
        textureTint: "#ffffff",
        colorMapUrl:
            "/frame-textures/walnut/walnut-color.jpg",
        normalMapUrl:
            "/frame-textures/walnut/walnut-normal-gl.jpg",
        roughnessMapUrl:
            "/frame-textures/walnut/walnut-roughness.jpg",
    },
    "light-oak": {
        name: "Light oak",
        railWidth: 0.06,
        depth: 0.032,
        color: "#c9a46c",
        roughness: 0.82,
        metalness: 0.01,
        profile: "plain",
        mount: {
            width: 0.09,
            color: "eee9df",
        },
        textureTint: "#ffffff",
        colorMapUrl:
            "/frame-textures/oak/oak-color.jpg",
        normalMapUrl:
            "/frame-textures/oak/oak-normal-gl.jpg",
        roughnessMapUrl:
            "/frame-textures/oak/oak-roughness.jpg",
    },
    "aged-gold": {
        name: "Aged gold",
        railWidth: 0.11,
        depth: 0.045,
        color: "#a67c32",
        roughness: 0.48,
        metalness: 0.7,
        profile: "stepped",
        innerTrim: {
            railWidth: 0.028,
            depth: 0.014,
            color: "#d2ad55",
            roughness: 0.35,
            metalness: 0.8,
        },
        outerMoulding: {
            railWidth: 0.035,
            depth: 0.02,
            color: "#7d5a24",
            roughness: 0.58,
            metalness: 0.65,
        },
        colorMapUrl: null,
        normalMapUrl: null,
        roughnessMapUrl: null,
    },
} as const;

export type FrameStyleId = keyof typeof frameStyles;
