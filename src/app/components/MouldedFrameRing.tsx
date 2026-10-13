import { useEffect, useMemo } from "react";
import {
    ExtrudeGeometry,
    Path,
    Shape,
} from "three";

type MouldedFrameRingProps = {
    openingWidth: number;
    openingHeight: number;
    railWidth: number;
    depth: number;
    z: number;
    bevelSize: number;
    color: string;
    roughness: number;
    metalness: number;
};

export function MouldedFrameRing({
    openingWidth,
    openingHeight,
    railWidth,
    depth,
    z,
    bevelSize,
    color,
    roughness,
    metalness,
}: MouldedFrameRingProps) {
    const geometry = useMemo(() => {
        const outerWidth =
            openingWidth + railWidth * 2;

        const outerHeight =
            openingHeight + railWidth * 2;

        const shape = new Shape();

        shape.moveTo(
            -outerWidth / 2,
            -outerHeight / 2,
        );
        shape.lineTo(
            outerWidth / 2,
            -outerHeight / 2,
        );
        shape.lineTo(
            outerWidth / 2,
            outerHeight / 2,
        );
        shape.lineTo(
            -outerWidth / 2,
            outerHeight / 2,
        );
        shape.closePath();

        const opening = new Path();

        opening.moveTo(
            -openingWidth / 2,
            -openingHeight / 2,
        );
        opening.lineTo(
            -openingWidth / 2,
            openingHeight / 2,
        );
        opening.lineTo(
            openingWidth / 2,
            openingHeight / 2,
        );
        opening.lineTo(
            openingWidth / 2,
            -openingHeight / 2,
        );
        opening.closePath();

        shape.holes.push(opening);

        const safeBevelSize = Math.min(
            bevelSize,
            railWidth * 0.45,
        );

        const safeBevelThickness = Math.min(
            safeBevelSize,
            depth * 0.35,
        );

        const ringGeometry = new ExtrudeGeometry(
            shape,
            {
                depth,
                steps: 1,
                bevelEnabled: true,
                bevelSegments: 3,
                bevelSize: safeBevelSize,
                bevelThickness: safeBevelThickness,
            },
        );

        ringGeometry.center();

        return ringGeometry;
    }, [
        openingWidth,
        openingHeight,
        railWidth,
        depth,
        bevelSize,
    ]);

    useEffect(() => {
        return () => {
            geometry.dispose();
        };
    }, [geometry]);

    return (
        <mesh position={[0, 0, z]} castShadow>
            <primitive
                object={geometry}
                attach="geometry"
            />

            <meshStandardMaterial
                color={color}
                roughness={roughness}
                metalness={metalness}
            />
        </mesh>
    );
}