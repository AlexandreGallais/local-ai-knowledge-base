---
title: "UnmanagedFunctionPointerAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/UnmanagedFunctionPointerAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedFunctionPointerAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class UnmanagedFunctionPointerAttribute : Attribute
```

Controls the marshaling behavior of a delegate signature passed as an unmanaged function pointer to or from unmanaged code. This class cannot be inherited.

#### Remarks
The fields of the `UnmanagedFunctionPointerAttribute` attribute control various aspects of the transition of a delegate to an unmanaged function pointer, and are the same as the fields with identical names in the `DllImportAttribute` attribute. These fields are optional.

For more information about using attributes, see Attributes.

## UnmanagedFunctionPointerAttribute.UnmanagedFunctionPointerAttribute(CallingConvention) constructor

```csharp
public UnmanagedFunctionPointerAttribute (System.Runtime.InteropServices.CallingConvention callingConvention);
```

Initializes a new instance of the `UnmanagedFunctionPointerAttribute` class with the specified calling convention.

Parameters:

- `callingConvention`: The specified calling convention.

#### Remarks
This method specifies the calling convention for the delegate in unmanaged code and is the most common use of the `UnmanagedFunctionPointerAttribute` attribute. You can set the `callingConvention` parameter to one of the values in the `CallingConvention` enumeration.

## UnmanagedFunctionPointerAttribute.CallingConvention property

```csharp
public System.Runtime.InteropServices.CallingConvention CallingConvention { get; }
```

Gets the value of the calling convention.

Returns: The value of the calling convention specified by the `UnmanagedFunctionPointerAttribute.#ctor` constructor.

To be added.

## UnmanagedFunctionPointerAttribute.BestFitMapping field

```csharp
public bool BestFitMapping;
```

Enables or disables best-fit mapping behavior when converting Unicode characters to ANSI characters.

#### Remarks
The `BestFitMapping` field is `true` by default, which means that best-fit mapping behavior is enabled. If the field is `false`, best-fit mapping is disabled. Settings for this field override any level settings for the `BestFitMappingAttribute` attribute.

For more information, see `BestFitMapping`.

## UnmanagedFunctionPointerAttribute.CharSet field

```csharp
public System.Runtime.InteropServices.CharSet CharSet;
```

Indicates how to marshal string parameters to the method, and controls name mangling.

#### Remarks
Use this field with a member of the `CharSet` enumeration to specify the marshaling behavior of string parameters and to specify which entry-point name to invoke (the exact name given or a name ending with "A" or "W").

For more information, see `CharSet`.

## UnmanagedFunctionPointerAttribute.SetLastError field

```csharp
public bool SetLastError;
```

Indicates whether the callee calls the `SetLastError` Windows API function before returning from the attributed method.

#### Remarks
The `SetLastError` field is `false` by default, which means the caller calls `SetLastError`. Set this field to `true` to indicate that the callee calls `SetLastError` before returning from the attributed method.

For more information, see `SetLastError`.

## UnmanagedFunctionPointerAttribute.ThrowOnUnmappableChar field

```csharp
public bool ThrowOnUnmappableChar;
```

Enables or disables the throwing of an exception on an unmappable Unicode character that is converted to an ANSI "?" character.

#### Remarks
The `ThrowOnUnmappableChar` field is `false` by default, which means that the field is disabled. Set this field to `true` to indicate that an exception is thrown each time the interop marshaler converts an unmappable character.

For more information, see `ThrowOnUnmappableChar`.
