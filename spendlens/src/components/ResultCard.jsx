const ResultCard = ({ result, tool }) => {

  return (
    <div className="mt-16 bg-[#111111] text-white p-10 rounded-3xl">

      <p className="uppercase tracking-widest text-gray-500 text-sm">
        Audit Result
      </p>

      <h1 className="text-5xl font-bold mt-4">
        {tool.name}
      </h1>

      <div className="mt-10">

        <h2 className="text-6xl font-bold text-green-400">
          ${result.savings}
        </h2>

        <p className="text-gray-400 mt-3 text-xl">
          Estimated Monthly Savings
        </p>

      </div>

      <div className="mt-10 bg-black border border-gray-800 p-6 rounded-2xl">

        <h3 className="text-2xl font-semibold text-blue-400">
          {result.recommendation}
        </h3>

        <p className="text-gray-400 mt-4 text-lg leading-relaxed">
          {result.reason}
        </p>

      </div>

    </div>
  )
}

export default ResultCard