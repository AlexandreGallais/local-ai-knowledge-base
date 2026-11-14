---
title: "Resolve errors and warnings that involve attribute declaration and attribute use in your code. (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/attribute-usage-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings that involve attribute declaration and attribute use in your code. (part 3 of 3)

## Imported declarations

- **CS0423**: *Since 'class' has the ComImport attribute, 'method' must be extern or abstract*
- **CS0424**: *'type': a class with the ComImport attribute cannot specify a base class*
- **CS0596**: *The Guid attribute must be specified with the ComImport attribute*
- **CS0601**: *The DllImport attribute must be specified on a method marked 'extern' that is either 'static' or an extension member*
- **CS0626**: *Method, operator, or accessor 'method' is marked external and has no attributes on it. Consider adding a DllImport attribute to specify the external implementation.*
- **CS0669**: *A class with the ComImport attribute cannot have a user-defined constructor*
- **CS0684**: *'interface' interface marked with 'CoClassAttribute' not marked with 'ComImportAttribute'*
- **CS7042**: *The DllImport attribute cannot be applied to a method that is generic or contained in a generic method or type.*
- **CS8028**: *'type': a class with the ComImport attribute cannot specify field initializers.*

Because a `System.Runtime.InteropServices.ComImportAttribute` class imports its implementation from COM, remove managed method bodies from the class. Declare the imported method `extern`, or use an `abstract` method in an abstract imported class (**CS0423**).

The following example produces **CS0423**:

```csharp
using System.Runtime.InteropServices;
[ComImport, Guid("7ab770c7-0e23-4d7a-8aa2-19bfad479829")]
class ImageProperties
{
    public void Refresh() { }
}
```

Replace the method with `public extern void Refresh();`.

Remove the base class from a class marked with `ComImport`. The imported COM implementation can't gain additional implementation from a managed base class (**CS0424**).

The following example produces **CS0424**:

```csharp
using System.Runtime.InteropServices;
class BaseClass { }
[ComImport, Guid("7ab770c7-0e23-4d7a-8aa2-19bfad479829")]
class ImageProperties : BaseClass { }
```

Change the imported declaration to `class ImageProperties { }`.

Add `System.Runtime.InteropServices.GuidAttribute` when you apply `ComImport` (**CS0596**).

The following example produces **CS0596**:

```csharp
using System.Runtime.InteropServices;
[ComImport]
class ImageProperties { }
```

Replace the attribute list with `[ComImport, Guid("00000000-0000-0000-0000-000000000001")]`. Use the GUID of the COM type that you intend to import.

Apply `System.Runtime.InteropServices.DllImportAttribute` only to an `extern` method that is `static` or an extension member. For an ordinary method declared directly in a class, add any missing `static` or `extern` modifier (**CS0601**).

The following example produces **CS0601** because the method isn't `static`:

```csharp
using System.Runtime.InteropServices;
class NativeMethods
{
    [DllImport("kernel32.dll")]
    extern int GetCurrentDirectory(int size, System.Text.StringBuilder buffer);
}
```

Add `static` to the method declaration: `static extern int GetCurrentDirectory(int size, System.Text.StringBuilder buffer);`.

Specify the external implementation with an appropriate attribute (**CS0626**). For a platform-invoke declaration, add `DllImport`. Other external implementation mechanisms can require different attributes.

The following example produces **CS0626**:

```csharp
using System.Runtime.InteropServices;
class NativeMethods
{
    public static extern void M();
}
```

For a method implemented by a native library, add `[DllImport("mydll.dll")]` to `M`, replacing `mydll.dll` with the library name.

Remove user-defined instance constructors from a class marked with `ComImport`. The COM interop layer supplies the instance constructor (**CS0669**).

The following example produces **CS0669**:

```csharp
using System.Runtime.InteropServices;
[ComImport, Guid("00000000-0000-0000-0000-000000000001")]
class ImportedClass
{
    public ImportedClass() { }
}
```

Delete `public ImportedClass() { }` to correct the class declaration.

Add `ComImport` to an interface that specifies `System.Runtime.InteropServices.CoClassAttribute` (**CS0684**).

The following example produces **CS0684**:

```csharp
using System.Runtime.InteropServices;
[CoClass(typeof(Implementation)), Guid("00000000-0000-0000-0000-000000000001")]
interface IImported { }
class Implementation : IImported { }
```

Add `ComImport` to the interface's attribute list: `[CoClass(typeof(Implementation)), ComImport, Guid("00000000-0000-0000-0000-000000000001")]`.

Move `DllImport` declarations into a nongeneric type, place them outside generic methods, and remove any type parameters from the imported method (**CS7042**). A type nested in a generic type is also a generic context. Call the nongeneric import from your generic code instead.

