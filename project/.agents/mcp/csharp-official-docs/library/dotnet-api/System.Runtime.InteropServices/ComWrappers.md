---
title: "ComWrappers class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComWrappers.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComWrappers class

Namespace: `System.Runtime.InteropServices`

```csharp
public abstract class ComWrappers
```

Class for managing wrappers of COM IUnknown types.

The `ComWrappers` API provides support for the `IUnknown` API independent of the built-in COM interoperability support. The `ComWrappers` API exposes the minimal runtime support that's needed for developers to replace the built-in version in an efficient manner.

Traditionally in the runtime, a native proxy to managed object is called a COM Callable Wrapper (CCW), and a managed proxy to a native object is called a Runtime Callable Wrapper (RCW). However, when used here, those terms should not be confused with the built-in features of the same name (that is, CCW and RCW). Unlike the built-in features, a majority of the responsibility for accurate lifetime management, dispatching methods, and marshalling of arguments and return values is left to the `ComWrappers` implementer.

"Minimal support" is defined by the following features:

1. Efficient mapping between a managed object and a native proxy (for example, CCW).
2. Efficient mapping between a native `IUnknown` and its managed proxy (for example, RCW).
3. Integration with the garbage collector through the IReferenceTrackerHost interface contract.

Leveraging this is an advanced scenario.

#### Proxy state

This section provides descriptions and illustrations of native and managed proxy state after their respective creation.

In the following illustrations, a strong reference is depicted as a solid line (`===`) and a weak reference is depicted as a dashed line (`= = =`). The terms "strong reference" and "weak reference" should be interpreted as "extending lifetime" and "not extending lifetime", as opposed to implying a specific implementation.

The following illustration shows the state of the managed object and native proxy after a call to `GetOrCreateComInterfaceForObject`.

```
 --------------------                  ----------------------
|   Managed object   |                |     Native proxy     |
|                    |                | Ref count: 1         |
|  ----------------  |                |  ------------------  |
| | Weak reference |=| = = = = = = = >| | Strong reference | |
| |    to proxy    | |<===============|=|    to object     | |
|  ----------------  |                |  ------------------  |
 --------------------                  ----------------------
```

The next illustration shows the state of the native object and managed proxy after a call to `GetOrCreateObjectForComInstance`. The concept of "identity" follows the rules for `IUnknown`.

```
 ------------------               ------------------
|  Native object   |< = = = = = =|                  |
| Ref count: +1    |             | Mapping from     |
 ------------------              | native identity  |
 ------------------------        | to managed proxy |
|   Managed proxy        |< = = =|                  |
| Created by ComWrappers |        ------------------
|   implementer.        |
| Optional AddRef() on   |
|   native object.      |
 ------------------------
```

Observe that only weak references exist from the runtime perspective. The `+1` reference count on the native object is assumed to be performed by the managed proxy creator (that is, the `ComWrappers` implementer) to ensure the associated lifetime between the native object and its managed proxy. There is an optional strong reference (that is, `AddRef()`) mentioned in the managed proxy, which is used to support scenario (3) mentioned earlier. See `TrackerObject`. With this optional strong reference, the reference count would be `+2`.

## ComWrappers.ComWrappers() constructor

```csharp
protected ComWrappers ();
```

Instance constructor.

To be added.

## ComWrappers.ComputeVtables(Object, CreateComInterfaceFlags, Int32) method

```csharp
protected abstract System.Runtime.InteropServices.ComWrappers.ComInterfaceEntry* ComputeVtables (object obj, System.Runtime.InteropServices.CreateComInterfaceFlags flags, out int count);
```

Computes the desired Vtable for `obj`, respecting the values of `flags`.

Parameters:

- `obj`: Target of the returned Vtables.
- `flags`: Flags used to compute Vtables.
- `count`: The number of elements contained in the returned memory.

Returns: `ComInterfaceEntry` pointer containing memory for all COM interface entries.

#### Remarks

All memory returned from this function must either be unmanaged memory or pinned managed memory, or have been allocated with the `AllocateTypeAssociatedMemory` API.

If the interface entries cannot be created and a negative `count` or `null` and a non-zero `count` are returned, the call to `GetOrCreateComInterfaceForObject` will throw a `ArgumentException`.

## ComWrappers.CreateObject(IntPtr, CreateObjectFlags) method

```csharp
protected abstract object? CreateObject (IntPtr externalComObject, System.Runtime.InteropServices.CreateObjectFlags flags);
```

