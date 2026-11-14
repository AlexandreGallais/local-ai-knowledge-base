---
title: "ComUnregisterFunctionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComUnregisterFunctionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComUnregisterFunctionAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComUnregisterFunctionAttribute : Attribute
```

Specifies the method to call when you unregister an assembly for use from COM; this allows for the execution of user-written code during the unregistration process.

#### Remarks
You can apply this attribute to methods.

`ComUnregisterFunctionAttribute` enables you to add code that reverses the operations performed by a registration method. If you apply the `ComRegisterFunctionAttribute` to provide a registration method, you should also provide an unregistration method to reverse the operations done in the registration method. You can have only one unregistration method for a class.

The common language runtime calls the method with this attribute when its containing assembly's COM host is unregistered via the RegSvr32.exe tool.

#### Examples
The following example demonstrates applying `ComRegisterFunctionAttribute` and `ComUnregisterFunctionAttribute` to methods with the appropriate signature.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComRegisterFunctionAttribute/Overview/source.cs._

## ComUnregisterFunctionAttribute.ComUnregisterFunctionAttribute() constructor

```csharp
public ComUnregisterFunctionAttribute ();
```

Initializes a new instance of the `ComUnregisterFunctionAttribute` class.

To be added.
