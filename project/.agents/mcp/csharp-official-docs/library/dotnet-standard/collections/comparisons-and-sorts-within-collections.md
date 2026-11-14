---
title: "Comparisons and Sorts Within Collections"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/collections/comparisons-and-sorts-within-collections.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Comparisons and sorts within collections

The `System.Collections` classes perform comparisons in almost all the processes involved in managing collections, whether searching for the element to remove or returning the value of a key-and-value pair.

Collections typically utilize an equality comparer and/or an ordering comparer. Two constructs are used for comparisons.

## Check for equality

Methods such as `Contains`, `System.Collections.IList.IndexOf*`, `System.Collections.Generic.List`1.LastIndexOf*`, and `Remove` use an equality comparer for the collection elements. If the collection is generic, then items are compared for equality according to the following guidelines:

- If type T implements the `System.IEquatable`1` generic interface, then the equality comparer is the `System.IEquatable`1.Equals*` method of that interface.

- If type T does not implement `System.IEquatable`1`, `System.Object.Equals*` is used.

In addition, some constructor overloads for dictionary collections accept an `System.Collections.Generic.IEqualityComparer`1` implementation, which is used to compare keys for equality. For an example, see the `System.Collections.Generic.Dictionary`2.#ctor*` constructor.

## Determine sort order

Methods such as `BinarySearch` and `Sort` use an ordering comparer for the collection elements. The comparisons can be between elements of the collection, or between an element and a specified value. For comparing objects, there is the concept of a `default comparer` and an `explicit comparer`.

The default comparer relies on at least one of the objects being compared to implement the **IComparable** interface. It is a good practice to implement **IComparable** on all classes which are used as values in a list collection or as keys in a dictionary collection. For a generic collection, equality comparison is determined according to the following:

- If type T implements the `System.IComparable`1` generic interface, then the default comparer is the `System.IComparable`1.CompareTo(`0)` method of that interface

- If type T implements the non-generic `System.IComparable` interface, then the default comparer is the `System.IComparable.CompareTo(System.Object)` method of that interface.

- If type T doesn't implement either interface, then there is no default comparer, and a comparer or comparison delegate must be provided explicitly.

To provide explicit comparisons, some methods accept an **IComparer** implementation as a parameter. For example, the `System.Collections.Generic.List`1.Sort*` method accepts an `System.Collections.Generic.IComparer`1` implementation.

The current culture setting of the system can affect the comparisons and sorts within a collection. By default, the comparisons and sorts in the **Collections** classes are culture-sensitive. To ignore the culture setting and therefore obtain consistent comparison and sorting results, use the `System.Globalization.CultureInfo.InvariantCulture*` with member overloads that accept a `System.Globalization.CultureInfo`. For more information, see Perform culture-insensitive string operations in collections and Perform culture-insensitive string operations in arrays.

## Equality and sort example

The following code demonstrates an implementation of `System.IEquatable`1` and `System.IComparable`1` on a simple business object. In addition, when the object is stored in a list and sorted, you will see that calling the `System.Collections.Generic.List`1.Sort` method results in the use of the default comparer for the `Part` type, and the `System.Collections.Generic.List`1.Sort(System.Comparison{`0})` method implemented by using an anonymous method.

```csharp
using System;
using System.Collections.Generic;

// Simple business object. A PartId is used to identify the
// type of part but the part name can change.
public class Part : IEquatable<Part>, IComparable<Part>
{
    public string PartName { get; set; }

    public int PartId { get; set; }

    public override string ToString() => 
        $"ID: {PartId}   Name: {PartName}";

    public override bool Equals(object obj) => 
        (obj is Part part)
                ? Equals(part)
                : false;

    public int SortByNameAscending(string name1, string name2) => 
        name1?.CompareTo(name2) ?? 1;

    // Default comparer for Part type.
    // A null value means that this object is greater.
    public int CompareTo(Part comparePart) =>
        comparePart == null ? 1 : PartId.CompareTo(comparePart.PartId);

    public override int GetHashCode() => PartId;

    public bool Equals(Part other) =>
        other is null ? false : PartId.Equals(other.PartId);

    // Should also override == and != operators.
}

public class Example
{
    public static void Main()
    {
        // Create a list of parts.
        var parts = new List<Part>
        {
            // Add parts to the list.
            new Part { PartName = "regular seat", PartId = 1434 },
            new Part { PartName = "crank arm", PartId = 1234 },
            new Part { PartName = "shift lever", PartId = 1634 },
            // Name intentionally left null.
            new Part { PartId = 1334 },
            new Part { PartName = "banana seat", PartId = 1444 },
            new Part { PartName = "cassette", PartId = 1534 }
        };
        
        // Write out the parts in the list. This will call the overridden
        // ToString method in the Part class.
        Console.WriteLine("\nBefore sort:");
        parts.ForEach(Console.WriteLine);

        // Call Sort on the list. This will use the
        // default comparer, which is the Compare method
        // implemented on Part.
        parts.Sort();

        Console.WriteLine("\nAfter sort by part number:");
        parts.ForEach(Console.WriteLine);

        // This shows calling the Sort(Comparison<T> comparison) overload using
        // a lambda expression as the Comparison<T> delegate.
        // This method treats null as the lesser of two values.
        parts.Sort((Part x, Part y) => 
            x.PartName == null && y.PartName == null
                ? 0
                : x.PartName == null
                    ? -1
                    : y.PartName == null
                        ? 1
                        : x.PartName.CompareTo(y.PartName));

        Console.WriteLine("\nAfter sort by name:");
        parts.ForEach(Console.WriteLine);

        /*

            Before sort:
        ID: 1434   Name: regular seat
        ID: 1234   Name: crank arm
        ID: 1634   Name: shift lever
        ID: 1334   Name:
        ID: 1444   Name: banana seat
        ID: 1534   Name: cassette

        After sort by part number:
        ID: 1234   Name: crank arm
        ID: 1334   Name:
        ID: 1434   Name: regular seat
        ID: 1444   Name: banana seat
        ID: 1534   Name: cassette
        ID: 1634   Name: shift lever

        After sort by name:
        ID: 1334   Name:
        ID: 1444   Name: banana seat
        ID: 1534   Name: cassette
        ID: 1234   Name: crank arm
        ID: 1434   Name: regular seat
        ID: 1634   Name: shift lever

         */
    }
}
```

## See also

- `System.Collections.IComparer`
- `System.IEquatable`1`
- `System.Collections.Generic.IComparer`1`
- `System.IComparable`
- `System.IComparable`1`
