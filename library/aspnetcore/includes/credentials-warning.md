---
title: "credentials-warning"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/credentials-warning.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# credentials-warning

> **Warning:**
> In the example code, the certificate password is stored as plain text in the _appsettings.json_ file.
> The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate password.
> To store certificate passwords securely in development environments, see Protect secrets in development.
> To store certificate passwords securely in production environments, see Azure Key Vault configuration provider.
> It's a best practice to not use development secrets for production or testing.
