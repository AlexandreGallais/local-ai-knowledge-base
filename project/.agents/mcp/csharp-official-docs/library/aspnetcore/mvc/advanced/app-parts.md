---
title: "Share controllers, views, Razor Pages and more with Application Parts in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/advanced/app-parts.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Share controllers, views, Razor Pages and more with Application Parts

By Rick Anderson

View or download sample code (how to download)

An *Application Part* is an abstraction over the resources of an app. Application Parts allow ASP.NET Core to discover controllers, view components, tag helpers, Razor Pages, razor compilation sources, and more. `Microsoft.AspNetCore.Mvc.ApplicationParts.AssemblyPart` is an Application part. `AssemblyPart` encapsulates an assembly reference and exposes types and compilation references.

Feature providers work with application parts to populate the features of an ASP.NET Core app. The main use case for application parts is to configure an app to discover (or avoid loading) ASP.NET Core features from an assembly. For example, you might want to share common functionality between multiple apps. Using Application Parts, you can share an assembly (DLL) containing controllers, views, Razor Pages, razor compilation sources, Tag Helpers, and more with multiple apps. Sharing an assembly is preferred to duplicating code in multiple projects.

ASP.NET Core apps load features from `Microsoft.AspNetCore.Mvc.ApplicationParts.ApplicationPart`. The `Microsoft.AspNetCore.Mvc.ApplicationParts.AssemblyPart` class represents an application part that's backed by an assembly.

## Load ASP.NET Core features

Use the `Microsoft.AspNetCore.Mvc.ApplicationParts` and `Microsoft.AspNetCore.Mvc.ApplicationParts.AssemblyPart` classes to discover and load ASP.NET Core features (controllers, view components, etc.). The `Microsoft.AspNetCore.Mvc.ApplicationParts.ApplicationPartManager` tracks the application parts and feature providers available. `ApplicationPartManager` is configured in `Startup.ConfigureServices`:

```csharp
// Requires using System.Reflection;
public void ConfigureServices(IServiceCollection services)
{
    var assembly = typeof(MySharedController).Assembly;
    services.AddControllersWithViews()
        .AddApplicationPart(assembly)
        .AddRazorRuntimeCompilation();

    services.Configure<MvcRazorRuntimeCompilationOptions>(options => 
    { options.FileProviders.Add(new EmbeddedFileProvider(assembly)); });
}
```

The following code provides an alternative approach to configuring `ApplicationPartManager` using `AssemblyPart`:

```csharp
// Requires using System.Reflection;
// Requires using Microsoft.AspNetCore.Mvc.ApplicationParts;
public void ConfigureServices(IServiceCollection services)
{
    var assembly = typeof(MySharedController).Assembly;
    // This creates an AssemblyPart, but does not create any related parts for items such as views.
    var part = new AssemblyPart(assembly);
    services.AddControllersWithViews()
        .ConfigureApplicationPartManager(apm => apm.ApplicationParts.Add(part));
}
```

The preceding two code samples load the `SharedController` from an assembly. The `SharedController` is not in the app's project. See the WebAppParts solution sample download.

### Include views

Use a Razor class library to include views in the assembly.

### Prevent loading resources

Application parts can be used to *avoid* loading resources in a particular assembly or location. Add or remove members of the  `Microsoft.AspNetCore.Mvc.ApplicationParts` collection to hide or make available resources. The order of the entries in the `ApplicationParts` collection isn't important. Configure the `ApplicationPartManager` before using it to configure services in the container. For example, configure the `ApplicationPartManager` before invoking `AddControllersAsServices`. Call `Remove` on the `ApplicationParts` collection to remove a resource.

The `ApplicationPartManager` includes parts for:

* The app's assembly and dependent assemblies.
* `Microsoft.AspNetCore.Mvc.ApplicationParts.CompiledRazorAssemblyPart`
* `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation`
* `Microsoft.AspNetCore.Mvc.TagHelpers`.
* `Microsoft.AspNetCore.Mvc.Razor`.

## Feature providers

Application feature providers examine application parts and provide features for those parts. There are built-in feature providers for the following ASP.NET Core features:

* `Microsoft.AspNetCore.Mvc.Controllers.ControllerFeatureProvider`
* `Microsoft.AspNetCore.Mvc.Razor.TagHelpers.TagHelperFeatureProvider`
* `Microsoft.AspNetCore.Mvc.Razor.Compilation.MetadataReferenceFeatureProvider`
* `Microsoft.AspNetCore.Mvc.Razor.Compilation.ViewsFeatureProvider`
* `internal class` RazorCompiledItemFeatureProvider

Feature providers inherit from `Microsoft.AspNetCore.Mvc.ApplicationParts.IApplicationFeatureProvider`1`, where `T` is the type of the feature. Feature providers can be implemented for any of the previously listed feature types. The order of feature providers in the `ApplicationPartManager.FeatureProviders` can impact run time behavior. Later added providers can react to actions taken by earlier added providers.

### Display available features

The features available to an app can be enumerated by requesting an `ApplicationPartManager` through dependency injection:

```csharp
﻿using AppPartsSample.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Razor.Compilation;
using Microsoft.AspNetCore.Mvc.Razor.TagHelpers;
using Microsoft.AspNetCore.Mvc.ViewComponents;

namespace AppPartsSample.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly ApplicationPartManager _partManager;

        public FeaturesController(ApplicationPartManager partManager)
        {
            _partManager = partManager;
        }

        public IActionResult Index()
        {
            var viewModel = new FeaturesViewModel();

            var controllerFeature = new ControllerFeature();
            _partManager.PopulateFeature(controllerFeature);
            viewModel.Controllers = controllerFeature.Controllers.ToList();

            var tagHelperFeature = new TagHelperFeature();
            _partManager.PopulateFeature(tagHelperFeature);
            viewModel.TagHelpers = tagHelperFeature.TagHelpers.ToList();

            var viewComponentFeature = new ViewComponentFeature();
            _partManager.PopulateFeature(viewComponentFeature);
            viewModel.ViewComponents = viewComponentFeature.ViewComponents.ToList();

            return View(viewModel);
        }
    }
}
```

The download sample uses the preceding code to display the app features:

```text
Controllers:
    - FeaturesController
    - HomeController
    - HelloController
    - GenericController`1
    - GenericController`1
Tag Helpers:
    - PrerenderTagHelper
    - AnchorTagHelper
    - CacheTagHelper
    - DistributedCacheTagHelper
    - EnvironmentTagHelper
    - Additional Tag Helpers omitted for brevity.
View Components:
    - SampleViewComponent
```

## Discovery in application parts

HTTP 404 errors are not uncommon when developing with application parts. These errors are typically caused by missing an essential requirement for how applications parts are discovered. If your app returns an HTTP 404 error, verify the following requirements have been met:

* The `applicationName` setting needs to be set to the root assembly used for discovery. The root assembly used for discovery is normally the entry point assembly.
* The root assembly needs to have a reference to the parts used for discovery. The reference can be direct or transitive.
* The root assembly needs to reference the Web SDK. The framework has logic that stamps attributes into the root assembly that are used for discovery.
