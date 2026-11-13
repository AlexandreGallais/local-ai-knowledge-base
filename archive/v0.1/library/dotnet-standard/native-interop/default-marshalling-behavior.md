---
title: "Default Marshalling Behavior (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/default-marshalling-behavior.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default Marshalling Behavior

Interop marshalling operates on rules that dictate how data associated with method parameters behaves as it passes between managed and unmanaged memory. These built-in rules control such marshalling activities as data type transformations, whether a callee can change data passed to it and return those changes to the caller, and under which circumstances the marshaller provides performance optimizations.

 This section identifies the default behavioral characteristics of the interop marshalling service. It presents detailed information on marshalling arrays, Boolean types, char types, delegates, classes, objects, strings, and structures.

> **Note:**
> Marshalling of generic types is not supported. For more information see, Interoperating Using Generic Types.

## Memory management with the interop marshaller

 The interop marshaller always attempts to free memory allocated by unmanaged code. This behavior complies with COM memory management rules, but differs from the rules that govern native C++.

 Confusion can arise if you anticipate native C++ behavior (no memory freeing) when using platform invoke, which automatically frees memory for pointers. For example, calling the following unmanaged method from a C++ DLL does not automatically free any memory.

### Unmanaged signature

```cpp
BSTR MethodOne (BSTR b) {
     return b;
}
```

 However, if you define the method as a platform invoke prototype, replace each `BSTR` type with a `System.String` type, and call `MethodOne`, the common language runtime attempts to free `b` twice. You can change the marshalling behavior by using `System.IntPtr` types rather than `String` types.

 The runtime always uses the `CoTaskMemFree` method on Windows and `free` method on other platforms to free memory. If the memory you are working with was not allocated with the `CoTaskMemAlloc` method on Windows or `malloc` method on other platforms, you must use an `IntPtr` and free the memory manually using the appropriate method. Similarly, you can avoid automatic memory freeing in situations where memory should never be freed, such as when using the `GetCommandLine` function from Kernel32.dll, which returns a pointer to kernel memory. For details on manually freeing memory, see the Buffers Sample.

## Default marshalling for classes

 Classes can be marshalled only by COM interop and are always marshalled as interfaces. In some cases the interface used to marshal the class is known as the class interface. For information about overriding the class interface with an interface of your choice, see Introducing the class interface.

### Passing Classes to COM

 When a managed class is passed to COM, the interop marshaller automatically wraps the class with a COM proxy and passes the class interface produced by the proxy to the COM method call. The proxy then delegates all calls on the class interface back to the managed object. The proxy also exposes other interfaces that are not explicitly implemented by the class. The proxy automatically implements interfaces such as `IUnknown` and `IDispatch` on behalf of the class.

### Passing Classes to .NET Code

 Coclasses are not typically used as method arguments in COM. Instead, a default interface is usually passed in place of the coclass.

 When an interface is passed into managed code, the interop marshaller is responsible for wrapping the interface with the proper wrapper and passing the wrapper to the managed method. Determining which wrapper to use can be difficult. Every instance of a COM object has a single, unique wrapper, no matter how many interfaces the object implements. For example, a single COM object that implements five distinct interfaces has only one wrapper. The same wrapper exposes all five interfaces. If two instances of the COM object are created, then two instances of the wrapper are created.

 For the wrapper to maintain the same type throughout its lifetime, the interop marshaller must identify the correct wrapper the first time an interface exposed by the object is passed through the marshaller. The marshaller identifies the object by looking at one of the interfaces the object implements.

 For example, the marshaller determines that the class wrapper should be used to wrap the interface that was passed into managed code. When the interface is first passed through the marshaller, the marshaller checks whether the interface is coming from a known object. This check occurs in two situations:

- An interface is being implemented by another managed object that was passed to COM elsewhere. The marshaller can readily identify interfaces exposed by managed objects and is able to match the interface with the managed object that provides the implementation. The managed object is then passed to the method and no wrapper is needed.

- An object that has already been wrapped is implementing the interface. To determine whether this is the case, the marshaller queries the object for its `IUnknown` interface and compares the returned interface to the interfaces of other objects that are already wrapped. If the interface is the same as that of another wrapper, the objects have the same identity and the existing wrapper is passed to the method.

 If an interface is not from a known object, the marshaller does the following:

1. The marshaller queries the object for the **IProvideClassInfo2** interface. If provided, the marshaller uses the CLSID returned from **IProvideClassInfo2.GetGUID** to identify the coclass providing the interface. With the CLSID, the marshaller can locate the wrapper from the registry if the assembly has previously been registered.

