---
title: "Overview"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Data.Sqlite overview

Microsoft.Data.Sqlite is a lightweight ADO.NET provider for SQLite. The Entity Framework Core provider for SQLite is built on top of this library. However, it can also be used independently or with other data access libraries.

## Installation

The latest stable version is available on NuGet.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Data.Sqlite
```

### Visual Studio

```powershell
Install-Package Microsoft.Data.Sqlite
```

---

## Usage

This library implements the common ADO.NET abstractions for connections, commands, data readers, and so on.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/HelloWorldSample/Program.cs._

> **Tip:**
> You can see the full code for this example at HelloWorldSample.

## See also

* Connection strings
* API Reference
* SQL Syntax
