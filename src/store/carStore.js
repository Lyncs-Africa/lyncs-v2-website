import { create } from "zustand";

export const useCarStore = create((set) => ({
  slideUpOpen: false,
  modal: "",               // "car-details" | "request-a-vehicle"
  smallerModal: "",        // "car-purchase-payment-mode" | "car-purchase-installment-term" | "car-purchase-delivery"
  isSmallerModalOpen: false,
  selectedCar: null,
  swapTargetCar: null,
  requestMode: "bespoke", // "bespoke" | "swap"
  startPurchase: false,

  openCarDetails: (car, startPurchase = false) =>
    set({
      slideUpOpen: true,
      modal: "car-details",
      selectedCar: car,
      startPurchase,
    }),

  openRequestVehicle: (targetCarForSwap = null, mode = null) =>
    set({
      slideUpOpen: true,
      modal: "request-a-vehicle",
      swapTargetCar: targetCarForSwap,
      requestMode: mode || (targetCarForSwap ? "swap" : "bespoke"),
    }),

  openSmallerModal: (modalName) =>
    set({
      isSmallerModalOpen: true,
      smallerModal: modalName,
    }),

  closeSmallerModal: () =>
    set({
      isSmallerModalOpen: false,
      smallerModal: "",
    }),

  closeAllModals: () =>
    set({
      slideUpOpen: false,
      modal: "",
      smallerModal: "",
      isSmallerModalOpen: false,
      selectedCar: null,
      swapTargetCar: null,
      startPurchase: false,
    }),
}));
