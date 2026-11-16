"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "../ui/HeroUI.jsx";
import {
  FaCar,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaShieldAlt,
  FaCheckCircle,
  FaTruck,
} from "react-icons/fa";
import { IoFlash, IoClose, IoExpand, IoContract } from "react-icons/io5";
import { BsFuelPumpFill, BsSpeedometer2, BsCalendar4Event, BsGearWideConnected } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import { FiCheckCircle, FiArrowLeft, FiMapPin, FiClock } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import cn from "classnames";
import { useCarStore } from "../../store/carStore.js";
import { numberWithCommas, toInternationalFormat, titleCase } from "../../lib/utils.js";
import { getCarImageCandidates } from "../../lib/carImageUtils.js";
import {
  computeInstallmentBreakdown,
  getDeliveryFeeInfo,
} from "../../lib/carPurchase.js";
import {
  createCarPurchase,
  fetchCarDetail,
  fetchCarsCatalog,
} from "../../lib/api/cars.js";
import { WHATSAPP_NUMBER } from "../../lib/valuation/config.ts";
import PurchasePaymentModeModal from "./purchase/PurchasePaymentModeModal.jsx";
import PurchaseInstallmentTermModal from "./purchase/PurchaseInstallmentTermModal.jsx";
import PurchaseDeliveryModal from "./purchase/PurchaseDeliveryModal.jsx";
import SmallerModal from "./shared/SmallerModal.jsx";
import SwapCarModal from "./SwapCarModal.tsx";
import CarCard from "./tab-views/CarCard.jsx";

const FUEL_TYPE_LABEL = {
  petrol: "Petrol",
  electric: "Electric (BEV)",
  hybrid: "Hybrid (PHEV)",
};

