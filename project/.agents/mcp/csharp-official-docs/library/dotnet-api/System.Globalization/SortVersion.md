---
title: "SortVersion class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/SortVersion.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortVersion class

Namespace: `System.Globalization`

```csharp
public sealed class SortVersion : IEquatable<System.Globalization.SortVersion>
```

Provides information about the version of Unicode used to compare and order strings.

## Remarks

#### Sorting and string comparison

All versions of .NET (Core) rely on the underlying operating system when performing string comparisons. Therefore, the results of a string comparison or the order in which strings are sorted depends on the version of Unicode used by the operating system when performing the comparison. On Linux, macOS, and Windows 10 and later versions, International Components for Unicode libraries provide the implementation for comparison and sorting APIs.

#### Use the SortVersion class

The `SortVersion` class provides information about the Unicode version used by .NET for string comparison and ordering. It enables developers to write applications that can detect and successfully handle changes in the version of Unicode that is used to compare and sort an application's strings.

You can instantiate a `SortVersion` object in two ways:

- By calling the `SortVersion.%23ctor` constructor, which instantiates a new `SortVersion` object based on a version number and sort ID. This constructor is most useful when recreating a `SortVersion` object from saved data.
- By retrieving the value of the `Version` property. This property provides information about the Unicode version used by the .NET implementation on which the application is running.

The `SortVersion` class has two properties, `FullVersion` and `SortId`, that indicate the Unicode version and the specific culture used for string comparison. The `FullVersion` property is an arbitrary numeric value that reflects the Unicode version used for string comparison, and the `SortId` property is an arbitrary `Guid` that reflects the culture whose conventions are used for string comparison. The values of these two properties are important only when you compare two `SortVersion` objects by using the `SortVersion.Equals` method, the `SortVersion.op_Equality` operator, or the `SortVersion.op_Inequality` operator.

You typically use a `SortVersion` object when saving or retrieving some form of culture-sensitive, ordered string data, such as indexes or the literal strings themselves. This requires the following steps:

1. When the ordered string data is saved, the `FullVersion` and `SortId` property values are also saved.

2. When the ordered string data is retrieved, you can recreate the `SortVersion` object used for ordering the strings by calling the `SortVersion.%23ctor` constructor.

3. This newly instantiated `SortVersion` object is compared with a `SortVersion` object that reflects the culture whose conventions are used to order the string data.

4. If the two `SortVersion` objects are not equal, the string data must be reordered.
#### Example

The following example contains a portion of the source code from an application that uses the `SortVersion` class to ensure that the native names of `RegionInfo` objects are ordered appropriately for the current system and current culture. It uses the `BinaryReader` and `BinaryWriter` objects to store and retrieve ordered data from a data file named `Regions.dat` rather than retrieving and ordering data each time the application is run. The example first checks to determine whether the data file exists. If it does not, it creates the data and sets the `reindex` flag, which indicates that the data must be resorted and saved again. Otherwise, it retrieves the data and compares the saved `SortVersion` object with the `SortVersion` object for the current culture on the current system. If they aren't equal, or if the `reindex` flag had been set previously, it resorts to the `RegionInfo` data.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortVersion/Overview/example1.cs._

## SortVersion.SortVersion(Int32, Guid) constructor

```csharp
public SortVersion (int fullVersion, Guid sortId);
```

Creates a new instance of the `SortVersion` class.

Parameters:

- `fullVersion`: A version number.
- `sortId`: A sort ID.

#### Remarks
This constructor instantiates a `SortVersion` object with the specified version and sort ID. The `fullVersion` argument is assigned to the `FullVersion` property. The `sortId` argument is assigned to the `SortId` property.

This constructor is useful for recreating a `SortVersion` object from data that has been serialized or saved. This version can then be compared with the current application version to determine whether the version of Unicode used to display and order the application's strings is available.

## SortVersion.FullVersion property

```csharp
public int FullVersion { get; }
```

Gets the full version number of the `SortVersion` object.

Returns: The version number of this `SortVersion` object.

#### Remarks
The value of the `FullVersion` property reflects the Unicode version used to normalize and compare strings.

## SortVersion.SortId property

```csharp
public Guid SortId { get; }
```

Gets a globally unique identifier for this `SortVersion` object.

Returns: A globally unique identifier for this `SortVersion` object.

#### Remarks
The value of the `SortId` property reflects the culture whose conventions influence string comparison and sorting.

## SortVersion.Equals(SortVersion) method

```csharp
public bool Equals (System.Globalization.SortVersion? other);
```

Returns a value that indicates whether this `SortVersion` instance is equal to a specified `SortVersion` object.

Parameters:

- `other`: The object to compare with this instance.

Returns: `true` if `other` represents the same version as this instance; otherwise, `false`.

#### Remarks
Two `SortVersion` objects are equal if their `SortVersion.FullVersion` and `SortVersion.SortId` properties are equal.

## SortVersion.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this `SortVersion` instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` is a `SortVersion` object that represents the same version as this instance; otherwise, `false`.

#### Remarks
Two `SortVersion` objects are equal if their `SortVersion.FullVersion` and `SortVersion.SortId` properties are equal.

## SortVersion.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## SortVersion.op_Equality(SortVersion, SortVersion) method

```csharp
public static bool operator == (System.Globalization.SortVersion? left, System.Globalization.SortVersion? right);
```

Indicates whether two `SortVersion` instances are equal.

Parameters:

- `left`: The first instance to compare.
- `right`: The second instance to compare.

Returns: `true` if the values of `left` and `right` are equal; otherwise, `false`.

#### Remarks
Two `SortVersion` objects are equal if both are `null`, or if their `SortVersion.FullVersion` and `SortVersion.SortId` properties are equal.

## SortVersion.op_Inequality(SortVersion, SortVersion) method

```csharp
public static bool operator != (System.Globalization.SortVersion? left, System.Globalization.SortVersion? right);
```

Indicates whether two `SortVersion` instances are not equal.

Parameters:

- `left`: The first instance to compare.
- `right`: The second instance to compare.

Returns: `true` if the values of `left` and `right` are not equal; otherwise, `false`.

#### Remarks
Two `SortVersion` objects are not equal if one is `null` and the other is not, or if they have different `SortVersion.FullVersion` or `SortId` property values.
