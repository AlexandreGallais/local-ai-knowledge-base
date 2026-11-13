---
title: "GDPR Sample"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/gdpr/samples/README.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# GDPR Sample

* In `appsettings.json`, set `CheckNotConsentNeeded` to `false` to require consent; otherwise set to true or omit. Test the app with `CheckNotConsentNeeded` set to `false` and set to `true`.
* Create essential and non-essential cookies with each variation of `CheckConsentNeeded` and consent granted.
* Register a user.
* Delete cookies.
