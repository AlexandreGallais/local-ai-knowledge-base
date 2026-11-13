---
title: "ASP.NET Core Blazor WebAssembly additional security scenarios (part 6 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly additional security scenarios (part 6 of 6)

## Replace the `AuthenticationService` implementation

The following subsections explain how to replace:

* Any JavaScript `AuthenticationService` implementation.
* The Microsoft Authentication Library for JavaScript (`MSAL.js`).

### Replace any JavaScript `AuthenticationService` implementation

Create a JavaScript library to handle your custom authentication details.

> **Warning:**
> The guidance in this section is an implementation detail of the default `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationService`3`. The TypeScript code in this section applies specifically to ASP.NET Core in .NET 7 and is subject to change without notice in upcoming releases of ASP.NET Core.

```typescript
// .NET makes calls to an AuthenticationService object in the Window.
declare global {
  interface Window { AuthenticationService: AuthenticationService }
}

export interface AuthenticationService {
  // Init is called to initialize the AuthenticationService.
  public static init(settings: UserManagerSettings & AuthorizeServiceSettings, logger: any) : Promise<void>;

  // Gets the currently authenticated user.
  public static getUser() : Promise<{[key: <example-value>] : string }>;

  // Tries to get an access token silently.
  public static getAccessToken(options: AccessTokenRequestOptions) : Promise<AccessTokenResult>;

  // Tries to sign in the user or get an access token interactively.
  public static signIn(context: AuthenticationContext) : Promise<AuthenticationResult>;

  // Handles the sign-in process when a redirect is used.
  public static async completeSignIn(url: string) : Promise<AuthenticationResult>;

  // Signs the user out.
  public static signOut(context: AuthenticationContext) : Promise<AuthenticationResult>;

  // Handles the signout callback when a redirect is used.
  public static async completeSignOut(url: string) : Promise<AuthenticationResult>;
}

// The rest of these interfaces match their C# definitions.

export interface AccessTokenRequestOptions {
  scopes: string[];
  returnUrl: string;
}

export interface AccessTokenResult {
  status: AccessTokenResultStatus;
  token?: AccessToken;
}

export interface AccessToken {
  value: string;
  expires: Date;
  grantedScopes: string[];
}

export enum AccessTokenResultStatus {
  Success = 'Success',
  RequiresRedirect = 'RequiresRedirect'
}

export enum AuthenticationResultStatus {
  Redirect = 'Redirect',
  Success = 'Success',
  Failure = 'Failure',
  OperationCompleted = 'OperationCompleted'
};

export interface AuthenticationResult {
  status: AuthenticationResultStatus;
  state?: unknown;
  message?: string;
}

export interface AuthenticationContext {
  state?: unknown;
  interactiveRequest: InteractiveAuthenticationRequest;
}

export interface InteractiveAuthenticationRequest {
  scopes?: string[];
  additionalRequestParameters?: { [key: <example-value>]: any };
};
```

You can import the library by removing the original `<script>` tag and adding a `<script>` tag that loads the custom library. The following example demonstrates replacing the default `<script>` tag with one that loads a library named `CustomAuthenticationService.js` from the `wwwroot/js` folder.

In `wwwroot/index.html` before the Blazor script (`_framework/blazor.webassembly.js`) inside the closing `</body>` tag:

```diff
- <script src="_content/Microsoft.Authentication.WebAssembly.Msal/AuthenticationService.js"></script>
+ <script src="js/CustomAuthenticationService.js"></script>
```

For more information, see `AuthenticationService.ts` in the `dotnet/aspnetcore` GitHub repository.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### Replace the Microsoft Authentication Library for JavaScript (`MSAL.js`)

If an app requires a custom version of the Microsoft Authentication Library for JavaScript (`MSAL.js`), perform the following steps:

1. Confirm the system has the latest developer .NET SDK or obtain and install the latest developer SDK from .NET SDK: Installers and Binaries. Configuration of internal NuGet feeds isn't required for this scenario.
1. Set up the `dotnet/aspnetcore` GitHub repository for development following the documentation at Build ASP.NET Core from Source. Fork and clone or download a ZIP archive of the `dotnet/aspnetcore` GitHub repository.
1. Open the `src/Components/WebAssembly/Authentication.Msal/src/Interop/package.json` file and set the desired version of `@azure/msal-browser`. For a list of released versions, visit the `@azure/msal-browser` npm website and select the **Versions** tab.
1. Build the `Authentication.Msal` project in the `src/Components/WebAssembly/Authentication.Msal/src` folder with the `yarn build` command in a command shell.
1. If the app uses compressed assets (Brotli/Gzip), compress the `Interop/dist/Release/AuthenticationService.js` file.
1. Copy the `AuthenticationService.js` file and compressed versions (`.br`/`.gz`) of the file, if produced, from the `Interop/dist/Release` folder into the app's `publish/wwwroot/_content/Microsoft.Authentication.WebAssembly.Msal` folder in the app's published assets.

## Pass <example-value> provider options

Define a class for passing the data to the underlying JavaScript library.

> **Important:**
> The class's structure must match what the library expects when the JSON is serialized with `System.Text.Json`.

The following example demonstrates a `ProviderOptions` class with `JsonPropertyName` attributes matching a hypothetical custom provider library's expectations:

```csharp
public class ProviderOptions
{
    public string? Authority { get; set; }
    public string? MetadataUrl { get; set; }
    
    [JsonPropertyName("client_id")]
    public string? ClientId { get; set; }
    
    public IList<string> DefaultScopes { get; set; } = [ "openid", "profile" ];
        
    [JsonPropertyName("redirect_uri")]
    public string? RedirectUri { get; set; }
    
    [JsonPropertyName("post_logout_redirect_uri")]
    public string? PostLogoutRedirectUri { get; set; }
    
    [JsonPropertyName("response_type")]
    public string? ResponseType { get; set; }
    
    [JsonPropertyName("response_mode")]
    public string? ResponseMode { get; set; }
}
```

Register the provider options within the DI system and configure the appropriate values:

```csharp
builder.Services.AddRemoteAuthentication<RemoteAuthenticationState, RemoteUserAccount,
    ProviderOptions>(options => {
        options.ProviderOptions.Authority = "...";
        options.ProviderOptions.MetadataUrl = "...";
        options.ProviderOptions.ClientId = "...";
        options.ProviderOptions.DefaultScopes = [ "openid", "profile", "myApi" ];
        options.ProviderOptions.RedirectUri = "https://localhost:5001/authentication/login-callback";
        options.ProviderOptions.PostLogoutRedirectUri = "https://localhost:5001/authentication/logout-callback";
        options.ProviderOptions.ResponseType = "...";
        options.ProviderOptions.ResponseMode = "...";
    });
```

The preceding example sets redirect URIs with regular string literals. The following alternatives are available:

* `System.Uri.TryCreate*` using `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress`:

  ```csharp
  Uri.TryCreate(
      $"{builder.HostEnvironment.BaseAddress}authentication/login-callback", 
      UriKind.Absolute, out var redirectUri);
  options.RedirectUri = redirectUri;
  ```

* Host builder configuration:

  ```csharp
  options.RedirectUri = builder.Configuration["RedirectUri"];
  ```

  `wwwroot/appsettings.json`:

  ```json
  {
    "RedirectUri": "https://localhost:5001/authentication/login-callback"
  }
  ```

## Related content

* Use Graph API with ASP.NET Core Blazor WebAssembly
* Cookie-based request credentials (*Call web API* article)
* `HttpClient` and `HttpRequestMessage` with Fetch API request options (*Call web API* article)
