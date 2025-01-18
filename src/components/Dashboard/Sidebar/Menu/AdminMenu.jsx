import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaUserCog} label="Add Meal" address="add-meal" />
      <MenuItem icon={FaUserCog} label="All Meals" address="all-meals" />
    </>
  );
};

export default AdminMenu;
