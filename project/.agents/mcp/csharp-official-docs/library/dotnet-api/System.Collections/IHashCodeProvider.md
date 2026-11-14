---
title: "IHashCodeProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IHashCodeProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHashCodeProvider interface

Namespace: `System.Collections`

```csharp
public interface IHashCodeProvider
```

Supplies a hash code for an object, using a custom hash function.

To be added.

## IHashCodeProvider.GetHashCode(Object) method

```csharp
public int GetHashCode (object obj);
```

Returns a hash code for the specified object.

Parameters:

- `obj`: The `Object` for which a hash code is to be returned.

Returns: A hash code for the specified object.

Exceptions:

- `ArgumentNullException`: The type of `obj` is a reference type and `obj` is `null`.

#### Remarks
The return value from this method must not be persisted for two reasons. First, the hash function of a class might be altered to generate a better distribution, rendering any values from the old hash function useless. Second, the default implementation of this class does not guarantee that the same value will be returned by different instances.
