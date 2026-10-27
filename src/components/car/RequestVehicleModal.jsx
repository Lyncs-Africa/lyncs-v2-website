"use client";

import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useCarStore } from "../../store/carStore.js";
import { toInternationalFormat } from "../../lib/utils.js";
import { submitCarRequest, submitCarSwap } from "../../lib/api/cars.js";
import RequestVehicleForm from "./request/RequestVehicleForm.jsx";
import RequestVehicleContactModal from "./request/RequestVehicleContactModal.jsx";
import RequestVehicleSuccess from "./request/RequestVehicleSuccess.jsx";

const RequestVehicleModal = ({ onClose }) => {
  const { swapTargetCar, requestMode } = useCarStore();
  const initialMode = swapTargetCar ? "swap" : requestMode || "bespoke";
  const [activeTab] = useState(initialMode); // "bespoke" | "swap"

  // Step 1: Vehicle Data
  const [vehicleData, setVehicleData] = useState({
    // Bespoke
    make: "",
    model: "",
    type: "petrol",
    usage: "brand-new",
    budgetMin: "",
    budgetMax: "",
    details: "",

    // Current car for swap
    currentMake: "",
    currentModel: "",
    currentFuelType: "petrol",
    currentCondition: "used",
    currentMileageKm: "",
    currentIssues: "",
  });

  // Step 2: Contact Data (collected in RequestVehicleContactModal)
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    isSameAsPhone: true,
  });

  const [contactErrors, setContactErrors] = useState({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const isSwap = activeTab === "swap";

  // Step 1 validation: Proceed to Step 2 (SmallerModal for contact details)
  const handleProceedToContact = (e) => {
    e.preventDefault();

    const makeVal = isSwap ? vehicleData.currentMake.trim() : vehicleData.make.trim();
    const modelVal = isSwap ? vehicleData.currentModel.trim() : vehicleData.model.trim();

    if (!makeVal || !modelVal) {
      toast.error("Please provide both make and model.");
      return;
    }

    const parsedMin = vehicleData.budgetMin
      ? Number(vehicleData.budgetMin.replace(/[^0-9]/g, ""))
      : undefined;
    const parsedMax = vehicleData.budgetMax
      ? Number(vehicleData.budgetMax.replace(/[^0-9]/g, ""))
      : undefined;

    if (parsedMin !== undefined && parsedMax !== undefined && parsedMin > parsedMax) {
      toast.error("Minimum budget cannot exceed maximum budget.");
      return;
    }

    setIsContactModalOpen(true);
  };

  const validateContact = () => {
    const errs = {};
    if (!contactData.firstName.trim()) errs.firstName = "First name is required";
    if (!contactData.lastName.trim()) errs.lastName = "Last name is required";
    if (!contactData.email.trim() || !contactData.email.includes("@")) {
      errs.email = "Valid email address is required";
    }
    if (!contactData.phone.trim() || contactData.phone.length < 8) {
      errs.phone = "Valid phone number is required";
    }
    if (!contactData.isSameAsPhone && (!contactData.whatsapp.trim() || contactData.whatsapp.length < 8)) {
      errs.whatsapp = "Valid WhatsApp number is required";
    }
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Final submission of both Vehicle Data + Contact Data
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!validateContact()) return;

    setIsSubmitting(true);
    const resolvedPhone = toInternationalFormat(contactData.phone);
    const resolvedWhatsapp = toInternationalFormat(
      contactData.isSameAsPhone ? contactData.phone : contactData.whatsapp || contactData.phone
    );
    const fullName = `${contactData.firstName.trim()} ${contactData.lastName.trim()}`.trim();

    const parsedMin = vehicleData.budgetMin
      ? Number(vehicleData.budgetMin.replace(/[^0-9]/g, ""))
      : undefined;
    const parsedMax = vehicleData.budgetMax
      ? Number(vehicleData.budgetMax.replace(/[^0-9]/g, ""))
      : undefined;

    try {
      if (isSwap) {
        const payload = {
          targetCarId: swapTargetCar?.id || swapTargetCar?.productId || undefined,
          targetCar: swapTargetCar
            ? {
                id: swapTargetCar.id || swapTargetCar.productId,
                name: swapTargetCar.name,
                price: swapTargetCar.price,
                image: swapTargetCar.image,
                platform: swapTargetCar.platform,
              }
            : undefined,
          currentCar: {
            make: vehicleData.currentMake.trim(),
            model: vehicleData.currentModel.trim(),
            fuelType: vehicleData.currentFuelType || "petrol",
            condition: vehicleData.currentCondition || "used",
            mileageKm: vehicleData.currentMileageKm
              ? Number(vehicleData.currentMileageKm.replace(/[^0-9]/g, ""))
              : undefined,
            issuesOrFaults: vehicleData.currentIssues.trim() || undefined,
          },
          contact: {
            name: fullName,
            email: contactData.email.trim(),
            phone: resolvedPhone,
            whatsapp: resolvedWhatsapp,
          },
        };

        const res = await submitCarSwap(payload);
        const refId = res?.data?.swapId || res?.data?.requestId || res?.data?.id;

        setIsContactModalOpen(false);
        setSubmissionSuccess({
          type: "swap",
          reference: refId,
          message:
            res?.message ||
            "Swap application submitted successfully. Our inspection team will WhatsApp you shortly to schedule vehicle inspection.",
          summary: `${vehicleData.currentMake} ${vehicleData.currentModel}`,
          contact: fullName,
        });
        toast.success("Trade-in application submitted successfully!");
      } else {
        const payload = {
          make: vehicleData.make.trim(),
          model: vehicleData.model.trim(),
          type: vehicleData.type || "petrol",
          usage: vehicleData.usage || "brand-new",
          budgetMin: parsedMin,
          budgetMax: parsedMax,
          details: vehicleData.details.trim() || undefined,
          contact: {
            name: fullName,
            email: contactData.email.trim(),
            phone: resolvedPhone,
            whatsapp: resolvedWhatsapp,
          },
        };

        const res = await submitCarRequest(payload);
        const refId = res?.data?.trackingId || res?.data?.requestId || res?.data?.id;

        setIsContactModalOpen(false);
        setSubmissionSuccess({
          type: "bespoke",
          reference: refId,
          message:
            res?.message ||
            "Vehicle request submitted successfully. A procurement specialist will contact you within 24 hours.",
          summary: `${vehicleData.make} ${vehicleData.model}`,
          contact: fullName,
        });
        toast.success("Vehicle sourcing request submitted successfully!");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message || "Submission failed. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-full flex flex-col justify-between bg-white dark:bg-slate-900 overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Header */}
      {!submissionSuccess && (
        <div className="flex items-center justify-between p-5 border-b border-light dark:border-white/10 bg-eminence dark:bg-slate-800/60 shrink-0">
          <div>
            <h2 className="text-18px font-bold text-slate-900 dark:text-white">
              {isSwap ? "Vehicle Trade-in & Swap Application" : "Request a Specific Vehicle"}
            </h2>
            <p className="text-12px text-slate-500 dark:text-slate-400 mt-0.5">
              {isSwap
                ? swapTargetCar
                  ? `Swap your current car towards the ${swapTargetCar.name}`
                  : "Submit details of your vehicle for inspection and trade-in valuation."
                : "Tell us the car you want and we will procure and import it for you."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <IoIosCloseCircleOutline size={28} />
          </button>
        </div>
      )}

      {/* Main Content: Success View OR Vehicle Form */}
      {submissionSuccess ? (
        <RequestVehicleSuccess
          submissionSuccess={submissionSuccess}
          onClose={onClose}
        />
      ) : (
        <RequestVehicleForm
          isSwap={isSwap}
          swapTargetCar={swapTargetCar}
          vehicleData={vehicleData}
          setVehicleData={setVehicleData}
          onProceed={handleProceedToContact}
          onCancel={onClose}
        />
      )}

      {/* Step 2: Contact Details Modal */}
      <RequestVehicleContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactData={contactData}
        setContactData={setContactData}
        contactErrors={contactErrors}
        isSubmitting={isSubmitting}
        onSubmit={handleFinalSubmit}
      />
    </div>
  );
};

export default RequestVehicleModal;
