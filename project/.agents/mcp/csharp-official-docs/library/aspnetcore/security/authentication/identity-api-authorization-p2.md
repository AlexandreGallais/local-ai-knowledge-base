---
title: "Use Identity to secure a Web API backend for SPAs (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/identity-api-authorization.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use Identity to secure a Web API backend for SPAs (part 2 of 2)

## Use the `POST /login` endpoint

In the request body, `Microsoft.AspNetCore.Identity.Data.LoginRequest.Email` and `Microsoft.AspNetCore.Identity.Data.LoginRequest.Password` are required. If two-factor authentication (2FA) is enabled, either `Microsoft.AspNetCore.Identity.Data.LoginRequest.TwoFactorCode` or `Microsoft.AspNetCore.Identity.Data.LoginRequest.TwoFactorRecoveryCode` is required. If 2FA isn't enabled, omit both `twoFactorCode` and `twoFactorRecoveryCode`. For more information, see Use the `POST /manage/2fa` endpoint later in this article.

Here's a request body example with 2FA not enabled:

```json
{
  "email": "string",
  "password": "<example-value>"
}
```

Here are request body examples with 2FA enabled:

* ```json
  {
    "email": "string",
    "password": "<example-value>",
    "twoFactorCode": "string",
  }
  ```

* ```json
  {
    "email": "string",
    "password": "<example-value>",
    "twoFactorRecoveryCode": "string"
  }
  ```

The endpoint supports the following query string parameters:

* `useCookies`: Set to `true` to issue a persistent authentication cookie when `useSessionCookies` isn't `true`.
* `useSessionCookies`: Set to `true` to issue a session (non-persistent) authentication cookie.

If both `useCookies` and `useSessionCookies` are set to `true`, a session cookie is issued. If both parameters are `false` or omitted, token-based authentication is used.

For more information about cookie-based authentication, see Test login earlier in this article.

### Token-based authentication

If both `useCookies` and `useSessionCookies` are `false` or omitted, token-based authentication is enabled. The response body includes the following properties:

```json
{
  "tokenType": "<example-value>",
  "accessToken": "<example-value>",
  "expiresIn": 0,
  "refreshToken": "<example-value>"
}
```

For more information about these properties, see `Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse`.

Use the BearerTokenOptions.BearerTokenExpiration property to set how long the access token <example-value> valid.

Put the access token in a header to make authenticated requests, as shown in the following example

```http
Authorization: Bearer {access token}
```

When the access token is about to expire, call the /refresh endpoint.

## Use the `POST /refresh` endpoint

For use only with token-based authentication. Gets a new access token <example-value> forcing the user to log in again. Call this endpoint when the access token is about to expire.

The request body contains only the `Microsoft.AspNetCore.Identity.Data.RefreshRequest.RefreshToken`. Here's a request body example:

```json
{
  "refreshToken": "<example-value>"
}
```

If the call is successful, the response body is a new `Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse`, as shown in the following example:

```json
{
  "tokenType": "<example-value>",
  "accessToken": "<example-value>",
  "expiresIn": 0,
  "refreshToken": "<example-value>"
}
```

Use the BearerTokenOptions.RefreshTokenExpiration property to set how long the refresh token <example-value> valid.

## Use the `GET /confirmEmail` endpoint

If Identity is set up for email confirmation, a successful call to the `/register` endpoint sends an email that contains a link to the `/confirmEmail` endpoint. The link contains the following query string parameters:

* `userId`
* `code`
* `changedEmail` - Included only if the user changed the email address during registration.

Identity provides default text for the confirmation email. By default, the email subject is "Confirm your email" and the email body looks like the following example:

```http
 Please confirm your account by <a href='https://contoso.com/confirmEmail?userId={user ID}&code={generated code}&changedEmail={new email address}'>clicking here</a>.
```

If the `Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail` property is set to `true`, the user can't log in until the email address is confirmed by clicking the link in the email. The `/confirmEmail` endpoint:

* Confirms the email address and enables the user to log in.
* Returns the text "Thank you for confirming your email." in the response body.

To set up Identity for email confirmation, add code in `Program.cs` to set `RequireConfirmedEmail` to `true` and add a class that implements `Microsoft.AspNetCore.Identity.UI.Services.IEmailSender` to the DI container. For example:

```csharp
builder.Services.Configure<IdentityOptions>(options =>
{
    options.SignIn.RequireConfirmedEmail = true;
});

builder.Services.AddTransient<IEmailSender, EmailSender>();
```
For more information, see Account confirmation and password recovery.

Identity provides default text for the other emails that need to be sent as well, such as for 2FA and password reset. To customize these emails, provide a custom implementation of the `IEmailSender` interface. In the preceding example, `EmailSender` is a class that implements `IEmailSender`. For more information, including an example of a class that implements `IEmailSender`, see Account confirmation and password recovery.

## Use the `POST /resendConfirmationEmail` endpoint

Sends an email only if the address is valid for a registered user.

The request body contains only the `Microsoft.AspNetCore.Identity.Data.ResendConfirmationEmailRequest.Email`. Here's a request body example:

```json
{
  "email": "string"
}
```

For more information, see Use the `GET /confirmEmail` endpoint earlier in this article.

## Use the `POST /forgotPassword` endpoint

