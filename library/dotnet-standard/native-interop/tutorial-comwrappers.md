---
title: "Using the ComWrappers API (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/tutorial-comwrappers.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Use the `ComWrappers` API

In this tutorial, you'll learn how to properly subclass the `ComWrappers` type to provide an optimized and AOT-friendly COM interop solution. Before starting this tutorial, you should be familiar with COM, its architecture, and existing COM interop solutions.

In this tutorial, you'll implement the following interface definitions. These interfaces and their implementations will demonstrate:

- Marshalling and unmarshalling types across the COM/.NET boundary.
- Two distinct approaches to consuming native COM objects in .NET.
- A recommended pattern for enabling custom COM interop in .NET 5 and beyond.

All source code used in this tutorial is available in the dotnet/samples repository.

> **Note:**
> In the .NET 8 SDK and later versions, a source generator is provided to automatically generate a `ComWrappers` API implementation for you. For more information, see `ComWrappers` source generation.

**C# definitions**

```csharp
interface IDemoGetType
{
    string? GetString();
}

interface IDemoStoreType
{
    void StoreString(int len, string? str);
}
```

**Win32 C++ definitions**

```cpp
MIDL_INTERFACE("92BAA992-DB5A-4ADD-977B-B22838EE91FD")
IDemoGetType : public IUnknown
{
    HRESULT STDMETHODCALLTYPE GetString(_Outptr_ wchar_t** str) = 0;
};

MIDL_INTERFACE("30619FEA-E995-41EA-8C8B-9A610D32ADCB")
IDemoStoreType : public IUnknown
{
    HRESULT STDMETHODCALLTYPE StoreString(int len, _In_z_ const wchar_t* str) = 0;
};
```

## Overview of the `ComWrappers` design

The `ComWrappers` API was designed to provide the minimal interaction needed to accomplish COM interop with the .NET 5+ runtime. This means that many of the niceties that exist with the built-in COM interop system are not present and must be built up from basic building blocks. The two primary responsibilities of the API are:

- Efficient object identification (for example, mapping between an `IUnknown*` instance and a managed object).
- Garbage Collector (GC) interaction.

These efficiencies are accomplished by requiring wrapper creation and acquisition to go through the `ComWrappers` API.

Since the `ComWrappers` API has so few responsibilities, it stands to reason that most of the interop work should be handled by the consumer – this is true. However, the additional work is largely mechanical and can be performed by a source-generation solution. As an example, the C#/WinRT tool chain is a source-generation solution that's built on top of `ComWrappers` to provide WinRT interop support.
