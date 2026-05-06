import { useState } from "react"
import { supabase } from "../utils/supabase"

const LeadCapture = ({ totalSavings }) => {

  const [leadData, setLeadData] = useState({
    email: "",
    company: "",
    role: "",
  })

  const handleChange = (e) => {
    setLeadData({
      ...leadData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          email: leadData.email,
          company: leadData.company,
          role: leadData.role,
        },
      ])

    if (error) {
      console.log(error)
      alert("Something went wrong")
    } else {
      alert("Lead saved successfully!")
    }
  }

  return (
    <div className="mt-20 bg-[#111111] text-white p-10 rounded-3xl">

      <h1 className="text-5xl font-bold">
        Save Your Audit Report
      </h1>

      <p className="text-gray-400 text-xl mt-4 max-w-2xl">
        Get your AI spend audit delivered to your inbox.
      </p>

      {
        totalSavings > 500 && (
          <div className="mt-8 bg-green-900/30 border border-green-700 p-6 rounded-2xl">

            <h2 className="text-2xl font-semibold text-green-400">
              You may qualify for discounted AI credits through Credex
            </h2>

            <p className="text-gray-300 mt-3">
              Your current AI spend is high enough for enterprise savings opportunities.
            </p>

          </div>
        )
      }

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">

        <input
          type="email"
          name="email"
          placeholder="Work Email"
          value={leadData.email}
          onChange={handleChange}
          className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-xl"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={leadData.company}
          onChange={handleChange}
          className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-xl"
        />

        <input
          type="text"
          name="role"
          placeholder="Your Role"
          value={leadData.role}
          onChange={handleChange}
          className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-xl"
        />

        <button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 p-5 rounded-2xl text-xl font-semibold"
        >
          Save Audit Report
        </button>

      </form>

    </div>
  )
}

export default LeadCapture