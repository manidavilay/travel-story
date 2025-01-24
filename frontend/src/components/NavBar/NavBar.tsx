import { useNavigate } from "react-router";

interface Props {
  userName: string;
}

const NavBar = ({ userName }: Props) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/authentication");
  };

  return (
    <nav className="flex justify-between items-center w-full py-4 px-6 bg-indigo-100">
      <div className="text-3xl font-bold text-indigo-800">TRAVEL STORY</div>
      <div className="flex flex-col text-lg text-indigo-800">
        <p className="font-bold">{userName}</p>
        <button className="hover:underline" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
