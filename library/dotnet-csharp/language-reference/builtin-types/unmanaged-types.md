---
title: "Unmanaged types"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/unmanaged-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unmanaged types (C# reference)

A type is an **unmanaged type** if it's any of the following types:

- `sbyte`, `byte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `nint`, `nuint`, `char`, `float`, `double`, `decimal`, or `bool`
- Any enum type
- Any pointer type
- A tuple whose members are all of an unmanaged type
- Any user-defined struct type that contains fields of unmanaged types only.

You can use the `unmanaged` constraint to specify that a type parameter is a non-pointer, non-nullable unmanaged type.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

A *constructed* struct type that contains fields of unmanaged types only is also unmanaged, as the following example shows:

```csharp
using System;

public struct Coords<T>
{
    public T X;
    public T Y;
}

public class UnmanagedTypes
{
    public static void Main()
    {
        DisplaySize<Coords<int>>();
        DisplaySize<Coords<double>>();
    }

    private unsafe static void DisplaySize<T>() where T : unmanaged
    {
        Console.WriteLine($"{typeof(T)} is unmanaged and its size is {sizeof(T)} bytes");
    }
}
// Output:
// Coords`1[System.Int32] is unmanaged and its size is 8 bytes
// Coords`1[System.Double] is unmanaged and its size is 16 bytes

namespace always_unmanaged
{
    public struct Coords<T> where T : unmanaged
    {
        public T X;
        public T Y;
    }
}
```
A generic struct can define both unmanaged and managed constructed types. The preceding example defines a generic struct `Coords<T>` and presents examples of unmanaged constructed types. The example of a managed type is `Coords<object>`. It's managed because it has the fields of the `object` type, which is managed. If you want *all* constructed types to be unmanaged types, use the `unmanaged` constraint in the definition of a generic struct:

```csharp
using System;

public struct Coords<T>
{
    public T X;
    public T Y;
}

public class UnmanagedTypes
{
    public static void Main()
    {
        DisplaySize<Coords<int>>();
        DisplaySize<Coords<double>>();
    }

    private unsafe static void DisplaySize<T>() where T : unmanaged
    {
        Console.WriteLine($"{typeof(T)} is unmanaged and its size is {sizeof(T)} bytes");
    }
}
// Output:
// Coords`1[System.Int32] is unmanaged and its size is 8 bytes
// Coords`1[System.Double] is unmanaged and its size is 16 bytes

namespace always_unmanaged
{
    public struct Coords<T> where T : unmanaged
    {
        public T X;
        public T Y;
    }
}
```
## C# language specification

For more information, see the Pointer types section of the C# language specification.

## See also

- Pointer types
- Memory and span-related types
- sizeof operator
- stackalloc
