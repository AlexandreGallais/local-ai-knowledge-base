---
title: "Breaking change: Remoting APIs are obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/remoting-apis-obsolete.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Remoting APIs are obsolete

Some remoting-related APIs are marked as obsolete and generate a `SYSLIB0010` warning at compile time. These APIs may be removed in a future version of .NET.

## Change description

The following remoting APIs are marked obsolete.

| API | Marked obsolete in... |
| - | - |
| `System.MarshalByRefObject.GetLifetimeService` | 5.0 RC1 |
| `System.MarshalByRefObject.InitializeLifetimeService` | 5.0 RC1 |

In .NET Framework 2.x - 4.x, the `System.MarshalByRefObject.GetLifetimeService` and `System.MarshalByRefObject.InitializeLifetimeService` methods control the lifetime of instances involved with .NET remoting. In .NET Core 2.x- 3.x, these methods always throw a `System.PlatformNotSupportedException` at runtime.

In .NET 5 and later versions, the `System.MarshalByRefObject.GetLifetimeService` and `System.MarshalByRefObject.InitializeLifetimeService` methods are marked obsolete as warning, but continue to throw a `System.PlatformNotSupportedException` at runtime.

```csharp
// MemoryStream, like all Stream instances, subclasses MarshalByRefObject.
MemoryStream stream = new MemoryStream();
// Throws PlatformNotSupportedException; also produces warning SYSLIB0010.
obj.InitializeLifetimeService();
```

This is a compile-time only change. There is no runtime change from previous versions of .NET Core.

## Reason for change

.NET remoting is a legacy technology. It allows instantiating an object in another process (potentially even on a different machine) and interacting with that object as if it were an ordinary, in-process .NET object instance. The .NET remoting infrastructure only exists in .NET Framework 2.x - 4.x. .NET Core and .NET 5 and later versions don't have support for .NET remoting, and the remoting APIs either don't exist or always throw exceptions on these runtimes.

To help steer developers away from these APIs, we are obsoleting selected remoting-related APIs. These APIs may be removed entirely in a future version of .NET.

## Version introduced

.NET 5.0

## Recommended action

- Consider using WCF or HTTP-based REST services to communicate with objects in other applications or across machines. For more information, see .NET Framework technologies unavailable on .NET Core.

- If you must continue to use the obsolete APIs, you can suppress the `SYSLIB0010` warning in code.

  ```csharp
  MarshalByRefObject obj = GetMarshalByRefObj();
  #pragma warning disable SYSLIB0010 // Disable the warning.
  obj.InitializeLifetimeService(); // Still throws PNSE.
  obj.GetLifetimeService(); // Still throws PNSE.
  #pragma warning restore SYSLIB0010 // Reenable the warning.
  ```

  You can also suppress the warning in your project file, which disables the warning for all source files in the project.

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
     <TargetFramework>net5.0</TargetFramework>
     <!-- NoWarn below will suppress SYSLIB0010 project-wide -->
     <NoWarn>$(NoWarn);SYSLIB0010</NoWarn>
    </PropertyGroup>
  </Project>
  ```

  Suppressing `SYSLIB0010` disables only the remoting API obsoletion warnings. It does not disable any other warnings. Additionally, it doesn't change the hardcoded runtime behavior of always throwing `System.PlatformNotSupportedException`.

## Affected APIs

- `System.MarshalByRefObject.GetLifetimeService`
- `System.MarshalByRefObject.InitializeLifetimeService`
