---
title: "Version class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Version.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Version class

Namespace: `System`

```csharp
public sealed class Version : ICloneable, IComparable, IComparable<Version>, IEquatable<Version>, ISpanFormattable, IUtf8SpanFormattable, IUtf8SpanParsable<Version>
```

Represents the version number of an assembly, operating system, or the common language runtime. This class cannot be inherited.

The `Version` class represents the version number of an assembly, operating system, or the common language runtime. Version numbers consist of two to four components: major, minor, build, and revision. The major and minor components are required; the build and revision components are optional, but the build component is required if the revision component is defined. All defined components must be integers greater than or equal to 0. The format of the version number is as follows (optional components are shown in square brackets):

*major*.*minor*[.*build*[.*revision*]]

The components are used by convention as follows:

- *Major*: Assemblies with the same name but different major versions are not interchangeable. A higher version number might indicate a major rewrite of a product where backward compatibility cannot be assumed.

- *Minor*: If the name and major version number on two assemblies are the same, but the minor version number is different, this indicates significant enhancement with the intention of backward compatibility. This higher minor version number might indicate a point release of a product or a fully backward-compatible new version of a product.

- *Build*: A difference in build number represents a recompilation of the same source. Different build numbers might be used when the processor, platform, or compiler changes.

- *Revision*: Assemblies with the same name, major, and minor version numbers but different revisions are intended to be fully interchangeable. A higher revision number might be used in a build that fixes a security hole in a previously released assembly.

Subsequent versions of an assembly that differ only by build or revision numbers are considered to be Hotfix updates of the prior version.

> **Important:**
> The value of `Version` properties that have not been explicitly assigned a value is undefined (-1).

The `MajorRevision` and `MinorRevision` properties enable you to identify a temporary version of your application that, for example, corrects a problem until you can release a permanent solution. Furthermore, the Windows NT operating system uses the `MajorRevision` property to encode the service pack number.

#### Assign version information to assemblies

Ordinarily, the `Version` class is not used to assign a version number to an assembly. Instead, the `AssemblyVersionAttribute` class is used to define an assembly's version, as illustrated by the example in this article.

#### Retrieve version information

`Version` objects are most frequently used to store version information about some system or application component (such as the operating system), the common language runtime, the current application's executable, or a particular assembly. The following examples illustrate some of the most common scenarios:

- Retrieving the operating system version. The following example uses the `Version` property to retrieve the version number of the operating system.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/GettingVersions1.cs._

- Retrieving the version of the common language runtime. The following example uses the `Version` property to retrieve version information about the common language runtime.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/GettingVersions1.cs._

- Retrieving the current application's assembly version. The following example uses the `Assembly.GetEntryAssembly` method to obtain a reference to an `Assembly` object that represents the application executable and then retrieves its assembly version number.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/currentapp.cs._

- Retrieving the current assembly's assembly version. The following example uses the `Assembly` property to obtain a reference to an `Assembly` object that represents the assembly that contains the application entry point, and then retrieves its version information.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/currentassem.cs._

#### Compare version objects

You can use the `Version.CompareTo` method to determine whether one `Version` object is earlier than, the same as, or later than a second `Version` object. The following example indicates that Version 2.1 is later than Version 2.0.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/comparisons1.cs._

For two versions to be equal, the major, minor, build, and revision numbers of the first `Version` object must be identical to those of the second `Version` object. If the build or revision number of a `Version` object is undefined, that `Version` object is considered to be earlier than a `Version` object whose build or revision number is equal to zero. The following example illustrates this by comparing three `Version` objects that have undefined version components.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/comparisons2.cs._

The following example uses the `AssemblyVersionAttribute` attribute to assign a version number to an assembly. At compile time, this version information is stored with the assembly's metadata. At run time, the example retrieves the value of the `Assembly` property on a type found in the assembly to get a reference to the executing assembly, and it retrieves the assembly's version information from the `Version` property of the `AssemblyName` object returned by the `Assembly.GetName` method.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/example1.cs._

