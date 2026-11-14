---
title: "Identity provider integration with FedCM (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fedcm_api/idp_integration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Identity provider integration with FedCM (part 2 of 3)

## Provide a config file and endpoints

The IdP config file provides a list of the endpoints the browser needs to process the identity federation flow and manage the sign-ins. The endpoints need to be same-origin with the config.

The browser makes an uncredentialed request for the config file via the `GET` method, which doesn't follow redirects. This effectively prevents the IdP from learning who made the request and which RP is attempting to connect.

The config file (hosted at `https://accounts.idp.example/config.json` in our example) should have the following JSON structure:

```json
{
  "accounts_endpoint": "/accounts.php",
  "account_label": "developer",
  "supports_use_other_account": true,
  "client_metadata_endpoint": "/client_metadata.php",
  "disconnect_endpoint": "/disconnect.php",
  "id_assertion_endpoint": "/assertion.php",
  "login_url": "/login",
  "branding": {
    "background_color": "green",
    "color": "0xFFEEAA",
    "icons": [
      {
        "url": "https://idp.example/icon.ico",
        "size": 25
      }
    ]
  }
}
```

The properties are as follows:

- `accounts_endpoint`
    The URL for the accounts list endpoint, which returns a list of accounts that the user is currently signed in to on the IdP. The browser uses these to create a list of sign-in choices to show to the user in the browser-provided FedCM UI.
- `account_label` (optional)
    A string that, if included, specifies an identifier for a subset of accounts that should be returned when this IdP is used for federated authentication. When a `get()` request is made, only accounts matching this string in their `label_hints` parameters will be returned from the accounts endpoint.
- `supports_use_other_account` (optional)
    A boolean that defaults to `false`; if set to `true`, it means that users can sign in with an account different from the one they're currently logged in with (if the IdP supports multiple accounts). This only applies to `get()` calls that specify active mode.
    > **Note:**
    > In the browser sign-in UI, this will likely manifest as some kind of "Choose other account" button.
- `client_metadata_endpoint` (optional)
    The URL for the client metadata endpoint, which provides URLs pointing to the RP's metadata and terms of service pages, to be used in the FedCM UI.
- `disconnect_endpoint` (optional)
    The URL for the disconnect endpoint, which is used by the RP to disconnect from the IdP, via the `IdentityCredential.disconnect()` method.
- `id_assertion_endpoint`
    The URL for the ID assertion endpoint, which when sent valid user credentials <example-value> respond with a validation token that the RP can use to validate the authentication.
- `login_url`
    The login page URL for the user to sign into the IdP.
- `branding` (optional)
    Contains branding information that will be used in the browser-supplied FedCM UI to customize its appearance as desired by the IdP. The provided icon size must be greater than or equal to `25` (`25px`) in passive mode and greater than or equal to `40` (`40px`) in active mode (see Active versus passive mode for more details).

The following table summarizes the different requests made by the FedCM API:

| Endpoint/resource          | Method | Credentialed (with cookies) | Includes `Origin` |
| -------------------------- | ------ | --------------------------- | --------------------------------- |
| `well-known`/`config.json` | `GET`  | No                          | No                                |
| `accounts_endpoint`        | `GET`  | Yes                         | No                                |
| `client_metadata_endpoint` | `GET`  | No                          | Yes                               |
| `disconnect_endpoint`      | `POST` | Yes                         | Yes                               |
| `id_assertion_endpoint`    | `POST` | Yes                         | Yes                               |

> **Note:**
> For a description of the FedCM flow in which these endpoints are accessed, see FedCM sign-in flow.

> **Note:**
> None of the requests made by the FedCM API to the endpoints detailed here allow for following redirects, for privacy purposes.

### The accounts list endpoint

The browser sends requests to this endpoint using the `GET` method. The request has no `client_id` parameter, `Origin` header, or `Referer` header. This effectively prevents the IdP from learning which RP the user is trying to sign in to.

For example:

```http
GET /accounts.php HTTP/1.1
Host: idp.example
Accept: application/json
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
```

The request is credentialed: that is, it includes cookies for the IdP's site, which the IdP can use to identify which IdP accounts the user is signed into.

Note that because the browser's request to this endpoint is a cross-site request, cookies will only be included if they have a `SameSite` attribute value of `None`. This means that IdP's can't use `SameSite` as part of their defense against Cross-Site Request Forgery(CSRF) attacks, so they must implement alternative defenses.

The response returns a list of all the IdP accounts that the user is currently signed in with (not specific to any particular RP), with a JSON structure that matches the following:

```json
{
  "accounts": [
    {
      "id": "elaina_maduro",
      "given_name": "Elaina",
      "name": "Elaina Maduro",
      "email": "user@example.com",
      "tel": "<example-phone>",
      "username": "elaina420",
      "picture": "https://idp.example/profile/123",
      "approved_clients": ["123", "456", "789"],
      "domain_hints": ["rp1.example.com", "rp3.example.com"],
      "label_hints": ["developer", "admin"],
      "login_hints": ["elaina_maduro", "user@example.com"]
    },
    {
      "id": "elly",
      "given_name": "Elly",
      "username": "elly123",
      "email": "user@example.com",
      "picture": "https://idp.example/profile/456",
      "approved_clients": ["abc", "def", "ghi"],
      "domain_hints": ["rp1.example.com", "rp2.example.com"],
      "label_hints": ["developer", "test"],
      "login_hints": ["elly", "user@example.com"]
    }
  ]
}
```

This includes the following information where `name`, `email`, `username`, and `tel` are optional but at least one of them must be present and nonempty.

- `id`
    The unique ID of the user.
- `name` (optional)
    The family name of the user.
- `email` (optional)
    The email address of the user.
- `tel` (optional)
    The telephone number of the user. Can be in any format.
- `username` (optional)
    The username of the user.
- `given_name` (optional)
    The given name of the user.
- `picture` (optional)
    The URL of the user's avatar image.
- `approved_clients` (optional)
    An array of client IDs, each identifying an RP that the user has an account with. When a user tries to sign into an RP using federated identity, the browser checks the IdP's `approved_clients` array. If the RP's `clientId` is found in the array, no disclosure text is displayed to the user, and they may also be able to take advantage of auto-reauthentication.

    The IdP should add the RP ID to `approved_clients` when the user first registers on the RP using their federated credential, and should remove the RP ID from `approved_clients` when the RP account is disconnected from the IdP.
- `domain_hints` (optional)
    An array of domains the account is associated with. The RP can make a `get()` call that includes a `domainHint` property to filter the returned accounts by domain.
- `label_hints` (optional)
    An array of strings specifying labels that define account types that the account is identified with. If the config file specifies an `account_label`, only accounts that contain that label in their `label_hints` will be returned from the accounts list endpoint.
- `login_hints` (optional)
    An array of strings representing the account. These strings are used to filter the list of account options that the browser offers for the user to sign-in. This occurs when the `loginHint` property is provided within `identity.providers` in a related `get()` call. Any account with a string in its `login_hints` array that matches the provided `loginHint` is included.

> **Note:**
> If the user is not signed in to any IdP accounts, the endpoint should respond with HTTP 401 (Unauthorized).

### The client metadata endpoint

The browser sends uncredentialed requests to this endpoint via the `GET` method, with the `clientId` passed into the `get()` call as a parameter.

For example:

```http
GET /client_metadata.php?client_id=1234 HTTP/1.1
Host: idp.example
Origin: https://rp.example/
Accept: application/json
Sec-Fetch-Dest: webidentity
```

The response to a successful request includes URLs pointing to the RP's metadata and terms of service pages, to be used in the browser-supplied FedCM UI. This should follow the JSON structure seen below:

```json
{
  "privacy_policy_url": "https://rp.example/privacy_policy.html",
  "terms_of_service_url": "https://rp.example/terms_of_service.html"
}
```

### The disconnect endpoint

By invoking `IdentityCredential.disconnect()`, the browser sends a cross-origin `POST` request with cookies and a `Content-Type` of `application/x-www-form-urlencoded` to the disconnect endpoint with the following information:

- `account_hint`
    A string specifying an account hint that the IdP uses the identify the account to disconnect.
- `client_id`
    A string specifying the RP's client identifier.

For example:

```http
POST /disconnect HTTP/1.1
Host: idp.example
Origin: rp.example
Content-Type: application/x-www-form-urlencoded
Cookie: 0x123
Sec-Fetch-Dest: webidentity

account_hint=account456&client_id=rp123
```

Upon receiving the request, the IdP server should:

1. Respond to the request with CORS (Cross-Origin Resource Sharing).
2. Verify that the request contains a `Sec-Fetch-Dest` HTTP header with a directive of `webidentity`.
3. Match the `Origin` header against the RP origin determined by the `client_id`. Reject the promise if they don't match.
4. Find the account that matches the `account_hint`.
5. Disconnect the user account from the list of RP's connected accounts. This means removing its ID from the `approved_clients` list.
6. Respond with the identified user's `account_id` in JSON format:

   ```json
   {
     "account_id": "account456"
   }
   ```

> **Note:**
> If the IdP wishes to disconnect all accounts associated with the RP, it can pass a string that does not match any `account_id`, for example `"account_id": "*"`.
