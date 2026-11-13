---
title: ".NET default templates for 'dotnet new' (part 3 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-new-sdk-templates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET default templates for 'dotnet new' (part 3 of 4)

### `blazor`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  This template is available for .NET 8 or later.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated app.

- **`-int|--interactivity <None|Server|Webassembly|Auto >`**

  Specifies which interactive render mode to use for interactive components. The possible values are:

  - `None` - No interactivity (static server-side rendering only).
  - `Server` - (Default) Runs the app on the server with interactive server-side rendering.
  - `WebAssembly` - Runs the app using client-side rendering in the browser with WebAssembly.
  - `Auto` - Uses interactive server-side rendering while downloading the Blazor bundle and activating the Blazor runtime on the client, then uses client-side rendering with WebAssembly.

- **`--empty`**

  Omits sample pages and styling that demonstrate basic usage patterns.

- **`-au|--auth <AUTHENTICATION_TYPE>`**

  The type of authentication to use. The possible values are:

  - `None` - No authentication (Default).
  - `Individual` - Individual authentication.

- **`-uld|--use-local-db`**

  Specifies LocalDB should be used instead of SQLite. Only applies to `Individual` authentication.

- **`-ai|--all-interactive`**

  Makes every page interactive by applying an interactive render mode at the top level. If `false`, pages use static server-side rendering by default and can be marked interactive on a per-page or per-component basis. This option is only effective if the `-i|--interactivity` option isn't set to `None`.

- **`--no-https`**

  Turns off HTTPS. This option only applies if `Individual` isn't chosen for the `-au|--auth` option.

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method is generated instead of top-level statements.

***

### `web`

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated template.

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

- **`--no-https`**

  Turns off HTTPS.

- **`--kestrelHttpPort`**

  Port number to use for the HTTP endpoint in *launchSettings.json*.

- **`--kestrelHttpsPort`**

  Port number to use for the HTTPS endpoint in *launchSettings.json*. This option is not applicable when the parameter `no-https` is used (but `no-https` is ignored when an individual or organizational authentication setting is chosen for `--auth`).

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

###  `mvc`, `webapp`

- **`-au|--auth <AUTHENTICATION_TYPE>`**

  The type of authentication to use. The possible values are:

  - `None` - No authentication (Default).
  - `Individual` - Individual authentication.
  - `IndividualB2C` - Individual authentication with Azure AD B2C.
  - `SingleOrg` - Organizational authentication for a single tenant. Entra External ID tenants also use SingleOrg.
  - `MultiOrg` - Organizational authentication for multiple tenants.
  - `Windows` - Windows authentication.

- **`--aad-b2c-instance <INSTANCE>`**

  The Azure Active Directory B2C instance to connect to. Use with `IndividualB2C` authentication. The default value is `https://login.microsoftonline.com/tfp/`.

- **`-ssp|--susi-policy-id <ID>`**

  The sign-in and sign-up policy ID for this project. Use with `IndividualB2C` authentication.

- **`-rp|--reset-password-policy-id <ID>`**

  The reset password policy ID for this project. Use with `IndividualB2C` authentication.

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

  Turns off HTTPS. This option only applies if `Individual`, `IndividualB2C`, `SingleOrg`, or `MultiOrg` aren't being used.

- **`-uld|--use-local-db`**

  Specifies LocalDB should be used instead of SQLite. Only applies to `Individual` or `IndividualB2C` authentication.

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

- **`--use-browserlink`**

  Includes BrowserLink in the project.

- **`-rrc|--razor-runtime-compilation`**

  Determines if the project is configured to use Razor runtime compilation in Debug builds.

- **`--kestrelHttpPort`**

  Port number to use for the HTTP endpoint in *launchSettings.json*.

- **`--kestrelHttpsPort`**

  Port number to use for the HTTPS endpoint in *launchSettings.json*. This option is not applicable when the parameter `no-https` is used (but `no-https` is ignored when an individual or organizational authentication setting is chosen for `--auth`).

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

### `razorclasslib`

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`-s|--support-pages-and-views`**

  Supports adding traditional Razor pages and Views in addition to components to this library.

***

### `webapiaot`

