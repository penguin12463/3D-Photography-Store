import styles from './page.module.css';
import { GalleryCanvas } from './components/GalleryCanvas';

export default function Home() {
  return (
    <main>
      <section id="gallery" className={styles.gallery}>
        <h1 className="hudGlass">Photography Gallery</h1>
        <div className={styles.canvasContainer}>
          <GalleryCanvas />
        </div>
        <a className={`${styles.catalogueLink} hudGlass`} href="#catalogue">
          View all photographs
        </a>
      </section>
      <section id="catalogue" className={styles.catalogue}>
        <h2>All Photographs</h2>
        <p>Catalogue grid will appear here.</p>
      </section>
    </main>
  );
}