---
title: "secrets-json-file-and-text"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/app-secrets/secrets-json-file-and-text.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# secrets-json-file-and-text

Assume the application _secrets.json_ file contains the following two secrets:

```json
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```
