---
title: "What's new in .NET 9 runtime (part 1 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-9/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in the .NET 9 runtime

This article describes new features and performance improvements in the .NET runtime for .NET 9.

## Attribute model for feature switches with trimming support

Two new attributes make it possible to define feature switches that the .NET libraries (and you) can use to toggle areas of functionality. If a feature isn't supported, the unsupported (and thus unused) features are removed when trimming or compiling with Native AOT, which keeps the app size smaller.

- `System.Diagnostics.CodeAnalysis.FeatureSwitchDefinitionAttribute` is used to treat a feature-switch property as a constant when trimming, and dead code that's guarded by the switch can be removed:

  ```csharp
  if (Feature.IsSupported)
      Feature.Implementation();

  public class Feature
  {
      [FeatureSwitchDefinition("Feature.IsSupported")]
      internal static bool IsSupported => AppContext.TryGetSwitch("Feature.IsSupported", out bool isEnabled) ? isEnabled : true;

      internal static void Implementation() => ...;
  }
  ```

  When the app is trimmed with the following feature settings in the project file, `Feature.IsSupported` is treated as `false`, and `Feature.Implementation` code is removed.

  ```xml
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="Feature.IsSupported" Value="false" Trim="true" />
  </ItemGroup>
  ```

- `System.Diagnostics.CodeAnalysis.FeatureGuardAttribute` is used to treat a feature-switch property as a guard for code annotated with `System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute`, `System.Diagnostics.CodeAnalysis.RequiresAssemblyFilesAttribute`, or `System.Diagnostics.CodeAnalysis.RequiresDynamicCodeAttribute`. For example:

  ```csharp
  if (Feature.IsSupported)
      Feature.Implementation();

  public class Feature
  {
      [FeatureGuard(typeof(RequiresDynamicCodeAttribute))]
      internal static bool IsSupported => RuntimeFeature.IsDynamicCodeSupported;

      [RequiresDynamicCode("Feature requires dynamic code support.")]
      internal static void Implementation() => ...; // Uses dynamic code
  }
  ```

  When built with `<PublishAot>true</PublishAot>`, the call to `Feature.Implementation()` doesn't produce analyzer warning IL3050, and `Feature.Implementation` code is removed when publishing.

## UnsafeAccessorAttribute supports generic parameters

The `System.Runtime.CompilerServices.UnsafeAccessorAttribute` feature allows unsafe access to type members that are inaccessible to the caller. This feature was designed in .NET 8 but implemented without support for generic parameters. .NET 9 adds support for generic parameters for CoreCLR and native AOT scenarios. The following code shows example usage.

```csharp
﻿using System.Runtime.CompilerServices;

public class Class<T>
{
    private T? _field;
    private void M<U>(T t, U u) { }
}

class Accessors<V>
{
    [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "_field")]
    public extern static ref V GetSetPrivateField(Class<V> c);

    [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "M")]
    public extern static void CallM<W>(Class<V> c, V v, W w);
}

internal class UnsafeAccessorExample
{
    public void AccessGenericType(Class<int> c)
    {
        ref int f = ref Accessors<int>.GetSetPrivateField(c);

        Accessors<int>.CallM<string>(c, 1, string.Empty);
    }
}
```
## Garbage collection

Dynamic adaptation to application sizes (DATAS) is now enabled by default. It aims to adapt to application memory requirements, meaning the application heap size should be roughly proportional to the long-lived data size. DATAS was introduced as an opt-in feature in .NET 8 and has been significantly updated and improved in .NET 9.

For more information, see Dynamic adaptation to application sizes (DATAS).

## Control-flow enforcement technology

Control-flow enforcement technology (CET) is enabled by default for apps on Windows. It significantly improves security by adding hardware-enforced stack protection against return-oriented programming (ROP) exploits. It's the latest .NET Runtime Security Mitigation.

CET imposes some limitations on CET-enabled processes and can result in a small performance regression. There are various controls to opt-out of CET.

## .NET install search behavior

.NET apps can now be configured for how they should search for the .NET runtime. This capability can be used with private runtime installations or to more strongly control the execution environment.
