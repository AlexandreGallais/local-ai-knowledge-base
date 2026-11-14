---
title: "FileOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileOptions enum

Namespace: `System.IO`

```csharp
public enum FileOptions
```

Represents advanced options for creating a `FileStream` object.

#### Remarks

Specifying the `FileOptions.SequentialScan` flag can increase performance for applications that read large files using sequential access. Performance gains can be even more noticeable for applications that read large files mostly sequentially, but occasionally skip over small ranges of bytes.

#### Examples
The following example shows how to use the Asynchronous value when creating a file stream.

_Code sample not included: ~/snippets/csharp/System.IO/FileOptions/Overview/example2.cs._

## FileOptions.Asynchronous field

```csharp
Asynchronous
```

Indicates that a file can be used for asynchronous reading and writing.

## FileOptions.DeleteOnClose field

```csharp
DeleteOnClose
```

Indicates that a file is automatically deleted when it is no longer in use.

## FileOptions.Encrypted field

```csharp
Encrypted
```

Indicates that a file is encrypted and can be decrypted only by using the same user account used for encryption.

## FileOptions.None field

```csharp
None
```

Indicates that no additional options should be used when creating a `FileStream` object.

## FileOptions.RandomAccess field

```csharp
RandomAccess
```

Indicates that the file is accessed randomly. The system can use this as a hint to optimize file caching.

## FileOptions.SequentialScan field

```csharp
SequentialScan
```

Indicates that the file is to be accessed sequentially from beginning to end. The system can use this as a hint to optimize file caching. If an application moves the file pointer for random access, optimum caching may not occur; however, correct operation is still guaranteed. Specifying this flag can increase performance in some cases.

## FileOptions.WriteThrough field

```csharp
WriteThrough
```

Indicates that the system should write through any intermediate cache and go directly to disk.
