---
title: "Automatically trusts certificates in both WSL and Windows"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/development-certificate-trust.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

### Auto-trust development certificates in WSL

The development certificate setup now automatically trusts certificates in WSL (Windows Subsystem for Linux) environments. When you run `dotnet dev-certs https --trust` in WSL, the certificate is automatically installed and trusted in both the WSL environment and Windows, eliminating manual trust configuration.

```bash
# Automatically trusts certificates in both WSL and Windows
dotnet dev-certs https --trust
```

This improvement streamlines the development experience when using WSL, removing a common friction point for developers working in Linux environments on Windows.

Thank you @StickFun for this contribution!
