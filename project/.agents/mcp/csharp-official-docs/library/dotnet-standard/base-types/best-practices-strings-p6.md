---
title: "Best Practices for Comparing Strings in .NET (part 6 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/best-practices-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best Practices for Comparing Strings in .NET (part 6 of 6)

## Methods that perform string comparison indirectly

Some non-string methods that have string comparison as a central operation use the `System.StringComparer` type. The `System.StringComparer` class includes six static properties that return `System.StringComparer` instances whose `System.StringComparer.Compare*` methods perform the following types of string comparisons:

- Culture-sensitive string comparisons using the current culture. This `System.StringComparer` object is returned by the `System.StringComparer.CurrentCulture` property.
- Case-insensitive comparisons using the current culture. This `System.StringComparer` object is returned by the `System.StringComparer.CurrentCultureIgnoreCase` property.
- Culture-insensitive comparisons using the word comparison rules of the invariant culture. This `System.StringComparer` object is returned by the `System.StringComparer.InvariantCulture` property.
- Case-insensitive and culture-insensitive comparisons using the word comparison rules of the invariant culture. This `System.StringComparer` object is returned by the `System.StringComparer.InvariantCultureIgnoreCase` property.
- Ordinal comparison. This `System.StringComparer` object is returned by the `System.StringComparer.Ordinal` property.
- Case-insensitive ordinal comparison. This `System.StringComparer` object is returned by the `System.StringComparer.OrdinalIgnoreCase` property.

### `Array.Sort` and `Array.BinarySearch`

Default interpretation: `System.StringComparison.CurrentCulture`.

When you store any data in a collection, or read persisted data from a file or database into a collection, switching the current culture can invalidate the invariants in the collection. The `System.Array.BinarySearch*` method assumes that the elements in the array to be searched are already sorted. To sort any string element in the array, the `System.Array.Sort*` method calls the `System.String.Compare*` method to order individual elements. Using a culture-sensitive comparer can be dangerous if the culture changes between the time that the array is sorted and its contents are searched. For example, in the following code, storage and retrieval operate on the comparer that is provided implicitly by the `Thread.CurrentThread.CurrentCulture` property. If the culture can change between the calls to `StoreNames` and `DoesNameExist`, and especially if the array contents are persisted somewhere between the two method calls, the binary search may fail.

```csharp
// Incorrect
string[] _storedNames;

public void StoreNames(string[] names)
{
    _storedNames = new string[names.Length];

    // Copy the array contents into a new array
    Array.Copy(names, _storedNames, names.Length);

    Array.Sort(_storedNames); // Line A
}

public bool DoesNameExist(string name) =>
    Array.BinarySearch(_storedNames, name) >= 0; // Line B
```
```vb
' Incorrect
Dim _storedNames As String()

Sub StoreNames(names As String())
    ReDim _storedNames(names.Length - 1)

    ' Copy the array contents into a new array
    Array.Copy(names, _storedNames, names.Length)

    Array.Sort(_storedNames) ' Line A
End Sub

Function DoesNameExist(name As String) As Boolean
    Return Array.BinarySearch(_storedNames, name) >= 0 ' Line B
End Function
```
A recommended variation appears in the following example, which uses the same ordinal (culture-insensitive) comparison method both to sort and to search the array. The change code is reflected in the lines labeled `Line A` and `Line B` in the two examples.

```csharp
// Correct
string[] _storedNames;

public void StoreNames(string[] names)
{
    _storedNames = new string[names.Length];

    // Copy the array contents into a new array
    Array.Copy(names, _storedNames, names.Length);

    Array.Sort(_storedNames, StringComparer.Ordinal); // Line A
}

public bool DoesNameExist(string name) =>
    Array.BinarySearch(_storedNames, name, StringComparer.Ordinal) >= 0; // Line B
```
```vb
' Correct
Dim _storedNames As String()

Sub StoreNames(names As String())
    ReDim _storedNames(names.Length - 1)

    ' Copy the array contents into a new array
    Array.Copy(names, _storedNames, names.Length)

    Array.Sort(_storedNames, StringComparer.Ordinal) ' Line A
End Sub

Function DoesNameExist(name As String) As Boolean
    Return Array.BinarySearch(_storedNames, name, StringComparer.Ordinal) >= 0 ' Line B
End Function
```
If this data is persisted and moved across cultures, and sorting is used to present this data to the user, you might consider using `System.StringComparison.InvariantCulture`, which operates linguistically for better user output but is unaffected by changes in culture. The following example modifies the two previous examples to use the invariant culture for sorting and searching the array.

