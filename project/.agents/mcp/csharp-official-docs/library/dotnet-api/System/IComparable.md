---
title: "IComparable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IComparable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IComparable interface

Namespace: `System`

```csharp
public interface IComparable
```

Defines a generalized type-specific comparison method that a value type or class implements to order or sort its instances.

#### Remarks
This interface is implemented by types whose values can be ordered or sorted. It requires that implementing types define a single method, `CompareTo`, that indicates whether the position of the current instance in the sort order is before, after, or the same as a second object of the same type. The instance's `IComparable` implementation is called automatically by methods such as `Array.Sort` and `ArrayList.Sort`.

The implementation of the `CompareTo` method must return an `Int32` that has one of three values, as shown in the following table.

|Value|Meaning|
|-----------|-------------|
|Less than zero|The current instance precedes the object specified by the `IComparable.CompareTo` method in the sort order.|
|Zero|This current instance occurs in the same position in the sort order as the object specified by the `IComparable.CompareTo` method.|
|Greater than zero|This current instance follows the object specified by the `IComparable.CompareTo` method in the sort order.|

All numeric types (such as `Int32` and `Double`) implement `IComparable`, as do `String`, `Char`, and `DateTime`. Custom types should also provide their own implementation of `IComparable` to enable object instances to be ordered or sorted.

#### Examples
The following example illustrates the implementation of `IComparable` and the requisite `IComparable.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/IComparable/Overview/source.cs._

## IComparable.CompareTo(Object) method

```csharp
public int CompareTo (object? obj);
```

Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: A value that indicates the relative order of the objects being compared. The return value has these meanings:

-  Less than zero

:  This instance precedes `obj` in the sort order.

-  Zero

:  This instance occurs in the same position in the sort order as `obj`.

-  Greater than zero

:  This instance follows `obj` in the sort order.

Exceptions:

- `ArgumentException`: `obj` is not the same type as this instance.

#### Remarks
The `IComparable.CompareTo` method is implemented by types whose values can be ordered or sorted. It is called automatically by methods of non-generic collection objects, such as `Array.Sort`, to order each member of the array. If a custom class or structure does not implement `IComparable`, its members cannot be ordered and the sort operation can throw an `InvalidOperationException`.

This method is only a definition and must be implemented by a specific class or value type to have effect. The meaning of the comparisons specified in the Return Value section ("precedes", "occurs in the same position as", and "follows") depends on the particular implementation.

By definition, any object compares greater than (or follows) `null`, and two null references compare equal to each other.

The parameter, `obj`, must be the same type as the class or value type that implements this interface; otherwise, an `ArgumentException` is thrown.

#### Examples
The following example illustrates the use of `IComparable.CompareTo` to compare a `Temperature` object implementing `IComparable` with another object. The `Temperature` object implements `IComparable.CompareTo` by simply wrapping a call to the `Int32.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/IComparable/Overview/source.cs._
