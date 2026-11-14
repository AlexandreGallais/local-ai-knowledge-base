---
title: "Nullable class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Nullable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Nullable class

Namespace: `System`

```csharp
public static class Nullable
```

Supports a value type that can be assigned `null`. This class cannot be inherited.

The `Nullable` class supports value types that can be assigned `null`.

A type is said to be nullable if it can be assigned a value or can be assigned `null`, which means the type has no value whatsoever. By default, all reference types, such as `String`, are nullable, but all value types, such as `Int32`, are not.

In C# and Visual Basic, you mark a value type as nullable by using the `?` notation after the value type. For example, `int?` in C# or `Integer?` in Visual Basic <example-value> an integer value type that can be assigned `null`.

The `Nullable` class provides complementary support for the `Nullable<T>` structure. The `Nullable` class supports obtaining the underlying type of a nullable type, and comparison and equality operations on pairs of nullable types whose underlying value type does not support generic comparison and equality operations.

#### Boxing and unboxing

When a nullable type is boxed, the common language runtime automatically boxes the underlying value of the `Nullable<T>` object, not the `Nullable<T>` object itself. That is, if the `HasValue` property is `true`, the contents of the `Value` property is boxed.

If the `HasValue` property of a nullable type is `false`, the result of the boxing operation is `null`. When the underlying value of a nullable type is unboxed, the common language runtime creates a new `Nullable<T>` structure initialized to the underlying value.

## Nullable.Compare<T>(Nullable<T>, Nullable<T>) method

```csharp
public static int Compare<T> (T? n1, T? n2) where T : struct;
```

Compares the relative values of two `Nullable<T>` objects.

Parameters:

- `T`: The underlying value type of the `n1` and `n2` parameters.
- `n1`: A `Nullable<T>` object.
- `n2`: A `Nullable<T>` object.

Returns: An integer that indicates the relative values of the `n1` and `n2` parameters.

-  Less than zero

:  The `Nullable<T>.HasValue` property for `n1` is `false`, and the `Nullable<T>.HasValue` property for `n2` is `true`, or the `Nullable<T>.HasValue` properties for `n1` and `n2` are `true`, and the value of the `Nullable<T>.Value` property for `n1` is less than the value of the `Nullable<T>.Value` property for `n2`.

-  Zero

:  The `Nullable<T>.HasValue` properties for `n1` and `n2` are `false`, or the `Nullable<T>.HasValue` properties for `n1` and `n2` are `true`, and the value of the `Nullable<T>.Value` property for `n1` is equal to the value of the `Nullable<T>.Value` property for `n2`.

-  Greater than zero

:  The `Nullable<T>.HasValue` property for `n1` is `true`, and the `Nullable<T>.HasValue` property for `n2` is `false`, or the `Nullable<T>.HasValue` properties for `n1` and `n2` are `true`, and the value of the `Nullable<T>.Value` property for `n1` is greater than the value of the `Nullable<T>.Value` property for `n2`.

To be added.

## Nullable.Equals<T>(Nullable<T>, Nullable<T>) method

```csharp
public static bool Equals<T> (T? n1, T? n2) where T : struct;
```

Indicates whether two specified `Nullable<T>` objects are equal.

Parameters:

- `T`: The underlying value type of the `n1` and `n2` parameters.
- `n1`: A `Nullable<T>` object.
- `n2`: A `Nullable<T>` object.

Returns: `true` if the `n1` parameter is equal to the `n2` parameter; otherwise, `false`.

The return value depends on the `Nullable<T>.HasValue` and `Nullable<T>.Value` properties of the two parameters that are compared.

- `true`:  The `Nullable<T>.HasValue` properties for `n1` and `n2` are `false`, or the `Nullable<T>.HasValue` properties for `n1` and `n2` are `true`, and the `Nullable<T>.Value` properties of the parameters are equal.

- `false`:  The `Nullable<T>.HasValue` property is `true` for one parameter and `false` for the other parameter, or the `Nullable<T>.HasValue` properties for `n1` and `n2` are `true`, and the `Nullable<T>.Value` properties of the parameters are unequal.

To be added.

## Nullable.GetUnderlyingType(Type) method

```csharp
public static Type? GetUnderlyingType (Type nullableType);
```

Returns the underlying type argument of the specified nullable type.

Parameters:

- `nullableType`: A `Type` object that describes a closed generic nullable type.

Returns: The type argument of the `nullableType` parameter, if the `nullableType` parameter is a closed generic nullable type; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `nullableType` is `null`.
- `NotSupportedException`: In .NET 11 and later, `nullableType` is a custom `Type` subclass that doesn't override `Type.GetNullableUnderlyingType`.

#### Remarks
A generic type definition is a type declaration, such as `Nullable<T>`, that contains a type parameter list, and the type parameter list declares one or more type parameters. A closed generic type is a type declaration where a particular type is specified for a type parameter.

For example, if the `nullableType` parameter is the type of `Nullable<Int32>` in C# (`Nullable(Of Int32)` in Visual Basic), the return value is the type of `Int32` (that is, the type argument of the closed generic type).

#### Examples
The following code example defines a method whose return value is of type `Nullable<T>` of `Int32`. The code example uses the `Nullable.GetUnderlyingType` method to display the type argument of the return value.

_Code sample not included: ~/snippets/csharp/System/Nullable/GetUnderlyingType/gut.cs._

## Nullable.GetValueRefOrDefaultRef<T>(Nullable<T>) method

```csharp
public static ref readonly T GetValueRefOrDefaultRef<T> (ref readonly T? nullable) where T : struct;
```

Retrieves a readonly reference to the location in the `Nullable<T>` instance where the value is stored.

Parameters:

- `T`: The underlying value type of the `Nullable<T>` generic type.
- `nullable`: The readonly reference to the input `Nullable<T>` value.

Returns: A readonly reference to the location where the instance's `T` value is stored. If the instance's `Nullable<T>.HasValue` is `false`, the current value at that location may be the default value.

#### Remarks

As the returned readonly reference refers to data that is stored in the input `nullable` value, this method should only ever be
called when the input reference points to a value with an actual location and not an "rvalue" (an expression that may appear on the right side but not left side of an assignment). That is, if this API is called and the input reference
points to a value that is produced by the compiler as a defensive copy or a temporary copy, the behavior might not match the desired one.
