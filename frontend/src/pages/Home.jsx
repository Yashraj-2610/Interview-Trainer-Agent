import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <Hero />

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl text-center font-bold text-white mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Personalized Questions"
            description="Generate interview questions tailored to your job role, experience level, and profile."
          />

          <FeatureCard
            title="RAG Knowledge Retrieval"
            description="Retrieve interview questions, HR guidelines, and industry expectations from trusted knowledge sources."
          />

          <FeatureCard
            title="AI Feedback"
            description="Receive model answers, improvement tips, and interview preparation guidance after every session."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl text-center font-bold text-white mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-blue-400 text-xl font-semibold mb-3">
              1. Enter Your Profile
            </h3>

            <p className="text-gray-400">
              Provide your name, job role, experience level, and optionally
              upload your resume.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-blue-400 text-xl font-semibold mb-3">
              2. AI Generates Questions
            </h3>

            <p className="text-gray-400">
              The AI retrieves role-specific HR, technical, and behavioral
              interview questions using RAG.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-blue-400 text-xl font-semibold mb-3">
              3. Practice & Improve
            </h3>

            <p className="text-gray-400">
              Answer the questions and receive model answers, feedback, and
              improvement suggestions.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;