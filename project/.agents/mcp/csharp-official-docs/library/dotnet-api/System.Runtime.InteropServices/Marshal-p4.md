---
title: "Marshal class (part 4 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 4 of 13)

## Marshal.GetComInterfaceForObject(Object, Type, CustomQueryInterfaceMode) method

```csharp
public static IntPtr GetComInterfaceForObject (object o, Type T, System.Runtime.InteropServices.CustomQueryInterfaceMode mode);
```

Returns a pointer to an IUnknown interface that represents the specified interface on the specified object. Custom query interface access is controlled by the specified customization mode.

Parameters:

- `o`: The object that provides the interface.
- `T`: The type of interface that is requested.
- `mode`: One of the enumeration values that indicates whether to apply an `IUnknown::QueryInterface` customization that is supplied by an `ICustomQueryInterface`.

Returns: The interface pointer that represents the interface for the object.

Exceptions:

- `ArgumentException`: The `T` parameter is not an interface.

-or-

The type is not visible to COM.

-or-

The `T` parameter is a generic type definition.
- `InvalidCastException`: The object `o` does not support the requested interface.
- `ArgumentNullException`: The `o` parameter is `null`.

-or-

The `T` parameter is `null`.

#### Remarks
`GetComInterfaceForObject` lets you specify whether to apply query interface customization. Use the `GetComInterfaceForObject` overload to apply query interface customization by default.

## Marshal.GetComInterfaceForObject<T,TInterface>(T) method

```csharp
public static IntPtr GetComInterfaceForObject<T,TInterface> (T o);
```

Returns a pointer to an IUnknown interface that represents the specified interface on an object of the specified type. Custom query interface access is enabled by default.

Parameters:

- `T`: The type of `o`.
- `TInterface`: The type of interface to return.
- `o`: The object that provides the interface.

Returns: The interface pointer that represents the `TInterface` interface.

Exceptions:

- `ArgumentException`: The `TInterface` parameter is not an interface.

-or-

The type is not visible to COM.

-or-

The `T` parameter is an open generic type.
- `InvalidCastException`: The `o` parameter does not support the `TInterface` interface.
- `ArgumentNullException`: The `o` parameter is `null`.

#### Remarks
This method returns an interface pointer that represents the `TInterface` interface on the specified object. It is particularly useful if you have an unmanaged method that expects to be passed an interface pointer. Calling an object with this method causes the reference count to increment on the interface pointer before the pointer is returned. Always use the `Marshal.Release` method to decrement the reference count when you have finished with the pointer. You must adhere to the rules defined by COM when using raw COM interface pointers.

`GetComInterfaceForObject<T1,T2>` is useful when calling a method that exposes a COM object parameter as an `IntPtr` type, or with custom marshaling. You can also use this method on a managed object to obtain a pointer to the object's COM callable wrapper, although this is less common. For example, you can use `GetComInterfaceForObject<T1,T2>` on a managed object that is exported to COM to obtain an interface pointer for `UCOMIConnectionPointContainer`.

The `GetComInterfaceForObject<T1,T2>` method overload allows query interface customization by default. To specify whether to apply query interface customization, use the `GetComInterfaceForObject` method overload.

For additional information, see the COM Callable Wrapper and Runtime Callable Wrapper articles.

## Marshal.GetComObjectData(Object, Object) method

```csharp
public static object? GetComObjectData (object obj, object key);
```

Retrieves data that is referenced by the specified key from the specified COM object.

Parameters:

- `obj`: The COM object that contains the data that you want.
- `key`: The key in the internal hash table of `obj` to retrieve the data from.

Returns: The data represented by the `key` parameter in the internal hash table of the `obj` parameter.

Exceptions:

- `ArgumentNullException`: `obj` is `null`.

-or-

`key` is `null`.
- `ArgumentException`: `obj` is not a COM object.

-or-

`obj` is a Windows Runtime object.

