---
title: "Online backup"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/sqlite/backup.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Online backup

SQLite can back up database files while the app is running. This functionality is available in Microsoft.Data.Sqlite as the `Microsoft.Data.Sqlite.SqliteConnection.BackupDatabase*` method on `SqliteConnection`.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/BackupSample/Program.cs._

Currently, `BackupDatabase` will back up the database as quickly as possible and blocks other connections from writing to the database. Issue #13834 would provide an alternative API to back up the database in the background and allow other connections to interrupt the backup and write to the database. If you're interested, provide feedback on the issue.
