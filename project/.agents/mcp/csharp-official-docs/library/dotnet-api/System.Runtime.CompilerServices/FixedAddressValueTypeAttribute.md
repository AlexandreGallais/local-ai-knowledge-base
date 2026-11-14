---
title: "FixedAddressValueTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/FixedAddressValueTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FixedAddressValueTypeAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class FixedAddressValueTypeAttribute : Attribute
```

Fixes the address of a static value type field throughout its lifetime. This class cannot be inherited.

#### Remarks
Use the `FixedAddressValueTypeAttribute` attribute to mark static value type fields as pinned upon creation. This attribute does not apply to primitive value type and enum fields.

This attribute is used by the Microsoft Visual C++ compiler.

The storage for static value type fields might be allocated on the GC heap. This means that their address can change as garbage collection is performed. When you apply this attribute to a static value type field, its address remains constant during its lifetime.

#### Examples
The following example illustrates the use of the `FixedAddressValueTypeAttribute` attribute to pin a static field in memory. It defines an `Age` structure and initializes two classes that have static fields of type `Age`. The second class applies `FixedAddressValueTypeAttribute` to pin the field's address. A number of memory allocations are made before and after these two objects are instantiated and the garbage collector is invoked. The output from the example shows that although the address of the first `Age` field has changed after garbage collection, the address of the field to which `FixedAddressValueTypeAttribute` is applied has not.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/FixedAddressValueTypeAttribute/Overview/example1.cs._
## FixedAddressValueTypeAttribute.FixedAddressValueTypeAttribute() constructor

```csharp
public FixedAddressValueTypeAttribute ();
```

Initializes a new instance of the `FixedAddressValueTypeAttribute` class.

#### Examples
The following example illustrates the use of the `FixedAddressValueTypeAttribute` attribute to pin a static field in memory. It defines an `Age` structure and initializes two classes that have static fields of type `Age`. The second class applies `FixedAddressValueTypeAttribute` to pin the field's address. A number of memory allocations are made before and after these two objects are instantiated and the garbage collector is invoked. The output from the example shows that although the address of the first `Age` field has changed after garbage collection, the address of the field to which `FixedAddressValueTypeAttribute` is applied has not.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/FixedAddressValueTypeAttribute/Overview/example1.cs._
