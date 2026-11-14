---
title: "StrongBox<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/StrongBox`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StrongBox<T> class

Namespace: `System.Runtime.CompilerServices`

```csharp
public class StrongBox<T> : System.Runtime.CompilerServices.IStrongBox
```

Holds a reference to a value.

Parameters:

- `T`: The type of the value that the `StrongBox<T>` references.

#### Remarks
This type is provided for use by the dynamic methods that the internal expression compiler component of the expression tree API generates.

## StrongBox<T>.StrongBox() constructor

```csharp
public StrongBox ();
```

Initializes a new StrongBox that can receive a value when used in a reference call.

To be added.

## StrongBox<T>.StrongBox(T) constructor

```csharp
public StrongBox (T value);
```

Initializes a new instance of the `StrongBox<T>` class by using the supplied value.

Parameters:

- `value`: A value that the `StrongBox<T>` will reference.

To be added.

## StrongBox<T>.System.Runtime.CompilerServices.IStrongBox.Value property

```csharp
object? System.Runtime.CompilerServices.IStrongBox.Value { get; set; }
```

Gets or sets the value that the `StrongBox<T>` references.

Returns: The value that the `StrongBox<T>` references.

To be added.

## StrongBox<T>.Value field

```csharp
public T Value;
```

Represents the value that the `StrongBox<T>` references.

To be added.
