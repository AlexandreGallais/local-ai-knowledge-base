---
title: "Marshal class (part 6 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 6 of 13)

## Marshal.GetObjectForNativeVariant(IntPtr) method

```csharp
public static object? GetObjectForNativeVariant (IntPtr pSrcNativeVariant);
```

Converts a COM VARIANT to an object.

Parameters:

- `pSrcNativeVariant`: A pointer to a COM VARIANT.

Returns: An object that corresponds to the `pSrcNativeVariant` parameter.

Exceptions:

- `InvalidOleVariantTypeException`: `pSrcNativeVariant` is not a valid VARIANT type.
- `NotSupportedException`: `pSrcNativeVariant` has an unsupported type.

#### Remarks
`Marshal.GetObjectForNativeVariant` returns a managed object that corresponds to a raw pointer to an unmanaged VARIANT type. The interopmarshaler performs the identical transformation when exposing a VARIANT type to managed code.

`Marshal.GetObjectForNativeVariant` provides the opposite functionality of `Marshal.GetNativeVariantForObject`.

When the VARIANT type is VT_ERROR, `Marshal.GetObjectForNativeVariant` returns an object of type `Int32` instead of `UInt32`.

## Marshal.GetObjectForNativeVariant<T>(IntPtr) method

```csharp
public static T? GetObjectForNativeVariant<T> (IntPtr pSrcNativeVariant);
```

Converts a COM VARIANT to an object of a specified type.

Parameters:

- `T`: The type to which to convert the COM VARIANT.
- `pSrcNativeVariant`: A pointer to a COM VARIANT.

Returns: An object of the specified type that corresponds to the `pSrcNativeVariant` parameter.

Exceptions:

- `InvalidOleVariantTypeException`: `pSrcNativeVariant` is not a valid VARIANT type.
- `NotSupportedException`: `pSrcNativeVariant` has an unsupported type.

#### Remarks
`GetObjectForNativeVariant<T>` returns a managed object of type `T` that corresponds to a raw pointer to an unmanaged VARIANT type. The interopmarshaler performs the identical transformation when exposing a VARIANT type to managed code.

`GetObjectForNativeVariant<T>` provides the opposite functionality of `GetNativeVariantForObject<T>`.

## Marshal.GetObjectsForNativeVariants(IntPtr, Int32) method

```csharp
public static object?[] GetObjectsForNativeVariants (IntPtr aSrcNativeVariant, int cVars);
```

Converts an array of COM VARIANTs to an array of objects.

Parameters:

- `aSrcNativeVariant`: A pointer to the first element of an array of COM VARIANTs.
- `cVars`: The count of COM VARIANTs in `aSrcNativeVariant`.

Returns: An object array that corresponds to `aSrcNativeVariant`.

Exceptions:

- `ArgumentOutOfRangeException`: `cVars` is a negative number.

#### Remarks
`Marshal.GetObjectsForNativeVariants` returns an array of managed objects that corresponds to a raw pointer to a C-style array of unmanaged VARIANT types. The interopmarshaler performs the identical transformation when exposing a VARIANT type to managed code. The method returns an empty array when the `cVars` parameter is 0.

The object array (the return value) gets garbage collected as usual. The unmanaged input array or individual VARIANTs in the input array are not freed. Therefore it is your responsibility to free them as appropriate.

## Marshal.GetObjectsForNativeVariants<T>(IntPtr, Int32) method

```csharp
public static T[] GetObjectsForNativeVariants<T> (IntPtr aSrcNativeVariant, int cVars);
```

Converts an array of COM VARIANTs to an array of a specified type.

Parameters:

- `T`: The type of the array to return.
- `aSrcNativeVariant`: A pointer to the first element of an array of COM VARIANTs.
- `cVars`: The count of COM VARIANTs in `aSrcNativeVariant`.

Returns: An array of `T` objects that corresponds to `aSrcNativeVariant`.

Exceptions:

- `ArgumentOutOfRangeException`: `cVars` is a negative number.

#### Remarks
`GetObjectsForNativeVariants<T>` returns an array of `T` that corresponds to a raw pointer to a C-style array of unmanaged VARIANT types. The interopmarshaler performs the identical transformation when exposing a VARIANT type to managed code. The method returns an empty array when the `cVars` parameter is 0.

The returned array is garbage-collected as usual. The unmanaged input array or individual VARIANTs in the input array are not freed. Therefore, it is your responsibility to free them as appropriate.

## Marshal.GetPInvokeErrorMessage(Int32) method

```csharp
public static string GetPInvokeErrorMessage (int error);
```

Gets the system error message for the supplied error code.

Parameters:

- `error`: The error code.

Returns: The error message associated with `error`.

To be added.

