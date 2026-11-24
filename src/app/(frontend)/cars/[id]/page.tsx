import React, { Suspense } from "react";
import type { Metadata } from "next";
import CarDetailClient from "./CarDetailClient";
import { LOCAL_CARS_RAW } from "../../../../lib/localCarsCatalog.js";

// Catalog IDs come from the API at runtime and aren't all known at build time,
// so we pre-render a shell ("/cars/view") that a Netlify rewrite (public/_redirects)
// serves for any /cars/<id> path, plus the local catalog IDs we do know. The
// client reads the real ID from the URL.
export async function generateStaticParams() {
  const staticIds = (LOCAL_CARS_RAW || []).map((car: any) => ({
    id: String(car.id || car.productId),
  }));
  return [{ id: "view" }, ...staticIds];
}

export const metadata: Metadata = {
  title: "Vehicle Details | Lyncs Africa",
  description:
    "View full vehicle photos, specifications, inspection status, and request a purchase quote or swap on Lyncs Africa.",
};

export default async function SingleCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading vehicle details...
        </div>
      }
    >
      <CarDetailClient initialId={decodedId} />
    </Suspense>
  );
}

