import TitleHeader from "@/components/common/TitleHeader";
import { useState } from "react";
import { ButtonElement } from "@/components/FormComponents/Button";
import OrganizationForm from "../component/OrganizationForm";
import Initialize from "../component/Initialize";
import { Toast } from "@/helper/getToast";
import { useInitializeControllers } from "../hooks";
import Add from "./add";

const AllOrganization = () => {
  const [organization, setShowOrganization] = useState(false);
  const [initialize, setInitialize] = useState(false);

  const buttonElement = () => {
    return (
      <div className="flex space-x-4">
        <ButtonElement
          type="button"
          text="Add Organization"
          onClick={() => setShowOrganization(true)}
          className="!text-xs font-bold !bg-teal-500"
        />
        <ButtonElement
          type="button"
          text="Initialize"
          onClick={async () => {
            const isConfirmed = await Toast.question(
              "Do you want to continue?"
            );
            if (isConfirmed) {
              setInitialize(true);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useInitializeControllers();
              console.log("User confirmed initialization");
            } else {
              console.log("User canceled initialization");
            }
          }}
          className="!text-xs font-bold !bg-teal-500"
        />
      </div>
    );
  };

  return (
    <div>
      <TitleHeader title="All Organization" button={buttonElement()} />
      <OrganizationForm />
      <Add visible={organization} onClose={() => setShowOrganization(false)} />
      <Initialize visible={initialize} onClose={() => setInitialize(false)} />
    </div>
  );
};

export default AllOrganization;
