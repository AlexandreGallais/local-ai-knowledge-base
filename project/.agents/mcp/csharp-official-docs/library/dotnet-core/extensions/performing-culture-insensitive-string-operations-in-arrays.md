---
title: "Perform culture-insensitive string operations in arrays"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/performing-culture-insensitive-string-operations-in-arrays.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Perform culture-insensitive string operations in arrays

Overloads of the `System.Array.Sort*` and `System.Array.BinarySearch*` methods perform culture-sensitive sorts by default using the `System.Threading.Thread.CurrentCulture` property. Culture-sensitive results returned by these methods can vary by culture due to differences in sort orders. To eliminate culture-sensitive behavior, use one of the overloads of this method that accepts a `comparer` parameter. The `comparer` parameter specifies the `System.Collections.IComparer` implementation to use when comparing elements in the array. For the parameter, specify a custom invariant comparer class that uses `System.Globalization.CultureInfo.InvariantCulture`. An example of a custom invariant comparer class is provided in the "Using the SortedList Class" subtopic of the Perform culture-insensitive string operations in collections topic.

> **Note:**
> Passing **CultureInfo.InvariantCulture** to a comparison method does perform a culture-insensitive comparison. However, it does not cause a non-linguistic comparison, for example, for file paths, registry keys, and environment variables. Neither does it support security decisions based on the comparison result. For a non-linguistic comparison or support for result-based security decisions, the application should use a comparison method that accepts a `System.StringComparison` value. The application should then pass `System.StringComparison.Ordinal`.

## See also

- `System.Array.Sort*`
- `System.Array.BinarySearch*`
- `System.Collections.IComparer`
- Perform culture-insensitive string operations
