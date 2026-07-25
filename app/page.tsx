"use client";

import { useEffect, useState } from "react";
import TopHeader from "@/components/TopHeader";
import HeroSlider from "@/components/HeroSlider";
import SpecialForYouSection from "@/components/SpecialForYouSection";
import DoctorCategoryGrid from "@/components/DoctorCategoryGrid";
import FlashSaleSection from "@/components/FlashSaleSection";
import BottomTabBar from "@/components/BottomTabBar";
import { DOCTORS } from "@/lib/doctors-data";
import { getSiteContent, DEFAULT_SITE_CONTENT, SiteContent } from "@/lib/site-content";

export default function HomePage() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen pb-20 md:pb-8">
      <TopHeader />
      <HeroSlider slides={content.heroSlides} />
      <SpecialForYouSection slides={content.specialSlides} />
      <DoctorCategoryGrid />
      <FlashSaleSection title={content.flashSaleTitle} doctors={DOCTORS} />
      <BottomTabBar />
    </main>
  );
}
