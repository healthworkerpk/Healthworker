import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface SpecialSlide {
  id: string;
  imageUrl: string;
  text: string;
}

export interface SiteContent {
  heroSlides: HeroSlide[];
  specialSlides: SpecialSlide[];
  flashSaleTitle: string;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  heroSlides: [
    {
      id: "s1",
      imageUrl:
        "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1000&q=80",
      title: "Consult top specialists",
      subtitle: "Verified doctors, real-time slots",
      ctaText: "Book now",
    },
  ],
  specialSlides: [
    {
      id: "p1",
      imageUrl:
        "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80",
      text: "First consultation 20% off for new patients",
    },
  ],
  flashSaleTitle: "Flash Sale",
};

// Admin-managed home page content, read by everyone, written only from
// the Admin Panel's Ads & Banner Management page.
export async function getSiteContent(): Promise<SiteContent> {
  const snap = await getDoc(doc(db, "siteContent", "home"));
  if (!snap.exists()) return DEFAULT_SITE_CONTENT;
  const data = snap.data();
  return {
    heroSlides: data.heroSlides?.length ? data.heroSlides : DEFAULT_SITE_CONTENT.heroSlides,
    specialSlides: data.specialSlides?.length
      ? data.specialSlides
      : DEFAULT_SITE_CONTENT.specialSlides,
    flashSaleTitle: data.flashSaleTitle || DEFAULT_SITE_CONTENT.flashSaleTitle,
  };
}

export async function saveSiteContent(content: SiteContent) {
  await setDoc(
    doc(db, "siteContent", "home"),
    { ...content, updatedAt: serverTimestamp() },
    { merge: true }
  );
}
