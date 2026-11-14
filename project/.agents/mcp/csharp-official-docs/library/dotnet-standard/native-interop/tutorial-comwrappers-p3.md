---
title: "Using the ComWrappers API (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/tutorial-comwrappers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Using the ComWrappers API (part 3 of 4)

### Step 3 – Implement `CreateObject()`

Constructing a Native Object Wrapper has more implementation options and a great deal more nuance than constructing a Managed Object Wrapper. The first question to address is how permissive the `ComWrappers` subclass will be in supporting COM types. To support all COM types, which is possible, you'll need to write a substantial amount of code or employ some clever uses of `Reflection.Emit`. For this tutorial, you'll only support COM instances that implement both `IDemoGetType` and `IDemoStoreType`. Since you know there is a finite set and have restricted that any supplied COM instance must implement both interfaces, you could provide a single, statically defined wrapper; however, dynamic cases are common enough in COM that we'll explore both options.

#### Static Native Object Wrapper

Let's look at the static implementation first. The static Native Object Wrapper involves defining a managed type that implements the .NET interfaces and can forward the calls on the managed type to the COM instance. A rough outline of the static wrapper follows.

```csharp
// See referenced sample for implementation.
class DemoNativeStaticWrapper
    : IDemoGetType
    , IDemoStoreType
{
    public string? GetString() =>
        throw new NotImplementedException();

    public void StoreString(int len, string? str) =>
        throw new NotImplementedException();
}
```

To construct an instance of this class and provide it as a wrapper, you must define some policy. If this type is used as a wrapper, it would seem that since it implements both interfaces, the underlying COM instance should implement both interfaces too. Given that you're adopting this policy, you'll need to confirm this through calls to `Marshal.QueryInterface()` on the COM instance.

```csharp
int hr = Marshal.QueryInterface(ptr, ref IDemoGetType.IID_IDemoGetType, out IntPtr IDemoGetTypeInst);
if (hr != 0)
{
    return null;
}

hr = Marshal.QueryInterface(ptr, ref IDemoStoreType.IID_IDemoStoreType, out IntPtr IDemoStoreTypeInst);
if (hr != 0)
{
    Marshal.Release(IDemoGetTypeInst);
    return null;
}

return new DemoNativeStaticWrapper()
{
    IDemoGetTypeInst = IDemoGetTypeInst,
    IDemoStoreTypeInst = IDemoStoreTypeInst
};
```

#### Dynamic Native Object Wrapper

Dynamic wrappers are more flexible because they provide a way for types to be queried at runtime instead of statically. To provide this support, you'll use `IDynamicInterfaceCastable`. Observe that `DemoNativeDynamicWrapper` only implements this interface. The functionality that the interface provides is a chance to determine what type is supported at runtime. The source for this tutorial does a static check during creation but that is simply for code sharing since the check could be deferred until a call is made to `DemoNativeDynamicWrapper.IsInterfaceImplemented()`.

```csharp
// See referenced sample for implementation.
internal class DemoNativeDynamicWrapper
    : IDynamicInterfaceCastable
{
    public RuntimeTypeHandle GetInterfaceImplementation(RuntimeTypeHandle interfaceType) =>
        throw new NotImplementedException();

    public bool IsInterfaceImplemented(RuntimeTypeHandle interfaceType, bool throwIfNotImplemented) =>
        throw new NotImplementedException();
}
```

Let's look at one of the interfaces that `DemoNativeDynamicWrapper` will dynamically support. The following code provides the implementation of `IDemoStoreType` using the *default interface methods* feature.

```csharp
[DynamicInterfaceCastableImplementation]
unsafe interface IDemoStoreTypeNativeWrapper : IDemoStoreType
{
    public static void StoreString(IntPtr inst, int len, string? str);

    void IDemoStoreType.StoreString(int len, string? str)
    {
        var inst = ((DemoNativeDynamicWrapper)this).IDemoStoreTypeInst;
        StoreString(inst, len, str);
    }
}
```

There are two important things to note in this example:

