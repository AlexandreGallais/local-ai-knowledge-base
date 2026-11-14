---
title: "ComAliasNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComAliasNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComAliasNameAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComAliasNameAttribute : Attribute
```

Indicates the COM alias for a parameter or field type.

#### Remarks
You can apply this attribute to parameters, fields, properties, or return values.

#### Examples
In the following type library,  `OLE_COLOR` is an alias for `int`. During import, the arguments of the `Color` accessor are marked with the `ComAliasNameAttribute` to indicate that type library refers to them as `OLE_COLOR`.

```
  
typedef int OLE_COLOR;    
  
interface Baz {  
 HRESULT SetColor([in] OLE_COLOR cl);  
 HRESULT GetColor([out, retval] OLE_COLOR *cl);  
}  
  
```  

is imported as:

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComAliasNameAttribute/Overview/source.cs._

## ComAliasNameAttribute.ComAliasNameAttribute(String) constructor

```csharp
public ComAliasNameAttribute (string alias);
```

Initializes a new instance of the `ComAliasNameAttribute` class with the alias for the attributed field or parameter.

Parameters:

- `alias`: The alias for the field or parameter as found in the type library when it was imported.

To be added.

## ComAliasNameAttribute.Value property

```csharp
public string Value { get; }
```

Gets the alias for the field or parameter as found in the type library when it was imported.

Returns: The alias for the field or parameter as found in the type library when it was imported.

To be added.
