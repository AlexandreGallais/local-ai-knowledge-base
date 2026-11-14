---
title: "String class (part 3 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 3 of 26)

Ordinarily, you don't call string comparison methods such as `String.Compare` directly to determine the sort order of strings. Instead, comparison methods are called by sorting methods such as `Array.Sort` or `List<T>.Sort`. The following example performs four different sorting operations (word sort using the current culture, word sort using the invariant culture, ordinal sort, and string sort using the invariant culture) without explicitly calling a string comparison method, although they do specify the type of comparison to use. Note that each type of sort produces a unique ordering of strings in its array.

_Code sample not included: ~/snippets/csharp/System/String/Overview/compare2.cs._

> **Tip:**
> Internally, .NET uses sort keys to support culturally sensitive string comparison. Each character in a string is given several categories of sort weights, including alphabetic, case, and diacritic. A sort key, represented by the `SortKey` class, provides a repository of these weights for a particular string. If your app performs a large number of searching or sorting operations on the same set of strings, you can improve its performance by generating and storing sort keys for all the strings that it uses. When a sort or comparison operation is required, you use the sort keys instead of the strings. For more information, see the `SortKey` class.

If you don't specify a string comparison convention, sorting methods such as `Sort` perform a culture-sensitive, case-sensitive sort on strings. The following example illustrates how changing the current culture affects the order of sorted strings in an array. It creates an array of three strings. First, it sets the `System.Threading.Thread.CurrentThread.CurrentCulture` property to en-US and calls the `Sort` method. The resulting sort order is based on sorting conventions for the English (United States) culture. Next, the example sets the `System.Threading.Thread.CurrentThread.CurrentCulture` property to da-DK and calls the `Array.Sort` method again. Notice how the resulting sort order differs from the en-US results because it uses the sorting conventions for Danish (Denmark).

_Code sample not included: ~/snippets/csharp/System/String/Overview/sort1.cs._

> **Warning:**
> If your primary purpose in comparing strings is to determine whether they are equal, you should call the `String.Equals` method. Typically, you should use `String.Equals` to perform an ordinal comparison. The `String.Compare` method is intended primarily to sort strings.

String search methods, such as `String.StartsWith` and `String.IndexOf`, also can perform culture-sensitive or ordinal string comparisons. The following example illustrates the differences between ordinal and culture-sensitive comparisons using the `String.IndexOf` method. A culture-sensitive search in which the current culture is English (United States) considers the substring "oe" to match the ligature "œ". Because a soft hyphen (U+00AD) is a zero-width character, the search treats the soft hyphen as equivalent to `Empty` and finds a match at the beginning of the string. An ordinal search, on the other hand, does not find a match in either case.

_Code sample not included: ~/snippets/csharp/System/String/Overview/compare3.cs._

#### Search in strings

String search methods, such as `String.StartsWith` and `String.IndexOf`, also can perform culture-sensitive or ordinal string comparisons to determine whether a character or substring is found in a specified string.

The search methods in the `String` class that search for an individual character, such as the `String.IndexOf` method, or one of a set of characters,   such as the `String.IndexOfAny` method, all perform an ordinal search. To perform a culture-sensitive search for a character, you must call a `CompareInfo` method such as `IndexOf` or `LastIndexOf`. Note that the results of searching for a character using ordinal and culture-sensitive comparison can be very different. For example, a search for a precomposed Unicode character such as the ligature "Æ" (U+00C6) might match any occurrence of its components in the correct sequence, such as "AE" (U+041U+0045), depending on the culture. The following example illustrates the difference between the `IndexOf` and `IndexOf` methods when searching for an individual character. The ligature "æ" (U+00E6) is found in the string "aerial" when using the conventions of the en-US culture, but not when using the conventions of the da-DK culture or when performing an ordinal comparison.

_Code sample not included: ~/snippets/csharp/System/String/Overview/search1.cs._

