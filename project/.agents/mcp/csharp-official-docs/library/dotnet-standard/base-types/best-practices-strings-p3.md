---
title: "Best Practices for Comparing Strings in .NET (part 3 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/best-practices-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best Practices for Comparing Strings in .NET (part 3 of 6)

### Ordinal string operations

Specifying the `System.StringComparison.Ordinal` or `System.StringComparison.OrdinalIgnoreCase` value in a method call signifies a non-linguistic comparison in which the features of natural languages are ignored. Methods that are invoked with these `System.StringComparison` values base string operation decisions on simple byte comparisons instead of casing or equivalence tables that are parameterized by culture. In most cases, this approach best fits the intended interpretation of strings while making code faster and more reliable.

Ordinal comparisons are string comparisons in which each byte of each string is compared without linguistic interpretation; for example, "windows" doesn't match "Windows". This is essentially a call to the C runtime `strcmp` function. Use this comparison when the context dictates that strings should be matched exactly or demands conservative matching policy. Additionally, ordinal comparison is the fastest comparison operation because it applies no linguistic rules when determining a result.

An `OrdinalIgnoreCase` comparer still operates on a char-by-char basis, but it eliminates case differences while performing the operation. Under an `OrdinalIgnoreCase` comparer, the char pairs `'d'` and `'D'` compare as *equal*, as do the char pairs `'á'` and `'Á'`. But the unaccented char `'a'` compares as *not equal* to the accented char `'á'`.

Some examples of this are provided in the following table:

| String 1   | String 2   | `Ordinal` comparison | `OrdinalIgnoreCase` comparison |
|------------|------------|----------------------|--------------------------------|
| `"dog"`    | `"dog"`    | equal                | equal                          |
| `"dog"`    | `"Dog"`    | not equal            | equal                          |
| `"resume"` | `"résumé"` | not equal            | not equal                      |

Unicode also allows strings to have several different in-memory representations. For example, an e-acute (é) can be represented in two possible ways:

- A single literal `'é'` character (also written as `'\u00E9'`).
- A literal unaccented `'e'` character followed by a combining accent modifier character `'\u0301'`.

This means that the following _four_ strings all display as `"résumé"`, even though their constituent pieces are different. The strings use a combination of literal `'é'` characters or literal unaccented `'e'` characters plus the combining accent modifier `'\u0301'`.

- `"r\u00E9sum\u00E9"`
- `"r\u00E9sume\u0301"`
- `"re\u0301sum\u00E9"`
- `"re\u0301sume\u0301"`

Under an ordinal comparer, none of these strings compare as equal to each other. This is because they all contain different underlying char sequences, even though when they're rendered to the screen, they all look the same.

When performing a `string.IndexOf(..., StringComparison.Ordinal)` operation, the runtime looks for an exact substring match. The results are as follows.

```csharp
Console.WriteLine("resume".IndexOf('e', StringComparison.Ordinal)); // "resume": prints '1'
Console.WriteLine("r\u00E9sum\u00E9".IndexOf('e', StringComparison.Ordinal)); // "résumé": prints '-1'
Console.WriteLine("r\u00E9sume\u0301".IndexOf('e', StringComparison.Ordinal)); // "résumé": prints '5'
Console.WriteLine("re\u0301sum\u00E9".IndexOf('e', StringComparison.Ordinal)); // "résumé": prints '1'
Console.WriteLine("re\u0301sume\u0301".IndexOf('e', StringComparison.Ordinal)); // "résumé": prints '1'
Console.WriteLine("resume".IndexOf('e', StringComparison.OrdinalIgnoreCase)); // "resume": prints '1'
Console.WriteLine("r\u00E9sum\u00E9".IndexOf('e', StringComparison.OrdinalIgnoreCase)); // "résumé": prints '-1'
Console.WriteLine("r\u00E9sume\u0301".IndexOf('e', StringComparison.OrdinalIgnoreCase)); // "résumé": prints '5'
Console.WriteLine("re\u0301sum\u00E9".IndexOf('e', StringComparison.OrdinalIgnoreCase)); // "résumé": prints '1'
Console.WriteLine("re\u0301sume\u0301".IndexOf('e', StringComparison.OrdinalIgnoreCase)); // "résumé": prints '1'
```
```vb
Sub IndexOfExample()
    Console.WriteLine("resume".IndexOf("e"c, StringComparison.Ordinal)) ' "resume": prints '1'
    Console.WriteLine(("r" & ChrW(&HE9) & "sum" & ChrW(&HE9)).IndexOf("e"c, StringComparison.Ordinal)) ' "résumé": prints '-1'
    Console.WriteLine(("r" & ChrW(&HE9) & "sume" & ChrW(&H301)).IndexOf("e"c, StringComparison.Ordinal)) ' "résumé": prints '5'
    Console.WriteLine(("re" & ChrW(&H301) & "sum" & ChrW(&HE9)).IndexOf("e"c, StringComparison.Ordinal)) ' "résumé": prints '1'
    Console.WriteLine(("re" & ChrW(&H301) & "sume" & ChrW(&H301)).IndexOf("e"c, StringComparison.Ordinal)) ' "résumé": prints '1'
    Console.WriteLine("resume".IndexOf("e"c, StringComparison.OrdinalIgnoreCase)) ' "resume": prints '1'
    Console.WriteLine(("r" & ChrW(&HE9) & "sum" & ChrW(&HE9)).IndexOf("e"c, StringComparison.OrdinalIgnoreCase)) ' "résumé": prints '-1'
    Console.WriteLine(("r" & ChrW(&HE9) & "sume" & ChrW(&H301)).IndexOf("e"c, StringComparison.OrdinalIgnoreCase)) ' "résumé": prints '5'
    Console.WriteLine(("re" & ChrW(&H301) & "sum" & ChrW(&HE9)).IndexOf("e"c, StringComparison.OrdinalIgnoreCase)) ' "résumé": prints '1'
    Console.WriteLine(("re" & ChrW(&H301) & "sume" & ChrW(&H301)).IndexOf("e"c, StringComparison.OrdinalIgnoreCase)) ' "résumé": prints '1'
End Sub
```
Ordinal search and comparison routines are never affected by the current thread's culture setting.

