---
title: "Globalization and ICU (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/globalization-icu.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET globalization and ICU

Before .NET 5, the .NET globalization APIs used different underlying libraries on different platforms. On Unix, the APIs used International Components for Unicode (ICU), and on Windows, they used National Language Support (NLS). This resulted in some behavioral differences in a handful of globalization APIs when running applications on different platforms. Behavior differences were evident in these areas:

- Cultures and culture data
- String casing
- String sorting and searching
- Sort keys
- String normalization
- Internationalized Domain Names (IDN) support
- Time zone display name on Linux

Starting with .NET 5, developers have more control over which underlying library is used, enabling applications to avoid differences across platforms.

> **Note:**
> The culture data that drives the behavior of the ICU library is usually maintained by the Common Locale Data Repository (CLDR), not the runtime.

## ICU on Windows

Windows now incorporates a preinstalled icu.dll version as part of its features that's automatically employed for globalization tasks. This modification allows .NET to use this ICU library for its globalization support. In cases where the ICU library is unavailable or can't be loaded, as is the case with older Windows versions, .NET 5 and subsequent versions revert to using the NLS-based implementation.

The following table shows which versions of .NET are capable of loading the ICU library across different Windows client and server versions:

| .NET version     | Windows version                         |
|------------------|-----------------------------------------|
| .NET 5 or .NET 6 | Windows client 10 version 1903 or later |
| .NET 5 or .NET 6 | Windows Server 2022 or later            |
| .NET 7 or later  | Windows client 10 version 1703 or later |
| .NET 7 or later  | Windows Server 2019 or later            |

> **Note:**
> .NET 7 and later versions have the capability to load ICU on older Windows versions, in contrast to .NET 6 and .NET 5.

> **Note:**
> Even when using ICU, the `CurrentCulture`, `CurrentUICulture`, and `CurrentRegion` members still use Windows operating system APIs to honor user settings.

### Behavioral differences

If you upgrade your app to target .NET 5 or later, you might see changes in your app even if you don't realize you're using globalization facilities. The following section lists some behavioral changes you might experience.

#### String sorting and `System.Globalization.CompareOptions`

`CompareOptions` is the options enumeration which can be passed to `String.Compare` to influence how two strings are compared.

Comparing strings for equality and determining their sort order differs between NLS and ICU. In particular:

- The default string sort order is different, so this will be apparent even if you don't use `CompareOptions` directly. When using ICU, the `None` default option performs the same as `StringSort`. `StringSort` sorts non-alphanumeric characters before alphanumeric ones (so "bill's" sorts before "bills", for example). To restore the previous `None` functionality, you must use the NLS-based implementation.
- The default handling of ligature characters differs. Under NLS, ligatures and their non-ligature counterparts (for example, "oeuf" and "œuf") are considered equal, but this isn't the case with ICU in .NET. This is because of a different collation strength between the two implementations. To restore the NLS behavior when using ICU, use the `CompareOptions.IgnoreNonSpace` value.

#### String.IndexOf

Consider the following code that calls `System.String.IndexOf(System.String)` to find the index of the null character `\0` in a string.

```csharp
const string greeting = "Hel\0lo";
Console.WriteLine($"{greeting.IndexOf("\0")}");
Console.WriteLine($"{greeting.IndexOf("\0", StringComparison.CurrentCulture)}");
Console.WriteLine($"{greeting.IndexOf("\0", StringComparison.Ordinal)}");
```

- In .NET Core 3.1 and earlier versions on Windows, the snippet prints `3` on each of the three lines.
- For .NET 5 and later versions running on the Windows versions listed in the ICU on Windows section table, the snippet prints `0`, `0`, and `3` (for the ordinal search).

By default, `System.String.IndexOf(System.String)` performs a culture-aware linguistic search. ICU considers the null character `\0` to be a *zero-weight character*, and thus the character isn't found in the string when using a linguistic search on .NET 5 and later. However, NLS doesn't consider the null character `\0` to be a zero-weight character, and a linguistic search on .NET Core 3.1 and earlier locates the character at position 3. An ordinal search finds the character at position 3 on all .NET versions.

You can run code analysis rules CA1307: Specify StringComparison for clarity and CA1309: Use ordinal StringComparison to find call sites in your code where the string comparison isn't specified or it isn't ordinal.

