---
title: "model4"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/includes/mvc-intro/model4.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# model4

The following table details the ASP.NET Core code generator parameters.

| Parameter               | Description|
| ----------------- | ------------ |
| -m  | The name of the model. |
| -dc  | The data context. |
| --relativeFolderPath | The relative output folder path to create the files. |
| --useDefaultLayout\|-udl | The default layout should be used for the views. |
| --referenceScriptLibraries | Adds `_ValidationScriptsPartial` to Edit and Create pages. |
| -sqlite | Flag to specify if `DbContext` should use SQLite instead of SQL Server. |

Use the `h` switch to get help on the `aspnet-codegenerator controller` command:

```dotnetcli
dotnet aspnet-codegenerator controller -h
```

For more information, see dotnet aspnet-codegenerator