On the other hand, `String` class methods that search for a string rather than a character perform a culture-sensitive search if search options are not explicitly specified by a parameter of type `StringComparison`. The sole exception is `String.Contains`, which performs an ordinal search.

#### Test for equality

Use the `String.Compare` method to determine the relationship of two strings in the sort order. Typically, this is a culture-sensitive operation. In contrast, call the `String.Equals` method to test for equality. Because the test for equality usually compares user input with some known string, such as a valid user name, a password, or a file system path, it is typically an ordinal operation.

> **Warning:**
> It is possible to test for equality by calling the `String.Compare` method and determining whether the return value is zero. However, this practice is not recommended. To determine whether two strings are equal, you should call one of the overloads of the `String.Equals` method. The preferred overload to call is either the instance `Equals` method or the static `Equals` method, because both methods include a `StringComparison` parameter that explicitly specifies the type of comparison.

The following example illustrates the danger of performing a culture-sensitive comparison for equality when an ordinal one should be used instead. In this case, the intent of the code is to prohibit file system access from URLs that begin with "FILE://" or "file://" by performing a case-insensitive comparison of the beginning of a URL with the string "FILE://". However, if a culture-sensitive comparison is performed using the Turkish (Turkey) culture on a URL that begins with "file://", the comparison for equality fails, because the Turkish uppercase equivalent of the lowercase "i" is "İ" instead of "I". As a result, file system access is inadvertently permitted. On the other hand, if an ordinal comparison is performed, the comparison for equality succeeds, and file system access is denied.

_Code sample not included: ~/snippets/csharp/System/String/Overview/equality1.cs._

#### Normalization

Some Unicode characters have multiple representations. For example, any of the following code points can represent the letter "ắ":

- U+1EAF
- U+0103 U+0301
- U+0061 U+0306 U+0301

Multiple representations for a single character complicate searching, sorting, matching, and other string operations.

The Unicode standard defines a process called normalization that returns one binary representation of a Unicode character for any of its equivalent binary representations. Normalization can use several algorithms, called normalization forms, that follow different rules. .NET supports Unicode normalization forms C, D, KC, and KD. When strings have been normalized to the same normalization form, they can be compared by using ordinal comparison.

An ordinal comparison is a binary comparison of the Unicode scalar value of corresponding `Char` objects in each string. The `String` class includes a number of methods that can perform an ordinal comparison, including the following:

- Any overload of the `String.Compare`, `String.Equals`, `String.StartsWith`,  `String.EndsWith`, `String.IndexOf`, and `String.LastIndexOf` methods that includes a `StringComparison` parameter. The method performs an ordinal comparison if you supply a value of `Ordinal` or `OrdinalIgnoreCase` for this parameter.
- The overloads of the `String.CompareOrdinal` method.
- Methods that use ordinal comparison by default, such as `String.Contains`, `String.Replace`, and `String.Split`.
- Methods that search for a `Char` value or for the elements in a `Char` array in a string instance. Such methods include `IndexOf` and `Split`.

You can determine whether a string is normalized to normalization form C by calling the `IsNormalized` method, or you can call the `IsNormalized` method to determine whether a string is normalized to a specified normalization form. You can also call the `Normalize` method to convert a string to normalization form C, or you can call the `Normalize` method to convert a string to a specified normalization form. For step-by-step information about normalizing and comparing strings, see the `Normalize` and `Normalize` methods.

The following simple example illustrates string normalization. It defines the letter "ố" in three different ways in three different strings, and uses an ordinal comparison for equality to determine that each string differs from the other two strings. It then converts each string to the supported normalization forms, and again performs an ordinal comparison of each string in a specified normalization form. In each case, the second test for equality shows that the strings are equal.

_Code sample not included: ~/snippets/csharp/System/String/Overview/normalize1.cs._

For more information about normalization and normalization forms, see `NormalizationForm`, as well as Unicode Standard Annex #15: Unicode Normalization Forms and the Normalization FAQ on the unicode.org website.

#### String operations by category

