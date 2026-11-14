---
title: "DisplayAttribute class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/DisplayAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DisplayAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class DisplayAttribute : Attribute
```

Provides a general-purpose attribute that lets you specify localizable strings for types and members of entity partial classes.

#### Remarks
The properties of this class can be used either as literals or as resource identifiers for a specified `DisplayAttribute.ResourceType` instance.

## DisplayAttribute.DisplayAttribute() constructor

```csharp
public DisplayAttribute ();
```

Initializes a new instance of the `DisplayAttribute` class.

#### Remarks
The constructor initializes the `DisplayAttribute.ShortName`, `DisplayAttribute.Name`, `DisplayAttribute.Description`, and `DisplayAttribute.Prompt` properties to an empty string.

## DisplayAttribute.AutoGenerateField property

```csharp
public bool AutoGenerateField { get; set; }
```

Gets or sets a value that indicates whether UI should be generated automatically in order to display this field.

Returns: `true` if UI should be generated automatically to display this field; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An attempt was made to get the property value before it was set.

#### Remarks
Do not use this property to access the `AutoGenerateField` property. Use the `DisplayAttribute.GetAutoGenerateField` method instead.

## DisplayAttribute.AutoGenerateFilter property

```csharp
public bool AutoGenerateFilter { get; set; }
```

Gets or sets a value that indicates whether filtering UI is automatically displayed for this field.

Returns: `true` if UI should be generated automatically to display filtering for this field; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An attempt was made to get the property value before it was set.

#### Remarks
Do not use this property to get the value of the `AutoGenerateFilter` property. Use the `DisplayAttribute.GetAutoGenerateFilter` method instead.

Setting this property overrides the default behavior for specifying which columns are included as filters.

#### Examples
The following example shows how to disable the filter for the Employee1 field.

```csharp
[MetadataType(typeof(EmployeeMD))]
public partial class Employee {
    public class EmployeeMD {
        [Display(Name = "Last Name", Order = -9,
            Prompt = "Enter Last Name", Description="Emp Last Name")]
        public object LastName { get; set; }

        [Display(Name = "Manager", AutoGenerateFilter=false)]
        public object Employee1 { get; set; }
    }
}
```

```vb
<MetadataType(GetType(EmployeeMD))>  _
Public Class Employee

    Public Class EmployeeMD

        <Display(Name:="Last Name", Order:=-9, _
           Prompt:="Enter Last Name", Description:="Emp Last Name")>  _
        Public Property LastName As Object
        End Property

        <Display(Name:="Manager", AutoGenerateFilter:=false)>  _
        Public Property Employee1 As Object
        End Property
    End Class
End Class
```

## DisplayAttribute.Description property

```csharp
public string? Description { get; set; }
```

Gets or sets a value that is used to display a description in the UI.

Returns: The value that is used to display a description in the UI.

#### Remarks
Do not use this property to get the value of the `Description` property. Use the `DisplayAttribute.GetDescription` method instead.

The `Description` property is typically used as a tooltip or description UI element that is bound to the member using this attribute. The Dynamic Data Edit.ascx template will display the description as a tooltip in text-entry fields. A `null` value or empty string is valid.

#### Examples
The following example shows how to set the `Description` property.

```csharp
[MetadataType(typeof(EmployeeMD))]
public partial class Employee {
    public class EmployeeMD {
        [Display(Name = "Last Name", Order = -9,
        Prompt = "Enter Last Name", Description="Emp Last Name")]
        public object LastName { get; set; }

        [Display(Name = "Manager", AutoGenerateFilter=false)]
        public object Employee1 { get; set; }
    }
}
```

```vb
<MetadataType(GetType(EmployeeMD))>  _
Public Class Employee

    Public Class EmployeeMD

        <Display(Name:="Last Name", Order:=-9, _
           Prompt:="Enter Last Name", Description:="Emp Last Name")>  _
        Public Property LastName As Object
        End Property

        <Display(Name:="Manager", AutoGenerateFilter:=false)>  _
        Public Property Employee1 As Object
        End Property
    End Class
