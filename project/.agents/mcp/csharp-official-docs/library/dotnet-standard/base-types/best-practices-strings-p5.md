---
title: "Best Practices for Comparing Strings in .NET (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/best-practices-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best Practices for Comparing Strings in .NET (part 5 of 6)

## Common string comparison methods in .NET

The following sections describe the methods that are most commonly used for string comparison.

### `String.Compare`

Default interpretation: `System.StringComparison.CurrentCulture`.

As the operation most central to string interpretation, all instances of these method calls should be examined to determine whether strings should be interpreted according to the current culture, or dissociated from the culture (symbolically). Typically, it's the latter, and a `System.StringComparison.Ordinal` comparison should be used instead.

The `System.Globalization.CompareInfo` class, which is returned by the `System.Globalization.CultureInfo.CompareInfo` property, also includes a `System.Globalization.CompareInfo.Compare*` method that provides a large number of matching options (ordinal, ignoring white space, ignoring kana type, and so on) by means of the `System.Globalization.CompareOptions` flag enumeration.

### `String.CompareTo`

Default interpretation: `System.StringComparison.CurrentCulture`.

This method doesn't currently offer an overload that specifies a `System.StringComparison` type. It's usually possible to convert this method to the recommended `System.String.Compare(System.String,System.String,System.StringComparison)` form.

Types that implement the `System.IComparable` and `System.IComparable`1` interfaces implement this method. Because it doesn't offer the option of a `System.StringComparison` parameter, implementing types often let the user specify a `System.StringComparer` in their constructor. The following example defines a `FileName` class whose class constructor includes a `System.StringComparer` parameter. This `System.StringComparer` object is then used in the `FileName.CompareTo` method.

```csharp
class FileName : IComparable
{
    private readonly StringComparer _comparer;

    public string Name { get; }

    public FileName(string name, StringComparer? comparer)
    {
        if (string.IsNullOrEmpty(name)) throw new ArgumentNullException(nameof(name));

        Name = name;

        if (comparer != null)
            _comparer = comparer;
        else
            _comparer = StringComparer.OrdinalIgnoreCase;
    }

    public int CompareTo(object? obj)
    {
        if (obj == null) return 1;

        if (obj is not FileName)
            return _comparer.Compare(Name, obj.ToString());
        else
            return _comparer.Compare(Name, ((FileName)obj).Name);
    }
}
```
```vb
Class FileName
    Implements IComparable

    Private ReadOnly _comparer As StringComparer

    Public ReadOnly Property Name As String

    Public Sub New(name As String, comparer As StringComparer)
        If (String.IsNullOrEmpty(name)) Then Throw New ArgumentNullException(NameOf(name))

        Me.Name = name

        If comparer IsNot Nothing Then
            _comparer = comparer
        Else
            _comparer = StringComparer.OrdinalIgnoreCase
        End If
    End Sub

    Public Function CompareTo(obj As Object) As Integer Implements IComparable.CompareTo
        If obj Is Nothing Then Return 1

        If TypeOf obj IsNot FileName Then
            Return _comparer.Compare(Name, obj.ToString())
        Else
            Return _comparer.Compare(Name, DirectCast(obj, FileName).Name)
        End If
    End Function
