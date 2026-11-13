---
title: "Default Marshalling Behavior (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/default-marshalling-behavior.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default Marshalling Behavior (part 2 of 2)

## Default marshalling for value types

 Most value types, such as integers and floating-point numbers, are blittable and do not require marshalling. Other non-blittable types have dissimilar representations in managed and unmanaged memory and do require marshalling. Still other types require explicit formatting across the interoperation boundary.

 This section provides information on the following formatted value types:

- Value Types Used in Platform Invoke

- Value Types Used in COM Interop

 In addition to describing formatted types, this topic identifies System Value Types that have unusual marshalling behavior.

 A formatted type is a complex type that contains information that explicitly controls the layout of its members in memory. The member layout information is provided using the `System.Runtime.InteropServices.StructLayoutAttribute` attribute. The layout can be one of the following `System.Runtime.InteropServices.LayoutKind` enumeration values:

- **LayoutKind.Auto**

     Indicates that the common language runtime is free to reorder the members of the type for efficiency. However, when a value type is passed to unmanaged code, the layout of the members is predictable. An attempt to marshal such a structure automatically causes an exception.

- **LayoutKind.Sequential**

     Indicates that the members of the type are to be laid out in unmanaged memory in the same order in which they appear in the managed type definition.

- **LayoutKind.Explicit**

     Indicates that the members are laid out according to the `System.Runtime.InteropServices.FieldOffsetAttribute` supplied with each field.

### Value Types Used in Platform Invoke

 In the following example the `Point` and `Rect` types provide member layout information using the **StructLayoutAttribute**.

```vb
Imports System.Runtime.InteropServices
<StructLayout(LayoutKind.Sequential)> Public Structure Point
   Public x As Integer
   Public y As Integer
End Structure
<StructLayout(LayoutKind.Explicit)> Public Structure Rect
   <FieldOffset(0)> Public left As Integer
   <FieldOffset(4)> Public top As Integer
   <FieldOffset(8)> Public right As Integer
   <FieldOffset(12)> Public bottom As Integer
End Structure
```

```csharp
using System.Runtime.InteropServices;
[StructLayout(LayoutKind.Sequential)]
public struct Point {
   public int x;
   public int y;
}

[StructLayout(LayoutKind.Explicit)]
public struct Rect {
   [FieldOffset(0)] public int left;
   [FieldOffset(4)] public int top;
   [FieldOffset(8)] public int right;
   [FieldOffset(12)] public int bottom;
}
```

 When marshalled to unmanaged code, these formatted types are marshalled as C-style structures. This provides an easy way of calling an unmanaged API that has structure arguments. For example, the `POINT` and `RECT` structures can be passed to the Microsoft Windows API `PtInRect` function as follows:

```cpp
BOOL PtInRect(const RECT *lprc, POINT pt);
```

 You can pass structures using the following platform invoke definition:

```vb
Friend Class NativeMethods
    Friend Declare Auto Function PtInRect Lib "User32.dll" (
        ByRef r As Rect, p As Point) As Boolean
End Class
```

```csharp
internal static class NativeMethods
{
   [DllImport("User32.dll")]
   internal static extern bool PtInRect(ref Rect r, Point p);
}
```

 The `Rect` value type must be passed by reference because the unmanaged API is expecting a pointer to a `RECT` to be passed to the function. The `Point` value type is passed by value because the unmanaged API expects the `POINT` to be passed on the stack. This subtle difference is very important. References are passed to unmanaged code as pointers. Values are passed to unmanaged code on the stack.

> **Note:**
> When a formatted type is marshalled as a structure, only the fields within the type are accessible. If the type has methods, properties, or events, they are inaccessible from unmanaged code.

 Classes can also be marshalled to unmanaged code as C-style structures, provided they have fixed member layout. The member layout information for a class is also provided with the `System.Runtime.InteropServices.StructLayoutAttribute` attribute. The main difference between value types with fixed layout and classes with fixed layout is the way in which they are marshalled to unmanaged code. Value types are passed by value (on the stack) and consequently any changes made to the members of the type by the callee are not seen by the caller. Reference types are passed by reference (a reference to the type is passed on the stack); consequently, all changes made to blittable-type members of a type by the callee are seen by the caller.

