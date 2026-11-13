---
title: "Work with the application model in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/controllers/application-model.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Work with the application model in ASP.NET Core

By Steve Smith

ASP.NET Core MVC defines an *application model* representing the components of an MVC app. Read and manipulate this model to modify how MVC elements behave. By default, MVC follows certain conventions to determine which classes are considered controllers, which methods on those classes are actions, and how parameters and routing behave. Customize this behavior to suit an app's needs by creating custom conventions and applying them globally or as attributes.

## Models and Providers (`IApplicationModelProvider`)

The ASP.NET Core MVC application model includes both abstract interfaces and concrete implementation classes that describe an MVC application. This model is the result of MVC discovering the app's controllers, actions, action parameters, routes, and filters according to default conventions. By working with the application model, modify an app to follow different conventions from the default MVC behavior. The parameters, names, routes, and filters are all used as configuration data for actions and controllers.

The ASP.NET Core MVC Application Model has the following structure:

* ApplicationModel
  * Controllers (ControllerModel)
    * Actions (ActionModel)
      * Parameters (ParameterModel)

Each level of the model has access to a common `Properties` collection, and lower levels can access and overwrite property values set by higher levels in the hierarchy. The properties are persisted to the `Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties` when the actions are created. Then when a request is being handled, any properties a convention added or modified can be accessed through `Microsoft.AspNetCore.Mvc.ActionContext.ActionDescriptor`. Using properties is a great way to configure filters, model binders, and other app model aspects on a per-action basis.

> **Note:**
> The `Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties` collection isn't thread safe (for writes) after app startup. Conventions are the best way to safely add data to this collection.

ASP.NET Core MVC loads the application model using a provider pattern, defined by the `Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider` interface. This section covers some of the internal implementation details of how this provider functions. Use of the provider pattern is an advanced subject, primarily for framework use. Most apps should use conventions, not the provider pattern.

Implementations of the `Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider` interface "wrap" one another, where each implementation calls `Microsoft.AspNetCore.Mvc.Abstractions.IActionInvokerProvider.OnProvidersExecuting*` in ascending order based on its `Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider.Order` property. The `Microsoft.AspNetCore.Mvc.Abstractions.IActionInvokerProvider.OnProvidersExecuted*` method is then called in reverse order. The framework defines several providers:

First (`Order=-1000`):

* `DefaultApplicationModelProvider`

Then (`Order=-990`):

* `AuthorizationApplicationModelProvider`
* `CorsApplicationModelProvider`

> **Note:**
> The order in which two providers with the same value for `Order` are called is undefined and shouldn't be relied upon.

> **Note:**
> `Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelProvider` is an advanced concept for framework authors to extend. In general, apps should use conventions, and frameworks should use providers. The key distinction is that providers always run before conventions.

The `DefaultApplicationModelProvider` establishes many of the default behaviors used by ASP.NET Core MVC. Its responsibilities include:

* Adding global filters to the context
* Adding controllers to the context
* Adding public controller methods as actions
* Adding action method parameters to the context
* Applying route and other attributes

Some built-in behaviors are implemented by the `DefaultApplicationModelProvider`. This provider is responsible for constructing the `Microsoft.AspNetCore.Mvc.ApplicationModels.ControllerModel`, which in turn references `Microsoft.AspNetCore.Mvc.ApplicationModels.ActionModel`, `Microsoft.AspNetCore.Mvc.ApplicationModels.PropertyModel`, and `Microsoft.AspNetCore.Mvc.ApplicationModels.ParameterModel` instances. The `DefaultApplicationModelProvider` class is an internal framework implementation detail that may change in the future.

The `AuthorizationApplicationModelProvider` is responsible for applying the behavior associated with the `Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter` and `Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter` attributes. For more information, see Simple authorization in ASP.NET Core.

The `CorsApplicationModelProvider` implements behavior associated with `Microsoft.AspNetCore.Cors.Infrastructure.IEnableCorsAttribute` and `Microsoft.AspNetCore.Cors.Infrastructure.IDisableCorsAttribute`. For more information, see Enable Cross-Origin Requests (CORS) in ASP.NET Core.

Information on the framework's internal providers described in this section aren't available via the .NET API browser. However, the providers may be inspected in the ASP.NET Core reference source (dotnet/aspnetcore GitHub repository). Use GitHub search to find the providers by name and select the version of the source with the **Switch branches/tags** dropdown list.

## Conventions

The application model defines convention abstractions that provide a simpler way to customize the behavior of the models than overriding the entire model or provider. These abstractions are the recommended way to modify an app's behavior. Conventions provide a way to write code that dynamically applies customizations. While filters provide a means of modifying the framework's behavior, customizations permit control over how the whole app works together.

The following conventions are available:

* `Microsoft.AspNetCore.Mvc.ApplicationModels.IApplicationModelConvention`
* `Microsoft.AspNetCore.Mvc.ApplicationModels.IControllerModelConvention`
* `Microsoft.AspNetCore.Mvc.ApplicationModels.IActionModelConvention`
* `Microsoft.AspNetCore.Mvc.ApplicationModels.IParameterModelConvention`

