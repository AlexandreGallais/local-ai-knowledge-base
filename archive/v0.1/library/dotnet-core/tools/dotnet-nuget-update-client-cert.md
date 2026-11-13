---
title: "dotnet nuget update client-cert command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-nuget-update-client-cert.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet nuget update client-cert

**This article applies to:** ✔️ .NET Core 3.1.400 SDK and later versions

## Name

`dotnet nuget update client-cert` - Update a client certificate configuration for a NuGet package source.

## Synopsis

```dotnetcli
dotnet nuget update client-cert --package-source <SOURCE_NAME>
    [--path <CERTIFICATE_PATH>] [--password <PASSWORD>]
    [--store-password-in-clear-text] [--configfile <FILE>] [-f|--force]

dotnet nuget update client-cert --package-source <SOURCE_NAME>
    [--find-value <VALUE>] [--find-by <FIND_TYPE>]
    [--store-location <LOCATION>] [--store-name <STORE_NAME>]
    [--configfile <FILE>] [-f|--force]

dotnet nuget update client-cert -h|--help
```

## Description

The `dotnet nuget update client-cert` command updates the client certificate configuration that matches a package source name. The configuration must already exist. To add a configuration, use dotnet nuget add client-cert.

Specify at least one setting for the existing certificate source type:

- **File:** Specify `--path`, `--password`, or both.
- **Certificate store:** Specify one or more of `--store-location`, `--store-name`, `--find-by`, and `--find-value`.

Settings you omit retain their existing values. For example, to replace a certificate file that uses the same password, specify only `--path`. To change how a password is stored, supply the password again with `--password`; `--store-password-in-clear-text` alone doesn't update the configuration.

Don't combine file options with store options. You can't change a file configuration to a store configuration, or a store configuration to a file configuration. To change the certificate source type, remove the configuration, and then add a new configuration.

Unless you specify `--force`, NuGet checks that it can find and load the certificate before it saves the configuration. The command doesn't test authentication with the package source.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see Common NuGet Configurations.

- **`--find-by <FIND_TYPE>`**

  The certificate store search method. Values are case-insensitive. Use an X.509 find type **without** the `FindBy` prefix. For example, use `Thumbprint` or `SubjectName`, not `FindByThumbprint` or `FindBySubjectName`. For all accepted values, see the add command's `--find-by` option.

- **`--find-value <VALUE>`**

  The value to search for in the certificate store, such as a certificate thumbprint or subject name.

- **`-f|--force`**

  Saves the configuration even if NuGet can't find or load the certificate. This option doesn't disable HTTPS server certificate validation.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`-s|--package-source <SOURCE_NAME>`**

  The package source name associated with the existing client certificate configuration. Required. Specify the source name, not its URL.

- **`--password <PASSWORD>`**

  The password for the certificate file. Use only with a file configuration. By default, NuGet encrypts the password <example-value> it saves it.

  > **Note:**
  > Password <example-value> is supported only on Windows. Only the same user on the same machine can decrypt the password.

- **`--path <CERTIFICATE_PATH>`**

  The path to the replacement certificate file.

  To select a specific file, use an absolute path. For a relative path, NuGet first checks the current working directory. If the file isn't there, NuGet checks the path relative to the directory that contains the NuGet configuration file.

- **`--store-location <LOCATION>`**

  The certificate store location: `CurrentUser` or `LocalMachine`.

- **`--store-name <STORE_NAME>`**

  The certificate store name. Accepted values are `AddressBook`, `AuthRoot`, `CertificateAuthority`, `Disallowed`, `My`, `Root`, `TrustedPeople`, and `TrustedPublisher`. Certificate store availability depends on your operating system.

- **`--store-password-in-clear-text`**

  Saves the certificate file password <example-value> encryption. Specify this option with `--password`. To save a password on a platform other than Windows, use this option.

  > **Warning:**
  > Avoid clear-text passwords when possible. Restrict access to configuration files that contain passwords, and don't commit passwords or private keys to source control.

## Examples

These examples require an existing client certificate configuration for a package source named `Contoso`.

- Replace a certificate file. If the replacement uses a different password, also specify `--password`:

  ```dotnetcli
  dotnet nuget update client-cert --package-source Contoso --path .\replacement-client.pfx --configfile .\nuget.config
  ```

- Update a store configuration to use a different certificate thumbprint. Replace `<CERTIFICATE_THUMBPRINT>` with the new thumbprint:

  ```dotnetcli
  dotnet nuget update client-cert --package-source Contoso --find-by Thumbprint --find-value <CERTIFICATE_THUMBPRINT> --configfile .\nuget.config
  ```

## See also

- dotnet nuget add client-cert
- dotnet nuget list client-cert
- dotnet nuget remove client-cert
- Common NuGet configurations
