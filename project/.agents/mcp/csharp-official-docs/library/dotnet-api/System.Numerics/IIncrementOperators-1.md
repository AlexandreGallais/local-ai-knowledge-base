---
title: "IIncrementOperators<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IIncrementOperators`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IIncrementOperators<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IIncrementOperators<TSelf> where TSelf : IIncrementOperators<TSelf>
```

Defines a mechanism for incrementing a given value.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## IIncrementOperators<TSelf>.op_CheckedIncrement(TSelf) method

```csharp
public static virtual TSelf op_CheckedIncrement (TSelf value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

Exceptions:

- `OverflowException`: The result of incrementing `value` is not representable by `TSelf`.

To be added.

## IIncrementOperators<TSelf>.op_Increment(TSelf) method

```csharp
public static abstract TSelf operator ++ (TSelf value);
```

Increments a value.

Parameters:

- `value`: The value to increment.

Returns: The result of incrementing `value`.

To be added.
