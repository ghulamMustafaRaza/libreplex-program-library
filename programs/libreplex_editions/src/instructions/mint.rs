

use anchor_lang::{prelude::*, system_program};
use anchor_spl::{
    associated_token::AssociatedToken, token_2022, token_interface::Mint
};


use libreplex_fair_launch::{add_to_hashlist, mint_non_fungible_2022_logic};
use libreplex_shared::{create_token_2022_and_metadata, MintAccounts2022, SharedError, TokenMemberInput};
use spl_pod::optional_keys::OptionalNonZeroPubkey;
use spl_token_metadata_interface::state::TokenMetadata;

use crate::{errors::EditionsError, EditionsDeployment, HashlistMarker};




#[derive(Accounts)]
pub struct MintCtx<'info> {

    #[account(mut,
        seeds = ["editions_deployment".as_ref(), editions_deployment.symbol.as_ref()], bump)]
    pub editions_deployment: Account<'info, EditionsDeployment>,

    
    /// CHECK: Checked in PDA. Not deserialized because it can be rather big
    #[account(mut, 
        seeds = ["hashlist".as_bytes(), 
        editions_deployment.key().as_ref()],
        bump,)]
    pub hashlist: UncheckedAccount<'info>,

    #[account(init, 
        space = HashlistMarker::SIZE,
        payer = payer,
        seeds = ["hashlist_marker".as_bytes(), 
        editions_deployment.key().as_ref(),
        mint.key().as_ref()],
        bump,)]
    pub hashlist_marker: Account<'info, HashlistMarker>,

    #[account(mut)]
    pub payer: Signer<'info>,

    // when deployment.require_creator_cosign is true, this must be equal to the creator
    // of the deployment otherwise, can be any signer account
    #[account(mut)]
    pub signer: Signer<'info>,

    /// CHECK: It's a fair launch. Anybody can sign, anybody can receive the inscription
    #[account(mut)]
    pub minter: UncheckedAccount<'info>,

    /// CHECK: It's a fair launch. Anybody can sign, anybody can receive the inscription
    
    #[account(mut)]
    pub mint: Signer<'info>,

    #[account(mut,
    constraint = editions_deployment.group_mint == group_mint.key())]
    pub group_mint: InterfaceAccount<'info, Mint>,

    /// CHECK: passed in via CPI to mpl_token_metadata program
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    



    /* BOILERPLATE PROGRAM ACCOUNTS */
    /// CHECK: Checked in constraint
    #[account(
        constraint = token_program.key() == token_2022::ID
    )]
    pub token_program: UncheckedAccount<'info>,

    #[account()]
    pub associated_token_program: Program<'info, AssociatedToken>,




    #[account()]
    pub system_program: Program<'info, System>,

}

pub fn mint<'info>(ctx: Context<'_, '_, '_, 'info, MintCtx<'info>>) -> Result<()> {
    // let MintToken2022Ctx { 
      
    //     ..
    // } = &ctx.accounts;

    let payer = &ctx.accounts.payer; 
    let signer = &ctx.accounts.signer;
    let minter= &ctx.accounts.minter;
    let minter_token_account = &ctx.accounts.token_account;
    let token_program = &ctx.accounts.token_program;
    let associated_token_program = &ctx.accounts.associated_token_program;
    let system_program = &ctx.accounts.system_program;
    let mint = &ctx.accounts.mint;
    let group_mint = &ctx.accounts.group_mint;
    

    // mutable borrows
    let editions_deployment = &mut ctx.accounts.editions_deployment;
    let hashlist = &mut ctx.accounts.hashlist;



    if !editions_deployment.cosigner_program_id.eq(&system_program::ID) && !signer.key().eq(&editions_deployment.creator.key()) {
        return Err(SharedError::InvalidCreatorCosigner.into());
    }
  
    // max_number_of_tokens == 0 means unlimited mints 
    if editions_deployment.max_number_of_tokens > 0 && editions_deployment.number_of_tokens_issued >= editions_deployment.max_number_of_tokens {
        return Err(EditionsError::MintedOut.into());
    }

     
    let update_authority =
        OptionalNonZeroPubkey::try_from(Some(editions_deployment.key())).expect("Bad update auth");

        let deployment_seeds: &[&[u8]] = &[
            "editions_deployment".as_bytes(),
            editions_deployment.symbol.as_ref(),
            &[ctx.bumps.editions_deployment],
        ];



    let name = match editions_deployment.add_counter_to_name {
        true => format!("{} #{}", editions_deployment.name.clone(), editions_deployment.number_of_tokens_issued+1),
        false => editions_deployment.name.clone()
    };
    // msg!("Create token 2022 w/ metadata");
    create_token_2022_and_metadata(
        MintAccounts2022 {
            authority: editions_deployment.to_account_info(),
            payer: payer.to_account_info(),
            nft_owner: minter.to_account_info(),
            nft_mint: mint.to_account_info(),
            spl_token_program: token_program.to_account_info(),
        },
        0,
        Some(TokenMetadata {
            name,
            symbol: editions_deployment.symbol.clone(),
            uri: editions_deployment.offchain_url.clone(),
            update_authority,
            mint: mint.key(),
            additional_metadata: vec![],
        }),
        None,
        Some(TokenMemberInput {
            group_mint: group_mint.to_account_info(),
        }),
        Some(deployment_seeds),
        0
    )?;

     // msg!("Minting 2022");
     mint_non_fungible_2022_logic(
        &mint.to_account_info(),
        minter_token_account,
        associated_token_program,
        payer,
        &minter.to_account_info(),
        system_program,
        token_program,
        &editions_deployment.to_account_info(),
        deployment_seeds,
    )?;
    
    editions_deployment.number_of_tokens_issued += 1;
    add_to_hashlist(
        editions_deployment.number_of_tokens_issued as u32,
        hashlist,
        payer,
        system_program,
        &mint.key(),
        &editions_deployment.key(),
        editions_deployment.number_of_tokens_issued,
    )?;
    
    Ok(())
}
