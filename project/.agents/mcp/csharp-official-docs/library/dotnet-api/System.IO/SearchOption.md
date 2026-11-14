---
title: "SearchOption enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/SearchOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SearchOption enum

Namespace: `System.IO`

```csharp
public enum SearchOption
```

Specifies whether to search the current directory, or the current directory and all subdirectories.

#### Remarks
If you choose `AllDirectories` in your search and the directory structure contains a link that creates a loop, the search operation enters an infinite loop.

#### Examples
The following example lists all the directories and files that begin with the letter "c", as in "c:\\". In this example, `TopDirectoryOnly` is used to specify that only the top-level directory should be searched.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetDirectories/searchoption.cs._

## SearchOption.AllDirectories field

```csharp
AllDirectories
```

Includes the current directory and all its subdirectories in a search operation. This option includes reparse points such as mounted drives and symbolic links in the search.

## SearchOption.TopDirectoryOnly field

```csharp
TopDirectoryOnly
```

Includes only the current directory in a search operation.
