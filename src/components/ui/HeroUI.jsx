"use client";

import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import { FiChevronDown, FiCheck } from "react-icons/fi";

/* --- TABS --- */
export const Tabs = ({
  selectedKey,
  onSelectionChange,
  children,
  className,
  size = "lg",
  radius = "full",
  "aria-label": ariaLabel,
}) => {
  const tabs = React.Children.toArray(children).filter(Boolean);

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10",
        radius === "full" ? "rounded-full" : "rounded-xl",
        className
      )}
    >
      {tabs.map((tab) => {
        const rawKey = tab.props?.id || tab.props?.value || tab.key || "";
        const cleanKey = String(rawKey).replace(/^\.\$/, "");
        const isSelected = String(selectedKey || "").replace(/^\.\$/, "") === cleanKey;
        return (
          <button
            key={cleanKey}
            role="tab"
            type="button"
            aria-selected={isSelected}
            onClick={() => onSelectionChange && onSelectionChange(cleanKey)}
            className={cn(
              "transition-all duration-200 font-semibold cursor-pointer outline-none",
              size === "lg" ? "px-6 py-2.5 text-14px" : "px-4 py-1.5 text-13px",
              radius === "full" ? "rounded-full" : "rounded-lg",
              isSelected
                ? "bg-primary text-white shadow-xs font-bold dark:bg-accent"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {tab.props.title || tab.props.children}
          </button>
        );
      })}
    </div>
  );
};

export const Tab = ({ title, children, id, value }) => {
  return null;
};

/* --- SELECT & SELECT ITEM --- */
export const Select = ({
  placeholder = "Select option",
  selectedKeys = [],
  onSelectionChange,
  children,
  classNames = {},
  className,
  size = "md",
  label,
  "aria-label": ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedKeyArray = Array.from(selectedKeys || []);
  const currentKey = selectedKeyArray[0];

  const items = React.Children.toArray(children).map((child) => ({
    key: child.key?.replace(/^\.\$/, "") || child.props?.value,
    value: child.props?.value,
    label: child.props?.children,
  }));

  const selectedItem = items.find((item) => String(item.key) === String(currentKey) || String(item.value) === String(currentKey));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (key) => {
    setIsOpen(false);
    if (onSelectionChange) {
      onSelectionChange(new Set([key]));
    }
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      {label && (
        <label className="block text-12px font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        aria-label={ariaLabel || label || placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between text-left transition-colors border border-light dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20",
          size === "lg" ? "h-12 px-4 text-14px" : "h-10 px-3.5 text-13px",
          "rounded-xl bg-eminence dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs cursor-pointer",
          classNames.trigger
        )}
      >
        <span className={cn("truncate", !selectedItem && "text-slate-400 dark:text-slate-500 font-normal")}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <FiChevronDown
          size={16}
          className={cn("text-slate-400 dark:text-slate-500 transition-transform duration-200 shrink-0 ml-2", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-lg dark:shadow-black/60 max-h-60 overflow-y-auto no-scrollbar animate-in fade-in duration-150">
          {items.map((item) => {
            const isSelected = String(item.key) === String(currentKey) || String(item.value) === String(currentKey);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelect(item.key || item.value)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2 text-13px text-left transition-colors cursor-pointer",
                  isSelected
                    ? "bg-primary/5 text-primary font-bold dark:bg-accent/15 dark:text-accent"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                )}
              >
                <span>{item.label}</span>
                {isSelected && <FiCheck size={14} className="text-primary dark:text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const SelectItem = ({ children }) => {
  return null;
};

/* --- BUTTON --- */
export const Button = ({
  children,
  color = "default",
  variant = "solid",
  radius = "md",
  size = "md",
  isLoading = false,
  isDisabled = false,
  onPress,
  onClick,
  className,
  type = "button",
  ...props
}) => {
  const handleClick = (e) => {
    if (isDisabled || isLoading) return;
    if (onPress) onPress(e);
    if (onClick) onClick(e);
  };

  const colorStyles = {
    primary:
      variant === "bordered"
        ? "border border-primary text-primary hover:bg-primary/5 dark:border-accent dark:text-accent dark:hover:bg-accent/10"
        : "bg-primary text-white hover:bg-primary/90 dark:bg-accent dark:hover:bg-accent/90 shadow-xs",
    bordered: "border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5",
    default: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
  };

  const radiusStyles = {
    full: "rounded-full",
    large: "rounded-2xl",
    md: "rounded-xl",
    sm: "rounded-lg",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-12px",
    md: "px-5 py-2.5 text-14px",
    lg: "px-7 py-3 text-15px font-semibold",
  };

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        colorStyles[color] || colorStyles.default,
        radiusStyles[radius] || radiusStyles.md,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

/* --- INPUT --- */
export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  errorMessage,
  isInvalid = false,
  required = false,
  size = "md",
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full space-y-1", className)}>
      {label && (
        <label className="block text-12px font-medium text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20 transition-all",
          size === "md" ? "px-3.5 py-2.5 text-14px" : "px-3 py-1.5 text-13px",
          isInvalid || errorMessage
            ? "border-red-400 focus:border-red-500"
            : "border-slate-200 dark:border-white/10 focus:border-primary dark:focus:border-accent shadow-xs"
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-11px text-red-500 mt-1 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

/* --- TEXTAREA --- */
export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 3,
  errorMessage,
  isInvalid = false,
  required = false,
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full space-y-1", className)}>
      {label && (
        <label className="block text-12px font-medium text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20 transition-all px-3.5 py-2.5 text-14px resize-none shadow-xs",
          isInvalid || errorMessage
            ? "border-red-400 focus:border-red-500"
            : "border-slate-200 dark:border-white/10 focus:border-primary dark:focus:border-accent"
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-11px text-red-500 mt-1 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

/* --- CHECKBOX --- */
export const Checkbox = ({
  isSelected = false,
  onValueChange,
  children,
  size = "sm",
  className,
}) => {
  return (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer select-none", className)}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onValueChange && onValueChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          "flex items-center justify-center rounded-md border transition-colors",
          size === "sm" ? "w-4 h-4" : "w-5 h-5",
          isSelected
            ? "bg-primary border-primary dark:bg-accent dark:border-accent text-white"
            : "border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900"
        )}
      >
        {isSelected && <FiCheck size={11} strokeWidth={3} />}
      </span>
      {children && <span className="text-13px text-slate-700 dark:text-slate-300">{children}</span>}
    </label>
  );
};
