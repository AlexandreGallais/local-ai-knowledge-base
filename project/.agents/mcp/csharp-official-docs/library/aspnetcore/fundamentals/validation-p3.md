---
title: "Validation in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/validation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Validation in ASP.NET Core (part 3 of 3)

## Configure generated validation metadata

`Microsoft.Extensions.Validation` uses a Roslyn source generator to create validation metadata at build time. Minimal API parameter types are discovered from endpoint handler signatures. Blazor form model types are included by applying `Microsoft.Extensions.Validation.ValidatableTypeAttribute`.

### Include root model types

Apply `[ValidatableType]` to a Blazor form's root model type and to any other root type that the source generator can't discover from a Minimal API endpoint signature. Types reachable from the root are included automatically.

### Model types can't be declared in Razor component files

The Razor compiler and the validation feature both use source generators. A source generator can't inspect another generator's output, so the validation generator can't include model types declared in Razor component files (`.razor`). Declare model types in regular C# files (`.cs`) instead.

Applying `[ValidatableType]` to a type in generated code produces warning ASP0037.

### Register validation across assemblies

The source generator creates metadata only for the assembly where `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*` is called. Calling `AddValidation` only from the host app doesn't generate metadata for types declared in a referenced assembly, such as a class library or the `.Client` project of a Blazor Web App.

To validate types from separate assemblies:

* If the assembly is a plain class library (it isn't based on the `Microsoft.NET.Sdk.Web` or `Microsoft.NET.Sdk.Razor` SDKs), add a package reference to the project for the `Microsoft.Extensions.Validation` NuGet package.
* Create an extension method in each assembly that declares validatable types. The method calls `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*` so that the source generator runs in that assembly:

  ```csharp
  namespace ValidatableTypesAssembly.Extensions;

  public static class ServiceCollectionExtensions
  {
      public static IServiceCollection AddValidationForLibraryTypes(
          this IServiceCollection services)
      {
          return services.AddValidation();
      }
  }
  ```

* Call each of those extension methods from the host app, along with `AddValidation` for the host app's own types:

  ```csharp
  using ValidatableTypesAssembly.Extensions;

  ...

  builder.Services.AddValidationForLibraryTypes();
  builder.Services.AddValidation();
  ```

The preceding approach validates the types from both assemblies.

For a Blazor Web App whose form models are declared in the `.Client` project, create the validation-registration extension method in that project and call it from the server project's `Program` file.

For Minimal API endpoints and models defined in referenced assemblies, see Minimal APIs quick reference.

### Troubleshoot generated validation metadata

Missing generated validation metadata doesn't produce a runtime exception or log entry. If expected validation behavior is missing, confirm all of the following:

* `AddValidation` is called from the assembly that declares the validatable types.
* Blazor root form models and other roots not discovered from Minimal API signatures have `[ValidatableType]`.
* Model types are declared in `.cs` files.
* Validated types and properties are accessible to generated code.

Build analyzers report common unsupported configurations:

* ASP0033: ValidatableType is applied to an inaccessible type and ASP0034: Endpoint parameter type is inaccessible from generated code report inaccessible validatable types and endpoint parameter types.
* ASP0035: Validatable property or its type on a ValidatableType is not accessible and ASP0036: Validatable property or its type on an endpoint parameter type is not accessible report inaccessible validated properties or property types.
* ASP0037: ValidatableType cannot be used in generated code reports `[ValidatableType]` applied to generated code.
* ASP0038: ValidatableType should not be used without a call to AddValidation reports `[ValidatableType]` used without a matching `AddValidation` call.

Other missing-metadata cases might not produce a diagnostic.

For the runtime behavior when metadata isn't available, see Behavior without generated validation metadata.

## Related content

* ASP.NET Core Blazor forms validation
  * ASP.NET Core Blazor client-side form validation in static SSR
  * ASP.NET Core Blazor advanced form validation
* Upgrade from the experimental `ValidatableTypeAttribute`/`SkipValidationAttribute` in .NET 10
* Minimal APIs quick reference
  * Validation support in Minimal APIs
* Make an ASP.NET Core app's content localizable
* Model validation in ASP.NET Core MVC
