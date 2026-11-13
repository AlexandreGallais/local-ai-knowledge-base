---
title: "Best Practices for Comparing Strings in .NET (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/best-practices-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best Practices for Comparing Strings in .NET (part 4 of 6)

### Linguistic string comparisons

*Linguistic* search and comparison routines decompose a string into *collation elements* and perform searches or comparisons on these elements. There's not necessarily a 1:1 mapping between a string's characters and its constituent collation elements. For example, a string of length 2 may consist of only a single collation element. When two strings are compared in a linguistic-aware fashion, the comparer checks whether the two strings' collation elements have the same semantic meaning, even if the string's literal characters are different.

Consider the string `"résumé"` and its four different representations described in the previous section. The following table shows each representation broken down into its collation elements.

| String                 | As collation elements                           |
|------------------------|-------------------------------------------------|
| `"r\u00E9sum\u00E9"`   | `"r" + "\u00E9" + "s" + "u" + "m" + "\u00E9"`   |
| `"r\u00E9sume\u0301"`  | `"r" + "\u00E9" + "s" + "u" + "m" + "e\u0301"`  |
| `"re\u0301sum\u00E9"`  | `"r" + "e\u0301" + "s" + "u" + "m" + "\u00E9"`  |
| `"re\u0301sume\u0301"` | `"r" + "e\u0301" + "s" + "u" + "m" + "e\u0301"` |

A collation element corresponds loosely to what readers would think of as a single character or cluster of characters. It's conceptually similar to a grapheme cluster but encompasses a somewhat larger umbrella.

Under a linguistic comparer, exact matches aren't necessary. Collation elements are instead compared based on their semantic meaning. For example, a linguistic comparer treats the substrings `"\u00E9"` and `"e\u0301"` as equal since they both semantically mean "a lowercase e with an acute accent modifier." This allows the `IndexOf` method to match the substring `"e\u0301"` within a larger string that contains the semantically equivalent substring `"\u00E9"`, as shown in the following code sample.

```csharp
Console.WriteLine("r\u00E9sum\u00E9".IndexOf("e")); // "résumé": prints '-1' (not found)
Console.WriteLine("r\u00E9sum\u00E9".IndexOf("\u00E9")); // "résumé": prints '1'
Console.WriteLine("\u00E9".IndexOf("e\u0301")); // prints '0'
```
```vb
Sub IndexOfStringExample()
    Console.WriteLine(("r" & ChrW(&HE9) & "sum" & ChrW(&HE9)).IndexOf("e")) ' "résumé": prints '-1' (not found)
    Console.WriteLine(("r" & ChrW(&HE9) & "sum" & ChrW(&HE9)).IndexOf(ChrW(&HE9).ToString())) ' "résumé": prints '1'
    Console.WriteLine(ChrW(&HE9).ToString().IndexOf("e" & ChrW(&H301))) ' prints '0'
End Sub
```
As a consequence of this, two strings of different lengths may compare as equal if a linguistic comparison is used. Callers should take care not to special-case logic that deals with string length in such scenarios.

*Culture-aware* search and comparison routines are a special form of linguistic search and comparison routines. Under a culture-aware comparer, the concept of a collation element is extended to include information specific to the specified culture.

For example, in the Hungarian alphabet, when the two characters \<dz\> appear back-to-back, they are considered their own unique letter distinct from either \<d\> or \<z\>. This means that when \<dz\> is seen in a string, a Hungarian culture-aware comparer treats it as a single collation element.

| String   | As collation elements   | Remarks                                    |
|----------|-------------------------|--------------------------------------------|
| `"endz"` | `"e" + "n" + "d" + "z"` | (using a standard linguistic comparer)     |
| `"endz"` | `"e" + "n" + "dz"`      | (using a Hungarian culture-aware comparer) |

When using a Hungarian culture-aware comparer, the string `"endz"` *does not* end with the substring `"z"`, because \<dz\> and \<z\> are considered collation elements with different semantic meaning.

