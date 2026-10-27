import React, { Suspense } from "react";
import type { Metadata } from "next";
import CarPageView from "../../../../components/car/CarPageView.jsx";

export const metadata: Metadata = {
  title: "Vehicle Store & Import | Lyncs Africa",
  description:
    "Explore brand new factory units and certified foreign used cars available for Lagos port delivery. Request outright or installment quotes with transparent landed pricing.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function CarsListContent({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const tabParam = typeof resolvedParams.tab === "string" ? resolvedParams.tab : "brand-new";
  const actionParam = typeof resolvedParams.action === "string" ? resolvedParams.action : null;

  return <CarPageView initialTab={tabParam} initialAction={actionParam} />;
}

export default function CarsListPage(props: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading vehicle catalog...</div>}>
      <CarsListContent {...props} />
    </Suspense>
  );
}
