import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Setup() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    experience: "",
    interviewType: "Mixed",
    resume: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/generate-interview", {
            name: formData.name,
            role: formData.role,
            experience: formData.experience,
            interviewType: formData.interviewType,
        });

        console.log("Backend Response:", response.data);

        alert("Questions generated successfully!");

        navigate("/interview", {
            state: response.data,
        });

    } catch (error) {
    console.error("FULL ERROR:", error);

    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
    }

    alert("Unable to connect to backend.");
    }
};

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-6">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 w-full max-w-xl rounded-xl p-8 shadow-lg"
      >

        <h1 className="text-3xl text-white font-bold mb-8 text-center">
          Interview Setup
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Job Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          >
            <option value="">Experience Level</option>
            <option>Fresher</option>
            <option>0-2 Years</option>
            <option>2-5 Years</option>
            <option>5+ Years</option>
          </select>

          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white"
          >
            <option>HR</option>
            <option>Technical</option>
            <option>Behavioral</option>
            <option>Mixed</option>
          </select>

          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full text-gray-300"
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg text-white font-semibold"
          >
            Generate Interview
          </button>

        </div>

      </form>

    </div>
  );
}

export default Setup;