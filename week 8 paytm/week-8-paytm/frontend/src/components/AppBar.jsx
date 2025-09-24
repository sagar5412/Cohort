import { useNavigate } from "react-router-dom";
export function AppBar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between items-center shadow h-14 rounded-2xl">
      <div className="flex justify-center items-center ml-4 h-full">
        PayTM App
      </div>
      <div className="flex flex-row h-full justify-center items-center">
        <div className="flex items-center">
          <button
            onClick={(e) => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
        <div className="w-12 h-12 flex text-black m-2 justify-center items-center rounded-full bg-slate-200 mr-4 text-xl">
          U
        </div>
      </div>
    </div>
  );
}
