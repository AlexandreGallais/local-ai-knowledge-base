---
title: "Best Practices for Comparing Strings in .NET (part 2 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/best-practices-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best Practices for Comparing Strings in .NET (part 2 of 6)

## The details of string comparison

String comparison is the heart of many string-related operations, particularly sorting and testing for equality. Strings sort in a determined order: If "my" appears before "string" in a sorted list of strings, "my" must compare less than or equal to "string". Additionally, comparison implicitly defines equality. The comparison operation returns zero for strings it deems equal. A good interpretation is that neither string is less than the other. Most meaningful operations involving strings include one or both of these procedures: comparing with another string, and executing a well-defined sort operation.

> **Note:**
> You can download the Sorting Weight Tables, a set of text files that contain information on the character weights used in sorting and comparison operations for Windows operating systems, and the Default Unicode Collation Element Table, the latest version of the sort weight table for Linux and macOS. The specific version of the sort weight table on Linux and macOS depends on the version of the International Components for Unicode libraries installed on the system. For information on ICU versions and the Unicode versions that they implement, see Downloading ICU.

However, evaluating two strings for equality or sort order doesn't yield a single, correct result; the outcome depends on the criteria used to compare the strings. In particular, string comparisons that are ordinal or that are based on the casing and sorting conventions of the current culture or the invariant culture (a locale-agnostic culture based on the English language) may produce different results.

In addition, string comparisons using different versions of .NET or using .NET on different operating systems or operating system versions may return different results. .NET uses the International Components for Unicode (ICU) library for linguistic string comparisons on all supported platforms. For more information, see Strings and the Unicode Standard and .NET globalization and ICU.

### String comparisons that use the current culture

One criterion involves using the conventions of the current culture when comparing strings. Comparisons that are based on the current culture use the thread's current culture or locale. If the culture isn't set by the user, it defaults to the operating system's setting. You should always use comparisons that are based on the current culture when data is linguistically relevant, and when it reflects culture-sensitive user interaction.

However, comparison and casing behavior in .NET changes when the culture changes. This happens when an application executes on a computer that has a different culture than the computer on which the application was developed, or when the executing thread changes its culture. This behavior is intentional, but it remains non-obvious to many developers. The following example illustrates differences in sort order between the U.S. English ("en-US") and Swedish ("sv-SE") cultures. Note that the words "ångström", "Windows", and "Visual Studio" appear in different positions in the sorted string arrays.

```csharp
﻿using System.Globalization;

// Words to sort
string[] values= { "able", "ångström", "apple", "Æble",
                    "Windows", "Visual Studio" };

// Current culture
Array.Sort(values);
DisplayArray(values);

// Change culture to Swedish (Sweden)
string originalCulture = CultureInfo.CurrentCulture.Name;
Thread.CurrentThread.CurrentCulture = new CultureInfo("sv-SE");
Array.Sort(values);
DisplayArray(values);

// Restore the original culture
Thread.CurrentThread.CurrentCulture = new CultureInfo(originalCulture);

static void DisplayArray(string[] values)
{
    Console.WriteLine($"Sorting using the {CultureInfo.CurrentCulture.Name} culture:");
    
    foreach (string value in values)
        Console.WriteLine($"   {value}");

    Console.WriteLine();
}

// The example displays the following output:
//     Sorting using the en-US culture:
//        able
//        Æble
//        ångström
//        apple
//        Visual Studio
//        Windows
//
//     Sorting using the sv-SE culture:
//        able
//        apple
//        Visual Studio
//        Windows
//        ångström
//        Æble
```
```vb
﻿Imports System.Globalization
Imports System.Threading

Module Program
    Sub Main()
        ' Words to sort
        Dim values As String() = {"able", "ångström", "apple", "Æble",
                                  "Windows", "Visual Studio"}

        ' Current culture
        Array.Sort(values)
        DisplayArray(values)

        ' Change culture to Swedish (Sweden)
        Dim originalCulture As String = CultureInfo.CurrentCulture.Name
        Thread.CurrentThread.CurrentCulture = New CultureInfo("sv-SE")
        Array.Sort(values)
        DisplayArray(values)

        ' Restore the original culture
        Thread.CurrentThread.CurrentCulture = New CultureInfo(originalCulture)
    End Sub

    Sub DisplayArray(values As String())
        Console.WriteLine($"Sorting using the {CultureInfo.CurrentCulture.Name} culture:")

        For Each value As String In values
            Console.WriteLine($"   {value}")
        Next

        Console.WriteLine()
    End Sub
End Module

' The example displays the following output:
'     Sorting using the en-US culture:
'        able
'        Æble
'        ångström
'        apple
'        Visual Studio
'        Windows
'
'     Sorting using the sv-SE culture:
'        able
'        apple
'        Visual Studio
'        Windows
'        ångström
'        Æble
```
Case-insensitive comparisons that use the current culture are the same as culture-sensitive comparisons, except that they ignore case as dictated by the thread's current culture. This behavior may manifest itself in sort orders as well.

Comparisons that use current culture semantics are the default for the following methods:

