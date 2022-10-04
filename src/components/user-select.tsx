import React from "react";
import IdSelect from "./id-select";
import { useUser } from "utils/users";

const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props} />;
};

export default UserSelect;
