"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  MapPin,
  ShoppingBag,
  Navigation,
  ArrowUpRight,
  Clock3,
  Play,
  X,
} from "lucide-react";
import styles from "./maf-lounge.module.css";
import {
  siteConfig,
  igHref,
  igLabel,
  mapsHref,
  mapsProfileHref,
} from "./site-config";

/* ---------- Brand club mark (♣) ---------- */
function ClubMark({
  className,
  useImage = false,
}: {
  className?: string;
  useImage?: boolean;
}) {
  // The hero can use the supplied logo asset; compact marks use the flat SVG.
  if (useImage && siteConfig.logoSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={siteConfig.logoSrc} alt="MAF" className={className} />;
  }
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill={siteConfig.logoColor}
      aria-hidden
      role="img"
    >
      <circle cx="50" cy="30" r="18" />
      <circle cx="31.5" cy="54" r="18.5" />
      <circle cx="68.5" cy="54" r="18.5" />
      <path d="M50 54 Q43.5 73 40 85 Q39 89.5 45.5 89.5 L54.5 89.5 Q61 89.5 60 85 Q56.5 73 50 54 Z" />
    </svg>
  );
}

/* ---------- Instagram brand glyph (lucide dropped brand icons) ---------- */
function InstagramGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhotoGrid({
  photos,
  altPrefix,
}: {
  photos: readonly string[];
  altPrefix: string;
}) {
  return (
    <div className={styles.photoGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.photoCell}>
          {photos[i] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photos[i]} alt={`${altPrefix} ${i + 1}`} />
          ) : (
            <ClubMark className={styles.photoPlaceholder} />
          )}
        </div>
      ))}
    </div>
  );
}

function VideoGrid({
  videos,
  onSelect,
}: {
  videos: readonly string[];
  onSelect: (video: string) => void;
}) {
  return (
    <div className={styles.photoGrid}>
      {Array.from({ length: 6 }).map((_, i) =>
        videos[i] ? (
          <button
            key={videos[i]}
            type="button"
            className={`${styles.photoCell} ${styles.videoCell}`}
            onClick={() => onSelect(videos[i])}
            aria-label={`Instagram videosu ${i + 1} aç`}
          >
            <video
              src={videos[i]}
              muted
              playsInline
              preload="none"
              aria-hidden
            />
            <span className={styles.videoPlay} aria-hidden>
              <Play size={22} fill="currentColor" />
            </span>
          </button>
        ) : (
          <div key={i} className={styles.photoCell}>
            <ClubMark className={styles.photoPlaceholder} />
          </div>
        ),
      )}
    </div>
  );
}

