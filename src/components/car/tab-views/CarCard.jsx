"use client";

import React from "react";
import { FaCar } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { BsFuelPumpFill } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import cn from "classnames";
import { numberWithCommas } from "../../../lib/utils.js";
import { useCarStore } from "../../../store/carStore.js";

export const FUEL_TYPE_BADGE = {
  petrol: { icon: BsFuelPumpFill, className: "bg-slate-600", label: "Petrol" },
  electric: { icon: IoFlash, className: "bg-emerald-500", label: "BEV" },
  hybrid: { icon: FaLeaf, className: "bg-amber-500", label: "PHEV" },
};

export const CarCard = ({ car }) => {
  const { openCarDetails, openRequestVehicle } = useCarStore();
  const fuelBadge = FUEL_TYPE_BADGE[car.type] || FUEL_TYPE_BADGE.petrol;

  const handlePurchase = (e) => {
    e.stopPropagation();
    openCarDetails(car, false);
  };

  const handleSwap = (e) => {
    e.stopPropagation();
    openRequestVehicle(car); // Opens swap intake with this car preselected as target
  };

  return (
    <div
      onClick={() => openCarDetails(car, false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCarDetails(car, false);
        }
      }}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between dark:shadow-none"
    >
      {/* Top Hero Image Area */}
      <div className="relative bg-slate-100 dark:bg-slate-800 h-[11.5rem] flex items-center justify-center overflow-hidden">
        {car.image ? (
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
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
            {car.name}
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
                <span>{car.origin === "local" ? "Nigerian Used" : "Foreign Used"}</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-3">
          <div>
            <p className="text-11px uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Estimated Price
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-18px font-bold text-slate-900 dark:text-white">
                ₦{numberWithCommas(car.price || 0)}
              </span>
              {car.originalPrice && car.originalPrice > car.price && (
                <span className="text-12px text-slate-400 dark:text-slate-500 line-through">
                  ₦{numberWithCommas(car.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handlePurchase}
              className="flex-1 bg-primary text-white text-13px font-semibold rounded-full py-2 border border-primary hover:bg-primary/90 dark:bg-accent dark:border-accent dark:hover:bg-accent/90 transition-colors cursor-pointer"
            >
              Purchase
            </button>
            <button
              type="button"
              onClick={handleSwap}
              className="flex-1 text-primary dark:text-white text-13px font-semibold rounded-full py-2 border border-primary dark:border-white/20 hover:bg-primary/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
