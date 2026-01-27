import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div>
      <h1>SideBar</h1>
      <h1>NavBar</h1>
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