> **Note:**
> If a reference type has members of non-blittable types, conversion is required twice: the first time when an argument is passed to the unmanaged side and the second time on return from the call. Due to this added overhead, In/Out parameters must be explicitly applied to an argument if the caller wants to see changes made by the callee.

 In the following example, the `SystemTime` class has sequential member layout and can be passed to the Windows API `GetSystemTime` function.

```vb
<StructLayout(LayoutKind.Sequential)> Public Class SystemTime
   Public wYear As System.UInt16
   Public wMonth As System.UInt16
   Public wDayOfWeek As System.UInt16
   Public wDay As System.UInt16
   Public wHour As System.UInt16
   Public wMinute As System.UInt16
   Public wSecond As System.UInt16
   Public wMilliseconds As System.UInt16
End Class
```

```csharp
[StructLayout(LayoutKind.Sequential)]
   public class SystemTime {
   public ushort wYear;
   public ushort wMonth;
   public ushort wDayOfWeek;
   public ushort wDay;
   public ushort wHour;
   public ushort wMinute;
   public ushort wSecond;
   public ushort wMilliseconds;
}
```

 The `GetSystemTime` function is defined as follows:

```cpp
void GetSystemTime(SYSTEMTIME* SystemTime);
```

 The equivalent platform invoke definition for `GetSystemTime` is as follows:

```vb
Friend Class NativeMethods
    Friend Declare Auto Sub GetSystemTime Lib "Kernel32.dll" (
        ByVal sysTime As SystemTime)
End Class
```

```csharp
internal static class NativeMethods
{
   [DllImport("Kernel32.dll", CharSet = CharSet.Auto)]
   internal static extern void GetSystemTime(SystemTime st);
}
```

 Notice that the `SystemTime` argument is not typed as a reference argument because `SystemTime` is a class, not a value type. Unlike value types, classes are always passed by reference.

 The following code example shows a different `Point` class that has a method called `SetXY`. Because the type has sequential layout, it can be passed to unmanaged code and marshalled as a structure. However, the `SetXY` member is not callable from unmanaged code, even though the object is passed by reference.

```vb
<StructLayout(LayoutKind.Sequential)> Public Class Point
   Private x, y As Integer
   Public Sub SetXY(x As Integer, y As Integer)
      Me.x = x
      Me.y = y
   End Sub
End Class
```

```csharp
[StructLayout(LayoutKind.Sequential)]
public class Point {
   int x, y;
   public void SetXY(int x, int y){
      this.x = x;
      this.y = y;
   }
}
```

### Value Types Used in COM Interop

 Formatted types can also be passed to COM interop method calls. In fact, when exported to a type library, value types are automatically converted to structures. As the following example shows, the `Point` value type becomes a type definition (typedef) with the name `Point`. All references to the `Point` value type elsewhere in the type library are replaced with the `Point` typedef.

 **Type library representation**

```cpp
typedef struct tagPoint {
   int x;
   int y;
} Point;
interface _Graphics {
   …
   HRESULT SetPoint ([in] Point p)
   HRESULT SetPointRef ([in,out] Point *p)
   HRESULT GetPoint ([out,retval] Point *p)
}
```

 The same rules used to marshal values and references to platform invoke calls are used when marshalling through COM interfaces. For example, when an instance of the `Point` value type is passed from the .NET runtime to COM, the `Point` is passed by value. If the `Point` value type is passed by reference, a pointer to a `Point` is passed on the stack. The interop marshaller does not support higher levels of indirection (**Point** \*\*) in either direction.

