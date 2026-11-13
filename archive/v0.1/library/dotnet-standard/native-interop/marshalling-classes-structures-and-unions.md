---
title: "Marshalling Classes, Structures, and Unions (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/marshalling-classes-structures-and-unions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Marshalling Classes, Structures, and Unions

Classes and structures are similar in .NET. Both can have fields, properties, and events. They can also have static and nonstatic methods. One notable difference is that structures are value types and classes are reference types.

The following table lists marshalling options for classes, structures, and unions; describes their usage; and provides a link to the corresponding platform invoke sample.

|Type|Description|Sample|
|----------|-----------------|------------|
|Class by value.|Passes a class with integer members as an In/Out parameter, like the managed case.|SysTime sample|
|Structure by value.|Passes structures as In parameters.|Structures sample|
|Structure by reference.|Passes structures as In/Out parameters.|OSInfo sample|
|Structure with nested structures (flattened).|Passes a class that represents a structure with nested structures in the unmanaged function. The structure is flattened to one big structure in the managed prototype.|FindFile sample|
|Structure with a pointer to another structure.|Passes a structure that contains a pointer to a second structure as a member.|Structures Sample|
|Array of structures with integers by value.|Passes an array of structures that contain only integers as an In/Out parameter. Members of the array can be changed.|Arrays Sample|
|Array of structures with integers and strings by reference.|Passes an array of structures that contain integers and strings as an Out parameter. The called function allocates memory for the array.|OutArrayOfStructs Sample|
|Unions with value types.|Passes unions with value types (integer and double).|Unions sample|
|Unions with mixed types.|Passes unions with mixed types (integer and string).|Unions sample|
|Struct with platform-specific layout.|Passes a type with native-packing definitions.|Platform sample|
|Null values in structure.|Passes a null reference (**Nothing** in Visual Basic) instead of a reference to a value type.|HandleRef sample|

## Structures sample

This sample demonstrates how to pass a structure that points to a second structure, pass a structure with an embedded structure, and pass a structure with an embedded array.

The Structs sample uses the following unmanaged functions, shown with their original function declaration:

- `TestStructInStruct` exported from PinvokeLib.dll.

    ```cpp
    int TestStructInStruct(MYPERSON2* pPerson2);
    ```

- **TestStructInStruct3** exported from PinvokeLib.dll.

    ```cpp
    void TestStructInStruct3(MYPERSON3 person3);
    ```

- `TestArrayInStruct` exported from PinvokeLib.dll.

    ```cpp
    void TestArrayInStruct(MYARRAYSTRUCT* pStruct);
    ```

PinvokeLib.dll is a custom unmanaged library that contains implementations for the previously listed functions and four structures: **MYPERSON**, **MYPERSON2**, **MYPERSON3**, and **MYARRAYSTRUCT**. These structures contain the following elements:

```cpp
typedef struct _MYPERSON
{
   char* first;
   char* last;
} MYPERSON, *LP_MYPERSON;

typedef struct _MYPERSON2
{
   MYPERSON* person;
   int age;
} MYPERSON2, *LP_MYPERSON2;

typedef struct _MYPERSON3
{
   MYPERSON person;
   int age;
} MYPERSON3;

typedef struct _MYARRAYSTRUCT
{
   bool flag;
   int vals[ 3 ];
} MYARRAYSTRUCT;
```

The managed `MyPerson`, `MyPerson2`, `MyPerson3`, and `MyArrayStruct` structures have the following characteristic:

- `MyPerson` contains only string members. The CharSet field sets the strings to ANSI format when passed to the unmanaged function.

- `MyPerson2` contains an `IntPtr` to the `MyPerson` structure. The `IntPtr` type replaces the original pointer to the unmanaged structure because .NET applications do not use pointers unless the code is marked **unsafe**.

- `MyPerson3` contains `MyPerson` as an embedded structure. A structure embedded within another structure can be flattened by placing the elements of the embedded structure directly into the main structure, or it can be left as an embedded structure, as is done in this sample.

- `MyArrayStruct` contains an array of integers. The `System.Runtime.InteropServices.MarshalAsAttribute` attribute sets the `System.Runtime.InteropServices.UnmanagedType` enumeration value to **ByValArray**, which is used to indicate the number of elements in the array.

For all structures in this sample, the `System.Runtime.InteropServices.StructLayoutAttribute` attribute is applied to ensure that the members are arranged in memory sequentially, in the order in which they appear.

The `NativeMethods` class contains managed prototypes for the `TestStructInStruct`, `TestStructInStruct3`, and `TestArrayInStruct` methods called by the `App` class. Each prototype declares a single parameter, as follows:

- `TestStructInStruct` declares a reference to type `MyPerson2` as its parameter.

- `TestStructInStruct3` declares type `MyPerson3` as its parameter and passes the parameter by value.

- `TestArrayInStruct` declares a reference to type `MyArrayStruct` as its parameter.

Structures as arguments to methods are passed by value unless the parameter contains the `ref` (**ByRef** in Visual Basic) keyword. For example, the `TestStructInStruct` method passes a reference (the value of an address) to an object of type `MyPerson2` to unmanaged code. To manipulate the structure that `MyPerson2` points to, the sample creates a buffer of a specified size and returns its address by combining the `System.Runtime.InteropServices.Marshal.AllocCoTaskMem*` and `System.Runtime.InteropServices.Marshal.SizeOf*` methods. Next, the sample copies the content of the managed structure to the unmanaged buffer. Finally, the sample uses the `System.Runtime.InteropServices.Marshal.PtrToStructure*` method to marshal data from the unmanaged buffer to a managed object and the `System.Runtime.InteropServices.Marshal.FreeCoTaskMem*` method to free the unmanaged block of memory.

