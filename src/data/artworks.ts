import type { FrameStyleId } from "./frame-styles";

export type Artwork = {
    id: string;
    title: string;
    description?: string;
    location: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    featured: boolean;
    frameStyleId: FrameStyleId;
};

export const artworks: Artwork[] = [
    {
        id: "rally-stage",
        title: "Rally Stage",
        description: "The Great Orme rally stage is an iconic, narrow tarmac speed test around the coastal headland of Llandudno in North Wales.",
        location: "Great Orme, North Wales",
        imageUrl: "/artworks/cars-wales.jpg",
        imageWidth: 2000,
        imageHeight: 1333,
        featured: true,
        frameStyleId: "antique-wood",
    },
    {
        id: "overfinch",
        title: "Overfinch",
        location: "Manchester",
        imageUrl: "/artworks/overfinch.jpg",
        imageWidth: 1500,
        imageHeight: 2000,
        featured: true,
        frameStyleId: "aged-gold",
    },
    {
        id: "late-night-bus",
        title: "Late Night Bus",
        description:
            "A bus parked on a quiet road. Neon lights tunnel across the ice. The city twinkles in the distance.",
        location: "Reykjavik, Iceland",
        imageUrl: "/artworks/late-night-bus.jpg",
        imageWidth: 2000,
        imageHeight: 1500,
        featured: true,
        frameStyleId: "ebonised-wood",
    },
    {
        id: "bluebells",
        title: "Spring Climbing into the Fells",
        description:
            "A clear path through the bluebells, quietly leading you into the fells beyond.",
        location: "Bluebell Valley, Lake District",
        imageUrl: "/artworks/bluebells.jpg",
        imageWidth: 1333,
        imageHeight: 2000,
        featured: true,
        frameStyleId: "light-oak",
    },
    {
        id: "the-power-of-water",
        title: "The Power of Water",
        location: "Gullfoss, Iceland",
        imageUrl: "/artworks/the-power-of-water.jpg",
        imageWidth: 2000,
        imageHeight: 1500,
        featured: true,
        frameStyleId: "warm-walnut",
    },
];