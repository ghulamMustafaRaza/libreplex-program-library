/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category UpdateMetadata
 * @category generated
 */
export type UpdateMetadataInstructionArgs = {
  name: beet.COption<string>
  symbol: beet.COption<string>
  imageUrl: beet.COption<string>
  isMutable: beet.COption<boolean>
  bump: number
}
/**
 * @category Instructions
 * @category UpdateMetadata
 * @category generated
 */
export const updateMetadataStruct = new beet.FixableBeetArgsStruct<
  UpdateMetadataInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['name', beet.coption(beet.utf8String)],
    ['symbol', beet.coption(beet.utf8String)],
    ['imageUrl', beet.coption(beet.utf8String)],
    ['isMutable', beet.coption(beet.bool)],
    ['bump', beet.u8],
  ],
  'UpdateMetadataInstructionArgs'
)
/**
 * Accounts required by the _updateMetadata_ instruction
 *
 * @property [_writable_, **signer**] authority
 * @property [_writable_] metadata
 * @property [_writable_] mint
 * @category Instructions
 * @category UpdateMetadata
 * @category generated
 */
export type UpdateMetadataInstructionAccounts = {
  authority: web3.PublicKey
  metadata: web3.PublicKey
  mint: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const updateMetadataInstructionDiscriminator = [
  170, 182, 43, 239, 97, 78, 225, 186,
]

/**
 * Creates a _UpdateMetadata_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category UpdateMetadata
 * @category generated
 */
export function createUpdateMetadataInstruction(
  accounts: UpdateMetadataInstructionAccounts,
  args: UpdateMetadataInstructionArgs,
  programId = new web3.PublicKey('L1BRc7ZYjj7t9k7E5xbdnKy3KhaY6sTcJx4gAsqxUbh')
) {
  const [data] = updateMetadataStruct.serialize({
    instructionDiscriminator: updateMetadataInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}