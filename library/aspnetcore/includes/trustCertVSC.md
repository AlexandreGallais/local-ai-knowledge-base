---
title: "trustCertVSC"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/trustCertVSC.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# trustCertVSC

* Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```

  The preceding command displays the following dialog, provided the certificate was not previously trusted:

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the Enforcing SSL article.

For information on trusting the Firefox browser, see Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error.
