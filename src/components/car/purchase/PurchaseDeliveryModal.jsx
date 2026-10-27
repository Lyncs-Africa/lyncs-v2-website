"use client";

import React, { useState } from "react";
import { Button, Input, Checkbox } from "../../ui/HeroUI.jsx";
import { FiMapPin, FiTruck } from "react-icons/fi";
import { PhoneInput } from "react-international-phone";
import cn from "classnames";
import { numberWithCommas, toInternationalFormat } from "../../../lib/utils.js";
import { getDeliveryFeeInfo } from "../../../lib/carPurchase.js";

const PurchaseDeliveryModal = ({
  car,
  deliveryMethod,
  onSelectDelivery,
  address = {},
  onChangeAddress,
  contactInfo = {},
  onChangeContactInfo,
  onContinueDelivery,
  onBack,
  isSubmitting = false,
}) => {
  const deliveryFeeInfo = getDeliveryFeeInfo(car?.price || 0);

  const [form, setForm] = useState({
    firstName: contactInfo.firstName || "",
    lastName: contactInfo.lastName || "",
    email: contactInfo.email || "",
    phone: contactInfo.phone || "",
    whatsapp: contactInfo.whatsapp || contactInfo.phone || "",
    isSameAsPhone: contactInfo.isSameAsPhone ?? true,
  });

  const [errors, setErrors] = useState({});

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

    if (deliveryMethod === "delivery" && !address?.line?.trim()) {
      errs.address = "Street address is required for doorstep delivery";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    const formattedPhone = toInternationalFormat(form.phone);
    const targetWhatsapp = form.isSameAsPhone ? form.phone : form.whatsapp;
    const formattedWhatsapp = toInternationalFormat(targetWhatsapp);

    const contactPayload = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      email: form.email.trim(),
      phone: formattedPhone,
      whatsapp: formattedWhatsapp,
      isSameAsPhone: form.isSameAsPhone,
    };

    if (onChangeContactInfo) {
      onChangeContactInfo(contactPayload);
    }
    if (onContinueDelivery) {
      onContinueDelivery(contactPayload);
    }
  };

  return (
    <div className="space-y-6">

      {/* 2. Customer Contact & WhatsApp Information */}
      <div className="space-y-4 pt-2">
        <div>
          <h3 className="text-16px font-bold text-slate-900 dark:text-slate-100">Your Contact Details</h3>
          <p className="text-12px text-slate-500 dark:text-slate-400 mt-0.5">
            Our sourcing team will verify vehicle inspection data and send the complete quote to your WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="First Name"
            placeholder="e.g. Tunde"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            errorMessage={errors.firstName}
            isInvalid={!!errors.firstName}
            size="md"
            required
          />
          <Input
            label="Last Name"
            placeholder="e.g. Adeleke"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
            onChange={(val) => setForm({ ...form, phone: val })}
            className="w-full"
          />
          {errors.phone && <p className="text-11px text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* WhatsApp Checkbox & Number */}
        <div className="space-y-2 pt-1">
          <Checkbox
            isSelected={form.isSameAsPhone}
            onValueChange={(val) => setForm({ ...form, isSameAsPhone: val })}
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
                onChange={(val) => setForm({ ...form, whatsapp: val })}
                className="w-full"
              />
              {errors.whatsapp && <p className="text-11px text-red-500 mt-1">{errors.whatsapp}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-light dark:border-slate-800">
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
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          className="px-8 font-semibold text-white cursor-pointer"
        >
          {isSubmitting ? "Submitting Quote..." : "Request a quote"}
        </Button>
      </div>
    </div>
  );
};

export default PurchaseDeliveryModal;
