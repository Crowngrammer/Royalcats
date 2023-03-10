"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpiry = exports.unfreeze = exports.freeze = exports.revoke = exports.issueVanilla = exports.revokeGatekeeper = exports.addGatekeeper = exports.GatewayInstruction = void 0;
const solanaBorsh_1 = require("./solanaBorsh");
const constants_1 = require("./constants");
const web3_js_1 = require("@solana/web3.js");
const GatewayTokenData_1 = require("./GatewayTokenData");
/**
 * Creates instructions to send to the gateway program.
 *
 * Must match solana/program/src/instruction.rs
 */
class AddGatekeeper extends solanaBorsh_1.Assignable {
}
class IssueVanilla extends solanaBorsh_1.Assignable {
}
class SetState extends solanaBorsh_1.Assignable {
}
class UpdateExpiry extends solanaBorsh_1.Assignable {
}
class RevokeGatekeeper extends solanaBorsh_1.Assignable {
}
class GatewayInstruction extends solanaBorsh_1.Enum {
    static addGatekeeper() {
        return new GatewayInstruction({
            addGatekeeper: new AddGatekeeper({}),
        });
    }
    static issueVanilla(seed, expireTime) {
        return new GatewayInstruction({
            issueVanilla: new IssueVanilla({ seed, expireTime }),
        });
    }
    static revoke() {
        return new GatewayInstruction({
            setState: new SetState({
                state: new GatewayTokenData_1.GatewayTokenState({ revoked: new GatewayTokenData_1.Revoked({}) }),
            }),
        });
    }
    static freeze() {
        return new GatewayInstruction({
            setState: new SetState({
                state: new GatewayTokenData_1.GatewayTokenState({ frozen: new GatewayTokenData_1.Frozen({}) }),
            }),
        });
    }
    static unfreeze() {
        return new GatewayInstruction({
            setState: new SetState({
                state: new GatewayTokenData_1.GatewayTokenState({ active: new GatewayTokenData_1.Active({}) }),
            }),
        });
    }
    static updateExpiry(expireTime) {
        return new GatewayInstruction({
            updateExpiry: new UpdateExpiry({
                expireTime,
            }),
        });
    }
    static revokeGatekeeper() {
        return new GatewayInstruction({
            revokeGatekeeper: new RevokeGatekeeper({}),
        });
    }
}
exports.GatewayInstruction = GatewayInstruction;
/**
 * Add a gatekeeper to a gatekeeper network.
 * Returns a Solana instruction that must be signed by the gatekeeper network authority.
 *
 * @param payer The payer of the transaction (used to pay rent into the gatekeeper account)
 * @param gatekeeperAccount An uninitialised gatekeeper account PDA. The address must be derived via getGatekeeperAccountKeyFromGatekeeperAuthority()
 * @param gatekeeperAuthority The gatekeeper to add to the network
 * @param network The gatekeeper network that the account is being added to.
 */
function addGatekeeper(payer, gatekeeperAccount, gatekeeperAuthority, network) {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: gatekeeperAccount, isSigner: false, isWritable: true },
        { pubkey: gatekeeperAuthority, isSigner: false, isWritable: false },
        { pubkey: network, isSigner: true, isWritable: false },
        { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
    ];
    const data = GatewayInstruction.addGatekeeper().encode();
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: constants_1.PROGRAM_ID,
        data,
    });
}
exports.addGatekeeper = addGatekeeper;
/**
 * Removes a gatekeeper from a gatekeeper network.
 * Returns a Solana instruction that must be signed by the gatekeeper network authority.
 *
 * @param funds_to The account the gatekeeper account's rent goes to
 * @param gatekeeperAccount The gatekeeper account PDA. The address must be derived via getGatekeeperAccountKeyFromGatekeeperAuthority()
 * @param gatekeeperAuthority The gatekeeper to remove from the network
 * @param network The gatekeeper network that the account is being removed from.
 */
function revokeGatekeeper(funds_to, gatekeeperAccount, gatekeeperAuthority, network) {
    const keys = [
        { pubkey: funds_to, isSigner: false, isWritable: true },
        { pubkey: gatekeeperAccount, isSigner: false, isWritable: true },
        { pubkey: gatekeeperAuthority, isSigner: false, isWritable: false },
        { pubkey: network, isSigner: true, isWritable: false },
    ];
    const data = GatewayInstruction.revokeGatekeeper().encode();
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: constants_1.PROGRAM_ID,
        data,
    });
}
exports.revokeGatekeeper = revokeGatekeeper;
/**
 * Issue a gateway token to the owner publicKey. This is a 'vanilla' token, in that it does not
 * rely on any other accounts (e.g. identity accounts) to validate.
 * Returns a Solana instruction that must be signed by the gatekeeper authority.
 * @param gatewayTokenAccount An uninitialised gateway token account PDA. The address must be derived via getGatewayTokenKeyForOwner
 * @param payer The payer of the transaction (used to pay rent into the gatekeeper account).
 * @param gatekeeperAccount The account in the gatekeeper network of the gatekeeper issuing the token
 * @param owner The recipient of the token
 * @param gatekeeperAuthority The gatekeeper issuing the token
 * @param gatekeeperNetwork The network that the gatekeeper belongs to
 * @param seed An 8-byte seed array, used to add multiple tokens to the same owner. Must be unique to each token, if present
 * @param expireTime The unix timestamp at which the token is no longer valid
 */
