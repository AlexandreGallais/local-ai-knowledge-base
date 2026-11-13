---
title: "Breaking change: Default ActivityIdFormat is W3C"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/default-activityidformat-changed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default ActivityIdFormat is W3C

The default identifier format for activity (`System.Diagnostics.Activity.DefaultIdFormat`) is now `System.Diagnostics.ActivityIdFormat.W3C`.

## Change description

The W3C activity ID format was introduced in .NET Core 3.0 as an alternative to the hierarchical ID format. However, to preserve compatibility, the W3C format wasn't made the default until .NET 5. The default was changed in .NET 5 because the W3C format has been ratified and gained traction across multiple language implementations.

If your app targets a platform other than .NET 5 or later, it will experience the old behavior, where `System.Diagnostics.ActivityIdFormat.Hierarchical` is the default format. This default applies to platforms net45+, netstandard1.1+, and netcoreapp (1.x, 2.x, and 3.x). In .NET 5 and later, `System.Diagnostics.Activity.DefaultIdFormat` is set to `System.Diagnostics.ActivityIdFormat.W3C`.

## Version introduced

5.0

## Recommended action

If your application is agnostic to the identifier that's used for distributed tracing, no action is needed. Libraries such as ASP.NET Core and `System.Net.Http.HttpClient` can consume or propagate both versions of the `System.Diagnostics.ActivityIdFormat`.

If you require interoperability with existing systems, or current systems rely on the format of the identifier, you can preserve the old behavior by setting `System.Diagnostics.Activity.DefaultIdFormat` to `System.Diagnostics.ActivityIdFormat.Hierarchical`. Alternatively, you can set an AppContext switch in one of three ways:

- In the project file.

  ```xml
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="System.Diagnostics.DefaultActivityIdFormatIsHierarchial" Value="true" />
  </ItemGroup>
  ```

- In the *runtimeconfig.json* file.

  ```json
  {
      "runtimeOptions": {
          "configProperties": {
              "System.Diagnostics.DefaultActivityIdFormatIsHierarchial": true
          }
      }
  }
  ```

- Through an environment variable.

  Set `DOTNET_SYSTEM_DIAGNOSTICS_DEFAULTACTIVITYIDFORMATISHIERARCHIAL` to `true` or 1.

## Affected APIs

- `System.Diagnostics.Activity.DefaultIdFormat`
