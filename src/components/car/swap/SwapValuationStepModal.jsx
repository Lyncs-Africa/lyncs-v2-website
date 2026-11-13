"use client";

import React, { useEffect } from "react";
import { Button, Input, Select, SelectItem } from "../../ui/HeroUI.jsx";
import { IoMdClose } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import classNames from "classnames";
import { useCarValuation } from "../../swap/useCarValuation";
import { useValuationStore } from "../../../store/valuationStore";
import { CONDITIONS } from "../../../lib/valuation/data";
import { getMakes, getModels, getYears } from "../../../lib/valuation/carList";
import {
  formatThousands,
  getBreakdown,
  monthlyLabel,
  nairaM,
} from "../../../lib/valuation/breakdown";
import { EV_CONFIG, WHATSAPP_NUMBER } from "../../../lib/valuation/config";
import { fetchEvOptions, resolveActiveEv } from "../../../lib/valuation/evOptions";

function buildWhatsappHref(parts) {
  const msg =
    `Hi Lyncs, I'd like a trade-in valuation${
      parts.targetName ? ` toward ${parts.targetName}` : ""
    }:\n` +
    `• Make: ${parts.make || "—"}\n` +
    `• Model: ${parts.model || "—"}\n` +
    `• Year: ${parts.year || "—"}\n` +
    `• Mileage: ${parts.km ? `${parts.km} km` : "—"}\n` +
    `• Condition: ${parts.condition || "—"}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * Step 2 modal (rendered inside SmallerModal) for entering the user's current vehicle
 * and reviewing live trade-in valuation + installment breakdown. Styled after PurchaseInstallmentTermModal.
 */
export default function SwapValuationStepModal({
  targetCar,
  onContinueToLockIn,
  onBack,
  onClose,
}) {
  useCarValuation();

  const owner = useValuationStore((s) => s.owner);
  const setOwnerField = useValuationStore((s) => s.setOwnerField);
  const status = useValuationStore((s) => s.status);
  const result = useValuationStore((s) => s.result);
  const tenor = useValuationStore((s) => s.tenor);
  const setTenor = useValuationStore((s) => s.setTenor);
  const evs = useValuationStore((s) => s.evs);
  const setEvs = useValuationStore((s) => s.setEvs);
  const selectedEvId = useValuationStore((s) => s.selectedEvId);
  const setSelectedEv = useValuationStore((s) => s.setSelectedEv);

  useEffect(() => {
    if (!targetCar) return;
    setSelectedEv(targetCar.id);
    const current = useValuationStore.getState().evs;
    if (!current.some((e) => e.id === targetCar.id)) {
      setEvs([targetCar, ...current]);
    }
    fetchEvOptions()
      .then((catalog) => {
        const hasTarget = catalog.some((e) => e.id === targetCar.id);
        setEvs(hasTarget ? catalog : [targetCar, ...catalog]);
      })
      .catch(() => {});
  }, [targetCar, setEvs, setSelectedEv]);

  const makes = getMakes();
  const models = getModels(owner.make);
  const years = getYears();

  const effectiveTarget =
    targetCar ||
    resolveActiveEv(
      evs,
      selectedEvId,
      result ? (result.min + result.max) / 2 : 0
    );

  const breakdown =
    status === "success" && result
      ? getBreakdown(result, tenor, effectiveTarget)
      : null;

  return (
    <div className="space-y-4 px-1 no-scrollbar font-Quicksand">
      {/* Header matching PurchaseInstallmentTermModal */}
      <div className="flex items-start justify-between pb-2 border-b border-light dark:border-slate-800">
        <div>
          <h2 className="text-18px font-semibold text-black dark:text-white">
            Your Current Vehicle
          </h2>
          <p className="text-14px text-slate-500 dark:text-slate-400 mt-0.5">
            Estimate what your car is worth toward{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {effectiveTarget.name}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-red-600 rounded-full transition-colors cursor-pointer p-1"
          aria-label="Close"
        >
          <IoMdClose size={22} />
        </button>
      </div>

      {/* Vehicle Fields using HeroUI Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Vehicle Make"
          placeholder="Select make (e.g. Toyota)"
          selectedKeys={owner.make ? [owner.make] : []}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] || "";
            setOwnerField("make", val);
          }}
        >
          {makes.map((make) => (
            <SelectItem key={make} value={make}>
              {make}
            </SelectItem>
          ))}
        </Select>

        {owner.make ? (
          <Select
            label="Vehicle Model"
            placeholder="Select model (e.g. Corolla)"
            selectedKeys={owner.model ? [owner.model] : []}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] || "";
              setOwnerField("model", val);
            }}
          >
            {models.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <div className="w-full">
            <label className="block text-12px font-medium text-slate-700 dark:text-slate-300 mb-1">
              Vehicle Model
            </label>
            <div className="h-10 px-3.5 text-13px rounded-xl border border-light dark:border-white/10 bg-eminence/60 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500 flex items-center cursor-not-allowed opacity-70">
              Select a make first
            </div>
          </div>
        )}

        <Select
          label="Year"
          placeholder="Select year"
          selectedKeys={owner.year ? [String(owner.year)] : []}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0];
            if (val) setOwnerField("year", Number(val));
          }}
        >
          {years.map((year) => (
            <SelectItem key={String(year)} value={String(year)}>
              {String(year)}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="Mileage (km)"
          placeholder="e.g. 85,000"
          inputMode="numeric"
          value={owner.km}
          onChange={(e) => setOwnerField("km", formatThousands(e.target.value))}
          size="sm"
          className="[&_input]:h-10 [&_input]:rounded-xl [&_input]:px-3.5 [&_input]:text-13px"
        />

        <div className="sm:col-span-2">
          <Select
            label="Vehicle Condition"
            placeholder="Select condition"
            selectedKeys={owner.condition ? [owner.condition] : []}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0];
              if (val) setOwnerField("condition", val);
            }}
          >
            {CONDITIONS.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Live Breakdown Card matching PurchaseInstallmentTermModal */}
      <div
        aria-live="polite"
        className="rounded-xl border border-light dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3"
      >
        {status === "empty" && (
          <p className="text-13px text-slate-500 dark:text-slate-400">
            Select your vehicle make, model, and year above to see your estimated trade-in credit toward{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {effectiveTarget.name}
            </span>
            .
          </p>
        )}

        {status === "loading" && (
          <div className="animate-pulse space-y-2.5 py-1">
            <div className="h-3.5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 w-52 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        )}

        {status === "couldnt" && (
          <div className="space-y-3">
            <div>
              <p className="text-15px font-semibold text-black dark:text-white">
                We need a closer look at this one
              </p>
              <p className="text-13px text-slate-500 dark:text-slate-400 mt-1">
                We don&apos;t have enough instant data on this vehicle. Share the details with our team on WhatsApp and we&apos;ll value it for you.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsappHref({
                  ...owner,
                  targetName: effectiveTarget.name,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary dark:bg-[#2D419A] px-5 py-2.5 text-13px font-semibold text-white transition hover:opacity-90"
              >
                <FaWhatsapp size={16} />
                Get WhatsApp Valuation
              </a>
            </div>
          </div>
        )}

        {status === "success" && result && breakdown && (
          <div className="space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-2 py-0.5">
              <span className="text-14px text-slate-600 dark:text-slate-400">
                Estimated trade-in value
              </span>
              <span className="text-18px font-bold text-primary dark:text-accent">
                {nairaM(result.min)} – {nairaM(result.max)}
              </span>
            </div>

            <p className="text-13px text-slate-600 dark:text-slate-300 leading-relaxed">
              {breakdown.surplus > 0 ? (
                <>
                  That fully covers a{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {effectiveTarget.name}
                  </span>{" "}
                  ({nairaM(effectiveTarget.price)}) — with about{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {nairaM(breakdown.surplus)}
                  </span>{" "}
                  to spare.
                </>
              ) : breakdown.covers ? (
                <>
                  Covers your 20% down payment on a{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {effectiveTarget.name}
                  </span>{" "}
                  ({nairaM(effectiveTarget.price)}), leaving about{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {nairaM(breakdown.financed)}
                  </span>{" "}
                  to finance.
                </>
              ) : (
                <>
                  Add about{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {nairaM(breakdown.topUp)}
                  </span>{" "}
                  to reach your 20% down payment on a{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {effectiveTarget.name}
                  </span>{" "}
                  ({nairaM(effectiveTarget.price)}).
                </>
              )}
            </p>

            {/* Spread over pills matching PurchaseInstallmentTermModal */}
            <div className="pt-2 border-t border-light dark:border-slate-800 space-y-2">
              <p className="text-13px font-medium text-black dark:text-white">
                Spread remaining balance over
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
                      "px-5 py-2 rounded-full border text-13px font-medium transition-colors cursor-pointer",
                      tenor === t
                        ? "border-primary bg-primary text-white dark:bg-[#2D419A] dark:border-[#2D419A]"
                        : "border-light dark:border-slate-800 bg-eminence dark:bg-slate-800 text-black dark:text-white hover:border-primary/50"
                    )}
                  >
                    {t} months
                  </button>
                ))}
              </div>
            </div>

            {breakdown.monthly != null && (
              <div className="flex justify-between items-center pt-1 text-14px">
                <span className="text-slate-600 dark:text-slate-400">
                  Estimated monthly payment
                </span>
                <span className="font-bold text-primary dark:text-accent">
                  {monthlyLabel(breakdown.monthly)}/mo
                </span>
              </div>
            )}

            <p className="text-11px text-slate-400 dark:text-slate-500">
              Estimate only. Final value is confirmed after inspection and held for{" "}
              {EV_CONFIG.quoteHeldDays} days.
            </p>
          </div>
        )}
      </div>

      {/* Footer Buttons matching PurchaseInstallmentTermModal */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-light dark:border-slate-800">
        <Button
          variant="bordered"
          radius="full"
          onPress={onBack}
          className="border-slate-300 dark:border-slate-700 font-medium"
        >
          Back
        </Button>
        <Button
          color="primary"
          radius="full"
          onPress={onContinueToLockIn}
          isDisabled={status !== "success" || !result}
          className="px-7 font-semibold text-white"
        >
          Lock in this value
        </Button>
      </div>
    </div>
  );
}

