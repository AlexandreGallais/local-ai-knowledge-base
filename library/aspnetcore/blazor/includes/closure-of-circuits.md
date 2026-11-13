---
title: "closure-of-circuits"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/includes/closure-of-circuits.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# closure-of-circuits

Interactive Server components handle web UI events using a real-time connection with the browser called a circuit. A circuit and its associated state are created when a root Interactive Server component is rendered. The circuit is closed when there are no remaining Interactive Server components on the page, which frees up server resources.