#### Remarks
All COM objects wrapped in a Runtime Callable Wrapper have an associated hash table, which `Marshal.GetComObjectData` retrieves. `Marshal.SetComObjectData` adds data to the hash table. You should never have to call either method from your code.

## Marshal.GetDelegateForFunctionPointer(IntPtr, Type) method

```csharp
public static Delegate GetDelegateForFunctionPointer (IntPtr ptr, Type t);
```

Converts an unmanaged function pointer to a delegate.

Parameters:

- `ptr`: The unmanaged function pointer to be converted.
- `t`: The type of the delegate to be returned.

Returns: A delegate instance that can be cast to the appropriate delegate type.

Exceptions:

- `ArgumentException`: The `t` parameter is not a delegate or is generic.
- `ArgumentNullException`: The `ptr` parameter is `null`.

-or-

The `t` parameter is `null`.

#### Remarks
You can use the `Marshal.GetDelegateForFunctionPointer` and `Marshal.GetFunctionPointerForDelegate` methods to marshal delegates in both directions. With `Marshal.GetDelegateForFunctionPointer`, `ptr` is imported as a `IntPtr`. A `IntPtr` can be obtained for a managed delegate by calling `Marshal.GetFunctionPointerForDelegate` and passed as a parameter; it can then be called from inside the unmanaged method. Note that the parameter marshaler can also marshal function pointers to delegates.

`ptr` is converted to a delegate that invokes the unmanaged method using the default platform calling convention. You can set the calling convention by applying the `UnmanagedFunctionPointerAttribute` to the delegate.

The `Marshal.GetDelegateForFunctionPointer` method has the following restrictions:

- Generics are not supported in interop scenarios.
- You can use this method only for pure unmanaged function pointers.
- You cannot use this method with function pointers obtained through C++.

## Marshal.GetDelegateForFunctionPointer<TDelegate>(IntPtr) method

```csharp
public static TDelegate GetDelegateForFunctionPointer<TDelegate> (IntPtr ptr);
```

Converts an unmanaged function pointer to a delegate of a specified type.

Parameters:

- `TDelegate`: The type of the delegate to return.
- `ptr`: The unmanaged function pointer to convert.

Returns: A instance of the specified delegate type.

Exceptions:

- `ArgumentException`: The `TDelegate` generic parameter is not a delegate, or it is an open generic type.
- `ArgumentNullException`: The `ptr` parameter is `null`.

#### Remarks
You can use the `GetDelegateForFunctionPointer<T>` and `GetFunctionPointerForDelegate<T>` methods to marshal delegates in both directions.

`ptr` is converted to a delegate that invokes the unmanaged method using the default platform calling convention. You can set the calling convention by applying the `UnmanagedFunctionPointerAttribute` to the delegate.

The `GetDelegateForFunctionPointer<T>` method has the following restrictions:

- Generics are not supported in interop scenarios.
- You can use this method only for pure unmanaged function pointers.
- You cannot use this method with function pointers obtained through C++.

## Marshal.GetEndComSlot(Type) method

```csharp
public static int GetEndComSlot (Type t);
```

Retrieves the last slot in the virtual function table (v-table or VTBL) of a type when exposed to COM.

Parameters:

- `t`: A type that represents an interface or class.

Returns: The last VTBL slot of the interface when exposed to COM. If the `t` parameter is a class, the returned VTBL slot is the last slot in the interface that is generated from the class.

#### Remarks
This method returns the zero-based, v-table number for an interface or a class. When used on a class, the slot number returned refers to the class interface for the class. If the class interface is auto-dispatch, this method always returns -1 to indicate that the dispatch-only interface does not expose a v-table to managed clients. You can use `Marshal.GetEndComSlot` and `Marshal.GetStartComSlot` in conjunction with `Marshal.GetMethodInfoForComSlot` to pass slots within a specified range. For additional information, see Introducing the class interface.

## Marshal.GetExceptionCode() method

