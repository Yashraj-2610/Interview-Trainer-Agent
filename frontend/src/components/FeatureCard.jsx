function FeatureCard({ title, description }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg hover:scale-105 transition">
      <h2 className="text-xl font-semibold text-blue-400">
        {title}
      </h2>

      <p className="text-gray-400 mt-3">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;