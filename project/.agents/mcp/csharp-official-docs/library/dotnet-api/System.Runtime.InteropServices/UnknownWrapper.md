---
title: "UnknownWrapper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/UnknownWrapper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnknownWrapper class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class UnknownWrapper
```

Wraps objects the marshaler should marshal as a `VT_UNKNOWN`.

#### Remarks
Only applies when the managed signature of a method takes an object.

```
int MyMethod(Object o); //Managed signature  
    HRESULT MyMethod(VARIANT o); //COM signature  
    MyObject o = new MyObject();  
    MyMethod(o); //o gets passed as VARIANT VT_DISPATCH  
    MyMethod(new UnknownWrapper(o)); //o gets passed as VARIANT VT_UNKNOWN  
```

## UnknownWrapper.UnknownWrapper(Object) constructor

```csharp
public UnknownWrapper (object? obj);
```

Initializes a new instance of the `UnknownWrapper` class with the object to be wrapped.

Parameters:

- `obj`: The object being wrapped.

To be added.

## UnknownWrapper.WrappedObject property

```csharp
public object? WrappedObject { get; }
```

Gets the object contained by this wrapper.

Returns: The wrapped object.

To be added.