export default function MafLounge() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Apply accent color from config
    root.style.setProperty("--maf-accent", siteConfig.accentColor);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Cinematic hero reveal (staggered rise + blur-to-sharp)
    const heroEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hero]"),
    ).sort(
      (a, b) =>
        Number(a.getAttribute("data-hero")) -
        Number(b.getAttribute("data-hero")),
    );

    if (prefersReduced) {
      heroEls.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
    } else {
      heroEls.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(18px)";
        el.style.filter = "blur(6px)";
        el.style.willChange = "opacity, transform, filter";
      });
      requestAnimationFrame(() => {
        heroEls.forEach((el, i) => {
          const d = 0.32 + i * 0.28;
          el.style.transition = `opacity 1.3s cubic-bezier(.2,.7,.15,1) ${d}s, transform 1.4s cubic-bezier(.2,.7,.15,1) ${d}s, filter 1.3s ease ${d}s`;
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.filter = "none";
        });
      });
    }

    // Reveal cards on scroll
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let io: IntersectionObserver | null = null;
    if (prefersReduced) {
      cards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
    } else {
      cards.forEach((c, i) => {
        c.style.opacity = "0";
        c.style.transform = "translateY(26px)";
        c.style.transition = `opacity .9s cubic-bezier(.2,.7,.2,1) ${i * 0.08}s, transform .9s cubic-bezier(.2,.7,.2,1) ${i * 0.08}s`;
      });
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                const t = e.target as HTMLElement;
                t.style.opacity = "1";
                t.style.transform = "none";
                io?.unobserve(t);
              }
            });
          },
          { threshold: 0.18 },
        );
        cards.forEach((c) => io?.observe(c));
      } else {
        cards.forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "none";
        });
      }
    }

    // Video: persist playback position + ensure autoplay
    const v = videoRef.current;
    let onTimeUpdate: (() => void) | null = null;
    if (v) {
      try {
        const saved = parseFloat(localStorage.getItem("maf_video_t") || "0");
        if (saved > 0) v.currentTime = saved;
      } catch {}
      let last = 0;
      onTimeUpdate = () => {
        const now = Date.now();
        if (now - last > 1500) {
          last = now;
          try {
            localStorage.setItem("maf_video_t", String(v.currentTime));
          } catch {}
        }
      };
      v.addEventListener("timeupdate", onTimeUpdate);
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    }

    return () => {
      io?.disconnect();
      if (v && onTimeUpdate) v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeVideo]);

  return (
    <div ref={rootRef} className={styles.root}>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroFallback} aria-hidden />
        {siteConfig.heroVideo && (
          <video
            ref={videoRef}
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={siteConfig.heroPoster || undefined}
          >
            <source src={siteConfig.heroVideo} type="video/mp4" />
          </video>
        )}

        <div className={styles.grade} aria-hidden />
        <div className={styles.vignette} aria-hidden />
        <div className={styles.bloom} aria-hidden />

        {/* Logo + slogan — upper area */}
        <div className={styles.heroTop}>
          <div data-hero="0" className={styles.club}>
            <ClubMark className={styles.clubSvg} useImage />
          </div>
          <div className={styles.slogan}>
            <span className={styles.sloganRuleL} />
            <span className={styles.sloganText}>{siteConfig.slogan}</span>
            <span className={styles.sloganRuleR} />
          </div>
        </div>

        <div data-hero="1" className={styles.scrollHint}>
          <span className={styles.scrollHintText}>Keşfet</span>
          <span className={styles.scrollHintLine} />
        </div>
      </section>

      {/* ---------- Cards ---------- */}
      <section className={styles.cards}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Neler var?</span>
          <h2 className={styles.sectionTitle}>#maftayız</h2>
        </div>

        <div className={styles.cardStack}>
          {/* MENU */}
          <div data-reveal className={styles.card}>
            <a
              href={siteConfig.menuUrl}
              target="_blank"
              rel="noopener"
              className={`${styles.cardRow} ${styles.cardRowTight}`}
            >
              <div className={styles.cardIcon}>
                <BookOpen size={22} strokeWidth={1.6} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>Menü</div>
                <div className={styles.cardDesc}>Dijital menümüzü keşfedin</div>
              </div>
              <span className={styles.cardArrow}>
                <ArrowUpRight size={19} strokeWidth={2} />
              </span>
            </a>

            <PhotoGrid
              photos={siteConfig.menuPhotos}
              altPrefix="MAF menü görseli"
            />

            <a
              href={siteConfig.menuUrl}
              target="_blank"
              rel="noopener"
              className={`${styles.cardCta} ${styles.gridCtaSpacer}`}
            >
              <BookOpen size={15} strokeWidth={1.7} />
              Menüyü İncele
            </a>
          </div>

          {/* INSTAGRAM */}
          <div data-reveal className={styles.card}>
            <a
              href={igHref}
              target="_blank"
              rel="noopener"
              className={`${styles.cardRow} ${styles.cardRowTight}`}
            >
              <div className={styles.cardIcon}>
                <InstagramGlyph size={22} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>Instagram</div>
                <div className={styles.cardDesc}>{igLabel}</div>
              </div>
              <span className={styles.cardArrow}>
                <ArrowUpRight size={19} strokeWidth={2} />
              </span>
            </a>

            <VideoGrid
              videos={siteConfig.instagramVideos}
              onSelect={setActiveVideo}
            />

            <a
              href={igHref}
              target="_blank"
              rel="noopener"
              className={`${styles.cardCta} ${styles.gridCtaSpacer}`}
            >
              <InstagramGlyph size={15} />
              Bizi Takip Et
            </a>
          </div>

          {/* KONUM */}
          <div data-reveal className={`${styles.card} ${styles.mapCard}`}>
            <div className={`${styles.cardRow} ${styles.cardRowTight}`}>
              <div className={styles.cardIcon}>
                <MapPin size={22} strokeWidth={1.6} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>Bizi Bulun</div>
                <div className={styles.cardDesc}>{siteConfig.locationLabel}</div>
              </div>
            </div>

            <a
              href={mapsProfileHref}
              target="_blank"
              rel="noopener"
              className={styles.mapFrame}
              aria-label="Google işletme profilinde görüntüle"
            >
              <svg
                className={styles.mapArtwork}
                viewBox="0 0 400 190"
                preserveAspectRatio="none"
                aria-hidden
              >
                <rect className={styles.mapWater} width="400" height="190" />
                <path
                  className={styles.mapLand}
                  d="M218 -8 C240 19 267 27 281 48 C296 70 286 89 309 111 C333 134 360 132 410 126 L410 -8 Z"
                />
                <path
                  className={styles.mapCoastRoad}
                  d="M234 2 C256 28 278 36 292 56 C308 78 302 92 322 110 C343 128 366 124 408 119"
                />
                <path
                  className={styles.mapSideRoad}
                  d="M284 47 C315 35 342 20 368 -3 M307 78 C338 66 365 48 405 35 M329 105 C354 93 378 79 410 72"
                />
                <path
                  className={styles.mapWave}
                  d="M22 46 C52 34 82 34 112 46 S172 58 202 46 M0 92 C30 80 60 80 90 92 S150 104 180 92 M32 141 C62 129 92 129 122 141 S182 153 212 141"
                />
              </svg>

              <div className={styles.mapMarker} aria-hidden>
                <span className={styles.mapMarkerPulse} />
                <MapPin size={32} strokeWidth={2} fill="currentColor" />
              </div>
              <div className={styles.mapMarkerLabel}>
                {siteConfig.mapsListingName}
              </div>
              <div className={styles.mapPinBadge}>
                <MapPin size={13} strokeWidth={2} />
                {siteConfig.locationLabel}
              </div>
            </a>

            <div className={styles.mapDetails}>
              <div className={styles.mapEyebrow}>Buradayız</div>
              <div className={styles.mapBusinessName}>
                {siteConfig.businessName}
              </div>
              <div className={styles.mapMeta}>
                <span className={styles.mapStatusDot} aria-hidden />
                <Clock3 size={14} strokeWidth={1.8} />
                <span>{siteConfig.hoursLabel}</span>
              </div>
            </div>

            <div className={styles.mapActions}>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener"
                className={styles.mapPrimaryAction}
              >
                <Navigation size={16} strokeWidth={2} />
                Yol Tarifi
              </a>
            </div>
          </div>

          {/* ONLINE ORDER — coming soon */}
          <div data-reveal className={`${styles.card} ${styles.cardMuted}`}>
            <div className={styles.cardRow}>
              <div className={styles.cardIcon}>
                <ShoppingBag size={22} strokeWidth={1.6} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>Online Sipariş</div>
                <div className={styles.cardDesc}>Tıkla, sipariş ver</div>
              </div>
              <span className={styles.badgeSoon}>Çok Yakında</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className={styles.footer}>
        <ClubMark className={styles.footerClub} />
        <div className={styles.footerMark}>{siteConfig.brand}</div>
        <div className={styles.footerSub}>{siteConfig.tagline}</div>

        <div className={styles.footerSocials}>
          <a
            href={igHref}
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            className={styles.socialLink}
          >
            <InstagramGlyph size={17} />
          </a>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener"
            aria-label="Konum"
            className={styles.socialLink}
          >
            <MapPin size={17} strokeWidth={1.6} />
          </a>
          <a
            href={siteConfig.menuUrl}
            target="_blank"
            rel="noopener"
            aria-label="Menü"
            className={styles.socialLink}
          >
            <BookOpen size={16} strokeWidth={1.6} />
          </a>
        </div>

        <div className={styles.footerMeta}>
          © 2026 MAF Coffee &amp; Lounge · maftayız.com
        </div>
      </footer>

      {activeVideo && (
        <div
          className={styles.reelsBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reels-title"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className={styles.reelsPlayer}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.reelsTopbar}>
              <span id="reels-title" className={styles.reelsTitle}>
                Reels
              </span>
              <button
                type="button"
                className={styles.reelsClose}
                onClick={() => setActiveVideo(null)}
                aria-label="Videoyu kapat"
                autoFocus
              >
                <X size={24} />
              </button>
            </div>
            <video
              key={activeVideo}
              className={styles.reelsVideo}
              src={activeVideo}
              autoPlay
              controls
              loop
              playsInline
            />
            <div className={styles.reelsHandle}>{igLabel}</div>
          </div>
        </div>
      )}
    </div>
  );
}
