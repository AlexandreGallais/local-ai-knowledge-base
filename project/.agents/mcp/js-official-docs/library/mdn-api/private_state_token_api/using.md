---
title: "Using the Private State Token API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/private_state_token_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Private State Token API

This page explains how to use the Private State Tokens API to conveying trust in a user's authenticity from one browsing context to another.

## High-level overview

The process by which private state tokens are used can be split up into three phases:

1. Issuing tokens
2. Redeeming tokens
3. Redemption record usage

This section summarizes those phases. We will look at the these in more detail in subsequent sections.

Private state tokens use the Privacy Pass <example-value> in the background to handle the issuing and transport of tokens, etc.

### Issuing tokens

1. Let's say a user visits a website, `issuer.example`.
2. `issuer.example` can take steps to _establish_ trust in the user. This can be done using a method such as a CAPTCHA, verifying their email address, keeping a record of the user making legitimate purchases, or a combination of multiple such methods.
   > **Note:**
   > Private state tokens are not a replacement for CAPTCHAs or other trust establishing mechanisms. Private state tokens provide a way to _convey_ trust in a user, not _establish_ trust in a user.
3. Once trust has been established, `issuer.example` can make a request to a server to issue a **private state token** — a cryptographic token that represents trust in the verified user. In this context, `issuer.example` is called an **issuer**. The server is called an **issuer server**.
4. If the request is successful, the token is then stored securely by the user's browser.

### Redeeming tokens

If another website wants to establish trust in the same user, it can do so by redeeming a private state token <example-value> to the user's browser by another website, rather than having to go through the process of establishing trust from scratch.

1. Let's say the user visits a different website, `redeemer.example`.
2. `redeemer.example` can make a request to a server to redeem a token for that specific user and device.
3. The browser checks to see whether it has a token <example-value> for that user and device. If it does, and the token is good to use (it has not already been redeemed, and it has not expired), it sends the token to a server to be redeemed. In this context, `redeemer.example` is called a **redeemer**. The server is called a **redeemer server**.
4. If the token is redeemed successfully, the redeemer server sends a **redemption record** to the browser to verify the user trust.

### Redemption record usage

Once the browser has received the redemption record, it can use it as a trust signal for the current user in various contexts, for example when letting them perform a sensitive action like signing in, purchasing a product, or posting a comment. This trust signal can also be forwarded to other parties to convey trust.

## Example implementation

You can find an example private state tokens implementation at Private State Token Demo Issuer (see the source code).

## Issuing tokens

This section takes you through the process of setting up an issuer server and issuing tokens via the issuer website.

### Signing up to become an issuer

If you want to become an issuer, and have your website issue private state tokens, you first need to register by completing the Issuer registration process. Open a new issue on the Google private-tokens GitHub repository using the "<example-value>" template. Follow the guidance on the repository to fill out the issue. Once an endpoint has been verified, it will be merged into this repository and Chrome server-side infrastructure will begin fetching those keys.

> **Note:**
> This process is run by Google and controls token <example-value> via Chromium browsers; other implementations may choose to use a different process.

### Creating an issuer server

To implement the token <example-value> server you will need to build your own server-side application exposing HTTP endpoints. The issuer component is composed of two main modules:

1. The issuer app
2. The token <example-value>

In the example implementation:

1. The issuer app is a Node.js server that uses the Express framework to host the issuer HTTP endpoints. Check out the app sample code.
2. The token <example-value> cryptographic component doesn'<example-value>'re providing a C implementation as an example, which uses the Boring SSL library to manage tokens. Check out the cryptographic component code example and more information about the installation.
3. The token <example-value> component uses custom elliptic curve (EC) keys to encrypt tokens. These keys must be protected and stored in secure storage.

#### Issuer server technical requirements

As per the Privacy Pass <example-value>, you will need to implement at least two HTTP endpoints in your issuer server:

- Key <example-value>: This endpoint is where your encryption public key <example-value> will be available to browsers to confirm that your server is legitimate. This endpoint must be inside a well-known directory located at the registrable domain of the issuer server at `/.well-known/private-state-token/key-commitment`. Check out the Key-commitment endpoint example.
- Token <example-value>: The token <example-value> endpoint is where all token <example-value> will be handled. This endpoint will be the integration point for the token <example-value> component. It must be located on the issuer server at `/.well-known/private-state-token/issuance`. Check out the Token <example-value> endpoint example.

Due to the high traffic expected on such a server, we recommend you deploy it using a scalable infrastructure (for example, in a cloud environment) to be able to adjust your backend based on a variable demand.

### Issuing a token via your server

With the issuer server set up, your issuer website can now issue a new token by making a fetch request to your token <example-value> endpoint. The fetch request needs to include a `privateToken` object, the mandatory properties of which are:

- `version`
    The version of the cryptographic protocol you wish to use when generating the token. Currently this is always set to `1`, which is the only version that the specification supports.
- `operation`
    The token <example-value> you are trying to complete. In this case, we set it to `token-request`.

You can handle this using a `fetch()` call with the `method` set to `POST`, and a `privateToken` option specified:

```js
const hasToken = await Document.hasPrivateToken(`issuer.example`);
if (!hasToken) {
  await fetch(
    "<example-value>",
    {
      method: "POST",
      privateToken: {
        version: 1,
        operation: "<example-value>",
      },
    },
  );
}
```

> **Note:**
> You can also issue token <example-value> requests using:
>
> - `XMLHttpRequest` with the `privateToken` specified inside an `XMLHttpRequest.setPrivateToken()` call
> - `` elements with the `privateToken` included as a string inside the `privateToken` attribute.