For more information, see Best practices for comparing strings in .NET.

#### String.EndsWith

```csharp
const string foo = "abc";

Console.WriteLine(foo.EndsWith("\0"));
Console.WriteLine(foo.EndsWith("c"));
Console.WriteLine(foo.EndsWith("\0", StringComparison.CurrentCulture));
Console.WriteLine(foo.EndsWith("\0", StringComparison.Ordinal));
Console.WriteLine(foo.EndsWith('\0'));
```

> **Important:**
> In .NET 5+ running on Windows versions listed in the ICU on Windows table, the preceding snippet prints:
>
> ```Output
> True
> True
> True
> False
> False
> ```

To avoid this behavior, use the `char` parameter overload or `StringComparison.Ordinal`.

#### String.StartsWith

```csharp
const string foo = "abc";

Console.WriteLine(foo.StartsWith("\0"));
Console.WriteLine(foo.StartsWith("a"));
Console.WriteLine(foo.StartsWith("\0", StringComparison.CurrentCulture));
Console.WriteLine(foo.StartsWith("\0", StringComparison.Ordinal));
Console.WriteLine(foo.StartsWith('\0'));
```

> **Important:**
> In .NET 5+ running on Windows versions listed in the ICU on Windows table, the preceding snippet prints:
>
> ```Output
> True
> True
> True
> False
> False
> ```

To avoid this behavior, use the `char` parameter overload or `StringComparison.Ordinal`.

#### TimeZoneInfo.FindSystemTimeZoneById

ICU provides the flexibility to create `System.TimeZoneInfo` instances using IANA time zone IDs, even when the application is running on Windows. Similarly, you can create `System.TimeZoneInfo` instances with Windows time zone IDs, even when running on non-Windows platforms. However, it's important to note that this functionality isn't available when using NLS mode or globalization invariant mode.

#### Day-of-week abbreviations

The `System.Globalization.DateTimeFormatInfo.GetShortestDayName(System.DayOfWeek)` method obtains the shortest abbreviated day name for a specified day of the week.

- In .NET Core 3.1 and earlier versions on Windows, these day-of-week abbreviations consisted of two characters, for example, "Su".
- In .NET 5 and later versions, these day-of-week abbreviations consist of only one character, for example, "S".

#### ICU-dependent APIs

.NET introduced APIs that are dependent on ICU. These APIs can succeed only when using ICU. Here are some examples:

- `System.TimeZoneInfo.TryConvertIanaIdToWindowsId(System.String,System.String@)`
- `System.TimeZoneInfo.TryConvertWindowsIdToIanaId*`

On the Windows versions listed in the ICU on Windows section table, the mentioned APIs succeed. However, on older versions of Windows, these APIs fail. In such cases, you can enable the app-local ICU feature to ensure the success of these APIs. On non-Windows platforms, these APIs always succeed regardless of the version.

In addition, it's crucial for apps to ensure that they're not running in globalization invariant mode or NLS mode to guarantee the success of these APIs.

### Use NLS instead of ICU

Using ICU instead of NLS might result in behavioral differences with some globalization-related operations. To revert back to using NLS, you can opt out of the ICU implementation. Applications can enable NLS mode in any of the following ways:

- In the project file:

  ```xml
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="System.Globalization.UseNls" Value="true" />
  </ItemGroup>
  ```

- In the `runtimeconfig.json` file:

  ```json
  {
    "runtimeOptions": {
       "configProperties": {
         "System.Globalization.UseNls": true
        }
    }
  }
  ```

- By setting the environment variable `DOTNET_SYSTEM_GLOBALIZATION_USENLS` to the value `true` or `1`.

> **Note:**
> In .NET 9 and later versions, an environment variable setting takes precedence. In previous versions, a value set in the project or in the `runtimeconfig.json` file takes precedence over the environment variable.

For more information, see Runtime config settings.

### Determine if your app is using ICU

The following code snippet can help you determine if your app is running with ICU libraries (and not NLS).

```csharp
public static bool ICUMode()
{
    SortVersion sortVersion = CultureInfo.InvariantCulture.CompareInfo.Version;
    byte[] bytes = sortVersion.SortId.ToByteArray();
    int version = bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    return version != 0 && version == sortVersion.FullVersion;
}
```

To determine the version of .NET, use `System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription`.

