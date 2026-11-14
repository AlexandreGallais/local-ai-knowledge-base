---
title: "Breaking change: Razor runtime compilation is obsolete"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/10/razor-runtime-compilation-obsolete.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor runtime compilation is obsolete

Razor runtime compilation is obsolete and is not recommended for production scenarios. For production scenarios, use the default build-time compilation. For development scenarios, use Hot Reload instead.

## Version introduced

.NET 10 Preview 7

## Previous behavior

Previously, you could use Razor runtime compilation to recompile `.cshtml` files while the application was running. This meant you didn't need to restart the application for changes to take effect.

## New behavior

Starting in .NET 10, use of the affected APIs produces a compiler warning with diagnostic ID `ASPDEPR003`:

> warning ASPDEPR003: Razor runtime compilation is obsolete and is not recommended for production scenarios. For production scenarios, use the default build time compilation. For development scenarios, use Hot Reload instead. For more information, visit <https://aka.ms/aspnet/deprecate/003>.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

Razor runtime compilation has been replaced by Hot Reload, which has been the recommended approach for a few years now. This change makes it clearer that Razor runtime compilation doesn't get support for new features and should no longer be used.

## Recommended action

Remove calls to `Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation*` and use Hot Reload instead.

## Affected APIs

- `Microsoft.AspNetCore.Mvc.ApplicationParts.AssemblyPartExtensions`
- `Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation*`
- `Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcCoreBuilderExtensions.AddRazorRuntimeCompilation*`
- `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation.FileProviderRazorProjectItem`
- `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation.MvcRazorRuntimeCompilationOptions`

## See also

- .NET Hot Reload support for ASP.NET Core
