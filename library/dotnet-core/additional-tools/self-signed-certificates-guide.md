---
title: "Generate Self-Signed Certificates Overview"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/additional-tools/self-signed-certificates-guide.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generate self-signed certificates with the .NET CLI

There are different ways to create and use self-signed certificates for development and testing scenarios. This article covers using self-signed certificates with `dotnet dev-certs`, and other options like `PowerShell` and `OpenSSL`.

You can then validate that the certificate loads using an example such as an ASP.NET Core app hosted in a container.

## Prerequisites

For `dotnet dev-certs`, be sure to have the appropriate version of .NET installed:

* Install .NET on Windows
* Install .NET on Linux
* Install .NET on macOS

This sample requires the Docker client.

## Prepare sample app

For this guide, you'll use a sample app and make changes where appropriate.

Check that the sample app Dockerfile is using .NET 11.

Depending on the host OS, you might need to update the ASP.NET runtime. For Windows containers, use the Windows Server Core variant of the sample.

For example, this will help with testing the certificates on Windows:

```dockerfile
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:11.0-windowsservercore-ltsc2025 AS build
WORKDIR /source

# Copy project file and restore as distinct layers
COPY *.slnx .
COPY AspNetCoreRazorApp/*.csproj ./AspNetCoreRazorApp/
RUN dotnet restore

# Copy source code and publish app
COPY AspNetCoreRazorApp/. ./AspNetCoreRazorApp/
WORKDIR /source/AspNetCoreRazorApp
RUN dotnet publish --no-restore -o /app

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:11.0-windowsservercore-ltsc2025
EXPOSE 8080
WORKDIR /app
COPY --from=build /app .
USER ContainerUser
ENTRYPOINT ["AspNetCoreRazorApp"]
```

If you're testing the certificates on Linux, you can use the existing Dockerfile.

Make sure the `AspNetCoreRazorApp.csproj` includes the appropriate target framework:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net11.0</TargetFramework>
    <!--Other Properties-->
  </PropertyGroup>

</Project>
```

> **Note:**
> If you want to use `dotnet publish` parameters to *trim* the deployment, make sure that the appropriate dependencies are included for supporting SSL certificates. Update the project file to ensure that the appropriate assemblies are included in the container. For reference, check how to update the .csproj file to support SSL certificates when using trimming for self-contained deployments.

Make sure you're pointing to the sample app.

```console
cd .\dotnet-docker\samples\AspNetCoreRazorApp
```

For Linux containers, build the container for testing locally:

```console
docker build -t aspnetapp:my-sample .
```

For Windows containers, use the Windows Server Core Dockerfile:

```console
docker build -t aspnetapp:my-sample -f Dockerfile.windowsservercore .
```

## Create a self-signed certificate

You can create a self-signed certificate:

- With dotnet dev-certs
- With PowerShell
- With OpenSSL

### With dotnet dev-certs

You can use `dotnet dev-certs` to work with self-signed certificates.

```powershell
dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\AspNetCoreRazorApp.pfx -p $CREDENTIAL_PLACEHOLDER$
dotnet dev-certs https --trust
```

> **Note:**
> The certificate name, in this case *AspNetCoreRazorApp*.pfx, must match the project assembly name. `$CREDENTIAL_PLACEHOLDER$` represents a password of your own choosing. If the console returns "<example-value>", a trusted certificate already exists in your store. You can export it using the MMC Console.
>
> In .NET 10 and later, if you run `dotnet dev-certs https --trust` inside a Windows Subsystem for Linux (WSL) instance, the command also trusts the certificate on the Windows host.
>
> In .NET 10 and later, the generated certificate includes subject alternative names (SANs) for `host.docker.internal` and `host.containers.internal`, which lets you use the certificate directly in container-based local development scenarios without extra configuration.
>
> To verify that a trusted development certificate is present, run `dotnet dev-certs https --check --trust`.

Configure application secrets, for the certificate:

```console
dotnet user-secrets -p AspNetCoreRazorApp\AspNetCoreRazorApp.csproj init
dotnet user-secrets -p AspNetCoreRazorApp\AspNetCoreRazorApp.csproj set "<example-value>" "<example-value>"
```

> **Note:**
> The password must match the password used for the certificate.

Run the container image with ASP.NET Core configured for HTTPS:

```powershell
docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="<example-value>" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_ENVIRONMENT=Development -v $env:APPDATA\microsoft\UserSecrets\:C:\Users\ContainerUser\AppData\Roaming\microsoft\UserSecrets -v $env:USERPROFILE\.aspnet\https:C:\Users\ContainerUser\AppData\Roaming\ASP.NET\Https mcr.microsoft.com/dotnet/samples:aspnetapp
```

Once the application starts, navigate to `https://localhost:8001` in your web browser.

#### Clean up

If the secrets and certificates aren't in use, be sure to clean them up.

```console
dotnet user-secrets remove "<example-value>" -p AspNetCoreRazorApp\AspNetCoreRazorApp.csproj
dotnet dev-certs https --clean
```

### With PowerShell

You can use PowerShell to generate self-signed certificates. The PKI Client can be used to generate a self-signed certificate.

```powershell
$cert = New-SelfSignedCertificate -DnsName @("contoso.com", "www.contoso.com") -CertStoreLocation "cert:\LocalMachine\My"
```

