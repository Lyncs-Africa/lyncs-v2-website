"use client";

import React from "react";
import { Button } from "../../ui/HeroUI.jsx";
import { FaWallet, FaCalendarAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
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

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between pb-2 border-b border-light dark:border-slate-800">
        <div>
          <h2 className="text-18px font-semibold text-black dark:text-white">Select Payment Mode</h2>
          <p className="text-14px text-slate-500 dark:text-slate-400 mt-0.5">
            How would you like to pay for {car.name}?
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelectPaymentMode("outright")}
          className={classNames(
            "text-left rounded-medium border bg-white dark:bg-slate-900 p-5 transition-colors cursor-pointer rounded-lg",
            paymentMode === "outright"
              ? "border-primary bg-primary/5 dark:border-accent"
              : "border-light dark:border-slate-800 hover:border-primary/50"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-eminence dark:bg-slate-800 border border-light dark:border-slate-700 flex items-center justify-center">
              <FaWallet size={18} className="text-primary dark:text-accent" />
            </div>
            <span className="text-12px font-medium text-slate-500 dark:text-slate-400 bg-eminence dark:bg-slate-800 rounded-full px-3 py-1">
              No interest
            </span>
          </div>
          <p className="text-16px font-semibold text-black dark:text-white">Pay at once</p>
          <p className="text-14px text-slate-500 dark:text-slate-400 mt-1">
            Pay the full ₦{numberWithCommas(car.price)} upfront.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelectPaymentMode("installment")}
          className={classNames(
            "text-left rounded-medium border bg-white dark:bg-slate-900 p-5 transition-colors cursor-pointer rounded-lg",
            paymentMode === "installment"
              ? "border-primary bg-primary/5 dark:border-accent"
              : "border-light dark:border-slate-800 hover:border-primary/50"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-eminence dark:bg-slate-800 border border-light dark:border-slate-700 flex items-center justify-center">
              <FaCalendarAlt size={18} className="text-primary dark:text-accent" />
            </div>
            <span className="text-12px font-medium text-slate-500 dark:text-slate-400 bg-eminence dark:bg-slate-800 rounded-full px-3 py-1">
              {(interestRate * 100).toFixed(1)}% interest
            </span>
          </div>
          <p className="text-16px font-semibold text-black dark:text-white">Pay in installments</p>
          <p className="text-14px text-slate-500 dark:text-slate-400 mt-1">
            Pay {downPaymentPercent}% now, spread the rest over {maxTerm} months.
          </p>
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 pt-4 border-t border-light dark:border-slate-800">
        <Button
          onPress={onBack}
          className="uppercase px-8 font-[500]"
          size="md"
          color="danger"
          variant="bordered"
        >
          Back
        </Button>
        <Button
          onPress={onContinuePaymentMode}
          isDisabled={!paymentMode}
          className="disabled:opacity-50 disabled:pointer-events-none uppercase text-white font-[500]"
          size="md"
          color="primary"
        >
          Continue to summary
        </Button>
      </div>
    </div>
  );
};

export default PurchasePaymentModeModal;
