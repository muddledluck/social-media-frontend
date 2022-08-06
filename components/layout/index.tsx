import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";
interface LayoutInterface {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<LayoutInterface> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("token");
    console.log(item, !!item);
    setIsLoggedIn(!!item);
  }, []);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {isLoggedIn && <Sidebar />}
      <div className={styles.customContainer}>{children}</div>
    </>
  );
};

export default Layout;