const FUEL_TYPE_BADGE = {
  petrol: { icon: BsFuelPumpFill, className: "bg-slate-700 text-white", label: "Petrol" },
  electric: { icon: IoFlash, className: "bg-emerald-500 text-white", label: "BEV" },
  hybrid: { icon: FaLeaf, className: "bg-amber-500 text-white", label: "PHEV" },
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

function getPlaceholderSpecs(car) {
  const seed = seedFromId(car?.id || car?.name || "");

  const engine =
    car?.type === "electric"
      ? `${50 + (seed % 6) * 10}kWh electric motor`
      : car?.type === "hybrid"
        ? `${(1.5 + (seed % 3) * 0.3).toFixed(1)}L hybrid engine`
        : `${(1.4 + (seed % 5) * 0.4).toFixed(1)}L ${pick(["Inline-4", "V6"], seed)} petrol engine`;

  const range =
    car?.type === "electric"
      ? `${320 + (seed % 6) * 20} km range (est.)`
      : `${(10 + (seed % 8)).toFixed(1)} km/l combined (est.)`;

  return {
    transmission: pick(TRANSMISSIONS, seed),
    engine,
    drivetrain: pick(DRIVETRAINS, seed, 3),
    seats: `${pick(SEATS, seed, 5)} seats`,
    color: pick(COLORS, seed, 7),
    range,
  };
}

function getVehicleSpecs(car, apiCar) {
  const placeholder = getPlaceholderSpecs(car);
  if (!apiCar && !car) return placeholder;
  const source = apiCar || car || {};

  const rawTrans = source.transmission || "";
  let transmission = placeholder.transmission;
  if (rawTrans) {
    if (rawTrans.toUpperCase() === "MT") transmission = "Manual (MT)";
    else if (rawTrans.toUpperCase() === "AT") transmission = "Automatic (AT)";
    else if (rawTrans.toUpperCase() === "AMT") transmission = "Automated Manual (AMT)";
    else if (rawTrans.toUpperCase() === "CVT") transmission = "CVT";
    else transmission = rawTrans;
  }

  const engine =
    (source.displacement && source.horsepower
      ? `${source.displacement} (${source.horsepower} hp)`
      : source.displacement || source.engine || (source.horsepower ? `${source.horsepower} hp` : null)) ||
    placeholder.engine;

  const drivetrain = source.driveType || source.drivetrain || placeholder.drivetrain;
  const seats = source.seats
    ? String(source.seats).includes("seat")
      ? source.seats
      : `${source.seats} seats`
    : placeholder.seats;
  const color = source.color || placeholder.color;
  const range =
    (source.rangeKm && `${source.rangeKm} km`) ||
    (source.evRange && `${source.evRange} km`) ||
    (source.totalRange && `${source.totalRange} km`) ||
    source.range ||
    placeholder.range;

  return {
    transmission,
    engine,
    drivetrain,
    seats,
    color,
    range,
    dimensions: source.dimensions
      ? typeof source.dimensions === "string"
        ? source.dimensions
        : `${source.dimensions.lengthMm} × ${source.dimensions.widthMm} × ${source.dimensions.heightMm} mm`
      : null,
    condition: source.condition || null,
  };
}

function getFulfillmentTimeline(car) {
  const isUsed = car?.usage === "used" || car?.condition === "USED";
  return {
    waitDays: isUsed ? 21 : 45,
    label: isUsed ? "2 - 3 weeks" : "6 - 8 weeks",
  };
}

export default function CarListingDetailView({ carId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPlatform = searchParams.get("platform");
  const startPurchaseParam = searchParams.get("purchase") === "1";

  const { selectedCar } = useCarStore();

  // Check if selectedCar or sessionStorage has initial snapshot for instant render
  const [cachedCar, setCachedCar] = useState(() => {
    if (
      selectedCar &&
      String(selectedCar.id || selectedCar.productId) === String(carId)
    ) {
      return selectedCar;
    }
    return null;
  });

  const [apiCar, setApiCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarCars, setSimilarCars] = useState([]);

  // Gallery state
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  // Purchase state
  const [purchaseStep, setPurchaseStep] = useState(
    startPurchaseParam ? "payment-mode" : null
  );
  const [paymentMode, setPaymentMode] = useState("outright");
  const [months, setMonths] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
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

  // Read sessionStorage snapshot on mount if store didn't have it
  useEffect(() => {
    if (!cachedCar && typeof window !== "undefined") {
      try {
        const raw = window.sessionStorage.getItem(`lyncs_car_${carId}`);
        if (raw) {
          setCachedCar(JSON.parse(raw));
        }
      } catch {
        // ignore storage error
      }
    }
  }, [carId, cachedCar]);

  const carPlatform = useMemo(() => {
    if (queryPlatform) return queryPlatform;
    if (cachedCar?.platform || cachedCar?.source) {
      return cachedCar.platform || cachedCar.source;
    }
    return String(carId || "").includes("-") ? "yekauto" : "guazi";
  }, [queryPlatform, cachedCar, carId]);

  // Fetch single car detail from API / local catalog
  useEffect(() => {
    if (!carId) return;
    let active = true;
    setIsLoading(true);
    setActiveImage(0);

    fetchCarDetail(carId, carPlatform)
      .then((res) => {
        if (active && res) {
          setApiCar(res);
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [carId, carPlatform]);

  // Merge cachedCar and apiCar
  const car = useMemo(() => {
    const initialCar = cachedCar || {};
    if (!apiCar && !cachedCar) return null;
    if (!apiCar) return initialCar;

    const rawFuel = String(
      apiCar.fuelType || apiCar.fuelTypeName || initialCar.type || ""
    ).toLowerCase();
    let type = initialCar.type || "petrol";
    if (rawFuel.includes("electric") || rawFuel.includes("bev") || rawFuel === "ev") {
      type = "electric";
    } else if (
      rawFuel.includes("hybrid") ||
      rawFuel.includes("phev") ||
      rawFuel.includes("hev")
    ) {
      type = "hybrid";
    }

    const mileageStr = apiCar.mileageKm
      ? `${numberWithCommas(apiCar.mileageKm)} km`
      : apiCar.mileage || initialCar.mileage || "0 km";

    return {
      ...initialCar,
      ...apiCar,
      id: apiCar.productId || apiCar.id || initialCar.id || carId,
      productId: apiCar.productId || initialCar.productId || apiCar.id || initialCar.id || carId,
      name: apiCar.title || apiCar.name || initialCar.name || "Vehicle Listing",
      make: apiCar.brandName || apiCar.make || initialCar.make || "Vehicle",
      model: apiCar.model || initialCar.model || "",
      year:
        apiCar.year ||
        (apiCar.mfgDate ? parseInt(apiCar.mfgDate, 10) : initialCar.year) ||
        2024,
      mileage: mileageStr,
      type,
      price: Number(apiCar.priceNgn ?? apiCar.price ?? initialCar.price ?? 0),
      originalPrice: apiCar.linePriceNgn || apiCar.originalPrice || initialCar.originalPrice,
      platform: carPlatform,
      source: carPlatform,
      usage:
        initialCar.usage ||
        apiCar.usage ||
        (apiCar.condition === "NEW" ? "brand-new" : "used"),
      labels: apiCar.labels || initialCar.labels || [],
      description: apiCar.description || initialCar.description || null,
      images:
        Array.isArray(apiCar.images) && apiCar.images.length > 0
          ? apiCar.images
          : initialCar.images || [],
      image: apiCar.image || initialCar.image || null,
    };
  }, [cachedCar, apiCar, carPlatform, carId]);

  // Fetch similar vehicles
  useEffect(() => {
    if (!car) return;
    let active = true;
    fetchCarsCatalog({
      usage: car.usage || "brand-new",
      limit: 8,
    })
      .then((res) => {
        if (!active) return;
        const list = res?.data?.cars || [];
        const filtered = list
          .filter((c) => String(c.id || c.productId) !== String(car.id))
          .slice(0, 4);
        setSimilarCars(filtered);
      })
      .catch(() => { });
    return () => {
      active = false;
    };
  }, [car?.id, car?.usage]);

  const [failedImages, setFailedImages] = useState({});

  const images = useMemo(() => {
    return getCarImageCandidates(car).filter((src) => !failedImages[src]);
  }, [car, failedImages]);

  useEffect(() => {
    setFailedImages({});
  }, [carId]);

  useEffect(() => {
    if (activeImage >= images.length && images.length > 0) {
      setActiveImage(0);
    }
  }, [activeImage, images.length]);

  const markImageFailed = (src) => {
    if (!src) return;
    setFailedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  };

  // Keyboard navigation for Full-Screen Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setIsZoomed(false);
      } else if (e.key === "ArrowRight" && images.length > 1) {
        setActiveImage((prev) => (prev + 1) % images.length);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        setActiveImage((prev) => (prev - 1 + images.length) % images.length);
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, images.length]);

  // Lock body scroll when purchase flow drawer / modal is active
  useEffect(() => {
    if (purchaseStep) {
      document.body.style.overflow = "hidden";
    } else if (!lightboxOpen) {
      document.body.style.overflow = "";
    }
    return () => {
      if (!lightboxOpen) {
        document.body.style.overflow = "";
      }
    };
  }, [purchaseStep, lightboxOpen]);

  const specs = useMemo(() => getVehicleSpecs(car, apiCar), [car, apiCar]);
  const isBrandNew = car?.usage === "brand-new" || car?.condition === "NEW";
  const fuelBadge = FUEL_TYPE_BADGE[car?.type] || FUEL_TYPE_BADGE.petrol;
  const timeline = useMemo(() => getFulfillmentTimeline(car), [car]);

  const installmentBreakdown = useMemo(() => {
    if (!car || paymentMode !== "installment" || !months) return null;
    return computeInstallmentBreakdown({ price: car.price, months });
  }, [car, paymentMode, months]);

  const deliveryFeeInfo = useMemo(
    () => getDeliveryFeeInfo(car?.price || 0),
    [car?.price]
  );

  // Purchase handlers
  const handleSelectPaymentMode = (mode) => {
    setPaymentMode(mode);
    if (mode !== "installment") setMonths(null);
  };

  const handleContinueFromPaymentMode = () => {
    if (!paymentMode) return;
    setPurchaseStep(paymentMode === "installment" ? "installment-term" : "delivery");
  };

  const finalizeOrder = async (deliveryAddressObj, contactOverride) => {
    if (!car) return null;
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
      [resolvedFirstName, resolvedLastName].filter(Boolean).join(" ") ||
      "Customer";

    const formattedPhone = toInternationalFormat(activeContact?.phone);
    const formattedWhatsapp = activeContact?.isSameAsPhone
      ? formattedPhone
      : toInternationalFormat(activeContact?.whatsapp || activeContact?.phone);

    try {
      const response = await createCarPurchase({
        carId: String(car.id || car.productId),
        carName: car.name,
        carPrice: Number(car.price),
        paymentMode,
        installmentMonths: paymentMode === "installment" ? Number(months) : undefined,
        deliveryMethod: deliveryMethod || "pickup",
        deliveryAddress: fullAddress || undefined,
        contact: {
          firstName: resolvedFirstName,
          lastName: resolvedLastName,
          name: resolvedFullName,
          email: activeContact?.email,
          phone: formattedPhone,
          whatsapp: formattedWhatsapp,
          isSameAsPhone: Boolean(activeContact?.isSameAsPhone),
        },
        car: {
          id: String(car.id || car.productId),
          name: car.name,
          make: car.make,
          model: car.model || "",
          year: Number(car.year) || 2024,
          origin: car.origin || "imported",
          platform: carPlatform,
        },
      });

      const orderResult = response?.data || response;
      setOrder(orderResult);
      toast.success(
        response?.message ||
        "Quote request submitted! Our sourcing team will contact you via WhatsApp."
      );
      return orderResult;
    } catch (error) {
      toast.error(error?.message || "Could not submit your quote request. Please try again.");
      return null;
    } finally {
      setIsSubmitting(false);
    }
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

  const handleContinueFromDelivery = async (incomingContact) => {
    const method = deliveryMethod || (deliveryFeeInfo?.qualifiesForFreeDrive ? "delivery" : "pickup");
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

  if (isLoading && !car) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-pulse">
        <div className="h-5 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-[420px] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
          <div className="lg:col-span-4 space-y-4">
            <div className="h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
          <FaCar size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Vehicle Listing Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          This vehicle may have been sold or removed from the catalog. Browse our active inventory or request a custom vehicle.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Browse all vehicles
          </Link>
          <Link
            href="/request-vehicle"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/20 px-6 py-2.5 text-sm font-semibold text-slate-700 dark:text-white transition hover:bg-slate-100 dark:hover:bg-white/10"
          >
            Request a vehicle
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Hi Lyncs, I'm interested in this vehicle listing:\n• Vehicle: ${car.name} (${car.year})\n• Price: ₦${numberWithCommas(car.price || 0)}\n• Condition: ${isBrandNew ? "Brand New" : "Used"}\n• Link: ${typeof window !== "undefined" ? window.location.href : ""}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const specRows = [
    { label: "Condition", value: isBrandNew ? "Brand New" : car.origin === "local" ? "Nigerian Used" : "Foreign Used" },
    { label: "Make", value: titleCase(car.make || "—") },
    { label: "Model", value: car.model || car.name?.replace(new RegExp(`^${car.make}\\s*`, "i"), "") || "—" },
    { label: "Year of Manufacture", value: String(car.year || "2024") },
    { label: "Mileage", value: car.mileage || "0 km" },
    { label: "Fuel Type", value: FUEL_TYPE_LABEL[car.type] || titleCase(car.type || "Petrol") },
    { label: "Transmission", value: specs.transmission },
    { label: "Engine / Motor", value: specs.engine },
    { label: "Drivetrain", value: specs.drivetrain },
    { label: "Exterior Color", value: specs.color },
    { label: "Seats", value: specs.seats },
    { label: car.type === "electric" ? "Estimated Range" : "Fuel Economy", value: specs.range },
    ...(specs.dimensions ? [{ label: "Dimensions", value: specs.dimensions }] : []),
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 font-Quicksand">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />

      {/* Top Breadcrumb & Back Bar (Jiji style) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 text-13px text-slate-500 dark:text-slate-400 flex-wrap">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 font-semibold text-primary dark:text-accent hover:underline cursor-pointer mr-2"
          >
            <FiArrowLeft size={15} />
            Back
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/cars" className="hover:text-primary dark:hover:text-white transition-colors">
            Cars
          </Link>
          <span>›</span>
          <Link
            href={isBrandNew ? "/cars/new" : "/cars/used"}
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            {isBrandNew ? "Brand New Cars" : "Used Cars"}
          </Link>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[220px] sm:max-w-xs">
            {car.name}
          </span>
        </div>
      </div>

      {/* Main 2-Column Listing Grid (Left: Gallery + Specs + Description, Right: Sticky Price & Seller Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Main Photo Gallery + Thumbnail Strip + Title + Quick Highlights */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs">
            {/* Hero Image Container */}
            <div className="relative bg-slate-100 dark:bg-slate-800 h-[280px] sm:h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden group">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[activeImage] || images[0]}
                    alt={`${car.name} - photo ${activeImage + 1}`}
                    referrerPolicy="no-referrer"
                    onError={() => markImageFailed(images[activeImage] || images[0])}
                    onClick={() => {
                      setLightboxOpen(true);
                      setIsZoomed(false);
                    }}
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  {/* Click to view full image badge */}
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxOpen(true);
                      setIsZoomed(false);
                    }}
                    className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 bg-black/65 hover:bg-black/80 text-white text-12px font-medium px-3 py-1.5 rounded-full backdrop-blur-xs transition cursor-pointer"
                  >
                    <IoExpand size={14} />
                    <span>Click image to view full</span>
                  </button>

                  {/* Condition & Fuel Badges on Top Left */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <span className="bg-black/65 backdrop-blur-xs text-white text-12px font-semibold px-3 py-1 rounded-full">
                      {isBrandNew ? "Brand New" : car.origin === "local" ? "Nigerian Used" : "Foreign Used"}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-12px font-semibold px-2.5 py-1 rounded-full shadow-xs",
                        fuelBadge.className
                      )}
                    >
                      <fuelBadge.icon size={12} />
                      {fuelBadge.label}
                    </span>
                  </div>

                  {/* Prev / Next Controls */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImage((prev) => (prev - 1 + images.length) % images.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
                        aria-label="Previous photo"
                      >
                        <FaChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImage((prev) => (prev + 1) % images.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
                        aria-label="Next photo"
                      >
                        <FaChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* Bottom Counter Pill */}
                  <div className="absolute bottom-3 right-3 z-20 bg-black/65 backdrop-blur-xs text-white text-12px font-semibold px-3 py-1 rounded-full">
                    {activeImage + 1} / {images.length}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
                  <FaCar size={64} />
                  <span className="text-13px text-slate-400 mt-2">No vehicle photos available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip (Jiji style) */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar">
                {images.map((src, idx) => {
                  const isSelected = idx === activeImage;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer",
                        isSelected
                          ? "border-primary dark:border-accent ring-2 ring-primary/20 dark:ring-accent/30"
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        onError={() => markImageFailed(src)}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Listing Title, Location & Quick Highlights Bar */}
            <div className="p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-20px sm:text-24px md:text-28px font-bold text-slate-900 dark:text-white leading-tight">
                    {car.name}
                  </h1>
                  <div className="flex items-center gap-3 text-13px text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <FiMapPin size={14} className="text-primary dark:text-accent" />
                      Lagos, Nigeria (Nationwide Delivery)
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <FiClock size={14} />
                      Est. fulfillment: {timeline.label}
                    </span>
                  </div>
                </div>

                {/* Mobile Price Display */}
                <div className="lg:hidden pt-2 sm:pt-0 sm:text-right">
                  <p className="text-11px uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                    Starting from
                  </p>
                  <p className="text-24px font-bold text-primary dark:text-white">
                    ₦{numberWithCommas(car.price || 0)}
                  </p>
                </div>
              </div>

              {/* Jiji-Style Quick Highlight Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                  <BsGearWideConnected className="text-primary dark:text-accent flex-shrink-0" size={18} />
                  <div className="min-w-0">
                    <p className="text-11px text-slate-400 dark:text-slate-500">Transmission</p>
                    <p className="text-13px font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {specs.transmission}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                  <fuelBadge.icon className="text-primary dark:text-accent flex-shrink-0" size={18} />
                  <div className="min-w-0">
                    <p className="text-11px text-slate-400 dark:text-slate-500">Fuel / Powertrain</p>
                    <p className="text-13px font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {FUEL_TYPE_LABEL[car.type] || titleCase(car.type || "Petrol")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                  <BsSpeedometer2 className="text-primary dark:text-accent flex-shrink-0" size={18} />
                  <div className="min-w-0">
                    <p className="text-11px text-slate-400 dark:text-slate-500">Mileage</p>
                    <p className="text-13px font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {car.mileage || "0 km"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                  <BsCalendar4Event className="text-primary dark:text-accent flex-shrink-0" size={18} />
                  <div className="min-w-0">
                    <p className="text-11px text-slate-400 dark:text-slate-500">Manufacture Year</p>
                    <p className="text-13px font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {car.year || "2024"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Detailed Specifications Table (Jiji Key Attributes Grid) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-18px font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
              Vehicle Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
              {specRows.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-11px uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium">
                    {item.label}
                  </p>
                  <p className="text-14px font-semibold text-slate-900 dark:text-slate-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Vehicle Description & Lyncs Inspection Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-18px font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
              Description
            </h2>
            <p className="text-14px sm:text-15px text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {car.description ||
                `This ${car.year || 2024} ${car.name} is available through Lyncs Africa. It features a ${String(
                  specs.transmission
                ).toLowerCase()} transmission, seats ${specs.seats}, and is finished in ${String(
                  specs.color
                ).toLowerCase()}. Every vehicle undergoes a verified pre-shipment inspection, and full customs clearance and logistics documentation are handled upon order.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30">
                <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="text-13px font-semibold text-slate-900 dark:text-white">Verified Inspection</p>
                  <p className="text-12px text-slate-500 dark:text-slate-400">Mechanical, structural & battery health</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30">
                <FaShieldAlt className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="text-13px font-semibold text-slate-900 dark:text-white">Customs Cleared</p>
                  <p className="text-12px text-slate-500 dark:text-slate-400">Full port & duty documentation</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30">
                <FaTruck className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="text-13px font-semibold text-slate-900 dark:text-white">Doorstep Delivery</p>
                  <p className="text-12px text-slate-500 dark:text-slate-400">Lagos pickup or nationwide delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Column (4 cols — Jiji Price, Action & Seller Sidebar) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
          {/* Price & Primary CTA Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            <div>
              <p className="text-11px uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                Starting from
              </p>
              <div className="flex items-baseline gap-2.5 mt-1 flex-wrap">
                <span className="text-28px sm:text-32px font-bold text-slate-900 dark:text-white tracking-tight">
                  ₦{numberWithCommas(car.price || 0)}
                </span>
                {car.originalPrice && car.originalPrice > car.price && (
                  <span className="text-14px text-slate-400 dark:text-slate-500 line-through">
                    ₦{numberWithCommas(car.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-12px text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                Outright purchase & flexible installment plans available
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => setPurchaseStep("payment-mode")}
                className="w-full bg-primary hover:bg-primary/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90 text-white text-14px font-semibold rounded-full py-3.5 px-5 transition cursor-pointer shadow-xs"
              >
                Purchase car
              </button>

              <button
                type="button"
                onClick={() => setIsSwapModalOpen(true)}
                className="w-full inline-flex items-center justify-center text-primary dark:text-white text-14px font-semibold rounded-full py-3 px-5 border border-primary dark:border-white/20 hover:bg-primary/5 dark:hover:bg-white/5 transition cursor-pointer"
              >
                Swap with your car
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-14px font-semibold rounded-full py-3 px-5 transition"
              >
                <FaWhatsapp size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Verified Seller / Dealership Box (Jiji Seller Profile style) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-accent/20 text-primary dark:text-accent flex items-center justify-center font-bold text-18px">
                LA
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-15px font-bold text-slate-900 dark:text-white">Lyncs Africa</p>
                  <FaCheckCircle className="text-emerald-500" size={14} title="Verified Dealer" />
                </div>
                <p className="text-12px text-slate-500 dark:text-slate-400">
                  Verified Automotive & EV Sourcing Partner
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-white/10 pt-3 space-y-2 text-12px text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Buyer Protection & Process</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>No immediate online payment required to request a quote</li>
                <li>Full inspection report shared before shipment</li>
                <li>Official customs duty & Lagos port clearance handled</li>
              </ul>
            </div>
          </div>

          {/* Inline Confirmation Banner if Quote was just submitted */}
          {purchaseStep === "success" && order && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-15px">
                <FiCheckCircle size={18} />
                <span>Quote Request Submitted</span>
              </div>
              <p className="text-13px text-emerald-800 dark:text-emerald-200 leading-relaxed">
                Our sourcing team has received your request for <strong>{car.name}</strong> and will reach out on WhatsApp shortly.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Similar Vehicles Section */}
      {similarCars.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-20px font-bold text-slate-900 dark:text-white">
              Similar Vehicles You May Like
            </h2>
            <Link
              href="/cars"
              className="text-14px font-semibold text-primary dark:text-accent hover:underline"
            >
              View all vehicles →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similarCars.map((simCar) => (
              <CarCard key={simCar.id || simCar.productId} car={simCar} />
            ))}
          </div>
        </div>
      )}

      {/* Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
          >
            {/* Top Lightbox Controls */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 text-white border-b border-white/10">
              <div className="min-w-0">
                <p className="text-15px font-bold truncate">{car.name}</p>
                <p className="text-12px text-white/60">
                  Photo {activeImage + 1} of {images.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3.5 py-2 text-12px font-medium text-white transition cursor-pointer"
                >
                  {isZoomed ? <IoContract size={16} /> : <IoExpand size={16} />}
                  <span className="hidden sm:inline">{isZoomed ? "Reset Zoom" : "Zoom In"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxOpen(false);
                    setIsZoomed(false);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                  aria-label="Close full screen image"
                >
                  <IoClose size={22} />
                </button>
              </div>
            </div>

            {/* Center Full Image Viewport */}
            <div
              onClick={() => setIsZoomed((z) => !z)}
              className="relative flex-1 flex items-center justify-center overflow-auto p-4"
            >
              <img
                src={images[activeImage] || images[0]}
                alt={`${car.name} full view ${activeImage + 1}`}
                referrerPolicy="no-referrer"
                onError={() => markImageFailed(images[activeImage] || images[0])}
                className={cn(
                  "max-h-[76vh] max-w-[92vw] object-contain transition-transform duration-200",
                  isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                )}
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev - 1 + images.length) % images.length);
                      setIsZoomed(false);
                    }}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev + 1) % images.length);
                      setIsZoomed(false);
                    }}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
                    aria-label="Next image"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip in Lightbox */}
            {images.length > 1 && (
              <div className="px-4 sm:px-8 py-3 border-t border-white/10 bg-black/60 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImage(idx);
                      setIsZoomed(false);
                    }}
                    className={cn(
                      "flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition cursor-pointer",
                      idx === activeImage
                        ? "border-accent opacity-100 scale-105"
                        : "border-transparent opacity-50 hover:opacity-80"
                    )}
                  >
                    <img
                      src={src}
                      alt={`Thumb ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      onError={() => markImageFailed(src)}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Modal Drawer for Select Payment Mode (stays open while Installment Plan or Contact Details is active) */}
      <div className="relative z-[80]">
        <div
          onClick={() => setPurchaseStep(null)}
          className={`main-overlay ${purchaseStep === "payment-mode" ||
            purchaseStep === "installment-term" ||
            purchaseStep === "delivery"
            ? "block"
            : "hidden"
            }`}
        />
        <div
          style={{ overscrollBehavior: "contain" }}
          className={cn(
            "slideUp no-scrollbar bg-white dark:bg-slate-900 border-l border-transparent dark:border-white/10 max-h-full rounded-t-lg md:rounded-r-none md:rounded-tl-[24px] md:rounded-bl-[24px] block transition duration-300 ease-in-out overflow-hidden overscroll-contain h-full",
            {
              "translate-y-0 md:translate-x-0":
                purchaseStep === "payment-mode" ||
                purchaseStep === "installment-term" ||
                purchaseStep === "delivery",
              "translate-y-[1000px] md:translate-y-0 md:translate-x-[750px]":
                purchaseStep !== "payment-mode" &&
                purchaseStep !== "installment-term" &&
                purchaseStep !== "delivery",
            }
          )}
        >
          {(purchaseStep === "payment-mode" ||
            purchaseStep === "installment-term" ||
            purchaseStep === "delivery") && (
              <PurchasePaymentModeModal
                car={car}
                paymentMode={paymentMode}
                onSelectPaymentMode={handleSelectPaymentMode}
                onContinuePaymentMode={handleContinueFromPaymentMode}
                onBack={() => setPurchaseStep(null)}
                onClose={() => setPurchaseStep(null)}
              />
            )}
        </div>
      </div>

      {/* Stepped Purchase Flow in SmallerModal (stacked on top of Select Payment Mode) */}
      <SmallerModal
        isOpen={
          purchaseStep === "installment-term" ||
          purchaseStep === "delivery"
        }
        onClose={() => setPurchaseStep("payment-mode")}
      >
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
            onClose={() => setPurchaseStep("payment-mode")}
          />
        )}

        {purchaseStep === "delivery" && (
          <PurchaseDeliveryModal
            car={car}
            deliveryFeeInfo={deliveryFeeInfo}
            deliveryMethod={deliveryMethod}
            onSelectDelivery={(m) => setDeliveryMethod(m)}
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

      <SwapCarModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        targetCar={car}
      />
    </div>
  );
}

