import { useState, useEffect } from "react"
import { runAudit } from "../utils/auditEngine"
import ResultCard from "./ResultCard"
import LeadCapture from "./LeadCapture"
import AISummary from "./AISummary"

const tools = [
  { name: "Cursor", short: "Cu", color: "bg-gray-200" },
  { name: "GitHub Copilot", short: "GH", color: "bg-gray-200" },
  { name: "Claude", short: "Cl", color: "bg-yellow-100 text-yellow-700" },
  { name: "ChatGPT", short: "OA", color: "bg-green-100 text-green-700" },
  { name: "Gemini", short: "Gm", color: "bg-blue-100 text-blue-700" },
  { name: "Windsurf", short: "Ws", color: "bg-purple-100 text-purple-700" },
]

const SpendForm = () => {

  const [selectedTool, setSelectedTool] = useState("")

  const [formData, setFormData] = useState({
    plan: "",
    monthlySpend: "",
    seats: "",
    teamSize: 5,
    useCase: "Mixed",
  })

  const [result, setResult] = useState(null)

  const [toolStack, setToolStack] = useState([])

  // Load Saved Data
  useEffect(() => {

    const savedData = localStorage.getItem("spendlens-form")

    if (savedData) {

      const parsedData = JSON.parse(savedData)

      setFormData(parsedData)

      if (parsedData.selectedTool) {
        setSelectedTool(parsedData.selectedTool)
      }
    }

  }, [])

  // Save Data
  useEffect(() => {

    localStorage.setItem(
      "spendlens-form",
      JSON.stringify({
        ...formData,
        selectedTool,
      })
    )

  }, [formData, selectedTool])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Submit
  const handleSubmit = (e) => {

    e.preventDefault()

    const toolData = {
      name: selectedTool,
      plan: formData.plan,
      monthlySpend: Number(formData.monthlySpend),
      seats: Number(formData.seats),
      teamSize: Number(formData.teamSize),
    }

    const auditResult = runAudit(toolData)

    const newTool = {
      ...toolData,
      audit: auditResult,
    }

    setToolStack([...toolStack, newTool])

    setResult(auditResult)
  }

  // Total Savings
  const totalSavings = toolStack.reduce(
    (acc, tool) => acc + tool.audit.savings,
    0
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-black bg-[#f5f3ef] rounded-3xl mt-16 mb-20">

      {/* Logo */}
      <div className="flex items-center gap-4 mb-6">

        <div className="w-12 h-12 rounded-xl bg-green-900 text-white flex items-center justify-center text-xl font-bold">
          S
        </div>

        <h1 className="text-4xl font-semibold">
          SpendLens
        </h1>

      </div>

      <p className="text-gray-500 text-lg mb-10">
        Free AI tool spend audit — no signup required
      </p>

      {/* Heading */}
      <h1 className="text-6xl font-semibold leading-tight max-w-4xl">
        Find out where your team is overpaying for AI tools
      </h1>

      <p className="text-2xl text-gray-500 mt-8 max-w-4xl leading-relaxed">
        Enter your current AI subscriptions. Get an instant audit with savings recommendations backed by real pricing data.
      </p>

      {/* Progress */}
      <div className="border-t border-gray-300 mt-16 pt-14">

        <div className="flex gap-4 mb-10">
          <div className="h-2 rounded-full bg-green-900 w-1/3"></div>
          <div className="h-2 rounded-full bg-gray-300 w-1/3"></div>
          <div className="h-2 rounded-full bg-gray-300 w-1/3"></div>
        </div>

        <p className="uppercase tracking-widest text-gray-400 text-sm mb-8">
          Step 1 of 3 — Select your AI tools
        </p>

        {/* Tool Cards */}
        <div className="space-y-5">

          {
            tools.map((tool) => (

              <div
                key={tool.name}
                onClick={() => setSelectedTool(tool.name)}
                className={`bg-white border rounded-3xl p-6 flex items-center justify-between cursor-pointer transition-all ${
                  selectedTool === tool.name
                    ? "border-green-800"
                    : "border-gray-300"
                }`}
              >

                <div className="flex items-center gap-5">

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-semibold ${tool.color}`}>
                    {tool.short}
                  </div>

                  <h2 className="text-3xl font-medium">
                    {tool.name}
                  </h2>

                </div>

                <div
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedTool === tool.name
                      ? "bg-green-900 border-green-900"
                      : "border-gray-300"
                  }`}
                >
                </div>

              </div>

            ))
          }

        </div>

      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-16">

        <div className="border-t border-gray-300 pt-12">

          <h2 className="uppercase tracking-widest text-gray-400 text-sm mb-10">
            Team Context
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            {/* Team Size */}
            <div>

              <label className="text-gray-600 block mb-4 text-xl">
                Total team size
              </label>

              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full bg-[#1f1f1f] text-white p-5 rounded-2xl text-3xl"
              />

            </div>

            {/* Use Case */}
            <div>

              <label className="text-gray-600 block mb-4 text-xl">
                Primary use case
              </label>

              <div className="flex flex-wrap gap-4">

                {
                  ["Coding", "Writing", "Data", "Research", "Mixed"].map((item) => (

                    <button
                      type="button"
                      key={item}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          useCase: item,
                        })
                      }
                      className={`px-6 py-3 rounded-full border text-lg ${
                        formData.useCase === item
                          ? "bg-green-900 text-white border-green-900"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {item}
                    </button>

                  ))
                }

              </div>

            </div>

          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <input
              type="text"
              name="plan"
              placeholder="Current Plan"
              value={formData.plan}
              onChange={handleChange}
              className="p-5 rounded-2xl bg-white border border-gray-300 text-xl"
            />

            <input
              type="number"
              name="monthlySpend"
              placeholder="Monthly Spend ($)"
              value={formData.monthlySpend}
              onChange={handleChange}
              className="p-5 rounded-2xl bg-white border border-gray-300 text-xl"
            />

            <input
              type="number"
              name="seats"
              placeholder="Seats"
              value={formData.seats}
              onChange={handleChange}
              className="p-5 rounded-2xl bg-white border border-gray-300 text-xl"
            />

          </div>

          {/* Submit */}
          <div className="flex justify-end mt-12">

            <button
              type="submit"
              className="bg-green-900 hover:bg-green-800 text-white px-10 py-5 rounded-2xl text-xl font-medium"
            >
              Add Tool →
            </button>

          </div>

        </div>

      </form>

      {/* Dashboard */}
      {
        toolStack.length > 0 && (

          <div className="mt-20 bg-black text-white p-10 rounded-3xl">

            <p className="uppercase tracking-widest text-gray-500 text-sm">
              Audit Dashboard
            </p>

            <h1 className="text-6xl font-bold mt-6 text-green-400">
              ${totalSavings}
            </h1>

            <p className="text-gray-400 text-xl mt-3">
              Total Estimated Monthly Savings
            </p>

            <div className="mt-12 space-y-6">

              {
                toolStack.map((tool, index) => (

                  <div
                    key={index}
                    className="bg-[#1b1b1b] border border-gray-800 rounded-2xl p-6"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h2 className="text-3xl font-semibold">
                          {tool.name}
                        </h2>

                        <p className="text-gray-400 mt-2">
                          {tool.audit.reason}
                        </p>

                      </div>

                      <div className="text-right">

                        <h1 className="text-4xl font-bold text-green-400">
                          ${tool.audit.savings}
                        </h1>

                        <p className="text-gray-500">
                          savings
                        </p>

                      </div>

                    </div>

                  </div>

                ))
              }

            </div>

          </div>

        )
      }

      {/* AI Summary */}
      {
        toolStack.length > 0 && (
          <AISummary
            toolStack={toolStack}
            totalSavings={totalSavings}
          />
        )
      }

      {/* Lead Capture */}
      {
        toolStack.length > 0 && (
          <LeadCapture totalSavings={totalSavings} />
        )
      }

      {/* Single Result */}
      {
        result && (
          <ResultCard
            result={result}
            tool={{ name: selectedTool }}
          />
        )
      }

    </div>
  )
}

export default SpendForm