---
title: "FilterUIHintAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/FilterUIHintAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FilterUIHintAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class FilterUIHintAttribute : Attribute
```

Represents an attribute that is used to specify the filtering behavior for a column.

To be added.

## FilterUIHintAttribute.FilterUIHintAttribute(String) constructor

```csharp
public FilterUIHintAttribute (string filterUIHint);
```

Initializes a new instance of the `FilterUIHintAttribute` class by using the filter UI hint.

Parameters:

- `filterUIHint`: The name of the control to use for filtering.

#### Examples
The following example shows how to replace default filters on the product entity.

```csharp
MetadataType(typeof(Product_MD))]  
public partial class Product {  
    private class Product_MD {  
        [FilterUIHint("MultiForeignKey")]  
        public object Category { get; set; }  
        [FilterUIHint("BooleanRadio")]  
        public object Discontinued { get; set; }  
    }  
}  
```  

```vb
<MetadataType(GetType(Product_MD))>  _  
Public Class Product  
    Private Class Product_MD  
        <FilterUIHint("MultiForeignKey")>  _  
        Public Property Category As Object  
        End Property  
  
        <FilterUIHint("BooleanRadio")>  _  
        Public Property Discontinued As Object  
        End Property  
  
    End Class  
End Class  
```

## FilterUIHintAttribute.FilterUIHintAttribute(String, String) constructor

```csharp
public FilterUIHintAttribute (string filterUIHint, string? presentationLayer);
```

Initializes a new instance of the `FilterUIHintAttribute` class by using the filter UI hint and presentation layer name.

Parameters:

- `filterUIHint`: The name of the control to use for filtering.
- `presentationLayer`: The name of the presentation layer that supports this control.

To be added.

## FilterUIHintAttribute.FilterUIHintAttribute(String, String, Object[]) constructor

```csharp
public FilterUIHintAttribute (string filterUIHint, string? presentationLayer, params object?[] controlParameters);
```

Initializes a new instance of the `FilterUIHintAttribute` class by using the filter UI hint, presentation layer name, and control parameters.

Parameters:

- `filterUIHint`: The name of the control to use for filtering.
- `presentationLayer`: The name of the presentation layer that supports this control.
- `controlParameters`: The list of parameters for the control.

To be added.

## FilterUIHintAttribute.ControlParameters property

```csharp
public System.Collections.Generic.IDictionary<string,object?> ControlParameters { get; }
```

Gets the name/value pairs that are used as parameters in the control's constructor.

Returns: The name/value pairs that are used as parameters in the control's constructor.

Exceptions:

- `InvalidOperationException`: The current attribute is ill-formed.

To be added.

## FilterUIHintAttribute.FilterUIHint property

```csharp
public string FilterUIHint { get; }
```

Gets the name of the control to use for filtering.

Returns: The name of the control to use for filtering.

To be added.

## FilterUIHintAttribute.PresentationLayer property

```csharp
public string? PresentationLayer { get; }
```

Gets the name of the presentation layer that supports this control.

Returns: The name of the presentation layer that supports this control.

To be added.

## FilterUIHintAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this attribute instance is equal to a specified object.

Parameters:

- `obj`: The object to compare with this attribute instance.

Returns: `true` if the passed object is equal to this attribute instance; otherwise, `false`.

To be added.

## FilterUIHintAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this attribute instance.

Returns: This attribute instance hash code.

To be added.
