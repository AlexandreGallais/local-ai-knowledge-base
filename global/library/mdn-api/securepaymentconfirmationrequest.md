---
title: "SecurePaymentConfirmationRequest"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securepaymentconfirmationrequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurePaymentConfirmationRequest

The **`SecurePaymentConfirmationRequest`** dictionary describes input to the Payment Request API when used to authenticate a user during an e-commerce transaction using SPC with Payment Request API.

An instance of this dictionary must be passed into the `PaymentRequest()` constructor as the value of the `data` field corresponding to a `supportedMethods` value of `"secure-payment-confirmation"`.

## Instance properties

- `challenge`
    An `ArrayBuffer`, `TypedArray`, or `DataView` provided by the relying party's server and used as a cryptographic challenge. This value will be signed by the authenticator and the signature will be sent back as part of `AuthenticatorAttestationResponse.attestationObject`. This helps prevent replay attacks.
- `credentialIds`
    A list of `ArrayBuffer`, `TypedArray`, or `DataView`. These Credential IDs represent Web Authentication credentials that have been registered with the relying party for authenticating during a payment with the associated `instrument`.
- `extensions` (optional)
    Any WebAuthn extensions that should be used for the passed credential(s). The caller does not need to specify the `payment` extension; this is added automatically.
- `instrument`
    The description of the instrument name and icon to display during registration and to be signed along with the transaction details. This is an object with the following properties:
    - `displayName`
        A string containing the payment instrument's name, which will be displayed to the user.
    - `icon`
        A string containing the URL of the payment instrument's icon.
    - `iconMustBeShown` (optional)
        A boolean value indicating whether the icon must be successfully fetched and shown for the request to succeed. Defaults to `true`.
- `locale` (optional)
    An optional list of well-formed BCP 47 language tags, in descending order of priority, that identify the local preferences of the website. That is, this represents a language priority list Matching of Language Tags, which the user agent can use to perform language negotiation and locale-affected formatting with the caller.
    > **Note:**
    > The locale is distinct from language or direction metadata associated with specific input members, in that it represents the caller's requested localized experience rather than assertion about a specific string value. See SPC internationalization Considerations for more discussion.
- `payeeName` (optional)
    A string that serves as the display name of the payee that this SPC call is for (e.g., the merchant). Optional, may be provided alongside or instead of `payeeOrigin`.
- `payeeOrigin` (optional)
    A string that is the origin of the payee that this SPC call is for (e.g., the merchant). Optional, may be provided alongside or instead of `payeeName`.
- `rpId`
    A string that specifies the relying party's identifier (for example "login.example.org").
- `showOptOut` (optional)
    A boolean indicating whether the user should be given a chance to opt-out during the transaction dialog UX. Defaults to `false`.
- `timeout` (optional)
    The number of milliseconds before the request to sign the transaction details times out. At most 1 hour.
