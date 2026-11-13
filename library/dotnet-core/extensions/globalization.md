---
title: "Globalization (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/globalization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Globalization

Globalization involves designing and developing a world-ready app that supports localized interfaces and regional data for users in multiple cultures. Before beginning the design phase, you should determine which cultures your app will support. Although an app targets a single culture or region as its default, you can design and write it so that it can easily be extended to users in other cultures or regions.

As developers, we all have assumptions about user interfaces and data that are formed by our cultures. For example, for an English-speaking developer in the United States, serializing date and time data as a string in the format `MM/dd/yyyy hh:mm:ss` seems perfectly reasonable. However, deserializing that string on a system in a different culture is likely to throw a `System.FormatException` exception or produce inaccurate data. Globalization enables us to identify such culture-specific assumptions and ensure that they do not affect our app's design or code.

This article discusses some of the major issues you should consider and the best practices you can follow when handling strings, date and time values, and numeric values in a globalized app.

## Strings

The handling of characters and strings is a central focus of globalization, because each culture or region may use different characters and character sets and sort them differently. This section provides recommendations for using strings in globalized apps.

### Use Unicode internally

By default, .NET uses Unicode strings. A Unicode string consists of zero, one, or more `System.Char` objects, each of which represents a UTF-16 code unit. There is a Unicode representation for almost every character in every character set in use throughout the world.

Many applications and operating systems, including the Windows operating system, can also use code pages to represent character sets. Code pages typically contain the standard ASCII values from 0x00 through 0x7F and map other characters to the remaining values from 0x80 through 0xFF. The interpretation of values from 0x80 through 0xFF depends on the specific code page. Because of this, you should avoid using code pages in a globalized app if possible.

The following example illustrates the dangers of interpreting code page data when the default code page on a system is different from the code page on which the data was saved. (To simulate this scenario, the example explicitly specifies different code pages.) First, the example defines an array that consists of the uppercase characters of the Greek alphabet. It encodes them into a byte array by using code page 737 (also known as MS-DOS Greek) and saves the byte array to a file. If the file is retrieved and its byte array is decoded by using code page 737, the original characters are restored. However, if the file is retrieved and its byte array is decoded by using code page 1252 (or Windows-1252, which represents characters in the Latin alphabet), the original characters are lost.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/codepages1.cs._

The use of Unicode ensures that the same code units always map to the same characters, and that the same characters always map to the same byte arrays.

### Use resource files

Even if you are developing an app that targets a single culture or region, you should use resource files to store strings and other resources that are displayed in the user interface. You should never add them directly to your code. Using resource files has a number of advantages:

- All the strings are in a single location. You don't have to search throughout your source code to identify strings to modify for a specific language or culture.
- There's no need to duplicate strings. Developers who don't use resource files often define the same string in multiple source code files. This duplication increases the probability that one or more instances will be overlooked when a string is modified.
- You can include non-string resources, such as images or binary data, in the resource file instead of storing them in a separate standalone file, so they can be retrieved easily.

Using resource files has particular advantages if you are creating a localized app. When you deploy resources in satellite assemblies, the common language runtime automatically selects a culture-appropriate resource based on the user's current UI culture as defined by the `System.Globalization.CultureInfo.CurrentUICulture` property. As long as you provide an appropriate culture-specific resource and correctly instantiate a `System.Resources.ResourceManager` object or use a strongly typed resource class, the runtime handles the details of retrieving the appropriate resources.

For more information about creating resource files, see Creating resource files. For information about creating and deploying satellite assemblies, see Create satellite assemblies and Package and Deploy resources.

### Search and compare strings

Whenever possible, you should handle strings as entire strings instead of handling them as a series of individual characters. This is especially important when you sort or search for substrings, to prevent problems associated with parsing combined characters.

> **Tip:**
> You can use the `System.Globalization.StringInfo` class to work with the text elements rather than the individual characters in a string.

In string searches and comparisons, a common mistake is to treat the string as a collection of characters, each of which is represented by a `System.Char` object. In fact, a single character may be formed by one, two, or more `System.Char` objects. Such characters are found most frequently in strings from cultures whose alphabets consist of characters outside the Unicode Basic Latin character range (U+0021 through U+007E). The following example tries to find the index of the LATIN CAPITAL LETTER A WITH GRAVE character (U+00C0) in a string. However, this character can be represented in two different ways: as a single code unit (U+00C0) or as a composite character (two code units: U+0041 and U+0300). In this case, the character is represented in the string instance by two `System.Char` objects, U+0041 and U+0300. The example code calls the `System.String.IndexOf(System.Char)` and `System.String.IndexOf(System.String)` overloads to find the position of this character in the string instance, but these return different results. The first method call has a `System.Char` argument; it performs an ordinal comparison and therefore cannot find a match. The second call has a `System.String` argument; it performs a culture-sensitive comparison and therefore finds a match.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/search1.cs._

You can avoid some of the ambiguity of this example (calls to two similar overloads of a method returning different results) by calling an overload that includes a `System.StringComparison` parameter, such as the `System.String.IndexOf(System.String,System.StringComparison)` or `System.String.LastIndexOf(System.String,System.StringComparison)` method.

However, searches are not always culture-sensitive. If the purpose of the search is to make a security decision or to allow or disallow access to some resource, the comparison should be ordinal, as discussed in the next section.

### Test strings for equality

