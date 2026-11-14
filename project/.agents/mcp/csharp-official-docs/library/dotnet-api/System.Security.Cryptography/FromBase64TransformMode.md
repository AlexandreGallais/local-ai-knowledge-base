---
title: "FromBase64TransformMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/FromBase64TransformMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FromBase64TransformMode enum

Namespace: `System.Security.Cryptography`

```csharp
public enum FromBase64TransformMode
```

Specifies whether white space should be ignored in the base 64 transformation.

#### Remarks
White space includes the space character as well as tab characters, newline characters, and so on. Characters that constitute white space are those identified by the `Char.IsWhiteSpace` method.

## FromBase64TransformMode.DoNotIgnoreWhiteSpaces field

```csharp
DoNotIgnoreWhiteSpaces
```

White space should not be ignored.

## FromBase64TransformMode.IgnoreWhiteSpaces field

```csharp
IgnoreWhiteSpaces
```

White space should be ignored.