```csharp
public static int GetExceptionCode ();
```

Retrieves a code that identifies the type of the exception that occurred.

Returns: The type of the exception.

To be added.

## Marshal.GetExceptionForHR(Int32) method

```csharp
public static Exception? GetExceptionForHR (int errorCode);
```

Converts the specified HRESULT error code to a corresponding `Exception` object.

Parameters:

- `errorCode`: The HRESULT to be converted.

Returns: An object that represents the converted HRESULT, or `null` if the HRESULT value doesn't represent an error code (for example, `S_OK` or `S_FALSE`).

#### Remarks
Use the `Marshal.GetExceptionForHR` method to get an `Exception` based on an HRESULT without having to call the `Marshal.ThrowExceptionForHR` method and catch the exception.

The current IErrorInfo interface is used to construct the exception.

For the mapping from each HRESULT to its comparable exception class in .NET, see How to: Map HRESULTs and Exceptions.

## Marshal.GetExceptionForHR(Int32, IntPtr) method

```csharp
public static Exception? GetExceptionForHR (int errorCode, IntPtr errorInfo);
```

Converts the specified HRESULT error code to a corresponding `Exception` object, with additional error information passed in an IErrorInfo interface for the exception object.

Parameters:

- `errorCode`: The HRESULT to be converted.
- `errorInfo`: A pointer to the `IErrorInfo` interface that provides more information about the error. You can specify `IntPtr(0)` to use the current `IErrorInfo` interface, or `IntPtr(-1)` to ignore the current `IErrorInfo` interface and construct the exception just from the error code.

Returns: An object that represents the converted HRESULT and information obtained from `errorInfo`, or `null` if an HRESULT value doesn't represent an error code (for example, `S_OK` or `S_FALSE`).

#### Remarks
Use the `Marshal.GetExceptionForHR` method to get an `Exception` based on an HRESULT without having to call the `Marshal.ThrowExceptionForHR` method and catch the exception (thus avoiding the corresponding performance overhead). The `errorInfo` parameter supplies additional information about the error, such as its textual description and the globally unique identifier (GUID) for the interface that defined the error.

Use this method overload if you have custom error information that you have to supply in the conversion.

For the mapping from each HRESULT to its comparable exception class in .NET, see How to: Map HRESULTs and Exceptions.

## Marshal.GetExceptionForHR(Int32, Guid, IntPtr) method

```csharp
public static Exception? GetExceptionForHR (int errorCode, in Guid iid, IntPtr pUnk);
```

To be added.

Parameters:

- `errorCode`: To be added.
- `iid`: To be added.
- `pUnk`: To be added.

Returns: To be added.

To be added.

## Marshal.GetExceptionPointers() method

```csharp
public static IntPtr GetExceptionPointers ();
```

Retrieves a computer-independent description of an exception, and information about the state that existed for the thread when the exception occurred.

Returns: A pointer to an EXCEPTION_POINTERS structure.

#### Remarks
`Marshal.GetExceptionPointers` is exposed for compiler support of structured exception handling (SEH) only.

## Marshal.GetFunctionPointerForDelegate(Delegate) method

```csharp
public static IntPtr GetFunctionPointerForDelegate (Delegate d);
```

Converts a delegate into a function pointer that is callable from unmanaged code.

Parameters:

- `d`: The delegate to be passed to unmanaged code.

Returns: A value that can be passed to unmanaged code, which, in turn, can use it to call the underlying managed delegate.

Exceptions:

- `ArgumentException`: The `d` parameter is a generic type definition.
- `ArgumentNullException`: The `d` parameter is `null`.
- `PlatformNotSupportedException`: Dynamic entrypoint allocation is not supported in the current environment.

#### Remarks
The delegate `d` is converted to a function pointer that can be passed to unmanaged code using the default platform calling convention. You can set the calling convention by applying the `UnmanagedFunctionPointerAttribute` to the delegate.

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
