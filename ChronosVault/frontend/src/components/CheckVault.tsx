import { useState } from 'react'
import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { formatEther } from 'viem'
import { CHRONOSVAULT_ABI } from '../constants/contract'

function getStatusClass(claimed: unknown, unlocked: unknown): string {
  if (claimed) return 'claimed'
  if (unlocked) return 'open'
  return 'locked'
}

function getStatusText(claimed: unknown, unlocked: unknown): string {
  if (claimed) return '✅ Claimed'
  if (unlocked) return '🔓 Unlocked!'
  return '🔒 Locked'
}

export default function CheckVault() {
  const { address } = useAccount()
  const [vaultAddr, setVaultAddr] = useState('')
  const [checked, setChecked] = useState<`0x${string}` | null>(null)

  const { data: info } = useReadContract({
    address: checked ?? '0x0000000000000000000000000000000000000000',
    abi: CHRONOSVAULT_ABI,
    functionName: 'getVaultInfo',
    query: { enabled: !!checked }
  })

  const { writeContract, isPending } = useWriteContract()

  const infoArr = (info as unknown[]) ?? []
  const creator = infoArr[0] as string
  const recipient = infoArr[1] as string
  const unlockTime = infoArr[2] as bigint
  const balance = infoArr[3] as bigint
  const claimed = infoArr[4] as boolean
  const unlocked = infoArr[5] as boolean

  const isRecipient = address?.toLowerCase() === recipient?.toLowerCase()
  const unlockDate = unlockTime
    ? new Date(Number(unlockTime) * 1000)
    : null

  return (
    <section className="check-vault" id="check">
      <div className="section-inner">
        <h2 className="section-title">Check a Vault</h2>
        <p className="section-sub">
          Enter a deployed vault address to see its status
        </p>
        <div className="check-row">
          <input
            type="text"
            placeholder="Vault contract address (0x...)"
            value={vaultAddr}
            onChange={e => setVaultAddr(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={() => setChecked(vaultAddr as `0x${string}`)}
          >
            🔍 Check
          </button>
        </div>

        {checked && info && (
          <div className="vault-card">
            <h3>Vault Status</h3>
            <div className="info-grid">
              <div className="ii">
                <span className="il">Creator</span>
                <span className="iv">{creator?.slice(0, 10)}...</span>
              </div>
              <div className="ii">
                <span className="il">Recipient</span>
                <span className="iv">{recipient?.slice(0, 10)}...</span>
              </div>
              <div className="ii">
                <span className="il">Unlock Date</span>
                <span className="iv">
                  {unlockDate?.toLocaleDateString()}
                </span>
              </div>
              <div className="ii">
                <span className="il">Balance</span>
                <span className="iv">
                  {balance ? formatEther(balance) : '0'} ETH
                </span>
              </div>
              <div className="ii">
                <span className="il">Status</span>
                <span className={`status ${getStatusClass(claimed, unlocked)}`}>
                  {getStatusText(claimed, unlocked)}
                </span>
              </div>
            </div>

            {unlocked && isRecipient && !claimed && (
              <button
                className="btn-primary btn-full"
                disabled={isPending}
                onClick={() =>
                  writeContract({
                    address: checked!,
                    abi: CHRONOSVAULT_ABI,
                    functionName: 'claim'
                  })
                }
              >
                {isPending ? 'Claiming...' : '🎉 Claim Your Vault!'}
              </button>
            )}

            {unlocked && !isRecipient && !claimed && (
              <div className="connect-warn">
                You are not the recipient of this vault
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}