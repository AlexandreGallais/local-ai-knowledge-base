---
title: "Nullable<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Nullable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Nullable<T> struct

Namespace: `System`

```csharp
public struct Nullable<T> where T : struct
```

Represents a value type that can be assigned `null`.

Parameters:

- `T`: The underlying value type of the `Nullable<T>` generic type.

The `Nullable` class represents a value type that can be assigned `null`.

A type is said to be nullable if it can be assigned a value or can be assigned `null`, which means the type has no value whatsoever. By default, all reference types, such as `String`, are nullable, but all value types, such as `Int32`, are not.

In C# and Visual Basic, you mark a value type as nullable by using the `?` notation after the value type. For example, `int?` in C# or `Integer?` in Visual Basic <example-value> an integer value type that can be assigned `null`.

The `Nullable<T>` structure supports using only a value type as a nullable type because reference types are nullable by design.

The `Nullable` class provides complementary support for the `Nullable<T>` structure. The `Nullable` class supports obtaining the underlying type of a nullable type, and comparison and equality operations on pairs of nullable types whose underlying value type does not support generic comparison and equality operations.

#### Fundamental properties

The two fundamental members of the `Nullable<T>` structure are the `HasValue` and `Value` properties. If the `HasValue` property for a `Nullable<T>` object is `true`, the value of the object can be accessed with the `Value` property. If the `HasValue` property is `false`, the value of the object is undefined and an attempt to access the `Value` property throws an `InvalidOperationException`.

#### Boxing and unboxing

When a nullable type is boxed, the common language runtime automatically boxes the underlying value of the `Nullable<T>` object, not the `Nullable<T>` object itself. That is, if the `HasValue` property is `true`, the contents of the `Value` property is boxed. When the underlying value of a nullable type is unboxed, the common language runtime creates a new `Nullable<T>` structure initialized to the underlying value.

If the `HasValue` property of a nullable type is `false`, the result of a boxing operation is `null`. Consequently, if a boxed nullable type is passed to a method that expects an object argument, that method must be prepared to handle the case where the argument is `null`. When `null` is unboxed into a nullable type, the common language runtime creates a new `Nullable<T>` structure and initializes its `HasValue` property to `false`.

#### Windows runtime components

You can include a `Nullable<T>` type as a member of a structure exported in a WinMD library.

The following code example defines three rows of a table in the Microsoft Pubs sample database. The table contains two columns that are not nullable and two columns that are nullable.

_Code sample not included: ~/snippets/csharp/System/NullableT/Overview/tarow.cs._

## Nullable<T>.Nullable(T) constructor

```csharp
public Nullable (T value);
```

Initializes a new instance of the `Nullable<T>` structure to the specified value.

Parameters:

- `value`: A value type.

#### Remarks
The `Nullable<T>.%23ctor` constructor initializes the `HasValue` property of the new `Nullable<T>` object to `true`, and the `Value` property to the value of the `value` parameter.

## Nullable<T>.HasValue property

```csharp
public bool HasValue { get; }
```

Gets a value indicating whether the current `Nullable<T>` object has a valid value of its underlying type.

Returns: `true` if the current `Nullable<T>` object has a value; `false` if the current `Nullable<T>` object has no value.

#### Remarks
If the `HasValue` property is `true`, the value of the current `Nullable<T>` object can be accessed with the `Value` property. Otherwise, attempting to access its value throws an `InvalidOperationException` exception.

#### Examples
The following example uses the `HasValue` property of a `Nullable<int>` (`Nullable(Of Integer)` in Visual Basic) object to determine whether it should display the object's `Value` property or its `GetValueOrDefault` property.

_Code sample not included: ~/snippets/csharp/System/NullableT/HasValue/hasvalue2.cs._

## Nullable<T>.Value property

```csharp
public T Value { get; }
```

Gets the value of the current `Nullable<T>` object if it has been assigned a valid underlying value.

Returns: The value of the current `Nullable<T>` object if the `Nullable<T>.HasValue` property is `true`. An exception is thrown if the `Nullable<T>.HasValue` property is `false`.

Exceptions:

- `InvalidOperationException`: The `Nullable<T>.HasValue` property is `false`.

#### Remarks
If a value of type `T` has not been assigned to the `Nullable<T>` object, you can compare it to `null` and retrieve its `HasValue` property, but you cannot access its `Value` property or call its other members.

#### Examples
The following example uses the `HasValue` property of a `Nullable<int>` (`Nullable(Of Integer)` in Visual Basic) object to determine whether it should display the object's `Value` property or its `GetValueOrDefault` property.

_Code sample not included: ~/snippets/csharp/System/NullableT/HasValue/hasvalue2.cs._

## Nullable<T>.Equals(Object) method

```csharp
public override bool Equals (object? other);
```

Indicates whether the current `Nullable<T>` object is equal to a specified object.

Parameters:

- `other`: An object.

Returns: `true` if the `other` parameter is equal to the current `Nullable<T>` object; otherwise, `false`.

This table describes how equality is defined for the compared values:

