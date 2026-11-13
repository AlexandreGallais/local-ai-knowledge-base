---
title: "Marshalling Classes, Structures, and Unions (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/marshalling-classes-structures-and-unions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Marshalling Classes, Structures, and Unions (part 3 of 3)

## OutArrayOfStructs sample

This sample shows how to pass an array of structures that contains integers and strings as Out parameters to an unmanaged function.

This sample demonstrates how to call a native function by using the `System.Runtime.InteropServices.Marshal` class and by using unsafe code.

This sample uses a wrapper functions and platform invokes defined in PinvokeLib.dll, also provided in the source files. It uses the `TestOutArrayOfStructs` function and the `MYSTRSTRUCT2` structure. The structure contains the following elements:

```cpp
typedef struct _MYSTRSTRUCT2
{
   char* buffer;
   UINT size;
} MYSTRSTRUCT2;
```

The `MyStruct` class contains a string object of ANSI characters. The `System.Runtime.InteropServices.DllImportAttribute.CharSet` field specifies ANSI format. `MyUnsafeStruct`, is a structure containing an `System.IntPtr` type instead of a string.

The `NativeMethods` class contains the overloaded `TestOutArrayOfStructs` prototype method. If a method declares a pointer as a parameter, the class should be marked with the `unsafe` keyword. Because Visual Basic <example-value> use unsafe code, the overloaded method, unsafe modifier, and the `MyUnsafeStruct` structure are unnecessary.

The `App` class implements the `UsingMarshaling` method, which performs all the tasks necessary to pass the array. The array is marked with the `out` (`ByRef` in Visual Basic) keyword to indicate that data passes from callee to caller. The implementation uses the following `System.Runtime.InteropServices.Marshal` class methods:

- `System.Runtime.InteropServices.Marshal.PtrToStructure*` to marshal data from the unmanaged buffer to a managed object.

- `System.Runtime.InteropServices.Marshal.DestroyStructure*` to release the memory reserved for strings in the structure.

- `System.Runtime.InteropServices.Marshal.FreeCoTaskMem*` to release the memory reserved for the array.

As previously mentioned, C# allows unsafe code and Visual Basic does not. In the C# sample, `UsingUnsafePointer` is an alternative method implementation that uses pointers instead of the `System.Runtime.InteropServices.Marshal` class to pass back the array containing the `MyUnsafeStruct` structure.

### Declaring Prototypes

```csharp
using System;
using System.Runtime.InteropServices;

// Declares a class member for each structure element.
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public class MyStruct
{
    public string buffer;
    public int size;
}

// Declares a structure with a pointer.
[StructLayout(LayoutKind.Sequential)]
public struct MyUnsafeStruct
{
    public IntPtr buffer;
    public int size;
}

internal static unsafe class NativeMethods
{
    // Declares managed prototypes for the unmanaged function.
    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestOutArrayOfStructs(
        out int size, out IntPtr outArray);

    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestOutArrayOfStructs(
        out int size, MyUnsafeStruct** outArray);
}

public class App
{
    public static void Main()
    {
        Console.WriteLine("\nUsing marshal class\n");
        UsingMarshaling();
        Console.WriteLine("\nUsing unsafe code\n");
        UsingUnsafePointer();
    }

    public static void UsingMarshaling()
    {
        int size;
        IntPtr outArray;

        NativeMethods.TestOutArrayOfStructs(out size, out outArray);
        MyStruct[] manArray = new MyStruct[size];
        IntPtr current = outArray;
        for (int i = 0; i < size; i++)
        {
            manArray[i] = new MyStruct();
            Marshal.PtrToStructure(current, manArray[i]);

            //Marshal.FreeCoTaskMem((IntPtr)Marshal.ReadInt32(current));
            Marshal.DestroyStructure(current, typeof(MyStruct));
            current = (IntPtr)((long)current + Marshal.SizeOf(manArray[i]));

            Console.WriteLine($"Element {i}: {manArray[i].buffer} {manArray[i].size}");
        }

        Marshal.FreeCoTaskMem(outArray);
    }

    public static unsafe void UsingUnsafePointer()
    {
        int size;
        MyUnsafeStruct* pResult;

        NativeMethods.TestOutArrayOfStructs(out size, &pResult);
        MyUnsafeStruct* pCurrent = pResult;
        for (int i = 0; i < size; i++, pCurrent++)
        {
            Console.WriteLine($"Element {i}: {Marshal.PtrToStringAnsi(pCurrent->buffer)} {pCurrent->size}");
            Marshal.FreeCoTaskMem(pCurrent->buffer);
        }

        Marshal.FreeCoTaskMem((IntPtr)pResult);
    }
}
```

### Calling Functions

```csharp
using System;
using System.Runtime.InteropServices;

// Declares a class member for each structure element.
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public class MyStruct
{
    public string buffer;
    public int size;
}

// Declares a structure with a pointer.
[StructLayout(LayoutKind.Sequential)]
public struct MyUnsafeStruct
{
    public IntPtr buffer;
    public int size;
}

internal static unsafe class NativeMethods
{
    // Declares managed prototypes for the unmanaged function.
    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestOutArrayOfStructs(
        out int size, out IntPtr outArray);

    [DllImport("..\\LIB\\PInvokeLib.dll")]
    internal static extern void TestOutArrayOfStructs(
        out int size, MyUnsafeStruct** outArray);
}

public class App
{
    public static void Main()
    {
        Console.WriteLine("\nUsing marshal class\n");
        UsingMarshaling();
        Console.WriteLine("\nUsing unsafe code\n");
        UsingUnsafePointer();
    }

    public static void UsingMarshaling()
    {
        int size;
        IntPtr outArray;

        NativeMethods.TestOutArrayOfStructs(out size, out outArray);
        MyStruct[] manArray = new MyStruct[size];
        IntPtr current = outArray;
        for (int i = 0; i < size; i++)
        {
            manArray[i] = new MyStruct();
            Marshal.PtrToStructure(current, manArray[i]);

            //Marshal.FreeCoTaskMem((IntPtr)Marshal.ReadInt32(current));
            Marshal.DestroyStructure(current, typeof(MyStruct));
            current = (IntPtr)((long)current + Marshal.SizeOf(manArray[i]));

            Console.WriteLine($"Element {i}: {manArray[i].buffer} {manArray[i].size}");
        }

        Marshal.FreeCoTaskMem(outArray);
    }

    public static unsafe void UsingUnsafePointer()
    {
        int size;
        MyUnsafeStruct* pResult;

        NativeMethods.TestOutArrayOfStructs(out size, &pResult);
        MyUnsafeStruct* pCurrent = pResult;
        for (int i = 0; i < size; i++, pCurrent++)
        {
            Console.WriteLine($"Element {i}: {Marshal.PtrToStringAnsi(pCurrent->buffer)} {pCurrent->size}");
            Marshal.FreeCoTaskMem(pCurrent->buffer);
        }

        Marshal.FreeCoTaskMem((IntPtr)pResult);
    }
}
```

## See also

- Marshalling Data with Platform Invoke
- Marshalling Strings
- Marshalling Different Types of Arrays
