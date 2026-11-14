---
title: "Custom marshalling source generation (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/custom-marshalling-source-generation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Source generation for custom marshalling

.NET 7 introduces a new mechanism for customization of how a type is marshalled when using source-generated interop. The source generator for P/Invokes recognizes `System.Runtime.InteropServices.Marshalling.MarshalUsingAttribute` and `System.Runtime.InteropServices.Marshalling.NativeMarshallingAttribute` as indicators for custom marshalling of a type.

`System.Runtime.InteropServices.Marshalling.NativeMarshallingAttribute` can be applied to a type to indicate the default custom marshalling for that type. The `System.Runtime.InteropServices.Marshalling.MarshalUsingAttribute` can be applied to a parameter or return value to indicate the custom marshalling for that particular usage of the type, taking precedence over any `System.Runtime.InteropServices.Marshalling.NativeMarshallingAttribute` that may be on the type itself. Both of these attributes expect a `System.Type`—the entry-point marshaller type—that's marked with one or more `System.Runtime.InteropServices.Marshalling.CustomMarshallerAttribute` attributes. Each `System.Runtime.InteropServices.Marshalling.CustomMarshallerAttribute` indicates which marshaller implementation should be used to marshal the specified managed type for the specified `System.Runtime.InteropServices.Marshalling.MarshalMode`.

## Marshaller implementation

Custom marshaller implementations can either be stateless or stateful. If the marshaller type is a `static` class, it's considered stateless, and the implementation methods shouldn't track state across calls. If it's a value type, it's considered stateful, and one instance of that marshaller will be used to marshal a specific parameter or return value. Using a unique instance allows for state to be preserved across the marshalling and unmarshalling process.

## Marshaller shapes

The set of methods that the marshalling generator expects from a custom marshaller type is referred to as the *marshaller shape*. To support stateless, static custom marshaller types in .NET Standard 2.0 (which doesn't support static interface methods), and improve performance, interface types are not used to define and implement the marshaller shapes. Instead, the shapes are documented in the Custom marshaller shapes article. The expected methods (or shape) depends on whether the marshaller is stateless or stateful, and whether it supports marshalling from managed to unmanaged, unmanaged to managed, or both (declared with `CustomMarshallerAttribute.MarshalMode`). The .NET SDK includes analyzers and code fixers to help with implementing marshallers that conform to the required shapes.

### `MarshalMode`

The `System.Runtime.InteropServices.Marshalling.MarshalMode` specified in a `System.Runtime.InteropServices.Marshalling.CustomMarshallerAttribute` determines the expected marshalling support and shape for the marshaller implementation. All modes support stateless marshaller implementations. Element marshalling modes do not support stateful marshaller implementations.

| `MarshalMode` | Expected support | Applies to | Can be stateful |
| --- | --- | --- | --- |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.ManagedToUnmanagedIn` | Managed to unmanaged | By-value and `in` parameters in P/Invoke | Yes |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.ManagedToUnmanagedRef` | Managed to unmanaged and unmanaged to managed | `ref` parameters in P/Invoke | Yes |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.ManagedToUnmanagedOut` | Unmanaged to managed | `out` parameters and **return values** in P/Invoke | Yes |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.UnmanagedToManagedIn` | Unmanaged to managed | By-value and `in` parameters in Reverse P/Invoke | Yes |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.UnmanagedToManagedRef` | Managed to unmanaged and unmanaged to managed | `ref` parameters in Reverse P/Invoke | Yes |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.UnmanagedToManagedOut` | Managed to unmanaged | `out` parameters and **return values** in Reverse P/Invoke | Yes |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.ElementIn` | Managed to unmanaged | Elements of collections passed with `in` or by-value | No |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.ElementRef` | Managed to unmanaged and unmanaged to managed | Elements of collections passed with `ref` | No |
| `System.Runtime.InteropServices.Marshalling.MarshalMode.ElementOut` | Unmanaged to managed | Elements of collections passed with `out` | No |

> **Note:**
> The member names follow the pattern `{CallDirection}{DataFlow}`:
>
> - **Call direction** (`ManagedToUnmanaged` or `UnmanagedToManaged`) indicates which side initiates the call. `ManagedToUnmanaged` means managed code calling unmanaged code (P/Invoke). `UnmanagedToManaged` means unmanaged code calling managed code (Reverse P/Invoke, COM).
> - **Data flow** (`In`, `Out`, or `Ref`) indicates how data moves relative to the call. `In` means data flows from the caller to the callee. `Out` means data flows from the callee back to the caller—this includes both `out` parameters and return values. `Ref` means data flows in both directions.
>
> For example, `ManagedToUnmanagedOut` is used for `out` parameters and return values when managed code calls unmanaged code. Even though the name starts with "ManagedToUnmanaged", the marshaller for this mode converts *from* the unmanaged representation *to* the managed representation, because the data flows back to the managed caller.

Use `System.Runtime.InteropServices.Marshalling.MarshalMode.Default` to indicate that the marshaller implementation applies to any supported mode, based on the methods it implements. If you specify a marshaller for a more specific `MarshalMode`, that marshaller takes precedence over one marked as `Default`.