Creates a managed object for the object that `externalComObject` points to, respecting the values of `flags`.

Parameters:

- `externalComObject`: Object to import for usage into the .NET runtime.
- `flags`: Flags used to describe the external object.

Returns: A managed object associated with the supplied external COM object.

#### Remarks

If the object cannot be created and `null` is returned, the call to `GetOrCreateObjectForComInstance` will throw a `ArgumentNullException`.

## ComWrappers.CreateObject(IntPtr, CreateObjectFlags, Object, CreatedWrapperFlags) method

```csharp
protected virtual object? CreateObject (IntPtr externalComObject, System.Runtime.InteropServices.CreateObjectFlags flags, object? userState, out System.Runtime.InteropServices.CreatedWrapperFlags wrapperFlags);
```

Creates a managed object for the object pointed at by `externalComObject` respecting the values of `flags`.

Parameters:

- `externalComObject`: The object to import for usage into the .NET runtime.
- `flags`: A bitwise combination of the enumeration values that describes the external object.
- `userState`: The user state provided by the call to `ComWrappers.GetOrCreateObjectForComInstance`.
- `wrapperFlags`: When this method returns, contains the flags used to describe the created wrapper object.

Returns: Returns a managed object associated with the supplied external COM object.

The default implementation throws `NotImplementedException`.

If the object can't be created and
```csharp
null
```
is returned, the call to `ComWrappers.GetOrCreateObjectForComInstance` will throw an `ArgumentNullException`.

## ComWrappers.GetIUnknownImpl(IntPtr, IntPtr, IntPtr) method

```csharp
public static void GetIUnknownImpl (out IntPtr fpQueryInterface, out IntPtr fpAddRef, out IntPtr fpRelease);
```

Gets the runtime-provided IUnknown implementation.

Parameters:

- `fpQueryInterface`: Function pointer to QueryInterface.
- `fpAddRef`: Function pointer to AddRef.
- `fpRelease`: Function pointer to Release.

#### Remarks

The runtime implementations of these `IUnknown` functions are all thread-safe. Each of them is optimized and strictly follows the COM rules for `IUnknown`. The `QueryInterface` implementation also respects the `ICustomQueryInterface` interface. The `ICustomQueryInterface` interface will never have an opportunity to override interfaces that the runtime provides. For example, by default the runtime provides the  `IUnknown` interface and, optionally, the Reference Tracker `IReferenceTrackerTarget` interface.

## ComWrappers.GetOrCreateComInterfaceForObject(Object, CreateComInterfaceFlags) method

```csharp
public IntPtr GetOrCreateComInterfaceForObject (object instance, System.Runtime.InteropServices.CreateComInterfaceFlags flags);
```

Creates a COM representation of the supplied object that can be passed to a non-managed environment.

Parameters:

- `instance`: The managed object to expose outside the .NET runtime.
- `flags`: Flags used to configure the generated interface.

Returns: The generated COM interface, as a pointer to the
```csharp
IUnknown
```
interface implementation, that can be passed outside the .NET runtime.

#### Remarks

If a COM representation was previously created for the specified `instance` using this `ComWrappers` instance, the previously created COM interface will be returned. If not, a new one will be created.

## ComWrappers.GetOrCreateObjectForComInstance(IntPtr, CreateObjectFlags) method

```csharp
public object GetOrCreateObjectForComInstance (IntPtr externalComObject, System.Runtime.InteropServices.CreateObjectFlags flags);
```

Gets the currently registered managed object or creates a new managed object and registers it.

Parameters:

- `externalComObject`: Object to import for usage into the .NET runtime.
- `flags`: Flags used to describe the external object.

Returns: A managed object associated with the supplied external COM object.

#### Remarks

If a managed object was previously created for the specified `externalComObject` using this `ComWrappers` instance, the previously created object will be returned. If not, a new one will be created.

## ComWrappers.GetOrCreateObjectForComInstance(IntPtr, CreateObjectFlags, Object) method

```csharp
public object GetOrCreateObjectForComInstance (IntPtr externalComObject, System.Runtime.InteropServices.CreateObjectFlags flags, object? userState);
```

Gets the currently registered managed object or creates a new managed object and registers it.

Parameters:

- `externalComObject`: The object to import for usage into the .NET runtime.
- `flags`: A bitwise combination of the enumeration values that describes the external object.
- `userState`: A state object to use to help create the wrapping .NET object.

