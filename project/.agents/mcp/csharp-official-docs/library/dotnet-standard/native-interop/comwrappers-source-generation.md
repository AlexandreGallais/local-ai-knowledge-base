---
title: "ComWrappers source generation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/comwrappers-source-generation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Source generation for ComWrappers

.NET 8 introduces a source generator that creates an implementation of the ComWrappers API for you. The generator recognizes the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute`.

The .NET runtime's built-in (not source-generated), Windows-only, COM interop system generates an IL stub—a stream of IL instructions that's JIT-ed—at runtime to facilitate the transition from managed code to COM, and vice-versa. Since this IL stub is generated at runtime, it's incompatible with NativeAOT and IL trimming. Stub generation at runtime can also make diagnosing marshalling issues difficult.

Built-in interop uses attributes such as `ComImport` or `DllImport`, which rely on code generation at runtime. The following code shows an example of this:

```csharp
[ComImport]
interface IFoo
{
    void Method(int i);
}

[DllImport("MyComObjectProvider")]
static nint GetPointerToComInterface(); // C definition - IUnknown* GetPointerToComInterface();

[DllImport("MyComObjectProvider")]
static void GivePointerToComInterface(nint comObject); // C definition - void GivePointerToComInterface(IUnknown* pUnk);

// Use the system to create a Runtime Callable Wrapper to use in managed code
nint ptr = GetPointerToComInterface();
IFoo foo = (IFoo)Marshal.GetObjectForIUnknown(ptr);
foo.Method(0);
...
// Use the system to create a COM Callable Wrapper to pass to unmanaged code
IFoo foo = GetManagedIFoo();
nint ptr = Marshal.GetIUnknownForObject(foo);
GivePointerToComInterface(ptr);
```

The `ComWrappers` API enables interacting with COM in C# without using the built-in COM system, but requires substantial boilerplate and hand-written unsafe code. The COM interface generator automates this process and makes `ComWrappers` as easy as built-in COM, but delivers it in a trimmable and AOT-friendly manner.

## Basic usage

To use the COM interface generator, add the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute` and `System.Runtime.InteropServices.GuidAttribute` attributes on the interface definition that you want to import from or expose to COM. The type must be marked `partial` and have `internal` or `public` visibility for the generated code to be able to access it.

```csharp
[GeneratedComInterface]
[Guid("3faca0d2-e7f1-4e9c-82a6-404fd6e0aab8")]
internal partial interface IFoo
{
    void Method(int i);
}
```

Then, to expose a class that implements an interface to COM, add the `System.Runtime.InteropServices.Marshalling.GeneratedComClassAttribute` to the implementing class. This class must also be `partial` and either `internal` or `public`.

```csharp
[GeneratedComClass]
internal partial class Foo : IFoo
{
    public void Method(int i)
    {
        // Do things
    }
}
```

At compile time, the generator creates an implementation of the ComWrappers API, and you can use the `System.Runtime.InteropServices.Marshalling.StrategyBasedComWrappers` type or a custom derived type to consume or expose the COM interface.

```csharp
[LibraryImport("MyComObjectProvider")]
private static partial nint GetPointerToComInterface(); // C definition - IUnknown* GetPointerToComInterface();

[LibraryImport("MyComObjectProvider")]
private static partial void GivePointerToComInterface(nint comObject); // C definition - void GivePointerToComInterface(IUnknown* pUnk);

// Use the ComWrappers API to create a Runtime Callable Wrapper to use in managed code
ComWrappers cw = new StrategyBasedComWrappers();
nint ptr = GetPointerToComInterface();
IFoo foo = (IFoo)cw.GetOrCreateObjectForComInstance(ptr, CreateObjectFlags.None);
foo.Method(0);
...
// Use the system to create a COM Callable Wrapper to pass to unmanaged code
ComWrappers cw = new StrategyBasedComWrappers();
Foo foo = new();
nint ptr = cw.GetOrCreateComInterfaceForObject(foo, CreateComInterfaceFlags.None);
GivePointerToComInterface(ptr);
```

## Customize marshalling

The COM interface generator respects the `System.Runtime.InteropServices.Marshalling.MarshalUsingAttribute` attribute and some usages of the `System.Runtime.InteropServices.MarshalAsAttribute` attribute to customize marshalling of parameters. For more information, see how to customize source-generated marshalling with the `MarshalUsing` attribute and customize parameter marshalling with the `MarshalAs` attribute. The `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute.StringMarshalling` and `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute.StringMarshallingCustomType` properties apply to all parameters and return types of type `string` in the interface if they don't have other marshalling attributes.

## Implicit HRESULTs and PreserveSig

