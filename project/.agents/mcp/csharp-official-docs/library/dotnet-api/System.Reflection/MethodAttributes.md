---
title: "MethodAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodAttributes enum

Namespace: `System.Reflection`

```csharp
public enum MethodAttributes
```

Specifies flags for method attributes. These flags are defined in the corhdr.h file.

#### Examples
The following example displays the attributes of the specified method.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodAttributes/Overview/source.cs._

## MethodAttributes.Abstract field

```csharp
Abstract
```

Indicates that the class does not provide an implementation of this method.

## MethodAttributes.Assembly field

```csharp
Assembly
```

Indicates that the method is accessible to any class of this assembly.

## MethodAttributes.CheckAccessOnOverride field

```csharp
CheckAccessOnOverride
```

Indicates that the method can only be overridden when it is also accessible.

## MethodAttributes.FamANDAssem field

```csharp
FamANDAssem
```

Indicates that the method is accessible to members of this type and its derived types that are in this assembly only.

## MethodAttributes.Family field

```csharp
Family
```

Indicates that the method is accessible only to members of this class and its derived classes.

## MethodAttributes.FamORAssem field

```csharp
FamORAssem
```

Indicates that the method is accessible to derived classes anywhere, as well as to any class in the assembly.

## MethodAttributes.Final field

```csharp
Final
```

Indicates that the method cannot be overridden.

## MethodAttributes.HasSecurity field

```csharp
HasSecurity
```

Indicates that the method has security associated with it. Reserved flag for runtime use only.

## MethodAttributes.HideBySig field

```csharp
HideBySig
```

Indicates that the method hides by name and signature; otherwise, by name only.

## MethodAttributes.MemberAccessMask field

```csharp
MemberAccessMask
```

Retrieves accessibility information.

## MethodAttributes.NewSlot field

```csharp
NewSlot
```

Indicates that the method always gets a new slot in the vtable.

## MethodAttributes.PinvokeImpl field

```csharp
PinvokeImpl
```

Indicates that the method implementation is forwarded through PInvoke (Platform Invocation Services).

## MethodAttributes.Private field

```csharp
Private
```

Indicates that the method is accessible only to the current class.

## MethodAttributes.PrivateScope field

```csharp
PrivateScope
```

Indicates that the member cannot be referenced.

## MethodAttributes.Public field

```csharp
Public
```

Indicates that the method is accessible to any object for which this object is in scope.

## MethodAttributes.RequireSecObject field

```csharp
RequireSecObject
```

Indicates that the method calls another method containing security code. Reserved flag for runtime use only.

## MethodAttributes.ReservedMask field

```csharp
ReservedMask
```

Indicates a reserved flag for runtime use only.

## MethodAttributes.ReuseSlot field

```csharp
ReuseSlot
```

Indicates that the method will reuse an existing slot in the vtable. This is the default behavior.

## MethodAttributes.RTSpecialName field

```csharp
RTSpecialName
```

Indicates that the common language runtime checks the name encoding.

## MethodAttributes.SpecialName field

```csharp
SpecialName
```

Indicates that the method is special. The name describes how this method is special.

## MethodAttributes.Static field

```csharp
Static
```

Indicates that the method is defined on the type; otherwise, it is defined per instance.

## MethodAttributes.UnmanagedExport field

```csharp
UnmanagedExport
```

Indicates that the managed method is exported by thunk to unmanaged code.

## MethodAttributes.Virtual field

```csharp
Virtual
```

Indicates that the method is virtual.

## MethodAttributes.VtableLayoutMask field

```csharp
VtableLayoutMask
```

Retrieves vtable attributes.
