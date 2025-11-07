import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card } from "@fluentui/react-components";
import { InputElement } from "@/components/FormComponents/input";

interface IInitializeResponse {
  username: string;
  password: string;
  message: string;
}

const fetchInitialize = async (): Promise<IInitializeResponse> => {
  const res = await fetch("/api/InitializeControllers");
  if (!res.ok) throw new Error("Failed to fetch initialization data");
  return res.json();
};

export default function InitializeForm() {
  const { data, isLoading, error } = useQuery<IInitializeResponse>({
    queryKey: ["initialize"],
    queryFn: fetchInitialize,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">Failed to load credentials.</p>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-6 p-6 shadow-md rounded-2xl">
      <h2 className="text-lg font-semibold text-center mb-4">
        Initialization Details
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <InputElement value={data?.username ?? ""} readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <InputElement type="password" value={data?.password ?? ""} readOnly />
        </div>

        {data?.message && (
          <p className="text-green-600 font-medium text-center mt-2">
            {data.message}
          </p>
        )}
      </div>
    </Card>
  );
}
