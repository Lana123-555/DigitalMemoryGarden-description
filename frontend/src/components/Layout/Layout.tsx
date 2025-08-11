import { Outlet, useLocation } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

import css from "./Layout.module.css";
import clsx from "clsx";

export default function Layout() {
  const currentRoute = useLocation().pathname;

  return (
    <>
      <Header />

      <main
        className={clsx(
          css.container,
          css[`${currentRoute.replace("/", "")}Container`]
        )}
      >
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
