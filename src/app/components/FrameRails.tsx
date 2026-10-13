import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, SRGBColorSpace, TextureLoader } from "three";

type FrameRailsProps = {
    openingWidth: number;
    openingHeight: number;
    railWidth: number;
    depth: number;
    z: number;
    color: string;
    roughness: number;
    metalness: number;
    colorMapUrl: string | null;
    normalMapUrl: string | null;
    roughnessMapUrl: string | null;
    textureTint: string;
};

type FrameRailMaterialProps = {
    color: string;
    roughness: number;
    metalness: number;
    colorMapUrl: string | null;
    normalMapUrl: string | null;
    roughnessMapUrl: string | null;
    textureRepeat: [number, number];
    textureRotation: number;
    textureTint: string;
};

function FrameRailMaterial({
    color,
    roughness,
    metalness,
    colorMapUrl,
    normalMapUrl,
    roughnessMapUrl,
    textureRepeat,
    textureRotation,
    textureTint,
}: FrameRailMaterialProps) {
    if (colorMapUrl && normalMapUrl && roughnessMapUrl) {
        return (
            <TexturedFrameRailMaterial
                colorMapUrl={colorMapUrl}
                normalMapUrl={normalMapUrl}
                roughnessMapUrl={roughnessMapUrl}
                roughness={roughness}
                metalness={metalness}
                textureRepeat={textureRepeat}
                textureRotation={textureRotation}
                textureTint={textureTint}
            />
        );
    }

    if (normalMapUrl) {
        return (
            <NormalMappedFrameRailMaterial
                color={color}
                normalMapUrl={normalMapUrl}
                roughness={roughness}
                metalness={metalness}
                textureRepeat={textureRepeat}
                textureRotation={textureRotation}
                textureTint={textureTint}
            />
        );
    }

    return (
        <meshStandardMaterial
            color={color}
            roughness={roughness}
            metalness={metalness}
        />
    );
}

type TexturedFrameRailMaterialProps = {
    colorMapUrl: string;
    normalMapUrl: string;
    roughnessMapUrl: string;
    roughness: number;
    metalness: number;
    textureRepeat: [number, number];
    textureRotation: number;
    textureTint: string;
};

function TexturedFrameRailMaterial({
    colorMapUrl,
    normalMapUrl,
    roughnessMapUrl,
    roughness,
    metalness,
    textureRepeat,
    textureRotation,
    textureTint,
}: TexturedFrameRailMaterialProps) {
    const [sourceColorMap, sourceNormalMap, sourceRoughnessMap] = useLoader(TextureLoader, [colorMapUrl, normalMapUrl, roughnessMapUrl]);
    const [colorMap, normalMap, roughnessMap] = useMemo(() => {
        const clonedMaps = [
            sourceColorMap.clone(),
            sourceNormalMap.clone(),
            sourceRoughnessMap.clone(),
        ];

        clonedMaps.forEach((texture) => {
            texture.needsUpdate = true;
        });

        return clonedMaps;
    }, [sourceColorMap, sourceNormalMap, sourceRoughnessMap]);

    useEffect(() => {
        return () => {
            colorMap.dispose();
            normalMap.dispose();
            roughnessMap.dispose();
        };
    }, [colorMap, normalMap, roughnessMap]);
    return (
        <meshStandardMaterial
            map={colorMap}
            map-colorSpace={SRGBColorSpace}
            map-wrapS={RepeatWrapping}
            map-wrapT={RepeatWrapping}
            map-repeat={textureRepeat}
            map-rotation={textureRotation}
            map-center={[0.5, 0.5]}
            color={textureTint}
            roughness={roughness}
            metalness={metalness}

            normalMap={normalMap}
            normalMap-wrapS={RepeatWrapping}
            normalMap-wrapT={RepeatWrapping}
            normalMap-repeat={textureRepeat}
            normalMap-rotation={textureRotation}
            normalMap-center={[0.5, 0.5]}
            normalScale={[0.35, 0.35]}

            roughnessMap={roughnessMap}
            roughnessMap-wrapS={RepeatWrapping}
            roughnessMap-wrapT={RepeatWrapping}
            roughnessMap-repeat={textureRepeat}
            roughnessMap-rotation={textureRotation}
            roughnessMap-center={[0.5, 0.5]}
        />
    );
}