The following example produces **CS7042**:

```csharp
using System.Runtime.InteropServices;
class NativeMethods<T>
{
    [DllImport("native.dll")]
    public static extern void Run();
}
```

Change `class NativeMethods<T>` to `class NativeMethods`.

Remove instance and static field initializers that require runtime initialization from a `ComImport` class (**CS8028**). Don't move the initialization into a managed instance constructor, because the imported class can't declare one (**CS0669**).

The following example produces **CS8028**:

```csharp
using System.Runtime.InteropServices;
[ComImport, Guid("00000000-0000-0000-0000-000000000001")]
public class ImportedClass
{
    public int Value = 1;
}
```

Change the field declaration to `public int Value;`. Any required initialization belongs in the COM implementation or the code that uses it, not in the imported class declaration.

For more information, see the `extern` modifier, Platform invoke, and External methods in the C# language specification.

## Marshaling attribute validity

- **CS0036**: *An out parameter cannot have the In attribute*
- **CS0662**: *Cannot specify the Out attribute on a ref parameter without also specifying the In attribute.*
- **CS7045**: *Parameter not valid for the specified unmanaged type.*
- **CS7054**: *Unmanaged type 'type' not valid for fields.*
- **CS7055**: *Unmanaged type 'type' is only valid for fields.*
- **CS8355**: *An in parameter cannot have the Out attribute.*

Remove `System.Runtime.InteropServices.InAttribute` from an out parameter (**CS0036**).

The following example produces **CS0036**:

```csharp
using System.Runtime.InteropServices;
class Example
{
    static void GetValue([In] out char value) => value = 'b';
}
```

To correct the declaration, change `[In] out char value` to `out char value`.

For a `ref` parameter, either apply both `In` and `System.Runtime.InteropServices.OutAttribute`, or apply neither attribute (**CS0662**).

The following example produces **CS0662**:

```csharp
using System.Runtime.InteropServices;
interface IExample
{
    void Update([Out] ref int value);
}
```

Change the parameter to `[In, Out] ref int value` or `ref int value`.

Match each `System.Runtime.InteropServices.MarshalAsAttribute` named argument to the selected `System.Runtime.InteropServices.UnmanagedType` (**CS7045**). These restrictions differ by unmanaged type:

- For `SafeArray`, remove `ArraySubType`, `SizeConst`, and `SizeParamIndex`. Use `SafeArraySubType` to specify the SAFEARRAY element variant.
- For `ByValArray`, remove `SizeParamIndex` and `SafeArraySubType`. Use `SizeConst` to specify the number of elements in the inline array.
- For `ByValTStr`, remove `ArraySubType` and `SizeParamIndex`. Use `SizeConst` to specify the inline string buffer size.

The following example produces **CS7045**:

```csharp
using System.Runtime.InteropServices;
interface IExample
{
    void Read([MarshalAs(UnmanagedType.SafeArray, SizeConst = 4)] int[] values);
}
```

Remove `SizeConst = 4` from the attribute. A SAFEARRAY carries its own size information; `SizeConst` isn't valid for this representation.

Select a field-compatible unmanaged representation instead of the obsolete `VBByRefStr` (**CS7054**). This diagnostic specifically rejects `VBByRefStr` on fields; compiler acceptance on a parameter or return target doesn't establish runtime support.

The following example produces **CS7054**, along with an obsolete-member warning:

```csharp
using System.Runtime.InteropServices;
public class NativeRecord
{
    [MarshalAs(UnmanagedType.VBByRefStr)]
    public string Text = "";
}
```

If the native field is a pointer to a UTF-16 string, replace `UnmanagedType.VBByRefStr` with `UnmanagedType.LPWStr`. Choose the replacement to match the native field's actual representation.

Use `ByValArray` and `ByValTStr` only on fields (**CS7055**). Both represent inline storage in a containing type, so neither is valid on a parameter or a return value. Keep these attributes on the corresponding field with an appropriate `SizeConst`, or select a different representation for the parameter or return value.

The following example produces **CS7055**:

```csharp
using System.Runtime.InteropServices;
interface IExample
{
    void Read([MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)] int[] values);
}
```

If the native parameter is a pointer to an array of four elements, replace `UnmanagedType.ByValArray` with `UnmanagedType.LPArray`. An inline array field and a pointer parameter have different native layouts.

To keep a parameter read-only, remove `Out` from the `in` parameter. The attribute's outbound marshaling direction conflicts with the parameter's `in` modifier (**CS8355**).

The following example produces **CS8355**:

```csharp
using System.Runtime.InteropServices;
class Example
{
    public static void Read([Out] in int value) { }
}
```

Change the parameter to `in int value`.

For more information, see Type marshalling, Default marshalling behavior, and Reference parameters.
