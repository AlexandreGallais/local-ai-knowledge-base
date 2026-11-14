---
title: "Use custom marshallers in source-generated P/Invokes (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/tutorial-custom-marshaller.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use custom marshallers in source-generated P/Invokes (part 2 of 2)

## Customize marshalling for a user-defined type

Marshalling a user-defined type requires defining not only the marshalling logic, but also the type in C# to marshal to/from. Recall the native type we're trying to marshal.

```cpp
struct error_data
{
    int code;
    bool is_fatal_error;
    char32_t* message;    /* UTF-32 encoded string */
};
```

Now, define what it would ideally look like in C#. An `int` is the same size in both modern C++ and in .NET. A `bool` is the canonical example for a Boolean value in .NET. Building on top of `Utf32StringMarshaller`, you can marshal `char32_t*` as a .NET `string`. Accounting for .NET style, the result is the following definition in C#:

```csharp
struct ErrorData
{
    public int Code;
    public bool IsFatalError;
    public string? Message;
}
```

Following the naming pattern, name the marshaller `ErrorDataMarshaller`. Instead of specifying a marshaller for `MarshalMode.Default`, you'll only define marshallers for some modes. In this case, if the marshaller is used for a mode that isn't provided, the source generator will fail. Start with defining a marshaller for the "in" direction. This is a "stateless" marshaller because the marshaller itself only consists of `static` functions.

```csharp
namespace CustomMarshalling
{
    [CustomMarshaller(typeof(ErrorData), MarshalMode.ManagedToUnmanagedIn, typeof(ErrorDataMarshaller))]
    internal static unsafe class ErrorDataMarshaller
    {
        // Unmanaged representation of ErrorData.
        // Should mimic the unmanaged error_data type at a binary level.
        internal struct ErrorDataUnmanaged
        {
            public int Code;        // .NET doesn't support less than 32-bit, so int is 32-bit.
            public byte IsFatal;    // The C++ bool is defined as a single byte.
            public uint* Message;   // This could be as simple as a void*, but uint* is closer.
        }

        public static ErrorDataUnmanaged ConvertToUnmanaged(ErrorData managed)
            => throw new NotImplementedException();

        public static void Free(ErrorDataUnmanaged unmanaged)
            => throw new NotImplementedException();
    }
}
```

`ErrorDataUnmanaged` mimics the shape of the unmanaged type. The conversion from an `ErrorData` to an `ErrorDataUnmanaged` is now trivial with `Utf32StringMarshaller`.

Marshalling of an `int` is unnecessary since its representation is identical in unmanaged and managed code. A `bool` value's binary representation isn't defined in .NET, so use its current value to define a zero and non-zero value in the unmanaged type. Then, reuse your UTF-32 marshaller to convert the `string` field into a `uint*`.

```csharp
public static ErrorDataUnmanaged ConvertToUnmanaged(ErrorData managed)
{
    return new ErrorDataUnmanaged
    {
        Code = managed.Code,
        IsFatal = (byte)(managed.IsFatalError ? 1 : 0),
        Message = Utf32StringMarshaller.ConvertToUnmanaged(managed.Message),
    };
}
```

Recall that you're defining this marshaller as an "in", so you must clean up any allocations performed during the marshalling. The `int` and `bool` fields didn't allocate any memory, but the `Message` field did. Reuse `Utf32StringMarshaller` again to clean up the marshalled string.

```csharp
public static void Free(ErrorDataUnmanaged unmanaged)
    => Utf32StringMarshaller.Free(unmanaged.Message);
```

Let's briefly consider the "out" scenario. Consider the case where one or multiple instances of `error_data` are returned.

```c++
extern "C" DLL_EXPORT error_data STDMETHODCALLTYPE GetFatalErrorIfNegative(int code)

extern "C" DLL_EXPORT error_data* STDMETHODCALLTYPE GetErrors(int* codes, int len)
```

```csharp
[LibraryImport(LibName)]
internal static partial ErrorData GetFatalErrorIfNegative(int code);

[LibraryImport(LibName)]
[return: MarshalUsing(CountElementName = "len")]
internal static partial ErrorData[] GetErrors(int[] codes, int len);
```

A P/Invoke that returns a single instance type, non-collection, is categorized as a `MarshalMode.ManagedToUnmanagedOut`. Typically, you use a collection to return multiple elements, and in this case, an `Array` is used. The marshaller for a collection scenario, corresponding to the `MarshalMode.ElementOut` mode, will return multiple elements and is described later.

