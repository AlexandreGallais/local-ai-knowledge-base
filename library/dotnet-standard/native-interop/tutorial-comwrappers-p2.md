---
title: "Using the ComWrappers API (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/tutorial-comwrappers.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Using the ComWrappers API (part 2 of 4)

## Implement a `ComWrappers` subclass

Providing a `ComWrappers` subclass means giving enough information to the .NET runtime to create and record wrappers for managed objects being projected into COM and COM objects being projected into .NET. Before we look at an outline of the subclass, we should define some terms.

**Managed Object Wrapper** – Managed .NET objects require wrappers to enable usage from a non-.NET environment. These wrappers are historically called COM Callable Wrappers (**CCW**).

**Native Object Wrapper** – COM objects that are implemented in a non-.NET language require wrappers to enable usage from .NET. These wrappers are historically called Runtime Callable Wrappers (**RCW**).

### Step 1 – Define methods to implement and understand their intent

To extend the `ComWrappers` type, you must implement the following three methods. Each of these methods represents the user's participation in the creation or deletion of a type of wrapper. The `ComputeVtables()` and `CreateObject()` methods create a Managed Object Wrapper and Native Object Wrapper, respectively. The `ReleaseObjects()` method is used by the runtime to make a request for the supplied collection of wrappers to be "released" from the underlying native object. In most cases, the body of the `ReleaseObjects()` method can simply throw `System.NotImplementedException`, since it's only called in an advanced scenario involving the Reference Tracker framework.

```csharp
// See referenced sample for implementation.
class DemoComWrappers : ComWrappers
{
    protected override unsafe ComInterfaceEntry* ComputeVtables(object obj, CreateComInterfaceFlags flags, out int count) =>
        throw new NotImplementedException();

    protected override object? CreateObject(IntPtr externalComObject, CreateObjectFlags flags) =>
        throw new NotImplementedException();

    protected override void ReleaseObjects(IEnumerable objects) =>
        throw new NotImplementedException();
}
```

To implement the `ComputeVtables()` method, decide which managed types you'd like to support. For this tutorial, we'll support the two previously defined interfaces (`IDemoGetType` and `IDemoStoreType`) and a managed type that implements the two interfaces (`DemoImpl`).

```csharp
class DemoImpl : IDemoGetType, IDemoStoreType
{
    string? _string;
    public string? GetString() => _string;
    public void StoreString(int _, string? str) => _string = str;
}
```

For the `CreateObject()` method, you'll also need to determine what you'd like to support. In this case, though, we only know the COM interfaces we're interested in, not the COM classes. The interfaces being consumed from the COM side are the same as the ones we're projecting from the .NET side (that is, `IDemoGetType` and `IDemoStoreType`).

We won't implement `ReleaseObjects()` in this tutorial.

### Step 2 – Implement `ComputeVtables()`

Let's start with the Managed Object Wrapper – these wrappers are easier. You'll build a Virtual Method Table, or *vtable*, for each interface in order to project them into the COM environment. For this tutorial, you'll define a vtable as a sequence of pointers, where each pointer represents an implementation of a function on an interface – order is _very_ important here. In COM, every interface inherits from `IUnknown`. The `IUnknown` type has three methods defined in the following order: `QueryInterface()`, `AddRef()`, and `Release()`. After the `IUnknown` methods come the specific interface methods. For example, consider `IDemoGetType` and `IDemoStoreType`. Conceptually, the vtables for the types would look like the following:

```
IDemoGetType    | IDemoStoreType
==================================
QueryInterface  | QueryInterface
AddRef          | AddRef
Release         | Release
GetString       | StoreString
```

Looking at `DemoImpl`, we already have an implementation for `GetString()` and `StoreString()`, but what about the `IUnknown` functions? How to implement an `IUnknown` instance is beyond the scope of this tutorial, but it can be done manually in `ComWrappers`. However, in this tutorial, you'll let the runtime handle that part. You can get the `IUnknown` implementation using the `ComWrappers.GetIUnknownImpl()` method.

It might seem like you've implemented all the methods, but unfortunately, only the `IUnknown` functions are consumable in a COM vtable. Since COM is outside of the runtime, you'll need to create native function pointers to your `DemoImpl` implementation. This can be done using C# function pointers and the `UnmanagedCallersOnlyAttribute`. You can create a function to insert into the vtable by creating a `static` function that mimics the COM function signature. Following is an example of the COM signature for `IDemoGetType.GetString()` – recall from the COM ABI that the first argument is the instance itself.

