import { NAVBAR_ITEMS } from "@/components/sidebar/utils/helper";
import { updateIsLoggedInStatus } from "@/slice/userSlices";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "store/store";
import styles from "./sidebar.module.css";
export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(updateIsLoggedInStatus(false));
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    // window.location.reload();
  };
  return (
    <div className={styles.sidebar}>
      {NAVBAR_ITEMS.map((item) => {
        if (item.path) {
          return (
            <Link href={item.path} key={item.key}>
              <a className={router.asPath === item.path ? styles.active : ""}>
                <span>{item.icon}</span> {item.title}
              </a>
            </Link>
          );
        } else {
          return (
            <a
              className={router.asPath === item.path ? styles.active : ""}
              onClick={() => handleLogout()}
              key={item.key}
            >
              <span>{item.icon}</span> {item.title}
            </a>
          );
        }
      })}
    </div>
  );
}