## Version.Version() constructor

```csharp
public Version ();
```

Initializes a new instance of the `Version` class.

#### Remarks
This constructor creates a `Version` object with the following property values.

|Property|Value|
|--------------|-----------|
|`Version.Major`|0|
|`Version.Minor`|0|
|`Version.Build`|undefined (-1)|
|`Version.Revision`|undefined (-1)|

## Version.Version(String) constructor

```csharp
public Version (string version);
```

Initializes a new instance of the `Version` class using the specified string.

Parameters:

- `version`: A string containing the major, minor, build, and revision numbers, where each number is delimited with a period character ('.').

Exceptions:

- `ArgumentException`: `version` has fewer than two components or more than four components.
- `ArgumentNullException`: `version` is `null`.
- `ArgumentOutOfRangeException`: A major, minor, build, or revision component is less than zero.
- `FormatException`: At least one component of `version` does not parse to an integer.
- `OverflowException`: At least one component of `version` represents a number greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `version` parameter can contain only the components major, minor, build, and revision, in that order, and all separated by periods. There must be at least two components, and at most four. The first two components are assumed to be major and minor. The value of unspecified components is undefined.

The format of the version number is as follows. Optional components are shown in square brackets ('[' and ']'):

major.minor[.build[.revision]]

All defined components must be integers greater than or equal to 0. For example, if the major number is 6, the minor number is 2, the build number is 1, and the revision number is 3, then `version` should be "6.2.1.3".

## Version.Version(Int32, Int32) constructor

```csharp
public Version (int major, int minor);
```

Initializes a new instance of the `Version` class using the specified major and minor values.

Parameters:

- `major`: The major version number.
- `minor`: The minor version number.

Exceptions:

- `ArgumentOutOfRangeException`: `major` or `minor` is less than zero.

#### Remarks
This constructor creates a `Version` object with the following property values.

|Property|Value|
|--------------|-----------|
|`Version.Major`|`major`|
|`Version.Minor`|`minor`|
|`Version.Build`|undefined (-1)|
|`Version.Revision`|undefined (-1)|

## Version.Version(Int32, Int32, Int32) constructor

```csharp
public Version (int major, int minor, int build);
```

Initializes a new instance of the `Version` class using the specified major, minor, and build values.

Parameters:

- `major`: The major version number.
- `minor`: The minor version number.
- `build`: The build number.

Exceptions:

- `ArgumentOutOfRangeException`: `major`, `minor`, or `build` is less than zero.

#### Remarks
This constructor creates a `Version` object with the following property values.

|Property|Value|
|--------------|-----------|
|`Version.Major`|`major`|
|`Version.Minor`|`minor`|
|`Version.Build`|`build`|
|`Version.Revision`|undefined (-1)|

## Version.Version(Int32, Int32, Int32, Int32) constructor

```csharp
public Version (int major, int minor, int build, int revision);
```

Initializes a new instance of the `Version` class with the specified major, minor, build, and revision numbers.

Parameters:

- `major`: The major version number.
- `minor`: The minor version number.
- `build`: The build number.
- `revision`: The revision number.

Exceptions:

- `ArgumentOutOfRangeException`: `major`, `minor`, `build`, or `revision` is less than zero.

#### Remarks
This constructor creates a `Version` object with the following property values.

|Property|Value|
|--------------|-----------|
|`Version.Major`|`major`|
|`Version.Minor`|`minor`|
|`Version.Build`|`build`|
|`Version.Revision`|`revision`|

#### Examples
The following code example demonstrates the `Version.%23ctor` constructor, and `Version.Major`, `Version.Minor`, `Version.Build`, `Version.Revision`, `Version.MajorRevision`, and `Version.MinorRevision` properties.

_Code sample not included: ~/snippets/csharp/System/Version/.ctor/rev.cs._

## Version.Build property

```csharp
public int Build { get; }
```

Gets the value of the build component of the version number for the current `Version` object.

Returns: The build number, or -1 if the build number is undefined.