If you want to test two strings for equality rather than determine how they compare in the sort order, use the `System.String.Equals*` method instead of a string comparison method such as `System.String.Compare*` or `System.Globalization.CompareInfo.Compare*`.

Comparisons for equality are typically performed to access some resource conditionally. For example, you might perform a comparison for equality to verify a password or to confirm that a file exists. Such non-linguistic comparisons should always be ordinal rather than culture-sensitive. In general, you should call the instance `System.String.Equals(System.String,System.StringComparison)` method or the static `System.String.Equals(System.String,System.String,System.StringComparison)` method with a value of `System.StringComparison.Ordinal` for strings such as passwords, and a value of `System.StringComparison.OrdinalIgnoreCase` for strings such as file names or URIs.

Comparisons for equality sometimes involve searches or substring comparisons rather than calls to the `System.String.Equals*` method. In some cases, you may use a substring search to determine whether that substring equals another string. If the purpose of this comparison is non-linguistic, the search should also be ordinal rather than culture-sensitive.

The following example illustrates the danger of a culture-sensitive search on non-linguistic data. The `AccessesFileSystem` method is designed to prohibit file system access for URIs that begin with the substring "FILE". To do this, it performs a culture-sensitive, case-insensitive comparison of the beginning of the URI with the string "FILE". Because a URI that accesses the file system can begin with either "FILE:" or "file:", the implicit assumption is that "i" (U+0069) is always the lowercase equivalent of "I" (U+0049). However, in Turkish and Azerbaijani, the uppercase version of "i" is "İ" (U+0130). Because of this discrepancy, the culture-sensitive comparison allows file system access when it should be prohibited.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/equals1.cs._

You can avoid this problem by performing an ordinal comparison that ignores case, as the following example shows.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/equals2.cs._

### Order and sort strings

Typically, ordered strings that are to be displayed in the user interface should be sorted based on culture. For the most part, such string comparisons are handled implicitly by .NET when you call a method that sorts strings, such as `System.Array.Sort*` or `System.Collections.Generic.List`1.Sort*`. By default, strings are sorted by using the sorting conventions of the current culture. The following example illustrates the difference when an array of strings is sorted by using the conventions of the English (United States) culture and the Swedish (Sweden) culture.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/sort1.cs._

Culture-sensitive string comparison is defined by the `System.Globalization.CompareInfo` object, which is returned by each culture's `System.Globalization.CultureInfo.CompareInfo` property. Culture-sensitive string comparisons that use the `System.String.Compare*` method overloads also use the `System.Globalization.CompareInfo` object.

.NET uses tables to perform culture-sensitive sorts on string data. The content of these tables, which contain data on sort weights and string normalization, is determined by the version of the Unicode standard implemented by a particular version of .NET. The following table lists the versions of Unicode implemented by the specified versions of .NET. This list of supported Unicode versions applies to character comparison and sorting only; it does not apply to classification of Unicode characters by category. For more information, see the "Strings and The Unicode Standard" section in the `System.String` article.

| .NET Framework version       | Operating system                      | Unicode version |
|------------------------------|---------------------------------------|-----------------|
| .NET Framework 2.0           | All operating systems                 | Unicode 4.1     |
| .NET Framework 3.0           | All operating systems                 | Unicode 4.1     |
| .NET Framework 3.5           | All operating systems                 | Unicode 4.1     |
| .NET Framework 4             | All operating systems                 | Unicode 5.0     |
| .NET Framework 4.5 and later | Windows 7                             | Unicode 5.0     |
| .NET Framework 4.5 and later | Windows 8 and later operating systems | Unicode 6.3.0   |
| .NET Core and .NET 5+        | | Depends on the version of the Unicode Standard supported by the underlying OS. |

Starting with .NET Framework 4.5 and in all versions of .NET Core and .NET 5+, string comparison and sorting depends on the operating system. .NET Framework 4.5 and later running on Windows 7 retrieves data from its own tables that implement Unicode 5.0. .NET Framework 4.5 and later running on Windows 8 and later retrieves data from operating system tables that implement Unicode 6.3. On .NET Core and .NET 5+, the supported version of Unicode depends on the underlying operating system. If you serialize culture-sensitive sorted data, you can use the `System.Globalization.SortVersion` class to determine when your serialized data needs to be sorted so that it is consistent with .NET and the operating system's sort order. For an example, see the `System.Globalization.SortVersion` class topic.

If your app performs extensive culture-specific sorts of string data, you can work with the `System.Globalization.SortKey` class to compare strings. A sort key reflects the culture-specific sort weights, including the alphabetic, case, and diacritic weights of a particular string. Because comparisons using sort keys are binary, they are faster than comparisons that use a `System.Globalization.CompareInfo` object either implicitly or explicitly. You create a culture-specific sort key for a particular string by passing the string to the `System.Globalization.CompareInfo.GetSortKey*` method.

The following example is similar to the previous example. However, instead of calling the `System.Array.Sort(System.Array)` method, which implicitly calls the `System.Globalization.CompareInfo.Compare*` method, it defines an `System.Collections.Generic.IComparer`1` implementation that compares sort keys, which it instantiates and passes to the `System.Array.Sort``1(``0[],System.Collections.Generic.IComparer{``0})` method.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/sortkey1.cs._

### Avoid string concatenation

If at all possible, avoid using composite strings that are built at runtime from concatenated phrases. Composite strings are difficult to localize, because they often assume a grammatical order in the app's original language that does not apply to other localized languages.
