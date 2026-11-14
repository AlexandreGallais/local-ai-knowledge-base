---
title: "credentials-warning"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/includes/credentials-warning.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# credentials-warning

> **Warning:**
> In the example code, the certificate password is stored as plain text in the _appsettings.json_ file.
> The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate password.
> To store certificate passwords securely in development environments, see Protect secrets in development.
> To store certificate passwords securely in production environments, see Azure Key Vault configuration provider.
> It's a best practice to not use development secrets for production or testing.
