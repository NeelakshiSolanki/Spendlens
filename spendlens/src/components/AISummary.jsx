const AISummary = ({ toolStack, totalSavings }) => {

  const highSavings =
    totalSavings > 1000

  return (
    <div className="mt-20 bg-white border border-gray-300 p-10 rounded-3xl">

      <p className="uppercase tracking-widest text-gray-400 text-sm">
        AI Summary
      </p>

      <h1 className="text-5xl font-bold mt-5 leading-tight">
        Your AI spending audit is complete
      </h1>

      <div className="mt-10 space-y-6 text-xl text-gray-700 leading-relaxed">

        <p>
          Based on your current AI stack,
          your team may be overspending on
          overlapping subscriptions and unused seats.
        </p>

        <p>
          Estimated monthly savings:
          <span className="font-bold text-green-700">
            {" "} ${totalSavings}
          </span>
        </p>

        {
          highSavings && (
            <div className="bg-green-100 border border-green-300 p-6 rounded-2xl">

              <h2 className="text-2xl font-semibold text-green-800">
                High Savings Opportunity
              </h2>

              <p className="mt-3 text-green-700">
                Your current AI infrastructure spend is high enough
                to qualify for enterprise optimization opportunities.
              </p>

            </div>
          )
        }

        <div className="bg-[#f5f3ef] p-6 rounded-2xl">

          <h2 className="text-2xl font-semibold mb-4">
            Recommendations
          </h2>

          <ul className="space-y-3 list-disc ml-6">

            {
              toolStack.map((tool, index) => (

                <li key={index}>
                  {tool.audit.reason}
                </li>

              ))
            }

          </ul>

        </div>

      </div>

    </div>
  )
}

export default AISummary