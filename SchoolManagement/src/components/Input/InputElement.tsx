/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { RegisterOptions } from "react-hook-form";
interface IInput {
  label?: string;
  layout?: "column" | "row";
  preview?: boolean;
  form?: any;
  style?: any;
  isExpiryDate?: boolean;
  name: string;
  inputType?: "text" | "date" | "file" | "password" | "number";
  placeholder?: string;
  required?: boolean;
  value?: number | string | null | undefined | string[];
  defaultValue?: number | string | null | undefined | string[];
  disabled?: boolean;
  minDate?: string;
  inputTypeCheckBox?: "checkbox";
  customStyle?: string;
  isReport?: boolean;
  readOnly?: boolean;
  [key: string]: any;
  type?: string;
  rules?: RegisterOptions;
  maxDecimals?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputElement = forwardRef<HTMLInputElement, IInput>(
  (
    {
      label,
      preview = false,
      form,
      readOnly,
      name,
      inputType = "text",
      disabled,
      maxDecimals = 2,
      isReport = false,
      value,
      defaultValue,
      onChange,
      placeholder,
      required = false,
      isExpiryDate = false,
      customStyle = "",
      inputTypeCheckBox,
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (inputType === "number") {
        const raw = e.target.value;
        const regex = new RegExp(`^(\\d+)?(\\.\\d{0,${maxDecimals}})?$`);

        if (raw === "" || regex.test(raw)) {
          onChange?.(e);
        }
      } else {
        onChange?.(e);
      }
    };
    const { ref: registerRef, ...rest } = form.register(name);
    return (
      <div className={`font-poppins`}>
        {preview ? (
          <span className="text-gray-800">{form.getValues(name)}</span>
        ) : (
          <div className="flex flex-col">
            {inputType === "date" ? (
              <input name={name} required={required} type="date" />
            ) : inputTypeCheckBox === "checkbox" ? (
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id={name}
                  disabled={disabled}
                  {...form.register(name)}
                  className={`h-4 w-4 border-gray-300 rounded ${customStyle}`}
                />
                <label htmlFor={name} className="text-gray-700 text-sm">
                  {label ? `${`${label}`}` : ""}
                </label>
              </div>
            ) : inputType !== "file" ? (
              <div className="relative w-full">
                <input
                  id={name}
                  type={inputType}
                  disabled={disabled}
                  {...form.register(name, { required: required })}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  min={inputType === "number" ? 0 : undefined}
                  className={`w-full p-2 py-3 border ${
                    form.formState.errors[name]
                      ? "border-red-500"
                      : "border-gray-400"
                  } ${
                    readOnly
                      ? "cursor-not-allowed bg-gray-100 dark:bg-[#353535]"
                      : ""
                  } rounded-md outline-none peer placeholder:opacity-0 bg-[#ffffff] dark:text-white border-[#035BBA] dark:bg-[#353535] focus:border-[#4788CD] ${customStyle}`}
                  defaultValue={defaultValue}
                  inputMode={inputType === "number" ? "decimal" : undefined}
                  value={value}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (inputType === "number" && e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                  ref={(e) => {
                    registerRef(e);
                    if (typeof ref === "function") {
                      ref(e);
                    } else if (ref) {
                      (
                        ref as React.MutableRefObject<HTMLInputElement | null>
                      ).current = e;
                    }
                  }}
                  {...rest}
                />
                <label
                  htmlFor={name}
                  className={`absolute left-1 ${
                    value || form.watch(name)
                      ? "bg-[#ffffff] dark:bg-[#353535] dark:text-white"
                      : ""
                  } scale-90 peer-placeholder-shown:scale-100 peer-focus:scale-90 -top-[0.8rem] px-2 origin-left peer-placeholder-shown:top-2 peer-focus:-top-[0.8rem] peer-focus:text-[#4788CD] dark:peer-focus:text-gray-200 peer-focus:bg-[#ffffff] dark:peer-focus:bg-[#353535] text-gray-500 transition-all pointer-events-none`}
                >
                  <div className="flex items-center">
                    {required && (
                      <span className="text-red-500 text-xl mr-1">*</span>
                    )}
                    {label ? `${`${label}`}` : ""}
                  </div>
                </label>
              </div>
            ) : (
              <input
                id={name}
                type="file"
                {...form.register(name, { required: required })}
                className={`px-3 mt-1 py-2 rounded border ${
                  form.formState.errors[name]
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-1 focus:ring-gray-500 focus:outline-none text-sm`}
                ref={ref}
              />
            )}

            {form.formState.errors[name]?.message && (
              <span className="text-red-500 text-sm mt-1">
                {form.formState.errors[name]?.message}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
