---
title: "Visual Studio"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/run-the-app.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Visual Studio

* Press Ctrl+F5 to run without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error.

  Visual Studio starts IIS Express and runs the app. The address bar shows `localhost:port#` and not something like `example.com`. That's because `localhost` is the standard hostname for the local computer. Localhost only serves web requests from the local computer. When Visual Studio creates a web project, a random port is used for the web server.

# Visual Studio Code

  * Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```

  The preceding command displays the following dialog, provided the certificate was not previously trusted:

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the Enforcing SSL article.

For information on trusting the Firefox browser, see Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error.

* Press **Ctrl-F5** to run without the debugger.

  Visual Studio Code starts Kestrel, launches a browser, and navigates to `http://localhost:5001`. The address bar shows `localhost:port#` and not something like `example.com`. That's because `localhost` is the standard hostname for  local computer. Localhost only serves web requests from the local computer.

---
