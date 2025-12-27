import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white">Vendor Sidebar</aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
