"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { useCarStore } from "../../../store/carStore.js";
import PurchasePaymentModeModal from "../purchase/PurchasePaymentModeModal.jsx";
import PurchaseInstallmentTermModal from "../purchase/PurchaseInstallmentTermModal.jsx";
import PurchaseDeliveryModal from "../purchase/PurchaseDeliveryModal.jsx";

const SmallerModal = ({
  children,
  isOpen: propIsOpen,
  onClose: propOnClose,
  extraProps = {},
}) => {
  const { isSmallerModalOpen: storeIsOpen, smallerModal, closeSmallerModal, selectedCar } = useCarStore();

  const isVisible = propIsOpen !== undefined ? propIsOpen : storeIsOpen;
  const handleClose = propOnClose || closeSmallerModal;

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            key="smaller-modal-container"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 550, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={classNames(
              "smaller-modal md:h-auto h-full max-h-[92vh] md:max-h-[85vh] z-[100] w-full md:w-[750px] md:max-w-[750px] md:right-0 md:left-auto md:rounded-tl-[24px] md:rounded-tr-none px-6 pt-6 md:py-[2rem] bg-white dark:bg-slate-900 border-t md:border-l border-slate-200 dark:border-white/10 shadow-2xl text-slate-900 dark:text-slate-100 overflow-y-auto slim-scroll"
            )}
          >
            {children}
            {!children && smallerModal === "car-purchase-payment-mode" && (
              <PurchasePaymentModeModal car={selectedCar} onClose={handleClose} {...extraProps} />
            )}
            {!children && smallerModal === "car-purchase-installment-term" && (
              <PurchaseInstallmentTermModal car={selectedCar} onClose={handleClose} {...extraProps} />
            )}
            {!children && smallerModal === "car-purchase-delivery" && (
              <PurchaseDeliveryModal car={selectedCar} onClose={handleClose} {...extraProps} />
            )}
          </motion.div>

          {/* Backdrop */}
          <div
            key="smaller-modal-backdrop"
            onClick={handleClose}
            className="cursor-pointer fixed inset-0 bg-black/40 z-[99] transition-opacity"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default SmallerModal;
