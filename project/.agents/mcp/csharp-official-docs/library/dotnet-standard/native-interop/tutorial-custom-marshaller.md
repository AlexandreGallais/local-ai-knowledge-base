---
title: "Use custom marshallers in source-generated P/Invokes (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/tutorial-custom-marshaller.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Use custom marshallers in source-generated P/Invokes

In this tutorial, you'll learn how to implement a marshaller and use it for custom marshalling in source-generated P/Invokes.

You'll implement marshallers for a built-in type, customize marshalling for a specific parameter and a user-defined type, and specify default marshalling for a user-defined type.

All source code used in this tutorial is available in the dotnet/samples repository.

## Overview of the `LibraryImport` source generator

The `System.Runtime.InteropServices.LibraryImportAttribute` type is the user entry point for a source generator introduced in .NET 7. This source generator is designed to generate all marshalling code at compile time instead of at runtime. Entry points have historically been specified using `DllImport`, but that approach comes with costs that may not always be acceptable—for more information, see P/Invoke source generation. The `LibraryImport` source generator can generate all marshalling code and remove the runtime generation requirement intrinsic to `DllImport`.

To express the details needed to generated marshalling code both for the runtime and for users to customize for their own types, several types are needed. The following types are used throughout this tutorial:

- `MarshalUsingAttribute` – Attribute that's sought by the source generator at use sites and used to determine the marshaller type for marshalling the attributed variable.

- `CustomMarshallerAttribute` – Attribute used to indicate a marshaller for a type and the mode in which the marshalling operations are to be performed (for example, by-ref from managed to unmanaged).

- `NativeMarshallingAttribute` – Attribute used to indicate which marshaller to use for the attributed type. This is useful for library authors that provide types and accompanying marshallers for those types.

These attributes, however, aren't the only mechanisms available to a custom marshaller author. The source generator inspects the marshaller itself for various other indications that inform how marshalling should occur.

Complete details on the design can be found in the dotnet/runtime repository.

### Source generator analyzer and fixer

Along with the source generator itself, an analyzer and fixer are both provided. The analyzer and fixer are enabled and available by default since .NET 7 RC1. The analyzer is designed to help guide developers to use the source generator properly. The fixer provides automated conversions from many `DllImport` patterns into the appropriate `LibraryImport` signature.

## Introducing the native library

Using the `LibraryImport` source generator would mean consuming a native, or unmanaged, library. A native library might be a shared library (that is, `.dll`, `.so`, or `dylib`) that directly calls an operating system API that's not exposed through .NET. The library might also be one that is heavily optimized in an unmanaged language that a .NET developer wants to consume. For this tutorial, you'll build your own shared library that exposes a C-style API surface. The following code represents a user-defined type and two APIs that you'll consume from C#. These two APIs represent the "in" mode, but there are additional modes to explore in the sample.

```cpp
struct error_data
{
    int code;
    bool is_fatal_error;
    char32_t* message;    /* UTF-32 encoded string */
};

extern "C" DLL_EXPORT void STDMETHODCALLTYPE PrintString(char32_t* chars);

extern "C" DLL_EXPORT void STDMETHODCALLTYPE PrintErrorData(error_data data);
```

The preceding code contains the two types of interest, `char32_t*` and `error_data`. `char32_t*` represents a string that's encoded in UTF-32, which isn't a string encoding that .NET historically marshals. `error_data` is a user-defined type that contains a 32-bit integer field, a C++ Boolean field, and a UTF-32 encoded string field. Both of these types require you to provide a way for the source generator to generate marshalling code.

## Customize marshalling for a built-in type

Consider the `char32_t*` type first, since marshalling this type is required by the user-defined type. `char32_t*` represents the native side, but you also need representation in managed code. In .NET, there's only one "string" type, `string`. Therefore, you'll be marshalling a native UTF-32 encoded string to and from the `string` type in managed code. There are already several built-in marshallers for the `string` type that marshal as UTF-8, UTF-16, ANSI, and even as the Windows `BSTR` type. However, there isn't one for marshalling as UTF-32. That's what you need to define.

