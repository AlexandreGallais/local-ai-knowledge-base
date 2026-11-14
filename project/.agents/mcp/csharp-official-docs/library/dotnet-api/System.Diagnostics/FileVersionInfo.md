---
title: "FileVersionInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/FileVersionInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileVersionInfo class

Namespace: `System.Diagnostics`

```csharp
public sealed class FileVersionInfo
```

Provides version information for a physical file on disk.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A file version number is a 64-bit number that holds the version number for a file as follows:

- The first 16 bits are the `FileVersionInfo.FileMajorPart` number.

- The next 16 bits are the `FileVersionInfo.FileMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.FileBuildPart` number.

- The last 16 bits are the `FileVersionInfo.FilePrivatePart` number.

Use the `FileVersionInfo.GetVersionInfo` method of this class to get a `FileVersionInfo` containing information about a file, then look at the properties for information about the file. The `FileVersion` property provides version information about the file. The `FileVersionInfo.ProductMajorPart`, `FileVersionInfo.ProductMinorPart`, `FileVersionInfo.ProductBuildPart`, `FileVersionInfo.ProductPrivatePart`, and `FileVersionInfo.ProductVersion` properties provide version information for the product that the specified file is a part of. Call `FileVersionInfo.ToString` to get a partial list of properties and their values for this file.

The `FileVersionInfo` properties are based on version resource information built into the file. Version resources are often built into binary files such as .exe or .dll files; text files do not have version resource information.

Version resources are typically specified in a Win32 resource file, or in assembly attributes. For example the `IsDebug` property reflects the `VS_FF_DEBUG` flag value in the file's `VS_FIXEDFILEINFO` block, which is built from the `VERSIONINFO` resource in a Win32 resource file.  For more information about specifying version resources in a Win32 resource file, see "About Resource Files" and "VERSIONINFO Resource" in the Platform SDK. For more information about specifying version resources in a .NET module, see the Setting Assembly Attributes topic.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the file description and version number to the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/Overview/source.cs._

## FileVersionInfo.Comments property

```csharp
public string? Comments { get; }
```

Gets the comments associated with the file.

Returns: The comments associated with the file or `null` if the file did not contain version information.

#### Remarks
This property contains additional information that can be displayed for diagnostic purposes.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the comments in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/Comments/source.cs._

## FileVersionInfo.CompanyName property

```csharp
public string? CompanyName { get; }
```

Gets the name of the company that produced the file.

Returns: The name of the company that produced the file or `null` if the file did not contain version information.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.CompanyName` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/CompanyName/source.cs._

## FileVersionInfo.FileBuildPart property

```csharp
public int FileBuildPart { get; }
```

Gets the build number of the file.

Returns: A value representing the build number of the file or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A file version number is a 64-bit number that holds the version number for a file as follows:

- The first 16 bits are the `FileVersionInfo.FileMajorPart` number.

- The next 16 bits are the `FileVersionInfo.FileMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.FileBuildPart` number.

- The last 16 bits are the `FileVersionInfo.FilePrivatePart` number.

This property gets the third set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.FileBuildPart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/FileBuildPart/source.cs._

## FileVersionInfo.FileDescription property

```csharp
public string? FileDescription { get; }
```

Gets the description of the file.

Returns: The description of the file or `null` if the file did not contain version information.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.FileDescription` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/FileDescription/source.cs._

## FileVersionInfo.FileMajorPart property

```csharp
public int FileMajorPart { get; }
```

Gets the major part of the version number.

Returns: A value representing the major part of the version number or 0 (zero) if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A file version number is a 64-bit number that holds the version number for a file as follows:

- The first 16 bits are the `FileVersionInfo.FileMajorPart` number.

- The next 16 bits are the `FileVersionInfo.FileMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.FileBuildPart` number.

- The last 16 bits are the `FileVersionInfo.FilePrivatePart` number.

This property gets the first set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.FileMajorPart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/FileMajorPart/source.cs._

## FileVersionInfo.FileMinorPart property

```csharp
public int FileMinorPart { get; }
```

Gets the minor part of the version number of the file.

Returns: A value representing the minor part of the version number of the file or 0 (zero) if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A file version number is a 64-bit number that holds the version number for a file as follows:

- The first 16 bits are the `FileVersionInfo.FileMajorPart` number.

- The next 16 bits are the `FileVersionInfo.FileMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.FileBuildPart` number.

