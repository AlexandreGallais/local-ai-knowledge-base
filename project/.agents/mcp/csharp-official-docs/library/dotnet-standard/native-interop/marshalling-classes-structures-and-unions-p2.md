---
title: "Marshalling Classes, Structures, and Unions (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/marshalling-classes-structures-and-unions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Marshalling Classes, Structures, and Unions (part 2 of 3)

## FindFile sample

This sample demonstrates how to pass a structure that contains a second, embedded structure to an unmanaged function. It also demonstrates how to use the `System.Runtime.InteropServices.MarshalAsAttribute` attribute to declare a fixed-length array within the structure. In this sample, the embedded structure elements are added to the parent structure. For a sample of an embedded structure that is not flattened, see Structures Sample.

The FindFile sample uses the following unmanaged function, shown with its original function declaration:

- `FindFirstFile` exported from Kernel32.dll.

    ```cpp
    HANDLE FindFirstFile(LPCTSTR lpFileName, LPWIN32_FIND_DATA lpFindFileData);
    ```

The original structure passed to the function contains the following elements:

```cpp
typedef struct _WIN32_FIND_DATA
{
  DWORD    dwFileAttributes;
  FILETIME ftCreationTime;
  FILETIME ftLastAccessTime;
  FILETIME ftLastWriteTime;
  DWORD    nFileSizeHigh;
  DWORD    nFileSizeLow;
  DWORD    dwReserved0;
  DWORD    dwReserved1;
  TCHAR    cFileName[ MAX_PATH ];
  TCHAR    cAlternateFileName[ 14 ];
} WIN32_FIND_DATA, *PWIN32_FIND_DATA;
```

In this sample, the `FindData` class contains a corresponding data member for each element of the original structure and the embedded structure. In place of two original character buffers, the class substitutes strings. `MarshalAsAttribute` sets the `System.Runtime.InteropServices.UnmanagedType` enumeration to `ByValTStr`, which is used to identify the inline, fixed-length character arrays that appear within the unmanaged structures.

The `NativeMethods` class contains a managed prototype of the `FindFirstFile` method, which passes the `FindData` class as a parameter. The parameter must be declared with the `System.Runtime.InteropServices.InAttribute` and `System.Runtime.InteropServices.OutAttribute` attributes because classes, which are reference types, are passed as In parameters by default.

### Declaring Prototypes

```csharp
using System;
using System.Runtime.InteropServices;

// Declares a class member for each structure element.
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
public class FindData
{
    public int fileAttributes = 0;
    // creationTime was an embedded FILETIME structure.
    public int creationTime_lowDateTime = 0;
    public int creationTime_highDateTime = 0;
    // lastAccessTime was an embedded FILETIME structure.
    public int lastAccessTime_lowDateTime = 0;
    public int lastAccessTime_highDateTime = 0;
    // lastWriteTime was an embedded FILETIME structure.
    public int lastWriteTime_lowDateTime = 0;
    public int lastWriteTime_highDateTime = 0;
    public int nFileSizeHigh = 0;
    public int nFileSizeLow = 0;
    public int dwReserved0 = 0;
    public int dwReserved1 = 0;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)]
    public string fileName = null;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 14)]
    public string alternateFileName = null;
}

internal static class NativeMethods
{
    // Declares a managed prototype for the unmanaged function.
    [DllImport("Kernel32.dll", CharSet = CharSet.Auto)]
    internal static extern IntPtr FindFirstFile(
        string fileName, [In, Out] FindData findFileData);
}

public class App
{
    public static void Main()
    {
        FindData fd = new FindData();
        IntPtr handle = NativeMethods.FindFirstFile("C:\\*.*", fd);
        Console.WriteLine($"The first file: {fd.fileName}");
    }
}
```

### Calling Functions

```csharp
using System;
using System.Runtime.InteropServices;

// Declares a class member for each structure element.
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
public class FindData
{
    public int fileAttributes = 0;
    // creationTime was an embedded FILETIME structure.
    public int creationTime_lowDateTime = 0;
    public int creationTime_highDateTime = 0;
    // lastAccessTime was an embedded FILETIME structure.
    public int lastAccessTime_lowDateTime = 0;
    public int lastAccessTime_highDateTime = 0;
    // lastWriteTime was an embedded FILETIME structure.
    public int lastWriteTime_lowDateTime = 0;
    public int lastWriteTime_highDateTime = 0;
    public int nFileSizeHigh = 0;
    public int nFileSizeLow = 0;
    public int dwReserved0 = 0;
    public int dwReserved1 = 0;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)]
    public string fileName = null;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 14)]
    public string alternateFileName = null;
}

internal static class NativeMethods
{
    // Declares a managed prototype for the unmanaged function.
    [DllImport("Kernel32.dll", CharSet = CharSet.Auto)]
    internal static extern IntPtr FindFirstFile(
        string fileName, [In, Out] FindData findFileData);
}

public class App
{
    public static void Main()
    {
        FindData fd = new FindData();
        IntPtr handle = NativeMethods.FindFirstFile("C:\\*.*", fd);
        Console.WriteLine($"The first file: {fd.fileName}");
    }
}
```

