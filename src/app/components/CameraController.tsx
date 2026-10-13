import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

type  CameraControllerProps = {
    targetX: number;
};

export function CameraController({targetX,}: CameraControllerProps) {
    const prefersReducedMotion = useRef(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        function updatePreference() {
            prefersReducedMotion.current = mediaQuery.matches;
        }

        updatePreference();

        mediaQuery.addEventListener("change", updatePreference);

        return () => {
            mediaQuery.removeEventListener("change", updatePreference);
        };
    }, []);
    
    useFrame(({ camera }, delta) => {
        if (prefersReducedMotion.current) {
            camera.position.x = targetX;
            return;
        }

        const dampingRate = 5;
        const progress = 1 - Math.exp(-dampingRate * delta);
        
        camera.position.x +=
            (targetX - camera.position.x) * progress;
    });

    return null;
}