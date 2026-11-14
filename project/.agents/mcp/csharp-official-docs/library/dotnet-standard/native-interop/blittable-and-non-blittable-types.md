---
title: "Blittable and Non-Blittable Types"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/blittable-and-non-blittable-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Blittable and Non-Blittable Types

Most data types have a common representation in both managed and unmanaged memory and don't require special handling by the interop marshaller. These types are called *blittable types* because they don't require conversion when they're passed between managed and unmanaged code.

 Structures that are returned from platform invoke calls must be blittable types. Platform invoke doesn't support nonblittable structures as return types.

 The following types from the `System` namespace are blittable types:

- `System.Byte`
- `System.SByte`
- `System.Int16`
- `System.UInt16`
- `System.Int32`
- `System.UInt32`
- `System.Int64`
- `System.UInt64`
- `System.IntPtr`
- `System.UIntPtr`
- `System.Single`
- `System.Double`

The following complex types are also blittable types:

- One-dimensional arrays of blittable primitive types, such as an array of integers. However, a type that contains a variable array of blittable types is not itself blittable.
- Formatted value types that contain only blittable types (and classes if they're marshalled as formatted types). For more information about formatted value types, see Default marshalling for value types.

 Object references aren't blittable. In addition, an array of references to objects that are blittable by themselves isn't blittable. For example, you can define a structure that's blittable, but you can't define a blittable type that contains an array of references to those structures.

 As an optimization, arrays of blittable primitive types and classes that contain only blittable members are pinned instead of copied during marshalling. These types can appear to be marshalled as In/Out parameters when the caller and callee are in the same apartment. However, these types are actually marshalled as In parameters, and you must apply the `System.Runtime.InteropServices.InAttribute` and `System.Runtime.InteropServices.OutAttribute` attributes if you want to marshal the argument as an In/Out parameter.

 Some managed data types require a different representation in an unmanaged environment. These nonblittable data types must be converted into a form that can be marshalled. For example, managed strings are nonblittable types because they must be converted into string objects before they can be marshalled.

 The following table lists nonblittable types from the `System` namespace. Delegates, which are data structures that refer to a static method or to a class instance, are also nonblittable.

| Nonblittable type                                | Description                                   |
|---------------------------------------------------|-----------------------------------------------|
| System.Array | Converts to a C-style array or a `SAFEARRAY`. |
| System.Boolean | Converts to a 1, 2, or 4-byte value with `true` as 1 or -1. |
| System.Char | Converts to a Unicode or ANSI character. |
| System.Class | Converts to a class interface. |
| System.Object | Converts to a variant or an interface. |
| System.String | Converts to a string terminating in a null reference or to a BSTR. |
| System.ValueType | Converts to a structure with a fixed memory layout. |
| T[]          | Converts to a C-style array or a `SAFEARRAY`. |

Class and object types are supported only by COM interop.

## See also

- Default Marshalling Behavior
