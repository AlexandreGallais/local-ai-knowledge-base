---
title: "DesignerProperties class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DesignerProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DesignerProperties class

Namespace: `System.ComponentModel`

```csharp
public static class DesignerProperties
```

Provides attached properties used to communicate with a designer.

#### Remarks
The `DesignerProperties` class provides attached properties that can be used to query the state of a control when it is running in a designer. Designer tools will set values for properties on objects that are running in the designer.

## DesignerProperties.IsInDesignMode attachedproperty

```csharp
see GetIsInDesignMode, and SetIsInDesignMode
```

Gets or sets whether a `DependencyObject` is running in the context of a designer.

#### Remarks
Component and control developers might use this property to perform different logic when running in the context of a designer than they would when running in an application.

Designers might change the value of this property to move a control from design mode to run mode and back. Components that make changes to their state based on the value of this property should override the virtual `FrameworkElement.OnPropertyChanged` method and update their state if their **IsInDesignMode** property value changes.

#### Dependency Property Information

| Identifier field | Metadata properties set to `true` |
|------------------|-----------------------------------|
| `IsInDesignModeProperty` | `FrameworkPropertyMetadata.OverridesInheritanceBehavior`, `FrameworkPropertyMetadata.Inherits` |

## DesignerProperties.GetIsInDesignMode(DependencyObject) method

```csharp
public static bool GetIsInDesignMode (System.Windows.DependencyObject element);
```

Gets the value of the `DesignerProperties.IsInDesignMode` attached property for the specified `UIElement`.

Parameters:

- `element`: The element from which the property value is read.

Returns: The `DesignerProperties.IsInDesignMode` property value for the element.

Exceptions:

- `InvalidOperationException`: `element` is `null`.

To be added.

## DesignerProperties.SetIsInDesignMode(DependencyObject, Boolean) method

```csharp
public static void SetIsInDesignMode (System.Windows.DependencyObject element, bool value);
```

Sets the value of the `DesignerProperties.IsInDesignMode` attached property to a specified element.

Parameters:

- `element`: The element to which the attached property is written.
- `value`: The needed `Boolean` value.

Exceptions:

- `InvalidOperationException`: `element` is `null`.

To be added.

## DesignerProperties.IsInDesignModeProperty field

```csharp
public static readonly System.Windows.DependencyProperty IsInDesignModeProperty;
```

Identifies the `DesignerProperties.IsInDesignMode` attached property.

#### Remarks
The identifier for the `DesignerProperties.IsInDesignMode` attached property.
