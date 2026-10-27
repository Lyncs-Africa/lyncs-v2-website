"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "../../ui/HeroUI.jsx";

const RequestVehicleSuccess = ({ submissionSuccess, onClose }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
        <FiCheckCircle className="text-emerald-600 dark:text-emerald-400" size={36} />
      </div>

      <div className="space-y-1">
        <h3 className="text-20px font-bold text-slate-900 dark:text-white">
          {submissionSuccess?.type === "swap"
            ? "Trade-in Request Submitted"
            : "Sourcing Request Submitted"}
        </h3>
        <p className="text-15px text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          {submissionSuccess?.message}
        </p>
      </div>

      <Button
        color="primary"
        radius="full"
        onPress={onClose}
        className="px-10 font-semibold text-white shadow-xs cursor-pointer"
      >
        Done
      </Button>
    </div>
  );
};

export default RequestVehicleSuccess;
