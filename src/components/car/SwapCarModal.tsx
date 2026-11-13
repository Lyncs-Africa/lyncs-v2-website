"use client";

import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useValuationStore, type Tab } from "@/store/valuationStore";
import type { EvOption } from "@/lib/valuation/evOptions";
import SmallerModal from "@/components/car/shared/SmallerModal.jsx";
import SwapModeModal from "@/components/car/swap/SwapModeModal.jsx";
import SwapValuationStepModal from "@/components/car/swap/SwapValuationStepModal.jsx";
import SwapLockInStepModal from "@/components/car/swap/SwapLockInStepModal.jsx";
import SwapFleetStepModal from "@/components/car/swap/SwapFleetStepModal.jsx";

type SwapTargetInput = {
  id?: string | number;
  productId?: string | number;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
  year?: string | number;
};

type SwapStep = "mode" | "owner-valuation" | "owner-lockin" | "fleet";

type SwapCarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetCar?: SwapTargetInput | null;
};

/**
 * Side-drawer + stepped modal host for the "Swap with your car" flow on vehicle detail pages.
 * Follows the exact same `.slideUp` drawer + `SmallerModal` architecture as the Purchase Car flow,
 * leaving the standalone `/swap` page untouched.
 */
export default function SwapCarModal({
  isOpen,
  onClose,
  targetCar = null,
}: SwapCarModalProps) {
  const [swapType, setSwapType] = useState<Tab>("owner");
  const [swapStep, setSwapStep] = useState<SwapStep>("mode");
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

  // Reset step cleanly whenever modal opens/closes.
  useEffect(() => {
    if (!isOpen) {
      setSwapStep("mode");
    }
  }, [isOpen]);

  // Lock background page scroll while the side drawer is open, and handle Escape on step 1.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // SmallerModal handles Escape itself when stepped sub-modals are active.
      if (swapStep !== "mode") return;
      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, swapStep, onClose]);

  const handleContinueFromMode = () => {
    setTab(swapType);
    if (swapType === "fleet") {
      setSwapStep("fleet");
    } else {
      setSwapStep("owner-valuation");
    }
  };

  const handleCloseAll = () => {
    setSwapStep("mode");
    onClose();
  };

  return (
    <>
      {/* Main Side Drawer matching PurchasePaymentModeModal */}
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
            <SwapModeModal
              targetCar={normalizedTargetCar}
              swapType={swapType}
              onSelectSwapType={setSwapType}
              onContinue={handleContinueFromMode}
              onClose={handleCloseAll}
            />
          )}
        </div>
      </div>

      {/* Stepped Swap Valuation / Lock-In / Fleet Flow stacked in SmallerModal */}
      <SmallerModal
        isOpen={isOpen && swapStep !== "mode"}
        onClose={() => {
          if (swapStep === "owner-lockin") {
            setSwapStep("owner-valuation");
          } else {
            setSwapStep("mode");
          }
        }}
      >
        {swapStep === "owner-valuation" && (
          <SwapValuationStepModal
            targetCar={normalizedTargetCar}
            onContinueToLockIn={() => setSwapStep("owner-lockin")}
            onBack={() => setSwapStep("mode")}
            onClose={() => setSwapStep("mode")}
          />
        )}

        {swapStep === "owner-lockin" && (
          <SwapLockInStepModal
            targetCar={normalizedTargetCar}
            onBack={() => setSwapStep("owner-valuation")}
            onCloseAll={handleCloseAll}
          />
        )}

        {swapStep === "fleet" && (
          <SwapFleetStepModal
            targetCar={normalizedTargetCar}
            onBack={() => setSwapStep("mode")}
            onCloseAll={handleCloseAll}
          />
        )}
      </SmallerModal>
    </>
  );
}