function issueVanilla(gatewayTokenAccount, payer, gatekeeperAccount, owner, gatekeeperAuthority, gatekeeperNetwork, seed, expireTime) {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: gatewayTokenAccount, isSigner: false, isWritable: true },
        { pubkey: owner, isSigner: false, isWritable: false },
        { pubkey: gatekeeperAccount, isSigner: false, isWritable: false },
        { pubkey: gatekeeperAuthority, isSigner: true, isWritable: false },
        { pubkey: gatekeeperNetwork, isSigner: false, isWritable: false },
        { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
    ];
    const data = GatewayInstruction.issueVanilla(seed, expireTime).encode();
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: constants_1.PROGRAM_ID,
        data,
    });
}
exports.issueVanilla = issueVanilla;
const getStateChangeAccountMeta = (gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount) => [
    { pubkey: gatewayTokenAccount, isSigner: false, isWritable: true },
    { pubkey: gatekeeperAuthority, isSigner: true, isWritable: false },
    { pubkey: gatekeeperAccount, isSigner: false, isWritable: false },
];
/**
 * Revoke a gateway token.
 * Returns a Solana instruction that must be signed by the gatekeeper authority.
 * @param gatewayTokenAccount The gateway token to revoke
 * @param gatekeeperAuthority The gatekeeper revoking the token (must be in the same network as the issuing gatekeeper)
 * @param gatekeeperAccount The account in the gatekeeper network of the gatekeeper revoking the token
 */
function revoke(gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount) {
    const keys = getStateChangeAccountMeta(gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount);
    const data = GatewayInstruction.revoke().encode();
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: constants_1.PROGRAM_ID,
        data,
    });
}
exports.revoke = revoke;
/**
 * Freeze a gateway token.
 * Returns a Solana instruction that must be signed by the gatekeeper authority.
 * @param gatewayTokenAccount The gateway token to freeze
 * @param gatekeeperAuthority The gatekeeper freezing the token (must be equal to the issuing gatekeeper)
 * @param gatekeeperAccount The account in the gatekeeper network of the gatekeeper freezing the token
 */
function freeze(gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount) {
    const keys = getStateChangeAccountMeta(gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount);
    const data = GatewayInstruction.freeze().encode();
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: constants_1.PROGRAM_ID,
        data,
    });
}
exports.freeze = freeze;
/**
 * Unfreeze a gateway token.
 * Returns a Solana instruction that must be signed by the gatekeeper authority.
 * @param gatewayTokenAccount The gateway token to unfreeze
 * @param gatekeeperAuthority The gatekeeper unfreezing the token (must be equal to the issuing gatekeeper)
 * @param gatekeeperAccount The account in the gatekeeper network of the gatekeeper unfreezing the token
 */
function unfreeze(gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount) {
    const keys = getStateChangeAccountMeta(gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount);
    const data = GatewayInstruction.unfreeze().encode();
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: constants_1.PROGRAM_ID,
        data,
    });
}
exports.unfreeze = unfreeze;
/**
 * Update the expiry time of a gateway token.
 * Returns a Solana instruction that must be signed by the gatekeeper authority.
 * @param gatewayTokenAccount The gateway token to be updated (must have an expiry time)
 * @param gatekeeperAuthority The gatekeeper (must be equal to the issuing gatekeeper)
 * @param gatekeeperAccount The account in the gatekeeper network of the gatekeeper
 * @param expireTime The new expiry time
 */
function updateExpiry(gatewayTokenAccount, gatekeeperAuthority, gatekeeperAccount, expireTime) {
    const keys = [
        { pubkey: gatewayTokenAccount, isSigner: false, isWritable: true },
        { pubkey: gatekeeperAuthority, isSigner: true, isWritable: false },
        { pubkey: gatekeeperAccount, isSigner: false, isWritable: false },
    ];
    const data = GatewayInstruction.updateExpiry(expireTime).encode();
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: constants_1.PROGRAM_ID,
        data,
    });
}
exports.updateExpiry = updateExpiry;
solanaBorsh_1.SCHEMA.set(GatewayInstruction, {
    kind: "enum",
    field: "enum",
    values: [
        ["addGatekeeper", AddGatekeeper],
        ["issueVanilla", IssueVanilla],
        ["setState", SetState],
        ["updateExpiry", UpdateExpiry],
        ["revokeGatekeeper", RevokeGatekeeper],
    ],
});
solanaBorsh_1.SCHEMA.set(AddGatekeeper, {
    kind: "struct",
    fields: [],
});
solanaBorsh_1.SCHEMA.set(IssueVanilla, {
    kind: "struct",
    fields: [
        ["seed", { kind: "option", type: [8] }],
        ["expireTime", { kind: "option", type: "u64" }],
    ],
});
solanaBorsh_1.SCHEMA.set(SetState, {
    kind: "struct",
    fields: [["state", GatewayTokenData_1.GatewayTokenState]],
});
solanaBorsh_1.SCHEMA.set(UpdateExpiry, {
    kind: "struct",
    fields: [["expireTime", "u64"]],
});
solanaBorsh_1.SCHEMA.set(RevokeGatekeeper, {
    kind: "struct",
    fields: [],
});
//# sourceMappingURL=instruction.js.map