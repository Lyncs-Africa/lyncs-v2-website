"use client";

import React, { useEffect } from "react";
import classNames from "classnames";
import { useCarStore } from "../../../store/carStore.js";
import CarDetailsModal from "../CarDetailsModal.jsx";
import RequestVehicleModal from "../RequestVehicleModal.jsx";

const SlideUpModal = () => {
  const { slideUpOpen, modal, closeAllModals } = useCarStore();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && slideUpOpen) {
        closeAllModals();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideUpOpen, closeAllModals]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (slideUpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [slideUpOpen]);

  return (
    <div className="relative z-50">
      {/* Backdrop overlay */}
      <div
        onClick={closeAllModals}
        className={`main-overlay ${slideUpOpen ? "block" : "hidden"}`}
      />

      {/* Slide-Over Drawer Container (750px right-side drawer on desktop / full on mobile) */}
      <div
        style={{ overscrollBehavior: "contain" }}
        className={classNames(
          "slideUp bg-white dark:bg-slate-900 border-l border-transparent dark:border-white/10 max-h-full rounded-t-lg md:rounded-r-none md:rounded-tl-[24px] md:rounded-bl-[24px] block transition duration-300 ease-in-out overflow-hidden overscroll-contain",
          {
            "h-full": true,
            "translate-y-0 md:translate-x-0": slideUpOpen,
            "translate-y-[1000px] md:translate-y-0 md:translate-x-[750px]": !slideUpOpen,
          }
        )}
      >
        {modal === "car-details" && <CarDetailsModal onClose={closeAllModals} />}
        {modal === "request-a-vehicle" && <RequestVehicleModal onClose={closeAllModals} />}
      </div>
    </div>
  );
};

export default SlideUpModal;