## Unions sample

This sample demonstrates how to pass <example-value> containing only value types, and structures containing a value type and a string as parameters to an unmanaged function expecting a union. A union represents a memory location that can be shared by two or more variables.

The Unions sample uses the following unmanaged function, shown with its original function declaration:

- `TestUnion` exported from PinvokeLib.dll.

    ```cpp
    void TestUnion(MYUNION u, int type);
    ```

PinvokeLib.dll is a custom unmanaged library that contains an implementation for the previously listed function and two unions, `MYUNION` and `MYUNION2`. The unions contain the following elements:

```cpp
union MYUNION
{
    int number;
    double d;
}

union MYUNION2
{
    int i;
    char str[128];
};
```

In managed code, unions are defined as structures. The `MyUnion` structure contains two value types as its members: an integer and a double. The `System.Runtime.InteropServices.StructLayoutAttribute` attribute is set to control the precise position of each data member. The `System.Runtime.InteropServices.FieldOffsetAttribute` attribute provides the physical position of fields within the unmanaged representation of a union. Notice that both members have the same offset values, so the members can define the same piece of memory.

`MyUnion2_1` and `MyUnion2_2` contain a value type (integer) and a string, respectively. In managed code, value types and reference types are not permitted to overlap. This sample uses method overloading to enable the caller to use both types when calling the same unmanaged function. The layout of `MyUnion2_1` is explicit and has a precise offset value. In contrast, `MyUnion2_2` has a sequential layout, because explicit layouts are not permitted with reference types. The `System.Runtime.InteropServices.MarshalAsAttribute` attribute sets the `System.Runtime.InteropServices.UnmanagedType` enumeration to **ByValTStr**, which is used to identify the inline, fixed-length character arrays that appear within the unmanaged representation of the union.

The `NativeMethods` class contains the prototypes for the `TestUnion` and `TestUnion2` methods. `TestUnion2` is overloaded to declare `MyUnion2_1` or `MyUnion2_2` as parameters.

### Declaring Prototypes

```csharp
using System;
using System.Runtime.InteropServices;

// Declares managed structures instead of unions.
[StructLayout(LayoutKind.Explicit)]
public struct MyUnion
{
    [FieldOffset(0)]
    public int i;
    [FieldOffset(0)]
    public double d;
}

[StructLayout(LayoutKind.Explicit, Size = 128)]
public struct MyUnion2_1
{
    [FieldOffset(0)]
    public int i;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyUnion2_2
{
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 128)]
    public string str;
}

internal static class NativeMethods
{
    // Declares managed prototypes for unmanaged function.
    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestUnion(MyUnion u, int type);

    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestUnion2(MyUnion2_1 u, int type);

    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestUnion2(MyUnion2_2 u, int type);
}

public class App
{
    public static void Main()
    {
        MyUnion mu = new MyUnion();
        mu.i = 99;
        NativeMethods.TestUnion(mu, 1);

        mu.d = 99.99;
        NativeMethods.TestUnion(mu, 2);

        MyUnion2_1 mu2_1 = new MyUnion2_1();
        mu2_1.i = 99;
        NativeMethods.TestUnion2(mu2_1, 1);

        MyUnion2_2 mu2_2 = new MyUnion2_2();
        mu2_2.str = "*** string ***";
        NativeMethods.TestUnion2(mu2_2, 2);
    }
}
```

### Calling Functions

```csharp
using System;
using System.Runtime.InteropServices;

// Declares managed structures instead of unions.
[StructLayout(LayoutKind.Explicit)]
public struct MyUnion
{
    [FieldOffset(0)]
    public int i;
    [FieldOffset(0)]
    public double d;
}

[StructLayout(LayoutKind.Explicit, Size = 128)]
public struct MyUnion2_1
{
    [FieldOffset(0)]
    public int i;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyUnion2_2
{
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 128)]
    public string str;
}

internal static class NativeMethods
{
    // Declares managed prototypes for unmanaged function.
    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestUnion(MyUnion u, int type);

    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestUnion2(MyUnion2_1 u, int type);

    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestUnion2(MyUnion2_2 u, int type);
}

public class App
{
    public static void Main()
    {
        MyUnion mu = new MyUnion();
        mu.i = 99;
        NativeMethods.TestUnion(mu, 1);

        mu.d = 99.99;
        NativeMethods.TestUnion(mu, 2);

        MyUnion2_1 mu2_1 = new MyUnion2_1();
        mu2_1.i = 99;
        NativeMethods.TestUnion2(mu2_1, 1);

        MyUnion2_2 mu2_2 = new MyUnion2_2();
        mu2_2.str = "*** string ***";
        NativeMethods.TestUnion2(mu2_2, 2);
    }
}
```

