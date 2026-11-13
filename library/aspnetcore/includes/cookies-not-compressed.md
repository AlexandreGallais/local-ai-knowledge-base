---
title: "cookies-not-compressed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/cookies-not-compressed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# cookies-not-compressed

For security reasons, authentication cookies are not compressed in ASP.NET Core. When using authentication cookies, developers should minimize the number of claim information included to just that necessary for their needs.
