---
title: "IShiftOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IShiftOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IShiftOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IShiftOperators<TSelf,TOther,TResult> where TSelf : IShiftOperators<TSelf,TOther,TResult>
```

Defines a mechanism for shifting a value by another value.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type used to specify the amount by which `TSelf` should be shifted.
- `TResult`: The type that contains the result of shifting `TSelf` by `TResult`.

To be added.

## IShiftOperators<TSelf,TOther,TResult>.op_LeftShift(TSelf, TOther) method

```csharp
public static abstract TResult operator << (TSelf value, TOther shiftAmount);
```

Shifts a value left by a given amount.

Parameters:

- `value`: The value that is shifted left by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted left.

Returns: The result of shifting `value` left by `shiftAmount`.

To be added.

## IShiftOperators<TSelf,TOther,TResult>.op_RightShift(TSelf, TOther) method

```csharp
public static abstract TResult operator >> (TSelf value, TOther shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

#### Remarks

This operation is meant to perform a signed (otherwise known as an arithmetic) right shift on signed types.

## IShiftOperators<TSelf,TOther,TResult>.op_UnsignedRightShift(TSelf, TOther) method

```csharp
public static abstract TResult op_UnsignedRightShift (TSelf value, TOther shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

#### Remarks

This operation is meant to perform an unsigned (otherwise known as a logical) right shift on all types.