1) The `DynamicInterfaceCastableImplementationAttribute` attribute. This attribute is required on any type that is returned from a `IDynamicInterfaceCastable` method. It has the added benefit of making IL trimming easier, which means AOT scenarios are more reliable.
2) The cast to `DemoNativeDynamicWrapper`. This is part of the dynamic nature of `IDynamicInterfaceCastable`. The type that's returned from `IDynamicInterfaceCastable.GetInterfaceImplementation()` is used to "blanket" the type that implements `IDynamicInterfaceCastable`. The gist here is the `this` pointer isn't what it pretends to be because we are permitting a case from `DemoNativeDynamicWrapper` to `IDemoStoreTypeNativeWrapper`.

#### Forward calls to the COM instance

Regardless of which Native Object Wrapper is used, you need the ability to invoke functions on a COM instance. The implementation of `IDemoStoreTypeNativeWrapper.StoreString()` can serve as an example of employing `unmanaged` C# function pointers.

```csharp
public static void StoreString(IntPtr inst, int len, string? str)
{
    IntPtr strLocal = Marshal.StringToCoTaskMemUni(str);
    int hr = ((delegate* unmanaged<IntPtr, int, IntPtr, int>)(*(*(void***)inst + 3 /* IDemoStoreType.StoreString slot */)))(inst, len, strLocal);
    if (hr != 0)
    {
        Marshal.FreeCoTaskMem(strLocal);
        Marshal.ThrowExceptionForHR(hr);
    }
}
```

Let's examine the dereferencing of the COM instance to access its vtable implementation. The COM ABI defines that the first pointer of an object is to the type's vtable and, from there, the desired slot can be accessed. Let's assume the address of the COM object is `0x10000`. The first pointer-sized value should be the address of the vtable – in this example `0x20000`. Once you're at the vtable, you look for the fourth slot (index 3 in zero-based indexing) to access the `StoreString()` implementation.

```
COM instance
0x10000  0x20000

VTable for IDemoStoreType
0x20000  <Address of QueryInterface>
0x20008  <Address of AddRef>
0x20010  <Address of Release>
0x20018  <Address of StoreString>
```

Having the function pointer then allows you to dispatch to that member function on that object by passing the object instance as the first parameter. This pattern should look familiar based on the function definitions of the Managed Object Wrapper implementation.

Once the `CreateObject()` method is implemented, the `ComWrappers` subclass will be able to produce Native Object Wrappers for COM instances that implement both `IDemoGetType` and `IDemoStoreType`.

```csharp
IntPtr iunk = ...; // Get a COM instance from native code.
object rcw = cw.GetOrCreateObjectForComInstance(iunk, CreateObjectFlags.UniqueInstance);
```

### Step 4 – Handle Native Object Wrapper lifetime details

The `ComputeVtables()` and `CreateObject()` implementations covered some wrapper lifetime details, but there are further considerations. While this can be a short step, it can also significantly increase the complexity of the `ComWrappers` design.

Unlike the Managed Object Wrapper, which is controlled by calls to its `AddRef()` and `Release()` methods, the lifetime of a Native Object Wrapper is nondeterministically handled by the GC. The question here is, when does the Native Object Wrapper call `Release()` on the `IntPtr` that represents the COM instance? There are two general buckets:

1) The Native Object Wrapper's Finalizer is responsible for calling the COM instance's `Release()` method. This is the only time when it's safe to call this method. At this point, it's been correctly determined by the GC that there are no other references to the Native Object Wrapper in the .NET runtime. There can be complexity here if you're properly supporting COM Apartments; for more information, see the Additional considerations section.

2) The Native Object Wrapper implements `IDisposable` and calls `Release()` in `Dispose()`.

  > **Note:**
  > The `IDisposable` pattern should only be supported if, during the `CreateObject()` call, the `CreateObjectFlags.UniqueInstance` flag was passed in. If this requirement is not followed, it's possible for disposed Native Object Wrappers to be reused after being disposed.

## Using the `ComWrappers` subclass

You now have a `ComWrappers` subclass that can be tested. To avoid creating a native library that returns a COM instance that implements `IDemoGetType` and `IDemoStoreType`, you'll use the Managed Object Wrapper and treat it as a COM instance – this must be possible in order to pass it COM anyways.

Let's create a Managed Object Wrapper first. Instantiate a `DemoImpl` instance and display its current string state.

```csharp
var demo = new DemoImpl();

string? value = demo.GetString();
Console.WriteLine($"Initial string: {value ?? "<null>"}");
```

