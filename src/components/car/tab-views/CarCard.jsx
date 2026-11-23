"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCar } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { BsFuelPumpFill } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import cn from "classnames";
import { numberWithCommas } from "../../../lib/utils.js";
import { getCarImageCandidates } from "../../../lib/carImageUtils.js";
import { useCarStore } from "../../../store/carStore.js";

export const FUEL_TYPE_BADGE = {
  petrol: { icon: BsFuelPumpFill, className: "bg-slate-600", label: "Petrol" },
  electric: { icon: IoFlash, className: "bg-emerald-500", label: "BEV" },
  hybrid: { icon: FaLeaf, className: "bg-amber-500", label: "PHEV" },
};

export const CarCard = ({ car }) => {
  const router = useRouter();
  const fuelBadge = FUEL_TYPE_BADGE[car.type] || FUEL_TYPE_BADGE.petrol;

  // Image list following handoff guidelines: headImage first, then returned images, then placeholder
  const imageCandidates = useMemo(() => {
    const rawList = [
      car.headImage,
      ...(car.images || []).map((img) => (typeof img === "string" ? img : img?.url || img?.src)),
      car.image,
    ].filter(Boolean);
    return Array.from(new Set(rawList));
  }, [car]);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [car.platform, car.id, car.productId, imageCandidates]);

  const activeImageSrc = imageCandidates[imageIndex] || null;
  const displayName = car.title || car.name || "Vehicle";

  const hasPrice = car.priceNgn !== null && car.priceNgn !== undefined;
  const isProvisional = car.pricing?.status === "provisional";
  const canStartCheckout =
    hasPrice && (!car.pricing || ["complete", "provisional"].includes(car.pricing.status));

  const navigateToCarListing = (startPurchase = false) => {
    const carId = car.productId || car.id;
    if (!carId) return;
    const platform = car.platform || car.source;
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(`lyncs_car_${carId}`, JSON.stringify(car));
      } catch {
        // ignore storage error
      }
    }
    const params = new URLSearchParams();
    if (platform) params.set("platform", platform);
    if (startPurchase && canStartCheckout) params.set("purchase", "1");
    const qs = params.toString();
    router.push(`/cars/${encodeURIComponent(carId)}${qs ? `?${qs}` : ""}`);
  };

  const handlePurchase = (e) => {
    e.stopPropagation();
    if (canStartCheckout) {
      navigateToCarListing(true);
    }
  };

  const handleSwap = (e) => {
    e.stopPropagation();
    router.push("/swap");
  };

  return (
    <div
      onClick={() => navigateToCarListing(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToCarListing(false);
        }
      }}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between dark:shadow-none"
    >
      {/* Top Hero Image Area */}
      <div className="relative bg-slate-100 dark:bg-slate-800 h-[11.5rem] flex items-center justify-center overflow-hidden">
        {activeImageSrc ? (
          <img
            src={activeImageSrc}
            alt={displayName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageIndex((prev) => prev + 1)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
            <FaCar size={56} />
            <span className="text-11px text-slate-400 dark:text-slate-500 mt-1 font-medium">Vehicle Photo</span>
          </div>
        )}

        {/* Fuel Badge Icon */}
        {fuelBadge && (
          <span
            className={cn(
              "absolute bottom-3 right-3 w-6 h-6 rounded text-white flex items-center justify-center shadow-xs z-10",
              fuelBadge.className
            )}
            title={fuelBadge.label}
          >
            <fuelBadge.icon size={12} />
          </span>
        )}
      </div>

      {/* Body Area */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="text-15px font-bold text-slate-900 dark:text-slate-100 line-clamp-1 leading-snug">
            {displayName}
          </h3>

          {/* Specs Row */}
          <div className="flex items-center gap-2 text-12px text-slate-500 dark:text-slate-400 flex-wrap">
            <span>{car.year || "2024"}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>{car.mileage || "0 km"}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{fuelBadge.label}</span>
            {car.origin && (
              <>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>{car.condition !== "NEW" ? "Foreign Used" : "Brand new"}</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing & Landed Total */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-1">
          <p className="text-11px uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
            {hasPrice ? (isProvisional ? "Estimated total" : "Total landed price") : "Price unavailable"}
          </p>
          <div className="flex items-baseline gap-2">
            {hasPrice ? (
              <span className="text-18px font-bold text-slate-900 dark:text-white">
                ₦{numberWithCommas(car.priceNgn)}
              </span>
            ) : (
              <span className="text-14px font-medium text-slate-500 dark:text-slate-400">
                Contact for pricing
              </span>
            )}
            {car.originalPrice && car.originalPrice > (car.priceNgn || car.price || 0) && (
              <span className="text-12px text-slate-400 dark:text-slate-500 line-through">
                ₦{numberWithCommas(car.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
