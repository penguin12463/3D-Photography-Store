"use client";

import { Canvas } from "@react-three/fiber";
import { GalleryEnvironment } from "./GalleryEnvironment";
import { FramedArtwork } from "./FramedArtwork";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { artworks } from "@/data/artworks";
import { CameraController } from "./CameraController";
import styles from "./GalleryCanvas.module.css";
import { ArtworkOverlay } from "./ArtworkOverlay";
import { mockPrintSizes, storeCurrency } from "@/data/print-options";
import { findStartingPriceMinor, formatPriceMinor } from "@/lib/pricing";
import { ArtworkSpotlight } from "./ArtworkSpotlight";

const ARTWORK_SPACING = 2;

export function GalleryCanvas() {
    const featuredArtworks = artworks.filter((artwork) => artwork.featured);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredArtworkId, setHoveredArtworkId] = 
        useState<string | null>(null);
    const [settledArtworkId, setSettledArtworkId] =
        useState<string | null>(null);
    const wheelDelta = useRef(0);
    const wheelLocked = useRef(false);
    const wheelEndTimer = useRef<number | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const touchStart = useRef<{
        x: number;
        y: number;
    } | null>(null);
    const touchCurrent = useRef<{
        x: number;
        y: number;
    } | null>(null);
    const lastIndex = featuredArtworks.length - 1;
    const targetX = currentIndex * ARTWORK_SPACING;
    const currentArtwork = featuredArtworks[currentIndex];
    const hoveredArtwork = featuredArtworks.find(
        (artwork) => artwork.id === hoveredArtworkId,
    );
    const settledArtwork =
        settledArtworkId === currentArtwork?.id
            ? currentArtwork
            : undefined;
    const activeArtwork = hoveredArtwork ?? settledArtwork;
    const startingPriceMinor = findStartingPriceMinor(mockPrintSizes);
    const startingPrice = startingPriceMinor === null
        ? null
        : formatPriceMinor(
            startingPriceMinor,
            storeCurrency,
        );

    const navigateBy = useCallback(
        (direction: -1 | 1) => {
            setHoveredArtworkId(null);

            setCurrentIndex((index) =>
                Math.min(
                    lastIndex,
                    Math.max(0, index + direction),
                ),
            );
        },
        [lastIndex, setHoveredArtworkId],
    );
    useEffect(() => {
        if (!currentArtwork) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSettledArtworkId(currentArtwork.id);
        }, 2500);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [currentArtwork]);

    useEffect(() => {
        const wrapper = wrapperRef.current;

        if (!wrapper) {
            return;
        }

        function scheduleWheelUnlock() {
            if (wheelEndTimer.current !== null) {
                window.clearTimeout(wheelEndTimer.current);
            }

            wheelEndTimer.current = window.setTimeout(() => {
                wheelLocked.current = false;
                wheelDelta.current = 0;
                wheelEndTimer.current = null;
            }, 200);
        }

        function handleWheel(event: WheelEvent) {
            const delta =
                Math.abs(event.deltaX) > Math.abs(event.deltaY)
                ? event.deltaX
                : event.deltaY;

            if (delta === 0) {
                return;
            }

            if (wheelLocked.current) {
                event.preventDefault();
                scheduleWheelUnlock();
                return;
            }

            const direction = delta > 0 ? 1 : -1;

            const canNavigate =
                direction > 0
                ? currentIndex < lastIndex
                : currentIndex > 0;

            if (!canNavigate) {
                wheelDelta.current = 0;
                return;
            }

            event.preventDefault();
            wheelDelta.current += delta;

            const threshold = 60;

            if (Math.abs(wheelDelta.current) < threshold) {
                return;
            }

            wheelDelta.current = 0;
            wheelLocked.current = true;

            scheduleWheelUnlock();

            navigateBy(direction);
        }

        wrapper.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            wrapper.removeEventListener("wheel", handleWheel);
        };
    }, [currentIndex, lastIndex, navigateBy]);

    useEffect(() => {
        const wrapper = wrapperRef.current;

        if (!wrapper) {
            return;
        }

        const swipeThreshold = 50;

        function resetTouch() {
            touchStart.current = null;
            touchCurrent.current = null;
        }

        function handleTouchStart(event: TouchEvent) {
            if (event.touches.length !== 1) {
                resetTouch();
                return;
            }

            const touch = event.touches[0];

            touchStart.current = {
                x: touch.clientX,
                y: touch.clientY,
            };
        }

        function handleTouchMove(event: TouchEvent) {
            const start = touchStart.current;
            const touch = event.touches[0];

            if (!start || !touch) {
                return;
            }

            touchCurrent.current = {
                x: touch.clientX,
                y: touch.clientY,
            };

            const deltaX = start.x - touch.clientX;
            const deltaY = start.y - touch.clientY;

            const dominantDelta =
                Math.abs(deltaX) > Math.abs(deltaY)
                ? deltaX
                : deltaY;
            
            if (Math.abs(dominantDelta) < 8) {
                return;
            }

            const direction = dominantDelta > 0 ? 1 : -1;

            const canNavigate =
                direction > 0
                ? currentIndex < lastIndex
                : currentIndex > 0;

            if (canNavigate) {
                event.preventDefault();
            }
        }

        function handleTouchEnd() {
            const start = touchStart.current;
            const current = touchCurrent.current;

            if (!start || !current) {
                resetTouch();
                return;
            }

            const deltaX = start.x - current.x;
            const deltaY = start.y - current.y;

            const dominantDelta =
                Math.abs(deltaX) > Math.abs(deltaY)
                ? deltaX
                : deltaY;
            
            const direction = dominantDelta > 0 ? 1 : -1;

            const canNavigate =
                direction > 0
                ? currentIndex < lastIndex
                : currentIndex > 0;

            if (
                Math.abs(dominantDelta) >= swipeThreshold &&
                canNavigate
            ) {
                navigateBy(direction);
            }

            resetTouch();
        }
    wrapper.addEventListener(
        "touchstart",
        handleTouchStart,
    );

    wrapper.addEventListener(
        "touchmove",
        handleTouchMove,
        { passive: false },
    );

    wrapper.addEventListener(
        "touchend",
        handleTouchEnd,
    );

    wrapper.addEventListener(
        "touchcancel",
        resetTouch,
    );

    return () => {
        wrapper.removeEventListener(
            "touchstart",
            handleTouchStart,
        );

        wrapper.removeEventListener(
            "touchmove",
            handleTouchMove,
        );

        wrapper.removeEventListener(
            "touchend",
            handleTouchEnd,
        );

        wrapper.removeEventListener(
            "touchcancel",
            resetTouch,
        );
    };
}, [currentIndex, lastIndex, navigateBy]);

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <Canvas shadows camera={{ position: [0, 1.6, 2], rotation: [0, 0, 0], fov: 60 }}>
                <color attach="background" args={["#e9e7e2"]} />
                <ambientLight intensity={0.45} />
                <directionalLight position={[3, 4, 5]} intensity={1.1} />
                <CameraController targetX={targetX} />
                <GalleryEnvironment />
                {featuredArtworks.map((artwork, index) => (
                    <ArtworkSpotlight
                        key={`spotlight-${artwork.id}`}
                        x={index * ARTWORK_SPACING}
                    />
                ))}
                <Suspense fallback={null}>
                    {featuredArtworks.map((artwork, index) => (
                        <FramedArtwork 
                            key={artwork.id} 
                            artwork={artwork} 
                            position={[index * ARTWORK_SPACING, 1.6, 0.115]} 
                            onHoverChange={(artworkId) => {
                                setHoveredArtworkId(artworkId);

                                if (artworkId !== null) {
                                    setSettledArtworkId(artworkId);
                                }
                            }}
                            onSelect={setSettledArtworkId}
                        />
                    ))}
                </Suspense>
            </Canvas>

            {activeArtwork && startingPrice && (
                <ArtworkOverlay
                    artwork={activeArtwork}
                    startingPrice={startingPrice}
                    onClose={() => {
                        setHoveredArtworkId(null);
                        setSettledArtworkId(null);
                    }}
                />
            )}
            
            <nav className={styles.controls} aria-label="Featured artwork navigation">
                <button
                    className={`${styles.arrow} ${styles.previousArrow}`}
                    type="button"
                    aria-label="Previous artwork"
                    disabled={currentIndex === 0}
                    onClick={() => 
                        navigateBy(-1)
                    }
                >
                    <span className={`${styles.chevron} ${styles.chevronLeft}`} aria-hidden="true" />
                </button>

                <span className={styles.status} aria-live="polite">
                    Artwork {currentIndex + 1} of {featuredArtworks.length}
                </span>

                <button
                    className={`${styles.arrow} ${styles.nextArrow}`}
                    type="button"
                    aria-label="Next artwork"
                    disabled={currentIndex === lastIndex}
                    onClick={() =>
                        navigateBy(1)
                    }
                >
                    <span className={`${styles.chevron} ${styles.chevronRight}`} aria-hidden="true" />
                </button>
            </nav>
        </div>
    );
}