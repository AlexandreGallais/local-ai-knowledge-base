---
title: "Vector<T> struct (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector<T> struct (part 3 of 3)

## Vector<T>.TryCopyTo(Span<T>) method

```csharp
public bool TryCopyTo (Span<T> destination);
```

Attempts to copy the vector to the given `Span<T>`.

Parameters:

- `destination`: The destination span to which the values are copied. The destination span must be at least size `Vector<T>.Count`.

Returns: `true` if the source vector was successfully copied to `destination`. `false` if `destination` is not large enough to hold the source vector.

Exceptions:

- `NotSupportedException`: Type `T` is not supported.

To be added.
