---
title: "String class (part 2 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 2 of 26)

.NET also supports culture-insensitive linguistic string operations by using the invariant culture (`InvariantCulture`), which is loosely based on the culture settings of the English language independent of region. Unlike other `CultureInfo` settings, the settings of the invariant culture are guaranteed to remain consistent on a single computer, from system to system, and across versions of .NET. The invariant culture can be seen as a kind of black box that ensures stability of string comparisons and ordering across all cultures.

> **Important:**
> If your application makes a security decision about a symbolic identifier such as a file name or named pipe, or about persisted data such as the text-based data in an XML file, the operation should use an ordinal comparison instead of a culture-sensitive comparison. This is because a culture-sensitive comparison can yield different results depending on the culture in effect, whereas an ordinal comparison depends solely on the binary value of the compared characters.

> **Important:**
> Most methods that perform string operations include an overload that has a parameter of type `StringComparison`, which enables you to specify whether the method performs an ordinal or culture-sensitive operation. In general, you should call this overload to make the intent of your method call clear. For best practices and guidance for using ordinal and culture-sensitive operations on strings, see Best Practices for Using Strings.

Operations for casing, parsing and formatting, comparison and sorting, and testing for equality can be either ordinal or culture-sensitive. The following sections discuss each category of operation.

> **Tip:**
> You should always call a method overload that makes the intent of your method call clear. For example, instead of calling the `Compare` method to perform a culture-sensitive comparison of two strings by using the conventions of the current culture, you should call the `Compare` method with a value of `CurrentCulture` for the `comparisonType` argument. For more information, see Best Practices for Using Strings.

You can download the sorting weight tables, a set of text files that contain information on the character weights used in sorting and comparison operations, from Default Unicode Collation Element Table.

#### Casing

Casing rules determine how to change the capitalization of a Unicode character; for example, from lowercase to uppercase. Often, a casing operation is performed before a string comparison. For example, a string might be converted to uppercase so that it can be compared with another uppercase string. You can convert the characters in a string to lowercase by calling the `String.ToLower` or `String.ToLowerInvariant` method, and you can convert them to uppercase by calling the `String.ToUpper` or `String.ToUpperInvariant` method. In addition, you can use the `TextInfo.ToTitleCase` method to convert a string to title case.

Casing operations can be based on the rules of the current culture, a specified culture, or the invariant culture. Because case mappings can vary depending on the culture used, the result of casing operations can vary based on culture. The actual differences in casing are of three kinds:

- Differences in the case mapping of LATIN CAPITAL LETTER I (U+0049), LATIN SMALL LETTER I (U+0069), LATIN CAPITAL LETTER I WITH DOT ABOVE (U+0130), and LATIN SMALL LETTER DOTLESS I (U+0131). In the tr-TR (Turkish (Turkey)) and az-Latn-AZ (Azerbaijan, Latin) cultures, and in the tr, az, and az-Latn neutral cultures, the lowercase equivalent of LATIN CAPITAL LETTER I is LATIN SMALL LETTER DOTLESS I, and the uppercase equivalent of LATIN SMALL LETTER I is LATIN CAPITAL LETTER I WITH DOT ABOVE. In all other cultures, including the invariant culture, LATIN SMALL LETTER I and LATIN CAPITAL LETTER I are lowercase and uppercase equivalents.

The following example demonstrates how a string comparison designed to prevent file system access can fail if it relies on a culture-sensitive casing comparison. (The casing conventions of the invariant culture should have been used.)

_Code sample not included: ~/snippets/csharp/System/String/Overview/case2.cs._

- Differences in case mappings between the invariant culture and all other cultures. In these cases, using the casing rules of the invariant culture to change a character to uppercase or lowercase returns the same character. For all other cultures, it returns a different character. Some of the affected characters are listed in the following table.

