---
title: "negotiate-tls-channel-binding"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/negotiate-tls-channel-binding.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# negotiate-tls-channel-binding

### Negotiate authentication uses TLS channel binding

Negotiate authentication on Kestrel uses the TLS endpoint channel binding token for HTTPS connections. The authentication handler supplies the token to the underlying Kerberos or NTLM exchange and retains it across multi-round authentication.

No configuration changes are required. Non-HTTPS connections and HTTPS connections where a channel binding token isn't available continue to use the existing behavior.