```csharp
// Set thread culture to Hungarian
CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("hu-HU");
Console.WriteLine("endz".EndsWith("z")); // Prints 'False'

// Set thread culture to invariant culture
CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
Console.WriteLine("endz".EndsWith("z")); // Prints 'True'
```
```vb
' Set thread culture to Hungarian
CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("hu-HU")
Console.WriteLine("endz".EndsWith("z")) ' Prints 'False'

' Set thread culture to invariant culture
CultureInfo.CurrentCulture = CultureInfo.InvariantCulture
Console.WriteLine("endz".EndsWith("z")) ' Prints 'True'
```
> **Note:**
>
> - **Behavior**: Linguistic and culture-aware comparers can undergo behavioral adjustments from time to time. Both ICU and the older Windows NLS facility are updated to account for how world languages change. For more information, see the blog post Locale (culture) data churn. The *Ordinal* comparer's behavior will never change since it performs exact bitwise searching and comparison. However, the *OrdinalIgnoreCase* comparer's behavior may change as Unicode grows to encompass more character sets and corrects omissions in existing casing data.
> - **Usage**: The comparers `StringComparison.InvariantCulture` and `StringComparison.InvariantCultureIgnoreCase` are linguistic comparers that are not culture-aware. That is, these comparers understand concepts such as the accented character é having multiple possible underlying representations, and that all such representations should be treated equal. But non-culture-aware linguistic comparers won't contain special handling for \<dz\> as distinct from \<d\> or \<z\>, as shown above. They also won't special-case characters like the German Eszett (ß).

.NET also offers the *invariant globalization mode*. This opt-in mode disables code paths that deal with linguistic search and comparison routines. In this mode, all operations use *Ordinal* or *OrdinalIgnoreCase* behaviors, regardless of what `CultureInfo` or `StringComparison` argument the caller provides. For more information, see Runtime configuration options for globalization and .NET Core Globalization Invariant Mode.

### String operations that use the invariant culture

Comparisons with the invariant culture use the `System.Globalization.CultureInfo.CompareInfo` property returned by the static `System.Globalization.CultureInfo.InvariantCulture` property. This behavior is the same on all systems; it translates any characters outside its range into what it believes are equivalent invariant characters. This policy can be useful for maintaining one set of string behavior across cultures, but it often provides unexpected results.

Case-insensitive comparisons with the invariant culture use the static `System.Globalization.CultureInfo.CompareInfo` property returned by the static `System.Globalization.CultureInfo.InvariantCulture` property for comparison information as well. Any case differences among these translated characters are ignored.

Comparisons that use `System.StringComparison.InvariantCulture` and `System.StringComparison.Ordinal` work identically on ASCII strings. However, `System.StringComparison.InvariantCulture` makes linguistic decisions that might not be appropriate for strings that have to be interpreted as a set of bytes. The `CultureInfo.InvariantCulture.CompareInfo` object makes the `System.String.Compare*` method interpret certain sets of characters as equivalent. For example, the following equivalence is valid under the invariant culture:

InvariantCulture: a + ̊ = å

The LATIN SMALL LETTER A character "a"  (\u0061), when it's next to the COMBINING RING ABOVE character "+ " ̊" (\u030a), is interpreted as the LATIN SMALL LETTER A WITH RING ABOVE character "å" (\u00e5). As the following example shows, this behavior differs from ordinal comparison.

