import React, { Suspense } from "react";
import type { Metadata } from "next";
import CarListingDetailView from "../../../../components/car/CarListingDetailView.jsx";

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
      <CarListingDetailView carId={decodedId} />
    </Suspense>
  );
}