| Character                                      | If changed to | Return value                     |
| ---------------------------------------------- | ------------- | -------------------------------- |
| MICRON SIGN (U+00B5)                           | Uppercase     | GREEK CAPITAL LETTER MU (U+039C) |
| LATIN CAPITAL LETTER I WITH DOT ABOVE (U+0130) | Lowercase     | LATIN SMALL LETTER I (U+0069)    |
| LATIN SMALL LETTER DOTLESS I (U+0131)          | Uppercase     | LATIN CAPITAL LETTER I (U+0049)  |
| LATIN SMALL LETTER LONG S (U+017F)             | Uppercase     | LATIN CAPITAL LETTER S (U+0053)  |
| LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON (U+01C5) | Lowercase | LATIN SMALL LETTER DZ WITH CARON (U+01C6) |
| COMBINING GREEK YPOGEGRAMMENI (U+0345)         | Uppercase     | GREEK CAPITAL LETTER IOTA (U+0399) |

- Differences in case mappings of two-letter mixed-case pairs in the ASCII character range. In most cultures, a two-letter mixed-case pair is equal to the equivalent two-letter uppercase or lowercase pair. This is not true for the following two-letter pairs in the following cultures, because in each case they are compared to a digraph:

- "lJ" and "nJ" in the hr-HR (Croatian (Croatia)) culture.
- "cH" in the cs-CZ (Czech (Czech Republic)) and sk-SK (Slovak (Slovakia)) cultures.
- "aA" in the da-DK (Danish (Denmark)) culture.
- "cS", "dZ", "dZS", "nY", "sZ", "tY", and "zS" in the hu-HU (Hungarian (Hungary)) culture.
- "cH" and "lL" in the es-ES_tradnl (Spanish (Spain, Traditional Sort)) culture.
- "cH", "gI", "kH", "nG" "nH", "pH", "qU', "tH", and "tR" in the vi-VN (Vietnamese (Vietnam)) culture.

However, it is unusual to encounter a situation in which a culture-sensitive comparison of these pairs creates problems, because these pairs are uncommon in fixed strings or identifiers.

The following example illustrates some of the differences in casing rules between cultures when converting strings to uppercase.

_Code sample not included: ~/snippets/csharp/System/String/Overview/case1.cs._

#### Parsing and formatting

Formatting and parsing are inverse operations. Formatting rules determine how to convert a value, such as a date and time or a number, to its string representation, whereas parsing rules determine how to convert a string representation to a value such as a date and time. Both formatting and parsing rules are dependent on cultural conventions. The following example illustrates the ambiguity that can arise when interpreting a culture-specific date string. Without knowing the conventions of the culture that was used to produce a date string, it is not possible to know whether 03/01/2011, 3/1/2011, and 01/03/2011 represent January 3, 2011 or March 1, 2011.

_Code sample not included: ~/snippets/csharp/System/String/Overview/format1.cs._

Similarly, as the following example shows, a single string can produce different dates depending on the culture whose conventions are used in the parsing operation.

_Code sample not included: ~/snippets/csharp/System/String/Overview/parse1.cs._

#### String comparison and sorting

Conventions for comparing and sorting strings vary from culture to culture. For example, the sort order may be based on phonetics or on the visual representation of characters. In East Asian languages, characters are sorted by the stroke and radical of ideographs. Sorting also depends on the order languages and cultures use for the alphabet. For example, the Danish language has an "Æ" character that it sorts after "Z" in the alphabet. In addition, comparisons can be case-sensitive or case-insensitive, and casing rules might differ by culture. Ordinal comparison, on the other hand, uses the Unicode code points of individual characters in a string when comparing and sorting strings.

Sort rules determine the alphabetic order of Unicode characters and how two strings compare to each other. For example, the `Compare` method compares two strings based on the `StringComparison` parameter. If the parameter value is `CurrentCulture`, the method performs a linguistic comparison that uses the conventions of the current culture; if the parameter value is `Ordinal`, the method performs an ordinal comparison. Consequently, as the following example shows, if the current culture is U.S. English, the first call to the `Compare` method (using culture-sensitive comparison) considers "a" less than "A", but the second call to the same method (using ordinal comparison) considers "a" greater than "A".

_Code sample not included: ~/snippets/csharp/System/String/Overview/compare11.cs._

.NET supports word, string, and ordinal sort rules:

- A word sort performs a culture-sensitive comparison of strings in which certain nonalphanumeric Unicode characters might have special weights assigned to them. For example, the hyphen (-) might have a very small weight assigned to it so that "coop" and "co-op" appear next to each other in a sorted list. For a list of the `String` methods that compare two strings using word sort rules, see the String operations by category section.

- A string sort also performs a culture-sensitive comparison. It is similar to a word sort, except that there are no special cases, and all nonalphanumeric symbols come before all alphanumeric Unicode characters. Two strings can be compared using string sort rules by calling the `CompareInfo.Compare` method overloads that have an `options` parameter that is supplied a value of `StringSort`. Note that this is the only method that .NET provides to compare two strings using string sort rules.

- An ordinal sort compares strings based on the numeric value of each `Char` object in the string. An ordinal comparison is automatically case-sensitive because the lowercase and uppercase versions of a character have different code points. However, if case is not important, you can specify an ordinal comparison that ignores case. This is equivalent to converting the string to uppercase by using the invariant culture and then performing an ordinal comparison on the result. For a list of the `String` methods that compare two strings using ordinal sort rules, see the String operations by category section.

A culture-sensitive comparison is any comparison that explicitly or implicitly uses a `CultureInfo` object, including the invariant culture that is specified by the `InvariantCulture` property. The implicit culture is the current culture, which is specified by the `CurrentCulture` and `CurrentCulture` properties. There is considerable variation in the sort order of alphabetic characters (that is, characters for which the `Char.IsLetter` method returns `true`) across cultures. You can specify a culture-sensitive comparison that uses the conventions of a specific culture by supplying a `CultureInfo` object to a string comparison method such as `Compare`. You can specify a culture-sensitive comparison that uses the conventions of the current culture by supplying `CurrentCulture`, `CurrentCultureIgnoreCase`, or any member of the `CompareOptions` enumeration other than `Ordinal` or `OrdinalIgnoreCase` to an appropriate overload of the `String.Compare` method. A culture-sensitive comparison is generally appropriate for sorting whereas an ordinal comparison is not. An ordinal comparison is generally appropriate for determining whether two strings are equal (that is, for determining identity) whereas a culture-sensitive comparison is not.

The following example illustrates the difference between culture-sensitive and ordinal comparison. The example evaluates three strings, "Apple", "Æble", and "AEble", using ordinal comparison and the conventions of the da-DK and en-US cultures (each of which is the default culture at the time the `String.Compare` method is called). Because the Danish language treats the character "Æ" as an individual letter and sorts it after "Z" in the alphabet, the string "Æble" is greater than "Apple". However, "Æble" is not considered equivalent to "AEble", so "Æble" is also greater than "AEble". The en-US culture doesn't include the letter"Æ" but treats it as equivalent to "AE", which explains why  "Æble" is less than "Apple" but equal to "AEble". Ordinal comparison, on the other hand, considers "Apple" to be less than "Æble", and "Æble" to be greater than "AEble".

_Code sample not included: ~/snippets/csharp/System/String/Overview/compare4.cs._

Use the following general guidelines to choose an appropriate sorting or string comparison method:

- If you want the strings to be ordered based on the user's culture, you should order them based on the conventions of the current culture. If the user's culture changes, the order of sorted strings will also change accordingly. For example, a thesaurus application should always sort words based on the user's culture.
- If you want the strings to be ordered based on the conventions of a specific culture, you should order them by supplying a `CultureInfo` object that represents that culture to a comparison method. For example, in an application designed to teach students a particular language, you want strings to be ordered based on the conventions of one of the cultures that speaks that language.
- If you want the order of strings to remain unchanged across cultures, you should order them based on the conventions of the invariant culture or use an ordinal comparison. For example, you would use an ordinal sort to organize the names of files, processes, mutexes, or named pipes.
- For a comparison that involves a security decision (such as whether a username is valid), you should always perform an ordinal test for equality by calling an overload of the `String.Equals` method.

> **Note:**
> The culture-sensitive sorting and casing rules used in string comparison depend on the version of the Unicode Standard supported by the underlying operating system.

For more information about word, string, and ordinal sort rules, see the `CompareOptions` topic. For additional recommendations on when to use each rule, see Best Practices for Using Strings.
