import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label="Requested Meals"
        address="requested-meals"
      />
    </>
  );
};

export default UserMenu;