```csharp
// Correct
string[] _storedNames;

public void StoreNames(string[] names)
{
    _storedNames = new string[names.Length];

    // Copy the array contents into a new array
    Array.Copy(names, _storedNames, names.Length);

    Array.Sort(_storedNames, StringComparer.InvariantCulture); // Line A
}

public bool DoesNameExist(string name) =>
    Array.BinarySearch(_storedNames, name, StringComparer.InvariantCulture) >= 0; // Line B
```
```vb
' Correct
Dim _storedNames As String()

Sub StoreNames(names As String())
    ReDim _storedNames(names.Length - 1)

    ' Copy the array contents into a new array
    Array.Copy(names, _storedNames, names.Length)

    Array.Sort(_storedNames, StringComparer.InvariantCulture) ' Line A
End Sub

Function DoesNameExist(name As String) As Boolean
    Return Array.BinarySearch(_storedNames, name, StringComparer.InvariantCulture) >= 0 ' Line B
End Function
```
### Collections example: `Hashtable` constructor

Hashing strings provides a second example of an operation that is affected by the way in which strings are compared.

The following example instantiates a `System.Collections.Hashtable` object by passing it the `System.StringComparer` object that is returned by the `System.StringComparer.OrdinalIgnoreCase` property. Because a class `System.StringComparer` that is derived from `System.StringComparer` implements the `System.Collections.IEqualityComparer` interface, its `System.Collections.IEqualityComparer.GetHashCode*` method is used to compute the hash code of strings in the hash table.

```csharp
﻿using System.IO;
using System.Collections;

const int InitialCapacity = 100;

Hashtable creationTimeByFile = new(InitialCapacity, StringComparer.OrdinalIgnoreCase);
string directoryToProcess = Directory.GetCurrentDirectory();

// Fill the hash table
PopulateFileTable(directoryToProcess);

// Get some of the files and try to find them with upper cased names
foreach (var file in Directory.GetFiles(directoryToProcess))
    PrintCreationTime(file.ToUpper());

void PopulateFileTable(string directory)
{
    foreach (string file in Directory.GetFiles(directory))
        creationTimeByFile.Add(file, File.GetCreationTime(file));
}

void PrintCreationTime(string targetFile)
{
    object? dt = creationTimeByFile[targetFile];

    if (dt is DateTime value)
        Console.WriteLine($"File {targetFile} was created at time {value}.");
    else
        Console.WriteLine($"File {targetFile} does not exist.");
}
```
```vb
﻿Imports System.IO

Module Program
    Const InitialCapacity As Integer = 100

    Private ReadOnly s_creationTimeByFile As New Hashtable(InitialCapacity, StringComparer.OrdinalIgnoreCase)
    Private ReadOnly s_directoryToProcess As String = Directory.GetCurrentDirectory()

    Sub Main()
        ' Fill the hash table
        PopulateFileTable(s_directoryToProcess)

        ' Get some of the files and try to find them with upper cased names
        For Each File As String In Directory.GetFiles(s_directoryToProcess)
            PrintCreationTime(File.ToUpper())
        Next
    End Sub

    Sub PopulateFileTable(directoryPath As String)
        For Each file As String In Directory.GetFiles(directoryPath)
            s_creationTimeByFile.Add(file, IO.File.GetCreationTime(file))
        Next
    End Sub

    Sub PrintCreationTime(targetFile As String)
        Dim dt As Object = s_creationTimeByFile(targetFile)

        If TypeOf dt Is Date Then
            Console.WriteLine($"File {targetFile} was created at time {DirectCast(dt, Date)}.")
        Else
            Console.WriteLine($"File {targetFile} does not exist.")
        End If
    End Sub
End Module
```
### Collections example: `SortedSet<T>` and `List<T>.Sort`

The same locale-sensitivity issue applies when instantiating a sorted collection of strings or sorting an existing string-based collection. Always specify an explicit comparer:

```csharp
// Words to sort
string[] values = [ "able", "ångström", "apple", "Æble",
            "Windows", "Visual Studio" ];

//
// Potentially incorrect code - behavior might vary based on locale.
//
SortedSet<string> mySet = [.. values]; // No comparer specified

List<string> list = [.. values];
list.Sort(); // No comparer specified

//
// Corrected code - uses ordinal sorting; doesn't vary by locale.
//
SortedSet<string> mySet2 = new(values, StringComparer.Ordinal);

List<string> list2 = [.. values];
list2.Sort(StringComparer.Ordinal);
```
```vb
' Words to sort
Dim values As String() = {"able", "ångström", "apple", "Æble",
                          "Windows", "Visual Studio"}

'
' Potentially incorrect code - behavior might vary based on locale.
'
Dim mySet As New SortedSet(Of String)(values) ' No comparer specified

Dim list As New List(Of String)(values)
list.Sort() ' No comparer specified

'
' Corrected code - uses ordinal sorting; doesn't vary by locale.
'
Dim mySet2 As New SortedSet(Of String)(values, StringComparer.Ordinal)

Dim list2 As New List(Of String)(values)
list2.Sort(StringComparer.Ordinal)
```
## Differences between .NET and .NET Framework

.NET and .NET Framework handle globalization differently. .NET Framework on Windows uses the operating system's National Language Support (NLS) facility for linguistic string comparisons. .NET uses the International Components for Unicode (ICU) library for linguistic string comparisons on all supported platforms.

Because ICU and NLS implement different logic in their linguistic comparers, the results of string methods that use culture-sensitive comparison can differ between .NET and .NET Framework. This matters for any method that uses a linguistic comparer by default, including:

- `System.String.Compare*`
- `System.String.EndsWith*` (when the first parameter is a `string`)
- `System.String.IndexOf*` (when the first parameter is a `string`)
- `System.String.StartsWith*` (when the first parameter is a `string`)
- `System.String.ToLower*`
- `System.String.ToLowerInvariant*`
- `System.String.ToUpper*`
- `System.String.ToUpperInvariant*`
- `System.Globalization.TextInfo` (most members)
- `System.Globalization.CompareInfo` (most members)
- `System.Array.Sort*` (when sorting arrays of strings)
- `System.Collections.Generic.List`1.Sort` (when the list elements are strings)
- `System.Collections.Generic.SortedDictionary`2` (when the keys are strings)
- `System.Collections.Generic.SortedList`2` (when the keys are strings)
- `System.Collections.Generic.SortedSet`1` (when the set contains strings)

> **Note:**
> This is not an exhaustive list of affected APIs.

One notable difference is the handling of embedded null and other control characters. When you use a linguistic comparer under NLS, some control characters such as the null character (`\0`) might be treated as ignorable in certain comparison contexts. Under ICU, these characters are treated as actual characters in the string. This can cause `string.IndexOf(string)` to return different results when the search string contains a null character.

For example, the following code can produce a different answer depending on the current runtime:

```csharp
const string greeting = "Hel\0lo";
Console.WriteLine($"{greeting.IndexOf("\0")}");

// The snippet prints:
//
// '3' when running on .NET Framework and .NET Core 2.x - 3.x (Windows)
// '0' when running on .NET 5 or later (Windows)
// '0' when running on .NET Core 2.x - 3.x or .NET 5 (non-Windows)
// '3' when running on .NET Core 2.x or .NET 5+ (in invariant mode)
```
```vb
Const greeting As String = "Hel" & vbNullChar & "lo"
Console.WriteLine($"{greeting.IndexOf(CStr(vbNullChar))}")

' The snippet prints:
'
' '3' when running on .NET Framework and .NET Core 2.x - 3.x (Windows)
' '0' when running on .NET 5 or later (Windows)
' '0' when running on .NET Core 2.x - 3.x or .NET 5 (non-Windows)
' '3' when running on .NET Core 2.x or .NET 5+ (in invariant mode)
```
The best way to avoid these cross-platform and cross-implementation surprises is to always pass an explicit `System.StringComparison` argument to string comparison methods, and to use `System.StringComparison.Ordinal` or `System.StringComparison.OrdinalIgnoreCase` for non-linguistic comparisons.

If you migrate an application from .NET Framework to .NET and rely on legacy NLS behaviors on Windows, you can configure the application to use NLS. For more information, see .NET globalization and ICU.

## See also

- Globalization in .NET apps
- .NET globalization and ICU
- How to compare strings in C#