#### Remarks
For example, if the version number is 6.2.1.3, the build number is 1. If the version number is 6.2, the build number is undefined.

#### Examples
The following code example demonstrates the `Version.%23ctor` constructor, and `Version.Major`, `Version.Minor`, `Version.Build`, `Version.Revision`, `Version.MajorRevision`, and `Version.MinorRevision` properties.

_Code sample not included: ~/snippets/csharp/System/Version/.ctor/rev.cs._

## Version.Major property

```csharp
public int Major { get; }
```

Gets the value of the major component of the version number for the current `Version` object.

Returns: The major version number.

#### Remarks
For example, if the version number is 6.2, the major version is 6.

## Version.MajorRevision property

```csharp
public short MajorRevision { get; }
```

Gets the high 16 bits of the revision number.

Returns: A 16-bit signed integer.

#### Remarks
Suppose you release an interim version of your application to temporarily correct a problem until you can release a permanent solution. The temporary version does not warrant a new revision number, but it does need to be identified as a different version. In this case, encode the identification information in the high and low 16-bit portions of the 32-bit revision number. Use the `Revision` property to obtain the entire revision number, use the `MajorRevision` property to obtain the high 16 bits, and use the `MinorRevision` property to obtain the low 16 bits.

#### Examples
The following code example demonstrates the `Version.%23ctor` constructor, and the `Version.Major`, `Version.Minor`, `Version.Build`, `Version.Revision`, `Version.MajorRevision`, and `Version.MinorRevision` properties.

_Code sample not included: ~/snippets/csharp/System/Version/.ctor/rev.cs._

## Version.Minor property

```csharp
public int Minor { get; }
```

Gets the value of the minor component of the version number for the current `Version` object.

Returns: The minor version number.

#### Remarks
For example, if the version number is 6.2, the minor version is 2.

#### Examples
The following code example demonstrates the `Version.%23ctor` constructor, and `Version.Major`, `Version.Minor`, `Version.Build`, `Version.Revision`, `Version.MajorRevision`, and `Version.MinorRevision` properties.

_Code sample not included: ~/snippets/csharp/System/Version/.ctor/rev.cs._

## Version.MinorRevision property

```csharp
public short MinorRevision { get; }
```

Gets the low 16 bits of the revision number.

Returns: A 16-bit signed integer.

#### Remarks
Suppose you release an interim version of your application to temporarily correct a problem until you can release a permanent solution. The temporary version does not warrant a new revision number, but it does need to be identified as a different version. In this case, encode the identification information in the high and low 16-bit portions of the 32-bit revision number. Use the `Revision` property to obtain the entire revision number, use the `MajorRevision` property to obtain the high 16 bits, and use the `MinorRevision` property to obtain the low 16 bits.

#### Examples
The following code example demonstrates the `Version.%23ctor` constructor, and the `Version.Major`, `Version.Minor`, `Version.Build`, `Version.Revision`, `Version.MajorRevision`, and `Version.MinorRevision` properties.

_Code sample not included: ~/snippets/csharp/System/Version/.ctor/rev.cs._

## Version.Revision property

```csharp
public int Revision { get; }
```

Gets the value of the revision component of the version number for the current `Version` object.

Returns: The revision number, or -1 if the revision number is undefined.

#### Remarks
For example, if the version number is 6.2.1.3, the revision number is 3. If the version number is 6.2, the revision number is undefined.

#### Examples
The following code example demonstrates the `Version.%23ctor` constructor, and `Version.Major`, `Version.Minor`, `Version.Build`, `Version.Revision`, `Version.MajorRevision`, and `Version.MinorRevision` properties.

_Code sample not included: ~/snippets/csharp/System/Version/.ctor/rev.cs._

## Version.Clone() method

```csharp
public object Clone ();
```

Returns a new `Version` object whose value is the same as the current `Version` object.

Returns: A new `Object` whose values are a copy of the current `Version` object.

#### Remarks
If the type of the return value is important, cast the `Object` instance that is returned by this method to a `Version` object.
