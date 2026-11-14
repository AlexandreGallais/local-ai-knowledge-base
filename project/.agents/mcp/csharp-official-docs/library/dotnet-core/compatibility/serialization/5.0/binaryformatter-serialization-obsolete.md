---
title: "Breaking change: BinaryFormatter serialization methods are obsolete and prohibited in ASP.NET apps"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/serialization/5.0/binaryformatter-serialization-obsolete.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# BinaryFormatter serialization methods are obsolete and prohibited in ASP.NET apps

`Serialize` and `Deserialize` methods on `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter`, `System.Runtime.Serialization.Formatter`, and `System.Runtime.Serialization.IFormatter` are now obsolete as warning. Additionally, `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` serialization is prohibited by default for ASP.NET apps.

> **Note:**
> In .NET 7, the affected APIs are obsolete as *error*. For more information, see BinaryFormatter serialization APIs produce compiler errors.

## Change description

Due to security vulnerabilities in `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter`, the following methods are now obsolete and produce a compile-time warning with ID `SYSLIB0011`. Additionally, in ASP.NET Core 5.0 and later apps, they will throw a `System.NotSupportedException`, unless the web app has re-enabled `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` functionality.

- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*`

The following serialization methods are also obsolete and produce warning `SYSLIB0011`, but have no behavioral changes:

- `System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)`
- `System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)`

## Version introduced

5.0

## Reason for change

These methods are marked obsolete as part of an effort to wind down usage of `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` within the .NET ecosystem.

## Recommended action

- Stop using `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` in your code. Instead, consider using `System.Text.Json.JsonSerializer` or `System.Xml.Serialization.XmlSerializer`. For more information, see BinaryFormatter security guide.

- You can temporarily suppress the `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` compile-time warning, which is `SYSLIB0011`. We recommend that you thoroughly assess your code for risks before choosing this option. The easiest way to suppress the warnings is to surround the individual call site with `#pragma` directives.

  ```csharp
  // Now read the purchase order back from disk
  using (var readStream = new FileStream("myfile.bin", FileMode.Open))
  {
      var formatter = new BinaryFormatter();
  #pragma warning disable SYSLIB0011
      return (PurchaseOrder)formatter.Deserialize(readStream);
  #pragma warning restore SYSLIB0011
  }
  ```

  You can also suppress the warning in the project file.

  ```xml
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
    <!-- Disable "BinaryFormatter is obsolete" warnings for entire project -->
    <NoWarn>$(NoWarn);SYSLIB0011</NoWarn>
  </PropertyGroup>
  ```

  If you suppress the warning in the project file, the warning is suppressed for all code files in the project. Suppressing `SYSLIB0011` does not suppress warnings caused by using other obsolete APIs.

- To continue using `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` in ASP.NET apps, you can re-enable it in the project file. However, it's strongly recommended not to do this. For more information, see BinaryFormatter security guide.

  ```xml
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <!-- Warning: Setting the following switch is *NOT* recommended in web apps. -->
    <EnableUnsafeBinaryFormatterSerialization>true</EnableUnsafeBinaryFormatterSerialization>
  </PropertyGroup>
  ```

For more information about recommended actions, see Resolving BinaryFormatter obsoletion and disablement errors.

## Affected APIs

- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*`
- `System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)`
- `System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)`

## See also

- SerializationFormat.Binary is obsolete (.NET 7)
- BinaryFormatter serialization APIs produce compiler errors (.NET 7)
- BinaryFormatter disabled across most project types (.NET 8)
