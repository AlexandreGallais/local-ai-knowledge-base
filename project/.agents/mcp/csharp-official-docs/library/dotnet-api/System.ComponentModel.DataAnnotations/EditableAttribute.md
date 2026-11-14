---
title: "EditableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/EditableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EditableAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class EditableAttribute : Attribute
```

Indicates whether a data field is editable.

#### Remarks
The presence of the `EditableAttribute` attribute on a data field indicates whether the user should be able to change the field's value.

This class neither enforces nor guarantees that a field is editable. The underlying data store might allow the field to be changed regardless of the presence of this attribute.

## EditableAttribute.EditableAttribute(Boolean) constructor

```csharp
public EditableAttribute (bool allowEdit);
```

Initializes a new instance of the `EditableAttribute` class.

Parameters:

- `allowEdit`: `true` to specify that field is editable; otherwise, `false`.

To be added.

## EditableAttribute.AllowEdit property

```csharp
public bool AllowEdit { get; }
```

Gets a value that indicates whether a field is editable.

Returns: `true` if the field is editable; otherwise, `false`.

To be added.

## EditableAttribute.AllowInitialValue property

```csharp
public bool AllowInitialValue { get; set; }
```

Gets or sets a value that indicates whether an initial value is enabled.

Returns: `true` if an initial value is enabled; otherwise, `false`.

#### Remarks
This property defaults to the value that is specified in the `EditableAttribute.%23ctor` constructor.
