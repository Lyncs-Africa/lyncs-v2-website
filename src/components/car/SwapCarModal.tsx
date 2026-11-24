"use client";

import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useValuationStore } from "@/store/valuationStore";
import type { EvOption } from "@/lib/valuation/evOptions";
import { numberWithCommas } from "@/lib/utils.js";
import SmallerModal from "@/components/car/shared/SmallerModal.jsx";
import SwapValuationStepModal from "@/components/car/swap/SwapValuationStepModal.jsx";
import SwapLockInStepModal from "@/components/car/swap/SwapLockInStepModal.jsx";
import SwapSpreadTermModal from "@/components/car/swap/SwapSpreadTermModal.jsx";

type SwapTargetInput = {
  id?: string | number;
  productId?: string | number;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
  year?: string | number;
};

type SwapStep = "owner-valuation" | "owner-lockin";

type SwapCarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetCar?: SwapTargetInput | null;
};

/**
 * Side-drawer (`.slideUp`) + stepped `SmallerModal` host for the "Swap with your car" flow
 * on vehicle detail pages. Opens directly into the valuation step in the side drawer,
 * then stacks `SwapLockInStepModal` in `SmallerModal` when locking in a quote.
 */
export default function SwapCarModal({
  isOpen,
  onClose,
  targetCar = null,
}: SwapCarModalProps) {
  const [swapStep, setSwapStep] = useState<SwapStep>("owner-valuation");
  const [spreadOpen, setSpreadOpen] = useState(false);
  const setTab = useValuationStore((s) => s.setTab);

  const normalizedTargetCar = useMemo<EvOption | null>(() => {
    if (!targetCar) return null;
    const id = String(targetCar.id ?? targetCar.productId ?? "").trim();
    const price = Number(targetCar.price) || 0;
    if (!id || price <= 0) return null;
    return {
      id,
      name: targetCar.name || targetCar.title || "Selected Vehicle",
      price,
      image: targetCar.image,
      year: targetCar.year,
    };
  }, [targetCar]);

  // Reset step cleanly and ensure owner tab is active whenever modal opens/closes.
  useEffect(() => {
    if (isOpen) {
      setTab("owner");
    } else {
      setSwapStep("owner-valuation");
      setSpreadOpen(false);
    }
  }, [isOpen, setTab]);

  // Lock background page scroll while the side drawer is open, and handle Escape on step 1.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // SmallerModal handles Escape itself when the lock-in step is active.
      if (swapStep !== "owner-valuation") return;
      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, swapStep, onClose]);

  const handleCloseAll = () => {
    setSwapStep("owner-valuation");
    setSpreadOpen(false);
    onClose();
  };

  return (
    <>
      {/* Main Side Drawer (.slideUp) showing Your Current Vehicle valuation directly */}
      <div className="relative z-[80]">
        <div
          onClick={handleCloseAll}
          aria-hidden="true"
          className={classNames("main-overlay", isOpen ? "block" : "hidden")}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
          aria-labelledby="swap-car-modal-title"
          style={{ overscrollBehavior: "contain" }}
          className={classNames(
            "slideUp no-scrollbar bg-white dark:bg-slate-900 border-l border-transparent dark:border-white/10 max-h-full rounded-t-lg md:rounded-r-none md:rounded-tl-[24px] md:rounded-bl-[24px] block transition duration-300 ease-in-out overflow-hidden overscroll-contain h-full",
            {
              "translate-y-0 md:translate-x-0": isOpen,
              "translate-y-[1000px] md:translate-y-0 md:translate-x-[750px]":
                !isOpen,
            }
          )}
        >
          {isOpen && (
            <div className="h-full overflow-y-auto no-scrollbar md:p-6 p-4 space-y-6 font-Quicksand">
              {/* Top Banner Header (matching PurchasePaymentModeModal) */}
              <div className="flex items-center gap-2 justify-center rounded-[24px] bg-eminence dark:bg-slate-800/60 border border-light dark:border-white/10 text-center md:p-6 p-4 relative">
                <button
                  onClick={handleCloseAll}
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
              {normalizedTargetCar && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-12px font-medium text-slate-500 dark:text-slate-400">
                      Swapping toward
                    </p>
                    <p className="text-16px font-bold text-black dark:text-white truncate">
                      {normalizedTargetCar.name}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-12px font-medium text-slate-500 dark:text-slate-400">
                      Vehicle Price
                    </p>
                    <p className="text-16px font-bold text-primary dark:text-accent">
                      ₦{numberWithCommas(normalizedTargetCar.price)}
                    </p>
                  </div>
                </div>
              )}

              <SwapValuationStepModal
                targetCar={normalizedTargetCar}
                onContinueToLockIn={() => setSwapStep("owner-lockin")}
                onOpenSpread={() => setSpreadOpen(true)}
                onBack={handleCloseAll}
                onClose={handleCloseAll}
                hideClose
              />
            </div>
          )}
        </div>
      </div>

      {/* "Spread over" term picker stacked in SmallerModal (rendered outside the
          .slideUp drawer so its transform/overflow can't clip the overlay). */}
      <SmallerModal
        isOpen={isOpen && swapStep === "owner-valuation" && spreadOpen}
        onClose={() => setSpreadOpen(false)}
      >
        {spreadOpen && (
          <SwapSpreadTermModal
            targetCar={normalizedTargetCar}
            onClose={() => setSpreadOpen(false)}
          />
        )}
      </SmallerModal>

      {/* Stepped Lock-In Modal stacked in SmallerModal */}
      <SmallerModal
        isOpen={isOpen && swapStep === "owner-lockin"}
        onClose={() => setSwapStep("owner-valuation")}
      >
        {swapStep === "owner-lockin" && (
          <SwapLockInStepModal
            targetCar={normalizedTargetCar}
            onBack={() => setSwapStep("owner-valuation")}
            onCloseAll={handleCloseAll}
          />
        )}
      </SmallerModal>
    </>
  );
}