The `String` class provides members for comparing strings, testing strings for equality, finding characters or substrings in a string, modifying a string, extracting substrings from a string, combining strings, formatting values, copying a string, and normalizing a string.

#### Compare strings

You can compare strings to determine their relative position in the sort order by using the following `String` methods:

- `String.Compare` returns an integer that indicates the relationship of one string to a second string in the sort order.
- `String.CompareOrdinal` returns an integer that indicates the relationship of one string to a second string based on a comparison of their code points.
- `String.CompareTo` returns an integer that indicates the relationship of the current string instance to a second string in the sort order. The `CompareTo` method provides the `IComparable` and `IComparable<T>` implementations for the `String` class.

#### Test strings for equality

You call the `String.Equals` method to determine whether two strings are equal. The instance `Equals` and the static `Equals` overloads let you specify whether the comparison is culture-sensitive or ordinal, and whether case is considered or ignored. Most tests for equality are ordinal, and comparisons for equality that determine access to a system resource (such as a file system object) should always be ordinal.

#### Find characters in a string

The `String` class includes two kinds of search methods:

- Methods that return a `Boolean` value to indicate whether a particular substring is present in a string instance. These include the `String.Contains`, `String.EndsWith`, and `String.StartsWith` methods.
- Methods that indicate the starting position of a substring in a string instance. These include the `String.IndexOf`, `String.IndexOfAny`, `String.LastIndexOf`, and `String.LastIndexOfAny` methods.

> **Warning:**
> If you want to search a string for a particular pattern rather than a specific substring, you should use regular expressions. For more information, see .NET Regular Expressions.

#### Modify a string

The `String` class includes the following methods that appear to modify the value of a string:

- `String.Insert` inserts a string into the current `String` instance.
- `String.PadLeft` inserts one or more occurrences of a specified character at the beginning of a string.
- `String.PadRight` inserts one or more occurrences of a specified character at the end of a string.
- `String.Remove` deletes a substring from the current `String` instance.
- `String.Replace` replaces a substring with another substring in the current `String` instance.
- `String.ToLower` and `String.ToLowerInvariant` convert all the characters in a string to lowercase.
- `String.ToUpper` and `String.ToUpperInvariant` convert all the characters in a string to uppercase.
- `String.Trim` removes all occurrences of a character from the beginning and end of a string.
- `String.TrimEnd` removes all occurrences of a character from the end of a string.
- `String.TrimStart` removes all occurrences of a character from the beginning of a string.

> **Important:**
> All string modification methods return a new `String` object. They don't modify the value of the current instance.

#### Extract substrings from a string

The `String.Split` method separates a single string into multiple strings. Overloads of the method allow you to specify multiple delimiters, to limit the number of substrings that the method extracts, to trim white space from substrings, and to specify whether empty strings (which occur when delimiters are adjacent) are included among the returned strings.

#### Combine strings

The following `String` methods can be used for string concatenation:

- `String.Concat` combines one or more substrings into a single string.
- `String.Join` concatenates one or more substrings into a single element and adds a separator between each substring.

#### Format values

The `String.Format` method uses the composite formatting feature to replace one or more placeholders in a string with the string representation of some object or value. The `String.Format` method is often used to do the following:

- To embed the string representation of a numeric value in a string.
- To embed the string representation of a date and time value in a string.
- To embed the string representation of an enumeration value in a string.
- To embed the string representation of some object that supports the `IFormattable` interface in a string.
- To right-justify or left-justify a substring in a field within a larger string.

For detailed information about formatting operations and examples, see the `String.Format` overload summary.

#### Copy a string

You can call the following `String` methods to make a copy of a string:

- `String.Clone` returns a reference to an existing `String` object.
- `String.CopyTo` copies a portion of a string to a character array.

#### Normalize a string

In Unicode, a single character can have multiple code points. Normalization converts these equivalent characters into the same binary representation. The `String.Normalize` method performs the normalization, and the `String.IsNormalized` method determines whether a string is normalized.
