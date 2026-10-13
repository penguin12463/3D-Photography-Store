import type { Artwork } from "@/data/artworks";
import styles from "./ArtworkOverlay.module.css";

type ArtworkOverlayProps = {
    artwork: Artwork;
    startingPrice: string;
    onClose: () => void;
    onBuyNow?: () => void;
};

export function ArtworkOverlay({
    artwork,
    startingPrice,
    onClose,
    onBuyNow,
}: ArtworkOverlayProps) {
    const titleId = `artwork-overlay-title-${artwork.id}`;

    return (
        <aside className={`${styles.overlay} hudGlass`} aria-labelledby={titleId}>
            <button
                type="button"
                className={styles.closeButton}
                aria-label={`Close details for ${artwork.title}`}
                onClick={onClose}
            >
                x
            </button>

            <h2 id={titleId}>{artwork.title}</h2>

            <p>{artwork.location}</p>

            {artwork.description && (
                <p>{artwork.description}</p>
            )}

            <p>From {startingPrice}</p>

            <button type="button" disabled={!onBuyNow} onClick={onBuyNow}>
                Buy Now
            </button>
        </aside>
    )
}