---
title: "CategoryAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CategoryAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CategoryAttribute class

Namespace: `System.ComponentModel`

```csharp
public class CategoryAttribute : Attribute
```

Specifies the name of the category in which to group the property or event when displayed in a `PropertyGrid` control set to Categorized mode.

#### Remarks
A `CategoryAttribute` indicates the category to associate the associated property or event with, when listing properties or events in a `PropertyGrid` control set to `Categorized` mode. If a `CategoryAttribute` has not been applied to a property or event, the `PropertyGrid` associates it with the **Misc** category. A new category can be created for any name by specifying the name of the category in the constructor for the `CategoryAttribute`.

The `Category` property indicates the name of the category that the attribute represents. The `Category` property also provides transparent localization of category names.

#### Examples
The following example creates the `MyImage` property. The property has two attributes: a `DescriptionAttribute` and a `CategoryAttribute`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CategoryAttribute/Overview/source.cs._

The next example gets the category for `MyImage`. First, the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next, the code indexes into the `PropertyDescriptorCollection` to get `MyImage`. Then it returns the attributes for this property and saves them in the variable `attributes`.

The example then prints the category by retrieving `CategoryAttribute` from the `AttributeCollection`, and writing it to the console screen.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CategoryAttribute/Overview/source.cs._

## CategoryAttribute.CategoryAttribute() constructor

```csharp
public CategoryAttribute ();
```

Initializes a new instance of the `CategoryAttribute` class using the category name Default.

To be added.

## CategoryAttribute.CategoryAttribute(String) constructor

```csharp
public CategoryAttribute (string category);
```

Initializes a new instance of the `CategoryAttribute` class using the specified category name.

Parameters:

- `category`: The name of the category.

#### Remarks
If the name you provide for the `category` parameter is one of the predefined category names, the name will be automatically localized by the `Category` property.

If the name you provide is not a predefined category name, and you do not override the `CategoryAttribute.GetLocalizedString` method to provide a localized name, the category name will not be localized.

## CategoryAttribute.Action property

```csharp
public static System.ComponentModel.CategoryAttribute Action { get; }
```

Gets a `CategoryAttribute` representing the Action category.

Returns: A `CategoryAttribute` for the action category.

To be added.

## CategoryAttribute.Appearance property

```csharp
public static System.ComponentModel.CategoryAttribute Appearance { get; }
```

Gets a `CategoryAttribute` representing the Appearance category.

Returns: A `CategoryAttribute` for the appearance category.

To be added.

## CategoryAttribute.Asynchronous property

```csharp
public static System.ComponentModel.CategoryAttribute Asynchronous { get; }
```

Gets a `CategoryAttribute` representing the Asynchronous category.

Returns: A `CategoryAttribute` for the asynchronous category.

To be added.

## CategoryAttribute.Behavior property

```csharp
public static System.ComponentModel.CategoryAttribute Behavior { get; }
```

Gets a `CategoryAttribute` representing the Behavior category.

Returns: A `CategoryAttribute` for the behavior category.

To be added.

## CategoryAttribute.Category property

```csharp
public string Category { get; }
```

Gets the name of the category for the property or event that this attribute is applied to.

Returns: The name of the category for the property or event that this attribute is applied to.

#### Remarks
This property calls `CategoryAttribute.GetLocalizedString` to get the localized name of the category the first time it is accessed.

## CategoryAttribute.Data property

```csharp
public static System.ComponentModel.CategoryAttribute Data { get; }
```

Gets a `CategoryAttribute` representing the Data category.

Returns: A `CategoryAttribute` for the data category.

To be added.

## CategoryAttribute.Default property

```csharp
public static System.ComponentModel.CategoryAttribute Default { get; }
```

Gets a `CategoryAttribute` representing the Default category.

Returns: A `CategoryAttribute` for the default category.

To be added.

## CategoryAttribute.Design property

```csharp
public static System.ComponentModel.CategoryAttribute Design { get; }
```

Gets a `CategoryAttribute` representing the Design category.

Returns: A `CategoryAttribute` for the design category.

To be added.

## CategoryAttribute.DragDrop property

```csharp
public static System.ComponentModel.CategoryAttribute DragDrop { get; }
```

Gets a `CategoryAttribute` representing the DragDrop category.

Returns: A `CategoryAttribute` for the drag-and-drop category.

To be added.

## CategoryAttribute.Focus property

```csharp
public static System.ComponentModel.CategoryAttribute Focus { get; }
```

Gets a `CategoryAttribute` representing the Focus category.

Returns: A `CategoryAttribute` for the focus category.

To be added.

## CategoryAttribute.Format property

```csharp
public static System.ComponentModel.CategoryAttribute Format { get; }
```

Gets a `CategoryAttribute` representing the Format category.

Returns: A `CategoryAttribute` for the format category.

To be added.

## CategoryAttribute.Key <example-value>

```csharp
public static System.ComponentModel.CategoryAttribute Key { get; }
```

Gets a `CategoryAttribute` representing the Key category.

Returns: A `CategoryAttribute` for the key category.

To be added.

## CategoryAttribute.Layout property

```csharp
public static System.ComponentModel.CategoryAttribute Layout { get; }
```

Gets a `CategoryAttribute` representing the Layout category.

Returns: A `CategoryAttribute` for the layout category.

To be added.

## CategoryAttribute.Mouse property

```csharp
public static System.ComponentModel.CategoryAttribute Mouse { get; }
```

Gets a `CategoryAttribute` representing the Mouse category.

Returns: A `CategoryAttribute` for the mouse category.

To be added.

## CategoryAttribute.WindowStyle property

```csharp
public static System.ComponentModel.CategoryAttribute WindowStyle { get; }
```

Gets a `CategoryAttribute` representing the WindowStyle category.

Returns: A `CategoryAttribute` for the window style category.

To be added.

## CategoryAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `CategoryAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## CategoryAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this attribute.

Returns: A 32-bit signed integer hash code.

To be added.

## CategoryAttribute.GetLocalizedString(String) method

```csharp
protected virtual string? GetLocalizedString (string value);
```

Looks up the localized name of the specified category.

Parameters:

- `value`: The identifer for the category to look up.

Returns: The localized name of the category, or `null` if a localized name does not exist.

#### Remarks
The `Category` property calls this method the first time it is accessed to look up the localized name for the specified category.

## CategoryAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.
