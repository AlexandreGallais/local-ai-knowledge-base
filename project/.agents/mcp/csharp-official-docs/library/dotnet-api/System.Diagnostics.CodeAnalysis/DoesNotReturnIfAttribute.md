---
title: "DoesNotReturnIfAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/DoesNotReturnIfAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DoesNotReturnIfAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class DoesNotReturnIfAttribute : Attribute
```

Specifies that the method will not return if the associated `Boolean` parameter is passed the specified value.

For more information, see Nullable static analysis in the C# guide.

## DoesNotReturnIfAttribute.DoesNotReturnIfAttribute(Boolean) constructor

```csharp
public DoesNotReturnIfAttribute (bool parameterValue);
```

Initializes a new instance of the `DoesNotReturnIfAttribute` class with the specified parameter value.

Parameters:

- `parameterValue`: The condition parameter value. Code after the method is considered unreachable by diagnostics if the argument to the associated parameter matches this value.

To be added.

## DoesNotReturnIfAttribute.ParameterValue property

```csharp
public bool ParameterValue { get; }
```

Gets the condition parameter value.

Returns: The condition parameter value. Code after the method is considered unreachable by diagnostics if the argument to the associated parameter matches this value.

To be added.
