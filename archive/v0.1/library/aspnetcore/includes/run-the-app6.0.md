---
title: "Visual Studio"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/run-the-app6.0.md"
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

  Visual Studio:

  * Starts Kestrel server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, such as `http://localhost:7042`.
    * *port*: A randomly assigned port number for the app.
    * `localhost`: The standard hostname for the local computer. Localhost only serves web requests from the local computer.

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

  Visual Studio Code:

  * Starts Kestrel server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, such as `http://localhost:7042`.
    * *port*: A randomly assigned port number for the app.
    * `localhost`: The standard hostname for the local computer. Localhost only serves web requests from the local computer.

# Visual Studio for Mac

* Select **Debug** > **Start Without Debugging** to launch the app.

  Visual Studio for Mac:

  * Starts Kestrel server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, such as `http://localhost:7042`.
    * *port*: A randomly assigned port number for the app.
    * `localhost`: The standard hostname for the local computer. Localhost only serves web requests from the local computer.

  Visual Studio for Mac displays the following popup:

Select **Install and Trust** if you trust the development certificate.

The following dialog is displayed:

Enter your password and select **Update Settings**

Select **Yes** if you agree to trust the development certificate.

See Trust the ASP.NET Core HTTPS development certificate for more information.

* From Visual Studio, press **Opt-Cmd-Return** to run without the debugger. Alternatively, navigate to the menu bar and go to **Run>Start Without Debugging**.

  Visual Studio starts Kestrel, launches a browser, and navigates to a randomly assigned port such as `http://localhost:7042`.

---
