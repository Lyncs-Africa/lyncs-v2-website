"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Checkbox } from "../../ui/HeroUI.jsx";
import { IoMdClose } from "react-icons/io";
import classNames from "classnames";
import { numberWithCommas, toInternationalFormat } from "../../../lib/utils.js";
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

  const defaultFirstName =
    contactInfo?.firstName ||
    (contactInfo?.name ? contactInfo.name.split(" ")[0] : "") ||
    "";
  const defaultLastName =
    contactInfo?.lastName ||
    (contactInfo?.name ? contactInfo.name.split(" ").slice(1).join(" ") : "") ||
    "";
  const defaultEmail = contactInfo?.email || "";
  const defaultPhone =
    toInternationalFormat(contactInfo?.phone) || "+234";

  const [firstName, setFirstName] = useState(contactInfo?.firstName ?? defaultFirstName);
  const [lastName, setLastName] = useState(contactInfo?.lastName ?? defaultLastName);
  const [email, setEmail] = useState(contactInfo?.email || defaultEmail);
  const [phone, setPhone] = useState(
    contactInfo?.phone ? toInternationalFormat(contactInfo.phone) : defaultPhone
  );
  const [whatsapp, setWhatsapp] = useState(
    contactInfo?.whatsapp ? toInternationalFormat(contactInfo.whatsapp) : defaultPhone
  );
  const [isSameAsPhone, setIsSameAsPhone] = useState(
    contactInfo?.isSameAsPhone ??
    (contactInfo?.phone && contactInfo?.whatsapp ? contactInfo.phone === contactInfo.whatsapp : true)
  );

  useEffect(() => {
    if (contactInfo) {
      if (contactInfo.firstName !== undefined) setFirstName(contactInfo.firstName || defaultFirstName);
      if (contactInfo.lastName !== undefined) setLastName(contactInfo.lastName || defaultLastName);
      if (contactInfo.email !== undefined) setEmail(contactInfo.email || defaultEmail);
      if (contactInfo.phone !== undefined)
        setPhone(contactInfo.phone ? toInternationalFormat(contactInfo.phone) : defaultPhone);
      if (contactInfo.whatsapp !== undefined)
        setWhatsapp(contactInfo.whatsapp ? toInternationalFormat(contactInfo.whatsapp) : defaultPhone);
      if (contactInfo.isSameAsPhone !== undefined) setIsSameAsPhone(contactInfo.isSameAsPhone);
    }
  }, [contactInfo, defaultEmail, defaultFirstName, defaultLastName, defaultPhone]);

  const notifyChange = (next = {}) => {
    const fName = next.firstName !== undefined ? next.firstName : firstName;
    const lName = next.lastName !== undefined ? next.lastName : lastName;
    const em = next.email !== undefined ? next.email : email;
    const ph = next.phone !== undefined ? next.phone : phone;
    const same = next.isSameAsPhone !== undefined ? next.isSameAsPhone : isSameAsPhone;
    const wa = next.whatsapp !== undefined ? next.whatsapp : same ? ph : whatsapp;
    const fullName = [fName, lName].filter(Boolean).join(" ").trim();

    onChangeContactInfo?.({
      firstName: fName,
      lastName: lName,
      name: fullName,
      recipientName: fullName,
      email: em,
      phone: ph,
      whatsapp: wa,
      isSameAsPhone: same,
    });
  };

  const handleFirstNameChange = (val) => {
    setFirstName(val);
    notifyChange({ firstName: val });
  };

  const handleLastNameChange = (val) => {
    setLastName(val);
    notifyChange({ lastName: val });
  };

  const handlePhoneChange = (val) => {
    setPhone(val);
    const newWhatsapp = isSameAsPhone ? val : whatsapp;
    if (isSameAsPhone) {
      setWhatsapp(val);
    }
    notifyChange({ phone: val, whatsapp: newWhatsapp });
  };

  const handleWhatsappChange = (val) => {
    setWhatsapp(val);
    notifyChange({ whatsapp: val });
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    notifyChange({ email: val });
  };

  const handleCheckboxChange = (checked) => {
    setIsSameAsPhone(checked);
    const newWhatsapp = checked ? phone : whatsapp;
    if (checked) setWhatsapp(phone);
    notifyChange({ isSameAsPhone: checked, whatsapp: newWhatsapp });
  };

  const handleContinue = () => {
    if (!months) {
      toast.error("Please choose a financing term duration.");
      return;
    }
    if (!firstName?.trim() || !lastName?.trim()) {
      toast.error("Please provide your first and last name.");
      return;
    }
    if (!email?.trim() || !email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    const formattedPhone = toInternationalFormat(phone);
    if (!formattedPhone) {
      toast.error("Please provide a valid phone number (e.g. +2348012345678).");
      return;
    }

    const targetWhatsapp = isSameAsPhone ? phone : whatsapp;
    const formattedWhatsapp = toInternationalFormat(targetWhatsapp);
    if (!formattedWhatsapp) {
      toast.error("Please provide a valid WhatsApp number (e.g. +2348012345678).");
      return;
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
    onContinueInstallmentTerm?.({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: fullName,
      recipientName: fullName,
      email: email.trim(),
      phone: formattedPhone,
      whatsapp: formattedWhatsapp,
      isSameAsPhone,
    });
  };

  const termOptions = getInstallmentTermOptions(car.usage);
  const breakdown = months ? computeInstallmentBreakdown(car.price, months, isAdmin) : null;
  const downPaymentPercent = Math.round(INSTALLMENT_DOWN_PAYMENT_PERCENT * 100);

  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-auto px-1 slim-scroll">
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

      {/* Contact Details Form */}
      <div className="pt-3 border-t border-light dark:border-slate-800 space-y-4">
        <p className="text-16px font-semibold text-black dark:text-white">Contact Information</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={firstName}
              onChange={(e) => handleFirstNameChange(e.target.value)}
              className="w-full"
              type="text"
              label="First name"
              placeholder="e.g. Babatunde"
            />

            <Input
              value={lastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
              className="w-full"
              type="text"
              label="Last name"
              placeholder="e.g. Adeleke"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="w-full"
              type="email"
              label="Email"
              placeholder="e.g. babatunde@company.ng"
            />

            <div id="phone-input-wrapper" className="space-y-1">
              <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                defaultCountry="ng"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center px-1 pt-1">
              <Checkbox
                isSelected={isSameAsPhone}
                onValueChange={handleCheckboxChange}
                size="sm"
              >
                <span className="text-sm font-medium text-black dark:text-white select-none">
                  Use WhatsApp number as phone number
                </span>
              </Checkbox>
            </div>

            {!isSameAsPhone && (
              <div id="phone-input-wrapper" className="space-y-1">
                <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  defaultCountry="ng"
                  value={whatsapp}
                  onChange={handleWhatsappChange}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pt-4 border-t border-light dark:border-slate-800">
        <Button
          onPress={onBack}
          isDisabled={isSubmitting}
          className="uppercase px-8 font-[500]"
          size="md"
          color="danger"
          variant="bordered"
        >
          Back
        </Button>
        <Button
          onPress={handleContinue}
          isDisabled={!months || isSubmitting}
          isLoading={isSubmitting}
          className="disabled:opacity-50 disabled:pointer-events-none uppercase text-white font-[500] px-8"
          size="md"
          color="primary"
        >
          {isSubmitting ? "Submitting Quote..." : "Get a quote"}
        </Button>
      </div>
    </div>
  );
};

export default PurchaseInstallmentTermModal;
