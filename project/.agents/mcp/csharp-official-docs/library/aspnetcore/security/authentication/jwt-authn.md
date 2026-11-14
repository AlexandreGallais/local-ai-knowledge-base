---
title: "Generate tokens with dotnet user-jwts"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/jwt-authn.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Manage JSON Web Tokens in development with dotnet user-jwts

By Rick Anderson

The `dotnet user-jwts` command line tool can create and manage app specific local JSON Web Tokens (JWTs).

This article provides syntax details for the command and examples.

## Synopsis

```dotnetcli
dotnet user-jwts [<PROJECT>] [command]
dotnet user-jwts [command] -h|--help
```

## Description

Creates and manages project specific local JSON Web Tokens.

## Arguments

`PROJECT | SOLUTION`

The MSBuild project to apply a command on. If a project isn't specified, MSBuild searches the current working directory for a file that has a file extension that ends in *proj*. It then uses that file to obtain the project information for the command.

<!-- When solutions are supported, delete the preceding and uncomment this section

```dotnetcli
dotnet user-jwts [<PROJECT>|<SOLUTION>] [command]
dotnet user-jwts [command] -h|--help
```

## Description

Creates and manages project specific local JSON Web Tokens.

## Arguments

`PROJECT | SOLUTION`

The MSBuild project or solution to apply a command on. If a project or solution file is not specified, MSBuild searches the current working directory for a file that has a file extension that ends in *proj* or *sln*, and uses that file.

-->

## Commands

| Command  | Description |
| -------- | ----------- |
| `clear`  | Delete all issued JWTs for a project. |
| `create` | Issue a new JSON Web Token.   |
| `remove` | Delete a given JWT. |
| `key`    | Display or reset the signing key used to issue JWTs. |
| `list`   | List the JWTs issued for the project. |
| `print`  | Display the details of a given JWT. |

### Options for the create command

Usage: `dotnet user-jwts create [options]`

| Option  | Description |
| ------- | ----------- |
| `-p \| --project` | The path of the project to operate on. Defaults to the project in the current directory. |
| `--scheme`        | The scheme name to use for the generated token. Defaults to `Bearer`. |
| `-n \| --name`    | The name of the user to create the JWT for. Defaults to the current environment user. |
| `--audience`      | The audiences to create the JWT for. Defaults to the URLs configured in the project's _launchSettings.json_ file. |
| `--issuer`        | The issuer of the JWT. Defaults to `dotnet-user-jwts`. |
| `--scope`         | A scope claim to add to the JWT. Specify once for each scope. |
| `--role`          | A role claim to add to the JWT. Specify once for each role. |
| `--claim`         | Claims to add to the JWT. Specify once for each claim in the format `name=value`. |
| `--not-before`    | The UTC date and time at which the JWT becomes valid, in the format `yyyy-MM-dd [[HH:mm[[:ss]]]]`. Defaults to the date and time the JWT is created. |
| `--expires-on`    | The UTC date and time at which the JWT expires, in the format `yyyy-MM-dd [[[ [HH:mm]]:ss]]`. Defaults to six months after the `--not-before` date. Don't use this option with the `--valid-for` option. |
| `--valid-for`     | The amount of time the JWT remains valid. When the time is reached, the JWT expires. Specify a number followed by the duration type (`d` days, `h` hours, `m` minutes, `s` seconds), such as `365d`. Don't use this option with the `--expires-on` option. |
| `-o \| --output`  | The format to use for displaying output from the command: `default`, `token`, or `json`. |
| `-h \| --help`    | Show help information for the command. |

## Use with file-based apps

`dotnet user-jwts` works with file-based apps through the `--file` option. Point `--file` at the app's C# file (`.cs`).

In the following example, the app is a file named `app.cs` without a project file, and the command is executed in a command shell from the app's root directory:

```dotnetcli
dotnet user-jwts create --file app.cs
```

The `--file` option applies to every `user-jwts` command (`create`, `clear`, `key`, `list`, `print`, and `remove`), the same way the `--project` option does. When neither `--file` nor `--project` is specified, the tool searches the current directory for an MSBuild project.

