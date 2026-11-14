---
title: "OperatingSystem class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/OperatingSystem.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OperatingSystem class

Namespace: `System`

```csharp
public sealed class OperatingSystem : ICloneable, System.Runtime.Serialization.ISerializable
```

Represents information about an operating system, such as the version and platform identifier. This class cannot be inherited.

#### Remarks
The `OperatingSystem` class contains information about an operating system.

For information about the current runtime operating system, retrieve the `OperatingSystem` object returned by the `OSVersion` property. For a list of Windows operating system versions and their corresponding version numbers returned by the `OperatingSystem.Version` and `OperatingSystem.VersionString` properties and the `OperatingSystem.ToString` method, see Operating System Version.

By design, the `OperatingSystem` class is not a general purpose means of describing an operating system, and you cannot derive a more inclusive type from the `OperatingSystem` class. If you need a type to contain other information about an operating system, create your own type, then include a field of type `OperatingSystem` and any additional fields, properties, or methods that you require.

#### Examples
The following code example uses the `OperatingSystem` object to display information about the runtime operating system.

_Code sample not included: ~/snippets/csharp/System/OperatingSystem/Overview/osinfo1.cs._

## OperatingSystem.OperatingSystem(PlatformID, Version) constructor

```csharp
public OperatingSystem (PlatformID platform, Version version);
```

Initializes a new instance of the `OperatingSystem` class, using the specified platform identifier value and version object.

Parameters:

- `platform`: One of the `PlatformID` values that indicates the operating system platform.
- `version`: A `Version` object that indicates the version of the operating system.

Exceptions:

- `ArgumentNullException`: `version` is `null`.
- `ArgumentException`: `platform` is not a `PlatformID` enumeration value.

To be added.

## OperatingSystem.Platform property

```csharp
public PlatformID Platform { get; }
```

Gets a `PlatformID` enumeration value that identifies the operating system platform.

Returns: One of the `PlatformID` values.

#### Examples
The following code example creates several `OperatingSystem` objects and displays the `Platform` property for each.

_Code sample not included: ~/snippets/csharp/System/OperatingSystem/Platform/plat_ver.cs._

## OperatingSystem.ServicePack property

```csharp
public string ServicePack { get; }
```

Gets the service pack version represented by this `OperatingSystem` object.

Returns: The service pack version, if service packs are supported and at least one is installed; otherwise, an empty string ("").

#### Remarks
A service pack is used to distribute software updates for the operating system on which it is installed. However, not every operating system uses service packs.

The service pack version, if available, is already correctly formatted for display.

#### Examples
The following code example demonstrates the `ServicePack` property.

_Code sample not included: ~/snippets/csharp/System/OperatingSystem/ServicePack/sp.cs._

## OperatingSystem.Version property

```csharp
public Version Version { get; }
```

Gets a `Version` object that identifies the operating system.

Returns: A `Version` object that describes the major version, minor version, build, and revision numbers for the operating system.

#### Remarks

For a list of Windows operating system versions and their corresponding version numbers, see Operating System Version.

#### Examples
The following code example creates several `OperatingSystem` objects and displays the `Version` property for each.

_Code sample not included: ~/snippets/csharp/System/OperatingSystem/Platform/plat_ver.cs._

## OperatingSystem.VersionString property

```csharp
public string VersionString { get; }
```

Gets the concatenated string representation of the platform identifier, version, and service pack that are currently installed on the operating system.

Returns: The string representation of the values returned by the `OperatingSystem.Platform`, `OperatingSystem.Version`, and `OperatingSystem.ServicePack` properties.

#### Remarks
By default, the value returned by `OperatingSystem.VersionString` is the same as the value returned by the `OperatingSystem.ToString` method. However, an implementation of .NET for a different platform might return a more appropriate string for that platform.

For a list of Windows operating system versions and their corresponding version numbers, see Operating System Version.

#### Examples
The following code example demonstrates the `VersionString` property.

_Code sample not included: ~/snippets/csharp/System/OperatingSystem/VersionString/osvs.cs._

## OperatingSystem.Clone() method

```csharp
public object Clone ();
```

