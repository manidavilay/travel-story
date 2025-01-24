interface Props {
  getInitials: (name: string) => string;
  userName: string;
  errorUser?: string;
  handleLogOut: () => void;
}

const UserProfile = ({
  getInitials,
  userName,
  errorUser,
  handleLogOut,
}: Props) => {
  return errorUser ? (
    <p className="mb-3 text-red-500 text-sm">{errorUser}</p>
  ) : (
    <>
      <div className="flex justify-center items-center mr-3 p-3 border-2 border-indigo-800 bg-indigo-100 rounded-full">
        {getInitials(userName)}
      </div>
      <div className="flex flex-col items-end">
        <p className="font-bold">{userName}</p>
        <button className="hover:underline" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </>
  );
};

export default UserProfile;
