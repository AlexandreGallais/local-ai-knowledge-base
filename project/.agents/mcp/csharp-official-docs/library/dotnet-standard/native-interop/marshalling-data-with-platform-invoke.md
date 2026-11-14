---
title: "Marshalling Data with Platform Invoke"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/marshalling-data-with-platform-invoke.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Marshalling Data with Platform Invoke

To call functions exported from an unmanaged library, a .NET application requires a function prototype in managed code that represents the unmanaged function. To create a prototype that enables platform invoke to marshal data correctly, you must do the following:

- Apply the `System.Runtime.InteropServices.DllImportAttribute` attribute to the static function or method in managed code.

- Substitute managed data types for unmanaged data types.

You can use the documentation supplied with an unmanaged function to construct an equivalent managed prototype by applying the attribute with its optional fields and substituting managed data types for unmanaged types. For instructions about how to apply the `System.Runtime.InteropServices.DllImportAttribute`, see Consuming Unmanaged DLL Functions.

This section provides samples that demonstrate how to create managed function prototypes for passing arguments to and receiving return values from functions exported by unmanaged libraries. The samples also demonstrate when to use the `System.Runtime.InteropServices.MarshalAsAttribute` attribute and the `System.Runtime.InteropServices.Marshal` class to explicitly marshal data.

## Platform invoke data types

The following table lists data types used in the Windows APIs and C-style functions. Many unmanaged libraries contain functions that pass these data types as parameters and return values. The third column lists the corresponding .NET built-in value type or class that you use in managed code. In some cases, you can substitute a type of the same size for the type listed in the table.

|Unmanaged type in Windows APIs|Unmanaged C language type|Managed type|Description|
|--------------------------------|-------------------------------|------------------------|-----------------|
|`VOID`|`void`|`System.Void`|Applied to a function that does not return a value.|
|`HANDLE`|`void *`|`System.IntPtr` or `System.UIntPtr`|32 bits on 32-bit Windows operating systems, 64 bits on 64-bit Windows operating systems.|
|`BYTE`|`unsigned char`|`System.Byte`|8 bits|
|`SHORT`|`short`|`System.Int16`|16 bits|
|`WORD`|`unsigned short`|`System.UInt16`|16 bits|
|`INT`|`int`|`System.Int32`|32 bits|
|`UINT`|`unsigned int`|`System.UInt32`|32 bits|
|`LONG`|`long`|`System.Int32`|32 bits|
|`BOOL`|`long`|`System.Boolean` or `System.Int32`|32 bits|
|`DWORD`|`unsigned long`|`System.UInt32`|32 bits|
|`ULONG`|`unsigned long`|`System.UInt32`|32 bits|
|`CHAR`|`char`|`System.Char`|Decorate with ANSI.|
|`WCHAR`|`wchar_t`|`System.Char`|Decorate with Unicode.|
|`LPSTR`|`char *`|`System.String` or `System.Text.StringBuilder`|Decorate with ANSI.|
|`LPCSTR`|`const char *`|`System.String` or `System.Text.StringBuilder`|Decorate with ANSI.|
|`LPWSTR`|`wchar_t *`|`System.String` or `System.Text.StringBuilder`|Decorate with Unicode.|
|`LPCWSTR`|`const wchar_t *`|`System.String` or `System.Text.StringBuilder`|Decorate with Unicode.|
|`FLOAT`|`float`|`System.Single`|32 bits|
|`DOUBLE`|`double`|`System.Double`|64 bits|

For corresponding types in Visual Basic, C#, and C++, see the Introduction to the .NET class library.

## PinvokeLib.dll

The following code defines the library functions provided by PInvokeLib.dll. Many samples described in this section call this library.

### Example

To call the library functions from managed code, implement managed prototypes for each function you want to invoke. If the unmanaged code uses any custom types, you must also declare those types in your managed code. Decorate each prototype with the `System.Runtime.InteropServices.DllImportAttribute` attribute, and use `System.Runtime.InteropServices.StructLayoutAttribute` to control the layout of managed structures so they match the unmanaged equivalents.

### Managed type declarations

The following code shows the managed equivalents of the unmanaged types defined in `PInvokeLib.h`. Each structure uses `StructLayout` to ensure the field layout matches the unmanaged layout:

```csharp
// Managed type declarations that correspond to the unmanaged types in PinvokeLib.dll.

[StructLayout(LayoutKind.Sequential)]
internal struct MyPoint
{
    public int x;
    public int y;
}

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
internal struct MyPerson
{
    public string first;
    public string last;
}

[StructLayout(LayoutKind.Sequential)]
internal struct MyPerson2
{
    public IntPtr person; // Pointer to a MyPerson structure
    public int age;
}

[StructLayout(LayoutKind.Sequential)]
internal struct MyPerson3
{
    public MyPerson person; // Embedded MyPerson structure
    public int age;
}

[StructLayout(LayoutKind.Explicit)]
internal struct MyUnion
{
    [FieldOffset(0)] public int i;
    [FieldOffset(0)] public double d;
}

[StructLayout(LayoutKind.Sequential)]
internal struct MyArrayStruct
{
    public bool flag;

    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
    public int[] vals;
}
```
```vb
' Managed type declarations that correspond to the unmanaged types in PinvokeLib.dll.

<StructLayout(LayoutKind.Sequential)>
Friend Structure MyPoint
    Public x As Integer
    Public y As Integer
End Structure

<StructLayout(LayoutKind.Sequential, CharSet:=CharSet.Ansi)>
Friend Structure MyPerson
    Public first As String
    Public last As String
End Structure

<StructLayout(LayoutKind.Sequential)>
Friend Structure MyPerson2
    Public person As IntPtr ' Pointer to a MyPerson structure
    Public age As Integer
End Structure

<StructLayout(LayoutKind.Sequential)>
Friend Structure MyPerson3
    Public person As MyPerson ' Embedded MyPerson structure
    Public age As Integer
End Structure

<StructLayout(LayoutKind.Explicit)>
Friend Structure MyUnion
    <FieldOffset(0)> Public i As Integer
    <FieldOffset(0)> Public d As Double
End Structure

<StructLayout(LayoutKind.Sequential)>
Friend Structure MyArrayStruct
    Public flag As Boolean

    <MarshalAs(UnmanagedType.ByValArray, SizeConst:=3)>
    Public vals As Integer()
End Structure
```
### Managed function prototypes

The following code shows the `DllImport` declarations that expose the unmanaged functions from `PinvokeLib.dll` to managed code:

```csharp
internal static class NativeMethods
{
    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestArrayOfInts(
        [In, Out] int[] array, int size);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestRefArrayOfInts(
        ref IntPtr array, ref int size);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestMatrixOfInts(
        [In, Out] int[,] matrix, int row);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestArrayOfStrings(
        [In, Out] string[] array, int size);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestArrayOfStructs(
        [In, Out] MyPoint[] pointArray, int size);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestArrayOfStructs2(
        [In, Out] MyPerson[] personArray, int size);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestStructInStruct(ref MyPerson2 person2);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern void TestStructInStruct3(MyPerson3 person3);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern void TestUnion(MyUnion u, int type);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern void TestArrayInStruct(ref MyArrayStruct myStruct);

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern unsafe void* CreateTestClass();

    [DllImport("PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern unsafe void DeleteTestClass(void* instance);
}
```
```vb
Friend Class NativeMethods
    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function TestArrayOfInts(
        <[In], Out> ByVal array() As Integer, ByVal size As Integer) As Integer
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function TestRefArrayOfInts(
        ByRef array As IntPtr, ByRef size As Integer) As Integer
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function TestMatrixOfInts(
        <[In], Out> ByVal matrix(,) As Integer, ByVal row As Integer) As Integer
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function TestArrayOfStrings(
        <[In], Out> ByVal array() As String, ByVal size As Integer) As Integer
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function TestArrayOfStructs(
        <[In], Out> ByVal pointArray() As MyPoint, ByVal size As Integer) As Integer
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function TestArrayOfStructs2(
        <[In], Out> ByVal personArray() As MyPerson, ByVal size As Integer) As Integer
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function TestStructInStruct(
        ByRef person2 As MyPerson2) As Integer
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Sub TestStructInStruct3(ByVal person3 As MyPerson3)
    End Sub

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Sub TestUnion(ByVal u As MyUnion, ByVal type As Integer)
    End Sub

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Sub TestArrayInStruct(ByRef myStruct As MyArrayStruct)
    End Sub

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Function CreateTestClass() As IntPtr
    End Function

    <DllImport("PinvokeLib.dll", CallingConvention:=CallingConvention.Cdecl)>
    Friend Shared Sub DeleteTestClass(ByVal instance As IntPtr)
    End Sub
End Class
```
For more information and examples, see the following articles:

- Marshalling Classes, Structures, and Unions
- Marshalling Strings
- Marshalling Different Types of Arrays
