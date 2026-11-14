---
title: "MethodCodeType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/MethodCodeType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodCodeType enum

Namespace: `System.Runtime.CompilerServices`

```csharp
public enum MethodCodeType
```

Defines how a method is implemented.

#### Remarks
Used with `MethodImplAttribute`.

The classes in System.Runtime.CompilerServices are for compiler writers use only.

## MethodCodeType.IL field

```csharp
IL
```

Specifies that the method implementation is in Microsoft intermediate language (MSIL).

## MethodCodeType.Native field

```csharp
Native
```

Specifies that the method is implemented in native code.

## MethodCodeType.OPTIL field

```csharp
OPTIL
```

Specifies that the method implementation is in optimized intermediate language (OPTIL).

## MethodCodeType.Runtime field

```csharp
Runtime
```

Specifies that the method implementation is provided by the runtime.
