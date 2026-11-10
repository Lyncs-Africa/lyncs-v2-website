"use client";

import React from "react";
import { Button } from "../../ui/HeroUI.jsx";
import { FaWallet, FaCalendarAlt, FaCar } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import classNames from "classnames";
import { numberWithCommas } from "../../../lib/utils.js";
import {
  INSTALLMENT_DOWN_PAYMENT_PERCENT,
  getInstallmentInterestRate,
  getInstallmentTermOptions,
} from "../../../lib/carPurchase.js";

const PurchasePaymentModeModal = ({
  car,
  isAdmin,
  paymentMode,
  onSelectPaymentMode,
  onContinuePaymentMode,
  onBack,
  onClose,
}) => {
  if (!car) return null;

  const interestRate = getInstallmentInterestRate(isAdmin);
  const maxTerm = Math.max(...getInstallmentTermOptions(car.usage));
  const downPaymentPercent = INSTALLMENT_DOWN_PAYMENT_PERCENT * 100;
  const downPaymentAmount = Math.round((car.price || 0) * INSTALLMENT_DOWN_PAYMENT_PERCENT);
  const handleDismiss = onClose || onBack;

  return (
    <div className="relative h-full flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Scrollable Full Modal Body */}
      <div className="w-full md:p-6 p-4 space-y-6 pb-32 overflow-y-auto no-scrollbar flex-1">
        {/* Top Banner Header (matching full modal PurchaseHeader) */}
        <div className="flex items-center gap-2 justify-center rounded-[24px] bg-eminence dark:bg-slate-800/60 border border-light dark:border-white/10 text-center md:p-6 p-4 relative">
          {handleDismiss && (
            <button
              onClick={handleDismiss}
              style={{ marginBottom: "0px" }}
              className="x text-black dark:text-white md:top-5 md:left-4 absolute left-4 cursor-pointer"
              type="button"
              aria-label="Close"
            >
              <IoIosCloseCircleOutline className="text-black dark:text-white" size="30px" />
            </button>
          )}
          <div className="space-y-1">
            <p className="md:text-28px text-22px leading-tight font-semibold text-black dark:text-white">
              Select Payment Mode
            </p>
          </div>
        </div>

        {/* Payment Mode Options */}
        <div className="space-y-3">
          <p className="text-15px font-semibold text-slate-800 dark:text-slate-200">
            Choose a payment option
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onSelectPaymentMode("outright")}
              className={classNames(
                "text-left rounded-2xl border p-5 transition-all cursor-pointer",
                paymentMode === "outright"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/15 dark:border-accent dark:bg-accent/10"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-eminence dark:bg-slate-800 border border-light dark:border-slate-700 flex items-center justify-center">
                  <FaWallet size={20} className="text-primary dark:text-accent" />
                </div>
              </div>
              <p className="text-17px font-bold text-black dark:text-white">Pay at once</p>
              <p className="text-14px text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Pay the full ₦{numberWithCommas(car.price)} upfront with zero financing interest.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onSelectPaymentMode("installment")}
              className={classNames(
                "text-left rounded-2xl border p-5 transition-all cursor-pointer",
                paymentMode === "installment"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/15 dark:border-accent dark:bg-accent/10"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-eminence dark:bg-slate-800 border border-light dark:border-slate-700 flex items-center justify-center">
                  <FaCalendarAlt size={20} className="text-primary dark:text-accent" />
                </div>
              </div>
              <p className="text-17px font-bold text-black dark:text-white">Pay in installments</p>
              <p className="text-14px text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Start with {downPaymentPercent}% down (₦{numberWithCommas(downPaymentAmount)}), spread the balance over up to {maxTerm} months.
              </p>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 p-4 flex items-start gap-3">
          <FiInfo className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" size={18} />
          <div className="text-13px text-amber-900 dark:text-amber-200 leading-relaxed">
            <p className="font-semibold">No immediate payment required today</p>
            <p className="mt-0.5 text-amber-800 dark:text-amber-300">
              Selecting a payment mode prepares your official Lyncs quote. Our team will verify vehicle availability, share the inspection report, and finalize delivery with you on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Full-Modal Bottom Footer */}
      <div className="bg-white dark:bg-slate-900 fixed w-full bottom-0 left-0 z-20 md:rounded-bl-[24px] border-t border-slate-200 dark:border-white/10">
        <div className="min-h-[90px] md:p-4 p-3 flex items-center justify-center gap-4">
          <Button
            onPress={onBack || onClose}
            className="uppercase px-8 font-[500] cursor-pointer"
            size="md"
            color="danger"
            variant="bordered"
            radius="full"
          >
            Back
          </Button>
          <Button
            onPress={onContinuePaymentMode}
            isDisabled={!paymentMode}
            className="disabled:opacity-50 disabled:pointer-events-none uppercase text-white font-[500] px-8 cursor-pointer"
            size="md"
            color="primary"
            radius="full"
          >
            Continue to summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePaymentModeModal;