Strings in .NET can contain embedded null characters (and other non-printing characters). One of the clearest differences between ordinal and culture-sensitive comparison (including comparisons that use the invariant culture) concerns the handling of embedded null characters in a string. These characters are ignored when you use the `System.String.Compare*` and `System.String.Equals*` methods to perform culture-sensitive comparisons (including comparisons that use the invariant culture). As a result, strings that contain embedded null characters can be considered equal to strings that don't. Embedded non-printing characters might be skipped for the purpose of string comparison methods, such as `System.String.StartsWith*`.

> **Important:**
> Although string comparison methods disregard embedded null characters, string search methods such as `System.String.Contains*`, `System.String.EndsWith*`, `System.String.IndexOf*`, `System.String.LastIndexOf*`, and `System.String.StartsWith*` do not.

The following example performs a culture-sensitive comparison of the string "Aa" with a similar string that contains several embedded null characters between "A" and "a", and shows how the two strings are considered equal:

```csharp
﻿string str1 = "Aa";
string str2 = "A" + new string('\u0000', 3) + "a";

Thread.CurrentThread.CurrentCulture = System.Globalization.CultureInfo.GetCultureInfo("en-us");

Console.WriteLine($"Comparing '{str1}' ({ShowBytes(str1)}) and '{str2}' ({ShowBytes(str2)}):");
Console.WriteLine("   With String.Compare:");
Console.WriteLine($"      Current Culture: {string.Compare(str1, str2, StringComparison.CurrentCulture)}");
Console.WriteLine($"      Invariant Culture: {string.Compare(str1, str2, StringComparison.InvariantCulture)}");
Console.WriteLine("   With String.Equals:");
Console.WriteLine($"      Current Culture: {string.Equals(str1, str2, StringComparison.CurrentCulture)}");
Console.WriteLine($"      Invariant Culture: {string.Equals(str1, str2, StringComparison.InvariantCulture)}");

string ShowBytes(string value)
{
   string hexString = string.Empty;
   for (int index = 0; index < value.Length; index++)
   {
      string result = Convert.ToInt32(value[index]).ToString("X4");
      result = string.Concat(" ", result.Substring(0,2), " ", result.Substring(2, 2));
      hexString += result;
   }
   return hexString.Trim();
}

// The example displays the following output:
//     Comparing 'Aa' (00 41 00 61) and 'Aa' (00 41 00 00 00 00 00 00 00 61):
//        With String.Compare:
//           Current Culture: 0
//           Invariant Culture: 0
//        With String.Equals:
//           Current Culture: True
//           Invariant Culture: True
```
```vb
﻿
Module Program
    Sub Main()
        Dim str1 As String = "Aa"
        Dim str2 As String = "A" & New String(Convert.ToChar(0), 3) & "a"

        Console.WriteLine($"Comparing '{str1}' ({ShowBytes(str1)}) and '{str2}' ({ShowBytes(str2)}):")
        Console.WriteLine("   With String.Compare:")
        Console.WriteLine($"      Current Culture: {String.Compare(str1, str2, StringComparison.CurrentCulture)}")
        Console.WriteLine($"      Invariant Culture: {String.Compare(str1, str2, StringComparison.InvariantCulture)}")
        Console.WriteLine("   With String.Equals:")
        Console.WriteLine($"      Current Culture: {String.Equals(str1, str2, StringComparison.CurrentCulture)}")
        Console.WriteLine($"      Invariant Culture: {String.Equals(str1, str2, StringComparison.InvariantCulture)}")
    End Sub

    Function ShowBytes(str As String) As String
        Dim hexString As String = String.Empty

        For ctr As Integer = 0 To str.Length - 1
            Dim result As String = Convert.ToInt32(str.Chars(ctr)).ToString("X4")
            result = String.Concat(" ", result.Substring(0, 2), " ", result.Substring(2, 2))
            hexString &= result
        Next

        Return hexString.Trim()
    End Function

    ' The example displays the following output:
    '     Comparing 'Aa' (00 41 00 61) and 'Aa' (00 41 00 00 00 00 00 00 00 61):
    '        With String.Compare:
    '           Current Culture: 0
    '           Invariant Culture: 0
    '        With String.Equals:
    '           Current Culture: True
    '           Invariant Culture: True
End Module
```
However, the strings aren't considered equal when you use ordinal comparison, as the following example shows:

