---
title: "IDecrementOperators<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/IDecrementOperators`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDecrementOperators<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface IDecrementOperators<TSelf> where TSelf : IDecrementOperators<TSelf>
```

Defines a mechanism for decrementing a given value.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## IDecrementOperators<TSelf>.op_CheckedDecrement(TSelf) method

```csharp
public static virtual TSelf op_CheckedDecrement (TSelf value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

Exceptions:

- `OverflowException`: The result of decrementing `value` is not representable by `TSelf`.

To be added.

## IDecrementOperators<TSelf>.op_Decrement(TSelf) method

```csharp
public static abstract TSelf operator -- (TSelf value);
```

Decrements a value.

Parameters:

- `value`: The value to decrement.

Returns: The result of decrementing `value`.

To be added.
