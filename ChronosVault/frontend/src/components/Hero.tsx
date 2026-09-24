export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">🔐 Decentralized Time-Lock Protocol</div>
        <h1 className="hero-title">
          Lock Your Crypto.<br />
          <span className="hero-hl">Trust the Time.</span>
        </h1>
        <p className="hero-sub">
          ChronosVault lets you lock crypto assets and digital inheritances
          on-chain — releasing them only when the future arrives.
          Zero intermediaries. Zero custody risk. Pure mathematics.
        </p>
        <div className="hero-stats">
          <div className="stat"><div className="stat-n">100%</div><div className="stat-l">Non-Custodial</div></div>
          <div className="stat"><div className="stat-n">0</div><div className="stat-l">Intermediaries</div></div>
          <div className="stat"><div className="stat-n">∞</div><div className="stat-l">Lock Duration</div></div>
        </div>
        <div className="hero-cta">
          <a href="#create" className="btn-primary">🔐 Create a Vault</a>
          <a href="#check" className="btn-secondary">🔍 Check a Vault</a>
        </div>
      </div>
    </section>
  )
}