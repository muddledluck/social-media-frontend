import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AccessToken, RefreshToken } from "@/helpers/persistStorageHelper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "store/store";
import {
  getUserDetailsThunk,
  updateIsLoggedInStatus,
} from "@/slice/userSlices";
import styles from "./layout.module.css";
import { hasCookie } from "cookies-next";
import Router from "next/router";
interface LayoutInterface {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<LayoutInterface> = ({ children }) => {
  const dispatch = useDispatch();

  const isLoggedInStatus = useSelector((state) => state.user.isLoggedIn);
  const accessToken = hasCookie("accessToken");
  const refreshToken = hasCookie("refreshToken");
  useEffect(() => {
    // Perform localStorage action
    const item = !!accessToken && !!refreshToken;
    dispatch(updateIsLoggedInStatus(item));
  }, [accessToken, dispatch, refreshToken]);

  useEffect(() => {
    if (isLoggedInStatus) {
      dispatch(getUserDetailsThunk());
      Router.push("/");
    } else {
      Router.push("/sign-in");
    }
  }, [dispatch, isLoggedInStatus]);
  return (
    <>
      <Navbar isLoggedIn={isLoggedInStatus} />
      {isLoggedInStatus && <Sidebar />}
      <div className={styles.customContainer}>{children}</div>
    </>
  );
};

export default Layout;
