---
title: "LoaderOptimizationAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/LoaderOptimizationAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoaderOptimizationAttribute class

Namespace: `System`

```csharp
public sealed class LoaderOptimizationAttribute : Attribute
```

Used to set the default loader optimization policy for the main method of an executable application.

#### Remarks
The `LoaderOptimizationAttribute` can only be set on the main method for an executable application and is ignored on all other methods.

The `LoaderOptimizationAttribute` attribute is specified with a `LoaderOptimization` enumeration value, which tells the loader what type of application to optimize for: `SingleDomain`, `MultiDomain`, or `MultiDomainHost`.

This attribute is only a hint to the loader and does not affect program behavior.

## LoaderOptimizationAttribute.LoaderOptimizationAttribute(Byte) constructor

```csharp
public LoaderOptimizationAttribute (byte value);
```

Initializes a new instance of the `LoaderOptimizationAttribute` class to the specified value.

Parameters:

- `value`: A value equivalent to a `LoaderOptimization` constant.

To be added.

## LoaderOptimizationAttribute.LoaderOptimizationAttribute(LoaderOptimization) constructor

```csharp
public LoaderOptimizationAttribute (LoaderOptimization value);
```

Initializes a new instance of the `LoaderOptimizationAttribute` class to the specified value.

Parameters:

- `value`: A `LoaderOptimization` constant.

To be added.

## LoaderOptimizationAttribute.Value property

```csharp
public LoaderOptimization Value { get; }
```

Gets the current `LoaderOptimization` value for this instance.

Returns: A `LoaderOptimization` constant.

To be added.
