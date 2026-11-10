"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CarsView from "./tab-views/CarsView.jsx";
import { resolveActiveTab } from "../../lib/carSegments.js";
import SlideUpModal from "./shared/SlideUpModal.jsx";
import SmallerModal from "./shared/SmallerModal.jsx";
import { useCarStore } from "../../store/carStore.js";
import { ToastContainer } from "react-toastify";

/**
 * @param {{ initialAction?: string | null }} props
 */
const CarPageView = ({ initialAction = /** @type {string | null} */ (null) }) => {
  const { openRequestVehicle } = useCarStore();
  const searchParams = useSearchParams();
  // Read query params on the client so this page can be statically rendered
  // (no server-side searchParams access).
  const action = searchParams.get("action") ?? initialAction;
  // ?condition=used shows the used catalog; anything else is brand-new.
  const condition = searchParams.get("condition");
  const usage = condition === "used" ? "used" : "brand-new";
  const activeTab = resolveActiveTab(condition);

  useEffect(() => {
    if (action === "swap") {
      openRequestVehicle(null, "swap");
    }
  }, [action, openRequestVehicle]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />

      {/* New vs used is driven by ?condition. */}
      <CarsView usage={usage} activeTab={activeTab} />

      {/* Global Slide-Over Drawer (.slideUp) */}
      <SlideUpModal />

      {/* Global Center/Bottom Sheet Modal (.smaller-modal) */}
      <SmallerModal />
    </div>
  );
};

export default CarPageView;
