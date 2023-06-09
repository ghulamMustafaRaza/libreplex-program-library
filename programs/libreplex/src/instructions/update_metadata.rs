use anchor_lang::prelude::*;
use crate::instructions::has_permission;

use crate::{Metadata, Permissions, PermissionType, UpdateMetadataInput};


use prog_common::{errors::ErrorCode};

#[event]
struct EditMetadataEvent {
    id: Pubkey,
    name: String,
}

#[derive(Accounts)]
#[instruction(metadata_input: UpdateMetadataInput)]
pub struct EditMetadata<'info> {
    #[account(mut)]
    pub editor: Signer<'info>,

    #[account()]
    pub permissions: Box<Account<'info, Permissions>>,

    /// CHECK: may be empty
    pub collection: UncheckedAccount<'info>,

    pub metadata: Box<Account<'info, Metadata>>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<EditMetadata>,
    update_metadata_input: UpdateMetadataInput,
) -> Result<()> {
    let editor = &ctx.accounts.editor;
    let metadata = &ctx.accounts.metadata;
    let permissions = &ctx.accounts.permissions;
    

    let UpdateMetadataInput {name, 
            symbol,
            asset,
            description,
            invoked_permission
        } = update_metadata_input;

    if invoked_permission != PermissionType::Admin {
        return Err(ErrorCode::InvalidPermissions.into())
    }
    
    let metadata_key = metadata.key();
    let editor_key = editor.key();



    let metadata_permissions_path = &[b"permissions", metadata_key.as_ref(), editor_key.as_ref()];
    let (metadata_permissions_key, metadata_bump) = Pubkey::find_program_address(metadata_permissions_path, &crate::id());

    if metadata_permissions_key == permissions.key() {
        if permissions.bump != metadata_bump  {
            return Err(ErrorCode::InvalidBump.into())
        }

        if has_permission(&permissions.permissions, invoked_permission).is_none() {
            // TODO: Add support for edit as well as admin
            return Err(ErrorCode::InvalidPermissions.into())
        }
        
    }
    
    let metadata = &mut ctx.accounts.metadata;

    

    // Update the metadata state account
    metadata.name = name.clone();
    metadata.asset = asset.clone();
    metadata.description = description;
    metadata.symbol= symbol;
    
    emit!(EditMetadataEvent{
        id: metadata.key(),
        name
    });

    Ok(())
}