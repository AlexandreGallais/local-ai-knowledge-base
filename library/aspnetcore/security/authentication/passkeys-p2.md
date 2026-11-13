---
title: "Enable Web Authentication API (WebAuthn) passkeys (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/passkeys/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Enable Web Authentication API (WebAuthn) passkeys (part 2 of 4)

## Customize the passkey handler

`Microsoft.AspNetCore.Identity.IPasskeyHandler`1` is the service that generates passkey options and performs attestation and assertion. ASP.NET Core Identity registers `Microsoft.AspNetCore.Identity.PasskeyHandler`1` as the default implementation, and `Microsoft.AspNetCore.Identity.SignInManager`1` calls into it. The interface has four methods:

* `Microsoft.AspNetCore.Identity.IPasskeyHandler`1.MakeCreationOptionsAsync*`: Generates the creation options and the attestation state for registering a passkey.
* `Microsoft.AspNetCore.Identity.IPasskeyHandler`1.MakeRequestOptionsAsync*`: Generates the request options and the assertion state for authenticating with an existing passkey.
* `Microsoft.AspNetCore.Identity.IPasskeyHandler`1.PerformAttestationAsync*`: Validates the credential that the browser returns during registration.
* `Microsoft.AspNetCore.Identity.IPasskeyHandler`1.PerformAssertionAsync*`: Validates the credential that the browser returns during authentication.

Most apps should use the `Microsoft.AspNetCore.Identity.SignInManager`1` methods shown in the Registration flow and Authentication flow sections instead of calling the handler directly. Those methods manage the temporary state that the two-request registration and authentication ceremonies require, and they protect that state on the app's behalf.

### When to implement `IPasskeyHandler<TUser>`

For most customizations, use the `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions` callbacks described in the Custom attestation statement validation and Custom origin validation sections. Implement `Microsoft.AspNetCore.Identity.IPasskeyHandler`1` only for scenarios that the options can't express, such as:

* Varying passkey options per request or per tenant.
* Resolving users from a source other than `Microsoft.AspNetCore.Identity.UserManager`1`.
* Adding checks that run before or after the built-in WebAuthn verification.

Implementing the interface from scratch means reimplementing the WebAuthn verification steps, which is error prone. Where possible, implement the interface as a wrapper that delegates to an inner `Microsoft.AspNetCore.Identity.PasskeyHandler`1` instance and adds only the required behavior.

> **Warning:**
> An app that calls `Microsoft.AspNetCore.Identity.IPasskeyHandler`1` directly, rather than through `Microsoft.AspNetCore.Identity.SignInManager`1`, becomes responsible for storing the attestation state securely. An app that fails to do so allows an attacker to register a passkey on an account that they don't own.

### Attestation state

Registering a passkey spans two requests. The first request obtains creation options, and the second request submits the new credential. The attestation state is the information that the server remembers between the two requests.

`Microsoft.AspNetCore.Identity.IPasskeyHandler`1.MakeCreationOptionsAsync*` returns a `Microsoft.AspNetCore.Identity.PasskeyCreationOptionsResult` with two parts:

* `Microsoft.AspNetCore.Identity.PasskeyCreationOptionsResult.CreationOptionsJson`: Sent to the browser and passed to `navigator.credentials.create()`.
* `Microsoft.AspNetCore.Identity.PasskeyCreationOptionsResult.AttestationState`: Retained by the app and supplied to `Microsoft.AspNetCore.Identity.PasskeyAttestationContext.AttestationState` when the credential is submitted.

The state that the default handler produces holds the challenge and the `Microsoft.AspNetCore.Identity.PasskeyUserEntity` that identifies the account the passkey is registered to. The state is serialized as JSON without a signature or encryption, so it provides no integrity protection of its own.

The state is the only place that records the account. An attestation response from the browser contains a new public key and the signed challenge but nothing that identifies a user, so `Microsoft.AspNetCore.Identity.IPasskeyHandler`1.PerformAttestationAsync*` reports the user taken from the state in `Microsoft.AspNetCore.Identity.PasskeyAttestationResult.UserEntity`. If the state is modified before the credential is submitted, the passkey is registered to whichever account the modified state names.

### Validate integrity and ownership

An app that manages the attestation state itself must meet the following three requirements.

**Integrity**: The client must not be able to modify the state. Don't place the state in a hidden form field, a request body, or unprotected browser storage. An attacker who alters the user ID in the state completes registration normally, and their authenticator is stored on the account that the altered state names, which grants them sign-in access to that account. Keep the state on the server or protect it with the ASP.NET Core Data Protection APIs before sending it to the browser.

**Ownership**: The state must be bound to the session that requested the creation options, and the binding must be checked when the credential is submitted. Compare `Microsoft.AspNetCore.Identity.PasskeyAttestationResult.UserEntity` to the signed-in user before storing the passkey. The handler doesn't perform this check because it has no independent record of the user to compare against.

**Single use and expiration**: Discard the state after reading it and give it a short lifetime. A state that remains valid can be replayed.

For reference, `Microsoft.AspNetCore.Identity.SignInManager`1` meets these requirements by:

* Storing the state in an authentication cookie protected by the Data Protection APIs, which the browser can't read or modify.
* Signing the state out as soon as it's read, which limits the state to a single use.
* Recording whether the state was created for attestation or assertion and rejecting a mismatch.

### Registration example

The following example calls `Microsoft.AspNetCore.Identity.IPasskeyHandler`1` directly and keeps the attestation state in a data-protected cookie. Both endpoints require an authenticated user because the passkey is added to the signed-in account:

```csharp
const string AttestationStateCookieName = "PasskeyAttestationState";
const string AttestationStatePurpose = "Contoso.Passkeys.AttestationState.v1";

app.MapPost("/Account/PasskeyCreationOptions", async (
    HttpContext context,
    UserManager<ApplicationUser> userManager,
    IPasskeyHandler<ApplicationUser> passkeyHandler,
    IDataProtectionProvider dataProtectionProvider) =>
{
    var user = await userManager.GetUserAsync(context.User);

    if (user is null)
    {
        return Results.Unauthorized();
    }

    var userId = await userManager.GetUserIdAsync(user);
    var userName = await userManager.GetUserNameAsync(user) ?? "User";

    var options = await passkeyHandler.MakeCreationOptionsAsync(new()
    {
        Id = userId,
        Name = userName,
        DisplayName = userName
    }, context);

    var attestationState = options.AttestationState 
        ?? throw new InvalidOperationException("No attestation state was created.");

    var protector = 
        dataProtectionProvider.CreateProtector(AttestationStatePurpose);

    context.Response.Cookies.Append(
        AttestationStateCookieName,
        protector.Protect(attestationState),
        new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            MaxAge = TimeSpan.FromMinutes(5)
        });

    return TypedResults.Content(options.CreationOptionsJson, 
        contentType: "application/json");
}).RequireAuthorization();
```

The preceding code:

* Protects the attestation state with the data protection APIs before the state reaches the browser, so the client can't read or modify it.
* Limits the cookie to a five minute lifetime, which bounds how long a registration can stay open.

When the credential arrives, the app restores the state, verifies that the attestation belongs to the signed-in user, and only then stores the passkey:

```csharp
app.MapPost("/Account/PasskeyRegistration", async (
    PasskeyRegistrationRequest request,
    HttpContext context,
    UserManager<ApplicationUser> userManager,
    IPasskeyHandler<ApplicationUser> passkeyHandler,
    IDataProtectionProvider dataProtectionProvider) =>
{
    var user = await userManager.GetUserAsync(context.User);

    if (user is null)
    {
        return Results.Unauthorized();
    }

    if (!context.Request.Cookies.TryGetValue(AttestationStateCookieName, 
        out var protectedState))
    {
        return Results.BadRequest("No passkey registration is underway");
    }

    context.Response.Cookies.Delete(AttestationStateCookieName);

    var protector = 
        dataProtectionProvider.CreateProtector(AttestationStatePurpose);
    string attestationState;

    try
    {
        attestationState = protector.Unprotect(protectedState);
    }
    catch (CryptographicException)
    {
        return Results.BadRequest("The passkey registration state isn't valid");
    }

    var attestationResult = await passkeyHandler.PerformAttestationAsync(new()
    {
        HttpContext = context,
        CredentialJson = request.CredentialJson,
        AttestationState = attestationState
    });

    if (!attestationResult.Succeeded)
    {
        return Results.BadRequest($"Error: {attestationResult.Failure.Message}");
    }

    var userId = await userManager.GetUserIdAsync(user);

    if (!string.Equals(attestationResult.UserEntity.Id, userId, 
        StringComparison.Ordinal))
    {
        return Results.BadRequest("The passkey isn't registered to the current user");
    }

    var addResult = 
        await userManager.AddOrUpdatePasskeyAsync(user, attestationResult.Passkey);

    if (!addResult.Succeeded)
    {
        return Results.BadRequest("Failed to store passkey");
    }

    return Results.Ok();
}).RequireAuthorization();
```

The preceding code:

* Deletes the state cookie before the state is used, so the state is good for a single registration.
* Rejects the request when the state can't be unprotected, which happens when the value was tampered with or was protected with a different key.
* Confirms that the attestation result names the signed-in user before the passkey is stored. The handler takes the account from the attestation state, so this check is what stops a passkey from being attached to another account.

The `PasskeyRegistrationRequest` type carries the serialized credential from the browser:

```csharp
public record PasskeyRegistrationRequest(string CredentialJson);
```

### Register a custom handler

`AddSignInManager` registers the default handler with `AddScoped` rather than `TryAddScoped`, so a custom handler must be registered ***after*** the Identity services to be the implementation that's resolved:

```csharp
builder.Services.AddIdentityCore<ApplicationUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager();

builder.Services
    .AddScoped<IPasskeyHandler<ApplicationUser>, CustomPasskeyHandler>();
```
