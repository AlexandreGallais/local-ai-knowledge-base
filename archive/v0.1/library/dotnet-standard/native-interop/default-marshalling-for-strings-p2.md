---
title: "Default Marshalling for Strings (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/default-marshalling-for-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default Marshalling for Strings (part 2 of 2)

## Fixed-length string buffers

In some circumstances, a fixed-length character buffer must be passed into unmanaged code to be manipulated. Simply passing a string does not work in this case because the callee cannot modify the contents of the passed buffer. Even if the string is passed by reference, there is no way to initialize the buffer to a given size.

The solution is to pass a `byte[]` or `char[]`, depending on expected encoding, as the argument instead of a `System.String`. The array, when marked with `[Out]`, can be dereferenced and modified by the callee, provided it does not exceed the capacity of the allocated array.

For example, the Windows `GetWindowText` API function (defined in *winuser.h*) requires that the caller pass a fixed-length character buffer to which the function writes the window's text. The `lpString` argument points to a caller-allocated buffer of size `nMaxCount`. The caller is expected to allocate the buffer and set the `nMaxCount` argument to the size of the allocated buffer. The following example shows the `GetWindowText` function declaration as defined in *winuser.h*.

```cpp
int GetWindowText(
    HWND hWnd,        // Handle to window or control.
    LPTStr lpString,  // Text buffer.
    int nMaxCount     // Maximum number of characters to copy.
);
```

A `char[]` can be dereferenced and modified by the callee. The recommended approach is to use `System.Buffers.ArrayPool`1` to rent a `char[]`, which avoids repeated heap allocations. The following code example demonstrates this pattern.

```csharp
using System;
using System.Buffers;
using System.Runtime.InteropServices;

internal static class NativeMethods
{
    [DllImport("User32.dll", CharSet = CharSet.Unicode)]
    public static extern int GetWindowText(IntPtr hWnd, [Out] char[] lpString, int nMaxCount);
}

public class Window
{
    internal IntPtr h;        // Internal handle to Window.
    public string GetText()
    {
        char[] buffer = ArrayPool<char>.Shared.Rent(256 + 1);
        try
        {
            int length = NativeMethods.GetWindowText(h, buffer, buffer.Length);
            return new string(buffer, 0, length);
        }
        finally
        {
            ArrayPool<char>.Shared.Return(buffer);
        }
    }
}
```

```vb
Imports System
Imports System.Buffers
Imports System.Runtime.InteropServices

Friend Class NativeMethods
    Public Declare Auto Function GetWindowText Lib "User32.dll" _
        (hWnd As IntPtr, <Out> lpString() As Char, nMaxCount As Integer) As Integer
End Class

Public Class Window
    Friend h As IntPtr ' Friend handle to Window.
    Public Function GetText() As String
        Dim buffer() As Char = ArrayPool(Of Char).Shared.Rent(256 + 1)
        Try
            Dim length As Integer = NativeMethods.GetWindowText(h, buffer, buffer.Length)
            Return New String(buffer, 0, length)
        Finally
            ArrayPool(Of Char).Shared.Return(buffer)
        End Try
    End Function
End Class
```

You might also consider passing a `System.Text.StringBuilder` instead of a `System.String`. The buffer that's created when a `StringBuilder` is marshalled can be dereferenced and modified by the callee, provided it doesn't exceed the capacity of the `StringBuilder`. It can also be initialized to a fixed length. For example, if you initialize a `StringBuilder` buffer to a capacity of `N`, the marshaller provides a buffer of size (`N`+1) characters. The +1 accounts for the fact that the unmanaged string has a null terminator while `StringBuilder` doesn't.

> **Caution:**
> Avoid `StringBuilder` parameters when performance matters. Marshalling a `StringBuilder` *always* creates a native buffer copy. A typical call to get a string out of native code can result in four allocations:
>
> 1. A managed `StringBuilder` buffer.
> 1. A native buffer allocated during marshalling.
> 1. If `[Out]`, the native buffer contents are copied into a newly allocated managed array.
> 1. A `string` allocated by `ToString()`.
>
> Reusing the same `StringBuilder` across calls saves only one allocation. Using a character buffer rented from `ArrayPool<char>` is much more efficient—it reduces subsequent calls to just the allocation for `ToString()`.
>
> Additionally, the `StringBuilder` capacity does **not** include a hidden null terminator, which interop always accounts for. This is a common mistake, because most APIs want the size of the buffer *including* the null. This can result in wasted or unnecessary allocations, and it prevents the runtime from optimizing `StringBuilder` marshalling to minimize copies.
>
> For more information, see String parameters and CA1838: Avoid `StringBuilder` parameters for P/Invokes.

## See also

- Default Marshalling Behavior
- Marshalling Strings
- Blittable and Non-Blittable Types
- Directional Attributes
- Copying and Pinning
