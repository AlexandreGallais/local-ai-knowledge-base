---
title: "dotnet nuget remove client-cert command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-nuget-remove-client-cert.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet nuget remove client-cert

**This article applies to:** ✔️ .NET Core 3.1.400 SDK and later versions

## Name

`dotnet nuget remove client-cert` - Remove a client certificate configuration for a NuGet package source.

## Synopsis

```dotnetcli
dotnet nuget remove client-cert --package-source <SOURCE_NAME>
    [--configfile <FILE>]

dotnet nuget remove client-cert -h|--help
```

## Description

The `dotnet nuget remove client-cert` command removes the client certificate configuration that matches the given package source name.

The command doesn't delete the certificate file, remove certificates from a certificate store, or remove the package source itself. If no client certificate configuration matches the name, NuGet reports that no matching configuration exists.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`-s|--package-source <SOURCE_NAME>`**

  The package source name associated with the client certificate configuration to remove. Required. Specify the source name, not its URL.

## Examples

Remove the client certificate configuration for the package source named `Contoso` from a specific configuration file:

```dotnetcli
dotnet nuget remove client-cert --package-source Contoso --configfile .\nuget.config
```

## See also

- dotnet nuget add client-cert
- dotnet nuget list client-cert
- dotnet nuget update client-cert
- dotnet nuget remove source
