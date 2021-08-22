import "./topbar.scss";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import LanguageIcon from "@material-ui/icons/Language";
import SettingsIcon from "@material-ui/icons/Settings";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";

const Topbar = () => {
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch(logout(null));
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon className="icon" />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon className="icon" />
            <span className="topIconBadge">1</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon className="icon" />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
