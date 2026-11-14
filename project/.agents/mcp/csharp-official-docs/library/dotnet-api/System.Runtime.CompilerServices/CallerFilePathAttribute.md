---
title: "CallerFilePathAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CallerFilePathAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallerFilePathAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class CallerFilePathAttribute : Attribute
```

Tags parameter that should be filled with specific caller source file path.

#### Remarks
You apply the `CallerFilePath` attribute to an optional parameter that has a default value. You must specify an explicit default value for the optional parameter. You can't apply this attribute to parameters that aren't specified as optional.

#### Examples
The following example shows how to use the `CallerFilePath` attribute. On each call to the `TraceMessage` method, the caller information is substituted as an argument to the optional parameter.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/CallerFilePathAttribute/callerinfo.cs._

## CallerFilePathAttribute.CallerFilePathAttribute() constructor

```csharp
public CallerFilePathAttribute ();
```

Initializes a new instance of the `CallerFilePathAttribute` class.

To be added.
