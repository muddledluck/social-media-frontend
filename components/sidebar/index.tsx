import { NAVBAR_ITEMS } from "@/components/sidebar/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./sidebar.module.css";
export default function Sidebar() {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      {NAVBAR_ITEMS.map((item) => (
        <Link href={item.path} key={item.key}>
          <a className={router.asPath === item.path ? styles.active : ""}>
            <span>{item.icon}</span> {item.title}
          </a>
        </Link>
      ))}
    </div>
  );
}