## Platform sample

In some scenarios, `struct` and `union` layouts can differ depending on the targeted platform. For example, consider the `STRRET` type when defined in a COM scenario:

```cpp
#include <pshpack8.h> /* Defines the packing of the struct */
typedef struct _STRRET
    {
    UINT uType;
    /* [switch_is][switch_type] */ union
        {
        /* [case()][string] */ LPWSTR pOleStr;
        /* [case()] */ UINT uOffset;
        /* [case()] */ char cStr[ 260 ];
        }  DUMMYUNIONNAME;
    }  STRRET;
#include <poppack.h>
```

The above `struct` is declared with Windows' headers that influence the memory layout of the type. When defined in a managed environment, these layout details are needed to properly interoperate with native code.

The correct managed definition of this type in a 32-bit process is:

```csharp
[StructLayout(LayoutKind.Explicit, Size = 264)]
public struct STRRET_32
{
    [FieldOffset(0)]
    public uint uType;

    [FieldOffset(4)]
    public IntPtr pOleStr;

    [FieldOffset(4)]
    public uint uOffset;

    [FieldOffset(4)]
    public IntPtr cStr;
}
```

On a 64-bit process, the size *and* field offsets are different. The correct layout is:

```csharp
[StructLayout(LayoutKind.Explicit, Size = 272)]
public struct STRRET_64
{
    [FieldOffset(0)]
    public uint uType;

    [FieldOffset(8)]
    public IntPtr pOleStr;

    [FieldOffset(8)]
    public uint uOffset;

    [FieldOffset(8)]
    public IntPtr cStr;
}
```

Failure to properly consider the native layout in an interop scenario can result in random crashes or worse, incorrect computations.

By default, .NET assemblies can run in both a 32-bit and 64-bit version of the .NET runtime. The app must wait until runtime to decide which of the previous definitions to use.

The following code snippet shows an example of how to choose between the 32-bit and 64-bit definition at runtime.

```csharp
if (IntPtr.Size == 8)
{
    // Use the STRRET_64 definition
}
else
{
    Debug.Assert(IntPtr.Size == 4);
    // Use the STRRET_32 definition
}
```

## SysTime sample

This sample demonstrates how to pass a pointer to a class to an unmanaged function that expects a pointer to a structure.

The SysTime sample uses the following unmanaged function, shown with its original function declaration:

- `GetSystemTime` exported from Kernel32.dll.

    ```cpp
    VOID GetSystemTime(LPSYSTEMTIME lpSystemTime);
    ```

The original structure passed to the function contains the following elements:

```cpp
typedef struct _SYSTEMTIME {
    WORD wYear;
    WORD wMonth;
    WORD wDayOfWeek;
    WORD wDay;
    WORD wHour;
    WORD wMinute;
    WORD wSecond;
    WORD wMilliseconds;
} SYSTEMTIME, *PSYSTEMTIME;
```

In this sample, the `SystemTime` class contains the elements of the original structure represented as class members. The `System.Runtime.InteropServices.StructLayoutAttribute` attribute is set to ensure that the members are arranged in memory sequentially, in the order in which they appear.

The `NativeMethods` class contains a managed prototype of the `GetSystemTime` method, which passes the `SystemTime` class as an In/Out parameter by default. The parameter must be declared with the `System.Runtime.InteropServices.InAttribute` and `System.Runtime.InteropServices.OutAttribute` attributes because classes, which are reference types, are passed as In parameters by default. For the caller to receive the results, these directional attributes must be applied explicitly. The `App` class creates a new instance of the `SystemTime` class and accesses its data fields.

### Code Samples

```csharp
using System;
using System.Runtime.InteropServices;

[StructLayout(LayoutKind.Sequential)]
public class SystemTime
{
    public ushort year;
    public ushort month;
    public ushort weekday;
    public ushort day;
    public ushort hour;
    public ushort minute;
    public ushort second;
    public ushort millisecond;
}

internal static class NativeMethods
{
    // Declares a managed prototype for the unmanaged function using Platform Invoke.
    [DllImport("Kernel32.dll")]
    internal static extern void GetSystemTime([In, Out] SystemTime st);
}

public class App
{
    public static void Main()
    {
        Console.WriteLine("C# SysTime Sample using Platform Invoke");
        SystemTime st = new SystemTime();
        NativeMethods.GetSystemTime(st);
        Console.Write("The Date is: ");
        Console.Write($"{st.month} {st.day} {st.year}");
    }
}

// The program produces output similar to the following:
//
// C# SysTime Sample using Platform Invoke
// The Date is: 3 21 2010
```
