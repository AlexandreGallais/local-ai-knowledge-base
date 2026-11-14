---
title: "Default Marshalling for Strings (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/default-marshalling-for-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Default marshalling for strings

Both the `System.String` and `System.Text.StringBuilder` classes have similar marshalling behavior.

Strings are marshalled as a COM-style `BSTR` type or as a null-terminated string (a character array that ends with a null character). The characters within the string can be marshalled as Unicode (the default on Windows systems) or ANSI.

## Strings used in interfaces

The following table shows the marshalling options for the string data type when marshalled as a method argument to unmanaged code. The `System.Runtime.InteropServices.MarshalAsAttribute` attribute provides several `System.Runtime.InteropServices.UnmanagedType` enumeration values to marshal strings to COM interfaces.

| Enumeration type               | Description of unmanaged format                                   |
|--------------------------------|-------------------------------------------------------------------|
| `UnmanagedType.BStr` (default) | A COM-style `BSTR` with a prefixed length and Unicode characters. |
| `UnmanagedType.LPStr`          | A pointer to a null-terminated array of ANSI characters.          |
| `UnmanagedType.LPWStr`         | A pointer to a null-terminated array of Unicode characters.       |

This table applies to `System.String`. For `System.Text.StringBuilder`, the only options allowed are `UnmanagedType.LPStr` and `UnmanagedType.LPWStr`.

The following example shows strings declared in the `IStringWorker` interface.

```csharp
public interface IStringWorker
{
    void PassString1(string s);
    void PassString2([MarshalAs(UnmanagedType.BStr)] string s);
    void PassString3([MarshalAs(UnmanagedType.LPStr)] string s);
    void PassString4([MarshalAs(UnmanagedType.LPWStr)] string s);
    void PassStringRef1(ref string s);
    void PassStringRef2([MarshalAs(UnmanagedType.BStr)] ref string s);
    void PassStringRef3([MarshalAs(UnmanagedType.LPStr)] ref string s);
    void PassStringRef4([MarshalAs(UnmanagedType.LPWStr)] ref string s);
}
```

```vb
Public Interface IStringWorker
    Sub PassString1(s As String)
    Sub PassString2(<MarshalAs(UnmanagedType.BStr)> s As String)
    Sub PassString3(<MarshalAs(UnmanagedType.LPStr)> s As String)
    Sub PassString4(<MarshalAs(UnmanagedType.LPWStr)> s As String)
    Sub PassStringRef1(ByRef s As String)
    Sub PassStringRef2(<MarshalAs(UnmanagedType.BStr)> ByRef s As String)
    Sub PassStringRef3(<MarshalAs(UnmanagedType.LPStr)> ByRef s As String)
    Sub PassStringRef4(<MarshalAs(UnmanagedType.LPWStr)> ByRef s As String)
End Interface
```

The following example shows the corresponding interface described in a type library.

```cpp
interface IStringWorker : IDispatch
{
    HRESULT PassString1([in] BSTR s);
    HRESULT PassString2([in] BSTR s);
    HRESULT PassString3([in] LPStr s);
    HRESULT PassString4([in] LPWStr s);
    HRESULT PassStringRef1([in, out] BSTR *s);
    HRESULT PassStringRef2([in, out] BSTR *s);
    HRESULT PassStringRef3([in, out] LPStr *s);
    HRESULT PassStringRef4([in, out] LPWStr *s);
};
```

## Strings used in platform invoke

When the CharSet is Unicode or a string argument is explicitly marked as [MarshalAs(UnmanagedType.LPWSTR)] and the string is passed by value (not `ref` or `out`), the string is pinned and used directly by native code. Otherwise, platform invoke copies string arguments, converting from the .NET string format (Unicode) to the platform unmanaged format. Strings are immutable and are not copied back from unmanaged memory to managed memory when the call returns.

Native code is only responsible for releasing the memory when the string is passed by reference and it assigns a new value. Otherwise, the .NET runtime owns the memory and will release it after the call.

The following table lists the marshalling options for strings when marshalled as a method argument of a platform invoke call. The `System.Runtime.InteropServices.MarshalAsAttribute` attribute provides several `System.Runtime.InteropServices.UnmanagedType` enumeration values to marshal strings.

| Enumeration type                | Description of unmanaged format                                              |
|---------------------------------|------------------------------------------------------------------------------|
| `UnmanagedType.AnsiBStr`        | A COM-style `BSTR` with a prefixed length and ANSI characters.               |
| `UnmanagedType.BStr`            | A COM-style `BSTR` with a prefixed length and Unicode characters.            |
| `UnmanagedType.LPStr` (default) | A pointer to a null-terminated array of ANSI characters.                     |
| `UnmanagedType.LPTStr`          | A pointer to a null-terminated array of platform-dependent characters.       |
| `UnmanagedType.LPUTF8Str`       | A pointer to a null-terminated array of UTF-8 encoded characters.            |
| `UnmanagedType.LPWStr`          | A pointer to a null-terminated array of Unicode characters.                  |
| `UnmanagedType.TBStr`           | A COM-style `BSTR` with a prefixed length and platform-dependent characters. |
| `VBByRefStr`                    | A value that enables Visual Basic to change a string in unmanaged code and have the results reflected in managed code. This value is supported only for platform invoke. This is the default value in Visual Basic for `ByVal` strings. |

This table applies to `System.String`. For `System.Text.StringBuilder`, the only options allowed are `LPStr`, `LPTStr`, and `LPWStr`.

The following type definition shows the correct use of `MarshalAsAttribute` for platform invoke calls.

