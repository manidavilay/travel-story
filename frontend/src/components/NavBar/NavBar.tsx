import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosIntance";
import UserProfile from "../UserProfile/UserProfile";

const NavBar = () => {
  const [userName, setUserName] = useState<string>("");
  const [errorUser, setErrorUser] = useState<string>("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/get-user");
      if (response.data) {
        setUserName(response.data.user.fullName);
      }
    } catch {
      setErrorUser(
        "An error has occured and user data can't be fetched. Please try again."
      );
    }
  };

  const getInitials = (userName: string) => {
    if (!userName) return "";
    return userName
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join("");
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/authentication");
  };

  useEffect(() => {
    getUser();
    getInitials(userName);
  }, [userName]);

  return (
    <nav className="flex justify-between items-center w-full py-4 px-6 bg-white drop-shadow sticky top-0 z-10">
      <div className="text-3xl font-bold text-indigo-800">TRAVEL STORY</div>
      <div className="flex items-center text-lg text-indigo-800">
        {isAuthenticated && (
          <UserProfile
            getInitials={getInitials}
            userName={userName}
            errorUser={errorUser}
            handleLogOut={handleLogOut}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