Rules:

* The path passed to `--file` must be a C# file with the `.cs` file extension.
* The `--file` and `--project` options can't be used together.

## Examples

Run the following commands to create an empty web project and add the Microsoft.AspNetCore.Authentication.JwtBearer NuGet package:

```dotnetcli
dotnet new web -o MyJWT
cd MyJWT
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

Replace the contents of the _Program.cs_ file with the following code:

```csharp
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication("Bearer").AddJwtBearer();

var app = builder.Build();

app.UseAuthorization();

app.MapGet("/", () => "Hello, World!");
app.MapGet("<example-value>", (ClaimsPrincipal user) => $"<example-value>")
    .RequireAuthorization();

app.Run();
```
In the preceding code, a GET request to the `/secret` endpoint returns a `401 Unauthorized` error. A production app might get the JWT from a Security token <example-value>, perhaps in response to signing in with credentials. When you use the API during local development, the `dotnet user-jwts` command line tool can be used to create and manage app-specific local JWTs.

The `user-jwts` tool is similar in concept to the user-secrets tool. It can be used to manage values for the app that are valid only for the developer on the local machine. In fact, the `user-jwts` tool utilizes the `user-secrets` infrastructure to store the symmetric signing secret (there's no public key) under `Authentication:Schemes:Bearer:<example-value>`. In the Development environment, the default host configuration makes user secrets available to `AddJwtBearer()` for signature validation. This approach ensures the key is stored safely in the user profile.

The `user-jwts` tool hides implementation details, such as where and how the values are stored. The tool can be used without knowing the implementation details.

The issued-token <example-value> (not the signing key) are stored in a JSON file in the local machine's user profile folder:

- **Windows**: _%APPDATA%\Microsoft\UserSecrets\<secrets_GUID>\user-jwts.json_

- **Linux/macOS**: _~/.microsoft/usersecrets/<secrets_GUID>/user-jwts.json_

### Create a JWT

The following command creates a local JWT:

```dotnetcli
dotnet user-jwts create
```

The preceding command creates a JWT and updates the project `appsettings.Development.json` file with JSON similar to the following example:

```csharp
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "Authentication": {
    "Schemes": {
      "Bearer": {
        "ValidAudiences": [
          "http://localhost:8401",
          "https://localhost:44308",
          "http://localhost:5182",
          "https://localhost:7076"
        ],
        "ValidIssuer": "dotnet-user-jwts"
      }
    }
  }
}
```
Copy the JWT and the `ID` created in the preceding command. Use a tool like Curl to test the `/secret` endpoint, where `{token}` is the previously generated JWT:

```dotnetcli
curl -i -H "<example-value>" https://localhost:{port}/secret
```

### Display JWT security information

The following command displays the JWT security information, including expiration, scopes, roles, token <example-value> and payload, and the compact token:

```dotnetcli
dotnet user-jwts print {ID} --show-all
```

### Create a token for a specific user and scope

The following command creates a JWT for a user named `MyTestUser`. For the supported `create` options, see the Options for the create command section.

```dotnetcli
dotnet user-jwts create --name MyTestUser --scope "<example-value>"
```

The preceding command has output similar to the following example:

```dotnetcli
New JWT saved with ID '43e0b748'.
Name: MyTestUser
Scopes: myapi:secrets

Token: <example-jwt>{Remaining token <example-value>}
```

The preceding token can be used to test the `/secret2` endpoint in the following code:

```csharp
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication("Bearer").AddJwtBearer();

var app = builder.Build();

app.MapGet("/", () => "Hello, World!");
app.MapGet("<example-value>", (ClaimsPrincipal user) => $"<example-value>")
    .RequireAuthorization();
app.MapGet("<example-value>", () => "<example-value>")
    .RequireAuthorization(p => p.RequireClaim("<example-value>", "<example-value>"));

app.Run();
```
## Related content

- Microsoft.AspNetCore.Authentication.JwtBearer
- JSON Web Tokens
