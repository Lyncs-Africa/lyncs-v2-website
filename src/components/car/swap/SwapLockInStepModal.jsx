"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input, Checkbox } from "../../ui/HeroUI.jsx";
import { PhoneInput } from "react-international-phone";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { useValuationStore } from "../../../store/valuationStore";
import { EV_CONFIG } from "../../../lib/valuation/config";
import { resolveActiveEv } from "../../../lib/valuation/evOptions";
import { submitValuationLead } from "../../../lib/valuation/getCarValuation";
import { getBreakdown, monthlyLabel, nairaM } from "../../../lib/valuation/breakdown";
import { toInternationalFormat, normalizePhoneInput } from "../../../lib/utils.js";
import { toNigerianE164 } from "../../../lib/api/contact";

/**
 * Step 3 modal (rendered inside SmallerModal) for capturing contact details and locking in
 * a trade-in valuation quote. Visually consistent with PurchaseInstallmentTermModal & PurchaseDeliveryModal.
 */
export default function SwapLockInStepModal({
  targetCar,
  onBack,
  onCloseAll,
}) {
  const owner = useValuationStore((s) => s.owner);
  const result = useValuationStore((s) => s.result);
  const tenor = useValuationStore((s) => s.tenor);
  const evs = useValuationStore((s) => s.evs);
  const selectedEvId = useValuationStore((s) => s.selectedEvId);
  const resetOwner = useValuationStore((s) => s.resetOwner);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    isSameAsPhone: true,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const effectiveTarget =
    targetCar ||
    resolveActiveEv(
      evs,
      selectedEvId,
      result ? (result.min + result.max) / 2 : 0
    );
  const breakdown = result ? getBreakdown(result, tenor, effectiveTarget) : null;

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim() || !form.email.includes("@")) {
      errs.email = "Valid email is required";
    }

    const formattedPhone =
      toInternationalFormat(form.phone) || toNigerianE164(form.phone);
    if (!formattedPhone || formattedPhone.length < 8) {
      errs.phone =
        "Valid phone number (E.164) is required, e.g. +2348012345678";
    }

    if (!form.isSameAsPhone) {
      const formattedWhatsapp =
        toInternationalFormat(form.whatsapp) || toNigerianE164(form.whatsapp);
      if (!formattedWhatsapp || formattedWhatsapp.length < 8) {
        errs.whatsapp =
          "Valid WhatsApp number (E.164) is required, e.g. +2348012345678";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting || !result) return;
    if (!validate()) {
      toast.error("Please fill in all required contact details.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    const formattedPhone =
      toInternationalFormat(form.phone) || toNigerianE164(form.phone);
    const targetWa = form.isSameAsPhone ? form.phone : form.whatsapp;
    const formattedWa =
      toInternationalFormat(targetWa) || toNigerianE164(targetWa);

    const fd = new FormData();
    fd.set("type", "owner");
    fd.set("make", owner.make);
    fd.set("model", owner.model);
    fd.set("year", String(owner.year));
    fd.set("mileageKm", String(owner.km).replace(/\D/g, ""));
    fd.set("condition", owner.condition);
    fd.set("estimateMin", String(result.min));
    fd.set("estimateMax", String(result.max));

    fd.set("tenor", `${tenor} months`);
    fd.set("spreadOver", `${tenor} months`);
    fd.set("tenorMonths", String(tenor));
    fd.set("months", String(tenor));
    fd.set("repaymentTenor", `${tenor} months`);
    fd.set("installmentMonths", String(tenor));

    fd.set("targetEvName", effectiveTarget.name);
    fd.set("targetEvPrice", String(effectiveTarget.price));

    if (breakdown?.monthly != null) {
      fd.set("monthlyPayment", String(Math.round(breakdown.monthly)));
      fd.set("monthlyEstimate", String(Math.round(breakdown.monthly)));
    }

    fd.set("contactName", fullName);
    fd.set("fullName", fullName);
    fd.set("contactPhone", formattedPhone);
    fd.set("phone", formattedPhone);
    fd.set("whatsapp", formattedWa);
    fd.set("contactEmail", form.email.trim().toLowerCase());
    fd.set("email", form.email.trim().toLowerCase());

    try {
      const data = await submitValuationLead(fd);
      if (!data?.success) {
        if (data?.errors) setErrors(data.errors);
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        );
      }
      resetOwner();
      setIsDone(true);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <div className="flex flex-col items-center py-8 text-center font-Quicksand space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <IoCheckmarkCircle size={44} aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-20px font-bold text-black dark:text-white">
            Your valuation is locked in
          </h2>
          <p className="mx-auto max-w-sm text-14px text-slate-500 dark:text-slate-400 leading-relaxed">
            We&apos;ll reach out within one working day to book your vehicle inspection. Your quote is held for{" "}
            {EV_CONFIG.quoteHeldDays} days.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Button
            variant="bordered"
            radius="full"
            onPress={onCloseAll}
            className="border-slate-300 dark:border-slate-700 font-medium"
          >
            Back to listing
          </Button>
          <Link
            href="/cars"
            onClick={onCloseAll}
            className="inline-flex items-center justify-center rounded-full bg-primary dark:bg-[#2D419A] px-7 py-2.5 text-14px font-semibold text-white transition hover:opacity-90"
          >
            See available EVs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-1 no-scrollbar font-Quicksand">
      {/* Header matching PurchaseInstallmentTermModal */}
      <div className="flex items-start justify-between pb-2 border-b border-light dark:border-slate-800">
        <div>
          <h2 className="text-18px font-semibold text-black dark:text-white">
            Lock In Your Valuation
          </h2>
          <p className="text-14px text-slate-500 dark:text-slate-400 mt-0.5">
            Leave your details and we&apos;ll book your inspection
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

      {/* Valuation Summary Strip */}
      {result && (
        <div className="rounded-xl border border-light dark:border-slate-800 bg-eminence/60 dark:bg-slate-800/40 p-4 space-y-1.5 text-13px">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-black dark:text-white">
              {owner.make} {owner.model} ({owner.year})
            </span>
            <span className="font-bold text-primary dark:text-accent">
              {nairaM(result.min)} – {nairaM(result.max)}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 dark:text-slate-400">
            <span>
              Toward {effectiveTarget.name} • Spread over {tenor} months
            </span>
            {breakdown?.monthly != null && (
              <span className="font-medium text-slate-700 dark:text-slate-200">
                ~{monthlyLabel(breakdown.monthly)}/mo
              </span>
            )}
          </div>
        </div>
      )}

      {/* Contact Details Form matching PurchaseDeliveryModal */}
      <div className="space-y-4">
        <div>
          <h3 className="text-16px font-bold text-slate-900 dark:text-slate-100">
            Your Contact Details
          </h3>
          <p className="text-12px text-slate-500 dark:text-slate-400 mt-0.5">
            Our team will confirm your vehicle inspection slot and share your quote on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="First Name"
            placeholder="e.g. Tunde"
            value={form.firstName}
            onChange={(e) => {
              setForm((p) => ({ ...p, firstName: e.target.value }));
              if (errors.firstName) {
                setErrors((p) => ({ ...p, firstName: "" }));
              }
            }}
            errorMessage={errors.firstName}
            isInvalid={!!errors.firstName}
            size="md"
            required
          />
          <Input
            label="Last Name"
            placeholder="e.g. Adeleke"
            value={form.lastName}
            onChange={(e) => {
              setForm((p) => ({ ...p, lastName: e.target.value }));
              if (errors.lastName) {
                setErrors((p) => ({ ...p, lastName: "" }));
              }
            }}
            errorMessage={errors.lastName}
            isInvalid={!!errors.lastName}
            size="md"
            required
          />
        </div>

        <Input
          label="Email Address"
          placeholder="e.g. tunde@company.com"
          type="email"
          value={form.email}
          onChange={(e) => {
            setForm((p) => ({ ...p, email: e.target.value }));
            if (errors.email || errors.contactEmail) {
              setErrors((p) => ({ ...p, email: "", contactEmail: "" }));
            }
          }}
          errorMessage={errors.email || errors.contactEmail}
          isInvalid={!!(errors.email || errors.contactEmail)}
          size="md"
          required
        />

        <div className="space-y-1">
          <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            defaultCountry="ng"
            value={form.phone}
            onChange={(val) => {
              const normalized = normalizePhoneInput(val);
              setForm((prev) => ({
                ...prev,
                phone: normalized,
                whatsapp: prev.isSameAsPhone ? normalized : prev.whatsapp,
              }));
              if (errors.phone || errors.contactPhone) {
                setErrors((p) => ({ ...p, phone: "", contactPhone: "" }));
              }
            }}
            className="w-full"
          />
          {(errors.phone || errors.contactPhone) && (
            <p className="text-11px text-red-500 mt-1">
              {errors.phone || errors.contactPhone}
            </p>
          )}
        </div>

        <div className="space-y-2 pt-1">
          <Checkbox
            isSelected={form.isSameAsPhone}
            onValueChange={(val) =>
              setForm((p) => ({
                ...p,
                isSameAsPhone: val,
                whatsapp: val ? p.phone : p.whatsapp,
              }))
            }
            size="sm"
          >
            WhatsApp number is the same as phone number
          </Checkbox>

          {!form.isSameAsPhone && (
            <div className="space-y-1 pl-2">
              <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                defaultCountry="ng"
                value={form.whatsapp}
                onChange={(val) => {
                  const normalized = normalizePhoneInput(val);
                  setForm((prev) => ({ ...prev, whatsapp: normalized }));
                  if (errors.whatsapp) {
                    setErrors((p) => ({ ...p, whatsapp: "" }));
                  }
                }}
                className="w-full"
              />
              {errors.whatsapp && (
                <p className="text-11px text-red-500 mt-1">
                  {errors.whatsapp}
                </p>
              )}
            </div>
          )}
        </div>

        {formError && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-13px font-medium text-red-600 dark:text-red-400">
            {formError}
          </p>
        )}
      </div>

      {/* Footer Buttons matching PurchaseDeliveryModal */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-light dark:border-slate-800">
        <Button
          variant="bordered"
          radius="full"
          onPress={onBack}
          isDisabled={isSubmitting}
          className="border-slate-300 dark:border-slate-700 font-medium"
        >
          Back
        </Button>
        <Button
          color="primary"
          radius="full"
          onPress={handleSubmit}
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          className="px-8 font-semibold text-white cursor-pointer"
        >
          {isSubmitting ? "Booking inspection..." : "Book my inspection"}
        </Button>
      </div>
    </div>
  );
}

