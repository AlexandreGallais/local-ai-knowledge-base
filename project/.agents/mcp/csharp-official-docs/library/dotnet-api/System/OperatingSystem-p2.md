---
title: "OperatingSystem class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/OperatingSystem.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OperatingSystem class (part 2 of 2)

## OperatingSystem.IsWindowsVersionAtLeast(Int32, Int32, Int32, Int32) method

```csharp
public static bool IsWindowsVersionAtLeast (int major, int minor = 0, int build = 0, int revision = 0);
```

Checks if the Windows version (returned by `RtlGetVersion`) is greater than or equal to the specified version. This method can be used to guard APIs that were added in the specified Windows version.

Parameters:

- `major`: The major release number.
- `minor`: The minor release number.
- `build`: The build release number.
- `revision`: The revision release number.

Returns: `true` if the current application is running on a Windows version that is at least what was specified in the parameters; `false` otherwise.

To be added.

## OperatingSystem.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this `OperatingSystem` object to its equivalent string representation.

Returns: The string representation of the values returned by the `OperatingSystem.Platform`, `OperatingSystem.Version`, and `OperatingSystem.ServicePack` properties.

#### Remarks

For a list of Windows operating system versions and their corresponding version numbers, see Operating System Version.

#### Examples
The following code example illustrates the use of the `OperatingSystem.ToString` method to display `OperatingSystem` objects.

_Code sample not included: ~/snippets/csharp/System/OperatingSystem/ToString/ctor_tostr.cs._
