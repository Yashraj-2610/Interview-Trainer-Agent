import { useLocation } from "react-router-dom";

function Interview() {

  const { state } = useLocation();

  if (!state) {
    return (
      <h1 className="text-center mt-20 text-2xl">
        No interview data found.
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Interview Questions
      </h1>

      <p className="mb-8">
        Candidate: {state.candidate}
      </p>

      <div className="space-y-4">

        {state.questions.map((question, index) => (

          <div
            key={index}
            className="bg-slate-900 p-5 rounded-lg"
          >
            <h2 className="font-semibold">
              Question {index + 1}
            </h2>

            <p className="mt-2">
              {question}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}

export default Interview;