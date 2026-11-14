---
title: "Marshal class (part 5 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 5 of 13)

## Marshal.GetFunctionPointerForDelegate<TDelegate>(TDelegate) method

```csharp
public static IntPtr GetFunctionPointerForDelegate<TDelegate> (TDelegate d);
```

Converts a delegate of a specified type to a function pointer that is callable from unmanaged code.

Parameters:

- `TDelegate`: The type of delegate to convert.
- `d`: The delegate to be passed to unmanaged code.

Returns: A value that can be passed to unmanaged code, which, in turn, can use it to call the underlying managed delegate.

Exceptions:

- `ArgumentException`: The `d` parameter is a generic type definition.
- `ArgumentNullException`: The `d` parameter is `null`.
- `PlatformNotSupportedException`: Dynamic entrypoint allocation is not supported in the current environment.

#### Remarks
The delegate `d` is converted to a function pointer that can be passed to unmanaged code by using the default platform calling convention. You can set the calling convention by applying the `UnmanagedFunctionPointerAttribute` to the delegate.

You must manually keep the delegate from being collected by the garbage collector from managed code. The garbage collector does not track references to unmanaged code. Use `GC.KeepAlive` to prevent the delegate from being collected before the native call completes:

```csharp
 var callback = new MyNativeCallback(MyManagedMethod);
 IntPtr fnPtr = Marshal.GetFunctionPointerForDelegate(callback);
 NativeMethod(fnPtr);
 GC.KeepAlive(callback); // Prevent collection — fnPtr does not root the delegate.
```

A P/Invoke that marshals a delegate handles the `GC.KeepAlive` on the user's behalf:

```csharp
 var callback = new MyNativeCallback(MyManagedMethod);
 NativeMethod(callback); // P/Invoke marshals the delegate and keeps it alive for the duration of the call.
```

If native code stores the function pointer beyond the duration of the call, root the delegate for its entire lifetime — for example, by storing it in a `static` field.

This API is unsupported in environments that don't support dynamic entry-point allocation, such as `ProcessDynamicCodePolicy` on Windows, `execmem off` in SELinux, and WebAssembly.

It is recommended to use function pointers and `UnmanagedCallersOnlyAttribute` instead. Function pointers are more efficient, easier to use correctly, and supported in all environments.

## Marshal.GetHINSTANCE(Module) method

```csharp
public static IntPtr GetHINSTANCE (System.Reflection.Module m);
```

Returns the instance handle (HINSTANCE) for the specified module.

Parameters:

- `m`: The module whose HINSTANCE is desired.

Returns: The HINSTANCE for `m`; or -1 if the module does not have an HINSTANCE.

Exceptions:

- `ArgumentNullException`: The `m` parameter is `null`.

#### Remarks
When dynamic or in-memory, modules do not have an HINSTANCE.

## Marshal.GetHRForException(Exception) method

```csharp
public static int GetHRForException (Exception? e);
```

Converts the specified exception to an HRESULT.

Parameters:

- `e`: The exception to convert to an HRESULT.

Returns: The HRESULT mapped to the supplied exception.

#### Remarks
`Marshal.GetHRForException` also sets up an IErrorInfo interface for the exception that can be obtained by calling the COM GetErrorInfoNEEDGUID function. You can use this function to return an HRESULT value on a managed class implementation of a COM interface where you apply the `PreserveSigAttribute` attribute. Have the attributed method catch all exceptions and use the `Marshal.GetHRForException` method to return the appropriate HRESULT value. Allowing an exception to propagate outside the method produces incorrect behavior. (In fact, the common language runtime fails to pass an exception to a COM client that calls such a method through a v-table.)

Note that the `Marshal.GetHRForException` method sets the IErrorInfo interface of the current thread. This can cause unexpected results for methods like the `Marshal.ThrowExceptionForHR` methods that default to using the IErrorInfo of the current thread if it is set.

## Marshal.GetHRForLastWin32Error() method

```csharp
public static int GetHRForLastWin32Error ();
```

Returns the HRESULT corresponding to the last error incurred by Win32 code executed using `Marshal`.

Returns: The HRESULT corresponding to the last Win32 error code.

#### Remarks
The target function must have had the `setLastError` metadata flag set. For example, the `SetLastError` field of the `DllImportAttribute` must be `true`. The process for setting this flag depends on the source language used: C# and C++ are `false` by default, but the `Declare` statement in Visual Basic is `true`.

