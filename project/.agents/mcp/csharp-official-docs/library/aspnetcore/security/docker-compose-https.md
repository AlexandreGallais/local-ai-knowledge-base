---
title: "Hosting ASP.NET Core image in container using docker compose with HTTPS"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/docker-compose-https.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Hosting ASP.NET Core images with Docker Compose over HTTPS

ASP.NET Core uses HTTPS by default. HTTPS relies on certificates for trust, identity, and encryption.

This document explains how to run pre-built container images with HTTPS.

See Developing ASP.NET Core Applications with Docker over HTTPS for development scenarios.

This sample requires Docker 17.06 or later of the Docker client.

## Prerequisites

The .NET Core 2.2 SDK or later is required for some of the instructions in this document.

## Certificates

A certificate from a certificate authority is required for production hosting for a domain. :::no-loc text="Let's Encrypt"::: is a certificate authority that offers free certificates.

This document uses self-signed development certificates for hosting pre-built images over `localhost`. The instructions are similar to using production certificates.

For production certificates:

* The `dotnet dev-certs` tool is not required.
* Certificates don't need to be stored in the location used in the instructions. Store the certificates in any location outside the site directory.

The instructions contained in the following section volume mount certificates into containers using the `volumes` property in *docker-compose.yml.* You could add certificates into container images with a `COPY` command in a *Dockerfile*, but it's not recommended. Copying certificates into an image isn't recommended for the following reasons:

* It makes it difficult to use the same image for testing with developer certificates.
* It makes it difficult to use the same image for Hosting with production certificates.
* There is significant risk of certificate disclosure.

## Starting a container with https support using docker compose

Use the following instructions for your operating system configuration.

### Windows using Linux containers

Generate certificate and configure local machine:

```powershell
dotnet dev-certs https -ep "$env:USERPROFILE\.aspnet\https\aspnetapp.pfx"  -p $CREDENTIAL_PLACEHOLDER$
dotnet dev-certs https --trust
```

The previous command using the .NET CLI:

```dotnetcli
dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p $CREDENTIAL_PLACEHOLDER$
dotnet dev-certs https --trust
```

In the preceding commands, replace `$CREDENTIAL_PLACEHOLDER$` with a password.

Create a _docker-compose.debug.yml_ file with the following content:

```yaml
version: '3.4'

services:
  webapp:
    image: mcr.microsoft.com/dotnet/samples:aspnetapp
    ports:
      - 80
      - 443
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=https://+:443;http://+:80
      - ASPNETCORE_Kestrel__Certificates__Default__Password=<example-value>
      - ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx
    volumes:
      - ~/.aspnet/https:/https:ro
```
The password <example-value> in the docker compose file must match the password used for the certificate.

Start the container with ASP.NET Core configured for HTTPS:

```console
docker-compose -f "docker-compose.debug.yml" up -d
```

### macOS or Linux

Generate certificate and configure local machine:

```dotnetcli
dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p $CREDENTIAL_PLACEHOLDER$
dotnet dev-certs https --trust
```

On Linux, `dotnet dev-certs https --trust` requires .NET 9 or later SDK. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.

In the preceding commands, replace `$CREDENTIAL_PLACEHOLDER$` with a password.

Create a _docker-compose.debug.yml_ file with the following content:

```yaml
version: '3.4'

services:
  webapp:
    image: mcr.microsoft.com/dotnet/samples:aspnetapp
    ports:
      - 80
      - 443
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=https://+:443;http://+:80
      - ASPNETCORE_Kestrel__Certificates__Default__Password=<example-value>
      - ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx
    volumes:
      - ~/.aspnet/https:/https:ro
```
The password <example-value> in the docker compose file must match the password used for the certificate.

Start the container with ASP.NET Core configured for HTTPS:

```console
docker-compose -f "docker-compose.debug.yml" up -d
```

### Windows using Windows containers

Generate certificate and configure local machine:

```dotnetcli
dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p $CREDENTIAL_PLACEHOLDER$
dotnet dev-certs https --trust
```

In the preceding commands, replace `$CREDENTIAL_PLACEHOLDER$` with a password.

Create a _docker-compose.debug.yml_ file with the following content:

```yaml
version: '3.4'

services:
  webapp:
    image: mcr.microsoft.com/dotnet/samples:aspnetapp
    ports:
      - 80
      - 443
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=https://+:443;http://+:80
      - ASPNETCORE_Kestrel__Certificates__Default__Password=<example-value>
      - ASPNETCORE_Kestrel__Certificates__Default__Path=C:\https\aspnetapp.pfx
    volumes:
      - ${USERPROFILE}\.aspnet\https:C:\https:ro
```
The password <example-value> in the docker compose file must match the password used for the certificate.

Start the container with ASP.NET Core configured for HTTPS:

```console
docker-compose -f "docker-compose.debug.yml" up -d
```

## See also

* `dotnet dev-certs`
