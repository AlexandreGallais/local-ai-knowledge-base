---
title: "EditorBrowsableState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EditorBrowsableState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EditorBrowsableState enum

Namespace: `System.ComponentModel`

```csharp
public enum EditorBrowsableState
```

Specifies the browsable state of a property or method from within an editor.

#### Remarks

This class is used by a visual designer to determine what's visible to the user. For example, the IntelliSense engine in Visual Studio never shows methods or properties that are marked as `Never`. Use `EditorBrowsableAttribute` to specify the `EditorBrowsableState` for a member.

#### Examples

For an example of using the `EditorBrowsableState` enumerator, see the sample code in `EditorBrowsableAttribute` class.

## EditorBrowsableState.Advanced field

```csharp
Advanced
```

The property or method is a feature that only advanced users should see. An editor can either show or hide such properties.

## EditorBrowsableState.Always field

```csharp
Always
```

The property or method is always browsable from within an editor.

## EditorBrowsableState.Never field

```csharp
Never
```

The property or method is never browsable from within an editor.
