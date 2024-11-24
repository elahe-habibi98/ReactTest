import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@app/Layout";
import { EditUserPage } from "@screens/EditUser";
import { HomePage } from "@screens/Home";

const RouterConfig: FC = (): JSX.Element => {
  const router = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/info/:id", element: <EditUserPage /> },
      ],
    },
  ];
  const routerData = createBrowserRouter(router);

  return <RouterProvider router={routerData} />;
};

export { RouterConfig };
