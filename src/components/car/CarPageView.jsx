"use client";

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "../ui/HeroUI.jsx";
import CarsView from "./tab-views/CarsView.jsx";
import SlideUpModal from "./shared/SlideUpModal.jsx";
import SmallerModal from "./shared/SmallerModal.jsx";
import { useCarStore } from "../../store/carStore.js";
import { ToastContainer } from "react-toastify";

/**
 * @param {{ initialTab?: string, initialAction?: string | null }} props
 */
const CarPageView = ({ initialTab = "brand-new", initialAction = /** @type {string | null} */ (null) }) => {
  const normalizedInitial =
    initialTab === "used" || initialTab === "used-cars" ? "used-cars" : "brand-new";
  const [selectedView, setSelectedView] = useState(normalizedInitial);
  const { openRequestVehicle } = useCarStore();

  useEffect(() => {
    if (initialAction === "swap") {
      openRequestVehicle(null, "swap");
    }
  }, [initialAction, openRequestVehicle]);

  useEffect(() => {
    if (initialTab) {
      setSelectedView(
        initialTab === "used" || initialTab === "used-cars" ? "used-cars" : "brand-new"
      );
    }
  }, [initialTab]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />

      {/* Page Title & Subtitle */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-28px sm:text-36px font-extrabold text-slate-900 dark:text-white tracking-tight">
          Vehicle Store & Import
        </h1>
        <p className="text-14px sm:text-15px text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Explore brand new factory units and certified foreign used cars available for Lagos port delivery.
        </p>
      </div>

      {/* Tabs */}
      <div className="space-y-3 mb-6 sm:mb-8">
        <Tabs
          aria-label="Car Catalog Tabs"
          size="lg"
          radius="full"
          color="primary"
          selectedKey={selectedView}
          onSelectionChange={(key) => setSelectedView(String(key))}
        >
          <Tab key="brand-new" id="brand-new" title="Brand new" />
          <Tab key="used-cars" id="used-cars" title="Used cars" />
        </Tabs>
      </div>

      {/* Catalog View */}
      {selectedView === "brand-new" && <CarsView usage="brand-new" />}
      {(selectedView === "used-cars" || selectedView === "used") && <CarsView usage="used" />}

      {/* Global Slide-Over Drawer (.slideUp) */}
      <SlideUpModal />

      {/* Global Center/Bottom Sheet Modal (.smaller-modal) */}
      <SmallerModal />
    </div>
  );
};

export default CarPageView;
