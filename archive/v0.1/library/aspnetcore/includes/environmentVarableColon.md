---
title: "environmentVarableColon"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/environmentVarableColon.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# environmentVarableColon

The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For example, Bash doesn't support colon (`:`) as a separator. All platforms support the double underscore (`__`) syntax and automatically replace it with a colon (`:`).
