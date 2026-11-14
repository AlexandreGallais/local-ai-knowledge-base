---
title: "ParameterAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ParameterAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParameterAttributes enum

Namespace: `System.Reflection`

```csharp
public enum ParameterAttributes
```

Defines the attributes that can be associated with a parameter. These are defined in CorHdr.h.

#### Remarks
To get the `ParameterAttributes` value, first get the `Type`. From the `Type`, get the `ParameterInfo` array. The `ParameterAttributes` value is within the array.

These enumerator values are dependent on optional metadata. Not all attributes are available from all compilers. See the appropriate compiler instructions to determine which enumerated values are available.

#### Examples
The following example displays the attributes of the specified parameter.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterAttributes/Overview/source.cs._

## ParameterAttributes.HasDefault field

```csharp
HasDefault
```

Specifies that the parameter has a default value.

## ParameterAttributes.HasFieldMarshal field

```csharp
HasFieldMarshal
```

Specifies that the parameter has field marshaling information.

## ParameterAttributes.In field

```csharp
In
```

Specifies that the parameter is an input parameter.

## ParameterAttributes.Lcid field

```csharp
Lcid
```

Specifies that the parameter is a locale identifier (lcid).

## ParameterAttributes.None field

```csharp
None
```

Specifies that there is no parameter attribute.

## ParameterAttributes.Optional field

```csharp
Optional
```

Specifies that the parameter is optional.

## ParameterAttributes.Out field

```csharp
Out
```

Specifies that the parameter is an output parameter.

## ParameterAttributes.Reserved3 field

```csharp
Reserved3
```

Reserved.

## ParameterAttributes.Reserved4 field

```csharp
Reserved4
```

Reserved.

## ParameterAttributes.ReservedMask field

```csharp
ReservedMask
```

Specifies that the parameter is reserved.

## ParameterAttributes.Retval field

```csharp
Retval
```

Specifies that the parameter is a return value.
