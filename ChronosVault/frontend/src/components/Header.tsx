import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export default function Header() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span>🔐</span>
          <span className="logo-text">ChronosVault</span>
        </div>
        {isConnected ? (
          <div className="wallet-connected">
            <span className="wallet-addr">
              {address?.slice(0,6)}...{address?.slice(-4)}
            </span>
            <button className="btn-disconnect"
              onClick={() => disconnect()}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="btn-connect"
            onClick={() => connect({ connector: injected() })}>
            🦊 Connect MetaMask
          </button>
        )}
      </div>
    </header>
  )
}