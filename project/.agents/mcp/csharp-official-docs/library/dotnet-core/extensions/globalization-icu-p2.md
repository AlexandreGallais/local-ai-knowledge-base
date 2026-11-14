---
title: "Globalization and ICU (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/globalization-icu.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Globalization and ICU (part 2 of 2)

## macOS behavior

macOS has a different behavior for resolving dependent dynamic libraries from the load commands specified in the `Mach-O` file than the Linux loader. In the Linux loader, .NET can try `libicudata`, `libicuuc`, and `libicui18n` (in that order) to satisfy ICU dependency graph. However, on macOS, this doesn't work. When building ICU on macOS, you, by default, get a dynamic library with these load commands in `libicuuc`. The following snippet shows an example.

```sh
~/ % otool -L /Users/santifdezm/repos/icu-build/icu/install/lib/libicuuc.67.1.dylib
/Users/santifdezm/repos/icu-build/icu/install/lib/libicuuc.67.1.dylib:
 libicuuc.67.dylib (compatibility version 67.0.0, current version 67.1.0)
 libicudata.67.dylib (compatibility version 67.0.0, current version 67.1.0)
 /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1281.100.1)
 /usr/lib/libc++.1.dylib (compatibility version 1.0.0, current version 902.1.0)
```

These commands just reference the name of the dependent libraries for the other components of ICU. The loader performs the search following the `dlopen` conventions, which involves having these libraries in the system directories or setting the `LD_LIBRARY_PATH` env vars, or having ICU at the app-level directory. If you can't set `LD_LIBRARY_PATH` or ensure that ICU binaries are at the app-level directory, you'll need to do some extra work.

There are some directives for the loader, like `@loader_path`, which tell the loader to search for that dependency in the same directory as the binary with that load command. There are two ways to achieve this:

- `install_name_tool -change`

  Run the following commands:

  ```bash
  install_name_tool -change "libicudata.67.dylib" "@loader_path/libicudata.67.dylib" /path/to/libicuuc.67.1.dylib
  install_name_tool -change "libicudata.67.dylib" "@loader_path/libicudata.67.dylib" /path/to/libicui18n.67.1.dylib
  install_name_tool -change "libicuuc.67.dylib" "@loader_path/libicuuc.67.dylib" /path/to/libicui18n.67.1.dylib
  ```

- Patch ICU to produce the install names with `@loader_path`

  Before running autoconf (`./runConfigureICU`), change these lines to:

  ```
  LD_SONAME = -Wl,-compatibility_version -Wl,$(SO_TARGET_VERSION_MAJOR) -Wl,-current_version -Wl,$(SO_TARGET_VERSION) -install_name @loader_path/$(notdir $(MIDDLE_SO_TARGET))
  ```

## ICU on WebAssembly

A version of ICU is available that's specifically for WebAssembly workloads. This version provides globalization compatibility with desktop profiles. To reduce the ICU data file size from 24 MB to 1.4 MB (or ~0.3 MB if compressed with Brotli), this workload has a handful of limitations.

The following APIs are not supported:

- `System.Globalization.CultureInfo.EnglishName`
- `System.Globalization.CultureInfo.NativeName`
- `System.Globalization.DateTimeFormatInfo.NativeCalendarName`
- `System.Globalization.RegionInfo.NativeName`

The following APIs are supported with limitations:

- `System.String.Normalize(System.Text.NormalizationForm)` and `System.String.IsNormalized(System.Text.NormalizationForm)` don't support the rarely used `System.Text.NormalizationForm.FormKC` and `System.Text.NormalizationForm.FormKD` forms.
- `System.Globalization.RegionInfo.CurrencyNativeName` returns the same value as `System.Globalization.RegionInfo.CurrencyEnglishName`.

In addition, fewer locales are supported. The supported list can be found in the dotnet/icu repo.

## Globalization setup in .NET apps

.NET globalization initialization is a complex process that involves loading the appropriate globalization library, setting up the culture data, and configuring the globalization settings. The following sections describe how globalization initialization works on different platforms.

### Windows

On Windows, .NET follow the following steps to initialize globalization:

- Check whether Globalization Invariant Mode is enabled. When this mode is active, .NET bypasses loading the ICU library and avoids using NLS APIs. Instead, it relies on built-in invariant culture data, ensuring that behavior remains fully independent of the operating system and the ICU library.

- Check whether NLS mode is enabled. If enabled, .NET will skip loading the ICU library and instead rely on Windows NLS APIs for globalization support.

- Check whether the app-local ICU feature is enabled. If it is, .NET will attempt to load the ICU library from the application directory by appending the specified version to the library names. For instance, if the version is 72.1, .NET will first try to load `icuuc72.dll`, `icuin72.dll`, and `icudt72.dll`. If these libraries cannot be loaded, it will then attempt to load `icuuc72.1.dll`, `icuin72.1.dll`, and `icudt72.1.dll`. If none of the libraries are found, the process will terminate with an error message such as: `Failed to load app-local ICU: {library name}`.

- If none of the preceding conditions are satisfied, .NET attempts to load the ICU library from the system directory. It first tries to load `icu.dll`. If this library is unavailable, it then attempts to load `icuuc.dll` and `icuin.dll` from the system directory. If any of these libraries aren't found, the runtime falls back to using NLS APIs for globalization support.

> **Note:**
> NLS APIs are always available in all Windows versions, so .NET can always fall back on them for globalization support.

### Linux

- Check whether Globalization Invariant Mode is enabled. When this mode is active, .NET bypasses loading the ICU library. Instead, it relies on built-in invariant culture data, ensuring that behavior remains fully independent of the operating system and the ICU library.
- Check whether the app-local ICU feature is enabled. If it is, .NET will attempt to load the ICU library from the application directory by appending the specified version to the library names. For instance, if the version is 68.2.0.9, .NET will try to load `libicuuc.so.68.2.0.9` and `libicui18n.so.68.2.0.9`. If none of the libraries are found, the process will terminate with an error message such as: `Failed to load app-local ICU: {library name}`.
- Check if the `DOTNET_ICU_VERSION_OVERRIDE` environment variable is set. If it is, .NET will attempt to load the specified version of ICU as described in Load specific ICU version on Linux.
- If none of the preceding conditions are satisfied, .NET attempts to load the highest installed version of the ICU library from the system. It tries to load the libraries `libicuuc.so.[version]` and `libicui18n.so.[version]`, where `[version]` is the highest installed version of ICU on the system. If the libraries aren't found, the process terminates with an error message such as: `Failed to load system ICU: {library name}`.

### macOS

- Check whether Globalization Invariant Mode is enabled. When this mode is active, .NET bypasses loading the ICU library. Instead, it relies on built-in invariant culture data, ensuring that behavior remains fully independent of the operating system and the ICU library.
- Check whether the app-local ICU feature is enabled. If it is, .NET will attempt to load the ICU library from the application directory by appending the specified version to the library names. For instance, if the version is 68.2.0.9, .NET will try to load `libicuuc68.2.0.9.dylib` and `libicui18n68.2.0.9.dylib`. If none of the libraries are found, the process terminates with an error message such as: `Failed to load app-local ICU: {library name}`.
- If none of the preceding conditions are satisfied, .NET will attempt to load the installed version of the ICU library as described in macOS behavior.
