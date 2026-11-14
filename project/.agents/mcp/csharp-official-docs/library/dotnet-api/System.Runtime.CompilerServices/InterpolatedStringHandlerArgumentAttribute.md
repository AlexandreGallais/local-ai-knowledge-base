---
title: "InterpolatedStringHandlerArgumentAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/InterpolatedStringHandlerArgumentAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InterpolatedStringHandlerArgumentAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class InterpolatedStringHandlerArgumentAttribute : Attribute
```

Indicates which arguments to a method involving an interpolated string handler should be passed to that handler.

To be added.

## InterpolatedStringHandlerArgumentAttribute.InterpolatedStringHandlerArgumentAttribute(String) constructor

```csharp
public InterpolatedStringHandlerArgumentAttribute (string argument);
```

Initializes a new instance of the `InterpolatedStringHandlerArgumentAttribute` class.

Parameters:

- `argument`: The name of the argument that should be passed to the handler.

#### Remarks

The empty string may be used as the name of the receiver in an instance method.

## InterpolatedStringHandlerArgumentAttribute.InterpolatedStringHandlerArgumentAttribute(String[]) constructor

```csharp
public InterpolatedStringHandlerArgumentAttribute (params string[] arguments);
```

Initializes a new instance of the `InterpolatedStringHandlerArgumentAttribute` class.

Parameters:

- `arguments`: The names of the arguments that should be passed to the handler.

#### Remarks

The empty string may be used as the name of the receiver in an instance method.

## InterpolatedStringHandlerArgumentAttribute.Arguments property

```csharp
public string[] Arguments { get; }
```

Gets the names of the arguments that should be passed to the handler.

Returns: To be added.

#### Remarks

The empty string may be used as the name of the receiver in an instance method.
