export default function HowItWorks() {
  const steps = [
    { icon: "⚙️", num: "01", title: "Configure Your Vault",
      desc: "Enter recipient address, set a future unlock date, deposit ETH, and add an optional encrypted message." },
    { icon: "⛓️", num: "02", title: "Immutable On-Chain Lock",
      desc: "Your vault deploys as a smart contract. The EVM enforces the time-lock — nobody can bypass it." },
    { icon: "🔓", num: "03", title: "Automatic Claim",
      desc: "When the unlock time arrives, the recipient claims in one transaction. Funds transfer instantly." }
  ]
  return (
    <section className="hiw" id="how">
      <div className="section-inner">
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">Three steps. No lawyers. No banks.</p>
        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="s-icon">{s.icon}</div>
              <div className="s-num">{s.num}</div>
              <h3 className="s-title">{s.title}</h3>
              <p className="s-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}