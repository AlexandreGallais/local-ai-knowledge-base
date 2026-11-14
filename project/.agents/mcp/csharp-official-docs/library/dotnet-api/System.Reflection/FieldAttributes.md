---
title: "FieldAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/FieldAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FieldAttributes enum

Namespace: `System.Reflection`

```csharp
public enum FieldAttributes
```

Specifies flags that describe the attributes of a field.

#### Remarks
`FieldAttributes` uses the value from `FieldAccessMask` to mask off only the parts of the attribute value that pertain to the accessibility. For example, the following code determines if `Attributes` has the public bit set.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldAttributes/Overview/remarks.cs._

To get the `FieldAttributes`, first get the class `Type`. From the `Type`, get the `FieldInfo`. From the `FieldInfo`, get the `Attributes`.

The enumerated value is a number representing the bitwise OR of the attributes implemented on the field.

#### Examples
In this example, three fields are built and the `FieldAttributes` values are displayed. A `FieldAttributes` value can contain more than one attribute, for example, both `Public` and `Literal`, as shown in the third field.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldAttributes/Overview/source.cs._

## FieldAttributes.Assembly field

```csharp
Assembly
```

Specifies that the field is accessible throughout the assembly.

## FieldAttributes.FamANDAssem field

```csharp
FamANDAssem
```

Specifies that the field is accessible only by subtypes in this assembly.

## FieldAttributes.Family field

```csharp
Family
```

Specifies that the field is accessible only by type and subtypes.

## FieldAttributes.FamORAssem field

```csharp
FamORAssem
```

Specifies that the field is accessible by subtypes anywhere, as well as throughout this assembly.

## FieldAttributes.FieldAccessMask field

```csharp
FieldAccessMask
```

Specifies the access level of a given field.

## FieldAttributes.HasDefault field

```csharp
HasDefault
```

Specifies that the field has a default value.

## FieldAttributes.HasFieldMarshal field

```csharp
HasFieldMarshal
```

Specifies that the field has marshaling information.

## FieldAttributes.HasFieldRVA field

```csharp
HasFieldRVA
```

Specifies that the field has a relative virtual address (RVA). The RVA is the location of the method body in the current image, as an address relative to the start of the image file in which it is located.

## FieldAttributes.InitOnly field

```csharp
InitOnly
```

Specifies that the field is initialized only, and can be set only in the body of a constructor.

## FieldAttributes.Literal field

```csharp
Literal
```

Specifies that the field's value is a compile-time (static or early bound) constant. Any attempt to set it throws a `FieldAccessException`.

## FieldAttributes.NotSerialized field

```csharp
NotSerialized
```

Specifies that the field does not have to be serialized when the type is remoted.

## FieldAttributes.PinvokeImpl field

```csharp
PinvokeImpl
```

Reserved for future use.

## FieldAttributes.Private field

```csharp
Private
```

Specifies that the field is accessible only by the parent type.

## FieldAttributes.PrivateScope field

```csharp
PrivateScope
```

Specifies that the field cannot be referenced.

## FieldAttributes.Public field

```csharp
Public
```

Specifies that the field is accessible by any member for whom this scope is visible.

## FieldAttributes.ReservedMask field

```csharp
ReservedMask
```

Reserved.

## FieldAttributes.RTSpecialName field

```csharp
RTSpecialName
```

Specifies that the common language runtime (metadata internal APIs) should check the name encoding.

## FieldAttributes.SpecialName field

```csharp
SpecialName
```

Specifies a special method, with the name describing how the method is special.

## FieldAttributes.Static field

```csharp
Static
```

Specifies that the field represents the defined type, or else it is per-instance.
