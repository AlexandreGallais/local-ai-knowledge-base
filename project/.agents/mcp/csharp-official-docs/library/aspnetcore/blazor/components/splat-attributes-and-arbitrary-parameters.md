---
title: "ASP.NET Core Blazor attribute splatting and arbitrary parameters"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor attribute splatting and arbitrary parameters

Components can capture and render additional attributes in addition to the component's declared parameters and fields. Additional attributes can be captured in a dictionary and then applied to an element, called *splatting*, when the component is rendered using the `@attributes` Razor directive attribute. This scenario is useful for defining a component that produces a markup element that supports a variety of customizations. For example, it can be tedious to define attributes separately for an `` that supports many parameters or fields.

## Attribute splatting

In the following `Splat` component:

* The first `` element (`id="useIndividualParams"`) uses individual component fields.
* The second `` element (`id="useAttributesDict"`) uses attribute splatting.

`Splat.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Splat.razor._
Except for `id`, the rendered `` elements in the webpage have identical attributes:

```html
<input id="useIndividualParams"
       maxlength="10"
       placeholder="Input placeholder text"
       required="required"
       size="50">

<input id="useAttributesDict"
       maxlength="10"
       placeholder="Input placeholder text"
       required="required"
       size="50">
```

Although the preceding example uses fields for the first `` element (`id="useIndividualParams"`), the same behavior applies when component parameters are used.

## Arbitrary attributes

To accept arbitrary attributes, define a component parameter with the `Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues` property set to `true`:

```razor
@code {
    [Parameter(CaptureUnmatchedValues = true)]
    public Dictionary<string, object>? InputAttributes { get; set; }
}
```

The `Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues` property on `[Parameter]` allows the parameter to match all attributes that don't match any other parameter. A component can only define a single parameter with `Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues`. The property type used with `Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues` must be assignable from `Dictionary<string, object>` with string keys. Use of `IEnumerable<KeyValuePair<string, object>>` or `IReadOnlyDictionary<string, object>` are also options in this scenario.

The position of `@attributes` relative to the position of element attributes is important. When `@attributes` are splatted on the rendered element, the attributes are processed from right to left (last to first) with the first attribute winning for any common attributes. Consider the following example of a parent component that consumes a child component, where the child sets an "`extra`" attribute and the parent component splats an "`extra`" attribute on the child component.

`AttributeOrderChild1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/AttributeOrderChild1.razor._
`AttributeOrder1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/AttributeOrder1.razor._
The `AttributeOrderChild1` component's `extra` attribute is set to the right of `@attributes`. The `AttributeOrderParent1` component's rendered `` contains `extra="5"` when passed through the additional attribute because the attributes are processed right to left (last to first) with the first "`extra`" attribute winning, which is the hard-coded `extra` HTML attribute of the `AttributeOrderParent1` component:

```html
<div extra="5" />
```

In the following example, the order of `extra` and `@attributes` is reversed in the child component's ``. In this scenario, the `AttributeOrderParent2` component's rendered `` contains `extra="10"` when passed through the additional attribute because the first "`extra`" attribute processed is the splatted `extra` HTML attribute from the parent component.

`AttributeOrderChild2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/AttributeOrderChild2.razor._
`AttributeOrder2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/AttributeOrder2.razor._
The `` in the parent component's rendered webpage contains `extra="10"`:

```html
<div extra="10" />
```
