---
title: "NotNullIfNotNullAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/NotNullIfNotNullAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotNullIfNotNullAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class NotNullIfNotNullAttribute : Attribute
```

Specifies that the output will be non-null if the named parameter is non-null.

For more information, see Nullable static analysis in the C# guide.

## NotNullIfNotNullAttribute.NotNullIfNotNullAttribute(String) constructor

```csharp
public NotNullIfNotNullAttribute (string parameterName);
```

Initializes the attribute with the associated parameter name.

Parameters:

- `parameterName`: The associated parameter name.  The output will be non-null if the argument to the parameter specified is non-null.

To be added.

## NotNullIfNotNullAttribute.ParameterName property

```csharp
public string ParameterName { get; }
```

Gets the associated parameter name.

Returns: The associated parameter name. The output will be non-null if the argument to the parameter specified is non-null.

To be added.
