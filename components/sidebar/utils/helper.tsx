import { BiBell, BiGroup, BiMessageMinus, BiLogOut } from "react-icons/bi";
import { IoEarthOutline, IoSettingsOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineWidgets } from "react-icons/md";

interface NavbarItemInterface {
  key: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}
export const NAVBAR_ITEMS: NavbarItemInterface[] = [
  {
    key: "feed",
    title: "Feed",
    path: "/",
    icon: <MdOutlineWidgets />,
  },
  {
    key: "my_community",
    title: "My Community",
    path: "/my-community",
    icon: <BiGroup />,
  },
  {
    key: "messages",
    title: "Messages",
    path: "/message",
    icon: <BiMessageMinus />,
  },
  {
    key: "notification",
    title: "Notification",
    path: "/notification",
    icon: <BiBell />,
  },
  {
    key: "explore",
    title: "Explore",
    path: "/explore",
    icon: <IoEarthOutline />,
  },
  {
    key: "profile",
    title: "Profile",
    path: "/profile",
    icon: <BsFillPersonFill />,
  },
  {
    key: "settings",
    title: "Settings",
    path: "/settings",
    icon: <IoSettingsOutline />,
  },
  {
    key: "logout",
    title: "Logout",
    path: "/logout",
    icon: <BiLogOut />,
  },
];
