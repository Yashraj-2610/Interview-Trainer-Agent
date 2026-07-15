import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Interview() {

    const { state } = useLocation();

    const [chat, setChat] = useState([
        {
            role: "assistant",
            text: state?.choices?.[0]?.message?.content || ""
        }
    ]);

    const [threadId, setThreadId] = useState(state.thread_id);

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const sendAnswer = async () => {

        if (!answer.trim()) return;

        const userAnswer = answer;

        setChat(prev => [
            ...prev,
            {
                role: "user",
                text: userAnswer
            }
        ]);

        setAnswer("");

        setLoading(true);

        try {

            const lastQuestion =
              [...chat]
                .reverse()
                .find(msg => msg.role === "assistant")?.text || "";

            const response = await api.post("/chat", {
                answer: userAnswer,
                thread_id: threadId,
                previous_question: lastQuestion
            });

            setThreadId(response.data.thread_id);

            setChat(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: response.data.choices[0].message.content
                }
            ]);

        } catch (err) {
            console.log(err);
        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl font-bold mb-8">
                AI Interview
            </h1>

            <div className="space-y-5">

                {chat.map((msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.role === "assistant"
                                ? "bg-slate-900 p-5 rounded-xl"
                                : "bg-blue-700 p-5 rounded-xl ml-20"
                        }
                    >

                        <p className="whitespace-pre-line">
                            {msg.text}
                        </p>

                    </div>

                ))}

            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendAnswer();
                }
              }}
              placeholder="Type your answer..."
              className="w-full mt-8 p-4 rounded-lg bg-slate-800"
              rows={5}
            />

            <button
              disabled={loading}
              onClick={sendAnswer}
              className="mt-5 px-8 py-3 bg-blue-600 rounded-lg disabled:bg-gray-600"
            >
              {loading ? "Thinking..." : "Submit Answer"}
            </button>

        </div>

    );

}

export default Interview;