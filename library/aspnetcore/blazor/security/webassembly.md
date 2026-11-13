---
title: "Secure ASP.NET Core Blazor WebAssembly (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure ASP.NET Core Blazor WebAssembly

-->
-->

Blazor WebAssembly apps are secured in the same manner as single-page applications (SPAs). There are several approaches for authenticating users to SPAs, but the most common and comprehensive approach is to use an implementation based on the OAuth 2.0 protocol, such as OpenID Connect (OIDC).

The Blazor WebAssembly security documentation primarily focuses on how to accomplish user authentication and authorization tasks. For OAuth 2.0/OIDC general concept coverage, see the resources in the main overview article's *Related content* section.

## Client-side/SPA security of sensitive data and credentials

A Blazor WebAssembly app'<example-value>'s code can't be protected from inspection and tampering by users. Never place sensitive data into a Blazor WebAssembly app, such as app secrets, connection strings, passwords, security keys, and private .NET/C# code.

The following technologies are useful for storing sensitive data, which can be used together in the same app to split responsibilities for storing data among `Development`, `Staging`, and `Production` environments:

* Secret <example-value> tool: Only used on the local development system.
* Azure Key Vault: Can be used for locally-running apps in the `Development` environment and for `Staging`/`Production` deployments.

For examples of the preceding approaches, see Account confirmation and password <example-value> in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity.

## Web API requests

To protect .NET/C# code and data, use ASP.NET Core Data Protection features with a server-side ASP.NET Core backend web API. The client-side Blazor WebAssembly app calls the server-side web API for secure app features and data processing. For more information, see Call a web API from an ASP.NET Core Blazor app and the articles and examples in this documentation node.

Blazor WebAssembly apps are often prevented from making direct calls across origins to web APIs due to Cross-Origin Request Sharing (CORS) security. A typical exception looks like the following:

> :::no-loc text="Access to fetch at '{URL}' from origin 'https://localhost:{PORT}' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.":::

Even if you call `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestMode*` with a `Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestMode` field of `NoCors` (1) seeking to circumvent the preceding exception, the request usually fails due to CORS restrictions on the web API's origin, such as a restriction that only allows calls from specific origins or a restriction that prevents JavaScript `fetch` requests from a browser. The only way for such calls to succeed is for the web API that you're calling to allow your origin to call its origin with the correct CORS configuration. Most external web APIs don't allow you to configure their CORS policies. To deal with this restriction, adopt either of the following strategies:

* Maintain your own server-side ASP.NET Core backend web API. The client-side Blazor WebAssembly app calls your server-side web API, and your web API makes the request from its server-based C# code (not a browser) to the external web API with the correct CORS headers, returning the result to your client-side Blazor WebAssembly app.

* Use a proxy service to proxy the request from the client-side Blazor WebAssembly app to the external web API. The proxy service uses a server-side app to make the request on the client's behalf and returns the result after the call succeeds. In the following example based on CloudFlare's CORS PROXY, the `{REQUEST URI}` placeholder is the request URI:

  ```razor
  @using System.Net
  @inject IHttpClientFactory ClientFactory

  ...

  @code {
      public async Task CallApi()
      {
          var client = ClientFactory.CreateClient();

          var urlEncodedRequestUri = WebUtility.UrlEncode("{REQUEST URI}");

          using var request = new HttpRequestMessage(HttpMethod.Get, 
              $"https://corsproxy.io/?{urlEncodedRequestUri}");

          using var response = await client.SendAsync(request);

          ...
      }
  }
  ```

## Authentication library

