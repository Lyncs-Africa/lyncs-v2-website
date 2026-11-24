"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoClose,
  IoStorefrontOutline,
  IoBriefcaseOutline,
  IoDiamondOutline,
  IoCarOutline,
  IoSchoolOutline,
  IoPersonOutline,
  IoCheckmarkCircle,
  IoOptionsOutline,
} from "react-icons/io5";
import cn from "classnames";

const CATALOG_CATEGORIES = [
  {
    value: "all",
    label: "Marketplace",
    hint: "All vehicles & full catalog",
    Icon: IoStorefrontOutline,
  },
  {
    value: "businesses",
    label: "For businesses",
    hint: "Fleet & commercial vehicles",
    Icon: IoBriefcaseOutline,
  },
  {
    value: "top-executives",
    label: "For top executives",
    hint: "Luxury sedans & premium SUVs",
    Icon: IoDiamondOutline,
  },
  {
    value: "drivers",
    label: "For e-hailing drivers",
    hint: "Fuel-efficient & EV swaps",
    Icon: IoCarOutline,
  },
  {
    value: "schools",
    label: "For schools",
    hint: "Buses & passenger shuttles",
    Icon: IoSchoolOutline,
  },
  {
    value: "individuals",
    label: "For individuals",
    hint: "Personal commuters & family cars",
    Icon: IoPersonOutline,
  },
];

/**
 * @param {{
 *   isOpen: boolean;
 *   currentSelection?: string;
 *   onSelect: (category: string) => void;
 *   onClose: () => void;
 * }} props
 */
export default function CatalogPreferenceModal({
  isOpen,
  currentSelection = "all",
  onSelect,
  onClose,
}) {
  const [selected, setSelected] = useState(currentSelection);

  useEffect(() => {
    if (isOpen) {
      setSelected(currentSelection || "all");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, currentSelection]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCardClick = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-5 sm:p-8 z-10 text-slate-900 dark:text-white max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close modal"
            >
              <IoClose size={22} />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent text-12px font-semibold">
                <IoOptionsOutline size={14} />
                <span>Personalize Your Catalog</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                What catalogue would you prefer to see?
              </h2>
              <p className="text-13px sm:text-14px text-slate-500 dark:text-slate-400 max-w-xl">
                Choose a category tailored to your requirements, or select <span className="font-semibold text-slate-800 dark:text-slate-200">Marketplace</span> to browse all available vehicles.
              </p>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
              {CATALOG_CATEGORIES.map((cat) => {
                const isSelected = selected === cat.value;
                const { Icon } = cat;

                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCardClick(cat.value)}
                    className={cn(
                      "w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/[0.05] dark:border-accent dark:bg-accent/[0.1] shadow-xs ring-1 ring-primary/30 dark:ring-accent/30"
                        : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80"
                    )}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                          isSelected
                            ? "bg-primary text-white dark:bg-accent dark:text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        )}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className={cn(
                            "text-14px sm:text-15px font-semibold truncate",
                            isSelected
                              ? "text-primary dark:text-accent font-bold"
                              : "text-slate-800 dark:text-slate-100"
                          )}
                        >
                          {cat.label}
                        </h3>
                        <p className="text-12px text-slate-500 dark:text-slate-400 truncate">
                          {cat.hint}
                        </p>
                      </div>
                    </div>

                    {/* Radio indicator */}
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all",
                        isSelected
                          ? "border-primary bg-primary text-white dark:border-accent dark:bg-accent"
                          : "border-slate-300 dark:border-slate-600"
                      )}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-white/10">
              <p className="text-12px text-slate-400 text-center sm:text-left">
                You can change this anytime using the filter on the catalog.
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelect(selected || "all");
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-medium text-14px shadow-sm transition cursor-pointer"
              >
                Continue to Catalog
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