## Marshal.GetStartComSlot(Type) method

```csharp
public static int GetStartComSlot (Type t);
```

Gets the first slot in the virtual function table (v-table or VTBL) that contains user-defined methods.

Parameters:

- `t`: A type that represents an interface or a class.

Returns: The first VTBL slot that contains user-defined methods. The first slot is 3 if the interface is based on IUnknown, and 7 if the interface is based on IDispatch.

Exceptions:

- `ArgumentException`: `t` is not visible from COM.

#### Remarks
This method returns the zero-based v-table number for an interface or a class. When used on a class, the slot number that is returned refers to the class interface for the class. If the class interface is auto-dispatch, this method always returns -1 to indicate that the dispatch-only interface does not expose a v-table to managed clients. You can use `Marshal.GetStartComSlot` and `Marshal.GetEndComSlot` in conjunction with `Marshal.GetMethodInfoForComSlot` to pass slots within a specified range. For additional information, see Introducing the class interface.

## Marshal.GetTypedObjectForIUnknown(IntPtr, Type) method

```csharp
public static object GetTypedObjectForIUnknown (IntPtr pUnk, Type t);
```

Returns a managed object of a specified type that represents a COM object.

Parameters:

- `pUnk`: A pointer to the `IUnknown` interface of the unmanaged object.
- `t`: The type of the requested managed class.

Returns: An instance of the class corresponding to the `Type` object that represents the requested unmanaged COM object.

Exceptions:

- `ArgumentException`: `t` is not attributed with `ComImportAttribute`.

-or-

`t` is a Windows Runtime type.

#### Remarks
The `t` parameter must be either a COM-imported type or a subtype of a COM-imported type. In addition, `t` must be a type whose metadata was imported by the Tlbimp.exe (Type Library Importer) tool. This type must be a class and not an associated coclass interface, which carries the name of the COM class. For example, if Tlbimp.exe imports `Myclass` as a class called `MyclassClass` and as a coclass interface called `Myclass`, you must use `MyclassClass` (not `Myclass`) with this method.

If an object has already been obtained for the `pUnk` parameter, `t` is ignored and the existing object is returned. `pUnk` represents an IUnknown interface pointer; however, because all COM interfaces derive directly or indirectly from `IUnknown`, you can pass any COM interface to this method. The object returned by `Marshal.GetTypedObjectForIUnknown` is a Runtime Callable Wrapper (RCW), which the common language runtime manages as it does any other managed object.

## Marshal.GetTypeFromCLSID(Guid) method

```csharp
public static Type? GetTypeFromCLSID (Guid clsid);
```

Returns the type associated with the specified class identifier (CLSID).

Parameters:

- `clsid`: The CLSID of the type to return.

Returns: `System.__ComObject` regardless of whether the CLSID is valid.

To be added.

## Marshal.GetTypeInfoName(ITypeInfo) method

```csharp
public static string GetTypeInfoName (System.Runtime.InteropServices.ComTypes.ITypeInfo typeInfo);
```

Retrieves the name of the type represented by an ITypeInfo object.

Parameters:

- `typeInfo`: An object that represents an `ITypeInfo` pointer.

Returns: The name of the type that the `typeInfo` parameter points to.

Exceptions:

- `ArgumentNullException`: The `typeInfo` parameter is `null`.

#### Remarks
You can also retrieve the name of the type represented by an `ITypeInfo` by calling the `UCOMITypeInfo.GetDocumentation` method and passing -1 for its first parameter.

## Marshal.GetUniqueObjectForIUnknown(IntPtr) method

```csharp
public static object GetUniqueObjectForIUnknown (IntPtr unknown);
```

Creates a unique Runtime Callable Wrapper (RCW) object for a given IUnknown interface.

Parameters:

- `unknown`: A managed pointer to an `IUnknown` interface.

Returns: A unique RCW for the specified `IUnknown` interface.

#### Remarks
The `Marshal.GetUniqueObjectForIUnknown` method ensures that you receive a unique RCW, because it does not match an `IUnknown` pointer to an existing object. Use this method when you have to create a unique RCW that is not impacted by other code that calls the `Marshal.ReleaseComObject` method.

## Marshal.InitHandle(SafeHandle, IntPtr) method

```csharp
public static void InitHandle (System.Runtime.InteropServices.SafeHandle safeHandle, IntPtr handle);
```

Initializes the underlying handle of a newly created `SafeHandle` to the provided value.

Parameters:

- `safeHandle`: `SafeHandle` instance to update
- `handle`: Pre-existing handle

To be added.

## Marshal.IsComObject(Object) method

```csharp
public static bool IsComObject (object o);
```

Indicates whether a specified object represents a COM object.

Parameters:

- `o`: The object to check.