End Class
```

## DisplayAttribute.GroupName property

```csharp
public string? GroupName { get; set; }
```

Gets or sets a value that is used to group fields in the UI.

Returns: A value that is used to group fields in the UI.

#### Remarks
Do not use this property to get the value of the `GroupName` property. Use the `DisplayAttribute.GetGroupName` method instead. A `null` value or empty string is valid.

## DisplayAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets a value that is used for display in the UI.

Returns: A value that is used for display in the UI.

#### Remarks
Do not use this property to get the value of the `Name` property. Use the `DisplayAttribute.GetName` method instead.

The name is typically used as the field label for a UI element that is bound to the property that is annotated with this attribute. The Dynamic Data List.aspx, ListDetails.aspx, and Details.aspx page templates use the `Name` property for the field label. A `null` value or empty string is valid.

#### Examples
The following example shows how to set the name property.

```csharp
[MetadataType(typeof(EmployeeMD))]
public partial class Employee {
    public class EmployeeMD {
        [Display(Name = "Last Name", Order = -9,
        Prompt = "Enter Last Name", Description="Emp Last Name")]
        public object LastName { get; set; }

        [Display(Name = "Manager", AutoGenerateFilter=false)]
        public object Employee1 { get; set; }
    }
}
```

```vb
<MetadataType(GetType(EmployeeMD))>  _
Public Class Employee

    Public Class EmployeeMD

        <Display(Name:="Last Name", Order:=-9, _
           Prompt:="Enter Last Name", Description:="Emp Last Name")>  _
        Public Property LastName As Object
        End Property

        <Display(Name:="Manager", AutoGenerateFilter:=false)>  _
        Public Property Employee1 As Object
        End Property
    End Class
End Class
```

## DisplayAttribute.Order property

```csharp
public int Order { get; set; }
```

Gets or sets the order weight of the column.

Returns: The order weight of the column.

Exceptions:

- `InvalidOperationException`: The getter of this property has been invoked but its value has not been explicitly set using the setter.

#### Remarks
Columns are sorted in increasing order based on the order value. Columns without this attribute have an order value of 0. Negative values are valid and can be used to position a column before all non-negative columns. If an order is not specified, presentation layers should consider using the value 10000. This value lets explicitly-ordered fields be displayed before and after the fields that do not have a specified order.

#### Examples
The following example shows how to set the order weight of the LastName field to -9. The other fields in the entity have the default order weight of zero. Therefore, the LastName field will be displayed first.

```csharp
[MetadataType(typeof(EmployeeMD))]
public partial class Employee {
    public class EmployeeMD {
        [Display(Name = "Last Name", Order = -9,
        Prompt = "Enter Last Name", Description="Emp Last Name")]
        public object LastName { get; set; }

        [Display(Name = "Manager", AutoGenerateFilter=false)]
        public object Employee1 { get; set; }
    }
}
```

```vb
<MetadataType(GetType(EmployeeMD))>  _
Public Class Employee

    Public Class EmployeeMD

        <Display(Name:="Last Name", Order:=-9, _
           Prompt:="Enter Last Name", Description:="Emp Last Name")>  _
        Public Property LastName As Object
        End Property

        <Display(Name:="Manager", AutoGenerateFilter:=false)>  _
        Public Property Employee1 As Object
        End Property
    End Class
End Class
```

## DisplayAttribute.Prompt property

```csharp
public string? Prompt { get; set; }
```

Gets or sets a value that will be used to set the watermark for prompts in the UI.

Returns: A value that will be used to display a watermark in the UI.

#### Remarks
This property is typically used as a prompt or watermark for a UI element that is bound to the property that is annotated with this attribute. Do not use this method to access the prompt string. Use the `DisplayAttribute.GetPrompt` method instead.

#### Examples
The following example shows how to set the `Prompt` property to "Enter Last Name".

```csharp
[MetadataType(typeof(EmployeeMD))]
public partial class Employee {
    public class EmployeeMD {
        [Display(Name = "Last Name", Order = -9,
        Prompt = "Enter Last Name", Description="Emp Last Name")]
        public object LastName { get; set; }

        [Display(Name = "Manager", AutoGenerateFilter=false)]
        public object Employee1 { get; set; }
    }
}
```

```vb
<MetadataType(GetType(EmployeeMD))>  _
Public Class Employee

    Public Class EmployeeMD

        <Display(Name:="Last Name", Order:=-9, _
           Prompt:="Enter Last Name", Description:="Emp Last Name")>  _
        Public Property LastName As Object
        End Property

        <Display(Name:="Manager", AutoGenerateFilter:=false)>  _
        Public Property Employee1 As Object
        End Property
    End Class
