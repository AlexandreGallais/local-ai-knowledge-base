---
title: "DebuggerTypeProxyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerTypeProxyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerTypeProxyAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerTypeProxyAttribute : Attribute
```

Specifies the display proxy for a type.

#### Remarks
**Note** Use this attribute when you need to significantly and fundamentally change the debugging view of a type, but not change the type itself.

The `DebuggerTypeProxyAttribute` attribute is used to specify a display proxy for a type, allowing a developer to tailor the view for the type.  This attribute can be used at the assembly level as well, in which case the `Target` property specifies the type for which the proxy will be used. In general, this attribute specifies a private nested type that occurs within the type to which the attribute is applied.  An expression evaluator that supports type viewers checks for this attribute when a type is displayed. If the attribute is found, the expression evaluator substitutes the display proxy type for the type the attribute is applied to.

When the `DebuggerBrowsableAttribute` is present, the debugger variable window displays only the public members of the proxy type. Private members are not displayed. The behavior of the data window is not changed by attribute-enhanced views.

To avoid unnecessary performance penalties, expression evaluators should not examine the attributes on the display proxy of the type unless the type is expanded, either through the user clicking the plus sign (+) next to the type in a data window, or through the application of the `DebuggerBrowsableAttribute` attribute. Therefore, it is recommended that no attributes be applied to the display type. Attributes can and should be applied within the body of the display type.

#### Examples
The following code example shows the use of the `DebuggerTypeProxyAttribute` to specify a private nested type to be used as a debugger display proxy. This code example is part of a larger example provided for the `DebuggerDisplayAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DebuggerBrowsableAttribute/.ctor/program.cs._

## DebuggerTypeProxyAttribute.DebuggerTypeProxyAttribute(String) constructor

```csharp
public DebuggerTypeProxyAttribute (string typeName);
```

Initializes a new instance of the `DebuggerTypeProxyAttribute` class using the type name of the proxy.

Parameters:

- `typeName`: The type name of the proxy type.

#### Remarks
The debugger creates a new instance of the type proxy class every time it needs to display a variable of the target type. This can have performance implications. As a result, you should not do any more work in the constructor than absolutely necessary.

## DebuggerTypeProxyAttribute.DebuggerTypeProxyAttribute(Type) constructor

```csharp
public DebuggerTypeProxyAttribute (Type type);
```

Initializes a new instance of the `DebuggerTypeProxyAttribute` class using the type of the proxy.

Parameters:

- `type`: The proxy type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
The debugger creates a new instance of the type proxy class every time it needs to display a variable of the target type. This can have performance implications. As a result, you should not do any more work in the constructor than absolutely necessary.

#### Examples
The following code example shows the use of the `%23ctor` constructor to specify a debugger display proxy. This code example is part of a larger example provided for the `DebuggerDisplayAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DebuggerBrowsableAttribute/.ctor/program.cs._

## DebuggerTypeProxyAttribute.ProxyTypeName property

```csharp
public string ProxyTypeName { get; }
```

Gets the type name of the proxy type.

Returns: The type name of the proxy type.

To be added.

## DebuggerTypeProxyAttribute.Target property

```csharp
public Type? Target { get; set; }
```

Gets or sets the target type for the attribute.

Returns: The target type for the attribute.

Exceptions:

- `ArgumentNullException`: `DebuggerTypeProxyAttribute.Target` is set to `null`.

#### Remarks
Use this property to specify the target type when the attribute is used at the assembly level.

## DebuggerTypeProxyAttribute.TargetTypeName property

```csharp
public string? TargetTypeName { get; set; }
```

Gets or sets the name of the target type.

Returns: The name of the target type.

#### Remarks
Use this property to specify the name of the target type when the attribute is used at the assembly level.
