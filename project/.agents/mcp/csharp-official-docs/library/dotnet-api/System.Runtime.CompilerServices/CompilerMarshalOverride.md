---
title: "CompilerMarshalOverride class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CompilerMarshalOverride.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompilerMarshalOverride class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class CompilerMarshalOverride
```

Indicates that the modified instance of a variable differs from its true type when marshaling. This class cannot be inherited.

#### Remarks
The `CompilerMarshalOverride` class allows the common language runtime to marshal using the correct sizes.

Some behaviors of the common language runtime are incompatible with some languages. For example, C++ treats Boolean variables as single-byte values, while the common language runtime marshals them as four-byte values to match the `BOOLEAN` type defined by the Microsoft Windows API.  To work around such issues, the C++ compiler emits this modifier on any `wchar_t` or `bool` parameter or function return.
