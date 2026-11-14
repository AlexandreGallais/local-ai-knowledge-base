---
title: "SymbolDocumentInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/SymbolDocumentInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SymbolDocumentInfo class

Namespace: `System.Linq.Expressions`

```csharp
public class SymbolDocumentInfo
```

Stores information necessary to emit debugging symbol information for a source file, in particular the file name and unique language identifier.

To be added.

## SymbolDocumentInfo.DocumentType property

```csharp
public virtual Guid DocumentType { get; }
```

Returns the document type's unique identifier, if any.

Returns: The document type's unique identifier. The default is the GUID for a text file.

To be added.

## SymbolDocumentInfo.FileName property

```csharp
public string FileName { get; }
```

The source file name.

Returns: The string representing the source file name.

To be added.

## SymbolDocumentInfo.Language property

```csharp
public virtual Guid Language { get; }
```

Returns the language's unique identifier, if any.

Returns: The language's unique identifier.

To be added.

## SymbolDocumentInfo.LanguageVendor property

```csharp
public virtual Guid LanguageVendor { get; }
```

Returns the language vendor's unique identifier, if any.

Returns: The language vendor's unique identifier.

To be added.
