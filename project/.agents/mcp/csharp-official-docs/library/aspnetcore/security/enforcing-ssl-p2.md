---
title: "Enforce HTTPS in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/enforcing-ssl.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Enforce HTTPS in ASP.NET Core (part 2 of 3)

## Opt out of HTTPS/HSTS on project creation

In some back-end service scenarios where connection security is handled at the public-facing edge of the network, configuring connection security at each node isn't required. Web apps that are generated from the templates in Visual Studio or from the dotnet new command enable HTTPS redirection and HSTS. For deployments that don't require these scenarios, you can opt out of HTTPS/HSTS when the app is created from the template.

To opt out of HTTPS/HSTS:

# Visual Studio

When you create a new ASP.NET Core web app, unselect the **Configure for HTTPS** option:

# .NET CLI

Use the `--no-https` option with the `dotnet new webapp` command, for example:

```dotnetcli
dotnet new webapp --no-https
```

---

## Trust the ASP.NET Core HTTPS development certificate

The .NET SDK includes an HTTPS development certificate. The certificate is installed as part of the first-run experience. For example, the `dotnet --info` command produces a variation of the following output:

```cli
ASP.NET Core
------------
Successfully installed the ASP.NET Core HTTPS Development Certificate.
To trust the certificate run 'dotnet dev-certs https --trust' (Windows and macOS only).
For establishing trust on other platforms refer to the platform specific documentation.
For more information on configuring HTTPS see https://go.microsoft.com/fwlink/?linkid=848054.
```

Installing the .NET SDK installs the ASP.NET Core HTTPS development certificate to the local user certificate store. The certificate is installed, but it isn't trusted. To trust the certificate, perform the one-time step to run the `dotnet dev-certs` tool:

```dotnetcli
dotnet dev-certs https --trust
```

The following command provides help on the `dotnet dev-certs` tool:

```dotnetcli
dotnet dev-certs https --help
```

> **Warning:**
> Don't create a development certificate in an environment planned for redistribution, such as a container image or virtual machine. This scenario can lead to spoofing and elevation of privilege. To help prevent this situation, set the `DOTNET_GENERATE_ASPNET_CERTIFICATE` environment variable to `false` before calling the .NET CLI for the first time. This approach skips the automatic generation of the ASP.NET Core development certificate during the CLI's first-run experience.

## Set up developer certificate for Docker

To configure the developer certificate for Docker, see GitHub dotnet/aspnetcore.docs issue #6199 - _How to set up the dev certificate when using Docker in development_.

## Linux-specific considerations

Linux distributions differ substantially in how they mark certificates as trusted.

The `dotnet dev-certs` tool is expected to be broadly applicable, but official support is available for Ubuntu and Fedora only. The support specifically aims to ensure trust in Firefox and Chromium-based browsers (Microsoft Edge, Chrome, and Chromium).

### Dependencies

* To establish OpenSSL trust, the `openssl` tool must be on the path.
* To establish browser trust (for example in Microsoft Edge or Firefox), the `certutil` tool must be on the path.

### OpenSSL trust

When an ASP.NET Core development certificate is trusted, the certificate is exported to a folder in the current user's home directory. To have OpenSSL (and clients that consume it) pick up this folder, you need to set the `SSL_CERT_DIR` environment variable. You can set the variable in a single session by running a command like `export SSL_CERT_DIR=$HOME/.aspnet/dev-certs/trust:/usr/lib/ssl/certs` (the exact value is in the output when `--verbose` is passed) or by adding it your (distro- and shell-specific) configuration file (for example _.profile_).

This approach is required to make tools like `curl` trust the development certificate. Alternatively, you can pass `-CAfile` or `-CApath` to each individual `curl` invocation.

> **Note:**
> Requires 1.1.1h or later or 3.0.0 or later, depending on which major version you're using.

If OpenSSL trust gets into a bad state (for example if `dotnet dev-certs https --clean` fails to remove it), you can frequently resolve the situation by using the c_rehash tool.

### Overrides

If you're using another browser with its own Network Security Services (NSS) store, you can use the `DOTNET_DEV_CERTS_NSSDB_PATHS` environment variable to specify a colon-delimited list of NSS directories (for example, the directory containing `cert9.db`). You can then add the development certificate location to the list in the variable.

If you store the certificates you want OpenSSL to trust in a specific directory, you can use the `DOTNET_DEV_CERTS_OPENSSL_CERTIFICATE_DIRECTORY` environment variable to indicate the certificate location.

> **Warning:**
> If you set either variable, be sure to set the same values each time trust is updated. If the values change, the tool doesn't know about certificates in the former locations (for example, during certificate cleanup).

### Using sudo

As on other platforms, development certificates are stored and trusted separately for each user.

If you run `dotnet dev-certs` as a different user (for example, by using `sudo`), then _that_ specific user (for example `root`) trusts the development certificate.

### Trust the certificate from Windows Subsystem for Linux

Run the trust command inside WSL. When WSL interop is enabled, it also attempts to add the public certificate to the Windows Current User Root certificate store. Check the command output for trust failures and any required Linux configuration.

### Trust HTTPS certificate on Linux with linux-dev-certs

linux-dev-certs is an open-source, community-supported, .NET global tool that provides a convenient way to create and trust a developer certificate on Linux. Microsoft doesn't maintain or support the tool.

The following commands install the tool and create a trusted developer certificate:

```cli
dotnet tool update -g linux-dev-certs
dotnet linux-dev-certs install
```