#### Examples
The following example demonstrates how to retrieve an HRESULT corresponding to a Win32 error code using the `Marshal.GetHRForLastWin32Error` method.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/GetHRForLastWin32Error/example.cs._

## Marshal.GetIDispatchForObject(Object) method

```csharp
public static IntPtr GetIDispatchForObject (object o);
```

Returns an IDispatch interface from a managed object.

Parameters:

- `o`: The object whose `IDispatch` interface is requested.

Returns: The `IDispatch` pointer for the `o` parameter.

Exceptions:

- `InvalidCastException`: `o` does not support the requested interface.
- `PlatformNotSupportedException`: COM interop is not supported on the current platform.

#### Remarks
In managed code, you seldom work directly with the `IDispatch` interface. However, `Marshal.GetIDispatchForObject` is useful when calling a method that exposes a COM object parameter as an `IntPtr` type, or with custom marshaling. Calling an object with this method causes the reference count to increment on the interface pointer before the pointer is returned. Always use `Marshal.Release` to decrement the reference count once you have finished with the pointer.

You can also use this method on a managed object to obtain an interface pointer to the COM callable wrapper for the object. For additional information, see COM Callable Wrapper.

## Marshal.GetIUnknownForObject(Object) method

```csharp
public static IntPtr GetIUnknownForObject (object o);
```

Returns an IUnknown interface from a managed object.

Parameters:

- `o`: The object whose `IUnknown` interface is requested.

Returns: The `IUnknown` pointer for the `o` parameter.

#### Remarks
In managed code, you seldom work directly with the `IUnknown` interface. However, `Marshal.GetIUnknownForObject` is useful when calling a method that exposes a COM object parameter as an `IntPtr` type, or with custom marshaling. Calling an object with this method causes the reference count to increment on the interface pointer before the pointer is returned. Always use `Marshal.Release` to decrement the reference count once you have finished with the pointer. This method provides the opposite functionality of the `Marshal.GetObjectForIUnknown` method.

You can also use this method on a managed object to obtain an interface pointer to the COM Callable Wrapper for the object.

#### Examples
The following example demonstrates how to retrieve an IUnknown interface for a managed object using the `Marshal.GetIUnknownForObject` method.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/GetIUnknownForObject/example.cs._

## Marshal.GetLastPInvokeError() method

```csharp
public static int GetLastPInvokeError ();
```

Get the last platform invoke error on the current thread.

Returns: The last platform invoke error.

#### Remarks

The last platform invoke error corresponds to the error set either by the most recent platform invoke that was
configured with `SetLastError`
set to `true` or by a call to `SetLastPInvokeError`,
whichever happened last.

This method will only return errors set via the mentioned scenarios. To get the last system error independent of
platform invoke usage, use `Marshal.GetLastSystemError`.

This method is functionally equivalent to `Marshal.GetLastWin32Error`. It is
named to better reflect the intent of the API and its cross-platform nature. `Marshal.GetLastPInvokeError`
should be preferred over `Marshal.GetLastWin32Error`.

#### Examples

The following example defines a p/invoke with `SetLastError`
set to `true` and demonstrates using `Marshal.GetLastPInvokeError` to get the last p/invoke error.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/GetLastPInvokeError/GetLastPInvokeError.cs._
## Marshal.GetLastPInvokeErrorMessage() method

```csharp
public static string GetLastPInvokeErrorMessage ();
```

Gets the system error message for the last PInvoke error code.

Returns: The error message associated with the last PInvoke error code.

To be added.

## Marshal.GetLastSystemError() method

```csharp
public static int GetLastSystemError ();
```

Gets the last system error on the current thread.

Returns: The last system error.

#### Remarks

The system error is based on the current operating system—that is, `errno` on non-Windows and GetLastError on Windows.

This method is provided as a low-level API to allow getting the current system error in a cross-platform manner. It is not tied to
platform invoke usage. To get the last platform invoke error, use `Marshal.GetLastPInvokeError`.

## Marshal.GetLastWin32Error() method

```csharp
public static int GetLastWin32Error ();
```

Returns the error code returned by the last unmanaged function that was called using platform invoke that has the `DllImportAttribute.SetLastError` flag set.