> **Note:**
> Structures having the `System.Runtime.InteropServices.LayoutKind` enumeration value set to `Explicit` cannot be used in COM interop because the exported type library cannot express an explicit layout.

### System Value Types

 The `System` namespace has several value types that represent the boxed form of the runtime primitive types. For example, the value type `System.Int32` structure represents the boxed form of **ELEMENT_TYPE_I4**. Instead of marshalling these types as structures, as other formatted types are, you marshal them in the same way as the primitive types they box. **System.Int32** is therefore marshalled as **ELEMENT_TYPE_I4** instead of as a structure containing a single member of type **long**. The following table contains a list of the value types in the `System` namespace that are boxed representations of primitive types.

|System value type|Element type|
|-----------------------|------------------|
|`System.Boolean`|**ELEMENT_TYPE_BOOLEAN**|
|`System.SByte`|**ELEMENT_TYPE_I1**|
|`System.Byte`|**ELEMENT_TYPE_UI1**|
|`System.Char`|**ELEMENT_TYPE_CHAR**|
|`System.Int16`|**ELEMENT_TYPE_I2**|
|`System.UInt16`|**ELEMENT_TYPE_U2**|
|`System.Int32`|**ELEMENT_TYPE_I4**|
|`System.UInt32`|**ELEMENT_TYPE_U4**|
|`System.Int64`|**ELEMENT_TYPE_I8**|
|`System.UInt64`|**ELEMENT_TYPE_U8**|
|`System.Single`|**ELEMENT_TYPE_R4**|
|`System.Double`|**ELEMENT_TYPE_R8**|
|`System.String`|**ELEMENT_TYPE_STRING**|
|`System.IntPtr`|**ELEMENT_TYPE_I**|
|`System.UIntPtr`|**ELEMENT_TYPE_U**|

 Some other value types in the `System` namespace are handled differently. Because the unmanaged code already has well-established formats for these types, the marshaller has special rules for marshalling them. The following table lists the special value types in the `System` namespace, as well as the unmanaged type they are marshalled to.

|System value type|IDL type|
|-----------------------|--------------|
|`System.DateTime`|**DATE**|
|`System.Decimal`|**DECIMAL**|
|`System.Guid`|**GUID**|
|`System.Drawing.Color`|**OLE_COLOR**|

 The following code shows the definition of the unmanaged types **DATE**, **GUID**, **DECIMAL**, and `OLE_COLOR` in the Stdole2 type library.

#### Type library representation

```cpp
typedef double DATE;
typedef DWORD OLE_COLOR;

typedef struct tagDEC {
    USHORT    wReserved;
    BYTE      scale;
    BYTE      sign;
    ULONG     Hi32;
    ULONGLONG Lo64;
} DECIMAL;

typedef struct tagGUID {
    DWORD Data1;
    WORD  Data2;
    WORD  Data3;
    BYTE  Data4[ 8 ];
} GUID;
```

 The following code shows the corresponding definitions in the managed `IValueTypes` interface.

```vb
Public Interface IValueTypes
   Sub M1(d As System.DateTime)
   Sub M2(d As System.Guid)
   Sub M3(d As System.Decimal)
   Sub M4(d As System.Drawing.Color)
End Interface
```

```csharp
public interface IValueTypes {
   void M1(System.DateTime d);
   void M2(System.Guid d);
   void M3(System.Decimal d);
   void M4(System.Drawing.Color d);
}
```

#### Type library representation

```cpp
[…]
interface IValueTypes : IDispatch {
   HRESULT M1([in] DATE d);
   HRESULT M2([in] GUID d);
   HRESULT M3([in] DECIMAL d);
   HRESULT M4([in] OLE_COLOR d);
};
```

## See also

- Blittable and Non-Blittable Types
- Copying and Pinning
- Default Marshalling for Arrays
- Default Marshalling for Objects
- Default Marshalling for Strings
