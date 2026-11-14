---
title: "IEqualityComparer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IEqualityComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEqualityComparer interface

Namespace: `System.Collections`

```csharp
public interface IEqualityComparer
```

Defines methods to support the comparison of objects for equality.

#### Remarks

This interface allows the implementation of customized equality comparison for collections. That is, you can create your own definition of equality, and specify that this definition be used with a collection type that accepts the `IEqualityComparer` interface. Constructors of the `Hashtable`, `NameValueCollection`, and `OrderedDictionary` collection types accept this interface.

For the generic version of this interface, see `IEqualityComparer<T>`.

The `IEqualityComparer` interface supports only equality comparisons. Customization of comparisons for sorting and ordering is provided by the `IComparer` interface.

## IEqualityComparer.Equals(Object, Object) method

```csharp
public bool Equals (object? x, object? y);
```

Determines whether the specified objects are equal.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: `true` if the specified objects are equal; otherwise, `false`.

Exceptions:

- `ArgumentException`: `x` and `y` are of different types and neither one can handle comparisons with the other.

#### Remarks
Implement this method to provide a customized equality comparison for objects.

#### Examples
The following code example demonstrates the implementation of a case-insensitive `IEqualityComparer`. In this example, the `CaseInsensitiveComparer.Compare` method is used to determine whether two objects are equal, based on the provided `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctor.cs._

## IEqualityComparer.GetHashCode(Object) method

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
Implement this method to provide customized hash codes for objects, corresponding to the customized equality comparison provided by the `IEqualityComparer.Equals` method.

#### Examples
The following code example demonstrates the implementation of a case-insensitive `IEqualityComparer`. In this example, the `IEqualityComparer.GetHashCode` method returns the hash code provided by the `Object` type.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctor.cs._
