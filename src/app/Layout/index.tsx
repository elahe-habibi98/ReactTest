import { FC } from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout: FC = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export { Layout };
