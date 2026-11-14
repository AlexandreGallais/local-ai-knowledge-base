---
title: "DesignerSerializationVisibility enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DesignerSerializationVisibility.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DesignerSerializationVisibility enum

Namespace: `System.ComponentModel`

```csharp
public enum DesignerSerializationVisibility
```

Specifies the visibility a property has to the design-time serializer.

#### Remarks
A visual designer uses a `DesignerSerializationVisibility` value to indicate which aspects of the property or event should be examined and saved.

#### Examples
For an example of using the `DesignerSerializationVisibility` enumerator, please see the sample code at `DesignerSerializationVisibilityAttribute`.

## DesignerSerializationVisibility.Content field

```csharp
Content
```

The code generator produces code for the contents of the object, rather than for the object itself.

## DesignerSerializationVisibility.Hidden field

```csharp
Hidden
```

The code generator does not produce code for the object.

## DesignerSerializationVisibility.Visible field

```csharp
Visible
```

The code generator produces code for the object.
