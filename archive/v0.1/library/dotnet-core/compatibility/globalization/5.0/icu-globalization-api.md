---
title: "Breaking change: Globalization APIs use ICU libraries on Windows 10"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/globalization/5.0/icu-globalization-api.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Globalization APIs use ICU libraries on Windows 10

.NET 5 and later versions use International Components for Unicode (ICU) libraries for globalization functionality when running on Windows 10 May 2019 Update or later.

## Change description

In .NET Core 1.0 - 3.1 and .NET Framework 4 and later, .NET libraries use National Language Support (NLS) APIs for globalization functionality on Windows. For example, NLS functions were used to compare strings, get culture information, and perform string casing in the appropriate culture.

Starting in .NET 5, if an app is running on Windows 10 May 2019 Update or later, .NET libraries use ICU globalization APIs, by default.

> **Note:**
> Windows 10 May 2019 Update and later versions ship with the ICU native library. If the .NET runtime can't load ICU, it uses NLS instead.

## Behavioral differences

You might see changes in your app even if you don't realize you're using globalization facilities. This section lists a couple of the behavioral changes you might see, but there are others too.

### String.IndexOf

Consider the following code that calls `System.String.IndexOf(System.String)` to find the index of the newline character in a string.

```csharp
string s = "Hello\r\nworld!";
int idx = s.IndexOf("\n");
Console.WriteLine(idx);
```

- In .NET Core 3.1 and earlier versions on Windows, the snippet prints `6`.
- In .NET 5 and on Windows 10 May 2019 Update and later versions, the snippet prints `-1`.
- In .NET 6 and later versions, the snippet prints `6`, however, ICU libraries are still used.

To fix this code by conducting an ordinal search instead of a culture-sensitive search, call the `System.String.IndexOf(System.String,System.StringComparison)` overload and pass in `System.StringComparison.Ordinal` as an argument.

You can run code analysis rules CA1307: Specify StringComparison for clarity and CA1309: Use ordinal StringComparison to find these call sites in your code.

For more information, see Best practices for comparing strings in .NET.

### Currency symbol

Consider the following code that formats a string using the currency format specifier `C`. The current thread's culture is set to a culture that includes only the language and not the country or region.

```csharp
System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("de");
string text = string.Format("{0:C}", 100);
```

- In .NET Core 3.1 and earlier versions on Windows, the value of text is `"100,00 €"`.
- In .NET 5 and later versions on Windows 19H1 and later versions, the value of text is `"100,00 ¤"`, which uses the international currency symbol instead of the euro. In ICU, the design is that a currency is a property of a country or region, not a language.

### IdnMapping.GetAscii

Consider the following code that calls `System.Globalization.IdnMapping.GetAscii(System.String)` to convert an internationalized domain name label to its ASCII-compatible encoding.

```csharp
var mapping = new System.Globalization.IdnMapping();
string asciiName = mapping.GetAscii("ABCDEFG");
Console.WriteLine(asciiName);
```

- In .NET Core 3.1 and earlier versions on Windows, the snippet prints `ABCDEFG`.
- In .NET 5 and later versions on Windows 10 May 2019 Update and later versions, the snippet prints `abcdefg`.

ICU lowercases domain name labels as part of the ASCII-compatible encoding process. NLS doesn't lowercase labels that contain no international characters, so the original casing is preserved.

### Day-of-week abbreviations

The `System.Globalization.DateTimeFormatInfo.GetShortestDayName(System.DayOfWeek)` method obtains the shortest abbreviated day name for a specified day of the week.

- In .NET Core 3.1 and earlier versions on Windows, these day-of-week abbreviations consisted of two characters, for example, "Su".
- In .NET 5 and later versions, these day-of-week abbreviations consist of only one character, for example, "S".

## Reason for change

This change was introduced to unify .NET's globalization behavior across all supported operating systems. It also provides the ability for applications to bundle their own globalization libraries rather than depend on the operating system's built-in libraries.

## Version introduced

.NET 5.0

## Recommended action

No action is required on the part of the developer. However, if you wish to continue using NLS globalization APIs, you can set a runtime switch to revert to that behavior. For more information about the available switches, see the .NET globalization and ICU article.

## Affected APIs

- `System.Span`1`
- `System.String`
- Most types in the `System.Globalization` namespace
- `System.Array.Sort*` (when sorting an array of strings)
- `System.Collections.Generic.List`1.Sort` (when the list elements are strings)
- `System.Collections.Generic.SortedDictionary`2` (when the keys are strings)
- `System.Collections.Generic.SortedList`2` (when the keys are strings)
- `System.Collections.Generic.SortedSet`1` (when the set contains strings)

## See also

- Globalization APIs use ICU libraries on Windows Server