Returns: `true` if the `o` parameter is a COM type; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `o` is `null`.

#### Remarks
`Marshal.IsComObject` returns `true` if the class type of the instance is attributed with `ComImportAttribute` or if it derives directly or indirectly from a class attributed with `ComImportAttribute`. The Tlbimp.exe (Type Library Importer) tool applies this attribute for you when it imports a type library.

Two other methods also determine whether a specified object represents a COM object, but the requirements for returning `true` differ from this method's requirements. `Type.IsImport` returns `true` if the class (or interface) is attributed with `ComImportAttribute` directly; it does not return `true` for derived types. `RegistrationServices.TypeRepresentsComType` returns `true` if the type is attributed with `ComImportAttribute` or derives from a type with the same GUID.

## Marshal.IsTypeVisibleFromCom(Type) method

```csharp
public static bool IsTypeVisibleFromCom (Type t);
```

Indicates whether a type is visible to COM clients.

Parameters:

- `t`: The type to check for COM visibility.

Returns: `true` if the type is visible to COM; otherwise, `false`.

#### Remarks
`Marshal.IsTypeVisibleFromCom` enables you to check for COM visibility in one step. Types that are not visible cannot be used from COM. A type is visible if it is `public` and not hidden with the `ComVisibleAttribute`.

## Marshal.OffsetOf(Type, String) method

```csharp
public static IntPtr OffsetOf (Type t, string fieldName);
```

Returns the field offset of the unmanaged form of the managed class.

Parameters:

- `t`: A value type or formatted reference type that specifies the managed class. You must apply the `StructLayoutAttribute` to the class.
- `fieldName`: The field within the `t` parameter.

Returns: The offset, in bytes, for the `fieldName` parameter within the specified class that is declared by platform invoke.

Exceptions:

- `ArgumentException`: The class cannot be exported as a structure or the field is nonpublic.the field may be private.
- `ArgumentNullException`: The `t` parameter is `null`.

#### Remarks
`Marshal.OffsetOf` provides the offset in terms of the unmanaged structure layout, which does not necessarily correspond to the offset of the managed structure layout. Marshaling the structure can transform the layout and alter the offset. The `t` parameter can be a value type or a formatted reference type (with either a sequential or explicit layout). You can obtain the size of the entire layout by using the `Marshal.SizeOf` method.

> **Note:**
> `Marshal.OffsetOf` may expose private fields.

## Marshal.OffsetOf<T>(String) method

```csharp
public static IntPtr OffsetOf<T> (string fieldName);
```

Returns the field offset of the unmanaged form of a specified managed class.

Parameters:

- `T`: A managed value type or formatted reference type. You must apply the `StructLayoutAttribute` attribute to the class.
- `fieldName`: The name of the field in the `T` type.

Returns: The offset, in bytes, for the `fieldName` parameter within the specified class that is declared by platform invoke.

#### Remarks
`OffsetOf<T>` provides the offset in terms of the unmanaged structure layout, which does not necessarily correspond to the offset of the managed structure layout. Marshaling the structure can transform the layout and alter the offset. The `T` generic type parameter can be a value type or a formatted reference type (with either a sequential or explicit layout). You can obtain the size of the entire layout by using the `SizeOf<T>` method.

> **Note:**
> `Marshal.OffsetOf` may expose private fields.

## Marshal.Prelink(MethodInfo) method

```csharp
public static void Prelink (System.Reflection.MethodInfo m);
```

Executes one-time method setup tasks without calling the method.

Parameters:

- `m`: The method to be checked.

Exceptions:

- `ArgumentNullException`: The `m` parameter is `null`.
- `ArgumentException`: The `m` parameter is not a `MethodInfo` object.

#### Remarks
Setup tasks provide early initialization and are performed automatically when the target method is invoked. First-time tasks include the following:

- Verifying that the platform invoke metadata is correctly formatted.

- Verifying that all the managed types are valid parameters of platform invoke functions.

- Locating and loading the unmanaged DLL into the process.

- Locating the entry point in the process.

Calling `Marshal.Prelink` on a method outside of platform invoke has no effect. To execute setup tasks on all platform invoke methods in a type, use `Marshal.PrelinkAll`.

## Marshal.PrelinkAll(Type) method

```csharp
public static void PrelinkAll (Type c);
```

Performs a pre-link check for all methods on a class.

Parameters:

- `c`: The class whose methods are to be checked.

Exceptions:

- `ArgumentNullException`: The `c` parameter is `null`.

#### Remarks
The `Marshal.PrelinkAll` method invokes `Marshal.Prelink` on every method for a given type. `Marshal.Prelink` executes one-time method setup tasks without calling each method. You can use `Marshal.PrelinkAll` only for platform invoke calls.
