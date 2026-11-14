---
title: "DefaultDependencyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DefaultDependencyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultDependencyAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class DefaultDependencyAttribute : Attribute
```

Provides a hint to the common language runtime (CLR) indicating how likely a dependency is to be loaded. This class is used in a dependent assembly to indicate what hint should be used when the parent does not specify the `DependencyAttribute` attribute.  This class cannot be inherited.

#### Remarks
This attribute is used by the Ngen.exe (Native Image Generator) to generate native assembly images.

Apply the `DefaultDependencyAttribute` attribute to a dependent assembly to determine the preferred default binding.

A dependency that is likely to be loaded (`Always`) will cause Ngen.exe to bind to that dependency.  Using this hint allows Ngen.exe to generate code that will result in a reduced working set and improved throughput but at the cost of always loading the dependency when the parent assembly is loaded.

When you apply the `DependencyAttribute` attribute to an assembly with a value of `Default`, the native image generation service consults the dependent assembly for its preferred default binding, which is specified by the `DefaultDependencyAttribute` attribute.

#### Examples
The following code example demonstrates how to apply the `DefaultDependencyAttribute` attribute to an assembly to specify that the dependency is likely to be loaded.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/DefaultDependencyAttribute/Overview/example.cs._

## DefaultDependencyAttribute.DefaultDependencyAttribute(LoadHint) constructor

```csharp
public DefaultDependencyAttribute (System.Runtime.CompilerServices.LoadHint loadHintArgument);
```

Initializes a new instance of the `DefaultDependencyAttribute` class with the specified `LoadHint` binding.

Parameters:

- `loadHintArgument`: One of the `LoadHint` values that indicates the default binding preference.

#### Examples
The following code example demonstrates how to apply the `DefaultDependencyAttribute` attribute to an assembly to specify that the dependency is likely to be loaded.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/DefaultDependencyAttribute/Overview/example.cs._

## DefaultDependencyAttribute.LoadHint property

```csharp
public System.Runtime.CompilerServices.LoadHint LoadHint { get; }
```

Gets the `LoadHint` value that indicates when an assembly loads a dependency.

Returns: One of the `LoadHint` values.

#### Remarks
Use this property to return the value of the `LoadHint` enumeration used by the `DefaultDependencyAttribute` attribute.
