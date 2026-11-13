"use client";

import React, { useRef, useState } from "react";
import { Button, Input, Textarea } from "../../ui/HeroUI.jsx";
import { PhoneInput } from "react-international-phone";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { LuPaperclip, LuX } from "react-icons/lu";
import classNames from "classnames";
import { useValuationStore } from "../../../store/valuationStore";
import { submitValuationLead } from "../../../lib/valuation/getCarValuation";
import { toInternationalFormat, normalizePhoneInput } from "../../../lib/utils.js";
import { toNigerianE164 } from "../../../lib/api/contact";

const FLEET_COUNTS = ["1–5", "6–20", "21–50", "50+"];

/**
 * Step 2 modal (rendered inside SmallerModal) for business fleet swap requests.
 * Styled to match PurchaseInstallmentTermModal & PurchaseDeliveryModal.
 */
export default function SwapFleetStepModal({
  targetCar,
  onBack,
  onCloseAll,
}) {
  const fleet = useValuationStore((s) => s.fleet);
  const setFleetField = useValuationStore((s) => s.setFleetField);
  const resetFleet = useValuationStore((s) => s.resetFleet);

  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const onFile = (e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setFleetField("fleetFileName", f?.name ?? "");
    setErrors((x) => ({ ...x, fleetList: "" }));
  };

  const clearFile = () => {
    setFile(null);
    setFleetField("fleetFileName", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setFormError(null);
    setErrors({});

    const fd = new FormData();
    fd.set("type", "fleet");
    fd.set("count", fleet.count);
    fd.set(
      "rough",
      fleet.showRough && fleet.rough.trim()
        ? fleet.rough.trim()
        : targetCar
        ? `Fleet valuation inquiry toward ${targetCar.name}`
        : "Fleet valuation inquiry"
    );
    if (targetCar) {
      fd.set("targetEvName", targetCar.name);
      fd.set("targetEvPrice", String(targetCar.price));
    }
    fd.set("contactName", fleet.fullName);
    fd.set("fullName", fleet.fullName);
    fd.set("contactCompany", fleet.company);
    fd.set("contactRole", fleet.role);

    const e164Phone =
      toInternationalFormat(fleet.phone) || toNigerianE164(fleet.phone);
    fd.set("contactPhone", e164Phone);
    fd.set("phone", e164Phone);
    fd.set("contactEmail", fleet.email.trim().toLowerCase());
    fd.set("email", fleet.email.trim().toLowerCase());
    if (file) fd.set("fleetList", file);

    try {
      const data = await submitValuationLead(fd);
      if (!data?.success) {
        if (data?.errors) setErrors(data.errors);
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        );
      }
      setSubmitted(true);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    resetFleet();
    clearFile();
    setSubmitted(false);
    setFormError(null);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center font-Quicksand space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <IoCheckmarkCircle size={44} aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-20px font-bold text-black dark:text-white">
            Thanks, {fleet.fullName || "we've got your fleet details"}
          </h2>
          <p className="mx-auto max-w-sm text-14px text-slate-500 dark:text-slate-400 leading-relaxed">
            Our fleet team will reach out within one working day to value your vehicles and discuss swap options.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Button
            variant="bordered"
            radius="full"
            onPress={handleReset}
            className="border-slate-300 dark:border-slate-700 font-medium"
          >
            Submit another fleet
          </Button>
          <Button
            color="primary"
            radius="full"
            onPress={() => {
              handleReset();
              onCloseAll();
            }}
            className="px-7 font-semibold text-white"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-1 no-scrollbar font-Quicksand">
      {/* Header matching PurchaseInstallmentTermModal */}
      <div className="flex items-start justify-between pb-2 border-b border-light dark:border-slate-800">
        <div>
          <h2 className="text-18px font-semibold text-black dark:text-white">
            Fleet Swap Details
          </h2>
          <p className="text-14px text-slate-500 dark:text-slate-400 mt-0.5">
            Our specialists value multi-vehicle trade-ins directly
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-gray-400 hover:text-red-600 rounded-full transition-colors cursor-pointer p-1"
          aria-label="Close"
        >
          <IoMdClose size={22} />
        </button>
      </div>

      {/* Fleet Count Pills */}
      <div>
        <p className="text-14px font-medium text-black dark:text-white mb-2">
          How many cars are in your fleet?
        </p>
        <div className="flex flex-wrap gap-2">
          {FLEET_COUNTS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setFleetField("count", count)}
              className={classNames(
                "px-5 py-2 rounded-full border text-13px font-medium transition-colors cursor-pointer",
                fleet.count === count
                  ? "border-primary bg-primary text-white dark:bg-[#2D419A] dark:border-[#2D419A]"
                  : "border-light dark:border-slate-800 bg-eminence dark:bg-slate-800 text-black dark:text-white hover:border-primary/50"
              )}
            >
              {count} cars
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Upload */}
      <div className="space-y-1.5">
        <label className="block text-12px font-medium text-slate-700 dark:text-slate-300">
          Upload your fleet list (.xlsx or .csv)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.csv"
          onChange={onFile}
          className="sr-only"
        />
        {fleet.fleetFileName ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-13px">
            <span className="flex min-w-0 items-center gap-2">
              <LuPaperclip
                size={15}
                className="shrink-0 text-primary dark:text-accent"
              />
              <span className="truncate">{fleet.fleetFileName}</span>
            </span>
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove file"
              className="rounded-full p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <LuX size={15} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-white/15 px-3.5 py-2.5 text-left text-13px text-slate-500 dark:text-slate-400 transition hover:border-primary/50 cursor-pointer"
          >
            <LuPaperclip size={15} className="shrink-0" />
            Choose a .xlsx or .csv file
          </button>
        )}
        {errors.fleetList && (
          <p className="text-11px text-red-500">{errors.fleetList}</p>
        )}

        {!fleet.showRough && (
          <button
            type="button"
            onClick={() => setFleetField("showRough", true)}
            className="text-12px font-semibold text-primary dark:text-accent hover:underline cursor-pointer"
          >
            No list handy? Describe your fleet instead
          </button>
        )}
      </div>

      {fleet.showRough && (
        <Textarea
          label="What does your fleet look like?"
          placeholder="e.g. 8 Corollas and 4 Hiace buses, mostly 2015–2018"
          rows={2}
          value={fleet.rough}
          onChange={(e) => setFleetField("rough", e.target.value)}
        />
      )}

      {/* Contact Fields */}
      <div className="pt-2 border-t border-light dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            placeholder="e.g. Tunde Adeleke"
            value={fleet.fullName}
            onChange={(e) => setFleetField("fullName", e.target.value)}
            errorMessage={errors.contactName}
            isInvalid={!!errors.contactName}
            required
          />
          <Input
            label="Company Name"
            placeholder="Company name"
            value={fleet.company}
            onChange={(e) => setFleetField("company", e.target.value)}
            errorMessage={errors.contactCompany}
            isInvalid={!!errors.contactCompany}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Your Role"
            placeholder="e.g. Operations Lead"
            value={fleet.role}
            onChange={(e) => setFleetField("role", e.target.value)}
          />
          <Input
            label="Email Address"
            placeholder="you@company.com"
            type="email"
            value={fleet.email}
            onChange={(e) => setFleetField("email", e.target.value)}
            errorMessage={errors.contactEmail}
            isInvalid={!!errors.contactEmail}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
            Phone / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            defaultCountry="ng"
            value={fleet.phone}
            onChange={(val) =>
              setFleetField("phone", normalizePhoneInput(val))
            }
            className="w-full"
          />
          {errors.contactPhone && (
            <p className="text-11px text-red-500 mt-1">{errors.contactPhone}</p>
          )}
        </div>
      </div>

      {formError && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-13px font-medium text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}

      {/* Footer Buttons */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-light dark:border-slate-800">
        <Button
          variant="bordered"
          radius="full"
          onPress={onBack}
          isDisabled={submitting}
          className="border-slate-300 dark:border-slate-700 font-medium"
        >
          Back
        </Button>
        <Button
          color="primary"
          radius="full"
          onPress={handleSubmit}
          isLoading={submitting}
          isDisabled={submitting}
          className="px-8 font-semibold text-white cursor-pointer"
        >
          {submitting ? "Sending..." : "Get my fleet valued"}
        </Button>
      </div>
    </div>
  );
}