- The last 16 bits are the `FileVersionInfo.FilePrivatePart` number.

This property gets the second set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.FileMinorPart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/FileMinorPart/source.cs._

## FileVersionInfo.FileName property

```csharp
public string FileName { get; }
```

Gets the name of the file that this instance of `FileVersionInfo` describes.

Returns: The name of the file described by this instance of `FileVersionInfo`.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.FileName` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/FileName/source.cs._

## FileVersionInfo.FilePrivatePart property

```csharp
public int FilePrivatePart { get; }
```

Gets the file private part number.

Returns: A value representing the file private part number or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A file version number is a 64-bit number that holds the version number for a file as follows:

- The first 16 bits are the `FileVersionInfo.FileMajorPart` number.

- The next 16 bits are the `FileVersionInfo.FileMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.FileBuildPart` number.

- The last 16 bits are the `FileVersionInfo.FilePrivatePart` number.

This property gets the last set of 16 bits.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.FilePrivatePart` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/FilePrivatePart/source.cs._

## FileVersionInfo.FileVersion property

```csharp
public string? FileVersion { get; }
```

Gets the file version number.

Returns: The version number of the file or `null` if the file did not contain version information.

#### Remarks
Typically, a version number is displayed as "major number.minor number.build number.private part number". A file version number is a 64-bit number that holds the version number for a file as follows:

- The first 16 bits are the `FileVersionInfo.FileMajorPart` number.

- The next 16 bits are the `FileVersionInfo.FileMinorPart` number.

- The third set of 16 bits are the `FileVersionInfo.FileBuildPart` number.

- The last 16 bits are the `FileVersionInfo.FilePrivatePart` number.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the file description and version number in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/Overview/source.cs._

## FileVersionInfo.InternalName property

```csharp
public string? InternalName { get; }
```

Gets the internal name of the file, if one exists.

Returns: The internal name of the file. If none exists, this property will contain the original name of the file without the extension.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it prints the `FileVersionInfo.InternalName` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/InternalName/source.cs._

## FileVersionInfo.IsDebug property

```csharp
public bool IsDebug { get; }
```

Gets a value that specifies whether the file contains debugging information or is compiled with debugging features enabled.

Returns: `true` if the file contains debugging information or is compiled with debugging features enabled; otherwise, `false`.

#### Remarks
The `FileVersionInfo` properties are based on version resource information built into the file. Version resources are often built into binary files such as .exe or .dll files; text files do not have version resource information.

Version resources are typically specified in a Win32 resource file, or in assembly attributes. The `IsDebug` property reflects the `VS_FF_DEBUG` flag value in the file's `VS_FIXEDFILEINFO` block, which is built from the `VERSIONINFO` resource in a Win32 resource file. For more information about specifying version resources in a Win32 resource file, see the Platform SDK `About Resource Files` topic and `VERSIONINFO Resource` topic topics.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it displays the state of the Boolean `FileVersionInfo.IsDebug` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/IsDebug/source.cs._

## FileVersionInfo.IsPatched property

```csharp
public bool IsPatched { get; }
```

Gets a value that specifies whether the file has been modified and is not identical to the original shipping file of the same version number.

Returns: `true` if the file is patched; otherwise, `false`.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it displays the state of the Boolean `FileVersionInfo.IsPatched` in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/IsPatched/source.cs._

## FileVersionInfo.IsPreRelease property

```csharp
public bool IsPreRelease { get; }
```

Gets a value that specifies whether the file is a development version, rather than a commercially released product.

Returns: `true` if the file is prerelease; otherwise, `false`.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it displays whether this version is a prerelease version in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/IsPreRelease/source.cs._

## FileVersionInfo.IsPrivateBuild property

```csharp
public bool IsPrivateBuild { get; }
```

Gets a value that specifies whether the file was built using standard release procedures.

Returns: `true` if the file is a private build; `false` if the file was built using standard release procedures or if the file did not contain version information.

#### Remarks
If this value is `true`, `FileVersionInfo.PrivateBuild` will describe how this version of the file differs from the standard version.

#### Examples
The following example calls `FileVersionInfo.GetVersionInfo` to get the `FileVersionInfo` for the Notepad. Then it displays the private build information in a text box. This code assumes `textBox1` has been instantiated.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/FileVersionInfo/IsPrivateBuild/source.cs._
