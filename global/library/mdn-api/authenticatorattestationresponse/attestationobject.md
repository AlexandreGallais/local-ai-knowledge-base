---
title: "AuthenticatorAttestationResponse: attestationObject property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorattestationresponse/attestationobject/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAttestationResponse: attestationObject property

The **`attestationObject`** property of the
`AuthenticatorAttestationResponse` interface returns an
`ArrayBuffer` containing the new public key, as well as signature over the
entire `attestationObject` with a private key that is stored in the
authenticator when it is manufactured.

As part of the `CredentialsContainer.create()` call, an authenticator will
create a new key pair as well as an `attestationObject` for that key pair. The public key
that corresponds to the private key that has created the attestation signature is well
known; however, there are various well-known attestation public key <example-value> for different
ecosystems (for example, Android or TPM attestations).

## Value

After decoding the CBOR encoded
`ArrayBuffer`, the resulting JavaScript object will contain the following
properties:

- `authData`
    The Authenticator data for the operation. Note that in `AuthenticatorAssertionResponse`, the `authenticatorData` is exposed as a property in a JavaScript object (see `AuthenticatorAssertionResponse.authenticatorData`) while in `AuthenticatorAttestationResponse`, the `authenticatorData` is a property in a CBOR map.

    The same `AuthenticatorAssertionResponse.authenticatorData` field is used by both `AuthenticatorAttestationResponse` and by `AuthenticatorAssertionResponse`. When used in attestation, it contains an optional field, `attestedCredentialData`. This field is not included when used in the `AuthenticatorAssertionResponse`. The attestedCredentialData field contains the `credentialId` and `credentialPublicKey`.

- `fmt`
    A text string that indicates the format of the attStmt. The WebAuthn specification defines a number of formats; however, formats may also be defined
    in other specifications and registered in an IANA registry. Formats
    defined by WebAuthn are:
    - `"packed"`
    - `"tpm"`
    - `"android-key"`
    - `"android-safetynet"`
    - `"fido-u2f"`
    - `"none"`

- `attStmt`
    An attestation statement that is of the format defined by `"fmt"`. For
    now, see the WebAuthn specification for details on each format.

## Examples

See Creating a public key <example-value> for a detailed example.

## See also

- `CredentialsContainer.create()`: the method used to create a statement with
  a cryptographic `challenge` which signature by the authenticator is contained in `attStmt`,
  with the specified `attestation` transport option.