- `System.String.Compare*` overloads that don't include a `System.StringComparison` parameter.
- `System.String.CompareTo*` overloads.
- The default `System.String.StartsWith(System.String)` method, and the `System.String.StartsWith(System.String,System.Boolean,System.Globalization.CultureInfo)` method with a `null``System.Globalization.CultureInfo` parameter.
- The default `System.String.EndsWith(System.String)` method, and the `System.String.EndsWith(System.String,System.Boolean,System.Globalization.CultureInfo)` method with a `null``System.Globalization.CultureInfo` parameter.
- `System.String.IndexOf*` overloads that accept a `System.String` as a search parameter and that don't have a `System.StringComparison` parameter.
- `System.String.LastIndexOf*` overloads that accept a `System.String` as a search parameter and that don't have a `System.StringComparison` parameter.

In any case, we recommend that you call an overload that has a `System.StringComparison` parameter to make the intent of the method call clear.

Subtle and not so subtle bugs can emerge when non-linguistic string data is interpreted linguistically, or when string data from a particular culture is interpreted using the conventions of another culture. The canonical example is the Turkish-I problem.

For nearly all Latin alphabets, including U.S. English, the character "i" (\u0069) is the lowercase version of the character "I" (\u0049). This casing rule quickly becomes the default for someone programming in such a culture. However, the Turkish ("tr-TR") alphabet includes an "I with a dot" character "İ" (\u0130), which is the capital version of "i". Turkish also includes a lowercase "i without a dot" character, "ı" (\u0131), which capitalizes to "I". This behavior occurs in the Azerbaijani ("az") culture as well.

Therefore, assumptions made about capitalizing "i" or lowercasing "I" aren't valid among all cultures. If you use the default overloads for string comparison routines, they will be subject to variance between cultures. If the data to be compared is non-linguistic, using the default overloads can produce undesirable results, as the following attempt to perform a case-insensitive comparison of the strings "bill" and "BILL" illustrates.

```csharp
using System.Globalization;

string name = "Bill";

Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
Console.WriteLine($"Culture = {Thread.CurrentThread.CurrentCulture.DisplayName}");
Console.WriteLine($"   Is 'Bill' the same as 'BILL'? {name.Equals("BILL", StringComparison.OrdinalIgnoreCase)}");
Console.WriteLine($"   Does 'Bill' start with 'BILL'? {name.StartsWith("BILL", true, null)}");
Console.WriteLine();

Thread.CurrentThread.CurrentCulture = new CultureInfo("tr-TR");
Console.WriteLine($"Culture = {Thread.CurrentThread.CurrentCulture.DisplayName}");
Console.WriteLine($"   Is 'Bill' the same as 'BILL'? {name.Equals("BILL", StringComparison.OrdinalIgnoreCase)}");
Console.WriteLine($"   Does 'Bill' start with 'BILL'? {name.StartsWith("BILL", true, null)}");

//' The example displays the following output:
//'
//'     Culture = English (United States)
//'        Is 'Bill' the same as 'BILL'? True
//'        Does 'Bill' start with 'BILL'? True
//'     
//'     Culture = Turkish (Türkiye)
//'        Is 'Bill' the same as 'BILL'? True
//'        Does 'Bill' start with 'BILL'? False
```
```vb
Imports System.Globalization
Imports System.Threading

Module Program
    Sub Main()
        Dim name As String = "Bill"

        Thread.CurrentThread.CurrentCulture = New CultureInfo("en-US")
        Console.WriteLine($"Culture = {Thread.CurrentThread.CurrentCulture.DisplayName}")
        Console.WriteLine($"   Is 'Bill' the same as 'BILL'? {name.Equals("BILL", StringComparison.OrdinalIgnoreCase)}")
        Console.WriteLine($"   Does 'Bill' start with 'BILL'? {name.StartsWith("BILL", True, Nothing)}")
        Console.WriteLine()

        Thread.CurrentThread.CurrentCulture = New CultureInfo("tr-TR")
        Console.WriteLine($"Culture = {Thread.CurrentThread.CurrentCulture.DisplayName}")
        Console.WriteLine($"   Is 'Bill' the same as 'BILL'? {name.Equals("BILL", StringComparison.OrdinalIgnoreCase)}")
        Console.WriteLine($"   Does 'Bill' start with 'BILL'? {name.StartsWith("BILL", True, Nothing)}")
    End Sub

End Module

' The example displays the following output:
'
'     Culture = English (United States)
'        Is 'Bill' the same as 'BILL'? True
'        Does 'Bill' start with 'BILL'? True
'     
'     Culture = Turkish (Türkiye)
'        Is 'Bill' the same as 'BILL'? True
'        Does 'Bill' start with 'BILL'? False
```
This comparison could cause significant problems if the culture is inadvertently used in security-sensitive settings, as in the following example. A method call such as `IsFileURI("file:")` returns `true` if the current culture is U.S. English, but `false` if the current culture is Turkish. Thus, on Turkish systems, someone could circumvent security measures that block access to case-insensitive URIs that begin with "FILE:".

```csharp
public static bool IsFileURI(string path) =>
    path.StartsWith("FILE:", true, null);
```
```vb
Public Shared Function IsFileURI(path As String) As Boolean
    Return path.StartsWith("FILE:", True, Nothing)
End Function
```
In this case, because "file:" is meant to be interpreted as a non-linguistic, culture-insensitive identifier, the code should instead be written as shown in the following example:

```csharp
public static bool IsFileURI(string path) =>
    path.StartsWith("FILE:", StringComparison.OrdinalIgnoreCase);
```
```vb
Public Shared Function IsFileURI(path As String) As Boolean
    Return path.StartsWith("FILE:", StringComparison.OrdinalIgnoreCase)
End Function
```
