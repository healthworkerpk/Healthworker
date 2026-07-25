"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import BottomTabBar from "@/components/BottomTabBar";

export default function ChatPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink/50">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="border-b border-hairline px-4 py-4">
        <h1 className="text-lg font-semibold">Chat</h1>
      </div>
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <MessageCircle size={28} className="text-ink/30" />
        <p className="mt-3 text-sm text-ink/60">
          Messages with your doctor or patients will appear here once the
          Chat module is wired up.
        </p>
      </div>
      <BottomTabBar />
    </main>
  );
}
