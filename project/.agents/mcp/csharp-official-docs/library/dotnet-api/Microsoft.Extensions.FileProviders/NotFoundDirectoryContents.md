---
title: "NotFoundDirectoryContents class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/NotFoundDirectoryContents.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotFoundDirectoryContents class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public class NotFoundDirectoryContents : Microsoft.Extensions.FileProviders.IDirectoryContents, System.Collections.Generic.IEnumerable<Microsoft.Extensions.FileProviders.IFileInfo>
```

Represents a nonexistent directory.

To be added.

## NotFoundDirectoryContents.NotFoundDirectoryContents() constructor

```csharp
public NotFoundDirectoryContents ();
```

Initializes a new instance of the `NotFoundDirectoryContents` class.

To be added.

## NotFoundDirectoryContents.Exists property

```csharp
public bool Exists { get; }
```

Gets a value that's always `false`.

Returns: To be added.

To be added.

## NotFoundDirectoryContents.Singleton property

```csharp
public static Microsoft.Extensions.FileProviders.NotFoundDirectoryContents Singleton { get; }
```

Gets a shared instance of `NotFoundDirectoryContents`.

Returns: To be added.

To be added.

## NotFoundDirectoryContents.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<Microsoft.Extensions.FileProviders.IFileInfo> GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator to an empty collection.

To be added.

## NotFoundDirectoryContents.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An <xref data-throw-if-not-resolved="true" uid="System.Collections.IEnumerator"></xref> object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `NotFoundDirectoryContents` instance is cast to an `IEnumerable` interface.