Creates an `OperatingSystem` object that is identical to this instance.

Returns: An `OperatingSystem` object that is a copy of this instance.

#### Examples
The following code example illustrates the use of the `OperatingSystem.Clone` method to make a copy of an `OperatingSystem` object. The clone is compared with the original object to show that they are not the same object.

_Code sample not included: ~/snippets/csharp/System/OperatingSystem/Clone/clone.cs._

## OperatingSystem.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data necessary to deserialize this instance.

Parameters:

- `info`: The object to populate with serialization information.
- `context`: The place to store and retrieve serialized data. Reserved for future use.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## OperatingSystem.IsAndroid() method

```csharp
public static bool IsAndroid ();
```

Indicates whether the current application is running on Android.

Returns: `true` if the current application is running on Android; `false` otherwise.

To be added.

## OperatingSystem.IsAndroidVersionAtLeast(Int32, Int32, Int32, Int32) method

```csharp
public static bool IsAndroidVersionAtLeast (int major, int minor = 0, int build = 0, int revision = 0);
```

Checks if the Android version (returned by the Linux command `uname`) is greater than or equal to the specified version. This method can be used to guard APIs that were added in the specified version.

Parameters:

- `major`: The major release number.
- `minor`: The minor release number.
- `build`: The build release number.
- `revision`: The revision release number.

Returns: `true` if the current application is running on an Android version that is at least what was specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.IsBrowser() method

```csharp
public static bool IsBrowser ();
```

Indicates whether the current application is running as WASM in a browser.

Returns: `true` if the current application is running as WASM in a browser; `false` otherwise.

To be added.

## OperatingSystem.IsFreeBSD() method

```csharp
public static bool IsFreeBSD ();
```

Indicates whether the current application is running on FreeBSD.

Returns: `true` if the current application is running on FreeBSD; `false` otherwise.

To be added.

## OperatingSystem.IsFreeBSDVersionAtLeast(Int32, Int32, Int32, Int32) method

```csharp
public static bool IsFreeBSDVersionAtLeast (int major, int minor = 0, int build = 0, int revision = 0);
```

Checks if the FreeBSD version (returned by the Linux command `uname`) is greater than or equal to the specified version. This method can be used to guard APIs that were added in the specified version.

Parameters:

- `major`: The major release number.
- `minor`: The minor release number.
- `build`: The build release number.
- `revision`: The revision release number.

Returns: `true` if the current application is running on a FreeBSD version that is at least what was specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.IsIOS() method

```csharp
public static bool IsIOS ();
```

Indicates whether the current application is running on iOS or MacCatalyst.

Returns: `true` if the current application is running on iOS or MacCatalyst; `false` otherwise.

To be added.

## OperatingSystem.IsIOSVersionAtLeast(Int32, Int32, Int32) method

```csharp
public static bool IsIOSVersionAtLeast (int major, int minor = 0, int build = 0);
```

Checks if the iOS/MacCatalyst version (returned by `libobjc.get_operatingSystemVersion`) is greater than or equal to the specified version. This method can be used to guard APIs that were added in the specified iOS version.

Parameters:

- `major`: The major release number.
- `minor`: The minor release number.
- `build`: The build release number.

Returns: `true` if the current application is running on an iOS/MacCatalyst version that is at least what was specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.IsLinux() method

```csharp
public static bool IsLinux ();
```

Indicates whether the current application is running on Linux.

Returns: `true` if the current application is running on Linux; `false` otherwise.

To be added.

## OperatingSystem.IsMacCatalyst() method

```csharp
public static bool IsMacCatalyst ();
```

Indicates whether the current application is running on Mac Catalyst.

Returns: `true` if the current application is running on Mac Catalyst; `false` otherwise.

To be added.

## OperatingSystem.IsMacCatalystVersionAtLeast(Int32, Int32, Int32) method

```csharp
public static bool IsMacCatalystVersionAtLeast (int major, int minor = 0, int build = 0);
```

Check for the Mac Catalyst version (iOS version as presented in Apple documentation) with a ≤ version comparison. Used to guard APIs that were added in the given Mac Catalyst release.

