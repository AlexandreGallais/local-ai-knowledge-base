---
title: "codegenerator-common-args"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/includes/codegenerator-common-args.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# codegenerator-common-args

Option                                | Description
------------------------------------- | ---
`-b|--bootstrapVersion`               | Specifies the bootstrap version and creates a `wwwroot` folder for the Bootstrap assets if the folder isn't present.
`-dbProvider|--databaseProvider`      | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
`-dc|--dataContext`                   | The database context class to use or the name of the class to generate.
`-f|--force`                          | Overwrite existing files.
`-l|--layout`                         | Custom layout page to use.
`-m|--model`                          | Model class to use.
`-outDir|--relativeFolderPath`        | Relative output folder path. If not specified, files are generated in the project folder.
`-scripts|--referenceScriptLibraries` | Reference script libraries in the generated views. Adds `_ValidationScriptsPartial` to `Edit` and `Create` pages.
`-sqlite|--useSqlite`                 | Flag to specify if the database context should use SQLite instead of SQL Server.
`-udl|--useDefaultLayout`             | Use the default layout for the views.
