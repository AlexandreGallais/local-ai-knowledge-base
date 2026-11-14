---
title: "Closure class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/Closure.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Closure class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class Closure
```

Represents the runtime state of a dynamically generated method.

To be added.

## Closure.Closure(Object[], Object[]) constructor

```csharp
public Closure (object[] constants, object[]? locals);
```

Creates an object to hold state of a dynamically generated method.

Parameters:

- `constants`: The constant values that are used by the method.
- `locals`: The hoisted local variables from the parent context.

To be added.

## Closure.Constants field

```csharp
public readonly object[] Constants;
```

Represents the non-trivial constants and locally executable expressions that are referenced by a dynamically generated method.

To be added.

## Closure.Locals field

```csharp
public readonly object[]? Locals;
```

Represents the hoisted local variables from the parent context.

To be added.
