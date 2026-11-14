---
title: "dotnet nuget list client-cert command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-nuget-list-client-cert.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet nuget list client-cert

**This article applies to:** ✔️ .NET Core 3.1.400 SDK and later versions

## Name

`dotnet nuget list client-cert` - List configured NuGet client certificates.

## Synopsis

```dotnetcli
dotnet nuget list client-cert [--configfile <FILE>]

dotnet nuget list client-cert -h|--help
```

## Description

The `dotnet nuget list client-cert` command lists the client certificate configurations in your NuGet configuration files. For each configuration, the output includes:

- The package source name and certificate source type (`fileCert` or `storeCert`).
- For a file configuration, the certificate file path and an indication of whether a password is set. The password is masked.
- For a store configuration, the store location, store name, search method, and search value.
- The thumbprints of certificates that NuGet finds, or an error message if NuGet can't find or load a certificate.

The command lists certificates configured for NuGet package sources, not every certificate installed on your machine. It doesn't test authentication with the package sources.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

- List client certificate configurations from the NuGet configuration hierarchy:

  ```dotnetcli
  dotnet nuget list client-cert
  ```

- List client certificate configurations from a specific file:

  ```dotnetcli
  dotnet nuget list client-cert --configfile .\nuget.config
  ```

## See also

- dotnet nuget add client-cert
- dotnet nuget remove client-cert
- dotnet nuget update client-cert
- Common NuGet configurations
