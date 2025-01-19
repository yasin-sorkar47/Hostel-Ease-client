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
      <MenuItem icon={FaUserCog} label="My Reviews" address="my-reviews" />
    </>
  );
};

export default UserMenu;
