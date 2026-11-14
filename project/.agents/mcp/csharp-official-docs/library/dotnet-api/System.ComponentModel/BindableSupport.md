---
title: "BindableSupport enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BindableSupport.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BindableSupport enum

Namespace: `System.ComponentModel`

```csharp
public enum BindableSupport
```

Specifies values to indicate whether a property can be bound to a data element or another property.

#### Remarks
This class is used at design time to indicate whether a designer should offer a property as available for data binding in a visual designer. This class does not affect whether the property can be data bound at runtime.

#### Examples
For an example on how to use the `BindableSupport` enumeration to indicate whether a property can be bound, see the sample code in `BindableAttribute.%23ctor`.

## BindableSupport.Default field

```csharp
Default
```

The property is set to the default.

## BindableSupport.No field

```csharp
No
```

The property is not bindable at design time.

## BindableSupport.Yes field

```csharp
Yes
```

The property is bindable at design time.
