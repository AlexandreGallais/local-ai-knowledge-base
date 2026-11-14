---
title: "FileVersionInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/FileVersionInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileVersionInfo class (part 2 of 2)

## FileVersionInfo.IsSpecialBuild property

```csharp
public bool IsSpecialBuild { get; }
```

Gets a value that specifies whether the file is a special build.

Returns: `true` if the file is a special build; otherwise, `false`.

#### Remarks
A file that is a special build was built using standard release procedures, but the file differs from a standard file of the same version number. If this value is `true`, the `SpecialBuild` property must specify how this file differs from the standard version.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it displays whether this version is a special build version in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/IsSpecialBuild/source.cs._

## FileVersionInfo.Language property

```csharp
public string? Language { get; }
```

Gets the default language string for the version info block.

Returns: The description string for the Microsoft Language Identifier in the version resource or `null` if the file did not contain version information.

To be added.

## FileVersionInfo.LegalCopyright property

```csharp
public string? LegalCopyright { get; }
```

Gets all copyright notices that apply to the specified file.

Returns: The copyright notices that apply to the specified file.

#### Remarks
This should include the full text of all notices, legal symbols, copyright dates, and so on or `null` if the file did not contain version information.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.LegalCopyright` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/LegalCopyright/source.cs._

## FileVersionInfo.LegalTrademarks property

```csharp
public string? LegalTrademarks { get; }
```

Gets the trademarks and registered trademarks that apply to the file.

Returns: The trademarks and registered trademarks that apply to the file or `null` if the file did not contain version information.

#### Remarks
The legal trademarks include the full text of all notices, legal symbols, and trademark numbers.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.LegalTrademarks` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/LegalTrademarks/source.cs._

## FileVersionInfo.OriginalFilename property

```csharp
public string? OriginalFilename { get; }
```

Gets the name the file was created with.

Returns: The name the file was created with or `null` if the file did not contain version information.

#### Remarks
This property enables an application to determine whether a file has been renamed.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.OriginalFilename` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/OriginalFilename/source.cs._

## FileVersionInfo.PrivateBuild property

```csharp
public string? PrivateBuild { get; }
```

Gets information about a private version of the file.

Returns: Information about a private version of the file or `null` if the file did not contain version information.

#### Remarks
This information is present when `FileVersionInfo.IsPrivateBuild` is `true`.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the private build information in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/PrivateBuild/source.cs._

## FileVersionInfo.ProductBuildPart property

```csharp
public int ProductBuildPart { get; }
```

Gets the build number of the product this file is associated with.

Returns: A value representing the build number of the product this file is associated with or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A product version number is a 64-bit number that holds the version number as follows:

- The first 16 bits are the `FileVersionInfo.ProductMajorPart` number.

- The next 16 bits are the `FileVersionInfo.ProductMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.ProductBuildPart` number.

- The last 16 bits are the `FileVersionInfo.ProductPrivatePart` number.

This property gets the third set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.ProductBuildPart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/ProductBuildPart/source.cs._

## FileVersionInfo.ProductMajorPart property

```csharp
public int ProductMajorPart { get; }
```

Gets the major part of the version number for the product this file is associated with.

Returns: A value representing the major part of the product version number or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A product version number is a 64-bit number that holds the version number as follows:

- The first 16 bits are the `FileVersionInfo.ProductMajorPart` number.

- The next 16 bits are the `FileVersionInfo.ProductMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.ProductBuildPart` number.

- The last 16 bits are the `FileVersionInfo.ProductPrivatePart` number.

This property gets the first set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.ProductMajorPart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/ProductMajorPart/source.cs._

## FileVersionInfo.ProductMinorPart property

```csharp
public int ProductMinorPart { get; }
```

Gets the minor part of the version number for the product the file is associated with.

Returns: A value representing the minor part of the product version number or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A product version number is a 64-bit number that holds the version number as follows:

- The first 16 bits are the `FileVersionInfo.ProductMajorPart` number.

- The next 16 bits are the `FileVersionInfo.ProductMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.ProductBuildPart` number.

- The last 16 bits are the `FileVersionInfo.ProductPrivatePart` number.

This property gets the second set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.ProductMinorPart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/ProductMinorPart/source.cs._

## FileVersionInfo.ProductName property

```csharp
public string? ProductName { get; }
```

Gets the name of the product this file is distributed with.

Returns: The name of the product this file is distributed with or `null` if the file did not contain version information.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.ProductName` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/ProductName/source.cs._

## FileVersionInfo.ProductPrivatePart property

```csharp
public int ProductPrivatePart { get; }
```

Gets the private part number of the product this file is associated with.

Returns: A value representing the private part number of the product this file is associated with or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A product version number is a 64-bit number that holds the version number as follows:

- The first 16 bits are the `FileVersionInfo.ProductMajorPart` number.

- The next 16 bits are the `FileVersionInfo.ProductMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.ProductBuildPart` number.

- The last 16 bits are the `FileVersionInfo.ProductPrivatePart` number.

This property gets the last set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.ProductPrivatePart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/ProductPrivatePart/source.cs._

## FileVersionInfo.ProductVersion property

```csharp
public string? ProductVersion { get; }
```

Gets the version of the product this file is distributed with.

Returns: The version of the product this file is distributed with or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A product version number is a 64-bit number that holds the version number as follows:

- The first 16 bits are the `FileVersionInfo.ProductMajorPart` number.

- The next 16 bits are the `FileVersionInfo.ProductMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.ProductBuildPart` number.

- The last 16 bits are the `FileVersionInfo.ProductPrivatePart` number.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.ProductVersion` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/ProductVersion/source.cs._

## FileVersionInfo.SpecialBuild property

```csharp
public string? SpecialBuild { get; }
```

Gets the special build information for the file.

Returns: The special build information for the file or `null` if the file did not contain version information.

#### Remarks
If `FileVersionInfo.IsSpecialBuild` is `true`, `FileVersionInfo.SpecialBuild` must specify how this file differs from the standard version of the file.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the special build information in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/SpecialBuild/source.cs._

## FileVersionInfo.GetVersionInfo(String) method

```csharp
public static System.Diagnostics.FileVersionInfo GetVersionInfo (string fileName);
```

Returns a `FileVersionInfo` representing the version information associated with the specified file.

Parameters:

- `fileName`: The fully qualified path and name of the file to retrieve the version information for.

Returns: A `FileVersionInfo` containing information about the file. If the file did not contain version information, the `FileVersionInfo` contains only the name of the file requested.

Exceptions:

- `FileNotFoundException`: The file specified cannot be found.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for Notepad and  displays the file description and version number in the console window.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/Overview/source.cs._

## FileVersionInfo.ToString() method

```csharp
public override string ToString ();
```

Returns a partial list of properties in the `FileVersionInfo` and their values.

Returns: A list of the following properties in this class and their values:

`FileVersionInfo.FileName`, `FileVersionInfo.InternalName`, `FileVersionInfo.OriginalFilename`, `FileVersionInfo.FileVersion`, `FileVersionInfo.FileDescription`, `FileVersionInfo.ProductName`, `FileVersionInfo.ProductVersion`, `FileVersionInfo.IsDebug`, `FileVersionInfo.IsPatched`, `FileVersionInfo.IsPreRelease`, `FileVersionInfo.IsPrivateBuild`, `FileVersionInfo.IsSpecialBuild`,

`FileVersionInfo.Language`.

If the file did not contain version information, this list will contain only the name of the requested file. Boolean values will be `false`, and all other entries will be `null`.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it calls `FileVersionInfo.ToString` to print a list of the file version information in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/ToString/source.cs._
