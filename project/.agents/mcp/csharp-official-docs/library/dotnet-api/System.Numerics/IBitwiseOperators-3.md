---
title: "IBitwiseOperators<TSelf,TOther,TResult> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IBitwiseOperators`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IBitwiseOperators<TSelf,TOther,TResult> interface

Namespace: `System.Numerics`

```csharp
public interface IBitwiseOperators<TSelf,TOther,TResult> where TSelf : IBitwiseOperators<TSelf,TOther,TResult>
```

Defines a mechanism for performing bitwise operations over two values.

Parameters:

- `TSelf`: The type that implements this interface.
- `TOther`: The type that is used in the operation with `TSelf`.
- `TResult`: The type that contains the result of `TSelf` op `TOther`.

To be added.

## IBitwiseOperators<TSelf,TOther,TResult>.op_BitwiseAnd(TSelf, TOther) method

```csharp
public static abstract TResult operator & (TSelf left, TOther right);
```

Computes the bitwise-and of two values.

Parameters:

- `left`: The value to `and` with `right`.
- `right`: The value to `and` with `left`.

Returns: The bitwise-and of `left` and `right`.

To be added.

## IBitwiseOperators<TSelf,TOther,TResult>.op_BitwiseOr(TSelf, TOther) method

```csharp
public static abstract TResult operator | (TSelf left, TOther right);
```

Computes the bitwise-or of two values.

Parameters:

- `left`: The value to `or` with `right`.
- `right`: The value to `or` with `left`.

Returns: The bitwise-or of `left` and `right`.

To be added.

## IBitwiseOperators<TSelf,TOther,TResult>.op_ExclusiveOr(TSelf, TOther) method

```csharp
public static abstract TResult operator ^ (TSelf left, TOther right);
```

Computes the exclusive-or of two values.

Parameters:

- `left`: The value to xor with `right`.
- `right`: The value to xor with `left`.

Returns: The exclusive-or of `left` and `right`.

To be added.

## IBitwiseOperators<TSelf,TOther,TResult>.op_OnesComplement(TSelf) method

```csharp
public static abstract TResult operator ~ (TSelf value);
```

Computes the ones-complement representation of a given value.

Parameters:

- `value`: The value for which to compute the ones-complement.

Returns: The ones-complement of `value`.

To be added.
