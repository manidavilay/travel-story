import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosIntance";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  const [userName, setUserName] = useState<string>("");

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/get-user");
      if (response.data) {
        setUserName(response.data.user.fullName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <NavBar userName={userName} />
    </div>
  );
};

export default Home;