COM methods in C# have a different signature than the native methods. Standard COM has a return type of `HRESULT`, a 4 byte integer type representing error and success states. This `HRESULT` return value is hidden by default in the C# signature and converted to an exception when an error value is returned. The last "out" parameter of the native COM signature may optionally be converted into the return in the C# signature.

For example, the following snippets show C# method signatures and the corresponding native signature the generator infers.

```csharp
void Method1(int i);

int Method2(float i);
```

```c
HRESULT Method1(int i);

HRESULT Method2(float i, _Out_ int* returnValue);
```

If you want to handle the `HRESULT` yourself, you can use the `System.Runtime.InteropServices.PreserveSigAttribute` on the method to indicate the generator should not do this transformation. The following snippets demonstrate what native signature the generator expects when `[PreserveSig]` is applied. COM methods must return `HRESULT`, so the return value of any method with `PreserveSig` should be `int`.

```csharp
[PreserveSig]
int Method1(int i, out int j);

[PreserveSig]
int Method2(float i);
```

```c
HRESULT Method1(int i, int* j);

HRESULT Method2(float i);
```

For more information, see Implicit method signature translations in .NET interop.

## Incompatibilities and differences to built-in COM

### `IUnknown` only

The only supported interface base is `IUnknown`. Interfaces with an `System.Runtime.InteropServices.InterfaceTypeAttribute` that has a value other than `System.Runtime.InteropServices.ComInterfaceType.InterfaceIsIUnknown` are not supported in source-generated COM. Any interfaces without an `InterfaceTypeAttribute` are assumed to derive from `IUnknown`. This differs from built-in COM where the default is `System.Runtime.InteropServices.ComInterfaceType.InterfaceIsDual`.

## Marshalling defaults and support

Source-generated COM has some different default marshalling behaviors from built-in COM.

- In the built-in COM system, all types have an implicit `[In]` attribute except for arrays of blittable elements, which have implicit `[In, Out]` attributes. In source-generated COM, all types, including arrays of blittable elements, have `[In]` semantics.

- `[In]` and `[Out]` attributes are only allowed on arrays. If `[Out]` or `[In, Out]` behavior is required on other types, use the `in` and `out` parameter modifiers.

### Derived interfaces

In the built-in COM system, if you have interfaces that derive from other COM interfaces, you must declare a shadowing method for each base method on the base interfaces with the `new` keyword. For more information, see COM interface inheritance and .NET.

```csharp
[ComImport]
[Guid("3faca0d2-e7f1-4e9c-82a6-404fd6e0aab8")]
interface IBase
{
    void Method1(int i);
    void Method2(float i);
}

[ComImport]
[Guid("3faca0d2-e7f1-4e9c-82a6-404fd6e0aab8")]
interface IDerived : IBase
{
    new void Method1(int i);
    new void Method2(float f);
    void Method3(long l);
    void Method4(double d);
}
```

The COM interface generator does not expect any shadowing of base methods. To create a method that inherits from another, simply indicate the base interface as a C# base interface and add the derived interface's methods. For more information, see the design doc.

```csharp
[GeneratedComInterface]
[Guid("3faca0d2-e7f1-4e9c-82a6-404fd6e0aab8")]
interface IBase
{
    void Method1(int i);
    void Method2(float i);
}

[GeneratedComInterface]
[Guid("3faca0d2-e7f1-4e9c-82a6-404fd6e0aab8")]
interface IDerived : IBase
{
    void Method3(long l);
    void Method4(double d);
}
```

Note that an interface with the `GeneratedComInterface` attribute can only inherit from one base interface that has the `GeneratedComInterface` attribute.

#### Derived interfaces across assembly boundaries

In .NET 8, it isn't supported to define an interface with the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute` attribute that derives from a `GeneratedComInterface`-attributed interface that's defined in another assembly.

In .NET 9 and later versions, this scenario is supported with the following restrictions:

- The base interface type must be compiled targeting the same target framework as the derived type.
- The base interface type must not shadow any members of its base interface, if it has one.

Additionally, any changes to any generated virtual method offsets in the base interface chain defined in another assembly won't be accounted for in the derived interfaces until the project is rebuilt.

> **Note:**
> In .NET 9 and later versions, a warning is emitted when inheriting generated COM interfaces across assembly boundaries to inform you about the restrictions and pitfalls of using this feature. You can disable this warning to acknowledge the limitations and inherit across assembly boundaries.

### Marshal APIs

Some APIs in `System.Runtime.InteropServices.Marshal` are not compatible with source-generated COM. Replace these methods with their corresponding methods on a `ComWrappers` implementation.

## See also

- ComWrappers
- Customizing Parameter Marshalling
- Runtime Callable Wrapper
- COM Callable Wrapper
