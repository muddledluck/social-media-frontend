import InputGroup from "@/globalComponents/inputGroup/input-group.component";
import { PROJECT_TITLE } from "@/utils/constant";
import { ChangeEvent, useState } from "react";
import { AiFillFacebook, AiOutlineSearch } from "react-icons/ai";
import ICONS from "@/globalComponents/icons";
import styles from "./navbar.module.css";
import { useDispatch } from "react-redux";
import { updateIsOpenSidebar } from "@/slice/generalSlices";
import { useSelector } from "store/store";

const { ListSidebar } = ICONS;

interface NavbarProps {
  isLoggedIn: boolean;
}
export default function Navbar({ isLoggedIn }: NavbarProps) {
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector((state) => state.general);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleSearchChange = (e: ChangeEvent<any>) => {
    setSearch(e.target.value);
  };

  const handleToggleNavbar = () => {
    dispatch(updateIsOpenSidebar(!isOpenSidebar));
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <span>{/* <AiFillFacebook /> */}</span>
        <span>{PROJECT_TITLE}</span>
      </div>
      <a
        className={`${styles.md_list_icon} d-lg-none d-md-none d-block`}
        onClick={handleToggleNavbar}
      >
        <ListSidebar onClick={toggle} />
      </a>

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
