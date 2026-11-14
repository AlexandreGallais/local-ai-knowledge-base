---
title: "IReadOnlyList<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IReadOnlyList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IReadOnlyList<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IReadOnlyList<out T> : System.Collections.Generic.IEnumerable<out T>, System.Collections.Generic.IReadOnlyCollection<out T>
```

Represents a read-only collection of elements that can be accessed by index.

Parameters:

- `T`: The type of elements in the read-only list.

#### Remarks
The `IReadOnlyList<T>` represents a list in which the number and order of list elements is read-only. The content of list elements is not guaranteed to be read-only.

## IReadOnlyList<T>.Item property

```csharp
public T this[int index] { get; }
```

Gets the element at the specified index in the read-only list.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index in the read-only list.

To be added.
