// Central configuration for the MAF Coffee & Lounge landing page.
// Edit these values to update links, contact info and content across the page.

export const siteConfig = {
  brand: "MAF",
  businessName: "MAF Coffee & Lounge",
  tagline: "Coffee & Lounge",
  slogan: "FEEL THE RİTUEL",
  city: "Yalova",
  locationLabel: "Yal Sk. 4/A · Armutlu / Yalova",
  accentColor: "#b89eff",

  // Opening hours (shown only in the location card)
  hoursLabel: "Her gün · 08:00 – 03:00",

  // Links
  instagramHandle: "mafcoffee.lounge",
  mapsListingName: "maftayız",
  mapsProfileUrl: "https://maps.app.goo.gl/GufxY27heev4Zgp4A",
  menuUrl: "https://maf-lounge-menu.vercel.app/",

  // Logo: the club (♣) mark. By default it renders as a flat purple SVG.
  // To use your own transparent PNG/SVG instead, drop it in public/images/
  // and set logoSrc, e.g. "/images/logo.png".
  logoSrc: "/images/Gemini_Generated_Image_4b6atn4b6atn4b6a.png",
  logoColor: "#450d73", // brand purple (used by the built-in SVG fallback)

  // Hero video: drop a file at public/videos/hero.mp4 to enable it.
  // Until then the hero falls back to a cinematic gradient backdrop.
  heroVideo: "/videos/hero.mp4",
  heroPoster: "", // optional poster image, e.g. "/images/hero-poster.jpg"

  // Menu preview grid. Provide up to 6 image paths (e.g. "/images/menu-1.jpg").
  // Empty slots render as elegant placeholders.
  menuPhotos: [
    "/images/1CE17443-E977-44D4-8769-864AACD1E38F.PNG",
    "/images/2F8A7D2C-FA49-4F9B-9149-B06CA1F9FBFE.PNG",
    "/images/3774327D-E8E4-487A-AE4E-C90FD2F56C7D.PNG",
    "/images/585032FA-5626-4D92-8D2E-9523A1C62E4D.PNG",
    "/images/92FFBD8B-48DD-4D48-AEEB-B95A3985DC66.PNG",
    "/images/9BD9E547-81F3-41EE-8E7F-C0B315FD2091.PNG",
  ],

  // Instagram video grid. Tapping a preview opens a full-screen Reels viewer.
  instagramVideos: [
    "/videos/ig/Gu%CC%88ne%20bo%CC%88yle%20bas%CC%A7lamak%20bir%20tercih%20deg%CC%86il%2C%20bir%20ihtiyac%CC%A7.%20%E2%98%95%EF%B8%8F%E2%9C%A8%20%23kahvalt%C4%B1%20%23lifestyle%20%23aesthetic%20%23morningv.mp4",
    "/videos/ig/Ko%CC%88zler%20haz%C4%B1r%2C%20taze%20meyveler%20yerinde%2C%20okey%20masas%C4%B1%20kuruldu%21%20%F0%9F%8E%B2%20Ekibi%20toplay%C4%B1p%20gelmelik%20o%20aks%CC%A7am%2C%20bu.mp4",
    "/videos/ig/Maf%E2%80%99%C4%B1n%20resmi%20tad%C4%B1m%20s%CC%A7efleri%20is%CC%A7%20bas%CC%A7%C4%B1nda%21%20%F0%9F%98%8E%20Demir%20ve%20Yag%CC%86%C4%B1z%E2%80%99%C4%B1n%20bu%20lezzet%20testinden%20tam%20not%20ald%C4%B1k%20di.mp4",
    "/videos/ig/Masada%20dostluk%20biter%2C%20tas%CC%A7lar%20dag%CC%86%C4%B1t%C4%B1l%C4%B1nca%20oyun%20bas%CC%A7lar%21%20%F0%9F%98%8E%20okey%20ve%20kag%CC%86%C4%B1t%20gecesi%20klasig%CC%86i.%20Kimler%20bu.mp4",
    "/videos/ig/Okey%20MAF%E2%80%99da%20gu%CC%88zel%2C%20yeni%20adresiniz%20%F0%9F%93%8D%E2%99%A0%EF%B8%8F%20%23ak%C4%B1mvideolar%C4%B1%20%23coffetime%20%23okeymasas%C4%B1%20%23yalova.mp4",
    "/videos/ig/copy_D0899E68-C49C-40B9-AA1F-95A2A5A35F8B%202.MOV",
  ],
} as const;

export const igHref = `https://instagram.com/${siteConfig.instagramHandle.replace(
  /^@/,
  "",
)}`;

export const igLabel = `@${siteConfig.instagramHandle.replace(/^@/, "")}`;

export const mapsProfileHref = siteConfig.mapsProfileUrl;
export const mapsHref = mapsProfileHref;
