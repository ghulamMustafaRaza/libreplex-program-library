export type LibreplexNiftyHybrid = {
  "version": "0.1.0",
  "name": "libreplex_nifty_hybrid",
  "instructions": [
    {
      "name": "mint",
      "accounts": [
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "niftyHybrid",
          "isMut": true,
          "isSigner": false,
          "relations": [
            "deployment"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMintTargetAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMintMinterAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "ATA of the recipient (minter) -> we swap nifties into SPL on mint"
          ]
        },
        {
          "name": "fungibleMintSourceAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "groupMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "incomingAssetProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "niftyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "monoswapProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateMetadata",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "niftyHybrid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "niftyProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialise",
      "accounts": [
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "niftyHybrid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "niftyProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "InitialiseInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "deploymentV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "limitPerMint",
            "type": "u64"
          },
          {
            "name": "maxNumberOfTokens",
            "type": "u64"
          },
          {
            "name": "numberOfTokensIssued",
            "type": "u64"
          },
          {
            "name": "fungibleDecimals",
            "type": "u8"
          },
          {
            "name": "escrowNonFungibleCount",
            "type": "u64"
          },
          {
            "name": "ticker",
            "type": "string"
          },
          {
            "name": "fungibleMint",
            "type": "publicKey"
          },
          {
            "name": "offchainUrl",
            "type": "string"
          },
          {
            "name": "proxyProgramId",
            "type": "publicKey"
          },
          {
            "name": "cosignerMint",
            "type": "publicKey"
          },
          {
            "name": "cosignerSwapToNft",
            "type": "publicKey"
          },
          {
            "name": "cosignerSwapToSpl",
            "type": "publicKey"
          },
          {
            "name": "fungibleType",
            "type": {
              "defined": "FungibleType"
            }
          },
          {
            "name": "nonFungibleType",
            "type": {
              "defined": "NonFungibleType"
            }
          },
          {
            "name": "deployed",
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                200
              ]
            }
          }
        ]
      }
    },
    {
      "name": "niftyHybrid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "deployment",
            "type": "publicKey"
          },
          {
            "name": "groupMint",
            "type": "publicKey"
          },
          {
            "name": "cosigner",
            "type": "publicKey"
          },
          {
            "name": "cosignerProgramId",
            "type": "publicKey"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                62
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "FungibleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TokenKeg"
          },
          {
            "name": "Token2022"
          }
        ]
      }
    },
    {
      "name": "NonFungibleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TokenKeg"
          },
          {
            "name": "Token2022"
          },
          {
            "name": "Nifty"
          }
        ]
      }
    },
    {
      "name": "InitialiseInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "cosigner",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "cosignerProgramId",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "NiftyHybrid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "deployment",
            "type": "publicKey"
          },
          {
            "name": "groupMint",
            "type": "publicKey"
          },
          {
            "name": "cosigner",
            "type": "publicKey"
          },
          {
            "name": "cosignerProgramId",
            "type": "publicKey"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                62
              ]
            }
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "Mint",
      "fields": [
        {
          "name": "niftyHybrid",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "totalMints",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NiftyHybridCreate",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "niftyHybrid",
          "type": {
            "defined": "NiftyHybrid"
          },
          "index": false
        }
      ]
    }
  ]
};

export const IDL: LibreplexNiftyHybrid = {
  "version": "0.1.0",
  "name": "libreplex_nifty_hybrid",
  "instructions": [
    {
      "name": "mint",
      "accounts": [
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "niftyHybrid",
          "isMut": true,
          "isSigner": false,
          "relations": [
            "deployment"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swapMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMintTargetAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMintMinterAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "ATA of the recipient (minter) -> we swap nifties into SPL on mint"
          ]
        },
        {
          "name": "fungibleMintSourceAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "groupMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "incomingAssetProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "niftyProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "monoswapProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateMetadata",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "niftyHybrid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "niftyProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialise",
      "accounts": [
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "niftyHybrid",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "niftyProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "InitialiseInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "deploymentV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "limitPerMint",
            "type": "u64"
          },
          {
            "name": "maxNumberOfTokens",
            "type": "u64"
          },
          {
            "name": "numberOfTokensIssued",
            "type": "u64"
          },
          {
            "name": "fungibleDecimals",
            "type": "u8"
          },
          {
            "name": "escrowNonFungibleCount",
            "type": "u64"
          },
          {
            "name": "ticker",
            "type": "string"
          },
          {
            "name": "fungibleMint",
            "type": "publicKey"
          },
          {
            "name": "offchainUrl",
            "type": "string"
          },
          {
            "name": "proxyProgramId",
            "type": "publicKey"
          },
          {
            "name": "cosignerMint",
            "type": "publicKey"
          },
          {
            "name": "cosignerSwapToNft",
            "type": "publicKey"
          },
          {
            "name": "cosignerSwapToSpl",
            "type": "publicKey"
          },
          {
            "name": "fungibleType",
            "type": {
              "defined": "FungibleType"
            }
          },
          {
            "name": "nonFungibleType",
            "type": {
              "defined": "NonFungibleType"
            }
          },
          {
            "name": "deployed",
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                200
              ]
            }
          }
        ]
      }
    },
    {
      "name": "niftyHybrid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "deployment",
            "type": "publicKey"
          },
          {
            "name": "groupMint",
            "type": "publicKey"
          },
          {
            "name": "cosigner",
            "type": "publicKey"
          },
          {
            "name": "cosignerProgramId",
            "type": "publicKey"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                62
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "FungibleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TokenKeg"
          },
          {
            "name": "Token2022"
          }
        ]
      }
    },
    {
      "name": "NonFungibleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TokenKeg"
          },
          {
            "name": "Token2022"
          },
          {
            "name": "Nifty"
          }
        ]
      }
    },
    {
      "name": "InitialiseInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "cosigner",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "cosignerProgramId",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "NiftyHybrid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "deployment",
            "type": "publicKey"
          },
          {
            "name": "groupMint",
            "type": "publicKey"
          },
          {
            "name": "cosigner",
            "type": "publicKey"
          },
          {
            "name": "cosignerProgramId",
            "type": "publicKey"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                62
              ]
            }
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "Mint",
      "fields": [
        {
          "name": "niftyHybrid",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "totalMints",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "NiftyHybridCreate",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "niftyHybrid",
          "type": {
            "defined": "NiftyHybrid"
          },
          "index": false
        }
      ]
    }
  ]
};