```csharp
namespace CustomMarshalling
{
    [CustomMarshaller(typeof(ErrorData), MarshalMode.ManagedToUnmanagedIn, typeof(ErrorDataMarshaller))]
    [CustomMarshaller(typeof(ErrorData), MarshalMode.ElementOut, typeof(Out))]
    internal static unsafe class ErrorDataMarshaller
    {
        //
        // Other marshallers removed
        //

        public static class Out
        {
            public static ErrorData ConvertToManaged(ErrorDataUnmanaged unmanaged)
                => throw new NotImplementedException();

            public static ErrorDataUnmanaged ConvertToUnmanaged(ErrorData managed)
                => throw new NotImplementedException();

            public static void Free(ErrorDataUnmanaged unmanaged)
                => throw new NotImplementedException();
        }
    }
}
```

The conversion from `ErrorDataUnmanaged` to `ErrorData` is the inverse of what you did for the "in" mode. Remember that you also need to clean up any allocations that the unmanaged environment expected you to perform. It's also important to note the functions here are marked `static` and are therefore "stateless", being stateless is a requirement for all "Element" modes. You'll also notice that there is a `ConvertToUnmanaged` method like in the "in" mode. All "Element" modes require handling for both "in" and "out" modes.

For the managed to unmanaged "out" marshaller, you're going to do something special. The name of the data type you're marshalling is called `error_data` and .NET typically expresses errors as exceptions. Some errors are more impactful than others and errors identified as "fatal" usually indicate a catastrophic or unrecoverable error. Notice the `error_data` has a field to check if the error is fatal. You'll marshal an `error_data` into managed code, and if it's fatal, you'll throw an exception rather than just converting it into an `ErrorData` and returning it.

```csharp
namespace CustomMarshalling
{
    [CustomMarshaller(typeof(ErrorData), MarshalMode.ManagedToUnmanagedIn, typeof(ErrorDataMarshaller))]
    [CustomMarshaller(typeof(ErrorData), MarshalMode.ElementOut, typeof(Out))]
    [CustomMarshaller(typeof(ErrorData), MarshalMode.ManagedToUnmanagedOut, typeof(ThrowOnFatalErrorOut))]
    internal static unsafe class ErrorDataMarshaller
    {
        //
        // Other marshallers removed
        //

        public static class ThrowOnFatalErrorOut
        {
            public static ErrorData ConvertToManaged(ErrorDataUnmanaged unmanaged)
                => throw new NotImplementedException();

            public static void Free(ErrorDataUnmanaged unmanaged)
                => throw new NotImplementedException();
        }
    }
}
```

An "out" parameter converts from an unmanaged context into a managed context, so you implement the `ConvertToManaged` method. When the unmanaged callee returns and provides an `ErrorDataUnmanaged` object, you can inspect it using your `ElementOut` mode marshaller and check if it's marked as a fatal error. If so, that's your indication to throw instead of just returning the `ErrorData`.

```csharp
public static ErrorData ConvertToManaged(ErrorDataUnmanaged unmanaged)
{
    ErrorData data = Out.ConvertToManaged(unmanaged);
    if (data.IsFatalError)
        throw new ExternalException(data.Message, data.Code);

    return data;
}
```

Perhaps you're not only going to consume the native library, but you also want to share your work with the community and provide an interop library. You can provide `ErrorData` with an implied marshaller whenever it's used in a P/Invoke by adding `[NativeMarshalling(typeof(ErrorDataMarshaller))]` to the `ErrorData` definition. Now, anyone using your definition of this type in a `LibraryImport` call will get the benefit of your marshallers. They can always override your marshallers by using `MarshalUsing` at the use site.

```csharp
[NativeMarshalling(typeof(ErrorDataMarshaller))]
struct ErrorData { ... }
```

## See also

- P/Invoke source generation
- Custom marshalling source generation

[api_custommarshallerattribute]:/dotnet/api/system.runtime.interopservices.marshalling.custommarshallerattribute
[api_libraryimportattribute]:/dotnet/api/system.runtime.interopservices.libraryimportattribute
[api_marshalusingattribute]:/dotnet/api/system.runtime.interopservices.marshalling.marshalusingattribute
[api_nativemarshallingattribute]:/dotnet/api/system.runtime.interopservices.marshalling.nativemarshallingattribute
[design_libraryimport]:https://github.com/dotnet/runtime/tree/main/docs/design/libraries/LibraryImportGenerator
[pinvoke_source_generation]:pinvoke-source-generation.md
