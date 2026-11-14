---
title: "CurrencyWrapper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CurrencyWrapper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CurrencyWrapper class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class CurrencyWrapper
```

Wraps objects the marshaler should marshal as a `VT_CY`.

To be added.

## CurrencyWrapper.CurrencyWrapper(Decimal) constructor

```csharp
public CurrencyWrapper (decimal obj);
```

Initializes a new instance of the `CurrencyWrapper` class with the `Decimal` to be wrapped and marshaled as type `VT_CY`.

Parameters:

- `obj`: The `Decimal` to be wrapped and marshaled as `VT_CY`.

To be added.

## CurrencyWrapper.CurrencyWrapper(Object) constructor

```csharp
public CurrencyWrapper (object obj);
```

Initializes a new instance of the `CurrencyWrapper` class with the object containing the `Decimal` to be wrapped and marshaled as type `VT_CY`.

Parameters:

- `obj`: The object containing the `Decimal` to be wrapped and marshaled as `VT_CY`.

Exceptions:

- `ArgumentException`: The `obj` parameter is not a `Decimal` type.

To be added.

## CurrencyWrapper.WrappedObject property

```csharp
public decimal WrappedObject { get; }
```

Gets the wrapped object to be marshaled as type `VT_CY`.

Returns: The wrapped object to be marshaled as type `VT_CY`.

To be added.
