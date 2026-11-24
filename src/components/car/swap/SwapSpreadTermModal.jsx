"use client";

import React from "react";
import classNames from "classnames";
import { Button } from "../../ui/HeroUI.jsx";
import { useValuationStore } from "../../../store/valuationStore";
import { EV_CONFIG } from "../../../lib/valuation/config";
import { resolveActiveEv } from "../../../lib/valuation/evOptions";
import { getBreakdown, monthlyLabel, nairaM } from "../../../lib/valuation/breakdown";

/**
 * Term picker for the swap "pay in installments" balance, rendered inside
 * SmallerModal (same host pattern as SwapLockInStepModal) and styled after
 * PurchaseInstallmentTermModal. Kept out of the main swap drawer so the drawer
 * stays short and the modal can cover the full viewport.
 */
export default function SwapSpreadTermModal({ targetCar, onClose }) {
  const result = useValuationStore((s) => s.result);
  const tenor = useValuationStore((s) => s.tenor);
  const setTenor = useValuationStore((s) => s.setTenor);
  const evs = useValuationStore((s) => s.evs);
  const selectedEvId = useValuationStore((s) => s.selectedEvId);

  const effectiveTarget =
    targetCar ||
    resolveActiveEv(
      evs,
      selectedEvId,
      result ? (result.min + result.max) / 2 : 0
    );
  const breakdown = result ? getBreakdown(result, tenor, effectiveTarget) : null;

  return (
    <div className="space-y-4 px-1 no-scrollbar font-Quicksand">
      <div className="pb-2 border-b border-light dark:border-slate-800">
        <h2 className="text-18px font-semibold text-black dark:text-white">
          Installment Plan
        </h2>
        <p className="text-14px text-slate-500 dark:text-slate-400 mt-0.5">
          Choose how long to spread the remaining balance
        </p>
      </div>

      <div>
        <p className="text-15px font-medium text-black dark:text-white mb-2">
          Choose your term
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Repayment tenor"
        >
          {EV_CONFIG.tenorOptions.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={tenor === t}
              onClick={() => setTenor(t)}
              className={classNames(
                "px-5 py-2.5 rounded-full border text-14px font-medium transition-colors cursor-pointer",
                tenor === t
                  ? "border-primary bg-primary text-white"
                  : "border-light dark:border-slate-800 bg-eminence dark:bg-slate-800 text-black dark:text-white hover:border-primary/50"
              )}
            >
              {t} months
            </button>
          ))}
        </div>
      </div>

      {breakdown && (
        <div className="rounded-xl border border-light dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 space-y-2.5">
          <div className="flex justify-between items-center text-14px">
            <span className="text-slate-600 dark:text-slate-400">
              Balance to finance
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {nairaM(breakdown.financed)}
            </span>
          </div>

          {breakdown.monthly != null && (
            <div className="flex justify-between items-center text-14px border-t border-slate-200 dark:border-slate-800 pt-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Monthly installment ({tenor} months)
              </span>
              <span className="text-16px font-bold text-primary dark:text-accent">
                {monthlyLabel(breakdown.monthly)}
                <span className="text-12px font-normal text-slate-500">/mo</span>
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-3 pt-4 border-t border-light dark:border-slate-800">
        <Button
          variant="bordered"
          radius="full"
          onPress={onClose}
          className="border-slate-300 dark:border-slate-700 font-medium"
        >
          Close
        </Button>
        <Button
          color="primary"
          radius="full"
          onPress={onClose}
          className="px-8 font-semibold text-white cursor-pointer"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