```csharp
class StringLibAPI
{
    [DllImport("StringLib.dll")]
    public static extern void PassLPStr([MarshalAs(UnmanagedType.LPStr)] string s);
    [DllImport("StringLib.dll")]
    public static extern void PassLPWStr([MarshalAs(UnmanagedType.LPWStr)] string s);
    [DllImport("StringLib.dll")]
    public static extern void PassLPTStr([MarshalAs(UnmanagedType.LPTStr)] string s);
    [DllImport("StringLib.dll")]
    public static extern void PassLPUTF8Str([MarshalAs(UnmanagedType.LPUTF8Str)] string s);
    [DllImport("StringLib.dll")]
    public static extern void PassBStr([MarshalAs(UnmanagedType.BStr)] string s);
    [DllImport("StringLib.dll")]
    public static extern void PassAnsiBStr([MarshalAs(UnmanagedType.AnsiBStr)] string s);
    [DllImport("StringLib.dll")]
    public static extern void PassTBStr([MarshalAs(UnmanagedType.TBStr)] string s);
}
```

```vb
Class StringLibAPI
    Public Declare Auto Sub PassLPStr Lib "StringLib.dll" (
        <MarshalAs(UnmanagedType.LPStr)> s As String)
    Public Declare Auto Sub PassLPWStr Lib "StringLib.dll" (
        <MarshalAs(UnmanagedType.LPWStr)> s As String)
    Public Declare Auto Sub PassLPTStr Lib "StringLib.dll" (
        <MarshalAs(UnmanagedType.LPTStr)> s As String)
    Public Declare Auto Sub PassLPUTF8Str Lib "StringLib.dll" (
        <MarshalAs(UnmanagedType.LPUTF8Str)> s As String)
    Public Declare Auto Sub PassBStr Lib "StringLib.dll" (
        <MarshalAs(UnmanagedType.BStr)> s As String)
    Public Declare Auto Sub PassAnsiBStr Lib "StringLib.dll" (
        <MarshalAs(UnmanagedType.AnsiBStr)> s As String)
    Public Declare Auto Sub PassTBStr Lib "StringLib.dll" (
        <MarshalAs(UnmanagedType.TBStr)> s As String)
End Class
```

## Strings used in structures

Strings are valid members of structures; however, `System.Text.StringBuilder` buffers are invalid in structures. The following table shows the marshalling options for the `System.String` data type when the type is marshalled as a field. The `System.Runtime.InteropServices.MarshalAsAttribute` attribute provides several `System.Runtime.InteropServices.UnmanagedType` enumeration values to marshal strings to a field.

| Enumeration type                | Description of unmanaged format                                        |
|---------------------------------|------------------------------------------------------------------------|
| `UnmanagedType.BStr`            | A COM-style `BSTR` with a prefixed length and Unicode characters.      |
| `UnmanagedType.LPStr` (default) | A pointer to a null-terminated array of ANSI characters.               |
| `UnmanagedType.LPTStr`          | A pointer to a null-terminated array of platform-dependent characters. |
| `UnmanagedType.LPUTF8Str`       | A pointer to a null-terminated array of UTF-8 encoded characters.      |
| `UnmanagedType.LPWStr`          | A pointer to a null-terminated array of Unicode characters.            |
| `UnmanagedType.ByValTStr`       | A fixed-length array of characters; the array's type is determined by the character set of the containing structure.|

The `ByValTStr` type is used for inline, fixed-length character arrays that appear within a structure. Other types apply to string references contained within structures that contain pointers to strings.

The `CharSet` argument of the `System.Runtime.InteropServices.StructLayoutAttribute` that is applied to the containing structure determines the character format of strings in structures. The following example structures contain string references and inline strings, as well as ANSI, Unicode, and platform-dependent characters. The representation of these structures in a type library is shown in the following C++ code:

```cpp
struct StringInfoA
{
    char *  f1;
    char    f2[256];
};

struct StringInfoW
{
    WCHAR * f1;
    WCHAR   f2[256];
    BSTR    f3;
};

struct StringInfoT
{
    TCHAR * f1;
    TCHAR   f2[256];
};
```

The following example shows how to use the `System.Runtime.InteropServices.MarshalAsAttribute` to define the same structure in different formats.

```csharp
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
struct StringInfoA
{
    [MarshalAs(UnmanagedType.LPStr)] public string f1;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)] public string f2;
}

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
struct StringInfoW
{
    [MarshalAs(UnmanagedType.LPWStr)] public string f1;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)] public string f2;
    [MarshalAs(UnmanagedType.BStr)] public string f3;
}

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
struct StringInfoT
{
    [MarshalAs(UnmanagedType.LPTStr)] public string f1;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)] public string f2;
}
```

```vb
<StructLayout(LayoutKind.Sequential, CharSet := CharSet.Ansi)> _
Structure StringInfoA
    <MarshalAs(UnmanagedType.LPStr)> Public f1 As String
    <MarshalAs(UnmanagedType.ByValTStr, SizeConst := 256)> _
    Public f2 As String
End Structure

<StructLayout(LayoutKind.Sequential, CharSet := CharSet.Unicode)> _
Structure StringInfoW
    <MarshalAs(UnmanagedType.LPWStr)> Public f1 As String
    <MarshalAs(UnmanagedType.ByValTStr, SizeConst := 256)> _
    Public f2 As String
<MarshalAs(UnmanagedType.BStr)> Public f3 As String
End Structure

<StructLayout(LayoutKind.Sequential, CharSet := CharSet.Auto)> _
Structure StringInfoT
    <MarshalAs(UnmanagedType.LPTStr)> Public f1 As String
    <MarshalAs(UnmanagedType.ByValTStr, SizeConst := 256)> _
    Public f2 As String
End Structure
```
