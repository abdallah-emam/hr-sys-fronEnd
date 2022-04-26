import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main className="App">
      {/* Outlit represent all the children of of the layout, so anything nisr=ted inside the layout component is represented bt the outlit */}
      <Outlet />
    </main>
  );
};

export default Layout;
