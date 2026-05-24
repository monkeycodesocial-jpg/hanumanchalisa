import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import type { UploadRow } from "@/lib/supabase/database.types";
import { verifyAdminCookie } from "@/lib/adminAuth";
import { STORAGE_BUCKET } from "@/lib/supabase/client";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!verifyAdminCookie(request)) return unauthorized();

  try {
    const admin = createSupabaseAdmin();
    const { data, error } = await admin
      .from("uploads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const rows = (data || []) as UploadRow[];
    const cities = new Set(rows.filter((r) => r.city).map((r) => r.city.toLowerCase()));
    const participants = new Set(rows.map((r) => r.uploaded_by.toLowerCase()));

    return NextResponse.json({
      items: rows,
      stats: {
        totalUploads: rows.length,
        totalParticipants: participants.size,
        citiesParticipating: cities.size,
        pendingApproval: rows.filter((r) => !r.approved).length,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load admin data" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminCookie(request)) return unauthorized();

  try {
    const { id, approved } = (await request.json()) as { id: string; approved: boolean };
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const admin = createSupabaseAdmin();
    const { error } = await admin.from("uploads").update({ approved }).eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminCookie(request)) return unauthorized();

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const admin = createSupabaseAdmin();

    const { data: row, error: fetchErr } = await admin
      .from("uploads")
      .select("file_url")
      .eq("id", id)
      .single();

    if (fetchErr || !row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const path = extractStoragePath(row.file_url);
    if (path) {
      await admin.storage.from(STORAGE_BUCKET).remove([path]);
    }

    const { error: delErr } = await admin.from("uploads").delete().eq("id", id);
    if (delErr) throw delErr;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

function extractStoragePath(publicUrl: string): string | null {
  try {
    const marker = `/object/public/${STORAGE_BUCKET}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(publicUrl.slice(idx + marker.length));
  } catch {
    return null;
  }
}
