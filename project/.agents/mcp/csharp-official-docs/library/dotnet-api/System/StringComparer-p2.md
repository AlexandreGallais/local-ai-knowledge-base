---
title: "StringComparer class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/StringComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringComparer class (part 2 of 2)

## StringComparer.Equals(String, String) method

```csharp
public abstract bool Equals (string? x, string? y);
```

When overridden in a derived class, indicates whether two strings are equal.

Parameters:

- `x`: A string to compare to `y`.
- `y`: A string to compare to `x`.

Returns: `true` if `x` and `y` refer to the same object, or `x` and `y` are equal, or `x` and `y` are `null`; otherwise, `false`.

#### Remarks
Because the runtime does not have to unbox `x` or `y` if they are value types or attempt to downcast `x` or `y` to strings if they are reference types, the `Equals` method may be slightly more efficient than the `Equals` method.

## StringComparer.FromComparison(StringComparison) method

```csharp
public static StringComparer FromComparison (StringComparison comparisonType);
```

Converts the specified `StringComparison` instance to a `StringComparer` instance.

Parameters:

- `comparisonType`: A string comparer instance to convert.

Returns: A `StringComparer` instance representing the equivalent value of the specified `StringComparison` instance.

Exceptions:

- `ArgumentException`: The specified string comparison is not supported.

To be added.

## StringComparer.GetHashCode(Object) method

```csharp
public int GetHashCode (object obj);
```

When overridden in a derived class, gets the hash code for the specified object.

Parameters:

- `obj`: An object.

Returns: A 32-bit signed hash code calculated from the value of the `obj` parameter.

Exceptions:

- `ArgumentException`: Not enough memory is available to allocate the buffer that is required to compute the hash code.
- `ArgumentNullException`: `obj` is `null`.

#### Remarks
The `GetHashCode` method is more efficient than the `StringComparer.GetHashCode` method because the `obj` parameter does not have to be unboxed to perform the operation.

The `GetHashCode` method allocates an amount of memory that is proportional to the size of `obj` to calculate the hash code of `obj`. In the case of large strings, trying to retrieve the hash code can throw an `ArgumentException`.

## StringComparer.GetHashCode(String) method

```csharp
public abstract int GetHashCode (string obj);
```

When overridden in a derived class, gets the hash code for the specified string.

Parameters:

- `obj`: A string.

Returns: A 32-bit signed hash code calculated from the value of the `obj` parameter.

Exceptions:

- `ArgumentException`: Not enough memory is available to allocate the buffer that is required to compute the hash code.
- `ArgumentNullException`: `obj` is `null`.

#### Remarks
The `GetHashCode` method is more efficient than the `GetHashCode` method because the `obj` parameter does not have to be unboxed to perform the operation.

The `GetHashCode` method allocates an amount of memory that is proportional to the size of `obj` to calculate the hash code of `obj`. In the case of large strings, trying to retrieve the hash code can throw an `ArgumentException`.

## StringComparer.IsWellKnownCultureAwareComparer(String>, CompareInfo, CompareOptions) method

```csharp
public static bool IsWellKnownCultureAwareComparer (System.Collections.Generic.IEqualityComparer<string?>? comparer, out System.Globalization.CompareInfo? compareInfo, out System.Globalization.CompareOptions compareOptions);
```

Determines whether the specified `IEqualityComparer<T>` is a well-known culture-aware string comparer.

Parameters:

- `comparer`: The comparer to query.
- `compareInfo`: When this method returns, contains a value indicating which `CompareInfo` was used to create `comparer`. Set to `null` if this method returns `false`.
- `compareOptions`: When this method returns, contains a value indicating which `CompareOptions` was used to create `comparer`. Set to `CompareOptions.None` if this method returns `false`.

Returns: `true` if `comparer` is a well-known culture-aware string comparer; otherwise, `false`.

#### Remarks

A "well-known culture-aware comparer" describes a comparer that's tied to a specific `CompareInfo` using
some defined `CompareOptions`. To create a `StringComparer` instance wrapped around a
`CompareInfo` and `CompareOptions`, use `GetStringComparer`.
This method returns `false` when given `Ordinal` and other non-linguistic comparers as input.

## StringComparer.IsWellKnownOrdinalComparer(String>, Boolean) method

```csharp
public static bool IsWellKnownOrdinalComparer (System.Collections.Generic.IEqualityComparer<string?>? comparer, out bool ignoreCase);
```

Determines whether the specified `IEqualityComparer<T>` is a well-known ordinal string comparer.

Parameters:

- `comparer`: The comparer to query.
- `ignoreCase`: When this method returns, contains a value stating whether `comparer` is case-insensitive. Set to `false` if this method returns `false`.

Returns: `true` if `comparer` is a well-known ordinal string comparer; otherwise, `false`.

#### Remarks

A "well-known ordinal comparer" describes a comparer that behaves identically to `Ordinal`
when passed to `Dictionary<T1,T2>.%23ctor` or `HashSet<T>.%23ctor`.
For example, `Default` is a well-known ordinal comparer because
a `Dictionary<T1,T2>` given `Default` as a constructor
argument will behave identically to a `Dictionary<T1,T2>` given `Ordinal`
as a constructor argument. If `ignoreCase` is `true` on method exit,
then `comparer` behaves identically to `OrdinalIgnoreCase` when passed to the
constructor of such a collection.