## App-local ICU

Each release of ICU might bring with it bug fixes and updated Common Locale Data Repository (CLDR) data that describes the world's languages. Moving between versions of ICU can subtly impact app behavior when it comes to globalization-related operations. To help application developers ensure consistency across all deployments, .NET 5 and later versions enable apps on both Windows and Unix to carry and use their own copy of ICU.

Applications can opt in to an app-local ICU implementation mode in one of the following ways:

- In the project file, set the appropriate `RuntimeHostConfigurationOption` value:

  ```xml
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="System.Globalization.AppLocalIcu" Value="<suffix>:<version> or <version>" />
  </ItemGroup>
  ```

- Or in the _runtimeconfig.json_ file, set the appropriate `runtimeOptions.configProperties` value:

  ```json
  {
    "runtimeOptions": {
       "configProperties": {
         "System.Globalization.AppLocalIcu": "<suffix>:<version> or <version>"
       }
    }
  }
  ```

- Or by setting the environment variable `DOTNET_SYSTEM_GLOBALIZATION_APPLOCALICU` to the value `<suffix>:<version>` or `<version>`.

  `<suffix>`: Optional suffix of fewer than 36 characters in length, following the public ICU packaging conventions. When building a custom ICU, you can customize it to produce the lib names and exported symbol names to contain a suffix, for example, `libicuucmyapp`, where `myapp` is the suffix.

  `<version>`: A valid ICU version, for example, 67.1. This version is used to load the binaries and to get the exported symbols.

When either of these options is set, you can add a Microsoft.ICU.ICU4C.Runtime `PackageReference` to your project that corresponds to the configured `version` and that's all that is needed.

Alternatively, to load ICU when the app-local switch is set, .NET uses the `System.Runtime.InteropServices.NativeLibrary.TryLoad*` method, which probes multiple paths. The method first tries to find the library in the `NATIVE_DLL_SEARCH_DIRECTORIES` property, which is created by the dotnet host based on the `deps.json` file for the app. For more information, see Default probing.

For self-contained apps, no special action is required by the user, other than making sure ICU is in the app directory (for self-contained apps, the working directory defaults to `NATIVE_DLL_SEARCH_DIRECTORIES`).

If you're consuming ICU via a NuGet package, this works in framework-dependent applications. NuGet resolves the native assets and includes them in the `deps.json` file and in the output directory for the application under the `runtimes` directory. .NET loads it from there.

For framework-dependent apps (not self-contained) where ICU is consumed from a local build, you must take additional steps. The .NET SDK doesn't yet have a feature for "loose" native binaries to be incorporated into `deps.json` (see this SDK issue). Instead, you can enable this by adding additional information into the application's project file. For example:

```xml
<ItemGroup>
  <IcuAssemblies Include="icu\*.so*" />
  <RuntimeTargetsCopyLocalItems Include="@(IcuAssemblies)" AssetType="native" CopyLocal="true"
    DestinationSubDirectory="runtimes/linux-x64/native/" DestinationSubPath="%(FileName)%(Extension)"
    RuntimeIdentifier="linux-x64" NuGetPackageId="System.Private.Runtime.UnicodeData" />
</ItemGroup>
```

This must be done for all the ICU binaries for the supported runtimes. Also, the `NuGetPackageId` metadata in the `RuntimeTargetsCopyLocalItems` item group needs to match a NuGet package that the project actually references.

## Load specific ICU version on Linux

By default, when using ICU on Linux, .NET attempts to load the latest installed version of ICU from the system. However, you can specify a specific version of ICU to load by setting the `DOTNET_ICU_VERSION_OVERRIDE` environment variable.

For example, if the environment variable is set to a specific version number, such as `67.1`, .NET attempts to load that version of ICU. For example, .NET looks for the libraries `libicuuc.so.67.1` and `libicui18n.so.67.1`.

> **Note:**
> This environment variable is supported only on .NET builds provided by Microsoft and is not supported on builds supplied by Linux distributions.
> For .NET versions earlier than .NET 10, the environment variable is called `CLR_ICU_VERSION_OVERRIDE`.

If the specified version isn't found, .NET falls back to loading the highest installed ICU version from the system.

This configuration provides flexibility in controlling ICU version usage, ensuring compatibility with application-specific or system-provided ICU versions.
