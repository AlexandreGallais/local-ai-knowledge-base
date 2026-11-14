---
title: "EnumDataTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/EnumDataTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnumDataTypeAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class EnumDataTypeAttribute : System.ComponentModel.DataAnnotations.DataTypeAttribute
```

Enables a .NET enumeration to be mapped to a data column.

#### Remarks
This class lets you map the underlying value in a column to a corresponding enumeration constant name. This lets you define an enumeration that contains descriptive values that correspond to database values, and then use the enumeration constant names instead of the database values when data is displayed.

#### Examples
The following example shows how to replace the numeric value of an enumeration with the corresponding declaration.

```csharp
public enum ReorderLevel
{
    Zero = 0,
    Five = 5,
    Ten = 10,
    Fifteen = 15,
    Twenty = 20,
    TwentyFive = 25,
    Thirty = 30
}

[MetadataType(typeof(ProductMD))]  
public partial class Product
{  
    public class ProductMD
    {  
        [EnumDataType(typeof(ReorderLevel))]  
        public object ReorderLevel { get; set; }  
    }  
}  
```  

```vb
Imports Public Enum eReorderLvl  
    zero = 0  
    five = 5  
    ten = 10  
    fifteen = 15  
    twenty = 20  
    twenty_five = 25  
    thirty = 30  
End Enum  
<MetadataType(GetType(Product_MD))>  _  
Public Class Product  
    Public Class Product_MD  
        <EnumDataType(GetType(eReorderLvl))>  _  
        Public Property ReorderLevel As Object  
        End Property  
    End Class  
End Class  
```

## EnumDataTypeAttribute.EnumDataTypeAttribute(Type) constructor

```csharp
public EnumDataTypeAttribute (Type enumType);
```

Initializes a new instance of the `EnumDataTypeAttribute` class.

Parameters:

- `enumType`: The type of the enumeration.

To be added.

## EnumDataTypeAttribute.EnumType property

```csharp
public Type EnumType { get; }
```

Gets or sets the enumeration type.

Returns: The enumeration type.

To be added.

## EnumDataTypeAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Checks that the value of the data field is valid.

Parameters:

- `value`: The data field value to validate.

Returns: `true` if the data field value is valid; otherwise, `false`.

To be added.