- `true`:  The `Nullable<T>.HasValue` property is `false`, and the `other` parameter is `null` (that is, two null values are equal by definition), OR the `Nullable<T>.HasValue` property is `true`, and the value returned by the `Nullable<T>.Value` property is equal to the `other` parameter.

- `false`:  The `Nullable<T>.HasValue` property for the current `Nullable<T>` structure is `true`, and the `other` parameter is `null`, OR the `Nullable<T>.HasValue` property for the current `Nullable<T>` structure is `false`, and the `other` parameter is not `null`, OR the `Nullable<T>.HasValue` property for the current `Nullable<T>` structure is `true`, and the value returned by the `Nullable<T>.Value` property is not equal to the `other` parameter.

#### Remarks
If the `HasValue` property of the current `Nullable<T>` structure is `true` and the `other` argument is not `null`, equality is determined by passing the `other` parameter to the `Equals` method of the underlying value of the current `Nullable<T>` structure.

#### Examples
The following code example determines whether an object and a `Nullable<T>` object are equal to the current `Nullable<T>` object.

_Code sample not included: ~/snippets/csharp/System/NullableT/Equals/eq.cs._

## Nullable<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Retrieves the hash code of the object returned by the `Nullable<T>.Value` property.

Returns: The hash code of the object returned by the `Nullable<T>.Value` property if the `Nullable<T>.HasValue` property is `true`, or zero if the `Nullable<T>.HasValue` property is `false`.

To be added.

## Nullable<T>.GetValueOrDefault() method

```csharp
public readonly T GetValueOrDefault ();
```

Retrieves the value of the current `Nullable<T>` object, or the default value of the underlying type.

Returns: The value of the `Nullable<T>.Value` property if the  `Nullable<T>.HasValue` property is `true`; otherwise, the default value of the underlying type.

#### Remarks
The `Nullable<T>.GetValueOrDefault` method returns a value even if the `HasValue` property is `false` (unlike the `Value` property, which throws an exception). If the `HasValue` property is `false`, the method returns the default value of the underlying type.

## Nullable<T>.GetValueOrDefault(T) method

```csharp
public readonly T GetValueOrDefault (T defaultValue);
```

Retrieves the value of the current `Nullable<T>` object, or the specified default value.

Parameters:

- `defaultValue`: A value to return if the `Nullable<T>.HasValue` property is `false`.

Returns: The value of the `Nullable<T>.Value` property if the `Nullable<T>.HasValue` property is `true`; otherwise, the `defaultValue` parameter.

#### Remarks
The `Nullable<T>.GetValueOrDefault` method returns a value even if the `HasValue` property is `false` (unlike the `Value` property, which throws an exception).

## Nullable<T>.op_Explicit(Nullable<T>) method

```csharp
public static explicit operator T (T? value);
```

Defines an explicit conversion of a `Nullable<T>` instance to its underlying value.

Parameters:

- `value`: A nullable value.

Returns: The value of the `Nullable<T>.Value` property for the `value` parameter.

#### Remarks
This operator supports the explicit conversion of the current `Nullable<T>` instance to type `T`, the type of `Nullable<T>.Value`. The syntax for such explicit conversions is language-dependent. You may also be able to perform the conversion by calling the `Convert.ChangeType` method.

The equivalent method for this operator is `Value`

#### Examples
The `Nullable<T>.op_Explicit` operator enables code such as the following, which converts a `Nullable(Of Int32)` value to an `Int32` value.

_Code sample not included: ~/snippets/csharp/System/NullableT/op_Explicit/explicit1.cs._

## Nullable<T>.op_Implicit(T) method

```csharp
public static implicit operator T? (T value);
```

Creates a new `Nullable<T>` object initialized to a specified value.

Parameters:

- `value`: A value type.

Returns: A `Nullable<T>` object whose `Nullable<T>.Value` property is initialized with the `value` parameter.

#### Remarks
The `Value` property of the new `Nullable<T>` value is initialized to the `value` parameter and the `HasValue` property is initialized to `true`.

The equivalent method for this operator is `%23ctor`

> **Note:**
>  In C# and Visual Basic, an implicit conversion from `T` to `Nullable<T>` does not invoke this operator because these languages have special rules for the conversion. This operator is provided for the benefit of languages that do not have such special rules.

> **Note:**
>  In C# and Visual Basic, an implicit conversion from a `null` or `Nothing` literal to `Nullable<T>` produces a `Nullable<T>` value whose `HasValue` property is initialized to `false`. The conversion occurs at compile time in these languages and does not invoke any operator.

## Nullable<T>.ToString() method

```csharp
public override string? ToString ();
```

Returns the text representation of the value of the current `Nullable<T>` object.

Returns: The text representation of the value of the current `Nullable<T>` object if the `Nullable<T>.HasValue` property is `true`, or an empty string ("") if the `Nullable<T>.HasValue` property is `false`.

#### Remarks
The `ToString` property returns the string yielded by calling the `ToString` property of the object returned by the `Value` property.

#### Examples
The following code example displays the value of the current `Nullable<T>` object.

_Code sample not included: ~/snippets/csharp/System/NullableT/ToString/ts.cs._