The `Utf32StringMarshaller` type is marked with a `CustomMarshaller` attribute, which describes what it does to the source generator. The first type argument to the attribute is the `string` type, the managed type to marshal, the second is the mode, which indicates when to use the marshaller, and the third type is `Utf32StringMarshaller`, the type to use for marshalling. You can apply the `CustomMarshaller` multiple times to further specify the mode and which marshaller type to use for that mode.

The current example showcases a "stateless" marshaller that takes some input and returns data in the marshalled form. The `Free` method exists for symmetry with the unmanaged marshalling, and the garbage collector is the "free" operation for the managed marshaller. The implementer is free to perform whatever operations are desired to marshal the input to the output, but remember that no state will be explicitly preserved by the source generator.

```csharp
namespace CustomMarshalling
{
    [CustomMarshaller(typeof(string), MarshalMode.Default, typeof(Utf32StringMarshaller))]
    internal static unsafe class Utf32StringMarshaller
    {
        public static uint* ConvertToUnmanaged(string? managed)
            => throw new NotImplementedException();

        public static string? ConvertToManaged(uint* unmanaged)
            => throw new NotImplementedException();

        public static void Free(uint* unmanaged)
            => throw new NotImplementedException();
    }
}
```

The specifics of how this particular marshaller performs the conversion from `string` to `char32_t*` can be found in the sample. Note that any .NET APIs could be used (for example, `System.Text.Encoding.UTF32`).

Consider a case where state is desirable. Observe the additional `CustomMarshaller` and note the more specific mode, `MarshalMode.ManagedToUnmanagedIn`. This specialized marshaller is implemented as "stateful" and can store state across the interop call. More specialization and state permit optimizations and tailored marshalling for a mode. For example, the source generator can be instructed to provide a stack-allocated buffer that could avoid an explicit allocation during marshalling. To indicate support for a stack-allocated buffer, the marshaller implements a `BufferSize` property and a `FromManaged` method that takes a `Span` of an `unmanaged` type. The `BufferSize` property indicates the amount of stack space—the length of the `Span` to be passed to `FromManaged`—the marshaller would like to get during the marshal call.

```csharp
namespace CustomMarshalling
{
    [CustomMarshaller(typeof(string), MarshalMode.Default, typeof(Utf32StringMarshaller))]
    [CustomMarshaller(typeof(string), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToUnmanagedIn))]
    internal static unsafe class Utf32StringMarshaller
    {
        //
        // Stateless functions removed
        //

        public ref struct ManagedToUnmanagedIn
        {
            public static int BufferSize => 0x100;

            private uint* _unmanagedValue;
            private bool _allocated; // Used stack alloc or allocated other memory

            public void FromManaged(string? managed, Span<byte> buffer)
                => throw new NotImplementedException();

            public uint* ToUnmanaged()
                => throw new NotImplementedException();

            public void Free()
                => throw new NotImplementedException();
        }
    }
}
```

You can now call the first of the two native functions using your UTF-32 string marshallers. The following declaration uses the `LibraryImport` attribute, just like `DllImport`, but relies upon the `MarshalUsing` attribute to tell the source generator which marshaller to use when calling the native function. There's no need to clarify if the stateless or stateful marshaller should be used. This is handled by the implementer defining the `MarshalMode` on the marshaller's `CustomMarshaller` attribute(s). The source generator will select the most appropriate marshaller based on the context in which the `MarshalUsing` is applied, with `MarshalMode.Default` being the fallback.

```csharp
// extern "C" DLL_EXPORT void STDMETHODCALLTYPE PrintString(char32_t* chars);
[LibraryImport(LibName)]
internal static partial void PrintString([MarshalUsing(typeof(Utf32StringMarshaller))] string s);
```
