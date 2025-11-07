import { useEffect, useState } from "react";
import { IOrganization } from "../types/IOrganization";
import { useGetAllOrganization } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Pagination from "@/hooks/pagination";
import { EditButton } from "@/components/common/EditButton";
import { ButtonElement } from "@/components/FormComponents/Button";
import { DeleteButton } from "@/components/common/DeleteButton";
import { useRemoveOrganization } from "../hooks";
import { Edit } from "lucide-react";
import EditOrganization from "../pages/Edit";

const OrganizationForm = () => {
  const [organizations, setShowOrganizations] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isLoading] = useState(false);
  const [state, setState] = useState({
    loading: true,
    organizations: [] as IOrganization[],
    errorMessage: "",
  });
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 2,
    pageIndex: 1,
    isPagination: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const updateState = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const query = `?pageSize=${paginationParams.pageSize}&pageIndex=${paginationParams.pageIndex}&IsPagination=${paginationParams.isPagination}`;
  const { data, error, refetch } = useGetAllOrganization(query);

  useEffect(() => {
    if (data?.Items) {
      updateState({
        loading: false,
        organizations: data.Items,
        errorMessage: "",
      });
    } else if (error) {
      updateState({
        loading: false,
        organizations: [],
        errorMessage: "Failed to fetch organization",
      });
    }
  }, [data, error]);
  const { mutate: deleteOrganization } = useRemoveOrganization();
  const handleDelete = (id: string | undefined) => {
    deleteOrganization(id, {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        alert("Failed to delete organization");
      },
    });
  };

  const handleSubmit = useForm<{
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  }>({
    defaultValues: {},
  });

  useEffect(() => {
    refetch();
  }, [paginationParams, refetch]);

  const handleSearch = (params: typeof paginationParams) => {
    setPaginationParams(params);
    setState((prev) => ({ ...prev, loading: true, organizations: [] }));
  };

  const buttonElement = (id: string) => {
    return (
      <ButtonElement
        icon={<Edit size={14} />}
        type="button"
        text=""
        onClick={() => {
          setShowOrganizations(true);
          setSelectedId(id);
        }}
        className="!text-xs font-bold !bg-teal-500"
      />
    );
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error.message}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              {[
                "SN",
                "Name",
                "Address",
                "Email",
                "Phone",
                "Mobile",
                "Province ID",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className="p-3 text-xs sm:text-sm lg:text-base font-semibold border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state?.organizations?.length > 0 ? (
              state?.organizations
                .slice(0, 1)
                .map((organization: IOrganization, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      {index + 1}
                    </td>
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      {organization.name}
                    </td>
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      {organization.address}
                    </td>
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      {organization.email}
                    </td>
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      {organization.phoneNumber}
                    </td>
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      {organization.mobileNumber}
                    </td>
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      {organization.provinceId}
                    </td>
                    <td className="p-3 text-xs sm:text-sm lg:text-base border-b">
                      <div className="flex space-x-2">
                        <DeleteButton
                          handleDelete={() => handleDelete(organization.id)}
                          isLoading={isLoading}
                        />
                        <EditButton
                          button={buttonElement(organization.id ?? "")}
                        />
                        {selectedId ? (
                          <EditOrganization
                            visible={organizations}
                            onClose={() => setShowOrganizations(false)}
                            organizationsId={selectedId}
                            currentPageIndex={paginationParams.pageIndex}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="p-4 text-center text-sm text-gray-500"
                >
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {state.organizations.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: data?.PageIndex,
            firstPage: data?.FirstPage,
            lastPage: data?.LastPage,
            nextPage: data?.NextPage,
            previousPage: data?.PreviousPage,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default OrganizationForm;
