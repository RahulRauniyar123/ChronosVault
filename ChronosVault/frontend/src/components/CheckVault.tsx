import { useState } from 'react'
import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { formatEther } from 'viem'

const CHRONOSVAULT_ABI = [
  {
    inputs: [],
    name: 'getVaultInfo',
    outputs: [
      { name: 'creator', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'unlockTime', type: 'uint256' },
      { name: 'balance', type: 'uint256' },
      { name: 'claimed', type: 'bool' },
      { name: 'unlocked', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as const

type VaultInfo = readonly [
  creator: `0x${string}`,
  recipient: `0x${string}`,
  unlockTime: bigint,
  balance: bigint,
  claimed: boolean,
  unlocked: boolean
]

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

  const { data: info, isPending: isLoading } = useReadContract({
    address: checked ?? ZERO_ADDRESS,
    abi: CHRONOSVAULT_ABI,
    functionName: 'getVaultInfo',
    query: { enabled: !!checked }
  })

  const { writeContract, isPending } = useWriteContract()

  const [creator, recipient, unlockTime, balance, claimed, unlocked] =
    (info as VaultInfo | undefined) ?? []

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
            onClick={() => {
              if (/^0x[a-fA-F0-9]{40}$/.test(vaultAddr)) {
                setChecked(vaultAddr as `0x${string}`)
              }
            }}
          >
            🔍 Check
          </button>
        </div>

        {checked && isLoading && (
          <div className="connect-warn">
            ⏳ Reading from blockchain...
          </div>
        )}

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