Now you can create an instance of `DemoComWrappers` and a Managed Object Wrapper that you can then pass into a COM environment.

```csharp
var cw = new DemoComWrappers();

IntPtr ccw = cw.GetOrCreateComInterfaceForObject(demo, CreateComInterfaceFlags.None);
```

Instead of passing the Managed Object Wrapper to a COM environment, pretend you just received this COM instance, so you'll create a Native Object Wrapper for it instead.

```csharp
var rcw = cw.GetOrCreateObjectForComInstance(ccw, CreateObjectFlags.UniqueInstance);
```

With the Native Object Wrapper, you should be able to cast it to one of the desired interfaces and use it as a normal managed object. You can examine the `DemoImpl` instance and observe the impact of operations on the Native Object Wrapper that's wrapping a Managed Object Wrapper that's in turn wrapping the managed instance.

```csharp
var getter = (IDemoGetType)rcw;
var store = (IDemoStoreType)rcw;

string msg = "hello world!";
store.StoreString(msg.Length, msg);
Console.WriteLine($"Setting string through wrapper: {msg}");

value = demo.GetString();
Console.WriteLine($"Get string through managed object: {value}");

msg = msg.ToUpper();
demo.StoreString(msg.Length, msg.ToUpper());
Console.WriteLine($"Setting string through managed object: {msg}");

value = getter.GetString();
Console.WriteLine($"Get string through wrapper: {value}");
```

Since your `ComWrapper` subclass was designed to support `CreateObjectFlags.UniqueInstance`, you can clean up the Native Object Wrapper immediately instead of waiting for a GC to occur.

```csharp
(rcw as IDisposable)?.Dispose();
```

## COM Activation with `ComWrappers`

The creation of COM objects is typically performed via COM Activation – a complex scenario outside the scope of this document. In order to provide a conceptual pattern to follow, we introduce the `CoCreateInstance()` API, used for COM Activation, and illustrate how it can be used with `ComWrappers`.

Assume you have the following C# code in your application. The below example uses `CoCreateInstance()` to activate a COM class and the built-in COM interop system to marshal the COM instance to the appropriate interface. Note the use of `typeof(I).GUID` is limited to an assert and is a case of using reflection which can impact if the code is AOT-friendly.

```csharp
public static I ActivateClass<I>(Guid clsid, Guid iid)
{
    Debug.Assert(iid == typeof(I).GUID);
    int hr = CoCreateInstance(ref clsid, IntPtr.Zero, /*CLSCTX_INPROC_SERVER*/ 1, ref iid, out object obj);
    if (hr < 0)
    {
        Marshal.ThrowExceptionForHR(hr);
    }
    return (I)obj;
}

[DllImport("Ole32")]
private static extern int CoCreateInstance(
    ref Guid rclsid,
    IntPtr pUnkOuter,
    int dwClsContext,
    ref Guid riid,
    [MarshalAs(UnmanagedType.Interface)] out object ppObj);
```

Converting the above to use `ComWrappers` involves removing the `MarshalAs(UnmanagedType.Interface)` from the `CoCreateInstance()` P/Invoke and performing the marshalling manually.

```csharp
static ComWrappers s_ComWrappers = ...;

public static I ActivateClass<I>(Guid clsid, Guid iid)
{
    Debug.Assert(iid == typeof(I).GUID);
    int hr = CoCreateInstance(ref clsid, IntPtr.Zero, /*CLSCTX_INPROC_SERVER*/ 1, ref iid, out IntPtr obj);
    if (hr < 0)
    {
        Marshal.ThrowExceptionForHR(hr);
    }
    return (I)s_ComWrappers.GetOrCreateObjectForComInstance(obj, CreateObjectFlags.None);
}

[DllImport("Ole32")]
private static extern int CoCreateInstance(
    ref Guid rclsid,
    IntPtr pUnkOuter,
    int dwClsContext,
    ref Guid riid,
    out IntPtr ppObj);
```

It is also possible to abstract away factory-style functions like `ActivateClass` by including the activation logic in the class constructor for a Native Object Wrapper. The constructor can use the `ComWrappers.GetOrRegisterObjectForComInstance()` API to associate the newly constructed managed object with the activated COM instance.
