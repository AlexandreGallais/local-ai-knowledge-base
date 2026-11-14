---
title: "UIHintAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/UIHintAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UIHintAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class UIHintAttribute : Attribute
```

Specifies the template or user control that Dynamic Data uses to display a data field.

#### Remarks
MVC uses the `UIHintAttribute` class to associate a model with a data field. Dynamic Data uses the `UIHintAttribute` class to associate a user control with a data field. Dynamic Data uses the `UIHint` property to determine which user control to use in order to display a data field.

For more information about how to use attributes, see Attributes.

#### Examples
The following example shows how to use the `UIHintAttribute` attribute to specify the name of a custom field template that will handle the display and editing of a data field.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/DynamicData.CustomFieldTemplate/CS/Product.cs._

## UIHintAttribute.UIHintAttribute(String) constructor

```csharp
public UIHintAttribute (string uiHint);
```

Initializes a new instance of the `UIHintAttribute` class by using a specified user control.

Parameters:

- `uiHint`: The user control to use to display the data field.

#### Remarks
A `UIHintAttribute` object that is created with this constructor is initialized using the specified `uiHint`, which specifies the user control (field template) to use in order to display the data field.

ASP.NET Dynamic Data provides field templates, page templates, and data controls to render data fields in a data model. You can modify these templates and controls to customize them, or you can create a custom user control. If you create a custom user control, you use the `UIHint` property to specify the user control to use to display a data field.

## UIHintAttribute.UIHintAttribute(String, String) constructor

```csharp
public UIHintAttribute (string uiHint, string? presentationLayer);
```

Initializes a new instance of the `UIHintAttribute` class using the specified user control and specified presentation layer.

Parameters:

- `uiHint`: The user control (field template) to use to display the data field.
- `presentationLayer`: The presentation layer that uses the class. Can be set to "HTML", "Silverlight", "WPF", or "WinForms".

To be added.

## UIHintAttribute.UIHintAttribute(String, String, Object[]) constructor

```csharp
public UIHintAttribute (string uiHint, string? presentationLayer, params object?[]? controlParameters);
```

Initializes a new instance of the `UIHintAttribute` class by using the specified user control, presentation layer, and control parameters.

Parameters:

- `uiHint`: The user control (field template) to use to display the data field.
- `presentationLayer`: The presentation layer that uses the class. Can be set to "HTML", "Silverlight", "WPF", or "WinForms".
- `controlParameters`: The object to use to retrieve values from any data sources.

Exceptions:

- `ArgumentException`: `UIHintAttribute.ControlParameters` is `null` or it is a constraint key.

-or-

The value of `UIHintAttribute.ControlParameters` is not a string.

To be added.

## UIHintAttribute.ControlParameters property

```csharp
public System.Collections.Generic.IDictionary<string,object?> ControlParameters { get; }
```

Gets or sets the `DynamicControlParameter` object to use to retrieve values from any data source.

Returns: A collection of key/value pairs.

Exceptions:

- `InvalidOperationException`: The current attribute is ill-formed.

#### Remarks
The `ControlParameters` property lets you retrieve data from a data model, tracks updates to the data model, and notifies the model of any changes.

## UIHintAttribute.PresentationLayer property

```csharp
public string? PresentationLayer { get; }
```

Gets or sets the presentation layer that uses the `UIHintAttribute` class.

Returns: The presentation layer that is used by this class.

#### Remarks
This property represents the presentation layer that uses the `UIHintAttribute` class. This property can be set to "HTML", "Silverlight", "WPF", or "WinForms".

## UIHintAttribute.UIHint property

```csharp
public string UIHint { get; }
```

Gets or sets the name of the field template to use to display the data field.

Returns: The name of the field template that displays the data field.

#### Remarks
ASP.NET Dynamic Data provides field templates and page templates for rendering data fields in a data model. Field templates are user controls (.ascx files) that are mapped to data fields in the model. You can modify the default user controls that Dynamic Data provides, or you can create a custom user controls to use as field template. If you create a custom user control, you use the `UIHint` property on a property so that the property is rendered using the custom user control. The `UIHint` property specifies which field template to use when a specific column is rendered. The `UIHint` property can point to one of the templates provided in Dynamic Data or to a custom template. For example, you can create a custom field template named RedText_Edit.ascx, and then use the `UIHint` property to specify that the RedText_Edit.ascx control should be used to render a specified data field instead of the default Text_Edit.ascx template that is provided in Dynamic Data.

The following example shows how to specify that the UnitsInStock column in a database will be rendered by using the specified custom field template.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/DynamicData.CustomFieldTemplate/CS/Product.cs._

## UIHintAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Gets a value that indicates whether this instance is equal to the specified object.

Parameters:

- `obj`: The object to compare with this instance, or a `null` reference.

Returns: `true` if the specified object is equal to this instance; otherwise, `false`.

To be added.

## UIHintAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets the hash code for the current instance of the attribute.

Returns: The attribute instance hash code.

To be added.