Behind the scenes, the browser generates a set of nonces needed to generate the token, blinds then, and sends them to the issuer server in a `Sec-Private-State-Token` request header as part of the fetch request. In addition, the version of the cryptographic protocol used to generate the nonces is sent to the issuer server in a `Sec-Private-State-Token-Crypto-Version` request header. At the time of writing, there is only one version supported, but this mechanism makes it possible to support multiple versions in the future.

Note how you can use the `Document.hasPrivateToken()` method to check whether the browser already has a token <example-value> from our issuer, before attempting to request another one.

If the token <example-value> is successful, the response will include a `Sec-Private-State-Token` response header containing blind signatures. The browser unblinds them and stores them along with the original unblinded nonces in a secure token store. This pairing of signatures and nonces constitutes a private state token, which can be redeemed later on. The raw tokens are not accessible to JavaScript.

### Token issue limitations

Each device can store up to 500 tokens per top-level website and issuer. The maximum number of issuers per top-level origin is two.

Each token has metadata indicating which key the issuer used to issue it. That information can be used to decide to redeem tokens (or not) during the redeeming process. Each token can be issued using one and only one cryptographic key and each issuer can have a maximum of 6 keys. One potential way to use this variable is to define a range of trust to your tokens based on your cryptographic keys (for example, key 1: high trust; key 6: no trust).

The browser can get the issuer's current set of valid keys from the key <example-value> endpoint. Keys should be rotated regularly; this can be done every 60 days at a minimum; any rotation faster than that will be ignored. All tokens issued with invalid keys are also considered invalid.

## Redeeming tokens

This section takes you through the process of setting up a redeemer server, redeeming tokens, and issuing redemption records.

### Creating a redeemer server

You need to build a redeemer server to read the tokens issued by the issuer server. The following steps outline how to redeem tokens as well as how to read the redemption records that are associated with those tokens.

The redeemer component is composed of two main modules:

1. The redeemer app
2. The token <example-value>

You can opt to run the issuer and the redeemer in the same server (or group of servers) and cryptographic component. In fact, this is what has been done in the example implementation, to make it a bit easier to follow. Again, check out the app sample code and the cryptographic component code example and information about the installation.

#### Redeemer server technical requirements

As per the Privacy Pass <example-value>, you will need to implement at least one HTTP endpoint in your redeemer server:

- Token <example-value>: This is where all token <example-value> will be handled. This endpoint will be the integration point for the token <example-value> component. It must be located on the issuer server at `/.well-known/private-state-token/redemption`. Check out our Token <example-value> endpoint example.

### Redeeming a token via your server

With the redeemer server set up, your redeemer website can now redeem a previously-stored token by making a fetch request to your token <example-value> endpoint. The fetch request needs to include a `privateToken` object, the same as in the token <example-value> request, except that the specified `operation` should be `token-redemption`.

You can handle this using a `fetch()` call with the `method` set to `POST`, and a `privateToken` option specified.

```js
await fetch(
  "<example-value>",
  {
    method: "POST",
    privateToken: {
      version: 1,
      operation: "<example-value>",
      refreshPolicy: "none",
    },
  },
);
```

Here we also set the `refreshPolicy` property to `none`, which means that, if there is a previously-set, non-expired redemption record for this user and site, this redemption record should be used, and a new one should not be issued. If we set `refreshPolicy: "refresh"`, a new redemption record would always be issued. Note that `none` is the default value, as this is the behavior you'll want in most cases, but we wanted to draw attention to it.

Behind the scenes, the browser sends the token (along with associated redemption metadata) attached in a `Sec-Private-State-Token` request header. The redeemer then sends a Redemption Record in a `Sec-Private-State-Token` response header to provide a redemption attestation to use for conveying user trust. The redemption record is stored in a secure data store that isn't directly accessible via JavaScript.

Additionally, the redeemer may include a `Sec-Private-State-Token-Lifetime` header in the response to indicate to the browser how long (in seconds) the redemption record should be cached for. If the `Sec-Private-State-Token-Lifetime` header is omitted, the lifetime of the redemption record will be tied to the lifetime of the token <example-value> key that confirmed the redeemed token's issuance.

### Redemption record limitations

Two tokens can be redeemed every 48 hours, per device, page and issuer.

The resulting redemption records are considered active until expiration (as specified by the `Sec-Private-State-Token-Lifetime` response header).

## Redemption record usage

Once the browser has received the redemption record, it can be used as a trust signal for the current user in other contexts, for example when letting them perform a sensitive action like signing in, purchasing a product, or posting a comment.

This trust signal can be forwarded to other parties to convey trust. To do so, include a `privateToken` option in fetch calls for future resources, with an `operation` of `send-redemption-record`:

```js
const hasRR = await Document.hasRedemptionRecord(`issuer.example`);
if (hasRR) {
  await fetch("some-resource.example", {
    method: "POST",
    privateToken: {
      version: 1,
      operation: "send-redemption-record",
      issuers: ["https://issuer.example"],
    },
  });
}
```

The `send-redemption-record` token <example-value> is only available on `fetch()` calls made in the top-level document.

We also set the `issuers` property to `[issuer.example]`, which specifies which issuer we are expecting the redemption record to have come from. If there are no redemption records available for the specified issuer(s), the request header will be empty. Note how you can use the `Document.hasRedemptionRecord()` method to check whether the browser has a redemption record originating from a particular issuer, before attempting to forward it.

Behind the scenes, The redemption record(s) will be included on a `Sec-Redemption-Record` request header. The header contains a list of issuer and redemption record pairs corresponding to each redemption record.
