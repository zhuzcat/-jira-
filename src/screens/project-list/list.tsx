import { User } from "types/user";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

const List = () => {
  return <div></div>;
};
export default List;
