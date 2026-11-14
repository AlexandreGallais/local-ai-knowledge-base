---
title: "ErrorWrapper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ErrorWrapper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ErrorWrapper class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ErrorWrapper
```

Wraps objects the marshaler should marshal as a `VT_ERROR`.

#### Remarks
By default, `Object` type arguments are marshaled as a `VARIANT` type, where the object type determines the `VARTYPE` value of the `VARIANT`.

The `ErrorWrapper` type must to be passed as an `Object` type to be marshaled as a `VARIANT` of type `VT_ERROR`, otherwise the `ErrorWrapper` type is marshaled as an integer.

The following table illustrates marshaling in a managed call to a native function, using platform invoke.

|Managed signature parameter|pArr value|Marshaled as|
|---------------------------------|----------------|------------------|
|ErrorWrapper[] pArr|ErrorWrapper[10] of ErrorWrapper(77)|`Int[10]`|
|Object[] pArr|ErrorWrapper[10] of ErrorWrapper(77)|`VARIANT[10]` of `VT_ERROR`|
|Object[] pArr|Object[10] of ErrorWrapper(77)|`VARIANT[10]` of `VT_ERROR`|

The following table illustrates marshaling data in a managed call to a native function, using COM runtime callable wrappers (RCW).

|Managed signature parameter|pArr value|Marshaled as|
|---------------------------------|----------------|------------------|
|ErrorWrapper[] pArr|ErrorWrapper[10] of ErrorWrapper(77)|`Int[10]`|
|Object[] pArr|ErrorWrapper[10] of ErrorWrapper(77)|`SafeArrayTypeMismatch` exception|
|Object[] pArr|Object[10] of ErrorWrapper(77)|`SAFEARRAY(VARIANT)`|

Note that `ErrorWrapper` objects are not marshaled as type `VT_ERROR` after they are passed back from COM.  A single value is marshaled back from COM as type `VT_I4`, while arrays are marshaled back from COM as type `VT_UI4`.

For more information on `VT_ERROR`, please see the existing documentation for `VARENUM::VT_ERROR` in the MSDN library.

#### Examples
The following code example first demonstrates a lone `Int32` object marshaled back from COM as an `Int32` object. It then demonstrates an `Int32` array marshaled back from COM as a `UInt32` array.

```
// Scenario 1:  
// Pass a single value.  
Int32 x = 3;  
Object o = new ErrorWrapper(x);  
// Pass 'o' to COM.  
// On the return trip, 'o' has been unwrapped and is still an Int32 object.  
Int32 y = (Int32)o;  
Scenario 2:  
// Pass an array of values.  
Int32[] arr = new Int32[3];  
Object o = new ErrorWrapper(arr);  
// Pass 'o' to COM.  
// On the return trip, 'o' has been unwrapped and is now a UInt32[] array.  
UInt32[ ] arr2 = (UInt32[])o;  
```

## ErrorWrapper.ErrorWrapper(Exception) constructor

```csharp
public ErrorWrapper (Exception e);
```

Initializes a new instance of the `ErrorWrapper` class with the HRESULT that corresponds to the exception supplied.

Parameters:

- `e`: The exception to be converted to an error code.

To be added.

## ErrorWrapper.ErrorWrapper(Int32) constructor

```csharp
public ErrorWrapper (int errorCode);
```

Initializes a new instance of the `ErrorWrapper` class with the HRESULT of the error.

Parameters:

- `errorCode`: The HRESULT of the error.

To be added.

## ErrorWrapper.ErrorWrapper(Object) constructor

```csharp
public ErrorWrapper (object errorCode);
```

Initializes a new instance of the `ErrorWrapper` class with an object containing the HRESULT of the error.

Parameters:

- `errorCode`: The object containing the HRESULT of the error.

Exceptions:

- `ArgumentException`: The `errorCode` parameter is not an `Int32` type.

To be added.

## ErrorWrapper.ErrorCode property

```csharp
public int ErrorCode { get; }
```

Gets the error code of the wrapper.

Returns: The HRESULT of the error.

To be added.
