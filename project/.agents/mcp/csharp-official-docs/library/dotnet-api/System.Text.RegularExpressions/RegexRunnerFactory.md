---
title: "RegexRunnerFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/RegexRunnerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegexRunnerFactory class

Namespace: `System.Text.RegularExpressions`

```csharp
public abstract class RegexRunnerFactory
```

Creates a `RegexRunner` for a `Regex`.

#### Remarks
A `RegexRunner` object executes a compiled regular expression. A regular expression that is compiled to an assembly becomes a type in that assembly, and an object of that type is typically created using reflection. However, creating an object by reflection is an expensive operation. The `RegexRunnerFactory` class improves the performance of the .NET Framework by providing the `RegexRunnerFactory.CreateInstance` method, which creates a `RegexRunner` object for a specific compiled regular expression.

## RegexRunnerFactory.RegexRunnerFactory() constructor

```csharp
protected RegexRunnerFactory ();
```

Initializes a new instance of the `RegexRunnerFactory` class.

To be added.

## RegexRunnerFactory.CreateInstance() method

```csharp
protected internal abstract System.Text.RegularExpressions.RegexRunner CreateInstance ();
```

Creates a `RegexRunner` instance for the `Regex`.

Returns: A `RegexRunner` instance.

To be added.
