---
title: "NonEventAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/NonEventAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NonEventAttribute class

Namespace: `System.Diagnostics.Tracing`

```csharp
public sealed class NonEventAttribute : Attribute
```

Identifies a method that is not generating an event.

#### Remarks
By default, all instance methods in a class that subclasses `code:EventSource` and that return `void` are assumed to be methods that generate an event. This default can be overridden by applying the `NonEventAttribute` attribute.

## NonEventAttribute.NonEventAttribute() constructor

```csharp
public NonEventAttribute ();
```

Creates a new instance of the `NonEventAttribute` class.

To be added.
