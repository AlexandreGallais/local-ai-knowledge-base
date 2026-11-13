---
title: "Performing Culture-Insensitive String Operations"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/performing-culture-insensitive-string-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Perform culture-insensitive string operations

Culture-sensitive string operations are advantageous if you're creating applications designed to display results to users on a per-culture basis. By default, culture-sensitive methods obtain the culture to use from the `System.Globalization.CultureInfo.CurrentCulture` property for the current thread.

Sometimes, culture-sensitive string operations are not the desired behavior. Using culture-sensitive operations when results should be independent of culture can cause application code to fail on cultures with custom case mappings and sorting rules. For an example, see the String Comparisons that Use the Current Culture section in Best Practices for Using Strings.

Whether string operations should be culture-sensitive or culture-insensitive depends on how your application uses the results. String operations that display results to the user should typically be culture-sensitive. For example, if an application displays a sorted list of localized strings in a list box, the application should perform a culture-sensitive sort.

Results of string operations that are used internally should typically be culture-insensitive. In general, if the application is working with file names, persistence formats, or symbolic information that is not displayed to the user, results of string operations should not vary by culture. For example, if an application compares a string to determine whether it is a recognized XML tag, the comparison should not be culture-sensitive. In addition, if a security decision is based on the result of a string comparison or case change operation, the operation should be culture-insensitive to ensure that the result is not affected by the value of `System.Globalization.CultureInfo.CurrentCulture`.

Most .NET methods that *by default* perform culture-sensitive string operations also provide an overload that allows you to guarantee culture-insensitive results. These overloads that take a `System.Globalization.CultureInfo` argument allow you to eliminate cultural variations in case mappings and sorting rules. For culture-insensitive string operations, specify the culture as `System.Globalization.CultureInfo.InvariantCulture`.

## In this section

The articles in this section demonstrate how to perform culture-insensitive string operations using .NET methods that are culture-sensitive by default.

Performing culture-insensitive string comparisons\
Describes how to use the `System.String.Compare*` and `System.String.CompareTo*` methods to perform culture-insensitive string comparisons.

Performing culture-insensitive case changes\
Describes how to use the `System.String.ToUpper*`, `System.String.ToLower*`, `System.Char.ToUpper*`, and `System.Char.ToLower*` methods to perform culture-insensitive case changes.

Performing culture-insensitive string operations in collections\
Describes how to use the `System.Collections.CaseInsensitiveComparer`, `System.Collections.CaseInsensitiveHashCodeProvider` class, `System.Collections.SortedList`, `System.Collections.ArrayList.Sort*` and `System.Collections.Specialized.CollectionsUtil.CreateCaseInsensitiveHashtable*` to perform culture-insensitive operations in collections.

Performing culture-insensitive string operations in arrays\
Describes how to use the `System.Array.Sort*` and `System.Array.BinarySearch*` methods to perform culture-insensitive operations in arrays.

## See also

- Sorting Weight Tables (for .NET on Windows systems)
- Default Unicode Collation Element Table (for .NET Core on Linux and macOS)
