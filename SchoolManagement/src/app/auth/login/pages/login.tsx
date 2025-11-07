"use client";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { InputElement } from "@/components/Input/InputElement";
import { Toast } from "@/components/Toast/toast";
import { AuthContext } from "@/context/auth/AuthContext";
import { useLogin } from "../hooks";
import bgImg from "@/assets/background.png";
import { NormalizeStringCase } from "@/components/helpers/normalizeStringCase";
import {
  ILoginType,
  ITokenPayload,
  ITokenPayloadObject,
} from "../types/loginResponse";
import { IUserRole } from "../types/userRoles";
import dashboardPic from "@/assets/Screenshot 2025-10-16 at 14.21.48.png";
import attendanceQr from "@/assets/Screenshot 2025-10-16 at 14.21.22.png";

const LoginForm = () => {
  const form = useForm<ILoginType>({
    defaultValues: { email: "", password: "" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toggleImg, setToggleImg] = useState(dashboardPic);
  const router = useRouter();
  const login = useLogin();
  const { updateUserDetails } = useContext(AuthContext);

  const handleToggleImg = () => {
    setToggleImg((prev) =>
      prev === dashboardPic ? attendanceQr : dashboardPic
    );
  };

  const handleSubmit = async (values: ILoginType) => {
    console.log("Test", values);
    setIsSubmitting(true);
    try {
      const response = await login.mutateAsync(values);
      const token = response.token;
      if (!token) throw new Error("No token returned from login");
      const tokenPayload: ITokenPayload = jwtDecode(token);
      const userDetails: ITokenPayloadObject = {
        username:
          tokenPayload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
        role: NormalizeStringCase(
          tokenPayload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
          false
        ) as IUserRole,
        email: tokenPayload.email,
        id: tokenPayload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        schoolId: tokenPayload.SchoolId,
        institutionId: tokenPayload.InstitutionId,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userId", tokenPayload.sub);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      updateUserDetails(userDetails);
      const roleToDashboardMap: Partial<Record<IUserRole, string>> = {
        superadmin: "/SuperAdmin/dashboard",
        developeruser: "/developer",
      };
      const storedUser = localStorage.getItem("userDetails");

      let role = "";
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          role = parsedUser.role;
        } catch (error) {
          console.error("Failed to parse user details:", error);
        }
      }

      const dashboardRoute = roleToDashboardMap[userDetails.role]
        ? roleToDashboardMap[userDetails.role]
        : role === "admin"
        ? "/admin/dashboard"
        : role === "demoexpiryrole"
        ? "/end-user/expired"
        : "/enduser/dashboard";
      if (dashboardRoute) setTimeout(() => router.push(dashboardRoute), 200);
    } catch (error: any) {
      Toast.error(error.response?.data || error.message || "Failed to login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full ">
      <div className="flex flex-col justify-center items-center flex-1 px-8 md:px-16 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#035BBA] flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-2xl font-semibold text-gray-800">My App</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">
            Enter your email and password to access your account.
          </p>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <div>
              <InputElement
                form={form}
                label="Email"
                name="email"
                placeholder="sellostore@company.com"
                inputType="text"
              />
            </div>

            <div className="relative">
              <InputElement
                form={form}
                label="Password"
                name="password"
                inputType={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[30px] text-sm text-indigo-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button> */}
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-gray-500 text-sm">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <Link href="#" className="text-[#035BBA] text-sm hover:underline">
                Forgot Your Password?
              </Link>
            </div>

            <ButtonElement
              isLoading={isSubmitting}
              type="submit"
              text="Log In"
              className="w-full text-white py-3 rounded-lg font-medium"
            />

            <div className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link href="/register" className="text-[#035BBA] hover:underline">
                Register Now.
              </Link>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-gray-400 text-sm mx-3">Or Login With</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <img
                  src="https://www.svgrepo.com/show/303128/apple-logo.svg"
                  alt="Apple"
                  className="w-5 h-5"
                />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:flex  flex-1 items-center justify-center bg-white text-white relative p-10">
        <div
          className="h-full justify-center items-center w-full flex max-w-md md:max-w-none md:h-[97%] md:w-[100%] rounded-lg shadow-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImg.src})` }}
        >
          <div className="max-w-lg ">
            <h1 className="text-3xl font-semibold mb-4 flex ">
              Effortlessly manage your school and operations.
            </h1>
            <p className="text-gray-200 mb-6">
              Log in to access your CRM dashboard and manage your team.
            </p>
            <div className="flex justify-center">
              <img
                src={toggleImg.src}
                alt="Dashboard Preview"
                className="rounded-xl shadow-2xl border border-white/20 mb-6 "
              />
            </div>
            <span className="">
              Please click the button below and scan the Qr to do your
              attendance.
            </span>
            <ButtonElement
              text="Toggle Preview"
              onClick={handleToggleImg}
              className=" mt-4 font-medium hover:bg-gray-300 hover:text-black px-5 py-2 rounded-lg transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