### Declaring Prototypes

```csharp
using System;
using System.Runtime.InteropServices;

// Declares a managed structure for each unmanaged structure.
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public struct MyPerson
{
    public string first;
    public string last;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyPerson2
{
    public IntPtr person;
    public int age;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyPerson3
{
    public MyPerson person;
    public int age;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyArrayStruct
{
    public bool flag;

    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
    public int[] vals;
}

internal static class NativeMethods
{
    // Declares a managed prototype for unmanaged function.
    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestStructInStruct(ref MyPerson2 person2);

    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestStructInStruct3(MyPerson3 person3);

    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestArrayInStruct(ref MyArrayStruct myStruct);
}

public class App
{
    public static void Main()
    {
        // Structure with a pointer to another structure.
        MyPerson personName;
        personName.first = "Mark";
        personName.last = "Lee";

        MyPerson2 personAll;
        personAll.age = 30;

        IntPtr buffer = Marshal.AllocCoTaskMem(Marshal.SizeOf(personName));
        Marshal.StructureToPtr(personName, buffer, false);

        personAll.person = buffer;

        Console.WriteLine("\nPerson before call:");
        Console.WriteLine("first = {0}, last = {1}, age = {2}",
            personName.first, personName.last, personAll.age);

        int res = NativeMethods.TestStructInStruct(ref personAll);

        MyPerson personRes =
            (MyPerson)Marshal.PtrToStructure(personAll.person,
            typeof(MyPerson));

        Marshal.FreeCoTaskMem(buffer);

        Console.WriteLine("Person after call:");
        Console.WriteLine("first = {0}, last = {1}, age = {2}",
            personRes.first, personRes.last, personAll.age);

        // Structure with an embedded structure.
        MyPerson3 person3 = new MyPerson3();
        person3.person.first = "John";
        person3.person.last = "Evans";
        person3.age = 27;
        NativeMethods.TestStructInStruct3(person3);

        // Structure with an embedded array.
        MyArrayStruct myStruct = new MyArrayStruct();

        myStruct.flag = false;
        myStruct.vals = new int[3];
        myStruct.vals[0] = 1;
        myStruct.vals[1] = 4;
        myStruct.vals[2] = 9;

        Console.WriteLine("\nStructure with array before call:");
        Console.WriteLine(myStruct.flag);
        Console.WriteLine($"{myStruct.vals[0]} {myStruct.vals[1]} {myStruct.vals[2]}");

        NativeMethods.TestArrayInStruct(ref myStruct);
        Console.WriteLine("\nStructure with array after call:");
        Console.WriteLine(myStruct.flag);
        Console.WriteLine($"{myStruct.vals[0]} {myStruct.vals[1]} {myStruct.vals[2]}");
    }
}
```

### Calling Functions

```csharp
using System;
using System.Runtime.InteropServices;

// Declares a managed structure for each unmanaged structure.
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public struct MyPerson
{
    public string first;
    public string last;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyPerson2
{
    public IntPtr person;
    public int age;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyPerson3
{
    public MyPerson person;
    public int age;
}

[StructLayout(LayoutKind.Sequential)]
public struct MyArrayStruct
{
    public bool flag;

    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
    public int[] vals;
}

internal static class NativeMethods
{
    // Declares a managed prototype for unmanaged function.
    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestStructInStruct(ref MyPerson2 person2);

    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestStructInStruct3(MyPerson3 person3);

    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern int TestArrayInStruct(ref MyArrayStruct myStruct);
}

public class App
{
    public static void Main()
    {
        // Structure with a pointer to another structure.
        MyPerson personName;
        personName.first = "Mark";
        personName.last = "Lee";

        MyPerson2 personAll;
        personAll.age = 30;

        IntPtr buffer = Marshal.AllocCoTaskMem(Marshal.SizeOf(personName));
        Marshal.StructureToPtr(personName, buffer, false);

        personAll.person = buffer;

        Console.WriteLine("\nPerson before call:");
        Console.WriteLine("first = {0}, last = {1}, age = {2}",
            personName.first, personName.last, personAll.age);

        int res = NativeMethods.TestStructInStruct(ref personAll);

        MyPerson personRes =
            (MyPerson)Marshal.PtrToStructure(personAll.person,
            typeof(MyPerson));

        Marshal.FreeCoTaskMem(buffer);

        Console.WriteLine("Person after call:");
        Console.WriteLine("first = {0}, last = {1}, age = {2}",
            personRes.first, personRes.last, personAll.age);

        // Structure with an embedded structure.
        MyPerson3 person3 = new MyPerson3();
        person3.person.first = "John";
        person3.person.last = "Evans";
        person3.age = 27;
        NativeMethods.TestStructInStruct3(person3);

        // Structure with an embedded array.
        MyArrayStruct myStruct = new MyArrayStruct();

        myStruct.flag = false;
        myStruct.vals = new int[3];
        myStruct.vals[0] = 1;
        myStruct.vals[1] = 4;
        myStruct.vals[2] = 9;

        Console.WriteLine("\nStructure with array before call:");
        Console.WriteLine(myStruct.flag);
        Console.WriteLine($"{myStruct.vals[0]} {myStruct.vals[1]} {myStruct.vals[2]}");

        NativeMethods.TestArrayInStruct(ref myStruct);
        Console.WriteLine("\nStructure with array after call:");
        Console.WriteLine(myStruct.flag);
        Console.WriteLine($"{myStruct.vals[0]} {myStruct.vals[1]} {myStruct.vals[2]}");
    }
}
```
