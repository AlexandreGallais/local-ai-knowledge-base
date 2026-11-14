---
title: "Variance in Generic Interfaces"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/concepts/covariance-contravariance/variance-in-generic-interfaces.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Variance in Generic Interfaces (C#)

.NET Framework 4 introduced variance support for several existing generic interfaces. Variance support enables implicit conversion of classes that implement these interfaces.

Starting with .NET Framework 4, the following interfaces are variant:

- `System.Collections.Generic.IEnumerable`1` (T is covariant)

- `System.Collections.Generic.IEnumerator`1` (T is covariant)

- `System.Linq.IQueryable`1` (T is covariant)

- `System.Linq.IGrouping`2` (`TKey` and `TElement` are covariant)

- `System.Collections.Generic.IComparer`1` (T is contravariant)

- `System.Collections.Generic.IEqualityComparer`1` (T is contravariant)

- `System.IComparable`1` (T is contravariant)

Starting with .NET Framework 4.5, the following interfaces are variant:

- `System.Collections.Generic.IReadOnlyList`1` (T is covariant)

- `System.Collections.Generic.IReadOnlyCollection`1` (T is covariant)

Covariance permits a method to have a more derived return type than that defined by the generic type parameter of the interface. To illustrate the covariance feature, consider these generic interfaces: `IEnumerable<Object>` and `IEnumerable<String>`. The `IEnumerable<String>` interface does not inherit the `IEnumerable<Object>` interface. However, the `String` type does inherit the `Object` type, and in some cases you may want to assign objects of these interfaces to each other. This is shown in the following code example.

```csharp
IEnumerable<String> strings = new List<String>();
IEnumerable<Object> objects = strings;
```

In earlier versions of .NET Framework, this code causes a compilation error in C# and, if `Option Strict` is on, in Visual Basic. But now you can use `strings` instead of `objects`, as shown in the previous example, because the `System.Collections.Generic.IEnumerable`1` interface is covariant.

Contravariance permits a method to have argument types that are less derived than that specified by the generic parameter of the interface. To illustrate contravariance, assume that you have created a `BaseComparer` class to compare instances of the `BaseClass` class. The `BaseComparer` class implements the `IEqualityComparer<BaseClass>` interface. Because the `System.Collections.Generic.IEqualityComparer`1` interface is now contravariant, you can use `BaseComparer` to compare instances of classes that inherit the `BaseClass` class. This is shown in the following code example.

```csharp
// Simple hierarchy of classes.
class BaseClass { }
class DerivedClass : BaseClass { }

// Comparer class.
class BaseComparer : IEqualityComparer<BaseClass>
{
    public int GetHashCode(BaseClass baseInstance)
    {
        return baseInstance.GetHashCode();
    }
    public bool Equals(BaseClass x, BaseClass y)
    {
        return x == y;
    }
}
class Program
{
    static void Test()
    {
        IEqualityComparer<BaseClass> baseComparer = new BaseComparer();

        // Implicit conversion of IEqualityComparer<BaseClass> to
        // IEqualityComparer<DerivedClass>.
        IEqualityComparer<DerivedClass> childComparer = baseComparer;
    }
}
```

For more examples, see Using Variance in Interfaces for Generic Collections (C#).

Variance in generic interfaces is supported for reference types only. Value types do not support variance. For example, `IEnumerable<int>` cannot be implicitly converted to `IEnumerable<object>`, because integers are represented by a value type.

```csharp
IEnumerable<int> integers = new List<int>();
// The following statement generates a compiler error,
// because int is a value type.
// IEnumerable<Object> objects = integers;
```

It is also important to remember that classes that implement variant interfaces are still invariant. For example, although `System.Collections.Generic.List`1` implements the covariant interface `System.Collections.Generic.IEnumerable`1`, you cannot implicitly convert `List<String>` to `List<Object>`. This is illustrated in the following code example.

```csharp
// The following line generates a compiler error
// because classes are invariant.
// List<Object> list = new List<String>();

// You can use the interface object instead.
IEnumerable<Object> listObjects = new List<String>();
```

## See also

- Using Variance in Interfaces for Generic Collections (C#)
- Creating Variant Generic Interfaces (C#)
- Generic Interfaces
- Variance in Delegates (C#)
