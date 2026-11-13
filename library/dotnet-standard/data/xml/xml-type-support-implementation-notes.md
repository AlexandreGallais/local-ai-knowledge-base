---
title: "XML Type Support Implementation Notes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xml-type-support-implementation-notes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XML Type Support Implementation Notes

This topic describes some implementation details that you want to be aware of.

## List Mappings

 The `System.Collections.IList`, `System.Collections.ICollection`, `System.Collections.IEnumerable`, **Type[]**, and `System.String` types are used to represent XML Schema definition language (XSD) list types.

## Union Mappings

 Union types are represented using the `System.Xml.Schema.XmlAtomicValue` or `System.String` type. The source type or the destination type must therefore always be either `System.String` or `System.Xml.Schema.XmlAtomicValue`.

 If the `System.Xml.Schema.XmlSchemaDatatype` object represents a list type the object converts the input string value to a list of one or more objects. If the `System.Xml.Schema.XmlSchemaDatatype` represents a union type then an attempt is made to parse the input value as a member type of the union. If the parse attempt fails then the conversion is attempted with the next member of the union and so on until the conversion is successful, or there are no other member types to try, in which case an exception is thrown.

## Differences Between CLR and XML Data Types

 The following describes certain mismatches that can occur between CLR types and XML data types and how they are handled.

> **Note:**
> The `xs` prefix is mapped to the <https://www.w3.org/2001/XMLSchema> and namespace URI.

### System.TimeSpan and xs:duration

 The `xs:duration` type is partially ordered in that there are certain duration values that are different but equivalent. This means that for the `xs:duration` type value such as 1 month (P1M) is less than 32 days (P32D), larger than 27 days (P27D) and equivalent to 28, 29 or 30 days.

 The `System.TimeSpan` class does not support this partial ordering. Instead, it picks a specific number of days for 1 year and 1 month; 365 days and 30 days respectively.

 For more information on the `xs:duration` type, see the W3C XML Schema Part 2: Datatypes Recommendation.

### xs:time, Gregorian Date Types, and System.DateTime

 When an `xs:time` value is mapped to a `System.DateTime` object, the `System.DateTime.MinValue` field is used to initialize the date properties of the `System.DateTime` object (such as `System.DateTime.Year*`, `System.DateTime.Month*`, and `System.DateTime.Day*`) to the smallest possible `System.DateTime` value.

 Similarly, instances of `xs:gMonth`, `xs:gDay`, `xs:gYear`, `xs:gYearMonth` and `xs:gMonthDay` are also mapped to a `System.DateTime` object. Unused properties on the `System.DateTime` object are initialized to those from `System.DateTime.MinValue`.

> **Note:**
> You cannot rely on the `System.DateTime.Year*` value when the content is typed as `xs:gMonthDay`. The `System.DateTime.Year*` value is always set to 1904 in this case.

### xs:anyURI and System.Uri

 When an instance of `xs:anyURI` that represents a relative URI is mapped to a `System.Uri`, the `System.Uri` object does not have a base URI.

## See also

- Type Support in the System.Xml Classes
