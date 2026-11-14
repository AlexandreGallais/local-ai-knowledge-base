---
title: "IComparisonOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IComparisonOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IComparisonOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IComparisonOperators<TSelf,TOther,TResult> : System.Numerics.IEqualityOperators<TSelf,TOther,TResult> where TSelf : IComparisonOperators<TSelf,TOther,TResult>
```

Defines a mechanism for comparing two values to determine relative order.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that will be compared with `TSelf`.
- `TResult`: The type that is returned as a result of the comparison.

To be added.

## IComparisonOperators<TSelf,TOther,TResult>.op_GreaterThan(TSelf, TOther) method

```csharp
public static abstract TResult operator > (TSelf left, TOther right);
```

Compares two values to determine which is greater.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

To be added.

## IComparisonOperators<TSelf,TOther,TResult>.op_GreaterThanOrEqual(TSelf, TOther) method

```csharp
public static abstract TResult operator >= (TSelf left, TOther right);
```

Compares two values to determine which is greater or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

To be added.

## IComparisonOperators<TSelf,TOther,TResult>.op_LessThan(TSelf, TOther) method

```csharp
public static abstract TResult operator < (TSelf left, TOther right);
```

Compares two values to determine which is less.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

To be added.

## IComparisonOperators<TSelf,TOther,TResult>.op_LessThanOrEqual(TSelf, TOther) method

```csharp
public static abstract TResult operator <= (TSelf left, TOther right);
```

Compares two values to determine which is less or equal.

Parameters:

- `left`: The value to compare with `right`.
- `right`: The value to compare with `left`.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

To be added.
