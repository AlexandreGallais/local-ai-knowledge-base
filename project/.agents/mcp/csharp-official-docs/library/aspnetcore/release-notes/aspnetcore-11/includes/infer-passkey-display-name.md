---
title: "infer-passkey-display-name"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/infer-passkey-display-name.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# infer-passkey-display-name

### Infer passkey <example-value> name from authenticator

ASP.NET Core Identity now automatically infers friendly display names for passkeys based on their AAGUID (Authenticator Attestation GUID). Built-in mappings are included for the most commonly used passkey <example-value>, including Google Password <example-value>, iCloud Keychain, Windows Hello, 1Password, and Bitwarden.

For known authenticators, the name is automatically assigned without prompting the user. For unknown authenticators, the user is redirected to a rename page. Extend the mappings by adding entries to the `PasskeyAuthenticators` dictionary in the project.
