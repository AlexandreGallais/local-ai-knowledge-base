---
title: "ParameterModifier struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ParameterModifier.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParameterModifier struct

Namespace: `System.Reflection`

```csharp
public readonly struct ParameterModifier
```

Attaches a modifier to parameters so that binding can work with parameter signatures in which the types have been modified.

#### Remarks
The `ParameterModifier` structure is used with the `InvokeMember` method overload when passing parameters by reference to a COM component that is accessed late bound. The parameters that are to be passed by reference are specified by a single `ParameterModifier` structure, which must be passed in an array containing a single element. The single `ParameterModifier` structure in this array must be initialized with the number of parameters in the member that is to be invoked. To indicate which of these parameters are passed by reference, set the value of the `ParameterModifier.Item` property (the indexer in C#) to `true` for the index number corresponding to the zero-based position of the parameter.

#### Examples
The following code example shows this for a member that has three string arguments, the first and third of which are passed by reference. Assume that a variable named `obj` contains a reference to the COM object.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterModifier/Overview/source.cs._

## ParameterModifier.ParameterModifier(Int32) constructor

```csharp
public ParameterModifier (int parameterCount);
```

Initializes a new instance of the `ParameterModifier` structure representing the specified number of parameters.

Parameters:

- `parameterCount`: The number of parameters.

Exceptions:

- `ArgumentException`: `parameterCount` is negative.

To be added.

## ParameterModifier.Item property

```csharp
public bool this[int index] { get; set; }
```

Gets or sets a value that specifies whether the parameter at the specified index position is to be modified by the current `ParameterModifier`.

Parameters:

- `index`: The index position of the parameter whose modification status is being examined or set.

Returns: `true` if the parameter at this index position is to be modified by this `ParameterModifier`; otherwise, `false`.

#### Remarks
Indexers permit a default property on a type to be indexed as if the type were an array.
