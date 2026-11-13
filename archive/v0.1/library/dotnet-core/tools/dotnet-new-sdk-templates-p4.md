---
title: ".NET default templates for 'dotnet new' (part 4 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-new-sdk-templates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET default templates for 'dotnet new' (part 4 of 4)

## Discontinued templates

The following table shows templates that have been discontinued and no longer come preinstalled with the .NET SDK. To see any template-specific options, select the short name link.

| Templates                  | Short name                            | Language | Tags        | Discontinued since |
|----------------------------|---------------------------------------|----------|-------------|--------------------|
| ASP.NET Core with Angular  | `angular`                     | [C#]     | Web/MVC/SPA | 8.0                |
| ASP.NET Core with React.js | `react`                       | [C#]     | Web/MVC/SPA | 8.0                |
| Blazor Server App          | `blazorserver`       | [C#]     | Web/Blazor  | 8.0                |
| Blazor Server App Empty    | `blazorserver-empty` | [C#]     | Web/Blazor  | 8.0                |
| Blazor WebAssembly App Empty | `blazorwasm-empty`   | [C#]     | Web/Blazor/WebAssembly | 8.0     |

###  `angular`, `react`

**Discontinued since .NET 8 SDK.**

- **`-au|--auth <AUTHENTICATION_TYPE>`**

  The type of authentication to use.

  The possible values are:

  - `None` - No authentication (Default).
  - `Individual` - Individual authentication.

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated template.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`--no-https`**

  Turns off HTTPS. This option only applies if authentication is `None`.

- **`-uld|--use-local-db`**

  Specifies LocalDB should be used instead of SQLite. Only applies to `Individual` or `IndividualB2C` authentication.

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  The following table lists the default values according to the SDK version number you're using:

  > **Note:**
  > There isn't a React template for `net8.0`, however, if you're interested in developing React apps with ASP.NET Core, see Overview of Single Page Apps (SPAs) in ASP.NET Core.

  | SDK version | Default value |
  |-------------|---------------|
  | 7.0         | `net7.0`      |

  To create a project that targets a framework earlier than the SDK that you're using, see `--framework` for `console` projects earlier in this article.

- **`--kestrelHttpPort`**

  Port number to use for the HTTP endpoint in *launchSettings.json*.

- **`--kestrelHttpsPort`**

  Port number to use for the HTTPS endpoint in *launchSettings.json*. This option is not applicable when the parameter `no-https` is used (but `no-https` is ignored when an individual or organizational authentication setting is chosen for `--auth`).

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

### `blazorserver`

**Discontinued since .NET 8 SDK.**

- **`-au|--auth <AUTHENTICATION_TYPE>`**

  The type of authentication to use. The possible values are:

  - `None` - No authentication (Default).
  - `Individual` - Individual authentication.
  - `IndividualB2C` - Individual authentication with Azure AD B2C.
  - `SingleOrg` - Organizational authentication for a single tenant. Entra External ID tenants also use `SingleOrg`.
  - `MultiOrg` - Organizational authentication for multiple tenants.
  - `Windows` - Windows authentication.

- **`--aad-b2c-instance <INSTANCE>`**

  The Azure Active Directory B2C instance to connect to. Use with `IndividualB2C` authentication. The default value is `https://login.microsoftonline.com/tfp/`.

- **`-ssp|--susi-policy-id <ID>`**

  The sign-in and sign-up policy ID for this project. Use with `IndividualB2C` authentication.

- **`-rp|--reset-password-policy-id <ID>`**

  The reset password <example-value> ID for this project. Use with `IndividualB2C` authentication.

- **`-ep|--edit-profile-policy-id <ID>`**

  The edit profile policy ID for this project. Use with `IndividualB2C` authentication.

- **`--aad-instance <INSTANCE>`**

  The Azure Active Directory instance to connect to. Use with `SingleOrg` or `MultiOrg` authentication. The default value is `https://login.microsoftonline.com/`.

- **`--client-id <ID>`**

  The Client ID for this project. Use with `IndividualB2C`, `SingleOrg`, or `MultiOrg` authentication. The default value is `11111111-1111-1111-11111111111111111`.

- **`--domain <DOMAIN>`**

  The domain for the directory tenant. Use with `SingleOrg` or `IndividualB2C` authentication. The default value is `qualified.domain.name`.

- **`--tenant-id <ID>`**

  The TenantId ID of the directory to connect to. Use with `SingleOrg` authentication. The default value is `22222222-2222-2222-2222-222222222222`.

- **`--callback-path `**

  The request path within the application's base path of the redirect URI. Use with `SingleOrg` or `IndividualB2C` authentication. The default value is `/signin-oidc`.

- **`-r|--org-read-access`**

  Allows this application read-access to the directory. Only applies to `SingleOrg` or `MultiOrg` authentication.

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated template.

- **`--no-https`**

  Turns off HTTPS. This option only applies if `Individual`, `IndividualB2C`, `SingleOrg`, or `MultiOrg` aren't being used for `--auth`.

- **`-uld|--use-local-db`**

  Specifies LocalDB should be used instead of SQLite. Only applies to `Individual` or `IndividualB2C` authentication.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`--kestrelHttpPort`**

  Port number to use for the HTTP endpoint in *launchSettings.json*.

- **`--kestrelHttpsPort`**

  Port number to use for the HTTPS endpoint in *launchSettings.json*. This option is not applicable when the parameter `no-https` is used (but `no-https` is ignored when an individual or organizational authentication setting is chosen for `--auth`).

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

### `blazorwasm`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  The following table lists the default values according to the SDK version number you're using:

  | SDK version | Default value |
  |-------------|---------------|
  | 11.0        | `net11.0`     |
  | 10.0        | `net10.0`     |
  | 9.0         | `net9.0`      |
  | 8.0         | `net8.0`      |

  To create a project that targets a framework earlier than the SDK that you're using, see `--framework` for `console` projects earlier in this article.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`-ho|--hosted`**

  Includes an ASP.NET Core host for the Blazor WebAssembly app.

- **`-au|--auth <AUTHENTICATION_TYPE>`**

  The type of authentication to use. The possible values are:

  - `None` - No authentication (Default).
  - `Individual` - Individual authentication.
  - `IndividualB2C` - Individual authentication with Azure AD B2C.
  - `SingleOrg` - Organizational authentication for a single tenant. Entra External ID tenants also use SingleOrg.

- **`--authority <AUTHORITY>`**

  The authority of the OIDC provider. Use with `Individual` authentication. The default value is `https://login.microsoftonline.com/`.

- **`--aad-b2c-instance <INSTANCE>`**

  The Azure Active Directory B2C instance to connect to. Use with `IndividualB2C` authentication. The default value is `https://aadB2CInstance.b2clogin.com/`.

- **`-ssp|--susi-policy-id <ID>`**

  The sign-in and sign-up policy ID for this project. Use with `IndividualB2C` authentication.

- **`--aad-instance <INSTANCE>`**

  The Azure Active Directory instance to connect to. Use with `SingleOrg` authentication. The default value is `https://login.microsoftonline.com/`.

- **`--client-id <ID>`**

  The Client ID for this project. Use with `IndividualB2C`, `SingleOrg`, or `Individual` authentication in standalone scenarios. The default value is `33333333-3333-3333-33333333333333333`.

- **`--domain <DOMAIN>`**

  The domain for the directory tenant. Use with `SingleOrg` or `IndividualB2C` authentication. The default value is `qualified.domain.name`.

- **`--app-id-uri <URI>`**

  The App ID Uri for the server API you want to call. Use with `SingleOrg` or `IndividualB2C` authentication. The default value is `api.id.uri`.

- **`--api-client-id <ID>`**

  The Client ID for the API that the server hosts. Use with `SingleOrg` or `IndividualB2C` authentication. The default value is `11111111-1111-1111-11111111111111111`.

- **`-s|--default-scope <SCOPE>`**

  The API scope the client needs to request to provision an access token. Use with `SingleOrg` or `IndividualB2C` authentication. The default value is `user_impersonation`.

- **`--tenant-id <ID>`**

  The TenantId ID of the directory to connect to. Use with `SingleOrg` authentication. The default value is `22222222-2222-2222-2222-222222222222`.

- **`-r|--org-read-access`**

  Allows this application read-access to the directory. Only applies to `SingleOrg` authentication.

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated template.

- **`-p|--pwa`**

  produces a Progressive Web Application (PWA) supporting installation and offline use.

- **`--no-https`**

  Turns off HTTPS. This option only applies if `Individual`, `IndividualB2C`, or `SingleOrg` aren't being used for `--auth`.

- **`-uld|--use-local-db`**

  Specifies LocalDB should be used instead of SQLite. Only applies to `Individual` or `IndividualB2C` authentication.

- **`--called-api-url <URL>`**

  URL of the API to call from the web app. Only applies to `SingleOrg` or `IndividualB2C` authentication without an ASP.NET Core host specified. The default value is `https://graph.microsoft.com/v1.0/me`.

- **`--calls-graph`**

  Specifies if the web app calls Microsoft Graph. Only applies to `SingleOrg` authentication.

- **`--called-api-scopes <SCOPES>`**

  Scopes to request to call the API from the web app. Only applies to `SingleOrg` or `IndividualB2C` authentication without an ASP.NET Core host specified. The default is `user.read`.

- **`--kestrelHttpPort`**

  Port number to use for the HTTP endpoint in *launchSettings.json*.

- **`--kestrelHttpsPort`**

  Port number to use for the HTTPS endpoint in *launchSettings.json*. This option is not applicable when the parameter `no-https` is used (but `no-https` is ignored when an individual or organizational authentication setting is chosen for `--auth`).

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

## See also

- dotnet new command
- dotnet new list command
- .NET templates for authors
- Create a custom template for dotnet new
- Implicit using directives
