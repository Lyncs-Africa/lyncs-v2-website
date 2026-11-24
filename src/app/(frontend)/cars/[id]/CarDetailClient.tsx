"use client";

import { useEffect, useState } from "react";
import CarListingDetailView from "../../../../components/car/CarListingDetailView.jsx";

// Reads the car ID from the current URL. In the static export every /cars/<id>
// request is served the same pre-built shell (see public/_redirects), so the
// real ID must come from the browser location rather than the build-time param.
function idFromLocation(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const parts = window.location.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  return last ? decodeURIComponent(last) : fallback;
}

export default function CarDetailClient({ initialId }: { initialId: string }) {
  const [carId, setCarId] = useState(initialId);

  useEffect(() => {
    const fromUrl = idFromLocation(initialId);
    if (fromUrl && fromUrl !== carId) setCarId(fromUrl);
    // Only run on mount; the URL is fixed for the lifetime of this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CarListingDetailView carId={carId} />;
}