The certificate will be generated, but for the purposes of testing, should be placed in a cert store for testing in a browser.

```powershell
$certKeyPath = "c:\certs\contoso.com.pfx"
$password = <example-value> '<example-value>' -AsPlainText -Force
$cert | Export-PfxCertificate -FilePath $certKeyPath -Password <example-value>
$rootCert = $(Import-PfxCertificate -FilePath $certKeyPath -CertStoreLocation '<example-value>' -Password <example-value>)
```

At this point, the certificates should be viewable from an MMC snap-in.

You can run the sample container in Windows Subsystem for Linux (WSL):

```console
docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="<example-value>" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_ENVIRONMENT=Development -e ASPNETCORE_Kestrel__Certificates__Default__Password="<example-value>" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/contoso.com.pfx -v /c/certs:/https/ mcr.microsoft.com/dotnet/samples:aspnetapp
```

> **Note:**
> With the volume mount, the file path could be handled differently based on host. For example, in WSL you might replace */c/certs* with */mnt/c/certs*.

If you're using the container built earlier for Windows, the run command would look like the following:

```console
docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="<example-value>" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_ENVIRONMENT=Development -e ASPNETCORE_Kestrel__Certificates__Default__Password="<example-value>" -e ASPNETCORE_Kestrel__Certificates__Default__Path=c:\https\contoso.com.pfx -v c:\certs:C:\https aspnetapp:my-sample
```

Once the application is up, navigate to contoso.com:8001 in a browser.

Be sure that the host entries are updated for `contoso.com` to answer on the appropriate IP address (for example 127.0.0.1). If the certificate isn't recognized, make sure that the certificate that is loaded with the container is also trusted on the host, and that there's appropriate SAN / DNS entries for `contoso.com`.

#### Clean up

```powershell
$cert | Remove-Item
Get-ChildItem $certKeyPath | Remove-Item
$rootCert | Remove-item
```

### With OpenSSL

You can use OpenSSL to create self-signed certificates. This example uses WSL / Ubuntu and a bash shell with `OpenSSL`.

This command generates a .crt and a .key.

```bash
PARENT="contoso.com"
openssl req \
-x509 \
-newkey rsa:4096 \
-sha256 \
-days 365 \
-nodes \
-keyout $PARENT.key \
-out $PARENT.crt \
-subj "/CN=${PARENT}" \
-extensions v3_ca \
-extensions v3_req \
-config <( \
  echo '[req]'; \
  echo 'default_bits= 4096'; \
  echo 'distinguished_name=req'; \
  echo 'x509_extension = v3_ca'; \
  echo 'req_extensions = v3_req'; \
  echo '[v3_req]'; \
  echo 'basicConstraints = CA:FALSE'; \
  echo 'keyUsage = nonRepudiation, digitalSignature, keyEncipherment'; \
  echo 'subjectAltName = @alt_names'; \
  echo '[ alt_names ]'; \
  echo "DNS.1 = www.${PARENT}"; \
  echo "DNS.2 = ${PARENT}"; \
  echo '[ v3_ca ]'; \
  echo 'subjectKeyIdentifier=hash'; \
  echo 'authorityKeyIdentifier=keyid:always,issuer'; \
  echo 'basicConstraints = critical, CA:TRUE, pathlen:0'; \
  echo 'keyUsage = critical, cRLSign, keyCertSign'; \
  echo 'extendedKeyUsage = serverAuth, clientAuth')

openssl x509 -noout -text -in $PARENT.crt
```

To get a .pfx, use the following command:

```bash
openssl pkcs12 -export -out $PARENT.pfx -inkey $PARENT.key -in $PARENT.crt
```

> **Note:**
> Starting in .NET 5, Kestrel can take *.crt* and PEM-encoded *.key* files in addition to *.pfx* files with a password.

Depending on the host OS, the certificate needs to be trusted. On a Linux host, 'trusting' the certificate is different and distro dependent.

For the purposes of this guide, here's an example in Windows using PowerShell:

```powershell
Import-Certificate -FilePath $certKeyPath -CertStoreLocation 'Cert:\LocalMachine\Root'
```

Run the sample using the following command in WSL:

```bash
docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_ENVIRONMENT=Development -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/contoso.com.crt -e ASPNETCORE_Kestrel__Certificates__Default__KeyPath=/https/contoso.com.key -v /c/path/to/certs:/https/ mcr.microsoft.com/dotnet/samples:aspnetapp
```

> **Note:**
> In WSL, the volume mount path might change depending on the configuration.

Run the following command in PowerShell:

```powershell
docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_ENVIRONMENT=Development -e ASPNETCORE_Kestrel__Certificates__Default__Path=c:\https\contoso.com.crt -e ASPNETCORE_Kestrel__Certificates__Default__KeyPath=c:\https\contoso.com.key -v c:\certs:C:\https aspnetapp:my-sample
```

Once the application is up, navigate to contoso.com:8001 in a browser.

Be sure that the host entries are updated for `contoso.com` to answer on the appropriate IP address (for example 127.0.0.1). If the certificate isn't recognized, make sure that the certificate that is loaded with the container is also trusted on the host, and that there's appropriate SAN / DNS entries for `contoso.com`.

#### Clean up

Be sure to clean up the self-signed certificates once done testing.

```powershell
Get-ChildItem $certKeyPath | Remove-Item
```

## See also

* dotnet dev-certs
