import { ButtonElement } from "@/components/FormComponents/Button";
import { InputElement } from "@/components/FormComponents/input";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { api } from "@/utils/instance";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/bgremovedlogo.png";
import { IRegisterType } from "../types/IRegisterType";
import { apiRoutes } from "@/utils/apiRoutes";
import { useState } from "react";
import { Toast } from "@/components/Toast/Toast";
import toast, { Toaster } from "react-hot-toast";
import { RegisterValidator } from "../validators/RegisterValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import useErrorHandler from "@/components/common/ErrorHandling";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword] = useState<boolean>(false);
  const form = useForm<IRegisterType>({
    defaultValues: {
      Username: "",
      Email: "",
      Password: "",
    },
    resolver: yupResolver(RegisterValidator),
  });
  const { handleError, clearError } = useErrorHandler();
  const handleRegister = async (values: IRegisterType) => {
    clearError();
    try {
      await toast.promise(api.post(`${apiRoutes.register}`, values), {
        loading: "Submitting Data...",
        success: "Registration successful! Please login",
        error: "Failed to Register",
      });
      navigate("/login", {
        state: {
          email: values.Email,
          password: values.Password,
        },
      });
    } catch (error) {
      const errorMsg = handleError(error);
      Toast.error(errorMsg);
    }
  };

  const { t } = useTranslation();
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center bg-orange-300 p-6 md:px-10">
          <div className="bg-white  h-full w-full max-w-md md:max-w-none md:h-[97%] md:w-[100%] rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center h-full p-6">
              <img
                src={logo}
                alt="System Logo"
                className="w-32 md:w-[21%] mb-2 rounded-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center bg-teal-500 p-6 md:px-10">
          <div className="bg-white dark:bg-[#303135] h-full w-full max-w-md md:max-w-none md:h-[97%] md:w-[100%] rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center h-full p-6 border-2 border-teal-500">
              <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-6">
                {t("Register")}
              </h2>
              <form
                onSubmit={form.handleSubmit(handleRegister)}
                className="bg-[#FBFBFB] dark:text-white dark:bg-[#27272a] border-2 border-teal-500 lg:min-w-[500px] sm:min-w-[200px] p-10 rounded-lg pb-7 "
              >
                <div>
                  <div className=" mt-2">
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        name="Username"
                        required
                        label="User Name"
                        preview={false}
                        placeholder="Username"
                        size="large"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        name="Email"
                        required
                        label="Email"
                        preview={false}
                        placeholder="eg. test@example.com"
                        size="large"
                        type="email"
                      />
                    </div>
                    <div className="mb-3 ">
                      <InputElement
                        label={t("password")}
                        form={form}
                        required
                        name="Password"
                        type={showPassword ? "text" : "password"}
                        preview={false}
                        placeholder="पासवर्ड प्रविष्ट गर्नुहोस्"
                        size="large"
                        value={form.watch("Password") || ""}
                        className="mb-2 pr-16"
                      />
                    </div>
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        name="CompanyName"
                        required
                        label={t("Company Name")}
                        preview={false}
                        placeholder={t("Enter your company name")}
                        size="large"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        name="Address"
                        required
                        label={t("Address")}
                        preview={false}
                        placeholder={t("Enter your address")}
                        size="large"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        required
                        name="CompanyShortName"
                        label={t("Company Short Name")}
                        preview={false}
                        placeholder={t("Enter short name")}
                        size="large"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        required
                        name="ContactNumber"
                        label={t("Contact Number")}
                        preview={false}
                        placeholder={t("Enter phone number")}
                        size="large"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        required
                        name="ContactPerson"
                        label={t("Contact Person")}
                        preview={false}
                        placeholder={t("Enter contact person")}
                        size="large"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <InputElement
                        form={form}
                        name="PAN"
                        label={t("PAN Number")}
                        preview={false}
                        placeholder={t("Enter PAN number")}
                        size="large"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-4 flex-col">
                  <ButtonElement
                    isLoading={form.formState.isSubmitting}
                    type="submit"
                    text={t("Register")}
                  />
                  <p className="text-center mt-4">
                    {t("Already Have Account")}?{" "}
                    <Link to="/" className="text-blue-500">
                      {t("Login Here")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
