---
title: "LabelTarget class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/LabelTarget.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LabelTarget class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class LabelTarget
```

Used to represent the target of a `GotoExpression`.

#### Examples
The following example demonstrates how to create an expression that contains a `LabelTarget` object by using the `Expression.Label` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## LabelTarget.Name property

```csharp
public string? Name { get; }
```

Gets the name of the label.

Returns: The name of the label.

#### Remarks
The label's name is provided for information purposes only.

## LabelTarget.Type property

```csharp
public Type Type { get; }
```

The type of value that is passed when jumping to the label (or `Void` if no value should be passed).

Returns: The `Type` object representing the type of the value that is passed when jumping to the label or `Void` if no value should be passed.

To be added.

## LabelTarget.ToString() method

```csharp
public override string ToString ();
```

Returns a `String` that represents the current `Object`.

Returns: A `String` that represents the current `Object`.

To be added.
