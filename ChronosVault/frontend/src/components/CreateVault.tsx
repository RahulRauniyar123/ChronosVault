import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function CreateVault() {
  const { isConnected } = useAccount()
  const [form, setForm] = useState({
    recipient: '', unlockDate: '', amount: '', message: ''
  })
  const [done, setDone] = useState(false)

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  if (done) return (
    <section className="create-vault" id="create">
      <div className="section-inner">
        <div className="success-card">
          <div className="s-icon-big">✅</div>
          <h2>Vault Configured!</h2>
          <p>Parameters saved. Full on-chain deployment coming in Day 9 when we connect to Base Sepolia.</p>
          <div className="vault-params">
            <div className="vp"><span>Recipient:</span> {form.recipient.slice(0,12)}...</div>
            <div className="vp"><span>Unlock:</span> {form.unlockDate}</div>
            <div className="vp"><span>Amount:</span> {form.amount} ETH</div>
          </div>
          <button className="btn-primary" onClick={() => setDone(false)}>Create Another</button>
        </div>
      </div>
    </section>
  )

  return (
    <section className="create-vault" id="create">
      <div className="section-inner">
        <h2 className="section-title">Create a Vault</h2>
        <p className="section-sub">Lock your assets with a cryptographic time seal</p>
        {!isConnected && (
          <div className="connect-warn">⚠️ Connect your MetaMask wallet first</div>
        )}
        <div className="vault-form">
          <div className="fg">
            <label>Recipient Wallet Address</label>
            <input type="text" name="recipient" placeholder="0x..."
              value={form.recipient} onChange={onChange} />
            <span className="fh">Who receives the funds when vault unlocks</span>
          </div>
          <div className="fg">
            <label>Unlock Date & Time</label>
            <input type="datetime-local" name="unlockDate"
              value={form.unlockDate} onChange={onChange} />
            <span className="fh">Funds cannot be claimed before this date — ever</span>
          </div>
          <div className="fg">
            <label>Amount to Lock (ETH)</label>
            <input type="number" name="amount" placeholder="0.01" step="0.001"
              value={form.amount} onChange={onChange} />
          </div>
          <div className="fg">
            <label>Message for Recipient (Optional)</label>
            <textarea name="message" rows={3}
              placeholder="A message they'll read when the vault opens..."
              value={form.message}
              onChange={(e) => setForm({...form, message: e.target.value})} />
          </div>
          <div className="form-warn">
            ⚠️ This action is PERMANENT. Once deployed, nobody can modify or cancel the vault.
          </div>
          <button className="btn-primary btn-full"
            onClick={() => setDone(true)}
            disabled={!form.recipient || !form.unlockDate || !form.amount}>
            🔐 Lock Assets in Vault
          </button>
        </div>
      </div>
    </section>
  )
}