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
interface LayoutInterface {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<LayoutInterface> = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedInStatus = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    // Perform localStorage action
    const item = AccessToken.isStored() && RefreshToken.isStored();
    setIsLoggedIn(item);
    dispatch(updateIsLoggedInStatus(item));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AccessToken.isStored(), RefreshToken.isStored(), isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserDetailsThunk());
    }
  }, [dispatch, isLoggedIn]);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {isLoggedIn && <Sidebar />}
      <div className={styles.customContainer}>{children}</div>
    </>
  );
};

export default Layout;
