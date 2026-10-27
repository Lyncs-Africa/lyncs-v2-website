"use client";

import React from "react";
import { Button, Input, Checkbox } from "../../ui/HeroUI.jsx";
import { PhoneInput } from "react-international-phone";
import SmallerModal from "../shared/SmallerModal.jsx";

const RequestVehicleContactModal = ({
  isOpen,
  onClose,
  contactData,
  setContactData,
  contactErrors,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <SmallerModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col min-h-[460px] md:min-h-[480px] justify-between">
        <div className="space-y-4 pb-4">
          <div>
            <h3 className="text-18px font-bold text-slate-900 dark:text-slate-100">
              Your Contact Details
            </h3>
            <p className="text-13px text-slate-500 dark:text-slate-400 mt-0.5">
              Our sourcing team will verify vehicle details and contact you directly via WhatsApp.
            </p>
          </div>

          <form id="contact-intake-form" onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="First Name"
                placeholder="e.g. Babatunde"
                value={contactData.firstName}
                onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
                errorMessage={contactErrors.firstName}
                isInvalid={!!contactErrors.firstName}
                size="md"
                required
              />
              <Input
                label="Last Name"
                placeholder="e.g. Adeleke"
                value={contactData.lastName}
                onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
                errorMessage={contactErrors.lastName}
                isInvalid={!!contactErrors.lastName}
                size="md"
                required
              />
            </div>

            <Input
              label="Email Address"
              placeholder="e.g. babatunde@company.ng"
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              errorMessage={contactErrors.email}
              isInvalid={!!contactErrors.email}
              size="md"
              required
            />

            {/* Seamless Phone Input */}
            <div className="space-y-1">
              <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
                Phone Number (E.164) <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                defaultCountry="ng"
                value={contactData.phone}
                onChange={(val) => setContactData({ ...contactData, phone: val })}
                className="w-full"
              />
              {contactErrors.phone && (
                <p className="text-11px text-red-500 mt-1">{contactErrors.phone}</p>
              )}
            </div>

            {/* WhatsApp Checkbox & Number */}
            <div className="space-y-2 pt-1">
              <Checkbox
                isSelected={contactData.isSameAsPhone}
                onValueChange={(val) => setContactData({ ...contactData, isSameAsPhone: val })}
                size="sm"
              >
                <span className="text-13px text-slate-700 dark:text-slate-300">
                  WhatsApp number is the same as phone number
                </span>
              </Checkbox>

              {!contactData.isSameAsPhone && (
                <div className="space-y-1 pl-2">
                  <label className="text-12px font-medium text-slate-700 dark:text-slate-300 block">
                    WhatsApp Number (E.164) <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    defaultCountry="ng"
                    value={contactData.whatsapp}
                    onChange={(val) => setContactData({ ...contactData, whatsapp: val })}
                    className="w-full"
                  />
                  {contactErrors.whatsapp && (
                    <p className="text-11px text-red-500 mt-1">{contactErrors.whatsapp}</p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Pinned Bottom Buttons for Contact Step */}
        <div className="pt-6 pb-2 border-t border-light dark:border-slate-800 flex items-center justify-end gap-3 mt-auto">
          <Button
            variant="bordered"
            radius="full"
            onPress={onClose}
            className="border-slate-300 dark:border-slate-700 font-medium px-6 cursor-pointer"
          >
            Back
          </Button>
          <Button
            color="primary"
            radius="full"
            type="submit"
            form="contact-intake-form"
            isLoading={isSubmitting}
            className="px-8 font-semibold text-white cursor-pointer shadow-xs"
          >
            Submit
          </Button>
        </div>
      </div>
    </SmallerModal>
  );
};

export default RequestVehicleContactModal;
