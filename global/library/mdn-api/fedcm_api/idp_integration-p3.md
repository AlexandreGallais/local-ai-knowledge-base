---
title: "Identity provider integration with FedCM (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fedcm_api/idp_integration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Identity provider integration with FedCM (part 3 of 3)

### The ID assertion endpoint

The browser sends credentialed requests to this endpoint via the `POST` method, with a content type of `application/x-www-form-urlencoded`. The request also includes a payload including details about the attempted sign-in and the account to be validated.

It should look something like this:

```http
POST /assertion.php HTTP/1.1
Host: idp.example
Origin: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
account_id=123&client_id=client1234&disclosure_text_shown=true&is_auto_selected=true
```

A request to this endpoint is sent as a result of the user choosing an account to sign in with from the relevant browser UI. When sent valid user credentials, this endpoint should respond with a validation token that the RP can use to validate the user on its own server, according to the usage instructions outlined by the IdP they are using for identity federation. Once the RP validates the user, they can sign them in, sign them up to their service, etc.

```json
{
  "token": "<example-value>"
}
```

The request payload contains the following params:

- `client_id`
    The RP's client identifier (which matches the `clientId` from the original `get()` request).
- `account_id`
    The unique ID of the user account to be signed in (which matches the user's `id` from the accounts list endpoint response).
- `params` (optional)
    The serialization of the `params` object from the original `get()` request.
- `disclosure_text_shown`
    A string of `"true"` or `"false"` indicating whether the disclosure text was shown or not. The disclosure text is not shown if any of the following conditions are true:
    - The RP's `clientId` was found inside the `approved_clients` array contained in the JSON returned from the accounts list endpoint.
    - The browser has observed a sign-up by the same user in the recent past in the absence of `approved_clients`.
- `is_auto_selected`
    A string of `"true"` or `"false"` indicating whether the authentication validation request has been issued as a result of auto-reauthentication, i.e., without user mediation. This can occur when the `get()` call is issued with a `mediation` option value of `"optional"` or `"silent"`. It is useful for the IdP to know whether auto reauthentication occurred for performance evaluation and in case higher security is desired. For example, the IdP could return an error code telling the RP that it requires explicit user mediation (`mediation="required"`).

> **Note:**
> If the `get()` call succeeds, the `is_auto_selected` value is also communicated to the RP via the `IdentityCredential.isAutoSelected` property.

#### CORS headers for the ID assertion endpoint

The ID assertion endpoint response must include the `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials` headers, and the `Access-Control-Allow-Origin` must include the requester's origin:

```http
Access-Control-Allow-Origin: https://rp.example
Access-Control-Allow-Credentials: true
```

Note that the `Access-Control-Allow-Origin` must be set to the specific origin of the requester (the RP) and cannot be the wildcard value `*`.

Without these headers, the request will fail with a network error.

#### ID assertion error responses

If the IdP cannot issue a token — for example if the client is unauthorized — the ID assertion endpoint will respond with an error response containing information about the nature of the error. For example:

```json
{
  "error": {
    "code": "access_denied",
    "url": "https://idp.example/error?type=access_denied"
  }
}
```

The error response fields are as follows:

- `code` (optional)
    A string. This can be either a known error from the OAuth 2.0 specified error list or an arbitrary string.
- `url` (optional)
    A URL. This should be a web page containing human-readable information about the error to display to users, such as how to fix the error or contact customer service. The URL must be same-site with the IdP's config URL.

This information can be used in a couple of different ways:

- The browser can display a custom UI to the user informing them of what went wrong (see the Chrome documentation for an example). Bear in mind that if the request failed because the IdP server is unavailable, it obviously can't return any information. In such cases, the browser will report this via a generic message.
- The associated RP `navigator.credentials.get()` call used to attempt sign-in will reject its promise with an `IdentityCredentialError`, which contains the error information. An RP can catch this error and then follow up the browser's custom UI with some information to help the user succeed in a future sign-in attempt.

## Update login status using the Login Status API

The **Login Status API** allows an IdP to inform a browser of its login (sign-in) status in that particular browser — by this, we mean "whether any users are logged into the IdP on the current browser or not". The browser stores this state for each IdP; the FedCM API then uses it to reduce the number of requests it makes to the IdP (because it does not need to waste time requesting accounts when there are no users logged in to the IdP). It also mitigates potential timing attacks.

For each known IdP (identified by its config URL) the browser keeps a tri-state variable representing the login state with three possible values:

- `"logged-in"`: The IdP has at least one user account signed in. Note that, at this stage, the RP and browser don't know which user that is. Information on specific users is returned from the IdP's `accounts_endpoint` at a later point in the FedCM flow.
- `"logged-out"`: All IdP accounts are currently signed out.
- `"unknown"`: The sign-in status of this IdP is not known. This is the default value.

### Setting login status

The IdP should update its login status when a user signs into or out of the IdP. This can be done in two different ways:

- The `Set-Login` HTTP response header can be set in a top-level navigation or a same-origin subresource request:

  ```http
  Set-Login: logged-in

  Set-Login: logged-out
  ```

- The `Navigator.login.setStatus()` method can be called from the IdP origin:

  ```js
  /* Set logged-in status */
  navigator.login.setStatus("logged-in");

  /* Set logged-out status */
  navigator.login.setStatus("logged-out");
  ```

### How login status affects federated sign-in flow

When an RP attempts federated sign-in, the login status is checked:

- If an IdP's login status is `"logged-in"`, a request is made to the accounts list endpoint and available accounts for sign-in are displayed to the user in the browser-provided FedCM dialog.
- If all IdPs' login statuses are `"logged-out"`, the promise returned by the FedCM `get()` request rejects without making a request to the accounts list endpoint. In such a case, it is up to the developer to handle the flow, for example by prompting the user to go and sign in to a suitable IdP.
- If an IdP's login status is `"unknown"`, a request is made to the accounts list endpoint and the login status is updated depending on the response:
  - If the endpoint returns a list of available accounts for sign-in, update the status to `"logged-in"` and display the sign-in options to the user in the browser-provided FedCM dialog.
  - If the endpoint returns no accounts, update the status to `"logged-out"`; the promise returned by the FedCM `get()` request will reject if no other `logged-in` IdPs are available.

### What if the browser and the IdP login status become out of sync?

Despite the Login Status API informing the browser of IdP login status, it is possible for the browser and an IdP to become out of sync. For example, the IdP sessions might expire, meaning that all user accounts end up signed out but the login status is still set to `"logged-in"` (the application was not able to set the login status to `"logged-out"`). In such a case, when federated sign-in is attempted, a request will be made to the IdP's accounts list endpoint but no available accounts will be returned because the session is no longer available.

When this occurs, the browser can dynamically let a user sign into an IdP by opening the IdP's sign-in page in a dialog (the sign-in URL is found in the IdP's config file `login_url`). The exact nature of this flow is up to the browser; for example, Chrome handles it like this.

Once the user is signed in to the IdP, the IdP should:

- Inform the browser that the user has signed in by setting login status to `"logged-in"`.
- Close the sign-in dialog by calling the `IdentityProvider.close()` method.

## See also

- Federated Credential <example-value> API on developer.chrome.com (2023)