```csharp
[UnmanagedCallersOnly]
public static int GetString(IntPtr _this, IntPtr* str);
```

The wrapper implementation of `IDemoGetType.GetString()` should consist of marshalling logic and then a dispatch to the managed object being wrapped. All the state for dispatch is contained within the provided `_this` argument. The `_this` argument will actually be of type `ComInterfaceDispatch*`. This type represents a low-level structure with a single field, `Vtable`, that will be discussed later. Further details of this type and its layout are an implementation detail of the runtime and should not be depended upon. In order to retrieve the managed instance from a `ComInterfaceDispatch*` instance, use the following code:

```csharp
IDemoGetType inst = ComInterfaceDispatch.GetInstance<IDemoGetType>((ComInterfaceDispatch*)_this);
```

Now that you have a C# method that can be inserted into a vtable, you can construct the vtable. Note the use of `RuntimeHelpers.AllocateTypeAssociatedMemory()` for allocating memory in a way that works with unloadable assemblies.

```csharp
GetIUnknownImpl(
    out IntPtr fpQueryInterface,
    out IntPtr fpAddRef,
    out IntPtr fpRelease);

// Local variables with increment act as a guard against incorrect construction of
// the native vtable. It also enables a quick validation of final size.
int tableCount = 4;
int idx = 0;
var vtable = (IntPtr*)RuntimeHelpers.AllocateTypeAssociatedMemory(
    typeof(DemoComWrappers),
    IntPtr.Size * tableCount);
vtable[idx++] = fpQueryInterface;
vtable[idx++] = fpAddRef;
vtable[idx++] = fpRelease;
vtable[idx++] = (IntPtr)(delegate* unmanaged<IntPtr, IntPtr*, int>)&ABI.IDemoGetTypeManagedWrapper.GetString;
Debug.Assert(tableCount == idx);
s_IDemoGetTypeVTable = (IntPtr)vtable;
```

The allocation of vtables is the first part of implementing `ComputeVtables()`. You should also construct comprehensive COM definitions for types that you're planning to support – think `DemoImpl` and what parts of it should be usable from COM. Using the constructed vtables, you can now create a series of `ComInterfaceEntry` instances that represent the complete view of the managed object in COM.

```csharp
s_DemoImplDefinitionLen = 2;
int idx = 0;
var entries = (ComInterfaceEntry*)RuntimeHelpers.AllocateTypeAssociatedMemory(
    typeof(DemoComWrappers),
    sizeof(ComInterfaceEntry) * s_DemoImplDefinitionLen);
entries[idx].IID = IDemoGetType.IID_IDemoGetType;
entries[idx++].Vtable = s_IDemoGetTypeVTable;
entries[idx].IID = IDemoStoreType.IID_IDemoStoreType;
entries[idx++].Vtable = s_IDemoStoreVTable;
Debug.Assert(s_DemoImplDefinitionLen == idx);
s_DemoImplDefinition = entries;
```

The allocation of vtables and entries for the Managed Object Wrapper can and should be done ahead of time since the data can be used for all instances of the type. The work here could be performed in a `static` constructor or a module initializer, but it should be done ahead of time so the `ComputeVtables()` method is as simple and quick as possible.

```csharp
protected override unsafe ComInterfaceEntry* ComputeVtables(object obj, CreateComInterfaceFlags flags,
out int count)
{
    if (obj is DemoImpl)
    {
        count = s_DemoImplDefinitionLen;
        return s_DemoImplDefinition;
    }

    // Unknown type
    count = 0;
    return null;
}
```

Once you've implemented the `ComputeVtables()` method, the `ComWrappers` subclass will be able to produce Managed Object Wrappers for instances of `DemoImpl`. Be aware that the returned Managed Object Wrapper from the call to `GetOrCreateComInterfaceForObject()` is of type `IUnknown*`. If the native API that's being passed to the wrapper requires a different interface, a `Marshal.QueryInterface()` for that interface must be performed.

```csharp
var cw = new DemoComWrappers();
var demo = new DemoImpl();
IntPtr ccw = cw.GetOrCreateComInterfaceForObject(demo, CreateComInterfaceFlags.None);
```