Creates a web API project with AOT publish enabled. For more information, see Native AOT deployment and The Web API (Native AOT) template.

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated template.

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  The following table lists the default values according to the SDK version number you're using:

  | SDK version | Default value |
  |-------------|---------------|
  | 11.0        | `net11.0`     |
  | 10.0        | `net10.0`     |
  | 9.0         | `net9.0`      |
  | 8.0         | `net8.0`      |

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

### `webapi`

- **`-au|--auth <AUTHENTICATION_TYPE>`**

  The type of authentication to use. The possible values are:

  - `None` - No authentication (Default).
  - `IndividualB2C` - Individual authentication with Azure AD B2C.
  - `SingleOrg` - Organizational authentication for a single tenant. Entra External ID tenants also use SingleOrg.
  - `Windows` - Windows authentication.

- **`--aad-b2c-instance <INSTANCE>`**

  The Azure Active Directory B2C instance to connect to. Use with `IndividualB2C` authentication. The default value is `https://login.microsoftonline.com/tfp/`.

- **`-minimal|--use-minimal-apis`**

  Create a project that uses the ASP.NET Core minimal API. Default is `false`, but this option is overridden by `-controllers`. Since the default for `-controllers` is `false`, entering `dotnet new webapi` without specifying either option creates a minimal API project.

- **`-ssp|--susi-policy-id <ID>`**

  The sign-in and sign-up policy ID for this project. Use with `IndividualB2C` authentication.

- **`--aad-instance <INSTANCE>`**

  The Azure Active Directory instance to connect to. Use with `SingleOrg` authentication. The default value is `https://login.microsoftonline.com/`.

- **`--client-id <ID>`**

  The Client ID for this project. Use with `IndividualB2C` or `SingleOrg` authentication. The default value is `11111111-1111-1111-11111111111111111`.

- **`-controllers|--use-controllers`**

  Whether to use controllers instead of minimal APIs. If both this option and `-minimal` are specified, this option overrides the value specified by `-minimal`. Default is `false`. Available since .NET 8 SDK.

- **`--domain <DOMAIN>`**

  The domain for the directory tenant. Use with `IndividualB2C` or `SingleOrg` authentication. The default value is `qualified.domain.name`.

- **`--tenant-id <ID>`**

  The TenantId ID of the directory to connect to. Use with `SingleOrg` authentication. The default value is `22222222-2222-2222-2222-222222222222`.

- **`-r|--org-read-access`**

  Allows this application read-access to the directory. Only applies to `SingleOrg` authentication.

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated template.

- **`--no-openapi`**

  Turns off OpenAPI (Swagger) support. `AddOpenApi` and `MapOpenApi` aren't called.

- **`--no-https`**

  Turns off HTTPS. No *https* launch profile is created in `launchSettings.json`. `app.UseHsts` and `app.UseHttpsRedirection` aren't called in *Program.cs*/*Startup.cs*. This option only applies if `IndividualB2C` or `SingleOrg` aren't being used for authentication.

- **`-uld|--use-local-db`**

  Specifies LocalDB should be used instead of SQLite. Only applies to `IndividualB2C` authentication.

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

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

### `apicontroller`

API Controller with or without read/write actions.

- **`-p:n|--name <NAME>`**

  The namespace for the generated code. Default is `MyApp.Namespace`.

- **`-ac|--actions`**

  Create a controller with read/write actions. Default is `false`.

***

### `globaljson`

- **`--sdk-version <VERSION_NUMBER>`**

  Specifies the version of the .NET SDK to use in the *global.json* file.

- **`--roll-forward <ROLL_FORWARD_POLICY>`**

  The roll-forward policy to use when selecting an SDK version, either as a fallback when a specific SDK version is missing or as a directive to use a later version.
  For more information, see global-json.

- **`--test-runner <TEST_RUNNER>`**

  This option was introduced in .NET 10 SDK and specifies the test runner to use, either VSTest or MTP. The default is VSTest.

### `sln`

Creates an empty solution file containing no projects.

> **Note:**
> In .NET SDK 9.0.200 and later, this template supports a `--format` option to choose between `sln` and `slnx` formats. Starting with .NET 10, the default format is `slnx`.

***

### `editorconfig`

Creates an *.editorconfig* file for configuring code style preferences.

- **`--empty`**

  Creates an empty *.editorconfig* instead of the defaults for .NET.
