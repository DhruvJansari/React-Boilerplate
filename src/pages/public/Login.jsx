import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { login, authLoading, error, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    switch (user.role) {
      case "vendor":
        navigate("/vendor/dashboard", { replace: true });
        break;

      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;

      default:
        navigate("/login", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await login({ email, password });
      console.log("responce ", res);
      toast.success("Welcome Back!");
      navigate("/vendor/dashboard");
    } catch (err) {
      toast.error(err?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen w-full  bg-black flex items-center justify-center">
      <div className="w-full border-2 border-white max-w-6xl h-[600px] flex rounded-xl overflow-hidden shadow-2xl">
        {/* LEFT BRAND SECTION */}
        <div className="w-1/2 flex items-center justify-center bg-black">
          <div className="flex items-center gap-4">
            {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400" /> */}
            <h1 className="text-2xl font-light text-[#EAF6F6] tracking-wide">
              Welcome To Project Management.
            </h1>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-px bg-white/20" />

        {/* RIGHT LOGIN SECTION */}
        <div className="w-1/2 flex items-center justify-center  bg-black">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div className="text-center">
              <h2 className="text-2xl text-[#EAF6F6] font-light">Welcome</h2>
              <p className="mt-2 text-sm text-[#9FB5B5] uppercase tracking-widest">
                Please login to admin dashboard
              </p>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <input
              type="email"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-md bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-md bg-[#F47B20] text-white font-semibold tracking-wide hover:bg-orange-600 transition"
            >
              {authLoading ? "Logging in..." : "LOGIN"}
            </button>

            <div className="text-center text-sm text-[#9FB5B5] space-y-2">
              <p className="hover:text-white cursor-pointer transition">
                Forgotten your password?
              </p>

              <p>
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#F47B20] hover:underline hover:text-orange-400 transition"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
