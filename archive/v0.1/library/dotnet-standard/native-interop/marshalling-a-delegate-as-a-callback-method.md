---
title: "Marshalling a Delegate as a Callback Method"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/marshalling-a-delegate-as-a-callback-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Marshalling a Delegate as a Callback Method

This sample demonstrates how to pass <example-value> to an unmanaged function expecting function pointers. A delegate is a class that can hold a reference to a method and is equivalent to a type-safe function pointer or a callback function.

> **Note:**
> When you use a delegate inside a call, the common language runtime protects the delegate from being garbage collected for the duration of that call. However, if the unmanaged function stores the delegate to use after the call completes, you must manually prevent garbage collection until the unmanaged function finishes with the delegate. For more information, see the HandleRef Sample and GCHandle Sample.

The Callback sample uses the following unmanaged functions, shown with their original function declaration:

- `TestCallBack` exported from PinvokeLib.dll.

    ```cpp
    void TestCallBack(FPTR pf, int value);
    ```

- `TestCallBack2` exported from PinvokeLib.dll.

    ```cpp
    void TestCallBack2(FPTR2 pf2, char* value);
    ```

PinvokeLib.dll is a custom unmanaged library that contains an implementation for the previously listed functions.

In this sample, the `NativeMethods` class contains managed prototypes for the `TestCallBack` and `TestCallBack2` methods. Both methods pass a delegate to a callback function as a parameter. The signature of the delegate must match the signature of the method it references. For example, the `FPtr` and `FPtr2` delegates have signatures that are identical to the `DoSomething` and `DoSomething2` methods.

## Declaring Prototypes

```csharp
using System;
using System.Runtime.InteropServices;

public delegate bool FPtr(int value);
public delegate bool FPtr2(string value);

internal static class NativeMethods
{
    // Declares managed prototypes for unmanaged functions.
    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern void TestCallBack(FPtr cb, int value);

    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern void TestCallBack2(FPtr2 cb2, string value);
}

public class App
{
    public static void Main()
    {
        FPtr cb = new FPtr(App.DoSomething);
        NativeMethods.TestCallBack(cb, 99);
        FPtr2 cb2 = new FPtr2(App.DoSomething2);
        NativeMethods.TestCallBack2(cb2, "abc");
    }

    public static bool DoSomething(int value)
    {
        Console.WriteLine($"\nCallback called with param: {value}");
        // ...
        return true;
    }

    public static bool DoSomething2(string value)
    {
        Console.WriteLine($"\nCallback called with param: {value}");
        // ...
        return true;
    }
}
```

## Calling Functions

```csharp
using System;
using System.Runtime.InteropServices;

public delegate bool FPtr(int value);
public delegate bool FPtr2(string value);

internal static class NativeMethods
{
    // Declares managed prototypes for unmanaged functions.
    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern void TestCallBack(FPtr cb, int value);

    [DllImport("..\\LIB\\PinvokeLib.dll", CallingConvention = CallingConvention.Cdecl)]
    internal static extern void TestCallBack2(FPtr2 cb2, string value);
}

public class App
{
    public static void Main()
    {
        FPtr cb = new FPtr(App.DoSomething);
        NativeMethods.TestCallBack(cb, 99);
        FPtr2 cb2 = new FPtr2(App.DoSomething2);
        NativeMethods.TestCallBack2(cb2, "abc");
    }

    public static bool DoSomething(int value)
    {
        Console.WriteLine($"\nCallback called with param: {value}");
        // ...
        return true;
    }

    public static bool DoSomething2(string value)
    {
        Console.WriteLine($"\nCallback called with param: {value}");
        // ...
        return true;
    }
}
```

## See also

- Miscellaneous Marshalling Samples
- Platform Invoke Data Types
- Creating Prototypes in Managed Code
