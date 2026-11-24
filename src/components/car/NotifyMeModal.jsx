"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoCheckmarkCircleOutline, IoNotificationsOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { submitCarRequest } from "../../lib/api/cars.js";
import { Button, Input, Select, SelectItem } from "../ui/HeroUI.jsx";
import cn from "classnames";

/**
 * @param {{
 *   isOpen: boolean;
 *   onClose: () => void;
 *   onResetFilters?: () => void;
 *   initialVehicle?: string;
 *   initialUsage?: "brand-new" | "used";
 *   initialFuelType?: string;
 * }} props
 */
export default function NotifyMeModal({
  isOpen,
  onClose,
  onResetFilters,
  initialVehicle = "",
  initialUsage = "brand-new",
  initialFuelType = "petrol",
}) {
  const [vehicleName, setVehicleName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usage, setUsage] = useState(initialUsage);
  const [fuelType, setFuelType] = useState(initialFuelType);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceCode, setReferenceCode] = useState(null);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setVehicleName(initialVehicle.trim());
    setName("");
    setEmail("");
    setPhone("");
    setUsage(initialUsage === "used" ? "used" : "brand-new");
    setFuelType(["petrol", "electric", "hybrid"].includes(initialFuelType) ? initialFuelType : "petrol");
    setNotes("");
    setIsSuccess(false);
    setError(null);
    setReferenceCode(null);
  };

  const handleDone = () => {
    resetForm();
    if (onResetFilters) {
      onResetFilters();
    }
    onClose();
  };

  // Sync initial props when opened
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, initialVehicle, initialUsage, initialFuelType]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const trimmedVehicle = vehicleName.trim();
    if (!trimmedVehicle) {
      setError("Please specify the vehicle make and model you are looking for.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    const cleanPhoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim() || cleanPhoneDigits.length < 7) {
      setError("Please enter a valid phone or WhatsApp number.");
      return;
    }

    setIsSubmitting(true);

    // Split vehicle name into make and model (e.g. "Toyota Camry" -> make: "Toyota", model: "Camry")
    const parts = trimmedVehicle.split(/\s+/);
    const make = parts[0] || "Custom";
    const model = parts.slice(1).join(" ") || parts[0];

    try {
      const res = await submitCarRequest({
        make,
        model,
        type: fuelType,
        usage,
        details: `Notify Me request submitted from catalog search. Wanted: "${trimmedVehicle}". Powertrain: ${fuelType}. Condition: ${usage}.${notes.trim() ? ` Customer notes: "${notes.trim()}".` : ""
          }`,
        contact: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          whatsapp: phone.trim(),
        },
      });

      const ref = res?.data?.referenceCode || res?.data?.id || res?.referenceCode || null;
      setReferenceCode(ref);
      setIsSuccess(true);
      toast.success("Notification request received! We will alert you when a match is found.");
    } catch (err) {
      console.error("Notify Me request submission error:", err);
      setError(
        err?.message ||
        "Failed to submit notification request. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => !isSubmitting && onClose()}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-slate-900 dark:text-white"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => !isSubmitting && onClose()}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close"
            >
              <IoClose size={22} />
            </button>

            {isSuccess ? (
              /* Success View */
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <IoCheckmarkCircleOutline size={38} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">You&apos;re on the notification list!</h3>
                  <p className="text-14px text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    We&apos;ll notify you via email or WhatsApp as soon as{" "}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {vehicleName || "your requested vehicle"}
                    </span>{" "}
                    or similar matches become available.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    size="md"
                    color="primary"
                    radius="full"
                    onPress={handleDone}
                    className="w-full text-white cursor-pointer"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              /* Form View */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent flex items-center justify-center shrink-0">
                    <IoNotificationsOutline size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Notify Me When Available</h2>
                    <p className="text-12px text-slate-500 dark:text-slate-400">
                      Can&apos;t find your desired vehicle? We&apos;ll alert you the moment it arrives.
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 rounded-xl text-13px text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}

                {/* Wanted Vehicle Input */}
                <div className="space-y-1">
                  <label className="text-12px font-semibold text-slate-700 dark:text-slate-300">
                    Vehicle Make & Model <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    placeholder="e.g. Toyota Camry, BYD Seal, Tesla Model Y"
                    className="w-full"
                    required
                  />
                </div>

                {/* Condition & Powertrain Dropdowns */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-12px font-semibold text-slate-700 dark:text-slate-300">
                      Condition
                    </label>
                    <Select
                      placeholder="Select condition"
                      selectedKeys={[usage]}
                      onSelectionChange={(keys) => setUsage(Array.from(keys)[0] || "brand-new")}
                      size="md"
                      aria-label="Condition"
                    >
                      <SelectItem key="brand-new" value="brand-new">
                        New
                      </SelectItem>
                      <SelectItem key="used" value="used">
                        Used
                      </SelectItem>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-12px font-semibold text-slate-700 dark:text-slate-300">
                      Powertrain
                    </label>
                    <Select
                      placeholder="Select powertrain"
                      selectedKeys={[fuelType]}
                      onSelectionChange={(keys) => setFuelType(Array.from(keys)[0] || "petrol")}
                      size="md"
                      aria-label="Powertrain"
                    >
                      <SelectItem key="petrol" value="petrol">
                        Petrol
                      </SelectItem>
                      <SelectItem key="electric" value="electric">
                        EV
                      </SelectItem>
                      <SelectItem key="hybrid" value="hybrid">
                        Hybrid
                      </SelectItem>
                    </Select>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-12px font-semibold text-slate-700 dark:text-slate-300">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full"
                    required
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-12px font-semibold text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-12px font-semibold text-slate-700 dark:text-slate-300">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                {/* Optional Note */}
                <div className="space-y-1">
                  <label className="text-12px font-semibold text-slate-700 dark:text-slate-300">
                    Additional Preferences <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Preferred year (2022+), trim level, exterior color, budget..."
                    className="w-full px-3 py-2 text-13px bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20 focus:border-primary dark:focus:border-accent"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="flat"
                    radius="full"
                    size="md"
                    onPress={onClose}
                    disabled={isSubmitting}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    radius="full"
                    size="md"
                    isLoading={isSubmitting}
                    className="text-white cursor-pointer px-6"
                  >
                    {isSubmitting ? "Submitting..." : "Notify Me"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
