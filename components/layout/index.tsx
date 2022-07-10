import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import styles from "./layout.module.css";
interface LayoutInterface {
  children: React.ReactNode | React.ReactNode[];
}

const isLoggedIn = true;
const Layout: React.FC<LayoutInterface> = ({ children }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {isLoggedIn && <Sidebar />}
      <div className={styles.customContainer}>{children}</div>
    </>
  );
};

export default Layout;
