import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-3xl text-center text-[#EAF6F6] space-y-8">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-light tracking-wide">
          Welcome to Project Management
        </h1>

        {/* Message from Host */}
        <p className="text-lg text-[#9FB5B5] leading-relaxed">
          Hello, I’m{" "}
          <span className="text-white font-medium">Dhruv Jansari</span>, and I
          warmly welcome you to React Boilerplate code. This system is designed
          to help you to work without setup.
        </p>

        {/* CTA Buttons */}
        {!isAuthenticated && (
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 rounded-md bg-[#F47B20] text-white font-semibold tracking-wide hover:bg-orange-600 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 rounded-md border border-white/40 text-white font-semibold tracking-wide hover:bg-white hover:text-[#062E2E] transition"
            >
              Register
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="w-24 h-px bg-white/20 mx-auto" />

        {/* Footer Note */}
        <p className="text-sm text-[#9FB5B5] uppercase tracking-widest">
          Built with care by Dhruv Jansari 🚀
        </p>
      </div>
    </div>
  );
};

export default Home;
