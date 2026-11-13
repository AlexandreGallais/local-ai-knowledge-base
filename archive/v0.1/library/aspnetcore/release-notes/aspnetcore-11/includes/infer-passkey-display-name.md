---
title: "infer-passkey-display-name"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/infer-passkey-display-name.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# infer-passkey-display-name

### Infer passkey <example-value> name from authenticator

ASP.NET Core Identity now automatically infers friendly display names for passkeys based on their AAGUID (Authenticator Attestation GUID). Built-in mappings are included for the most commonly used passkey <example-value>, including Google Password <example-value>, iCloud Keychain, Windows Hello, 1Password, and Bitwarden.

For known authenticators, the name is automatically assigned without prompting the user. For unknown authenticators, the user is redirected to a rename page. Extend the mappings by adding entries to the `PasskeyAuthenticators` dictionary in the project.
