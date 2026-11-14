---
title: "PreserveSigAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/PreserveSigAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PreserveSigAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class PreserveSigAttribute : Attribute
```

Indicates that the HRESULT signature transformation that takes place during COM interop calls should be suppressed.

#### Remarks
You can apply this attribute to methods.

By default, the Tlbexp.exe (Type Library Exporter) ensures that a call that returns an HRESULT of S_OK is transformed such that the [out, retval] parameter is used as the function return value. The S_OK HRESULT is discarded. For HRESULTs other than S_OK, the runtime throws an exception and discards the [out, retval] parameter. When you apply the `PreserveSigAttribute` to a managed method signature, the managed and unmanaged signatures of the attributed method are identical.

Preserving the original method signature is necessary if the member returns more than one success HRESULT value and you want to detect the different values. Since most COM member return an HRESULT, by applying the `PreserveSigAttribute`, you can retrieve an integer representing the success or failure HRESULT. Tlbexp.exe preserves any [out, retval] parameters as out parameters in the managed signature.

The Tlbimp.exe (Type Library Importer) also applies this attribute; it applies the attribute to dispinterfaces when it imports a type library.

> **Note:**
>  Return types of `Currency`, `Guid`, and `Object` are not supported by the `PreserveSigAttribute` class when interoperation occurs from COM to managed code and the managed code is marked with the `PreserveSigAttribute` class.  When you attempt to use one of these return types with the `PreserveSigAttribute` class during these conditions, a `TypeLoadException` is thrown.

#### Examples
The following example shows how Tlbexp.exe converts a C# method without `PreserveSigAttribute` when exporting an assembly to a COM type library.

Managed signature:

```
int DoSomething (long l);  
```  

Unmanaged signature:

```
HRESULT DoSomething ([in] long l, [out, retval] int * i);  
```  

When you apply `PreserveSigAttribute` to the same C# method and export the assembly, the method conversion differs from the previous example. Notice that Tlbexp.exe removes the HRESULT and the [out, retval] parameter modifier.

Managed signature:

```
[PreserveSig] int DoSomething (long l);  
```  

Unmanaged signature:

```
int DoSomething ([in] long l);  
```

## PreserveSigAttribute.PreserveSigAttribute() constructor

```csharp
public PreserveSigAttribute ();
```

Initializes a new instance of the `PreserveSigAttribute` class.

To be added.