Blazor WebAssembly supports authenticating and authorizing apps using OIDC via the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` library using the Microsoft identity platform. The library provides a set of primitives for seamlessly authenticating against ASP.NET Core backends. The library can authenticate against any third-party Identity Provider (IP) that supports OIDC, which are called OpenID Providers (OP).

The authentication support in the Blazor WebAssembly Library (`Authentication.js`) is built on top of the Microsoft Authentication Library (MSAL, `msal.js`), which is used to handle the underlying authentication protocol details. The Blazor WebAssembly Library only supports the Proof Key for Code Exchange (PKCE) authorization code flow. Implicit grant isn't supported.

Other options for authenticating SPAs exist, such as the use of SameSite cookies. However, the engineering design of Blazor WebAssembly uses OAuth and OIDC as the best option for authentication in Blazor WebAssembly apps. Token-based authentication based on JSON Web Tokens (JWTs) was chosen over cookie-based authentication for functional and security reasons:

* Using a token-based protocol offers fewer vulnerabilities, as the tokens aren't sent in all requests.
* The tokens are explicitly sent to the server, so server endpoints don't require protection against Cross-Site Request Forgery (CSRF). This allows you to host Blazor WebAssembly apps alongside MVC or Razor pages apps.
* Tokens have narrower permissions than cookies. For example, tokens can'<example-value>'s password <example-value> such functionality is explicitly implemented.
* Tokens have a short lifetime, one hour, which limits the attack window. Tokens can also be revoked at any time.
* Self-contained JWTs offer guarantees to the client and server about the authentication process. For example, a client has the means to detect and validate that the tokens it receives are legitimate and were emitted as part of a given authentication process. If a third party attempts to switch a token in the middle of the authentication process, the client can detect the switched token and avoid using it.
* Tokens with OAuth and OIDC don't rely on the user agent behaving correctly to ensure that the app is secure.
* Token-based protocols, such as OAuth and OIDC, allow for authenticating and authorizing users in standalone Blazor Webassembly apps with the same set of security characteristics.

> **Important:**
> For versions of ASP.NET Core that adopt Duende Identity Server in Blazor project templates, Duende Software might require you to pay a license fee for production use of Duende Identity Server. For more information, see Migrate from ASP.NET Core in .NET 5 to .NET 6.

## Authentication process with OIDC

The `Microsoft.AspNetCore.Components.WebAssembly.Authentication` library offers several primitives to implement authentication and authorization using OIDC. In broad terms, authentication works as follows:

* When an anonymous user selects the login button or requests a Razor component or page with the `[Authorize]` attribute applied, the user is redirected to the app's login page (`/authentication/login`).
* In the login page, the authentication library prepares for a redirect to the authorization endpoint. The authorization endpoint is outside of the Blazor WebAssembly app and can be hosted at a separate origin. The endpoint is responsible for determining whether the user is authenticated and for issuing one or more tokens in response. The authentication library provides a login callback to receive the authentication response.
  * If the user isn't authenticated, the user is redirected to the underlying authentication system, which is usually ASP.NET Core Identity.
  * If the user was already authenticated, the authorization endpoint generates the appropriate tokens and redirects the browser back to the login callback endpoint (`/authentication/login-callback`).
* When the Blazor WebAssembly app loads the login callback endpoint (`/authentication/login-callback`), the authentication response is processed.
  * If the authentication process completes successfully, the user is authenticated and optionally sent back to the original protected URL that the user requested.
  * If the authentication process fails for any reason, the user is sent to the login failed page (`/authentication/login-failed`), where an error is displayed.

## `Authentication` component

The `Authentication` component (`Authentication.razor`) handles remote authentication operations and permits the app to:

* Configure app routes for authentication states.
* Set UI content for authentication states.
* Manage authentication state.

Authentication actions, such as registering or signing in a user, are passed to the Blazor framework's `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticatorViewCore`1` component, which persists and controls state across authentication operations.

For more information and examples, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Authorization

In Blazor WebAssembly apps, authorization checks can be bypassed because all client-side code can be modified by users. The same is true for all client-side app technologies, including JavaScript SPA frameworks or native apps for any operating system.

**Always perform authorization checks on the server within any API endpoints accessed by your client-side app.**

## Customize authentication

Blazor WebAssembly provides methods to add and retrieve additional parameters for the underlying Authentication library to conduct remote authentication operations with external identity providers.

To pass <example-value> parameters, `Microsoft.AspNetCore.Components.NavigationManager` supports passing and retrieving history entry state when performing external location changes. For more information, see the following resources:

* Blazor *Fundamentals* > *Navigation* article
  * Navigation history state
  * Navigation options
* MDN documentation: History API

The state stored by the History API provides the following benefits for remote authentication:

* The state passed to the secured app endpoint is tied to the navigation performed to authenticate the user at the `authentication/login` endpoint.
* Extra work encoding and decoding data is avoided.
* Vulnerabilities are reduced. Unlike using the query string to store navigation state, a top-level navigation or influence from a different origin can't set the state stored by the History API.
* The history entry is replaced upon successful authentication, so the state attached to the history entry is removed and doesn't require clean up.

`Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions` represents the request to the identity provider for logging in or provisioning an access token.

`Microsoft.AspNetCore.Components.NavigationManagerExtensions` provides the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.NavigationManagerExtensions.NavigateToLogin*` method for a login operation and `Microsoft.AspNetCore.Components.WebAssembly.Authentication.NavigationManagerExtensions.NavigateToLogout*` for a logout operation. The methods call `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*`, setting the history entry state with a passed `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions` or a new `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions` instance created by the method for:

* A user signing in (`Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractionType.SignIn`) with the current URI for the return URL.
* A user signing out (`Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractionType.SignOut`) with the return URL.

The following authentication scenarios are covered in the ASP.NET Core Blazor WebAssembly additional security scenarios article:

* Customize the login process
* Logout with a custom return URL
* Customize options before obtaining a token <example-value>
* Customize options when using an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider`
* Obtain the login path from authentication options

## Blazor WebAssembly authorization patterns

*For patterns that apply to server-side Blazor apps (Blazor Web Apps, Blazor Server apps), see ASP.NET Core Blazor additional server-side security scenarios.*

Unlike server-side Blazor apps, Blazor WebAssembly apps don't support setting an `Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy` to a policy with `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser*`. The server-side fallback policy is enforced by authorization middleware and isn't a client-side authorization mechanism. Therefore, the only supported pattern for Blazor WebAssembly apps is to apply the `[Authorize]` attribute (API documentation) to Razor components using ***one*** of the following approaches:

* In the app's imports file, add an `@using` directive for the `Microsoft.AspNetCore.Authorization` namespace with an `@attribute` directive for the `[Authorize]` attribute.

  `_Imports.razor`:

  ```razor
  @using Microsoft.AspNetCore.Authorization
  @attribute [Authorize]
  ```

  Allow anonymous access to the `Authentication` component to permit redirection to the identity provider. Add the following Razor code to the `Authentication` component under its `@page` directive.

  `Authentication.razor`:

  ```razor
  @using Microsoft.AspNetCore.Components.WebAssembly.Authentication
  @attribute [AllowAnonymous]
  ```

* Add the attribute to each Razor component under the `@page` directive:

  ```razor
  @using Microsoft.AspNetCore.Authorization
  @attribute [Authorize]
  ```
