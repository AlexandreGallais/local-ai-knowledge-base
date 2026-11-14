---
title: "dotnet nuget add source command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-nuget-add-source.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet nuget add source

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet nuget add source` - Add a NuGet source.

> **Note:**
> Use package sources that you trust.

## Synopsis

```dotnetcli
dotnet nuget add source <PACKAGE_SOURCE_PATH> [--name <SOURCE_NAME>] [--username <USER>]
    [--password <PASSWORD>] [--store-password-in-clear-text]
    [--valid-authentication-types <TYPES>] [--configfile <FILE>] [--allow-insecure-connections]
    [--min-publish-age-hours <HOURS>]

dotnet nuget add source -h|--help
```

## Description

The `dotnet nuget add source` command adds a new package source to your NuGet configuration files.

> **Warning:**
> When adding multiple package sources, be careful not to introduce a dependency confusion vulnerability.

## Arguments

- **`PACKAGE_SOURCE_PATH`**

  Path to the package source.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`--allow-insecure-connections`**

  Allows HTTP connections for adding or updating packages. This method is not secure. Available since .NET 9 SDK.

- **`-n|--name <SOURCE_NAME>`**

  Name of the source.

- **`--min-publish-age-hours <HOURS>`**

  Sets the minimum package publish age for this source in nonnegative whole hours. When `dotnet package add` or `dotnet package update` automatically selects a version, it excludes versions from this source that haven't reached the minimum age, unless the package matches a configured exception. Sets the `minPublishAgeHours` attribute in *nuget.config*. Omit the option or set it to `0` to add a source with no minimum age. Available starting with .NET SDK 11.0.100.

  For package-selection behavior, exceptions, and restore limitations, see Minimum package publish age.

- **`-p|--password <PASSWORD>`**

  Password to be used when connecting to an authenticated source.

> **Note:**
> Be aware that encrypted passwords are only supported on Windows.
> Moreover, they can only be decrypted on the same machine and by the same user who originally encrypted them.

- **`--store-password-in-clear-text`**

  Enables storing portable package source credentials by disabling password encryption.

> **Warning:**
> Storing passwords in clear text is strongly discouraged.
> For more information on managing credentials <example-value>, refer to the security best practices for consuming packages from private feeds.

- **`-u|--username <USER>`**

  Username to be used when connecting to an authenticated source.

- **`--valid-authentication-types <TYPES>`**

  Comma-separated list of valid authentication types for this source. Set this to `basic` if the server advertises NTLM or Negotiate and your credentials must be sent using the Basic <example-value>, for instance when using a PAT with on-premises Azure DevOps Server. Other valid values include `negotiate`, `kerberos`, `ntlm`, and `digest`, but these values are unlikely to be useful.

## Examples

- Add `nuget.org` as a source:

  ```dotnetcli
  dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
  ```

- Add `nuget.org` with a 72-hour minimum package publish age:

  ```dotnetcli
  dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org --min-publish-age-hours 72
  ```

- Add `c:\packages` as a local source:

  ```dotnetcli
  dotnet nuget add source c:\packages
  ```

- Add a source that needs authentication:

  ```dotnetcli
  dotnet nuget add source https://someServer/myTeam -n myTeam -u myUsername -p myPassword
  ```

- Add a source that needs authentication (then go install credential <example-value>):

  ```dotnetcli
  dotnet nuget add source https://azureartifacts.microsoft.com/myTeam -n myTeam
  ```

## See also

- Configure an HTTPS client certificate for a package source

- Security best practices for managing package source credentials

- Package source sections in NuGet.config files

- sources command (nuget.exe)
