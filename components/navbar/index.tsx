import InputGroup from "@/globalComponents/inputGroup/input-group.component";
import { PROJECT_TITLE } from "@/utils/constant";
import { ChangeEvent, useState } from "react";
import { AiFillFacebook, AiOutlineSearch } from "react-icons/ai";
import styles from "./navbar.module.css";

interface NavbarProps {
  isLoggedIn: boolean;
}
export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [search, setSearch] = useState("");
  const handleSearchChange = (e: ChangeEvent<any>) => {
    setSearch(e.target.value);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <span>
          <AiFillFacebook />
        </span>
        <span>{PROJECT_TITLE}</span>
      </div>
      {isLoggedIn && (
        <div className={styles.navbar_search}>
          <InputGroup
            onChange={handleSearchChange}
            value={search}
            symbol={<AiOutlineSearch />}
            type="text"
            placeholder="Search for anything here..."
          />
        </div>
      )}
      <div className={styles.navbar_dropdown}>
        <button
          className="btn btn-default dropdown-toggle"
          type="button"
          id="myBtn"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          English UK
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li>English UK</li>
        </ul>
      </div>
    </div>
  );
}