type NormalMappedFrameRailMaterialProps = {
    color: string;
    normalMapUrl: string;
    roughness: number;
    metalness: number;
    textureRepeat: [number, number];
    textureRotation: number;
    textureTint: string;
};

function NormalMappedFrameRailMaterial({
    color,
    normalMapUrl,
    roughness,
    metalness,
    textureRepeat,
    textureRotation,
}: NormalMappedFrameRailMaterialProps) {
    const sourceNormalMap = useLoader(TextureLoader, normalMapUrl);

    const normalMap = useMemo(() => {
        const clonedTexture = sourceNormalMap.clone();

        clonedTexture.needsUpdate = true;

        return clonedTexture;
    }, [sourceNormalMap]);

    useEffect(() => {
        return () => {
            normalMap.dispose();
        };
    }, [normalMap]);

    return (
        <meshStandardMaterial
            color={color}
            roughness={roughness}
            metalness={metalness}
            normalMap={normalMap}
            normalMap-wrapS={RepeatWrapping}
            normalMap-wrapT={RepeatWrapping}
            normalMap-repeat={textureRepeat}
            normalMap-rotation={textureRotation}
            normalMap-center={[0.5, 0.5]}
            normalScale={[0.2, 0.2]}
        />
    );
}

export function FrameRails({
    openingWidth,
    openingHeight,
    railWidth,
    depth,
    z,
    color,
    roughness,
    metalness,
    colorMapUrl,
    normalMapUrl,
    roughnessMapUrl,
    textureTint,
}: FrameRailsProps) {
    const outerWidth = openingWidth + railWidth * 2;
    const textureTileSize = 0.5;

    return (
        <>
            <mesh position={[0, openingHeight / 2 + railWidth / 2, z]} castShadow>
                <boxGeometry args={[outerWidth, railWidth, depth]} />
                <FrameRailMaterial 
                    color={color} 
                    roughness={roughness} 
                    metalness={metalness} 
                    colorMapUrl={colorMapUrl}
                    normalMapUrl={normalMapUrl}
                    roughnessMapUrl={roughnessMapUrl}
                    textureRepeat={[
                        outerWidth / textureTileSize,
                        railWidth / textureTileSize
                    ]}
                    textureRotation={0}
                    textureTint={textureTint}
                />
            </mesh>

            <mesh position={[0, -(openingHeight / 2 + railWidth / 2), z]} castShadow>
                <boxGeometry args={[outerWidth, railWidth, depth]} />
                <FrameRailMaterial 
                    color={color} 
                    roughness={roughness} 
                    metalness={metalness} 
                    colorMapUrl={colorMapUrl}
                    normalMapUrl={normalMapUrl}
                    roughnessMapUrl={roughnessMapUrl}
                    textureRepeat={[
                        outerWidth / textureTileSize,
                        railWidth / textureTileSize
                    ]}
                    textureRotation={0}
                    textureTint={textureTint}
                />
            </mesh>

            <mesh position={[-(openingWidth / 2 + railWidth / 2), 0, z]} castShadow>
                <boxGeometry args={[railWidth, openingHeight, depth]} />
                <FrameRailMaterial 
                    color={color} 
                    roughness={roughness} 
                    metalness={metalness} 
                    colorMapUrl={colorMapUrl}
                    normalMapUrl={normalMapUrl}
                    roughnessMapUrl={roughnessMapUrl}
                    textureRepeat={[
                        openingHeight / textureTileSize,
                        railWidth / textureTileSize
                    ]}
                    textureRotation={Math.PI / 2}
                    textureTint={textureTint}
                />
            </mesh>

            <mesh position={[(openingWidth / 2 + railWidth / 2), 0, z]} castShadow>
                <boxGeometry args={[railWidth, openingHeight, depth]} />
                <FrameRailMaterial 
                    color={color} 
                    roughness={roughness} 
                    metalness={metalness} 
                    colorMapUrl={colorMapUrl}
                    normalMapUrl={normalMapUrl}
                    roughnessMapUrl={roughnessMapUrl}
                    textureRepeat={[
                        openingHeight / textureTileSize,
                        railWidth / textureTileSize
                    ]}
                    textureRotation={Math.PI / 2}
                    textureTint={textureTint}
                />
            </mesh>
        </>
    )
}
