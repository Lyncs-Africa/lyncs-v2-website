"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, Select, SelectItem } from "../../ui/HeroUI.jsx";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import cn from "classnames";
import { numberWithCommas, titleCase } from "../../../lib/utils.js";
import { useCarStore } from "../../../store/carStore.js";
import { TOP_MAKES } from "../../../lib/vehicleBrands.js";
import { CAR_TABS, getTab, USE_CASE_OPTIONS } from "../../../lib/carSegments.js";
import { useCarsCatalogInfiniteQuery } from "../../../hooks/useCarsCatalog";
import CarCard from "./CarCard.jsx";

export const MAKES = TOP_MAKES;

export const TYPE_OPTIONS = [
  { value: "all", label: "All types" },
  { value: "electric", label: "Electric" },
  { value: "petrol", label: "Petrol" },
  { value: "hybrid", label: "Hybrid" },
];

export const ORIGIN_OPTIONS = [
  { value: "all", label: "All used cars" },
  { value: "local", label: "Nigerian used" },
  { value: "imported", label: "Foreign used" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const PAGE_SIZE = 12;

const CarsView = ({ usage = "brand-new", activeTab = "new" }) => {
  const activeTabMeta = getTab(activeTab);
  const [type, setType] = useState("all");
  const [make, setMake] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [origin, setOrigin] = useState("all");
  const [useCase, setUseCase] = useState("all");
  const [sort, setSort] = useState("newest");
  const catalogGridRef = useRef(null);
  const sentinelRef = useRef(null);

  const isUsedTab = usage === "used" || usage === "used-cars";
  const normalizedUsage = isUsedTab ? "used" : "brand-new";

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch & infinite cache cars via React Query (/cars/catalog)
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCarsCatalogInfiniteQuery({
    condition: normalizedUsage === "used" ? "USED" : "NEW",
    fuelType: type !== "all" ? type : undefined,
    origin: isUsedTab && origin !== "all" ? origin : undefined,
    make: make || undefined,
    keyword: debouncedSearch || undefined,
    segment: useCase !== "all" ? useCase : undefined,
    sort: sort || undefined,
    limit: PAGE_SIZE,
  });

  // Deduplicate loaded cars across pages using platform:id key
  const { cars, paginationInfo } = useMemo(() => {
    const pages = data?.pages || [];
    const carMap = new Map();
    let latestPagination = null;

    for (const p of pages) {
      if (p?.data?.pagination) {
        latestPagination = p.data.pagination;
      }
      const pageCars = p?.data?.cars || [];
      for (const car of pageCars) {
        const key = `${car.platform || car.source || "guazi"}:${car.id || car.productId}`;
        if (!carMap.has(key)) {
          carMap.set(key, car);
        }
      }
    }

    return {
      cars: Array.from(carMap.values()),
      paginationInfo: latestPagination,
    };
  }, [data]);

  // Light client guard (preserves server sort and server pagination)
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const carUsage = car.usage === "used-cars" ? "used" : car.usage;
      if (carUsage && carUsage !== normalizedUsage) return false;
      if (type !== "all" && car.type !== type) return false;
      if (isUsedTab && origin !== "all" && car.origin !== origin) return false;
      return true;
    });
  }, [cars, normalizedUsage, type, origin, isUsedTab]);

  // Auto-scrolling infinite fetch trigger via IntersectionObserver
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "350px", // pre-fetch before hitting exact bottom
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Format count text according to handoff instructions
  // (avoid presenting totalCount as exact when countIsExact=false or scanTruncated=true)
  const countText = useMemo(() => {
    const count = filteredCars.length;
    if (!count) return null;
    if (paginationInfo?.totalCount) {
      const countIsExact =
        paginationInfo.countIsExact !== false && !paginationInfo.scanTruncated;
      if (countIsExact) {
        return `Showing ${count} of ${paginationInfo.totalCount} vehicles`;
      }
      return `Showing ${count} vehicles (${paginationInfo.totalCount}+ available)`;
    }
    return `Showing ${count} vehicles`;
  }, [filteredCars.length, paginationInfo]);

  const sidebarRef = useRef(null);

  // Twitter/X-style two-way sticky sidebar:
  // As the user scrolls the page down, the sidebar scrolls naturally until its bottom
  // reaches the bottom of the viewport ("the finish line"), then sticks.
  // When scrolling up, it scrolls down until its top reaches below the header, then sticks.
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const topOffset = 146; // fixed header (130px) + 16px buffer
    const bottomOffset = 24;

    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let currentTop = topOffset;
    let rafId = null;

    const updateSticky = () => {
      rafId = null;
      if (!sidebar) return;

      const windowHeight = window.innerHeight;
      const sidebarHeight = sidebar.offsetHeight;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const availableHeight = windowHeight - topOffset - bottomOffset;

      // Case 1: Sidebar fits comfortably inside viewport
      if (sidebarHeight <= availableHeight) {
        if (currentTop !== topOffset) {
          currentTop = topOffset;
          sidebar.style.top = `${topOffset}px`;
        }
        return;
      }

      // Case 2: Sidebar is taller than the viewport (Twitter/X pattern)
      const minTop = windowHeight - sidebarHeight - bottomOffset;
      const maxTop = topOffset;

      // Reset when back at top of document
      if (currentScrollY <= 0) {
        currentTop = topOffset;
        sidebar.style.top = `${topOffset}px`;
        return;
      }

      currentTop = currentTop - delta;
      currentTop = Math.min(maxTop, Math.max(minTop, currentTop));

      sidebar.style.top = `${currentTop}px`;
    };

    // Calculate initial position in case page mounted while already scrolled
    const parentRect = sidebar.parentElement?.getBoundingClientRect();
    if (parentRect) {
      const windowHeight = window.innerHeight;
      const sidebarHeight = sidebar.offsetHeight;
      const minTop = windowHeight - sidebarHeight - bottomOffset;
      currentTop = Math.min(topOffset, Math.max(minTop, parentRect.top));
      sidebar.style.top = `${currentTop}px`;
    }

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateSticky);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        onScrollOrResize();
      });
      resizeObserver.observe(sidebar);
    }

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);



  return (
    <div className="w-full space-y-6">
      {/* Audience / condition tabs — one segmented toggle, two pills in a single track. */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800/60 p-1"
          role="tablist"
          aria-label="Browse cars by audience"
        >
          {CAR_TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <Link
                key={tab.key}
                href={tab.href}
                role="tab"
                aria-selected={isActive}
                scroll={false}
                className={cn(
                  "flex-shrink-0 rounded-full px-6 py-2.5 text-15px font-semibold transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-primary text-white shadow-sm dark:bg-accent dark:text-white"
                    : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Active audience headline */}
      {activeTabMeta?.headline && (
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {activeTabMeta.headline}
          </h1>
          {activeTabMeta.blurb && (
            <p className="text-13px sm:text-14px text-slate-500 dark:text-slate-400 max-w-2xl">
              {activeTabMeta.blurb}
            </p>
          )}
        </div>
      )}

      {/* Top Controls: Search + Dropdowns + Request Button */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <CiSearch size={20} />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by vehicle name or brand..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-14px text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20 focus:border-primary dark:focus:border-accent shadow-xs"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="w-full sm:w-48">
            <Select
              placeholder="Use case"
              selectedKeys={useCase ? [useCase] : ["all"]}
              onSelectionChange={(keys) => setUseCase(Array.from(keys)[0] || "all")}
              size="md"
              aria-label="Filter by use case"
            >
              {USE_CASE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="w-full sm:w-44">
            <Select
              placeholder="Fuel Type"
              selectedKeys={type ? [type] : ["all"]}
              onSelectionChange={(keys) => setType(Array.from(keys)[0] || "all")}
              size="md"
              aria-label="Filter by fuel type"
            >
              {TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {isUsedTab && (
            <div className="w-full sm:w-48">
              <Select
                placeholder="Origin"
                selectedKeys={origin ? [origin] : ["all"]}
                onSelectionChange={(keys) => setOrigin(Array.from(keys)[0] || "all")}
                size="md"
                aria-label="Filter by origin"
              >
                {ORIGIN_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}

          <div className="w-full sm:w-44">
            <Select
              placeholder="Sort By"
              selectedKeys={sort ? [sort] : ["newest"]}
              onSelectionChange={(keys) => setSort(Array.from(keys)[0] || "newest")}
              size="md"
              aria-label="Sort cars"
            >
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Link
            href="/request-vehicle"
            className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-full bg-primary px-5 text-14px font-medium text-white shadow-xs transition hover:bg-primary/90 shrink-0 cursor-pointer"
          >
            Request a vehicle
          </Link>
        </div>
      </div>

      {/* Active Brand Filter Tag */}
      {make && (
        <div className="flex items-center gap-2">
          <span className="text-12px text-slate-500 dark:text-slate-400">Filtered by:</span>
          <span className="inline-flex items-center gap-1.5 bg-primary/10 dark:bg-accent/20 text-primary dark:text-accent text-12px font-semibold pl-3 pr-1.5 py-1 rounded-full">
            {titleCase(make)}
            <button
              type="button"
              onClick={() => setMake("")}
              className="hover:bg-primary/20 dark:hover:bg-accent/30 rounded-full p-0.5 cursor-pointer"
            >
              <IoClose size={14} />
            </button>
          </span>
          <button
            type="button"
            onClick={() => setMake("")}
            className="text-12px text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* Mobile Horizontal Brand Chips */}
      <div className="lg:hidden">
        <p className="font-semibold text-15px text-slate-900 dark:text-white mb-2">Shop by Make</p>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {TOP_MAKES.map((brand) => {
            const isActive = make.toLowerCase() === brand.name.toLowerCase();
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => setMake(isActive ? "" : brand.name)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 border rounded-full pl-2 pr-4 py-1.5 transition-colors cursor-pointer",
                  isActive
                    ? "border-primary bg-primary/5 text-primary font-semibold dark:border-accent dark:bg-accent/15 dark:text-accent"
                    : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden p-0.5">
                  <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
                </span>
                <span className="text-12px">{brand.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Vehicle Cards (2 cols) + Sticky Sidebar (1 col) */}
      <div ref={catalogGridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Car Cards */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between animate-pulse"
                >
                  <div className="bg-slate-200 dark:bg-slate-800 h-[11.5rem] w-full" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2" />
                    <div className="pt-2 flex justify-between items-center">
                      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-24" />
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-full w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mx-auto flex items-center justify-center">
                <CiSearch size={24} />
              </div>
              <h3 className="text-16px font-bold text-slate-800 dark:text-white">No Vehicles Found</h3>
              <p className="text-13px text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                No vehicles matched your criteria. Try adjusting your brand or powertrain filters, or request a custom vehicle.
              </p>
              <div className="pt-2">
                <Button
                  size="sm"
                  color="primary"
                  radius="full"
                  onPress={() => {
                    setMake("");
                    setType("all");
                    setSearch("");
                  }}
                  className="text-white cursor-pointer"
                >
                  Reset All Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Count Summary */}
              {countText && (
                <div className="flex items-center justify-between pb-1">
                  <p className="text-13px font-medium text-slate-500 dark:text-slate-400">
                    {countText}
                  </p>
                </div>
              )}

              {/* Infinite Vehicles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCars.map((car) => {
                  const key = `${car.platform || car.source || "guazi"}:${car.id || car.productId}`;
                  return <CarCard key={key} car={car} />;
                })}
              </div>

              {/* Next Page Auto-loading Skeleton */}
              {isFetchingNextPage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={`loading-more-${i}`}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden animate-pulse flex flex-col justify-between"
                    >
                      <div className="bg-slate-200 dark:bg-slate-800 h-[11.5rem] w-full" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                        <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2" />
                        <div className="pt-2 flex justify-between items-center">
                          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-24" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Infinite Scroll Sentinel */}
              <div ref={sentinelRef} className="h-8 w-full pointer-events-none" />

              {/* Manual Load More Button fallback */}
              {hasNextPage && !isFetchingNextPage && (
                <div className="pt-2 pb-4 text-center">
                  <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-13px font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer shadow-xs"
                  >
                    Load more vehicles
                  </button>
                </div>
              )}

              {/* End of catalog indicator */}
              {!hasNextPage && filteredCars.length > 0 && (
                <div className="text-center py-6 text-13px text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/10 mt-6">
                  You have viewed all available vehicles ({filteredCars.length} loaded)
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Twitter/X-style Sticky "Shop by Make" Sidebar */}
        <div
          ref={sidebarRef}
          className="hidden lg:block lg:col-span-1 sticky self-start z-10 w-full"
          style={{ top: "146px" }}
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-white/10 pb-2">
              <p className="font-semibold text-16px text-slate-900 dark:text-white">Shop by Make</p>
              {make && (
                <button
                  type="button"
                  onClick={() => setMake("")}
                  className="text-12px font-medium text-primary dark:text-accent hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-2">
              {MAKES.map((option) => {
                const isActive = make.toLowerCase() === option.name.toLowerCase();
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMake(isActive ? "" : option.name)}
                    className={cn(
                      "w-full flex items-center gap-3 border rounded-xl px-4 py-2.5 text-left transition-colors cursor-pointer",
                      isActive
                        ? "border-primary bg-primary/5 font-semibold text-primary dark:border-accent dark:bg-accent/15 dark:text-accent"
                        : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-white/5"
                    )}
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                      <img
                        src={option.image}
                        alt={option.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain p-1"
                      />
                    </span>
                    <span className="text-14px font-medium">{titleCase(option.name)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsView;