End Class
```
### `String.Equals`

Default interpretation: `System.StringComparison.Ordinal`.

The `System.String` class lets you test for equality by calling either the static or instance `System.String.Equals*` method overloads, or by using the static equality operator. The overloads and operator use ordinal comparison by default. However, we still recommend that you call an overload that explicitly specifies the `System.StringComparison` type even if you want to perform an ordinal comparison; this makes it easier to search code for a certain string interpretation.

### `String.ToUpper` and `String.ToLower`

Default interpretation: `System.StringComparison.CurrentCulture`.

Be careful when you use the `System.String.ToUpper` and `System.String.ToLower` methods, because forcing a string to uppercase or lowercase is often used as a small normalization for comparing strings regardless of case. If so, consider using a case-insensitive comparison.

The `System.String.ToUpperInvariant*` and `System.String.ToLowerInvariant*` methods are also available. `System.String.ToUpperInvariant*` is the standard way to normalize case. Comparisons made using `System.StringComparison.OrdinalIgnoreCase` are behaviorally the composition of two calls: calling `System.String.ToUpperInvariant*` on both string arguments, and doing a comparison using `System.StringComparison.Ordinal`.

Overloads are also available for converting to uppercase and lowercase in a specific culture, by passing a `System.Globalization.CultureInfo` object that represents that culture to the method.

### `Char.ToUpper` and `Char.ToLower`

Default interpretation: `System.StringComparison.CurrentCulture`.

The `System.Char.ToUpper(System.Char)` and `System.Char.ToLower(System.Char)` methods work similarly to the `System.String.ToUpper` and `System.String.ToLower` methods described in the previous section.

### `String.StartsWith` and `String.EndsWith`

Default interpretation: `System.StringComparison.CurrentCulture` (when the first parameter is a `string`), or `System.StringComparison.Ordinal` (when the first parameter is a `char`).

There's an inconsistency in how the default overloads of these methods perform comparisons. Overloads that accept a `char` parameter perform an ordinal comparison, but overloads that accept a `string` parameter perform a culture-sensitive comparison and may ignore non-printing characters.

### `String.IndexOf` and `String.LastIndexOf`

Default interpretation: `System.StringComparison.CurrentCulture`.

There's a lack of consistency in how the default overloads of these methods perform comparisons. All `System.String.IndexOf*` and `System.String.LastIndexOf*` methods that include a `System.Char` parameter perform an ordinal comparison, but the default `System.String.IndexOf*` and `System.String.LastIndexOf*` methods that include a `System.String` parameter perform a culture-sensitive comparison.

If you call the `System.String.IndexOf(System.String)` or `System.String.LastIndexOf(System.String)` method and pass it a string to locate in the current instance, we recommend that you call an overload that explicitly specifies the `System.StringComparison` type. The overloads that include a `System.Char` argument don't allow you to specify a `System.StringComparison` type.

### `String.Contains`

Default interpretation: `System.StringComparison.Ordinal`.

Unlike `System.String.IndexOf*`, the `System.String.Contains*` method uses an ordinal comparison by default for both `char` and `string` overloads. However, you should still pass an explicit `System.StringComparison` argument when the intent matters, to make the behavior clear at the call site.

### `MemoryExtensions.AsSpan.IndexOfAny` and the `SearchValues<T>` type

.NET 8 introduced the `System.Buffers.SearchValues`1` type, which provides an optimized solution for searching for specific sets of characters or bytes within spans.

If you're comparing a string against a fixed set of known values repeatedly, consider using the `System.Buffers.SearchValues`1.Contains(`0)` method instead of chained comparisons or LINQ-based approaches. `SearchValues<T>` can precompute internal lookup structures and optimize the comparison logic based on the provided values. To see performance benefits, create and cache the `SearchValues<string>` instance once, then reuse it for comparisons:

```csharp
﻿using System.Buffers;

namespace ExampleCode;

internal partial class DemoCode
{
    private static readonly SearchValues<string> Commands =
        SearchValues.Create(
            ["start", "run", "go", "begin", "commence"],
            StringComparison.OrdinalIgnoreCase);

    void ProcessCommand(string command)
    {
        if (Commands.Contains(command))
        {
            // ...
        }
    }
}
```
```vb
﻿Imports System.Buffers

Namespace ExampleCode
    Partial Friend Class DemoCode

        Private Shared ReadOnly Commands As SearchValues(Of String) =
            SearchValues.Create(
                {"start", "run", "go", "begin", "commence"},
                StringComparison.OrdinalIgnoreCase)

        Sub ProcessCommand(command As String)
            If Commands.Contains(command) Then
                ' ...
            End If
        End Sub

    End Class
End Namespace
```
In .NET 9, `SearchValues` was extended to support searching for substrings within a larger string. For an example, see `SearchValues` expansion.
