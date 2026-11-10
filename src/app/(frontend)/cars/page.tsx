import React, { Suspense } from "react";
import type { Metadata } from "next";
import CarPageView from "../../../components/car/CarPageView.jsx";

export const metadata: Metadata = {
  title: "Vehicle Store & Import | Lyncs Africa",
  description:
    "Explore brand new factory units and certified foreign used cars available for Lagos port delivery. Request outright or installment quotes with transparent landed pricing.",
};

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading vehicle catalog...</div>}>
      <CarPageView />
    </Suspense>
  );
}