For more information or to report issues, see the linux-dev-certs GitHub repository.

### Trust the certificate on SUSE Linux Enterprise Server (SLES) and openSUSE

`dotnet dev-certs https --trust` isn't officially supported on SLES. Use the following steps to export the development certificate and trust it in Chromium-based browsers, Firefox, and command-line tools. The steps were verified on SLES 15 SP7 and openSUSE Leap 15.6.

> **Warning:**
> The following instructions are intended for development purposes only. Don't use the development certificate in a production environment.

> **Note:**
> Adding the certificate to the system trust store (`/etc/pki/trust/anchors/` followed by `update-ca-certificates`) doesn't work for the development certificate. The certificate isn't a certificate authority (`CA:FALSE`), so `p11-kit` lists it as an anchor but doesn't include it in the generated bundles, and OpenSSL continues to reject it. Trust it per application as shown below instead.

#### Install dependencies

The `certutil` tool used to manage browser certificate stores is provided by the `mozilla-nss-tools` package:

```sh
sudo zypper install mozilla-nss-tools openssl
```

#### Export the development certificate

Replace `${CertificateDirectory}` with a directory outside your source repositories, for example `$HOME/.aspnet/https`:

```sh
mkdir -p ${CertificateDirectory}
dotnet dev-certs https -ep ${CertificateDirectory}/aspnetcore.crt --format PEM --no-password
```

#### Trust the certificate in Chromium-based browsers (Microsoft Edge, Chrome, Chromium)

```sh
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n aspnetcore -i ${CertificateDirectory}/aspnetcore.crt
```

If `$HOME/.pki/nssdb` doesn't exist yet, create it first with `certutil -d sql:$HOME/.pki/nssdb -N --empty-password`. Restart the browser after importing.

#### Trust the certificate in Firefox

Replace `${UserProfile}` with the name of your Firefox profile directory (see `about:profiles` in Firefox):

```sh
certutil -d sql:$HOME/.mozilla/firefox/${UserProfile}/ -A -t "C,," -n aspnetcore -i ${CertificateDirectory}/aspnetcore.crt
```

#### Trust the certificate in curl and other OpenSSL clients

Pass the exported certificate explicitly:

```sh
curl --cacert ${CertificateDirectory}/aspnetcore.crt https://localhost:5001
```

Alternatively, point `SSL_CERT_DIR` at a directory that contains the certificate as described in OpenSSL trust.

#### Remove the development certificate

```sh
certutil -d sql:$HOME/.pki/nssdb -D -n aspnetcore
certutil -d sql:$HOME/.mozilla/firefox/${UserProfile}/ -D -n aspnetcore
rm ${CertificateDirectory}/aspnetcore.crt
dotnet dev-certs https --clean
```

### Trust the certificate on Red Hat Enterprise Linux (RHEL)

`dotnet dev-certs https --trust` isn't officially supported on RHEL. The following steps mirror the SLES instructions, adapted for RHEL package names.

> **Warning:**
> The following instructions are intended for development purposes only. Don't use the development certificate in a production environment.

> **Note:**
> As on SLES, adding the certificate to the system trust store (`/etc/pki/ca-trust/source/anchors/` followed by `update-ca-trust`) doesn't work for the development certificate. The certificate isn't a certificate authority (`CA:FALSE`), so trust it per application as shown below instead.

#### Install dependencies

The `certutil` tool used to manage browser certificate stores is provided by the `nss-tools` package:

```sh
sudo dnf install nss-tools openssl
```

#### Export the development certificate

Replace `${CertificateDirectory}` with a directory outside your source repositories, for example `$HOME/.aspnet/https`:

```sh
mkdir -p ${CertificateDirectory}
dotnet dev-certs https -ep ${CertificateDirectory}/aspnetcore.crt --format PEM --no-password
```

#### Trust the certificate in Chromium-based browsers (Microsoft Edge, Chrome, Chromium)

```sh
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n aspnetcore -i ${CertificateDirectory}/aspnetcore.crt
```

If `$HOME/.pki/nssdb` doesn't exist yet, create it first with `certutil -d sql:$HOME/.pki/nssdb -N --empty-password`. Restart the browser after importing.

#### Trust the certificate in Firefox

Replace `${UserProfile}` with the name of your Firefox profile directory (see `about:profiles` in Firefox):

```sh
certutil -d sql:$HOME/.mozilla/firefox/${UserProfile}/ -A -t "C,," -n aspnetcore -i ${CertificateDirectory}/aspnetcore.crt
```

#### Trust the certificate in curl and other OpenSSL clients

Pass the exported certificate explicitly:

```sh
curl --cacert ${CertificateDirectory}/aspnetcore.crt https://localhost:5001
```

Alternatively, create an OpenSSL hashed certificate directory and point `SSL_CERT_DIR` at it:

```sh
mkdir -p ${CertificateDirectory}/certs
cp ${CertificateDirectory}/aspnetcore.crt ${CertificateDirectory}/certs/
openssl rehash ${CertificateDirectory}/certs
export SSL_CERT_DIR=${CertificateDirectory}/certs
```

#### Remove the development certificate

```sh
certutil -d sql:$HOME/.pki/nssdb -D -n aspnetcore
certutil -d sql:$HOME/.mozilla/firefox/${UserProfile}/ -D -n aspnetcore
rm ${CertificateDirectory}/aspnetcore.crt
dotnet dev-certs https --clean
```