Generates an email that contains a password reset code. Send that code to `/resetPassword` with a new password.

The request body contains only the `Microsoft.AspNetCore.Identity.Data.ForgotPasswordRequest.Email`. Here's an example:

```json
{
  "email": "string"
}
```

For information about how to enable Identity to send emails, see Use the `GET /confirmEmail` endpoint.

## Use the `POST /resetPassword` endpoint

Call this endpoint after getting a reset code by calling the `/forgotPassword` endpoint.

The request body requires `Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.Email`, `Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.ResetCode`, and `Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.NewPassword`. Here's an example:

```json
{
  "email": "string",
  "resetCode": "string",
  "newPassword": "<example-value>"
}
```

## Use the `POST /manage/2fa` endpoint

Configures two-factor authentication (2FA) for the user. When 2FA is enabled, successful login requires a code produced by an authenticator app in addition to the email address and password.

### Enable 2FA

To enable 2FA for the currently authenticated user:

* Call the `/manage/2fa` endpoint, sending an empty JSON object (`{}`) in the request body.

* The response body provides the `Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.SharedKey` along with some other properties that aren't needed at this point. The shared key is used to set up the authenticator app. Response body example:

  ```json
  {
    "sharedKey": "string",
    "recoveryCodesLeft": 0,
    "recoveryCodes": null,
    "isTwoFactorEnabled": false,
    "isMachineRemembered": false
  }
  ```

* Use the shared key to get a Time-based one-time password (TOTP). For more information, see Enable QR code generation for TOTP authentication.

* Call the `/manage/2fa` endpoint, sending the TOTP and `"enable": true` in the request body. For example:

    ```json
    {
      "enable": true,
      "twoFactorCode": "string"
    }
  ```

* The response body confirms that `Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.IsTwoFactorEnabled` is true and provides the `Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.RecoveryCodes`. The recovery codes are used to log in when the authenticator app isn't available. Response body example after successfully enabling 2FA:

  ```json
  {
    "sharedKey": "string",
    "recoveryCodesLeft": 10,
    "recoveryCodes": [
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string"
    ],
    "isTwoFactorEnabled": true,
    "isMachineRemembered": false
  }
  ```

### Log in with 2FA

Call the `/login` endpoint, sending the email address, password, and TOTP in the request body. For example:

```json
{
  "email": "string",
  "password": "<example-value>",
  "twoFactorCode": "string"
}
```

If the user doesn't have access to the authenticator app, log in by calling the `/login` endpoint with one of the recovery codes that was provided when 2FA was enabled. The request body looks like the following example:

  ```json
  {
    "email": "string",
    "password": "<example-value>",
    "twoFactorRecoveryCode": "string"
  }
  ```

### Reset the recovery codes

To get a new collection of recovery codes, call this endpoint with `Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ResetRecoveryCodes` set to `true`. Here's a request body example:

```json
{
  "resetRecoveryCodes": true
}
```

### Reset the shared key

To get a new random shared key, call this endpoint with `Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ResetSharedKey` set to `true`. Here's a request body example:

```json
{
  "resetSharedKey": true
}
```

Resetting the key <example-value> disables the two-factor login requirement for the authenticated user until it's re-enabled by a later request.

### Forget the machine

To clear the cookie "remember me flag" if present, call this endpoint with `Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ForgetMachine` set to true. Here's a request body example:

```json
{
  "forgetMachine": true
}
```

This endpoint has no impact on token-based authentication.

## Use the `GET /manage/info` endpoint

Gets email address and email confirmation status of the logged-in user. Claims were omitted from this endpoint for security reasons. If claims are needed, use the server-side APIs to set up an endpoint for claims. Or instead of sharing all of the users' claims, provide a validation endpoint that accepts a claim and responds whether the user has it.

The request doesn't require any parameters. The response body includes the `Microsoft.AspNetCore.Identity.Data.InfoResponse.Email` and `Microsoft.AspNetCore.Identity.Data.InfoResponse.IsEmailConfirmed` properties, as in the following example:

```json
{
  "email": "string",
  "isEmailConfirmed": true
}
```

## Use the `POST /manage/info` endpoint

Updates the email address and password of the logged-in user. Send `Microsoft.AspNetCore.Identity.Data.InfoRequest.NewEmail`, `Microsoft.AspNetCore.Identity.Data.InfoRequest.NewPassword`, and `Microsoft.AspNetCore.Identity.Data.InfoRequest.OldPassword` in the request body, as shown in the following example:

```json
{
  "newEmail": "string",
  "newPassword": "<example-value>",
  "oldPassword": "<example-value>"
}
```

Here's an example of the response body:

```json
{
  "email": "string",
  "isEmailConfirmed": false
}
```

## See also

For more information, see the following resources:

* Choose an identity management solution
* Identity management solutions for .NET web apps
* Simple authorization in ASP.NET Core
* Add, download, and delete user data to Identity in an ASP.NET Core project
* Create an ASP.NET Core app with user data protected by authorization
* Account confirmation and password <example-value>
* Enable QR code generation for TOTP authentication
* Sample Web API backend for SPAs
  The .http file shows token-based authentication. For example:
  * Doesn't set `useCookies`
  * Uses the Authorization header to pass the token
  * Shows refresh to extend session without forcing the user to login again
* Sample Angular app that uses Identity to secure a Web API backend
