---
title: "MethodImplAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/MethodImplAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodImplAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class MethodImplAttribute : Attribute
```

Specifies the details of how a method is implemented. This class cannot be inherited.

#### Remarks
You can apply this attribute to methods or constructors.

This attribute lets you customize the configuration of the method or constructor to which it applies by supplying a `MethodImplOptions` value to its class constructor. The members of the `MethodImplOptions` enumeration correspond to bit fields in the `CorMethodImpl` metadata table. This means that information on the attribute cannot be retrieved at run time by calling the `MemberInfo.GetCustomAttributes` method; instead, it is retrieved by calling either the `MethodInfo.GetMethodImplementationFlags` or the `ConstructorInfo.GetMethodImplementationFlags` method.

#### Examples
The following example applies the `MethodImplAttribute` to the `GetCalendarName` method to ensure that it is not inlined at run time by the just-in-time (JIT) compiler.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/MethodImplAttribute/Overview/methodimplattribute1.cs._

The following example then calls the `MethodInfo.GetMethodImplementationFlags` method to determine which flags are set for the `GetCalendarName` method. It also demonstrates that this information is not retrieved by the `MemberInfo.GetCustomAttributes` method.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/MethodImplAttribute/Overview/getmethodimplattribute1.cs._

## MethodImplAttribute.MethodImplAttribute() constructor

```csharp
public MethodImplAttribute ();
```

Initializes a new instance of the `MethodImplAttribute` class.

To be added.

## MethodImplAttribute.MethodImplAttribute(Int16) constructor

```csharp
public MethodImplAttribute (short value);
```

Initializes a new instance of the `MethodImplAttribute` class with the specified `MethodImplOptions` value.

Parameters:

- `value`: A bitmask representing the desired `MethodImplOptions` value, which specifies properties of the attributed method.

To be added.

## MethodImplAttribute.MethodImplAttribute(MethodImplOptions) constructor

```csharp
public MethodImplAttribute (System.Runtime.CompilerServices.MethodImplOptions methodImplOptions);
```

Initializes a new instance of the `MethodImplAttribute` class with the specified `MethodImplOptions` value.

Parameters:

- `methodImplOptions`: A `MethodImplOptions` value specifying properties of the attributed method.

#### Remarks
This constructor sets the `CorMethodImpl` bit fields in the metadata table. The value of these flags can be retrieved at run time by calling the `MethodInfo.GetMethodImplementationFlags` or `ConstructorInfo.GetMethodImplementationFlags` method.

## MethodImplAttribute.Value property

```csharp
public System.Runtime.CompilerServices.MethodImplOptions Value { get; }
```

Gets the `MethodImplOptions` value describing the attributed method.

Returns: The `MethodImplOptions` value describing the attributed method.

To be added.

## MethodImplAttribute.MethodCodeType field

```csharp
public System.Runtime.CompilerServices.MethodCodeType MethodCodeType;
```

A `MethodCodeType` value indicating what kind of implementation is provided for this method.

To be added.
