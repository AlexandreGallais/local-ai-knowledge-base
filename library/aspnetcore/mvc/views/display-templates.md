---
title: "Using DisplayTemplates and EditorTemplates"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/display-templates.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Display and Editor templates in ASP.NET Core

By Alexander Wicht

Display and Editor templates specify the user interface layout of custom types. Consider the following `Address` model:

```csharp
public class Address
{
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string MiddleName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Street { get; set; } = null!;
    public string City { get; set; } = null!;
    public string State { get; set; } = null!;
    public string Zipcode { get; set; } = null!;
}
```

A project that scaffolds the `Address` model displays the `Address` in the following form:

A web site could use a Display Template to show the `Address` in standard format:

Display and Editor templates can also reduce code duplication and maintenance costs. Consider a web site that displays the `Address` model on 20 different pages. If the `Address` model changes, the 20 pages will all need to be updated. If a Display Template is used for the `Address` model, only the Display Template needs to be updated. For example, the `Address` model might be updated to include the country or region.

Tag Helpers provide an alternative way that enables server-side code to participate in creating and rendering HTML elements in Razor files. For more information, see Tag Helpers compared to HTML Helpers.

## Display templates

`DisplayTemplates` customize the display of model fields or create a layer of abstraction between the model values and their display.

A `DisplayTemplate` is a Razor file placed in the`DisplayTemplates`folder:

* For Razor Pages apps, in the `Pages/Shared/DisplayTemplates` folder.
* For MVC apps, in the `Views/Shared/DisplayTemplates` folder or the `Views/ControllerName/DisplayTemplates` folder. Display templates in the `Views/Shared/DisplayTemplates` are used by all controllers in the app. Display templates in the `Views/ControllerName/DisplayTemplates` folder are resolved only by the `ControllerName` controller.

By convention, the `DisplayTemplate` file is named after the type to be displayed. The `Address.cshtml` template used in this sample:

```cshtml
﻿@model Address

<dl>
    <dd>@Model.FirstName @Model.MiddleName @Model.LastName</dd>
    <dd>@Model.Street</dd>
    <dd>@Model.City @Model.State @Model.Zipcode</dd>
</dl>
```

The view engine automatically looks for a file in the `DisplayTemplates` folder that matches the name of the type. If it doesn't find a matching template, it falls back to the built in templates.

The following code shows the Details view of the scaffolded project:

```cshtml
﻿@page
@model WebAddress.Pages.Adr.DetailsModel

@{
    ViewData["Title"] = "Details";
}

<h1>Details</h1>

<div>
    <h4>Address</h4>
    <hr />
    <dl class="row">
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Address.FirstName)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Address.FirstName)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Address.MiddleName)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Address.MiddleName)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Address.LastName)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Address.LastName)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Address.Street)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Address.Street)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Address.City)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Address.City)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Address.State)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Address.State)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Address.Zipcode)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Address.Zipcode)
        </dd>
    </dl>
</div>
<div>
    <a asp-page="./Edit" asp-route-id="@Model.Address?.Id">Edit</a> |
    <a asp-page="./Index">Back to List</a>
</div>
```

The following code shows the Details view using the Address Display Template:

```cshtml
@page
@model WebAddress.Pages.Adr2.DetailsModel

@{
    ViewData["Title"] = "Details";
}

<h1>Details</h1>

<div>
    <h4>Address DM</h4>
    <hr />
    <dl class="row">
        <dd class="col-sm-10">
           @Html.DisplayFor(model => model.Address)
        </dd>
    </dl>
</div>
<div>
    <a asp-page="./Edit" asp-route-id="@Model.Address?.Id">Edit</a> |
    <a asp-page="./Index">Back to List</a>
</div>
```

To reference a template whose name doesn't match the type name, use the `templateName` parameter in the `Microsoft.AspNetCore.Mvc.Rendering.HtmlHelperDisplayExtensions.DisplayFor*` method. For example, the following markup displays the `Address` model with the `AddressShort` template:

```cshtml
@page
@model WebAddress.Pages.Adr2.DetailsCCModel

@{
    ViewData["Title"] = "Details Short";
}

<h1>Details Short</h1>

<div>
    <h4>Address Short</h4>
    <hr />
    <dl class="row">
        <dd class="col-sm-10">
           @Html.DisplayFor(model => model.Address,"AddressShort")
        </dd>
    </dl>
</div>
```

Use one of the available DisplayFor overloads that expose the `additionalViewData` parameter to pass additional view data that is merged into the View Data Dictionary instance created for the template.

## Editor templates

Editor templates are used in form controls when the model is edited or updated.

An `EditorTemplate` is a Razor file placed in the`EditorTemplates` folder:

* For Razor Pages apps, in the `Pages/Shared/EditorTemplates` folder.
* For MVC apps, in the `Views/Shared/EditorTemplates` folder or the `Views/ControllerName/EditorTemplates` folder.

The following markup shows the `Pages/Shared/EditorTemplates/Address.cshtml` used in the sample:

```cshtml
@model Address

<dl>
    <dd>    Name:
        <input asp-for="FirstName" /> <input asp-for="MiddleName" /> <input asp-for="LastName" /> 
    </dd>
        <dd>    Street:
        <input asp-for="Street" /> 
    </dd>

        <dd>    city/state/zip:
        <input asp-for="City" /> <input asp-for="State" /> <input asp-for="Zipcode" /> 
    </dd>

</dl>
```

The following markup shows the *Edit.cshtml* page which uses the `Pages/Shared/EditorTemplates/Address.cshtml` template:

```cshtml
﻿@page
@model WebAddress.Pages.Adr.EditModel

@{
    ViewData["Title"] = "Edit";
}

<h1>Edit</h1>

<h4>Address</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <input type="hidden" asp-for="Address.Id" />
             @Html.EditorFor(model => model.Address)
            <div class="form-group">
                <input type="submit" value="Save" class="btn btn-primary" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="./Index">Back to List</a>
</div>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}
```

## Related content

* View or download sample code (how to download)
* Tag Helpers
* Tag Helpers compared to HTML Helpers
