"use client";
import { useGetUserByRoleId } from "../../user/hooks";
import { useEffect } from "react";

interface Props {
  roleId: string;
}

const AssignedUser = ({ roleId }: Props) => {
  const { data: users, refetch } = useGetUserByRoleId(roleId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-wrap">
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user.Id} className="pl-1 ">
            <div className="text-md font-medium ">{user.UserName},</div>
          </div>
        ))
      ) : (
        <div className=" pl-1 text-gray-500">Users Not Found</div>
      )}
    </div>
  );
};

export default AssignedUser;
