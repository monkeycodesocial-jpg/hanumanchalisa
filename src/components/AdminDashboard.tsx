"use client";

import { useState } from "react";
import type { UploadRow } from "@/lib/supabase/database.types";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<UploadRow[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthed(true);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    setItems([]);
  };

  const refresh = async () => {
    const res = await fetch("/api/admin/uploads");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setItems(data.items);
    setStats(data.stats);
  };

  const toggleApprove = async (id: string, approved: boolean) => {
    await fetch("/api/admin/uploads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    await refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete permanently from Supabase?")) return;
    await fetch(`/api/admin/uploads?id=${id}`, { method: "DELETE" });
    await refresh();
  };

  if (!authed) {
    return (
      <form onSubmit={login} className="max-w-md mx-auto golden-border p-8">
        <h2 className="font-spiritual text-divine-gold text-center mb-6 tracking-wider">
          Admin Login
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full px-4 py-3 rounded-xl bg-divine-deep/80 border border-divine-gold/30 text-amber-50 mb-4 outline-none focus:border-divine-gold"
          required
        />
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-gradient-to-r from-saffron-600 to-divine-maroon text-white font-spiritual"
        >
          {loading ? "Verifying..." : "Enter Dashboard"}
        </button>
      </form>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-spiritual text-divine-gold">Supabase Admin</h2>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-amber-200/60 hover:text-divine-gold"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Uploads", key: "totalUploads" },
          { label: "Participants", key: "totalParticipants" },
          { label: "Cities", key: "citiesParticipating" },
          { label: "Pending", key: "pendingApproval" },
        ].map((s) => (
          <div key={s.key} className="golden-border p-4 text-center">
            <p className="text-2xl font-spiritual text-divine-gold">{stats[s.key] ?? 0}</p>
            <p className="text-xs text-amber-200/60">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`golden-border p-4 flex flex-col md:flex-row gap-4 ${
              !item.approved ? "border-yellow-500/50" : ""
            }`}
          >
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-black/40">
              {item.file_type.startsWith("video/") ? (
                <video src={item.file_url} className="w-full h-full object-cover" muted />
              ) : (
                <img src={item.file_url} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-amber-50 font-medium">{item.uploaded_by}</p>
              <p className="text-sm text-amber-200/60">
                {item.city} • {new Date(item.created_at).toLocaleString()}
              </p>
              {item.caption && (
                <p className="text-sm text-amber-200/80 mt-1 italic">{item.caption}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-start">
              {!item.approved && (
                <button
                  type="button"
                  onClick={() => toggleApprove(item.id, true)}
                  className="px-3 py-1 rounded-full bg-green-800/60 text-green-200 text-xs"
                >
                  Approve
                </button>
              )}
              {item.approved && (
                <button
                  type="button"
                  onClick={() => toggleApprove(item.id, false)}
                  className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-200 text-xs"
                >
                  Unapprove
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="px-3 py-1 rounded-full bg-red-900/60 text-red-200 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
