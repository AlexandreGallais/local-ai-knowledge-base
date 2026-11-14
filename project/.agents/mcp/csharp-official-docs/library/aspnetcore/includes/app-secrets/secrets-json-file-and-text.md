---
title: "secrets-json-file-and-text"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/includes/app-secrets/secrets-json-file-and-text.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# secrets-json-file-and-text

Assume the application _secrets.json_ file contains the following two secrets:

```json
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "<example-value>"
}
```
