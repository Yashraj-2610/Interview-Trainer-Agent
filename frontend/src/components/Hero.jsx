import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-5xl font-bold text-white">
        AI Interview Trainer Agent
      </h1>

      <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
        Practice smarter with personalized interview questions, AI-powered
        feedback, and Retrieval-Augmented Generation (RAG) using IBM watsonx.
      </p>

      <Link
        to="/setup"
        className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl transition"
      >
        Start Mock Interview
      </Link>
    </section>
  );
}

export default Hero;