Returns: The last error code set by a call to the Win32 SetLastError function.

#### Remarks

On Windows systems, `Marshal.GetLastWin32Error` exposes the Win32 GetLastError function from Kernel32.DLL. This method exists because it is not reliable to make a direct platform invoke call to `GetLastError` to obtain this information. If you want to access this error code, you must call `Marshal.GetLastWin32Error` instead of writing your own platform invoke definition for `GetLastError` and calling it. The common language runtime can make internal calls to APIs that overwrite the `GetLastError` maintained by the operating system.

You can use this method to obtain error codes only if you apply the `DllImportAttribute` to the method signature and set the `SetLastError` field to `true`. The process for this varies depending upon the source language used: C# and C++ are `false` by default, but the `Declare` statement in Visual Basic is `true`.

Error information is cleared before P/Invoke call, and the `GetLastWin32Error` represents only error information from the last method call.

This method is functionally equivalent to `Marshal.GetLastPInvokeError`, which is named to better reflect the intent of the API and its cross-platform nature. Prefer `Marshal.GetLastPInvokeError` over `Marshal.GetLastWin32Error`.

#### Examples
The following example calls the `GetLastWin32Error` method. The example first demonstrates calling the method with no error present and then demonstrates calling the method with an error present.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/GetLastWin32Error/example.cs._

## Marshal.GetNativeVariantForObject(Object, IntPtr) method

```csharp
public static void GetNativeVariantForObject (object? obj, IntPtr pDstNativeVariant);
```

Converts an object to a COM VARIANT.

Parameters:

- `obj`: The object for which to get a COM VARIANT.
- `pDstNativeVariant`: A pointer to receive the VARIANT that corresponds to the `obj` parameter.

Exceptions:

- `ArgumentException`: The `obj` parameter is an instance of a generic type.

#### Remarks
The `pDstNativeVariant` parameter must point to sufficient memory to store the resulting VARIANT. Also, the implementation of this method calls the VariantInit function on the raw memory that the `pDstNativeVariant` parameter points to.

## Marshal.GetNativeVariantForObject<T>(T, IntPtr) method

```csharp
public static void GetNativeVariantForObject<T> (T? obj, IntPtr pDstNativeVariant);
```

Converts an object of a specified type to a COM VARIANT.

Parameters:

- `T`: The type of the object to convert.
- `obj`: The object for which to get a COM VARIANT.
- `pDstNativeVariant`: A pointer to receive the VARIANT that corresponds to the `obj` parameter.

#### Remarks
The `pDstNativeVariant` parameter must point to sufficient memory to store the resulting VARIANT. Also, the implementation of this method calls VariantInit function on the raw memory that the `pDstNativeVariant` parameter points to.

## Marshal.GetObjectForIUnknown(IntPtr) method

```csharp
public static object GetObjectForIUnknown (IntPtr pUnk);
```

Returns an instance of a type that represents a COM object by a pointer to its IUnknown interface.

Parameters:

- `pUnk`: A pointer to the `IUnknown` interface.

Returns: An object that represents the specified unmanaged COM object.

Exceptions:

- `ArgumentNullException`: `pUnk` is `IntPtr.Zero`.

#### Remarks
This method wraps `IUnknown` in a managed object. This has the effect of incrementing the reference count of the COM component. The reference count will be decremented when the runtime performs garbage collection on the managed object that represents the COM object.

The `pUnk` parameter represents an `IUnknown` interface pointer; however, because all COM interfaces derive directly or indirectly from `IUnknown`, you can pass any COM interface to this method. The object returned by `Marshal.GetObjectForIUnknown` is a Runtime Callable Wrapper, which the common language runtime manages as it does any other managed object. The type of this wrapper is often a base `System.__ComObject` type, which is a hidden type used when the wrapper type is ambiguous. You can still make late-bound calls to such a base type as long as the COM object implements the IDispatch interface. Likewise, you can cast the returned object to an appropriate COM interface.

For an object to be wrapped with a specific managed class type (and not a generic wrapper type), you must adhere to the following requirements:

- Implement the IProvideClassInfo interface for the COM object.

- Register the containing assembly with the Regasm.exe (Assembly Registration Tool).

Alternatively, you can avoid these requirements and still get an object that is wrapped with a specific managed class type by using the `Marshal.GetTypedObjectForIUnknown` method.
