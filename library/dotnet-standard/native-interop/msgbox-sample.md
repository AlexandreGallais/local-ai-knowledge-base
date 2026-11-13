---
title: "MsgBox Sample"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/msgbox-sample.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MsgBox Sample

This sample demonstrates how to pass <example-value> types by value as In parameters and when to use the `System.Runtime.InteropServices.DllImportAttribute.EntryPoint`, `System.Runtime.InteropServices.DllImportAttribute.CharSet`, and `System.Runtime.InteropServices.DllImportAttribute.ExactSpelling` fields.

 The MsgBox sample uses the following unmanaged function, shown with its original function declaration:

- `MessageBox` exported from User32.dll.

    ```cpp
    int MessageBox(HWND hWnd, LPCTSTR lpText, LPCTSTR lpCaption,
       UINT uType);
    ```

 In this sample, the `NativeMethods` class contains a managed prototype for each unmanaged function called by the `MsgBoxSample` class. The managed prototype methods `MsgBox`, `MsgBox2`, and `MsgBox3` have different declarations for the same unmanaged function.

 The declaration for `MsgBox2` produces incorrect output in the message box because the character type, specified as ANSI, is mismatched with the entry point `MessageBoxW`, which is the name of the Unicode function. The declaration for `MsgBox3` creates a mismatch between the `EntryPoint`, `CharSet`, and `ExactSpelling` fields. When called, `MsgBox3` throws an exception. For detailed information on string naming and name marshalling, see Specifying a Character Set.

## Declaring Prototypes

 ```csharp
using System;
using System.Runtime.InteropServices;

internal static class NativeMethods
{
    // Declares managed prototypes for unmanaged functions.
    [DllImport("User32.dll", EntryPoint = "MessageBox",
        CharSet = CharSet.Auto)]
    internal static extern int MsgBox(
        IntPtr hWnd, string lpText, string lpCaption, uint uType);

    // Causes incorrect output in the message window.
    [DllImport("User32.dll", EntryPoint = "MessageBoxW",
        CharSet = CharSet.Ansi)]
    internal static extern int MsgBox2(
        IntPtr hWnd, string lpText, string lpCaption, uint uType);

    // Causes an exception to be thrown. EntryPoint, CharSet, and
    // ExactSpelling fields are mismatched.
    [DllImport("User32.dll", EntryPoint = "MessageBox",
        CharSet = CharSet.Ansi, ExactSpelling = true)]
    internal static extern int MsgBox3(
        IntPtr hWnd, string lpText, string lpCaption, uint uType);
}

public class MsgBoxSample
{
    public static void Main()
    {
        NativeMethods.MsgBox(0, "Correct text", "MsgBox Sample", 0);
        NativeMethods.MsgBox2(0, "Incorrect text", "MsgBox Sample", 0);

        try
        {
            NativeMethods.MsgBox3(0, "No such function", "MsgBox Sample", 0);
        }
        catch (EntryPointNotFoundException)
        {
            Console.WriteLine($"{nameof(EntryPointNotFoundException)} thrown as expected!");
        }
    }
}
```

## Calling Functions

 ```csharp
using System;
using System.Runtime.InteropServices;

internal static class NativeMethods
{
    // Declares managed prototypes for unmanaged functions.
    [DllImport("User32.dll", EntryPoint = "MessageBox",
        CharSet = CharSet.Auto)]
    internal static extern int MsgBox(
        IntPtr hWnd, string lpText, string lpCaption, uint uType);

    // Causes incorrect output in the message window.
    [DllImport("User32.dll", EntryPoint = "MessageBoxW",
        CharSet = CharSet.Ansi)]
    internal static extern int MsgBox2(
        IntPtr hWnd, string lpText, string lpCaption, uint uType);

    // Causes an exception to be thrown. EntryPoint, CharSet, and
    // ExactSpelling fields are mismatched.
    [DllImport("User32.dll", EntryPoint = "MessageBox",
        CharSet = CharSet.Ansi, ExactSpelling = true)]
    internal static extern int MsgBox3(
        IntPtr hWnd, string lpText, string lpCaption, uint uType);
}

public class MsgBoxSample
{
    public static void Main()
    {
        NativeMethods.MsgBox(0, "Correct text", "MsgBox Sample", 0);
        NativeMethods.MsgBox2(0, "Incorrect text", "MsgBox Sample", 0);

        try
        {
            NativeMethods.MsgBox3(0, "No such function", "MsgBox Sample", 0);
        }
        catch (EntryPointNotFoundException)
        {
            Console.WriteLine($"{nameof(EntryPointNotFoundException)} thrown as expected!");
        }
    }
}
```

## See also

- Marshalling Strings
- Default Marshalling for Strings
- Creating Prototypes in Managed Code
- Specifying a Character Set
