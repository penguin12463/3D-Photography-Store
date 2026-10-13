import { useLoader } from "@react-three/fiber";
import { SRGBColorSpace, TextureLoader } from "three";
import { frameStyles } from "@/data/frame-styles";
import type { Artwork } from "@/data/artworks";
import { FrameRails } from "./FrameRails";
import { MouldedFrameRing } from "./MouldedFrameRing";

type FramedArtworkProps = {
    artwork: Artwork;
    position: [number, number, number];
    onHoverChange: (artworkId: string | null) => void;
    onSelect: (artworkId: string) => void;
};

export function FramedArtwork({ artwork, position, onHoverChange, onSelect }: FramedArtworkProps) {
    const photographTexture = useLoader(TextureLoader, artwork.imageUrl);
    const frameStyle = frameStyles[artwork.frameStyleId];
    const longestEdge = 1;
    const sourceLongestEdge = Math.max(
        artwork.imageWidth,
        artwork.imageHeight
    );
    const scale = longestEdge / sourceLongestEdge;
    const photographWidth = artwork.imageWidth * scale;
    const photographHeight = artwork.imageHeight * scale;
    const mount = "mount" in frameStyle ? frameStyle.mount : null;
    const mountWidth = mount?.width ?? 0;
    const frameOpeningWidth = photographWidth + mountWidth * 2;
    const frameOpeningHeight = photographHeight + mountWidth * 2;
    const railWidth = frameStyle.railWidth;
    const frameDepth = frameStyle.depth;
    const bevelSize = "bevelSize" in frameStyle ? frameStyle.bevelSize :0.012;
    const railZ = frameDepth / 2 - 0.01;
    const frameWidth = frameOpeningWidth + railWidth * 2;
    const frameHeight = frameOpeningHeight + railWidth * 2;

    return (
        <group position={position}>
            {mount && (
                <mesh
                    position={[0, 0, 0.01]}
                    receiveShadow
                >
                    <planeGeometry
                        args={[
                            frameOpeningWidth,
                            frameOpeningHeight,
                        ]}
                    />

                    <meshStandardMaterial
                        color={mount.color}
                        roughness={0.95}
                        metalness={0}
                    />
                </mesh>
            )}
            <mesh 
                position={[0, 0, 0.015]}
                receiveShadow
                onPointerOver={(event) => {
                    event.stopPropagation();
                    onHoverChange(artwork.id);
                }}
                onPointerOut={(event) => {
                    event.stopPropagation();
                    onHoverChange(null);
                }}
                onClick={(event) => {
                    event.stopPropagation();

                    if (event.delta <= 5) {
                        onSelect(artwork.id);
                    }
                }}
            >
                <planeGeometry args={[photographWidth, photographHeight]} />
                <meshPhysicalMaterial map={photographTexture} map-colorSpace={SRGBColorSpace} roughness={0.38} clearcoat={0.85} clearcoatRoughness={0.16} />
            </mesh>
            {frameStyle.profile === "plain" ? (
                <FrameRails
                    openingWidth={frameOpeningWidth}
                    openingHeight={frameOpeningHeight}
                    railWidth={railWidth}
                    depth={frameDepth}
                    z={railZ}
                    color={frameStyle.color}
                    roughness={frameStyle.roughness}
                    metalness={frameStyle.metalness}
                    colorMapUrl={frameStyle.colorMapUrl}
                    normalMapUrl={frameStyle.normalMapUrl}
                    roughnessMapUrl={frameStyle.roughnessMapUrl}
                    textureTint={frameStyle.textureTint}
                />
            ) : (
                <MouldedFrameRing
                    openingWidth={photographWidth}
                    openingHeight={photographHeight}
                    railWidth={railWidth}
                    depth={frameDepth}
                    z={railZ}
                    bevelSize={bevelSize}
                    color={frameStyle.color}
                    roughness={frameStyle.roughness}
                    metalness={frameStyle.metalness}
                />
            )}
            {frameStyle.profile === "stepped" && (
                <MouldedFrameRing
                    openingWidth={frameWidth}
                    openingHeight={frameHeight}
                    railWidth={frameStyle.outerMoulding.railWidth}
                    depth={frameStyle.outerMoulding.depth}
                    z={
                        frameDepth -
                        frameStyle.outerMoulding.depth / 2 -
                        0.002
                    }
                    bevelSize={0.006}
                    color={frameStyle.outerMoulding.color}
                    roughness={frameStyle.outerMoulding.roughness}
                    metalness={frameStyle.outerMoulding.metalness}
                />
            )}
            {frameStyle.profile === "stepped" && (
                <MouldedFrameRing
                    openingWidth={photographWidth}
                    openingHeight={photographHeight}
                    railWidth={frameStyle.innerTrim.railWidth}
                    depth={frameStyle.innerTrim.depth}
                    z={
                        frameDepth -
                        frameStyle.innerTrim.depth / 2 -
                        0.004
                    }
                    bevelSize={0.004}
                    color={frameStyle.innerTrim.color}
                    roughness={frameStyle.innerTrim.roughness}
                    metalness={frameStyle.innerTrim.metalness}
                />
            )}
        </group>
    );
}