Parameters:

- `major`: The version major number.
- `minor`: The version minor number.
- `build`: The version build number.

Returns: `true` if the Mac Catalyst version is greater or equal than the specified version comparison; `false` otherwise.

To be added.

## OperatingSystem.IsMacOS() method

```csharp
public static bool IsMacOS ();
```

Indicates whether the current application is running on macOS.

Returns: `true` if the current application is running on macOS; `false` otherwise.

To be added.

## OperatingSystem.IsMacOSVersionAtLeast(Int32, Int32, Int32) method

```csharp
public static bool IsMacOSVersionAtLeast (int major, int minor = 0, int build = 0);
```

Checks if the macOS version (returned by `libobjc.get_operatingSystemVersion`) is greater than or equal to the specified version. This method can be used to guard APIs that were added in the specified macOS version.

Parameters:

- `major`: The major release number.
- `minor`: The minor release number.
- `build`: The build release number.

Returns: `true` if the current application is running on an macOS version that is at least what was specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.IsOSPlatform(String) method

```csharp
public static bool IsOSPlatform (string platform);
```

Indicates whether the current application is running on the specified platform.

Parameters:

- `platform`: The case-insensitive platform name. Examples: Browser, Linux, FreeBSD, Android, iOS, macOS, tvOS, watchOS, Windows.

Returns: `true` if the current application is running on the specified platform; `false` otherwise.

To be added.

## OperatingSystem.IsOSPlatformVersionAtLeast(String, Int32, Int32, Int32, Int32) method

```csharp
public static bool IsOSPlatformVersionAtLeast (string platform, int major, int minor = 0, int build = 0, int revision = 0);
```

Checks if the operating system version is greater than or equal to the specified platform version. This method can be used to guard APIs that were added in the specified OS version.

Parameters:

- `platform`: The case-insensitive platform name. Examples: Browser, Linux, FreeBSD, Android, iOS, macOS, tvOS, watchOS, Windows.
- `major`: The major release number.
- `minor`: The minor release number (optional).
- `build`: The build release number (optional).
- `revision`: The revision release number (optional).

Returns: `true` if the current application is running on the specified platform and is at least in the version specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.IsTvOS() method

```csharp
public static bool IsTvOS ();
```

Indicates whether the current application is running on tvOS.

Returns: `true` if the current application is running on tvOS; `false` otherwise.

To be added.

## OperatingSystem.IsTvOSVersionAtLeast(Int32, Int32, Int32) method

```csharp
public static bool IsTvOSVersionAtLeast (int major, int minor = 0, int build = 0);
```

Checks if the tvOS version (returned by `libobjc.get_operatingSystemVersion`) is greater than or equal to the specified version. This method can be used to guard APIs that were added in the specified tvOS version.

Parameters:

- `major`: The major release number.
- `minor`: The minor release number.
- `build`: The build release number.

Returns: `true` if the current application is running on a tvOS version that is at least what was specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.IsWasi() method

```csharp
public static bool IsWasi ();
```

Indicates whether the current application is running as WASI.

Returns: `true` if the current application is running as WASI; `false` otherwise.

To be added.

## OperatingSystem.IsWatchOS() method

```csharp
public static bool IsWatchOS ();
```

Indicates whether the current application is running on watchOS.

Returns: `true` if the current application is running on watchOS; `false` otherwise.

To be added.

## OperatingSystem.IsWatchOSVersionAtLeast(Int32, Int32, Int32) method

```csharp
public static bool IsWatchOSVersionAtLeast (int major, int minor = 0, int build = 0);
```

Checks if the watchOS version (returned by `libobjc.get_operatingSystemVersion`) is greater than or equal to the specified version. This method can be used to guard APIs that were added in the specified watchOS version.

Parameters:

- `major`: The major release number.
- `minor`: The minor release number.
- `build`: The build release number.

Returns: `true` if the current application is running on a watchOS version that is at least what was specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.IsWindows() method

```csharp
public static bool IsWindows ();
```

Indicates whether the current application is running on Windows.

Returns: `true` if the current application is running on Windows; `false` otherwise.

To be added.
