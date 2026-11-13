---
title: "Encryption"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/encryption.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Encryption

SQLite doesn't support encrypting database files by default. Instead, you need to use a modified version of SQLite like SQLCipher, SQLiteCrypt, or wxSQLite3. This article demonstrates using an unsupported, open-source build of SQLCipher, but the information also applies to other solutions since they generally follow the same pattern.

## Installation

### .NET CLI

```dotnetcli
dotnet remove package Microsoft.Data.Sqlite
dotnet add package Microsoft.Data.Sqlite.Core
dotnet add package SQLitePCLRaw.bundle_e_sqlcipher
```

### Visual Studio

```powershell
Remove-Package Microsoft.Data.Sqlite
Install-Package Microsoft.Data.Sqlite.Core
Install-Package SQLitePCLRaw.bundle_e_sqlcipher
```

---

For more information about using a different native library for encryption, see Custom SQLite versions.

## Specify the key

To enable encryption on a new database, specify the key using the `Password` connection string keyword. Use `Microsoft.Data.Sqlite.SqliteConnectionStringBuilder` to add or update the value from user input and avoid connection string injection attacks.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/EncryptionSample/Program.cs._

> **Tip:**
> The method for encrypting and decrypting existing databases varies depending on which solution you're using. For example, you need to use the `sqlcipher_export()` function on SQLCipher. Check your solution's documentation for details.

## Rekeying the database

If you want to change the key of an encrypted database, issue a `PRAGMA rekey` statement.

Unfortunately, SQLite doesn't support parameters in `PRAGMA` statements. Instead, use the `quote()` function to prevent SQL injection.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/EncryptionSample/Program.cs._
