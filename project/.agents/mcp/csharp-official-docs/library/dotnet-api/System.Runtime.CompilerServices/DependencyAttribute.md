---
title: "DependencyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DependencyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DependencyAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class DependencyAttribute : Attribute
```

Indicates when a dependency is to be loaded by the referring assembly. This class cannot be inherited.

#### Remarks
This attribute is used by the Ngen.exe (Native Image Generator) to generate native assembly images.

Apply the `DependencyAttribute` attribute to a dependent assembly with a value of the `LoadHint` enumeration to specify when a referring assembly is to load a dependency.

A dependency that is likely to be loaded (`Always`) will cause Ngen.exe to bind to that dependency.  Using this hint allows Ngen.exe to generate code that will result in a reduced working set and improved throughput  but at the cost of always loading the dependency when the parent assembly is loaded.

#### Examples
The following example specifies that the native image generation service always binds to `AssemblyA` and sometimes binds to `AssemblyB`.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/DependencyAttribute/Overview/example.cs._

## DependencyAttribute.DependencyAttribute(String, LoadHint) constructor

```csharp
public DependencyAttribute (string dependentAssemblyArgument, System.Runtime.CompilerServices.LoadHint loadHintArgument);
```

Initializes a new instance of the `DependencyAttribute` class with the specified `LoadHint` value.

Parameters:

- `dependentAssemblyArgument`: The dependent assembly to bind to.
- `loadHintArgument`: One of the `LoadHint` values.

#### Remarks
The `DependencyAttribute` attribute gives the common language runtime hints on how tightly to bind to the dependency. The runtime uses these hints to help settle tradeoffs between lazy dependency load and efficient binding to the dependency. For example, hard binding allows the runtime to encode pointers to dependent native images, which results in a reduced working set. This attribute guides the runtime in making these decisions.

#### Examples
The following example specifies that the native image generation service always binds to `AssemblyA` and sometimes binds to `AssemblyB`.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/DependencyAttribute/Overview/example.cs._

## DependencyAttribute.DependentAssembly property

```csharp
public string DependentAssembly { get; }
```

Gets the value of the dependent assembly.

Returns: The name of the dependent assembly.

#### Remarks
Use this property to return the name of the assembly that the native image generation service binds to.

## DependencyAttribute.LoadHint property

```csharp
public System.Runtime.CompilerServices.LoadHint LoadHint { get; }
```

Gets the `LoadHint` value that indicates when an assembly is to load a dependency.

Returns: One of the `LoadHint` values.

#### Remarks
Use this property to return the value of the `LoadHint` enumeration used by the `DependencyAttribute` attribute.
