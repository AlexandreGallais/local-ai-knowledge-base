---
title: "Perform culture-insensitive string comparisons"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/performing-culture-insensitive-string-comparisons.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Perform culture-insensitive string comparisons

By default, the `System.String.Compare*` method performs culture-sensitive and case-sensitive comparisons. This method also includes several overloads that provide a `culture` parameter that lets you specify the culture to use, and a `comparisonType` parameter that lets you specify the comparison rules to use. Calling these methods instead of the default overload removes any ambiguity about the rules used in a particular method call, and makes it clear whether a particular comparison is culture-sensitive or culture-insensitive.

> **Note:**
> Both overloads of the `System.String.CompareTo*` method perform culture-sensitive and case-sensitive comparisons; you cannot use this method to perform culture-insensitive comparisons. For code clarity, we recommend that you use the `System.String.Compare*` method instead.

For culture-sensitive operations, specify the `System.StringComparison.CurrentCulture` or `System.StringComparison.CurrentCultureIgnoreCase` enumeration value as the `comparisonType` parameter. If you want to perform a culture-sensitive comparison using a designated culture other than the current culture, specify the `System.Globalization.CultureInfo` object that represents that culture as the `culture` parameter.

The culture-insensitive string comparisons supported by the `System.String.Compare*` method are either linguistic (based on the sorting conventions of the invariant culture) or non-linguistic (based on the ordinal value of the characters in the string). Most culture-insensitive string comparisons are non-linguistic. For these comparisons, specify the `System.StringComparison.Ordinal` or `System.StringComparison.OrdinalIgnoreCase` enumeration value as the `comparisonType` parameter. For example, if a security decision (such as a user name or password <example-value>) is based on the result of a string comparison, the operation should be culture-insensitive and non-linguistic to ensure that the result is not affected by the conventions of a particular culture or language.

Use culture-insensitive linguistic string comparison if you want to handle linguistically relevant strings from multiple cultures in a consistent way. For example, if your application displays words that use multiple character sets in a list box, you might want to display words in the same order regardless of the current culture. For culture-insensitive linguistic comparisons, .NET defines an invariant culture that is based on the linguistic conventions of English. To perform a culture-insensitive linguistic comparison, specify `System.StringComparison.InvariantCulture` or `System.StringComparison.InvariantCultureIgnoreCase` as the `comparisonType` parameter.

The following example performs two culture-insensitive, non-linguistic string comparisons. The first is case-sensitive, but the second is not.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.strings.cultureinsensitivecomparison/cs/cultureinsensitive1.cs._

You can download the Sorting Weight Tables, a set of text files that contain information on the character weights used in sorting and comparison operations for Windows operating systems, and the Default Unicode Collation Element Table, the sort weight table for Linux and macOS.

## See also

- `System.String.Compare*`
- `System.String.CompareTo*`
- Perform culture-insensitive string operations
- Best practices for using strings
