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

  openCarDetails: (car, startPurchase = false) => {
    set({
      slideUpOpen: false,
      modal: "",
      selectedCar: car,
      startPurchase,
    });
    const carId = car?.productId || car?.id;
    if (carId && typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(`lyncs_car_${carId}`, JSON.stringify(car));
      } catch {
        // ignore storage error
      }
      const platform = car?.platform || car?.source;
      const params = new URLSearchParams();
      if (platform) params.set("platform", platform);
      if (startPurchase) params.set("purchase", "1");
      const qs = params.toString();
      window.location.href = `/cars/${encodeURIComponent(carId)}${qs ? `?${qs}` : ""}`;
    }
  },

  openRequestVehicle: (targetCarForSwap = null, mode = null) => {
    const resolvedMode = mode || (targetCarForSwap ? "swap" : "bespoke");
    set({
      slideUpOpen: false,
      modal: "",
      swapTargetCar: targetCarForSwap,
      requestMode: resolvedMode,
    });
    if (typeof window !== "undefined") {
      window.location.href = resolvedMode === "swap" ? "/swap" : "/request-vehicle";
    }
  },

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
