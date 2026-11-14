---
title: "Enforce HTTPS in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/enforcing-ssl.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Enforce HTTPS in ASP.NET Core (part 3 of 3)

## Troubleshoot certificate problems (certificate not trusted)

Sometimes when an ASP.NET Core HTTPS development certificate is installed and trusted, the browser warns that the certificate is untrusted. The following sections provide help for troubleshooting this issue.

The ASP.NET Core HTTPS development certificate is used by Kestrel.

To repair the IIS Express certificate, see Stack Overflow issue #20036984 / answer #20048613 - _How do I restore a missing IIS Express SSL Certificate?_

### Expired development certificate (`NET::ERR_CERT_DATE_INVALID`)

ASP.NET Core development certificates are valid for a limited period (typically 12 months). When a development certificate expires, browsers and client tools report errors such as `NET::ERR_CERT_DATE_INVALID` or `SEC_ERROR_EXPIRED_CERTIFICATE`.

To renew an expired development certificate:

1. Remove the expired certificates and create a new trusted development certificate:

   ```dotnetcli
   dotnet dev-certs https --clean
   dotnet dev-certs https --trust
   ```

1. If your development environment exports or mounts the certificate file to disk, such as in Docker containers, JavaScript Project System (JSPS) SPA projects, or Kestrel `Certificates:Default:Path` configurations:

   * **Re-export the certificate**: Export the new certificate to the expected file location. In the following example, the `` placeholder is the path to the certificate `.pfx` file (for example, `/etc/ssl/certs/myapp-dev.pfx`), and the `<password>` placeholder is the password:

     ```dotnetcli
     dotnet dev-certs https -ep <path to certificate> -p <password>
     ```

   * **Docker development**: Delete the expired certificate file in `%APPDATA%\ASP.NET\Https` (Windows) or `~/.aspnet/https` (Linux/macOS), regenerate the certificate using `dotnet dev-certs https -ep ...`, and restart the Docker container to mount the updated certificate.

   * **SPA development**: Delete the expired certificate files in `%APPDATA%\ASP.NET\https` or `~/.aspnet/https`, such as `<project-name>.pem` and `<project-name>.key`. SPA development servers regenerate or re-export these files automatically upon startup, or export them using:

     ```dotnetcli
     dotnet dev-certs https --export-path <path to certificate> --format Pem --no-password
     ```

1. Stop and restart the running application, including any `dotnet run` or Kestrel process. Kestrel loads the development certificate at startup; restarting the application ensures it loads the renewed certificate.

1. Completely close all browser windows and restart your IDE, such as Visual Studio or Visual Studio Code, to clear cached SSL/TLS sessions.

### All platforms - certificate not trusted

For all platforms, try to resolve the untrusted certificate issues with the following steps:

1. Run the following commands:

   ```dotnetcli
   dotnet dev-certs https --clean
   dotnet dev-certs https --trust
   ```

1. Close any open browser instances, and open the app in a new browser window.

   The browser cache stores whether a certificate is trusted. The close/open process helps to refresh the browser cache settings for certificates.

The `dotnet dev-certs https` commands usually solve most browser trust issues. If the `dotnet dev-certs https --clean` command fails and the browser still doesn't trust the certificate, try the platform-specific suggestions in the following sections.

### Docker - certificate not trusted

If you're using Docker, try to resolve the issue with the following steps:

1. Delete the _C:\Users\{USER}\AppData\Roaming\ASP.NET\Https_ folder.

1. Clean the solution. Delete the _bin_ and _obj_ folders.

1. Restart the development tool. For example, Visual Studio or Visual Studio Code.

### Windows - certificate not trusted

If you're working in Windows, complete the following troubleshooting steps:

1. Check the certificates in the certificate store. Look for a `localhost` certificate with the `ASP.NET Core HTTPS development certificate` friendly name in two folders:

   * _Current User > Personal > Certificates_
   * _Current User > Trusted root certification authorities > Certificates_

1. Remove all certificates from both Personal and Trusted root certification authorities.

   > **Important:**
   > Do **not** remove the IIS Express localhost certificate.

1. Run the following commands:

   ```dotnetcli
   dotnet dev-certs https --clean
   dotnet dev-certs https --trust
   ```

1. Close any open browser instances, and open the app in a new browser window.

### OS X - certificate not trusted

If you're working with OS X, try to resolve the issue with the following steps:

1. Open KeyChain Access, and then select the System keychain.

1. Check for the presence of a localhost certificate.

1. Confirm the certificate shows the plus (`+`) symbol on the icon, which indicates the certificate is trusted for all users.

1. Remove the certificate from the system keychain.

1. Run the following commands:

   ```dotnetcli
   dotnet dev-certs https --clean
   dotnet dev-certs https --trust
   ```

1. Close any open browser instances, and open the app in a new browser window.

For more information about troubleshooting certificate issues with Visual Studio, see GitHub dotnet/aspnetcore issue #16892) - _HTTPS Error using IIS Express_.

### Linux - certificate not trusted

If you're running Linux, follow these steps to troubleshoot the untrusted certificate:

1. Confirm the certificate you're investigating is the user HTTPS developer certificate planned for use by the Kestrel server.

1. Check the current user default HTTPS developer Kestrel certificate at the following location:

   ```cmd
   ls -la ~/.dotnet/corefx/cryptography/x509stores/my
   ```

   The HTTPS developer Kestrel certificate file is the SHA1 thumbprint. When the file is deleted with the `dotnet dev-certs https --clean` command, the file is regenerated when needed with a different thumbprint.

1. Verify the thumbprint of the exported certificate matches by running the following command:

   ```cmd
   openssl x509 -noout -fingerprint -sha1 -inform pem -in /usr/local/share/ca-certificates/aspnet/https.crt
   ```

   If the certificate thumbprint doesn't match, investigate the following conditions:

   * Check if the certificate is old.

   * Check if the certificate is an exported developer certificate for the root user.

      * If it is, export the certificate.

1. Check the root user certificate in the following folder:

   ```cmd
   ls -la /root/.dotnet/corefx/cryptography/x509stores/my
   ```

### IIS Express SSL certificate used with Visual Studio

To fix problems with the IIS Express certificate, select **Repair** in the Visual Studio installer. For more information, see GitHub dotnet/aspnetcore issue #16892) - _HTTPS Error using IIS Express_.

### Group policy prevents trusting self-signed certificates

In some cases, group policy can prevent self-signed certificates from being trusted. For more information, see GitHub dotnet/aspnetcore issue #21173 - _Error trusting HTTPS developer certificate_.

## Related content

* Configure ASP.NET Core to work with proxy servers and load balancers
* Host ASP.NET Core on Linux with Nginx: HTTPS configuration
* Set up SSL on IIS 7 or later
* Configure endpoints for Kestrel web server
* OWASP HSTS browser support
