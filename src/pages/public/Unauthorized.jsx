import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full border-2 border-white rounded-xl p-10 text-center shadow-2xl">
        <h1 className="text-6xl font-light text-[#EAF6F6]">403</h1>

        <h2 className="mt-4 text-2xl text-[#EAF6F6] font-light">
          Unauthorized Access
        </h2>

        <p className="mt-4 text-sm text-[#9FB5B5] leading-relaxed">
          You don’t have permission to access this page.
          <br />
          Please contact your administrator or login with a different account.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-md border border-white text-[#EAF6F6] hover:bg-white hover:text-[#062E2E] transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-md bg-[#F47B20] text-white hover:bg-orange-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
