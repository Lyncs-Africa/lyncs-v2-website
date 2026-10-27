"use client";

import React from "react";
import { Button, Input, Select, SelectItem, Textarea } from "../../ui/HeroUI.jsx";
import { numberWithCommas } from "../../../lib/utils.js";

// Helper to format numeric input strings with thousand separators
const formatWithCommas = (val) => {
  if (!val) return "";
  const cleaned = val.toString().replace(/[^0-9]/g, "");
  if (!cleaned) return "";
  return Number(cleaned).toLocaleString("en-US");
};

const RequestVehicleForm = ({
  isSwap,
  swapTargetCar,
  vehicleData,
  setVehicleData,
  onProceed,
  onCancel,
}) => {
  const handleBudgetMinChange = (e) => {
    setVehicleData((prev) => ({
      ...prev,
      budgetMin: formatWithCommas(e.target.value),
    }));
  };

  const handleBudgetMaxChange = (e) => {
    setVehicleData((prev) => ({
      ...prev,
      budgetMax: formatWithCommas(e.target.value),
    }));
  };

  return (
    <form onSubmit={onProceed} className="flex-1 flex flex-col justify-between overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
        {/* Target Car Banner if Swap */}
        {isSwap && swapTargetCar && (
          <div className="p-3.5 bg-primary/5 dark:bg-accent/10 border border-primary/20 dark:border-accent/20 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-11px uppercase font-bold text-primary dark:text-accent">
                Target Upgrade Vehicle
              </span>
              <p className="text-14px font-bold text-slate-900 dark:text-white">
                {swapTargetCar.name}
              </p>
              {swapTargetCar.platform && (
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Source: {swapTargetCar.platform}
                </span>
              )}
            </div>
            <span className="text-14px font-extrabold text-primary dark:text-accent">
              ₦{numberWithCommas(swapTargetCar.price || 0)}
            </span>
          </div>
        )}

        {isSwap ? (
          /* Swap / Trade-in Vehicle Fields */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Your Current Car Make"
                placeholder="e.g. Toyota, Mercedes, Lexus"
                value={vehicleData.currentMake}
                onChange={(e) =>
                  setVehicleData({ ...vehicleData, currentMake: e.target.value })
                }
                required
              />
              <Input
                label="Your Current Model & Year"
                placeholder="e.g. Camry SE 2021"
                value={vehicleData.currentModel}
                onChange={(e) =>
                  setVehicleData({ ...vehicleData, currentModel: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                label="Fuel Type"
                selectedKeys={[vehicleData.currentFuelType]}
                onSelectionChange={(keys) =>
                  setVehicleData({
                    ...vehicleData,
                    currentFuelType: Array.from(keys)[0] || "petrol",
                  })
                }
              >
                <SelectItem key="petrol" value="petrol">Petrol</SelectItem>
                <SelectItem key="hybrid" value="hybrid">Hybrid</SelectItem>
                <SelectItem key="electric" value="electric">Electric</SelectItem>
              </Select>

              <Select
                label="Condition"
                selectedKeys={[vehicleData.currentCondition]}
                onSelectionChange={(keys) =>
                  setVehicleData({
                    ...vehicleData,
                    currentCondition: Array.from(keys)[0] || "used",
                  })
                }
              >
                <SelectItem key="used" value="used">Nigerian Used</SelectItem>
                <SelectItem key="foreign-used" value="foreign-used">Foreign Used</SelectItem>
              </Select>

              <Input
                label="Mileage (km)"
                placeholder="e.g. 112,000"
                value={vehicleData.currentMileageKm}
                onChange={(e) =>
                  setVehicleData({
                    ...vehicleData,
                    currentMileageKm: formatWithCommas(e.target.value),
                  })
                }
              />
            </div>

            <Textarea
              label="Known Faults or Mechanical Condition"
              placeholder="Describe engine condition, AC, gearbox, body scratches, or accident history..."
              value={vehicleData.currentIssues}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, currentIssues: e.target.value })
              }
              rows={4}
            />
          </>
        ) : (
          /* Bespoke Sourcing Vehicle Fields */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Vehicle Make / Brand"
                placeholder="e.g. Toyota, Mercedes, BYD"
                value={vehicleData.make}
                onChange={(e) =>
                  setVehicleData({ ...vehicleData, make: e.target.value })
                }
                required
              />
              <Input
                label="Vehicle Model"
                placeholder="e.g. HiAce 18-Seater, RAV4"
                value={vehicleData.model}
                onChange={(e) =>
                  setVehicleData({ ...vehicleData, model: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Powertrain Type"
                selectedKeys={[vehicleData.type]}
                onSelectionChange={(keys) =>
                  setVehicleData({
                    ...vehicleData,
                    type: Array.from(keys)[0] || "petrol",
                  })
                }
              >
                <SelectItem key="petrol" value="petrol">Petrol</SelectItem>
                <SelectItem key="electric" value="electric">Electric</SelectItem>
                <SelectItem key="hybrid" value="hybrid">Hybrid</SelectItem>
              </Select>

              <Select
                label="Vehicle Condition"
                selectedKeys={[vehicleData.usage]}
                onSelectionChange={(keys) =>
                  setVehicleData({
                    ...vehicleData,
                    usage: Array.from(keys)[0] || "brand-new",
                  })
                }
              >
                <SelectItem key="brand-new" value="brand-new">Brand New</SelectItem>
                <SelectItem key="used" value="used">Foreign Used</SelectItem>
              </Select>
            </div>

            {/* Price/Budget Inputs with Commas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Min Budget (₦ NGN)"
                placeholder="e.g. 20,000,000"
                value={vehicleData.budgetMin}
                onChange={handleBudgetMinChange}
              />
              <Input
                label="Max Budget (₦ NGN)"
                placeholder="e.g. 35,000,000"
                value={vehicleData.budgetMax}
                onChange={handleBudgetMaxChange}
              />
            </div>

            <Textarea
              label="Preferences, Color & Trim Details"
              placeholder="Describe exterior color, leather seats, sunroof, transmission, or specific packages..."
              value={vehicleData.details}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, details: e.target.value })
              }
              rows={4}
            />
          </>
        )}
      </div>

      {/* Step 1 Pinned Bottom Footer Bar */}
      <div className="p-4 sm:p-5 border-t border-light dark:border-white/10 bg-white dark:bg-slate-900 shrink-0 flex items-center justify-end gap-3">
        <Button
          variant="bordered"
          radius="full"
          onPress={onCancel}
          className="border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 font-medium px-6 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          radius="full"
          type="submit"
          className="px-8 font-semibold text-white cursor-pointer flex items-center gap-2 shadow-xs"
        >
          <span>Continue</span>
        </Button>
      </div>
    </form>
  );
};

export default RequestVehicleForm;