```csharp
string separated = "\u0061\u030a";
string combined = "\u00e5";

Console.WriteLine($"Equal sort weight of {separated} and {combined} using InvariantCulture: {string.Compare(separated, combined, StringComparison.InvariantCulture) == 0}");

Console.WriteLine($"Equal sort weight of {separated} and {combined} using Ordinal: {string.Compare(separated, combined, StringComparison.Ordinal) == 0}");

// The example displays the following output:
//     Equal sort weight of a° and å using InvariantCulture: True
//     Equal sort weight of a° and å using Ordinal: False
```
```vb
﻿Module Program
    Sub Main()
        Dim separated As String = ChrW(&H61) & ChrW(&H30A)
        Dim combined As String = ChrW(&HE5)

        Console.WriteLine("Equal sort weight of {0} and {1} using InvariantCulture: {2}",
                          separated, combined,
                          String.Compare(separated, combined, StringComparison.InvariantCulture) = 0)

        Console.WriteLine("Equal sort weight of {0} and {1} using Ordinal: {2}",
                          separated, combined,
                          String.Compare(separated, combined, StringComparison.Ordinal) = 0)

        ' The example displays the following output:
        '     Equal sort weight of a° and å using InvariantCulture: True
        '     Equal sort weight of a° and å using Ordinal: False
    End Sub
End Module
```
When interpreting file names, cookies, or anything else where a combination such as "å" can appear, ordinal comparisons still offer the most transparent and fitting behavior.

On balance, the invariant culture has few properties that make it useful for comparison. It does comparison in a linguistically relevant manner, which prevents it from guaranteeing full symbolic equivalence, but it isn't the choice for display in any culture. One of the few reasons to use `System.StringComparison.InvariantCulture` for comparison is to persist ordered data for a cross-culturally identical display. For example, if a large data file that contains a list of sorted identifiers for display accompanies an application, adding to this list would require an insertion with invariant-style sorting.

## How to choose a StringComparison member

The following table outlines the mapping from semantic string context to a `System.StringComparison` enumeration member:

| Data | Behavior | Corresponding System.StringComparison value |
|------|----------|---------------------------------------------------------|
|Case-sensitive internal identifiers. Case-sensitive identifiers in standards such as XML and HTTP. Case-sensitive security-related settings.|A non-linguistic identifier, where bytes match exactly.|`System.StringComparison.Ordinal`|
|Case-insensitive internal identifiers. Case-insensitive identifiers in standards such as XML and HTTP. File paths. Registry keys and values. Environment variables. Resource identifiers (for example, handle names). Case-insensitive security-related settings.|A non-linguistic identifier, where case is irrelevant.|`System.StringComparison.OrdinalIgnoreCase`|
|Some persisted, linguistically relevant data. Display of linguistic data that requires a fixed sort order.|Culturally agnostic data that still is linguistically relevant.|`System.StringComparison.InvariantCulture` -or- `System.StringComparison.InvariantCultureIgnoreCase`|
|Data displayed to the user. Most user input.|Data that requires local linguistic customs.|`System.StringComparison.CurrentCulture` -or- `System.StringComparison.CurrentCultureIgnoreCase`|

## Security implications

If your app uses string APIs for filtering or access control, use ordinal comparisons. Linguistic comparisons based on the current culture can produce unexpected results that vary by platform and locale. Code patterns like the following might be susceptible to security exploits:

```csharp
//
// THIS SAMPLE CODE IS INCORRECT.
// DO NOT USE IT IN PRODUCTION.
//
bool ContainsHtmlSensitiveCharacters(string input)
{
    if (input.IndexOf("<") >= 0) { return true; }
    if (input.IndexOf("&") >= 0) { return true; }
    return false;
}
```
```vb
'
' THIS SAMPLE CODE IS INCORRECT.
' DO NOT USE IT IN PRODUCTION.
'
Function ContainsHtmlSensitiveCharacters(input As String) As Boolean
    If input.IndexOf("<") >= 0 Then Return True
    If input.IndexOf("&") >= 0 Then Return True
    Return False
End Function
```
Because the `string.IndexOf(string)` method uses a linguistic search by default, it's possible for a string to contain a literal `'<'` or `'&'` character and for `string.IndexOf(string)` to return `-1`, indicating that the search substring wasn't found. Code analysis rules CA1307 and CA1309 flag such call sites and alert the developer that there's a potential problem.
