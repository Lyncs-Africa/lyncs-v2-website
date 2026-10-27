"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input } from "../ui/HeroUI.jsx";
import { FaCar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { toast } from "react-toastify";
import cn from "classnames";
import { useCarStore } from "../../store/carStore.js";
import { numberWithCommas, toInternationalFormat } from "../../lib/utils.js";
import {
  computeInstallmentBreakdown,
  getDeliveryFeeInfo,
} from "../../lib/carPurchase.js";
import { createCarPurchase, fetchCarDetail } from "../../lib/api/cars.js";
import PurchasePaymentModeModal from "./purchase/PurchasePaymentModeModal.jsx";
import PurchaseInstallmentTermModal from "./purchase/PurchaseInstallmentTermModal.jsx";
import PurchaseDeliveryModal from "./purchase/PurchaseDeliveryModal.jsx";
import SmallerModal from "./shared/SmallerModal.jsx";

const FUEL_TYPE_LABEL = {
  petrol: "Petrol",
  electric: "BEV",
  hybrid: "PHEV",
};

const TRANSMISSIONS = ["Automatic", "Manual", "CVT"];
const DRIVETRAINS = ["FWD", "RWD", "AWD"];
const COLORS = [
  "Pearl White",
  "Jet Black",
  "Silver Metallic",
  "Deep Blue",
  "Graphite Grey",
  "Crimson Red",
];
const SEATS = [5, 7];

function seedFromId(id) {
  let seed = 0;
  for (let i = 0; i < (id || "").length; i++) seed += id.charCodeAt(i);
  return seed;
}

function pick(options, seed, offset = 0) {
  return options[(seed + offset) % options.length];
}

// Derive stable, plausible placeholder values from the car's id/type
function getPlaceholderSpecs(car) {
  const seed = seedFromId(car.id || car.name || "");

  const engine =
    car.type === "electric"
      ? `${50 + (seed % 6) * 10}kWh electric motor`
      : car.type === "hybrid"
        ? `${(1.5 + (seed % 3) * 0.3).toFixed(1)}L hybrid engine`
        : `${(1.4 + (seed % 5) * 0.4).toFixed(1)}L ${pick(["Inline-4", "V6"], seed)} petrol engine`;

  const range =
    car.type === "electric"
      ? `${320 + (seed % 6) * 20} km range (est.)`
      : `${(10 + (seed % 8)).toFixed(1)} km/l combined (est.)`;

  return {
    transmission: pick(TRANSMISSIONS, seed),
    engine,
    drivetrain: pick(DRIVETRAINS, seed, 3),
    seats: pick(SEATS, seed, 5),
    color: pick(COLORS, seed, 7),
    range,
  };
}

function getVehicleSpecs(car, apiCar) {
  const placeholder = getPlaceholderSpecs(car);
  if (!apiCar) return placeholder;

  const rawTrans = apiCar.transmission || "";
  let transmission = placeholder.transmission;
  if (rawTrans) {
    if (rawTrans.toUpperCase() === "MT") transmission = "Manual (MT)";
    else if (rawTrans.toUpperCase() === "AT") transmission = "Automatic (AT)";
    else if (rawTrans.toUpperCase() === "AMT") transmission = "Automated Manual (AMT)";
    else if (rawTrans.toUpperCase() === "CVT") transmission = "CVT";
    else transmission = rawTrans;
  }

  const engine =
    (apiCar.displacement && apiCar.horsepower
      ? `${apiCar.displacement} (${apiCar.horsepower} hp)`
      : apiCar.displacement || apiCar.engine || (apiCar.horsepower ? `${apiCar.horsepower} hp` : null)) ||
    placeholder.engine;

  const drivetrain = apiCar.driveType || apiCar.drivetrain || placeholder.drivetrain;
  const seats = apiCar.seats ? `${apiCar.seats} seats` : placeholder.seats;
  const color = apiCar.color || placeholder.color;
  const range =
    (apiCar.rangeKm && `${apiCar.rangeKm} km`) ||
    (apiCar.evRange && `${apiCar.evRange} km`) ||
    (apiCar.totalRange && `${apiCar.totalRange} km`) ||
    placeholder.range;

  return {
    transmission,
    engine,
    drivetrain,
    seats,
    color,
    range,
    dimensions: apiCar.dimensions
      ? `${apiCar.dimensions.lengthMm} × ${apiCar.dimensions.widthMm} × ${apiCar.dimensions.heightMm} mm`
      : null,
    condition: apiCar.condition || null,
  };
}

function getFulfillmentTimeline(car) {
  const isUsed = car?.usage === "used" || car?.condition === "USED";
  return {
    waitDays: isUsed ? 21 : 45,
    label: isUsed ? "2 - 3 weeks" : "6 - 8 weeks",
  };
}

const Spec = ({ label, value }) => (
  <div>
    <p className="text-12px text-slate-400 dark:text-slate-500">{label}</p>
    <p className="text-14px text-slate-800 dark:text-slate-200 font-medium">{value}</p>
  </div>
);

const PurchaseHeader = ({ title, onClose }) => (
  <div className="flex items-center gap-2 justify-center rounded-[24px] bg-eminence dark:bg-slate-800/60 border border-light dark:border-white/10 text-center md:p-6 p-4 relative">
    <button
      onClick={onClose}
      style={{ marginBottom: "0px" }}
      className="x text-black dark:text-white md:top-5 md:left-4 absolute left-4 cursor-pointer"
      type="button"
      aria-label="Close"
    >
      <IoIosCloseCircleOutline className="text-black dark:text-white" size="30px" />
    </button>
    <div className="space-y-2">
      <p className="md:text-32px text-24px leading-[21.24px] font-[500] text-black dark:text-white">
        {title}
      </p>
    </div>
  </div>
);

const PurchaseFooter = ({ children }) => (
  <div className="bg-white dark:bg-slate-900 fixed w-full bottom-0 left-0 z-20 md:rounded-bl-[24px] border-t border-slate-200 dark:border-white/10">
    <div className="min-h-[100px] md:p-4 p-3 flex items-center justify-center gap-4">
      {children}
    </div>
  </div>
);

const QuoteSummaryStep = ({
  car,
  paymentMode,
  months,
  installmentBreakdown,
  deliveryFeeCharged,
  contactInfo,
}) => {
  return (
    <div className="space-y-6">
      {/* Vehicle Summary Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-light dark:border-white/10 p-4 md:p-5 space-y-3">
        <p className="text-18px text-black dark:text-white font-semibold">Vehicle Details</p>
        <div className="flex items-center gap-4">
          <div className="w-20 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border border-light dark:border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
            {car.image ? (
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            ) : (
              <FaCar className="text-slate-400 text-2xl" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-16px text-black dark:text-white truncate">{car.name}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-12px text-slate-500 dark:text-slate-400">
                {car.make} • {car.year} • {car.mileage}
              </span>
              <span className="text-12px font-medium text-primary dark:text-accent bg-primary/10 dark:bg-accent/15 px-2.5 py-0.5 rounded-full capitalize">
                {car.usage === "brand-new" ? "Brand New" : "Foreign Used"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-12px text-slate-400 dark:text-slate-500 font-medium">Vehicle Price</p>
            <p className="text-18px font-bold text-black dark:text-white mt-0.5">
              ₦{numberWithCommas(car.price || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Quote Terms & Financing Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-light dark:border-white/10 p-4 md:p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-light dark:border-white/10">
          <p className="text-18px text-black dark:text-white font-semibold">Payment & Financing Terms</p>
          <span className="text-12px font-semibold text-primary dark:text-accent bg-primary/10 dark:bg-accent/15 px-3 py-1 rounded-full">
            {paymentMode === "installment"
              ? `Installment Plan (${months} Months)`
              : "Pay at once (Outright)"}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
            <span className="text-slate-600 dark:text-slate-300">Estimated Price</span>
            <span className="font-semibold text-black dark:text-white">₦{numberWithCommas(car.price || 0)}</span>
          </div>

          {paymentMode === "installment" && installmentBreakdown && (
            <>
              <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
                <span className="text-slate-600 dark:text-slate-300">Estimated Down Payment (30%)</span>
                <span className="font-semibold text-primary dark:text-accent">
                  ₦{numberWithCommas(installmentBreakdown.downPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
                <span className="text-slate-600 dark:text-slate-300">Repayment Duration</span>
                <span className="font-semibold text-black dark:text-white">{installmentBreakdown.months} Months</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
                <span className="text-slate-600 dark:text-slate-300">Estimated Financed Balance</span>
                <span className="font-semibold text-black dark:text-white">
                  ₦{numberWithCommas(installmentBreakdown.financedAmount)}
                </span>
              </div>
            </>
          )}

          {deliveryFeeCharged > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
              <span className="text-slate-600 dark:text-slate-300">Port-to-Door Delivery Fee</span>
              <span className="font-semibold text-black dark:text-white">₦{numberWithCommas(deliveryFeeCharged)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-light dark:border-white/10 p-4 md:p-5 space-y-3">
        <p className="text-18px text-black dark:text-white font-semibold">Contact Information</p>
        <p className="text-14px text-slate-500 dark:text-slate-400">
          Our representatives will use these details to contact you with the verified quote and inspection schedule.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-eminence dark:bg-slate-800/50 border border-light dark:border-white/10 rounded-xl p-3">
            <p className="text-12px text-slate-400 dark:text-slate-500 font-medium">Contact Name</p>
            <p className="text-14px font-semibold text-black dark:text-white truncate mt-1">
              {contactInfo?.name ||
                [contactInfo?.firstName, contactInfo?.lastName].filter(Boolean).join(" ") ||
                "Not provided"}
            </p>
          </div>
          <div className="bg-eminence dark:bg-slate-800/50 border border-light dark:border-white/10 rounded-xl p-3">
            <p className="text-12px text-slate-400 dark:text-slate-500 font-medium">Email Address</p>
            <p className="text-14px font-semibold text-black dark:text-white truncate mt-1">
              {contactInfo?.email || "Not provided"}
            </p>
          </div>
          <div className="bg-eminence dark:bg-slate-800/50 border border-light dark:border-white/10 rounded-xl p-3">
            <p className="text-12px text-slate-400 dark:text-slate-500 font-medium">Phone Number</p>
            <p className="text-14px font-semibold text-black dark:text-white truncate mt-1">
              {contactInfo?.phone || "Not provided"}
            </p>
          </div>
          <div className="bg-eminence dark:bg-slate-800/50 border border-light dark:border-white/10 rounded-xl p-3">
            <p className="text-12px text-slate-400 dark:text-slate-500 font-medium">WhatsApp Contact</p>
            <p className="text-14px font-semibold text-black dark:text-white truncate mt-1">
              {contactInfo?.whatsapp || contactInfo?.phone || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Standard Lyncs Quote Notice Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 dark:border-amber-500 p-4 rounded-xl">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-amber-500 mt-0.5" />
          </div>
          <div className="ml-3">
            <p className="text-14px font-semibold text-amber-900 dark:text-amber-200">
              No Immediate Payment Required
            </p>
            <p className="text-13px text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
              You are requesting an official quote for this vehicle. No funds will be deducted from your wallet today. Our procurement and logistics team will review vehicle availability and contact you with full delivery and inspection terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressStep = ({ address, onChange }) => (
  <div className="space-y-4">
    <p className="text-15px font-medium text-slate-800 dark:text-slate-200">
      Where should we deliver your car to?
    </p>
    <div className="space-y-3">
      <Input
        label="Street address"
        placeholder="e.g. 14 Marina Road"
        value={address.line}
        onChange={(e) => onChange({ ...address, line: e.target.value })}
      />
      <Input
        label="City"
        placeholder="e.g. Lagos Island"
        value={address.city}
        onChange={(e) => onChange({ ...address, city: e.target.value })}
      />
      <Input
        label="State"
        placeholder="e.g. Lagos State"
        value={address.state}
        onChange={(e) => onChange({ ...address, state: e.target.value })}
      />
    </div>
  </div>
);

const PurchaseSuccessStep = ({ car, order, contactInfo }) => {
  const [copied, setCopied] = useState(false);
  const quoteRef = order?.reference || order?.orderNumber || order?.id;

  const handleCopy = () => {
    if (!quoteRef) return;
    navigator.clipboard.writeText(quoteRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-center py-4">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-[60px] h-[60px] rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
          <FiCheckCircle className="text-emerald-600 dark:text-emerald-400" size={32} />
        </div>
        <h2 className="text-24px font-semibold text-black dark:text-white leading-tight">
          Quote Request Submitted
        </h2>
        <p className="text-15px text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
          {order?.message ||
            "Quote request submitted successfully. Our sourcing team will contact you via WhatsApp."}
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-light dark:border-white/10 p-4 md:p-5 space-y-3 text-left">
        <p className="text-18px text-black dark:text-white font-semibold pb-2 border-b border-light dark:border-white/10">
          Request Summary
        </p>
        <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
          <span className="text-slate-600 dark:text-slate-400">Vehicle</span>
          <span className="font-semibold text-black dark:text-white truncate max-w-[65%]">{car.name}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
          <span className="text-slate-600 dark:text-slate-400">Payment Option</span>
          <span className="font-semibold text-black dark:text-white">
            {order?.paymentMode === "installment"
              ? `Installment (${order?.installmentMonths || order?.installment?.months || "12"} Months)`
              : "Pay at once (Outright)"}
          </span>
        </div>
        {order?.downPaymentRequired !== undefined && order?.downPaymentRequired > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
            <span className="text-slate-600 dark:text-slate-400">Estimated Down Payment</span>
            <span className="font-semibold text-primary dark:text-accent">
              ₦{numberWithCommas(order.downPaymentRequired)}
            </span>
          </div>
        )}
        {order?.monthlyInstallment !== undefined && order?.monthlyInstallment > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
            <span className="text-slate-600 dark:text-slate-400">Est. Monthly Installment</span>
            <span className="font-semibold text-primary dark:text-accent">
              ₦{numberWithCommas(order.monthlyInstallment)} / mo
            </span>
          </div>
        )}
        <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
          <span className="text-slate-600 dark:text-slate-400">Contact Phone</span>
          <span className="font-semibold text-black dark:text-white">
            {order?.contactPhone || contactInfo?.phone || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
          <span className="text-slate-600 dark:text-slate-400">WhatsApp Contact</span>
          <span className="font-semibold text-black dark:text-white">
            {order?.contactWhatsapp || contactInfo?.whatsapp || contactInfo?.phone || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-light dark:border-white/10 text-15px">
          <span className="text-slate-600 dark:text-slate-400">Contact Email</span>
          <span className="font-semibold text-black dark:text-white">
            {order?.contactEmail || contactInfo?.email || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 text-15px">
          <span className="text-slate-600 dark:text-slate-400">Expected Response Channel</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">WhatsApp Follow-up</span>
        </div>
      </div>
    </div>
  );
};

const CarDetailsModal = ({ onClose: propOnClose }) => {
  const { selectedCar, startPurchase, openRequestVehicle, closeAllModals } = useCarStore();
  const initialCar = selectedCar || {};
  const carPlatform =
    initialCar.platform ||
    initialCar.source ||
    (String(initialCar.productId || initialCar.id || "").includes("-") ? "yekauto" : "guazi");
  const carId = initialCar.productId || initialCar.id;

  const [apiCar, setApiCar] = useState(null);

  // Fetch full details directly from Guazi or Yekauto endpoint
  useEffect(() => {
    if (!carId) return;
    let active = true;
    fetchCarDetail(carId, carPlatform).then((res) => {
      if (active && res) {
        setApiCar(res);
      }
    });
    return () => {
      active = false;
    };
  }, [carId, carPlatform]);

  // Merge initial catalog card data with full single-car API response
  const car = useMemo(() => {
    if (!apiCar) return initialCar;

    const rawFuel = String(apiCar.fuelType || apiCar.fuelTypeName || initialCar.type || "").toLowerCase();
    let type = initialCar.type || "petrol";
    if (rawFuel.includes("electric") || rawFuel.includes("bev") || rawFuel === "ev") {
      type = "electric";
    } else if (rawFuel.includes("hybrid") || rawFuel.includes("phev") || rawFuel.includes("hev")) {
      type = "hybrid";
    }

    const mileageStr = apiCar.mileageKm
      ? `${numberWithCommas(apiCar.mileageKm)} km`
      : (apiCar.mileage || initialCar.mileage);

    return {
      ...initialCar,
      ...apiCar,
      id: apiCar.productId || apiCar.id || initialCar.id,
      productId: apiCar.productId || initialCar.productId || apiCar.id || initialCar.id,
      name: apiCar.title || apiCar.name || initialCar.name,
      make: apiCar.brandName || apiCar.make || initialCar.make,
      year: apiCar.year || (apiCar.mfgDate ? parseInt(apiCar.mfgDate, 10) : initialCar.year),
      mileage: mileageStr,
      type,
      price: Number(apiCar.priceNgn ?? initialCar.price ?? 0),
      originalPrice: apiCar.linePriceNgn || initialCar.originalPrice,
      platform: carPlatform,
      source: carPlatform,
      usage: initialCar.usage || (apiCar.condition === "NEW" ? "brand-new" : "used"),
      labels: apiCar.labels || initialCar.labels || [],
      description: apiCar.description || initialCar.description || null,
      images: apiCar.images || initialCar.images || [],
    };
  }, [initialCar, apiCar, carPlatform]);

  const isBrandNew = car.usage === "brand-new";
  const isReadOnly = Boolean(car?.readOnly);
  const specs = useMemo(() => getVehicleSpecs(car, apiCar), [car, apiCar]);

  // Extract all high-res photos from images array or headImage
  const images = useMemo(() => {
    if (Array.isArray(car.images) && car.images.length > 0) {
      const extracted = car.images
        .map((img) => (typeof img === "string" ? img : img?.url))
        .filter(Boolean);
      if (extracted.length > 0) return extracted;
    }
    if (car.headImage) return [car.headImage];
    if (car.image) return [car.image];
    return [];
  }, [car]);

  const [activeImage, setActiveImage] = useState(0);
  const carouselRef = useRef(null);

  const [purchaseStep, setPurchaseStep] = useState(startPurchase ? "payment-mode" : null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [months, setMonths] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(null);

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    name: "",
    recipientName: "",
    email: "",
    phone: "",
    whatsapp: "",
    isSameAsPhone: true,
  });
  const [address, setAddress] = useState({ line: "", city: "", state: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  // Reset to first image whenever a different car is shown
  useEffect(() => {
    setActiveImage(0);
    carouselRef.current?.scrollTo({ left: 0 });
    setPurchaseStep(startPurchase ? "payment-mode" : null);
    setPaymentMode(null);
    setMonths(null);
    setDeliveryMethod(null);
  }, [carId, startPurchase]);

  const handleClose = () => {
    setPurchaseStep(null);
    if (propOnClose) propOnClose();
    else closeAllModals();
  };

  const goToImage = (index) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    carouselRef.current.scrollTo({ left: index * width, behavior: "smooth" });
  };

  const deliveryFeeInfo = getDeliveryFeeInfo(car.price || 0);
  const installmentBreakdown =
    paymentMode === "installment" && months
      ? computeInstallmentBreakdown(car.price || 0, months)
      : null;
  const deliveryFeeCharged =
    deliveryFeeInfo.qualifiesForFreeDrive || deliveryMethod === "delivery"
      ? deliveryFeeInfo.fee
      : 0;
  const amountDueNow =
    (paymentMode === "outright" ? car.price || 0 : installmentBreakdown?.downPayment || 0) +
    deliveryFeeCharged;

  const goBack = () => {
    if (purchaseStep === "payment-mode") setPurchaseStep(null);
    else if (purchaseStep === "installment-term") setPurchaseStep("payment-mode");
    else if (purchaseStep === "delivery")
      setPurchaseStep(paymentMode === "installment" ? "installment-term" : "payment-mode");
    else if (purchaseStep === "review-pay")
      setPurchaseStep(paymentMode === "installment" ? "installment-term" : "delivery");
    else if (purchaseStep === "address") setPurchaseStep("review-pay");
  };

  const handleSelectPaymentMode = (mode) => {
    setPaymentMode(mode);
    setMonths(mode === "installment" ? 3 : null);
  };

  const handleContinueFromPaymentMode = () => {
    if (!paymentMode) return;
    setPurchaseStep(paymentMode === "installment" ? "installment-term" : "delivery");
  };

  const handleContinueFromInstallmentTerm = async (incomingContact) => {
    if (!months) return;
    if (incomingContact) {
      setContactInfo((prev) => ({ ...prev, ...incomingContact }));
    }
    const res = await finalizeOrder(null, incomingContact);
    if (res) {
      setPurchaseStep("success");
    }
  };

  const handleSelectDelivery = (method) => setDeliveryMethod(method);

  const handleContinueFromDelivery = async (incomingContact) => {
    const method = deliveryFeeInfo.qualifiesForFreeDrive ? "delivery" : deliveryMethod;
    if (!method) return;
    setDeliveryMethod(method);
    const activeContact = incomingContact || contactInfo;
    if (incomingContact) {
      setContactInfo((prev) => ({ ...prev, ...incomingContact }));
    }
    const res = await finalizeOrder(address?.line ? address : null, activeContact);
    if (res) {
      setPurchaseStep("success");
    }
  };

  const finalizeOrder = async (deliveryAddressObj, contactOverride) => {
    setIsSubmitting(true);
    const activeContact = contactOverride || contactInfo;
    const fullAddress = deliveryAddressObj
      ? typeof deliveryAddressObj === "string"
        ? deliveryAddressObj
        : [deliveryAddressObj.line, deliveryAddressObj.city, deliveryAddressObj.state]
          .filter(Boolean)
          .join(", ")
      : null;

    const resolvedFirstName = activeContact?.firstName || "";
    const resolvedLastName = activeContact?.lastName || "";
    const resolvedFullName =
      activeContact?.name ||
      [resolvedFirstName, resolvedLastName].filter(Boolean).join(" ").trim();
    const resolvedPhone = toInternationalFormat(activeContact?.phone || "");
    const resolvedWhatsapp = toInternationalFormat(
      activeContact?.whatsapp || activeContact?.phone || ""
    );
    const resolvedEmail = activeContact?.email || "";

    if (!resolvedPhone) {
      toast.error("Phone number must use E.164 format, for example +2348012345678");
      setIsSubmitting(false);
      return null;
    }
    if (!resolvedWhatsapp) {
      toast.error("WhatsApp number must use E.164 format, for example +2348012345678");
      setIsSubmitting(false);
      return null;
    }

    const payload = {
      car: {
        id: car.id || car.productId,
        name: car.name,
        make: car.make || "",
        model: car.model || "",
        year: car.year || 2024,
        image: car.image,
        usage: car.usage || "used",
        origin: car.origin || "Direct Import (China)",
        price: car.price,
        platform: carPlatform,
      },
      carId: car.id || car.productId,
      carName: car.name,
      carPrice: car.price,
      carImage: car.image,
      paymentMode,
      installmentMonths: paymentMode === "installment" ? months : undefined,
      deliveryMethod: deliveryMethod || "pickup",
      deliveryAddress: deliveryAddressObj || fullAddress,
      paymentSource: "quote",

      name: resolvedFullName,
      fullName: resolvedFullName,
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      recipientName: resolvedFullName,
      phone: resolvedPhone,
      whatsapp: resolvedWhatsapp,
      email: resolvedEmail,
      contactPhone: resolvedPhone,
      contactWhatsapp: resolvedWhatsapp,
      contactEmail: resolvedEmail,

      contact: {
        name: resolvedFullName,
        fullName: resolvedFullName,
        firstName: resolvedFirstName,
        lastName: resolvedLastName,
        email: resolvedEmail,
        phone: resolvedPhone,
        whatsapp: resolvedWhatsapp,
        isSameAsPhone: Boolean(contactInfo?.isSameAsPhone),
      },
    };

    let createdOrder = null;
    try {
      const res = await createCarPurchase(payload);
      const d = res?.data || res;
      if (d) {
        createdOrder = {
          id: d.id || d.orderId || `car-purchase-${Date.now()}`,
          orderNumber: d.orderNumber || d.reference || null,
          reference: d.reference || d.orderNumber || null,
          message: res?.message || "Quote request submitted successfully. Our sourcing team will contact you via WhatsApp.",
          car: {
            id: d.car?.id || car.id,
            name: d.car?.name || car.name,
            image: d.car?.image || car.image,
            usage: d.car?.usage || car.usage,
            price: d.car?.price || car.price,
          },
          paymentMode: d.paymentMode || paymentMode,
          installmentMonths: d.installmentMonths || months,
          downPaymentRequired: d.downPaymentRequired,
          monthlyInstallment: d.monthlyInstallment,
          installment: installmentBreakdown,
          deliveryMethod: d.deliveryMethod || deliveryMethod,
          deliveryFee: deliveryFeeCharged,
          amountPaidNow: amountDueNow,
          deliveryAddress: fullAddress || null,
          contactPhone: resolvedPhone,
          contactWhatsapp: resolvedWhatsapp,
          contactEmail: resolvedEmail,
          status: "processing",
          createdAt: d.createdAt || new Date().toISOString(),
          expectedDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }
    } catch (err) {
      console.error("Quote creation failed:", err);
      toast.error(err.message || "Failed to submit quote request. Please try again.");
      setIsSubmitting(false);
      return null;
    }

    if (!createdOrder) {
      setIsSubmitting(false);
      return null;
    }

    setOrder(createdOrder);
    setIsSubmitting(false);
    return createdOrder;
  };

  const handleRequestQuote = async () => {
    const res = await finalizeOrder(address?.line ? address : null);
    if (res) {
      setPurchaseStep("success");
    }
  };

  const handleSubmitAddress = async () => {
    const res = await finalizeOrder(address);
    if (res) {
      setPurchaseStep("success");
    }
  };

  const handlePurchase = () => setPurchaseStep("payment-mode");

  const handleSwap = () => {
    openRequestVehicle(car);
  };

  const isFullStepView =
    purchaseStep === "address" ||
    purchaseStep === "success";

  // When address or success step is active, render inside the full drawer
  if (isFullStepView) {
    const stepTitles = {
      address: "Delivery Address",
      success: "Confirmation",
    };

    return (
      <div className="relative h-full overflow-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="w-full md:p-6 p-4 space-y-6 mb-[6rem]">
          <PurchaseHeader title={stepTitles[purchaseStep]} onClose={handleClose} />

          {purchaseStep === "address" && <AddressStep address={address} onChange={setAddress} />}

          {purchaseStep === "success" && (
            <PurchaseSuccessStep
              car={car}
              order={order}
              contactInfo={contactInfo}
              onDone={handleClose}
            />
          )}
        </div>

        {(purchaseStep === "address" || purchaseStep === "success") && (
            <PurchaseFooter>
              {purchaseStep === "success" ? (
                <Button
                  onPress={handleClose}
                  className="uppercase text-white font-[500] px-12 min-w-[200px]"
                  size="md"
                  color="primary"
                  radius="full"
                >
                  Done
                </Button>
              ) : (
                <>
                  <Button
                    onPress={goBack}
                    className="uppercase px-8 font-[500] text-red-600 dark:text-red-400 border-red-300 dark:border-red-500/40"
                    size="md"
                    variant="bordered"
                    radius="full"
                  >
                    Back
                  </Button>
                  {purchaseStep === "review-pay" && (
                    <Button
                      onPress={handleRequestQuote}
                      isDisabled={isSubmitting}
                      className="disabled:opacity-50 disabled:pointer-events-none uppercase text-white font-[500] px-10 shadow-xs cursor-pointer"
                      size="md"
                      color="primary"
                      radius="full"
                      isLoading={isSubmitting}
                    >
                      Request a quote
                    </Button>
                  )}
                  {purchaseStep === "address" && (
                    <Button
                      onPress={handleSubmitAddress}
                      isDisabled={isSubmitting}
                      className="disabled:opacity-50 disabled:pointer-events-none uppercase text-white font-[500] min-w-[140px] shadow-xs cursor-pointer"
                      size="md"
                      color="primary"
                      radius="full"
                      isLoading={isSubmitting}
                    >
                      Confirm
                    </Button>
                  )}
                </>
              )}
            </PurchaseFooter>
          )}
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mb-[6rem]">
        {/* Main Image Carousel */}
        <div className="relative h-72 bg-slate-100 dark:bg-slate-800">
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <IoIosCloseCircleOutline size={26} />
          </button>

          {images.length > 0 ? (
            <>
              {images.length > 1 && activeImage > 0 && (
                <button
                  type="button"
                  onClick={() => goToImage(activeImage - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 cursor-pointer transition-colors"
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={16} />
                </button>
              )}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar"
                onScroll={(e) => {
                  const { scrollLeft, offsetWidth } = e.currentTarget;
                  setActiveImage(Math.round(scrollLeft / offsetWidth));
                }}
              >
                {images.map((src, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 snap-center">
                    <img
                      src={src}
                      alt={`${car.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {images.length > 1 && activeImage < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => goToImage(activeImage + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 cursor-pointer transition-colors"
                  aria-label="Next image"
                >
                  <FaChevronRight size={16} />
                </button>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-4 bg-black/60 text-white text-12px px-3 py-1 rounded-full z-10 font-medium">
                  {activeImage + 1}/{images.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaCar size={64} className="text-slate-300 dark:text-slate-600" />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-18px font-semibold text-slate-900 dark:text-white">{car.name}</p>
              <p className="text-12px text-slate-500 dark:text-slate-400 mt-1">
                {car.make} • {car.year} • {car.mileage}
              </p>
            </div>
            <span className="flex-shrink-0 text-12px font-medium px-3 py-1 rounded-full bg-eminence dark:bg-slate-800 text-primary dark:text-accent border border-light dark:border-white/10">
              {isBrandNew ? "Brand New" : "Used"}
            </span>
          </div>

          <div>
            <p className="text-12px text-slate-400 dark:text-slate-500">Estimated Price</p>
            <div className="flex items-center gap-2">
              <p className="text-18px font-semibold text-slate-800 dark:text-white">
                ₦{numberWithCommas(car.price || 0)}
              </p>
              {car.originalPrice && car.originalPrice > car.price && (
                <p className="text-12px text-slate-400 dark:text-slate-500 line-through">
                  ₦{numberWithCommas(car.originalPrice)}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-white/10 pt-4">
            <p className="text-16px font-semibold text-slate-800 dark:text-white mb-3">Specifications</p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <Spec label="Fuel type" value={FUEL_TYPE_LABEL[car.type] || car.type} />
              <Spec label="Transmission" value={specs.transmission} />
              <Spec label="Engine / Motor" value={specs.engine} />
              <Spec label="Drivetrain" value={specs.drivetrain} />
              <Spec label="Seats" value={specs.seats} />
              <Spec label="Exterior color" value={specs.color} />
              <Spec label={car.type === "electric" ? "Range" : "Fuel economy"} value={specs.range} />
              <Spec label="Mileage" value={car.mileage} />
              {specs.dimensions && <Spec label="Dimensions" value={specs.dimensions} />}
              {specs.condition && <Spec label="Condition" value={specs.condition} />}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-white/10 pt-4">
            <p className="text-16px font-semibold text-slate-800 dark:text-white mb-2">About this vehicle</p>
            <p className="text-14px text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {car.description ||
                `This ${car.year} ${car.name} is available for direct import through Lyncs Africa. It comes with a ${String(
                  specs.transmission
                ).toLowerCase()} transmission, seats ${specs.seats}, and is finished in ${String(
                  specs.color
                ).toLowerCase()}. Verified inspection and logistics documentation are processed upon order.`}
            </p>
          </div>
        </div>
      </div>

      {/* Main Bottom Footer Bar */}
      <div className="bg-white dark:bg-slate-900 fixed w-full bottom-0 left-0 z-20 md:rounded-bl-[24px] border-t border-slate-200 dark:border-white/10">
        <div className="min-h-[100px] md:p-4 p-3 flex items-center justify-center gap-4">
          {isReadOnly ? (
            <Button
              onPress={handleClose}
              className="uppercase px-8 font-[500] text-white flex-1 md:flex-none cursor-pointer"
              size="md"
              color="primary"
              radius="full"
            >
              Close
            </Button>
          ) : (
            <>
              {!isBrandNew && (
                <Button
                  onPress={handleClose}
                  className="uppercase px-8 font-[500] flex-1 md:flex-none text-red-600 dark:text-red-400 border-red-300 dark:border-red-500/40 cursor-pointer"
                  size="md"
                  variant="bordered"
                  radius="full"
                >
                  Cancel
                </Button>
              )}
              <Button
                onPress={handlePurchase}
                className="uppercase px-8 font-[500] text-white flex-1 md:flex-none shadow-xs cursor-pointer"
                size="md"
                color="primary"
                radius="full"
              >
                Purchase
              </Button>
              {isBrandNew && (
                <Button
                  onPress={handleSwap}
                  className="uppercase px-8 font-[500] flex-1 md:flex-none text-primary dark:text-white border-primary dark:border-white/20 cursor-pointer"
                  size="md"
                  variant="bordered"
                  radius="full"
                >
                  Swap
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Stepped Purchase Flow in SmallerModal */}
      <SmallerModal
        isOpen={
          purchaseStep === "payment-mode" ||
          purchaseStep === "installment-term" ||
          purchaseStep === "delivery"
        }
        onClose={() => setPurchaseStep(null)}
      >
        {purchaseStep === "payment-mode" && (
          <PurchasePaymentModeModal
            car={car}
            paymentMode={paymentMode}
            onSelectPaymentMode={handleSelectPaymentMode}
            onContinuePaymentMode={handleContinueFromPaymentMode}
            onBack={() => setPurchaseStep(null)}
          />
        )}

        {purchaseStep === "installment-term" && (
          <PurchaseInstallmentTermModal
            car={car}
            months={months}
            onChangeMonths={setMonths}
            onContinueInstallmentTerm={handleContinueFromInstallmentTerm}
            contactInfo={contactInfo}
            onChangeContactInfo={setContactInfo}
            isSubmitting={isSubmitting}
            onBack={() => setPurchaseStep("payment-mode")}
            onClose={() => setPurchaseStep(null)}
          />
        )}

        {purchaseStep === "delivery" && (
          <PurchaseDeliveryModal
            car={car}
            deliveryFeeInfo={deliveryFeeInfo}
            deliveryMethod={deliveryMethod}
            onSelectDelivery={handleSelectDelivery}
            address={address}
            onChangeAddress={setAddress}
            contactInfo={contactInfo}
            onChangeContactInfo={setContactInfo}
            onContinueDelivery={handleContinueFromDelivery}
            isSubmitting={isSubmitting}
            onBack={() =>
              setPurchaseStep(
                paymentMode === "installment" ? "installment-term" : "payment-mode"
              )
            }
          />
        )}
      </SmallerModal>
    </div>
  );
};

export default CarDetailsModal;