Conventions are applied by adding them to MVC options or by implementing attributes and applying them to controllers, actions, or action parameters (similar to filters).Unlike filters, conventions are only executed when the app is starting, not as part of each request.

> **Note:**
> For information on Razor Pages route and application model provider conventions, see Razor Pages route and app conventions in ASP.NET Core.

## Modify the `ApplicationModel`

The following convention is used to add a property to the application model:

```csharp
﻿using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class ApplicationDescription : IApplicationModelConvention
    {
        private readonly string _description;

        public ApplicationDescription(string description)
        {
            _description = description;
        }

        public void Apply(ApplicationModel application)
        {
            application.Properties["description"] = _description;
        }
    }
}
```

Application model conventions are applied as options when MVC is added in `Startup.ConfigureServices`:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options =>
    {
        options.Conventions.Add(new ApplicationDescription("My Application Description"));
        options.Conventions.Add(new NamespaceRoutingConvention());
    });
}
```

Properties are accessible from the `Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor.Properties` collection within controller actions:

```csharp
public class AppModelController : Controller
{
    public string Description()
    {
        return "Description: " + ControllerContext.ActionDescriptor.Properties["description"];
    }
}
```

## Modify the `ControllerModel` description

The controller model can also include custom properties. Custom properties override existing properties with the same name specified in the application model. The following convention attribute adds a description at the controller level:

```csharp
﻿using System;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class ControllerDescriptionAttribute : Attribute, IControllerModelConvention
    {
        private readonly string _description;

        public ControllerDescriptionAttribute(string description)
        {
            _description = description;
        }

        public void Apply(ControllerModel controllerModel)
        {
            controllerModel.Properties["description"] = _description;
        }
    }
}
```

This convention is applied as an attribute on a controller:

```csharp
[ControllerDescription("Controller Description")]
public class DescriptionAttributesController : Controller
{
    public string Index()
    {
        return "Description: " + ControllerContext.ActionDescriptor.Properties["description"];
    }
```

## Modify the `ActionModel` description

A separate attribute convention can be applied to individual actions, overriding behavior already applied at the application or controller level:

```csharp
﻿using System;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class ActionDescriptionAttribute : Attribute, IActionModelConvention
    {
        private readonly string _description;

        public ActionDescriptionAttribute(string description)
        {
            _description = description;
        }

        public void Apply(ActionModel actionModel)
        {
            actionModel.Properties["description"] = _description;
        }
    }
}
```

Applying this to an action within the controller demonstrates how it overrides the controller-level convention:

```csharp
[ControllerDescription("Controller Description")]
public class DescriptionAttributesController : Controller
{
    public string Index()
    {
        return "Description: " + ControllerContext.ActionDescriptor.Properties["description"];
    }
```

## Modify the `ParameterModel`

The following convention can be applied to action parameters to modify their `Microsoft.AspNetCore.Mvc.ModelBinding.BindingInfo`. The following convention requires that the parameter be a route parameter. Other potential binding sources, such as query string values, are ignored:

```csharp
﻿using System;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AppModelSample.Conventions
{
    public class MustBeInRouteParameterModelConvention : Attribute, IParameterModelConvention
    {
        public void Apply(ParameterModel model)
        {
            if (model.BindingInfo == null)
            {
                model.BindingInfo = new BindingInfo();
            }
            model.BindingInfo.BindingSource = BindingSource.Path;
        }
    }
}
```

The attribute may be applied to any action parameter:

```csharp
public class ParameterModelController : Controller
{
    // Will bind:  /ParameterModel/GetById/123
    // WON'T bind: /ParameterModel/GetById?id=123
    public string GetById([MustBeInRouteParameterModelConvention]int id)
    {
        return $"Bound to id: {id}";
    }
}
```

To apply the convention to all action parameters, add the `MustBeInRouteParameterModelConvention` to `Microsoft.AspNetCore.Mvc.MvcOptions` in `Startup.ConfigureServices`:

```csharp
options.Conventions.Add(new MustBeInRouteParameterModelConvention());
```

## Modify the `ActionModel` name

The following convention modifies the `Microsoft.AspNetCore.Mvc.ApplicationModels.ActionModel` to update the *name* of the action to which it's applied. The new name is provided as a parameter to the attribute. This new name is used by routing, so it affects the route used to reach this action method:

```csharp
﻿using System;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class CustomActionNameAttribute : Attribute, IActionModelConvention
    {
        private readonly string _actionName;

        public CustomActionNameAttribute(string actionName)
        {
            _actionName = actionName;
        }

        public void Apply(ActionModel actionModel)
        {
            // this name will be used by routing
            actionModel.ActionName = _actionName;
        }
    }
}
```

This attribute is applied to an action method in the `HomeController`:

```csharp
// Route: /Home/MyCoolAction
[CustomActionName("MyCoolAction")]
public string SomeName()
{
    return ControllerContext.ActionDescriptor.ActionName;
}
```

Even though the method name is `SomeName`, the attribute overrides the MVC convention of using the method name and replaces the action name with `MyCoolAction`. Thus, the route used to reach this action is `/Home/MyCoolAction`.

> **Note:**
> This example in this section is essentially the same as using the built-in `Microsoft.AspNetCore.Mvc.ActionNameAttribute`.
