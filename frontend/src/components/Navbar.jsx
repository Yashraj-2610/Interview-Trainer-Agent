import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-400">
          Interview Trainer Agent
        </h1>

        <Link
          to="/setup"
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition"
        >
          Start Interview
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;