End Class
```

## DisplayAttribute.ResourceType property

```csharp
public Type? ResourceType { get; set; }
```

Gets or sets the type that contains the resources for the `DisplayAttribute.ShortName`, `DisplayAttribute.Name`, `DisplayAttribute.Prompt`, and `DisplayAttribute.Description` properties.

Returns: The type of the resource that contains the `DisplayAttribute.ShortName`, `DisplayAttribute.Name`, `DisplayAttribute.Prompt`, and `DisplayAttribute.Description` properties.

#### Remarks
If this value is `null`, the `DisplayAttribute.ShortName`, `DisplayAttribute.Name`, `DisplayAttribute.Prompt`, and `DisplayAttribute.Description` properties are assumed to be literal, non-localized strings. If this value is not `null`, the string properties are assumed to be the names of public static properties that return the actual string value.

## DisplayAttribute.ShortName property

```csharp
public string? ShortName { get; set; }
```

Gets or sets a value that is used for the grid column label.

Returns: A value that is for the grid column label.

#### Remarks
The short name is used as the grid column label for a UI element that is bound to the property that is annotated with this attribute. The Dynamic Data Insert.aspx and Edit.aspx page templates use the `DisplayAttribute.ShortName` for the field label. This property returns the localized string for `DisplayAttribute.ResourceType` if the `ResourceType` property has been specified and if the `ShortName` property represents a resource key. If the `ResourceType` property has not been specified or if the `ShortName` property is not a resource key, this property returns a non-localized string.

## DisplayAttribute.GetAutoGenerateField() method

```csharp
public bool? GetAutoGenerateField ();
```

Returns the value of the `DisplayAttribute.AutoGenerateField` property.

Returns: The value of `DisplayAttribute.AutoGenerateField` if the property has been initialized; otherwise, `null`.

To be added.

## DisplayAttribute.GetAutoGenerateFilter() method

```csharp
public bool? GetAutoGenerateFilter ();
```

Returns a value that indicates whether UI should be generated automatically in order to display filtering for this field.

Returns: The value of `DisplayAttribute.AutoGenerateFilter` if the property has been initialized; otherwise, `null`.

To be added.

## DisplayAttribute.GetDescription() method

```csharp
public string? GetDescription ();
```

Returns the value of the `DisplayAttribute.Description` property.

Returns: The localized description, if the `DisplayAttribute.ResourceType` has been specified and the `DisplayAttribute.Description` property represents a resource key; otherwise, the non-localized value of the `DisplayAttribute.Description` property.

Exceptions:

- `InvalidOperationException`: The `DisplayAttribute.ResourceType` property and the `DisplayAttribute.Description` property are initialized, but a public static property that has a name that matches the `DisplayAttribute.Description` value could not be found for the `DisplayAttribute.ResourceType` property.

#### Remarks
The `Description` property is typically used as a tooltip for the property that is annotated with this attribute.

## DisplayAttribute.GetGroupName() method

```csharp
public string? GetGroupName ();
```

Returns the value of the `DisplayAttribute.GroupName` property.

Returns: A value that will be used for grouping fields in the UI, if `DisplayAttribute.GroupName` has been initialized; otherwise, `null`. If the `DisplayAttribute.ResourceType` property has been specified and the `DisplayAttribute.GroupName` property represents a resource key, a localized string is returned; otherwise, a non-localized string is returned.

Exceptions:

- `InvalidOperationException`: Both the `DisplayAttribute.ResourceType` property and `DisplayAttribute.GroupName` properties were set, but a public static property with a name matching the `DisplayAttribute.GroupName` value couldn't be found on the `DisplayAttribute.ResourceType`.

To be added.

## DisplayAttribute.GetName() method

```csharp
public string? GetName ();
```

Returns a value that is used for field display in the UI.

Returns: The localized string for the `DisplayAttribute.Name` property, if the `DisplayAttribute.ResourceType` property has been specified and the `DisplayAttribute.Name` property represents a resource key; otherwise, the non-localized value of the `DisplayAttribute.Name` property.

Exceptions:

- `InvalidOperationException`: The `DisplayAttribute.ResourceType` property and the `DisplayAttribute.Name` property are initialized, but a public static property that has a name that matches the `DisplayAttribute.Name` value could not be found for the `DisplayAttribute.ResourceType` property.

#### Remarks
The name is typically used as the field label for a UI element that is bound to the property that is annotated with the `Name` property. A `null` value or empty string is valid.
