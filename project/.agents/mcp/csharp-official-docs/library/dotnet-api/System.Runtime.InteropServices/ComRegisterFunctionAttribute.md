---
title: "ComRegisterFunctionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComRegisterFunctionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComRegisterFunctionAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComRegisterFunctionAttribute : Attribute
```

Specifies the method to call when you register an assembly for use from COM; this enables the execution of user-written code during the registration process.

#### Remarks
You can apply this attribute to methods.

`ComRegisterFunctionAttribute` enables you to add arbitrary registration code to accommodate the requirements of COM clients. For example, you can update the registry using registration functions from the `Win32` namespace. If you provide a registration method, you should also apply `ComUnregisterFunctionAttribute` to an unregistration method, which reverses the operations done in the registration method.

The common language runtime calls the method with this attribute when its containing assembly's COM host is registered via the RegSvr32.exe tool.

This attribute can be applied only to methods that have the following characteristics:

- Scope: Any (public, private, and so on).
- Type: `static`.
- Parameters: Accepts a single `Type` parameter or a `String` parameter type.
- Return type: `void`.

#### Examples
The following example demonstrates how to apply `ComRegisterFunctionAttribute` and `ComUnregisterFunctionAttribute` to methods with the appropriate signature.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComRegisterFunctionAttribute/Overview/source.cs._

## ComRegisterFunctionAttribute.ComRegisterFunctionAttribute() constructor

```csharp
public ComRegisterFunctionAttribute ();
```

Initializes a new instance of the `ComRegisterFunctionAttribute` class.

To be added.
