"use client";

import React from "react";
import { Button } from "../../ui/HeroUI.jsx";
import { FaCar, FaTruck } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import classNames from "classnames";
import { numberWithCommas } from "../../../lib/utils.js";
import { EV_CONFIG } from "../../../lib/valuation/config";

/**
 * Step 1 side-drawer view for "Swap with your car", styled to match PurchasePaymentModeModal.
 */
export default function SwapModeModal({
  targetCar,
  swapType,
  onSelectSwapType,
  onContinue,
  onClose,
}) {
  return (
    <div className="relative h-full flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-Quicksand">
      {/* Scrollable Drawer Body */}
      <div className="w-full md:p-6 p-4 space-y-6 pb-32 overflow-y-auto no-scrollbar flex-1">
        {/* Top Banner Header (matching PurchasePaymentModeModal) */}
        <div className="flex items-center gap-2 justify-center rounded-[24px] bg-eminence dark:bg-slate-800/60 border border-light dark:border-white/10 text-center md:p-6 p-4 relative">
          <button
            onClick={onClose}
            style={{ marginBottom: "0px" }}
            className="x text-black dark:text-white md:top-5 md:left-4 absolute left-4 cursor-pointer"
            type="button"
            aria-label="Close"
          >
            <IoIosCloseCircleOutline
              className="text-black dark:text-white"
              size="30px"
            />
          </button>
          <div className="space-y-1">
            <p
              id="swap-car-modal-title"
              className="md:text-28px text-22px leading-tight font-semibold text-black dark:text-white"
            >
              Swap With Your Car
            </p>
          </div>
        </div>

        {/* Target Vehicle Summary */}
        {targetCar && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-12px font-medium text-slate-500 dark:text-slate-400">
                Swapping toward
              </p>
              <p className="text-16px font-bold text-black dark:text-white truncate">
                {targetCar.name}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-12px font-medium text-slate-500 dark:text-slate-400">
                Vehicle Price
              </p>
              <p className="text-16px font-bold text-primary dark:text-accent">
                ₦{numberWithCommas(targetCar.price)}
              </p>
            </div>
          </div>
        )}

        {/* Swap Mode Options */}
        <div className="space-y-3">
          <p className="text-15px font-semibold text-slate-800 dark:text-slate-200">
            Choose a swap option
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onSelectSwapType("owner")}
              className={classNames(
                "text-left rounded-2xl border p-5 transition-all cursor-pointer",
                swapType === "owner"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/15 dark:border-accent dark:bg-accent/10"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-eminence dark:bg-slate-800 border border-light dark:border-slate-700 flex items-center justify-center">
                  <FaCar size={20} className="text-primary dark:text-accent" />
                </div>
              </div>
              <p className="text-17px font-bold text-black dark:text-white">
                Swap my current car
              </p>
              <p className="text-14px text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Get an instant trade-in estimate for your car and apply its value toward{" "}
                {targetCar?.name || "this EV"}.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onSelectSwapType("fleet")}
              className={classNames(
                "text-left rounded-2xl border p-5 transition-all cursor-pointer",
                swapType === "fleet"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/15 dark:border-accent dark:bg-accent/10"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-eminence dark:bg-slate-800 border border-light dark:border-slate-700 flex items-center justify-center">
                  <FaTruck size={20} className="text-primary dark:text-accent" />
                </div>
              </div>
              <p className="text-17px font-bold text-black dark:text-white">
                Trade in a fleet
              </p>
              <p className="text-14px text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Transitioning 2 or more company cars? Our fleet specialists value every vehicle and prepare a custom swap quote.
              </p>
            </button>
          </div>
        </div>

        {/* Info Banner (matching PurchasePaymentModeModal) */}
        <div className="rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 p-4 flex items-start gap-3">
          <FiInfo
            className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
            size={18}
          />
          <div className="text-13px text-amber-900 dark:text-amber-200 leading-relaxed">
            <p className="font-semibold">No immediate commitment required today</p>
            <p className="mt-0.5 text-amber-800 dark:text-amber-300">
              Estimating your trade-in prepares a {EV_CONFIG.quoteHeldDays}-day held quote. Our team confirms your final offer after a quick inspection and coordinates next steps on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Drawer Bottom Footer (matching PurchasePaymentModeModal) */}
      <div className="bg-white dark:bg-slate-900 fixed w-full bottom-0 left-0 z-20 md:rounded-bl-[24px] border-t border-slate-200 dark:border-white/10">
        <div className="min-h-[90px] md:p-4 p-3 flex items-center justify-center gap-4">
          <Button
            onPress={onClose}
            className="uppercase px-8 font-[500] cursor-pointer"
            size="md"
            color="danger"
            variant="bordered"
            radius="full"
          >
            Back
          </Button>
          <Button
            onPress={onContinue}
            isDisabled={!swapType}
            className="disabled:opacity-50 disabled:pointer-events-none uppercase text-white font-[500] px-8 cursor-pointer"
            size="md"
            color="primary"
            radius="full"
          >
            {swapType === "fleet"
              ? "Continue to fleet details"
              : "Continue to valuation"}
          </Button>
        </div>
      </div>
    </div>
  );
}

