import { useEffect, useRef } from "react";
import { Object3D, SpotLight } from "three";

type ArtworkSpotlightProps = {
    x: number;
}

export function ArtworkSpotlight({
    x,
}: ArtworkSpotlightProps) {
    const lightRef = useRef<SpotLight>(null);
    const targetRef = useRef<Object3D>(null);

    useEffect(() => {
        const light = lightRef.current;
        const target = targetRef.current;

        if (!light || !target) {
            return;
        }

        light.target = target;
    }, []);

    return (
        <>
            <spotLight
                ref={lightRef}
                position={[x, 3.2, 1.4]}
                color="#fff2d5"
                intensity={12}
                angle={0.42}
                penumbra={0.75}
                distance={5}
                decay={2}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-bias={-0.0002}
            />

            <object3D
                ref={targetRef}
                position={[x, 1.55, 0.1]}
            />
        </>
    )
}