2. The marshaller queries the interface for the `IProvideClassInfo` interface. If provided, the marshaller uses the `ITypeInfo` returned from **IProvideClassInfo.GetClassinfo** to determine the CLSID of the class exposing the interface. The marshaller can use the CLSID to locate the metadata for the wrapper.

3. If the marshaller still cannot identify the class, it wraps the interface with a generic wrapper class called **System.__ComObject**.

## Default marshalling for delegates

 A managed delegate is marshalled as a COM interface or as a function pointer, based on the calling mechanism:

- For platform invoke, a delegate is marshalled as an unmanaged function pointer by default.

- For COM interop, a delegate is marshalled as a COM interface of type `_Delegate` by default. The `_Delegate` interface is defined in the Mscorlib.tlb type library and contains the `System.Delegate.DynamicInvoke*` method, which enables you to call the method that the delegate references.

 The following table shows the marshalling options for the managed delegate data type. The `System.Runtime.InteropServices.MarshalAsAttribute` attribute provides several `System.Runtime.InteropServices.UnmanagedType` enumeration values to marshal delegates.

|Enumeration type|Description of unmanaged format|
|----------------------|-------------------------------------|
|**UnmanagedType.FunctionPtr**|An unmanaged function pointer.|
|**UnmanagedType.Interface**|An interface of type **_Delegate**, as defined in Mscorlib.tlb.|

 Consider the following example code in which the methods of `DelegateTestInterface` are exported to a COM type library. Notice that only delegates marked with the `ref` (or **ByRef**) keyword are passed as In/Out parameters.

```csharp
using System;
using System.Runtime.InteropServices;

public interface DelegateTest {
void m1(Delegate d);
void m2([MarshalAs(UnmanagedType.Interface)] Delegate d);
void m3([MarshalAs(UnmanagedType.Interface)] ref Delegate d);
void m4([MarshalAs(UnmanagedType.FunctionPtr)] Delegate d);
void m5([MarshalAs(UnmanagedType.FunctionPtr)] ref Delegate d);
}
```

### Type library representation

```cpp
importlib("mscorlib.tlb");
interface DelegateTest : IDispatch {
[id(…)] HRESULT m1([in] _Delegate* d);
[id(…)] HRESULT m2([in] _Delegate* d);
[id(…)] HRESULT m3([in, out] _Delegate** d);
[id()] HRESULT m4([in] int d);
[id()] HRESULT m5([in, out] int *d);
   };
```

 A function pointer can be dereferenced, just as any other unmanaged function pointer can be dereferenced.

In this example, when the two delegates are marshalled as `System.Runtime.InteropServices.UnmanagedType.FunctionPtr`, the result is an `int` and a pointer to an `int`. Because delegate types are being marshalled, `int` here represents a pointer to a void (`void*`), which is the address of the delegate in memory. In other words, this result is specific to 32-bit Windows systems, since `int` here represents the size of the function pointer.

> **Note:**
> A reference to the function pointer to a managed delegate held by unmanaged code does not prevent the common language runtime from performing garbage collection on the managed object.

 For example, the following code is incorrect because the reference to the `cb` object, passed to the `SetChangeHandler` method, does not keep `cb` alive beyond the life of the `Test` method. Once the `cb` object is garbage collected, the function pointer passed to `SetChangeHandler` is no longer valid.

```csharp
public class ExternalAPI {
   [DllImport("External.dll")]
   public static extern void SetChangeHandler(
      [MarshalAs(UnmanagedType.FunctionPtr)]ChangeDelegate d);
}
public delegate bool ChangeDelegate([MarshalAs(UnmanagedType.LPWStr) string S);
public class CallBackClass {
   public bool OnChange(string S){ return true;}
}
internal class DelegateTest {
   public static void Test() {
      CallBackClass cb = new CallBackClass();
      // Caution: The following reference on the cb object does not keep the
      // object from being garbage collected after the Main method
      // executes.
      ExternalAPI.SetChangeHandler(new ChangeDelegate(cb.OnChange));
   }
}
```

 To compensate for unexpected garbage collection, the caller must ensure that the `cb` object is kept alive as long as the unmanaged function pointer is in use. Optionally, you can have the unmanaged code notify the managed code when the function pointer is no longer needed, as the following example shows.

```csharp
internal class DelegateTest {
   CallBackClass cb;
   // Called before ever using the callback function.
   public static void SetChangeHandler() {
      cb = new CallBackClass();
      ExternalAPI.SetChangeHandler(new ChangeDelegate(cb.OnChange));
   }
   // Called after using the callback function for the last time.
   public static void RemoveChangeHandler() {
      // The cb object can be collected now. The unmanaged code is
      // finished with the callback function.
      cb = null;
   }
}
```
