import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../utils/supabase"

const AuditPage = () => {

  const { id } = useParams()

  const [audit, setAudit] = useState(null)

  useEffect(() => {

    const fetchAudit = async () => {

      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.log(error)
      } else {
        setAudit(data)
      }
    }

    fetchAudit()

  }, [id])

  if (!audit) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">
        Loading Audit...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-bold">
          Shared Audit Report
        </h1>

        <p className="text-2xl text-gray-500 mt-5">
          Estimated Savings
        </p>

        <h2 className="text-7xl font-bold text-green-700 mt-4">
          ${audit.savings}
        </h2>

        <div className="mt-16 space-y-6">

          {
            audit.tools.map((tool, index) => (

              <div
                key={index}
                className="bg-white border border-gray-300 rounded-3xl p-8"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-4xl font-semibold">
                      {tool.name}
                    </h2>

                    <p className="text-gray-500 mt-3 text-lg">
                      {tool.audit.reason}
                    </p>

                  </div>

                  <div className="text-right">

                    <h1 className="text-5xl font-bold text-green-700">
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

    </div>
  )
}

export default AuditPage