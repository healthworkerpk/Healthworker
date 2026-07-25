"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Plus, Trash2, CheckCircle2, UploadCloud } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  getSiteContent,
  saveSiteContent,
  DEFAULT_SITE_CONTENT,
  SiteContent,
  HeroSlide,
  SpecialSlide,
} from "@/lib/site-content";
import SidebarLayout from "@/components/SidebarLayout";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";
import Button from "@/components/Button";

function newId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function AdminAdsPage() {
  const router = useRouter();
  const { user, role, loading } = useCurrentUser();
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loadingContent, setLoadingContent] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (role === "admin") {
      getSiteContent().then((c) => {
        setContent(c);
        setLoadingContent(false);
      });
    }
  }, [role]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink/50">Loading...</p>
      </main>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <ShieldAlert size={32} className="text-rausch" />
        <p className="mt-3 text-sm text-ink/60">This account doesn&apos;t have admin access.</p>
      </main>
    );
  }

  async function uploadFor(id: string, file: File, cb: (url: string) => void) {
    setUploadingId(id);
    try {
      const url = await uploadToCloudinary(file, "flash-sales");
      cb(url);
    } catch {
      alert("Upload failed. Check Cloudinary env vars.");
    } finally {
      setUploadingId(null);
    }
  }

  function updateHero(id: string, field: keyof HeroSlide, value: string) {
    setContent((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  }

  function updateSpecial(id: string, field: keyof SpecialSlide, value: string) {
    setContent((prev) => ({
      ...prev,
      specialSlides: prev.specialSlides.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  }

  async function handleSave() {
    setSaving(true);
    await saveSiteContent(content);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <SidebarLayout navItems={ADMIN_NAV_ITEMS}>
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Ads &amp; Banner Management</h1>
        <p className="mt-1 text-sm text-ink/60">
          Controls the home page hero slides, #SpecialForYou strip, and the
          Flash Sale section title.
        </p>

        {loadingContent ? (
          <p className="mt-6 text-sm text-ink/50">Loading content...</p>
        ) : (
          <>
            {/* Hero slides */}
            <section className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink/70">Hero slides</h2>
                <button
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      heroSlides: [
                        ...prev.heroSlides,
                        { id: newId(), imageUrl: "", title: "", subtitle: "", ctaText: "Book now" },
                      ],
                    }))
                  }
                  className="flex items-center gap-1 text-sm font-medium text-rausch"
                >
                  <Plus size={14} />
                  Add slide
                </button>
              </div>
              <div className="space-y-3">
                {content.heroSlides.map((slide) => (
                  <div key={slide.id} className="rounded-card border border-hairline p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-ink/50">Slide</span>
                      <button
                        onClick={() =>
                          setContent((prev) => ({
                            ...prev,
                            heroSlides: prev.heroSlides.filter((s) => s.id !== slide.id),
                          }))
                        }
                        className="text-ink/40 hover:text-rausch"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <label className="mb-2 flex cursor-pointer items-center justify-center gap-2 rounded-control border border-dashed border-hairline px-3 py-4 text-xs text-ink/60 hover:bg-surface-soft">
                      <UploadCloud size={14} />
                      {uploadingId === slide.id
                        ? "Uploading..."
                        : slide.imageUrl
                        ? "Image set — tap to replace"
                        : "Upload image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadFor(slide.id, file, (url) => updateHero(slide.id, "imageUrl", url));
                        }}
                      />
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input
                        value={slide.title}
                        onChange={(e) => updateHero(slide.id, "title", e.target.value)}
                        placeholder="Title"
                        className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                      />
                      <input
                        value={slide.subtitle}
                        onChange={(e) => updateHero(slide.id, "subtitle", e.target.value)}
                        placeholder="Subtitle"
                        className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Special for you */}
            <section className="mt-8">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink/70">#SpecialForYou</h2>
                <button
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      specialSlides: [...prev.specialSlides, { id: newId(), imageUrl: "", text: "" }],
                    }))
                  }
                  className="flex items-center gap-1 text-sm font-medium text-rausch"
                >
                  <Plus size={14} />
                  Add slide
                </button>
              </div>
              <div className="space-y-3">
                {content.specialSlides.map((slide) => (
                  <div key={slide.id} className="rounded-card border border-hairline p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-ink/50">Slide</span>
                      <button
                        onClick={() =>
                          setContent((prev) => ({
                            ...prev,
                            specialSlides: prev.specialSlides.filter((s) => s.id !== slide.id),
                          }))
                        }
                        className="text-ink/40 hover:text-rausch"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <label className="mb-2 flex cursor-pointer items-center justify-center gap-2 rounded-control border border-dashed border-hairline px-3 py-4 text-xs text-ink/60 hover:bg-surface-soft">
                      <UploadCloud size={14} />
                      {uploadingId === slide.id
                        ? "Uploading..."
                        : slide.imageUrl
                        ? "Image set — tap to replace"
                        : "Upload image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadFor(slide.id, file, (url) => updateSpecial(slide.id, "imageUrl", url));
                        }}
                      />
                    </label>
                    <input
                      value={slide.text}
                      onChange={(e) => updateSpecial(slide.id, "text", e.target.value)}
                      placeholder="Offer text"
                      className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Flash sale title */}
            <section className="mt-8">
              <h2 className="mb-2 text-sm font-semibold text-ink/70">Flash Sale section title</h2>
              <input
                value={content.flashSaleTitle}
                onChange={(e) => setContent((prev) => ({ ...prev, flashSaleTitle: e.target.value }))}
                className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
              />
            </section>

            <div className="mt-6 flex items-center gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-rausch">
                  <CheckCircle2 size={15} />
                  Saved — live on the home page now
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
}
