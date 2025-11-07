import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ButtonElement } from "@/components/FormComponents/Button";
import { InputElement } from "@/components/FormComponents/input";
import { Toast } from "@/helper/getToast";
import { useAddOrganization } from "../hooks";
import { IOrganization } from "../types/IOrganization";
import { AxiosError } from "axios";
import InitializeForm from "./credentials";

type Props = {
  form: UseFormReturn<IOrganization>;
  onClose: () => void;
};
const AddOrganization = ({ form, onClose }: Props) => {
  const addOrganization = useAddOrganization();

  const handleinitializeOrganization = () => {
    <InitializeForm />;
  };
  const onSubmit: SubmitHandler<IOrganization> = async (data) => {
    try {
      await addOrganization.mutateAsync(data);
      Toast.success("Organization added successfully!");
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add organization" + error);
      }
    } finally {
      onClose();
    }
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex justify-center items-center border-rounded-lg bg-opacity-30 backdrop-blur-sm"
    >
      <div className="max-h-screen w-[30rem]">
        <div className="rounded-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="bg-white p-6 border-solid border-gray-200 border shadow-lg">
              <legend className="text-lg p-3 font-normal ">
                Add Organization
              </legend>
              <div className="mb-4">
                <InputElement
                  label="Organization Name"
                  name="name"
                  placeholder="Enter organization name"
                  customStyle="placeholder:text-red-300"
                  form={form}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Address"
                  name="address"
                  placeholder="Enter address"
                  customStyle="placeholder:text-red-300"
                  form={form}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  customStyle="placeholder:text-red-300"
                  form={form}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  customStyle="placeholder:text-red-300"
                  form={form}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Mobile Number"
                  name="mobileNumber"
                  type="tel"
                  placeholder="Enter mobile number"
                  customStyle="placeholder:text-red-300"
                  form={form}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Logo"
                  name="logo"
                  placeholder="Enter logo URL"
                  customStyle="placeholder:text-red-300"
                  form={form}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Province Id"
                  name="provinceId"
                  type="number"
                  placeholder="Enter province ID"
                  customStyle="placeholder:text-red-300"
                  form={form}
                />
              </div>
              <div className="flex items-center mt-4 flex-col">
                <ButtonElement
                  type="submit"
                  text="Submit"
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-200"
                  onClick={handleinitializeOrganization}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrganization;
