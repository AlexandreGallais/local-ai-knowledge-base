---
title: "user-jwts-file-based-apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/user-jwts-file-based-apps.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# user-jwts-file-based-apps

### `dotnet user-jwts` supports file-based apps

The `dotnet user-jwts` tool creates signed development JWTs so you can call an app'<example-value>'s user secrets, and prints the token to use as a bearer token. It now works with file-based apps (a single `app.cs` with no project file) through the new `--file` option:

```bash
dotnet user-jwts create --file app.cs
```