```csharp
﻿string str1 = "Aa";
string str2 = "A" + new String('\u0000', 3) + "a";

Console.WriteLine($"Comparing '{str1}' ({ShowBytes(str1)}) and '{str2}' ({ShowBytes(str2)}):");
Console.WriteLine("   With String.Compare:");
Console.WriteLine($"      Ordinal: {string.Compare(str1, str2, StringComparison.Ordinal)}");
Console.WriteLine("   With String.Equals:");
Console.WriteLine($"      Ordinal: {string.Equals(str1, str2, StringComparison.Ordinal)}");

string ShowBytes(string str)
{
    string hexString = string.Empty;
    for (int ctr = 0; ctr < str.Length; ctr++)
    {
        string result = Convert.ToInt32(str[ctr]).ToString("X4");
        result = " " + result.Substring(0, 2) + " " + result.Substring(2, 2);
        hexString += result;
    }
    return hexString.Trim();
}

// The example displays the following output:
//    Comparing 'Aa' (00 41 00 61) and 'A   a' (00 41 00 00 00 00 00 00 00 61):
//       With String.Compare:
//          Ordinal: 97
//       With String.Equals:
//          Ordinal: False
```
```vb
﻿Module Program
    Sub Main()
        Dim str1 As String = "Aa"
        Dim str2 As String = "A" & New String(Convert.ToChar(0), 3) & "a"

        Console.WriteLine($"Comparing '{str1}' ({ShowBytes(str1)}) and '{str2}' ({ShowBytes(str2)}):")
        Console.WriteLine("   With String.Compare:")
        Console.WriteLine($"      Ordinal: {String.Compare(str1, str2, StringComparison.Ordinal)}")
        Console.WriteLine("   With String.Equals:")
        Console.WriteLine($"      Ordinal: {String.Equals(str1, str2, StringComparison.Ordinal)}")
    End Sub

    Function ShowBytes(str As String) As String
        Dim hexString As String = String.Empty

        For ctr As Integer = 0 To str.Length - 1
            Dim result As String = Convert.ToInt32(str.Chars(ctr)).ToString("X4")
            result = String.Concat(" ", result.Substring(0, 2), " ", result.Substring(2, 2))
            hexString &= result
        Next

        Return hexString.Trim()
    End Function

    ' The example displays the following output:
    '    Comparing 'Aa' (00 41 00 61) and 'A   a' (00 41 00 00 00 00 00 00 00 61):
    '       With String.Compare:
    '          Ordinal: 97
    '       With String.Equals:
    '          Ordinal: False
End Module
```
Case-insensitive ordinal comparisons are the next most conservative approach. These comparisons ignore most casing; for example, "windows" matches "Windows". When dealing with ASCII characters, this policy is equivalent to `System.StringComparison.Ordinal`, except that it ignores the usual ASCII casing. Therefore, any character in [A, Z] (\u0041-\u005A) matches the corresponding character in [a,z] (\u0061-\007A). Casing outside the ASCII range uses the invariant culture's tables. Therefore, the following comparison:

```csharp
string.Compare(strA, strB, StringComparison.OrdinalIgnoreCase);
```
```vb
String.Compare(strA, strB, StringComparison.OrdinalIgnoreCase)
```
is equivalent to (but faster than) this comparison:

```csharp
string.Compare(strA.ToUpperInvariant(), strB.ToUpperInvariant(), StringComparison.Ordinal);
```
```vb
String.Compare(strA.ToUpperInvariant(), strB.ToUpperInvariant(), StringComparison.Ordinal)
```
These comparisons are still very fast.

Both `System.StringComparison.Ordinal` and `System.StringComparison.OrdinalIgnoreCase` use the binary values directly, and are best suited for matching. When you aren't sure about your comparison settings, use one of these two values. However, because they perform a byte-by-byte comparison, they don't sort by a linguistic sort order (like an English dictionary) but by a binary sort order. The results may look odd in most contexts if displayed to users.

Ordinal semantics are the default for `System.String.Equals*` overloads that don't include a `System.StringComparison` argument (including the equality operator). In any case, we recommend that you call an overload that has a `System.StringComparison` parameter.
