export const runAudit = (tool) => {

  let recommendation = ""
  let savings = 0
  let reason = ""

  // Cursor Logic
  if (
    tool.name === "Cursor" &&
    tool.plan === "Business" &&
    tool.seats <= 2
  ) {
    recommendation = "Downgrade to Cursor Pro"
    savings = 20 * tool.seats
    reason = "Business plan is unnecessary for small teams."
  }

  // ChatGPT Logic
  else if (
    tool.name === "ChatGPT" &&
    tool.plan === "Team" &&
    tool.teamSize < 3
  ) {
    recommendation = "Switch to ChatGPT Plus"
    savings = 10 * tool.seats
    reason = "Team plan costs more than needed."
  }

  // High Spend Logic
  else if (tool.monthlySpend > 500) {
    recommendation = "Use discounted AI credits"
    savings = Math.floor(tool.monthlySpend * 0.25)
    reason = "Large AI spend qualifies for infrastructure discounts."
  }

  // Default
  else {
    recommendation = "Current setup looks optimized"
    savings = 0
    reason = "No major overspending detected."
  }

  return {
    recommendation,
    savings,
    reason,
  }
}