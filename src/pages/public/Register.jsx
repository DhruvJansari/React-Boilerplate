import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const { signup, authLoading, error } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await signup({ name, email, password });

      toast.success("Signup Success");

      navigate("/login");
    } catch (err) {
      toast.error(err?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <div className="w-full border-2 border-white max-w-6xl h-[600px] flex rounded-xl overflow-hidden shadow-2xl">
        {/* LEFT BRAND SECTION */}
        <div className="w-1/2 flex items-center justify-center bg-black">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-light text-[#EAF6F6] tracking-wide">
              Welcome To Project Management.
            </h1>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-px bg-white/20" />

        {/* RIGHT SIGNUP SECTION */}
        <div className="w-1/2 flex items-center justify-center bg-black">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div className="text-center">
              <h2 className="text-2xl text-[#EAF6F6] font-light">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-[#9FB5B5] uppercase tracking-widest">
                Signup to access dashboard
              </p>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-md bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
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
              {authLoading ? "Creating account..." : "SIGN UP"}
            </button>

            <p
              onClick={() => navigate("/login")}
              className="text-center text-sm text-[#9FB5B5] hover:text-white cursor-pointer transition"
            >
              Already have an account? Login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
