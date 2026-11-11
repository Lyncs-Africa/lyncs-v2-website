"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Checkbox } from "../../ui/HeroUI.jsx";
import { IoMdClose } from "react-icons/io";
import classNames from "classnames";
import { numberWithCommas, toInternationalFormat, normalizePhoneInput } from "../../../lib/utils.js";
import {
  computeInstallmentBreakdown,
  getInstallmentTermOptions,
  INSTALLMENT_DOWN_PAYMENT_PERCENT,
} from "../../../lib/carPurchase.js";
import { PhoneInput } from "react-international-phone";
import { toast } from "react-toastify";

const PurchaseInstallmentTermModal = ({
  car,
  isAdmin,
  months,
  onChangeMonths,
  onContinueInstallmentTerm,
  contactInfo,
  onChangeContactInfo,
  onBack,
  onClose,
  isSubmitting = false,
}) => {
  if (!car) return null;

  const [form, setForm] = useState({
    firstName:
      contactInfo?.firstName ||
      (contactInfo?.name ? contactInfo.name.split(" ")[0] : "") ||
      "",
    lastName:
      contactInfo?.lastName ||
      (contactInfo?.name ? contactInfo.name.split(" ").slice(1).join(" ") : "") ||
      "",
    email: contactInfo?.email || "",
    phone: contactInfo?.phone || "",
    whatsapp: contactInfo?.whatsapp || contactInfo?.phone || "",
    isSameAsPhone: contactInfo?.isSameAsPhone ?? true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contactInfo && Object.keys(contactInfo).length > 0) {
      setForm((prev) => ({
        firstName: contactInfo.firstName ?? prev.firstName,
        lastName: contactInfo.lastName ?? prev.lastName,
        email: contactInfo.email ?? prev.email,
        phone: contactInfo.phone ?? prev.phone,
        whatsapp: contactInfo.whatsapp ?? prev.whatsapp,
        isSameAsPhone: contactInfo.isSameAsPhone ?? prev.isSameAsPhone,
      }));
    }
  }, [contactInfo]);

  const notifyChange = (updatedForm) => {
    const fullName = [updatedForm.firstName, updatedForm.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    onChangeContactInfo?.({
      ...updatedForm,
      name: fullName,
      recipientName: fullName,
    });
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email is required";

    const formattedPhone = toInternationalFormat(form.phone);
    if (!formattedPhone) {
      errs.phone = "Valid phone number (E.164) is required, e.g. +2348012345678";
    }

    if (!form.isSameAsPhone) {
      const formattedWhatsapp = toInternationalFormat(form.whatsapp);
      if (!formattedWhatsapp) {
        errs.whatsapp = "Valid WhatsApp number (E.164) is required, e.g. +2348012345678";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (!months) {
      toast.error("Please choose a financing term duration.");
      return;
    }
    if (!validate()) {
      toast.error("Please fill in all required contact details.");
      return;
    }

    const formattedPhone = toInternationalFormat(form.phone);
    const targetWhatsapp = form.isSameAsPhone ? form.phone : form.whatsapp;
    const formattedWhatsapp = toInternationalFormat(targetWhatsapp);

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    onContinueInstallmentTerm?.({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      name: fullName,
      recipientName: fullName,
      email: form.email.trim(),
      phone: formattedPhone,
      whatsapp: formattedWhatsapp,
      isSameAsPhone: form.isSameAsPhone,
    });
  };

  const termOptions = getInstallmentTermOptions(car.usage);
  const breakdown = months ? computeInstallmentBreakdown(car.price, months, isAdmin) : null;
  const downPaymentPercent = Math.round(INSTALLMENT_DOWN_PAYMENT_PERCENT * 100);

  return (
    <div className="space-y-4 px-1 no-scrollbar">
      <div className="flex items-start justify-between pb-2 border-b border-light dark:border-slate-800">
        <div>
          <h2 className="text-18px font-semibold text-black dark:text-white">Installment Plan</h2>
          <p className="text-14px text-slate-500 dark:text-slate-400 mt-0.5">
            Choose your preferred repayment duration
          </p>
        </div>
        {(onClose || onBack) && (
          <button
            type="button"
            onClick={onClose || onBack}
            className="text-gray-400 hover:text-red-600 rounded-full transition-colors cursor-pointer p-1"
            aria-label="Close"
          >
            <IoMdClose size={22} />
          </button>
        )}
      </div>

      <div>
        <p className="text-15px font-medium text-black dark:text-white mb-2">Choose your term</p>
        <div className="flex flex-wrap gap-2">
          {termOptions.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChangeMonths(m)}
              className={classNames(
                "px-5 py-2.5 rounded-full border text-14px font-medium transition-colors cursor-pointer",
                months === m
                  ? "border-primary bg-primary text-white"
                  : "border-light dark:border-slate-800 bg-eminence dark:bg-slate-800 text-black dark:text-white hover:border-primary/50"
              )}
            >
              {m} months
            </button>
          ))}
        </div>
      </div>

      {breakdown && (
        <div className="rounded-medium border border-light dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 rounded-lg">
          <div className="flex justify-between items-center py-1 text-15px">
            <span className="text-slate-600 dark:text-slate-400">
              Down payment ({downPaymentPercent}%)
            </span>
            <span className="font-semibold text-primary dark:text-accent">
              ₦{numberWithCommas(breakdown.downPayment)}
            </span>
          </div>
        </div>
      )}

      {/* Contact Details Form (matching Pay Once model) */}
      <div className="pt-3 border-t border-light dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-16px font-bold text-slate-900 dark:text-slate-100">Your Contact Details</h3>
          <p className="text-12px text-slate-500 dark:text-slate-400 mt-0.5">
            Our sourcing team will verify vehicle inspection data and send the complete quote to your WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="First Name"
              placeholder="e.g. Tunde"
              value={form.firstName}
              onChange={(e) => {
                const next = { ...form, firstName: e.target.value };
                setForm(next);
                if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                notifyChange(next);
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
                const next = { ...form, lastName: e.target.value };
                setForm(next);
                if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
                notifyChange(next);
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
              const next = { ...form, email: e.target.value };
              setForm(next);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              notifyChange(next);
            }}
            errorMessage={errors.email}
            isInvalid={!!errors.email}
            size="md"
            required
          />

          {/* International Phone Input */}
          <div className="space-y-1">
            <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              defaultCountry="ng"
              value={form.phone}
              onChange={(val) => {
                const normalized = normalizePhoneInput(val);
                const next = {
                  ...form,
                  phone: normalized,
                  whatsapp: form.isSameAsPhone ? normalized : form.whatsapp,
                };
                setForm(next);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                notifyChange(next);
              }}
              className="w-full"
            />
            {errors.phone && <p className="text-11px text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* WhatsApp Checkbox & Number */}
          <div className="space-y-2 pt-1">
            <Checkbox
              isSelected={form.isSameAsPhone}
              onValueChange={(val) => {
                const next = {
                  ...form,
                  isSameAsPhone: val,
                  whatsapp: val ? form.phone : form.whatsapp,
                };
                setForm(next);
                notifyChange(next);
              }}
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
                    const next = { ...form, whatsapp: normalized };
                    setForm(next);
                    if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: undefined }));
                    notifyChange(next);
                  }}
                  className="w-full"
                />
                {errors.whatsapp && <p className="text-11px text-red-500 mt-1">{errors.whatsapp}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

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
          onPress={handleContinue}
          isDisabled={!months || isSubmitting}
          isLoading={isSubmitting}
          className="px-8 font-semibold text-white cursor-pointer"
        >
          {isSubmitting ? "Submitting Quote..." : "Request a quote"}
        </Button>
      </div>
    </div>
  );
};

export default PurchaseInstallmentTermModal;
