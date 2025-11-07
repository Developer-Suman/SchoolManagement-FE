/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import React, { useState, forwardRef, useEffect, JSX } from "react";

interface AppComboboxProps<T> {
  dropdownPositionClass?: string;
  label?: string;
  isFiler?: boolean;
  required?: boolean;
  name: string;
  onFocus?: () => void;
  form?: any;
  options: T[] | undefined;
  value?: string | number | null;
  defaultValue?: string | number | null;
  dropDownWidth?: string;
  selected?: T;
  onSelect: (option: T | null) => void;
  placeholder?: string;
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
  renderOptionExtra?: (option: T) => JSX.Element;
  readOnly?: boolean;
  disabled?: boolean;
}

function InnerCombobox<T>(
  {
    dropdownPositionClass,
    label = "Select Option",
    required = false,
    options,
    form,
    value,
    selected,
    onFocus,
    dropDownWidth,
    isFiler,
    onSelect,
    placeholder = "Search...",
    getLabel,
    name,
    getValue,
    disabled,
    renderOptionExtra,
    readOnly,
  }: AppComboboxProps<T>,
  ref: React.Ref<HTMLInputElement>
) {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const filteredOptions =
    query === ""
      ? options
      : options?.filter((option) =>
          getLabel(option).toLowerCase().includes(query.toLowerCase())
        );
  useEffect(() => {
    if (!selected) {
      setQuery(""); // clears the input when parent clears selected
    }
  }, [selected]);
  return (
    <div className="w-full">
      <Combobox
        value={selected ?? null}
        onChange={(option) => {
          onSelect(option);
          setIsActive(false);
          setQuery(option ? getLabel(option) : "");
          if (form?.setValue) {
            form.setValue(name, option ? getValue(option) : null, {
              shouldValidate: true,
              shouldDirty: true,
            });
            if (option) {
              form.clearErrors(name);
            }
          }
        }}
      >
        {({ open }) => (
          <div className="relative mt-1">
            <div className="relative items-center flex">
              <ComboboxInput
                {...(isFiler ? { value: query } : {})}
                {...(form?.register ? form.register(name, { required }) : {})}
                className={`w-full p-2 py-3 border  rounded-md outline-none peer placeholder:opacity-0 bg-[#ffffff] focus:border-[#4788CD] border-gray-400 dark:bg-[#353535] dark:text-white  ${
                  form?.formState?.errors?.[name]
                    ? "border-red-500"
                    : "border-gray-400"
                }${
                  readOnly
                    ? "cursor-not-allowed bg-gray-100 dark:bg-[#3d3d3d]"
                    : ""
                }`}
                displayValue={(option: T | null) =>
                  option ? String(getLabel(option) || "") : ""
                }
                disabled={disabled}
                onFocus={() => {
                  onFocus?.();
                  if (!open) {
                    setIsActive(true);
                  }
                }}
                onBlur={() => setIsActive(false)}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                ref={ref}
                placeholder={placeholder}
              />
              <label
                htmlFor={name}
                className={`absolute flex items-center left-1 scale-90 peer-placeholder-shown:scale-100 peer-focus:scale-90 -top-[0.8rem] px-2 origin-left peer-placeholder-shown:top-2 peer-focus:-top-[0.8rem] peer-focus:text-[#4788CD] dark:peer-focus:text-gray-200  dark:peer-focus:bg-[#353535] peer-focus:bg-[#ffffff] text-gray-500  transition-all pointer-events-none ${
                  value || (form ? form.watch(name) : value)
                    ? "bg-[#ffffff] dark:bg-[#353535] dark:text-white"
                    : ""
                }`}
              >
                {required && (
                  <span className="text-red-500 text-xl mr-1">*</span>
                )}
                {`${label}`}
              </label>
            </div>
            <Transition show={(open || isActive) && !readOnly}>
              <div className="z-[50]">
                {filteredOptions && filteredOptions.length > 0 && (
                  <ComboboxOptions
                    className={`bg-[#ffffff] border rounded shadow z-50 max-h-40 overflow-y-auto dark:text-white dark:bg-[#353535] ${
                      dropdownPositionClass || "top-full left-0 right-0 mt-1"
                    } ${dropDownWidth}`}
                  >
                    {filteredOptions.map((option) => (
                      <ComboboxOption
                        key={getValue(option)}
                        value={option}
                        className="hover:bg-gray-50 dark:hover:bg-[#3D3E43] transition-colors z-50"
                      >
                        {({ active }) => (
                          <div
                            className={`mx-2 px-2 py-1 cursor-pointer rounded-sm flex justify-between ${
                              active ? "bg-gray-100 dark:bg-[#585858]" : ""
                            }`}
                          >
                            <span>{getLabel(option)}</span>
                            {renderOptionExtra && (
                              <span className="dark:text-gray-100">
                                {renderOptionExtra(option)}
                              </span>
                            )}
                          </div>
                        )}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                )}
              </div>
            </Transition>
            {form
              ? form.formState.errors[name]?.message && (
                  <span className="text-red-500 text-sm mt-1">
                    {form.formState.errors[name]?.message}
                  </span>
                )
              : ""}
          </div>
        )}
      </Combobox>
    </div>
  );
}

export const AppCombobox = forwardRef(InnerCombobox) as <T>(
  props: AppComboboxProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => JSX.Element;