Returns: Returns a managed object associated with the supplied external COM object.

If a managed object was previously created for the specified `externalComObject` using this `ComWrappers` instance, the previously created object is returned. If not, a new one is created.

## ComWrappers.GetOrRegisterObjectForComInstance(IntPtr, CreateObjectFlags, Object) method

```csharp
public object GetOrRegisterObjectForComInstance (IntPtr externalComObject, System.Runtime.InteropServices.CreateObjectFlags flags, object wrapper);
```

Gets the currently registered managed object or uses the supplied managed object and registers it.

Parameters:

- `externalComObject`: Object to import for usage into the .NET runtime.
- `flags`: Flags used to describe the external object.
- `wrapper`: The object to use as the wrapper for the external object.

Returns: A managed object associated with the supplied external COM object.

Exceptions:

- `NotSupportedException`: The wrapper instance is already associated with an external object.

#### Remarks

If the `wrapper` instance already has an associated external object a `NotSupportedException` will be thrown.

## ComWrappers.GetOrRegisterObjectForComInstance(IntPtr, CreateObjectFlags, Object, IntPtr) method

```csharp
public object GetOrRegisterObjectForComInstance (IntPtr externalComObject, System.Runtime.InteropServices.CreateObjectFlags flags, object wrapper, IntPtr inner);
```

Get the currently registered managed object or uses the supplied managed object and registers it.

Parameters:

- `externalComObject`: Object to import for usage into the .NET runtime.
- `flags`: Flags used to describe the external object.
- `wrapper`: The `Object` to be used as the wrapper for the external object
- `inner`: Inner for COM aggregation scenarios

Returns: Returns a managed object associated with the supplied external COM object.

#### Remarks

This method override is for registering an aggregated COM instance with its associated inner. The inner
will be released when the associated wrapper is eventually freed. Note that it will be released on a thread
in an unknown apartment state. If the supplied inner is not known to be a free-threaded instance then
it is advised to not supply the inner.

If the `wrapper` instance already has an associated external object a `NotSupportedException` will be thrown.

## ComWrappers.RegisterForMarshalling(ComWrappers) method

```csharp
public static void RegisterForMarshalling (System.Runtime.InteropServices.ComWrappers instance);
```

Registers a `ComWrappers` instance to be used as the global instance for marshalling in the runtime.

Parameters:

- `instance`: The instance to register.

Exceptions:

- `InvalidOperationException`: The method was called more than once.

#### Remarks

This function can only be called a single time. Subsequent calls to this function will result in a `InvalidOperationException` being thrown.
Scenarios where this global instance may be used are:
* Usage of COM-related Marshal APIs
* P/Invokes with COM-related types
* COM activation

## ComWrappers.RegisterForTrackerSupport(ComWrappers) method

```csharp
public static void RegisterForTrackerSupport (System.Runtime.InteropServices.ComWrappers instance);
```

Registers a `ComWrappers` instance to be used as the global instance for reference tracker support.

Parameters:

- `instance`: The instance to register.

Exceptions:

- `InvalidOperationException`: The method was called more than once.

#### Remarks

This function can only be called a single time. Subsequent calls to this function will result in a `InvalidOperationException` being thrown.
Scenarios where this global instance may be used are:
* Object tracking via the `TrackerSupport` and `TrackerObject` flags.

## ComWrappers.ReleaseObjects(IEnumerable) method

```csharp
protected abstract void ReleaseObjects (System.Collections.IEnumerable objects);
```

Releases a collection of objects outside of the normal object or COM interface lifetime.

Parameters:

- `objects`: Collection of objects to release.

To be added.

## ComWrappers.TryGetComInstance(Object, IntPtr) method

```csharp
public static bool TryGetComInstance (object obj, out IntPtr unknown);
```

Determines if the specified managed object is a `ComWrappers`-created managed wrapper and if so, returns the wrapped unmanaged pointer.

Parameters:

- `obj`: The managed wrapper.
- `unknown`: The unmanaged COM object.

Returns: `true` if the wrapper was resolved to an external COM object, otherwise `false`.

If a COM object is returned, the caller is expected to call Release() on the object.
This can be done through an API like `Marshal.Release`.
Since this API is required to interact directly with the external COM object, QueryInterface(), it's important for the caller to understand the COM object may have apartment affinity. Therefore, if the current thread is not in the correct apartment or the COM object is not a proxy, this call may fail.
