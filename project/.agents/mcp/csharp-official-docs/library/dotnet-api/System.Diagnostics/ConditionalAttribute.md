---
title: "ConditionalAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ConditionalAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConditionalAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class ConditionalAttribute : Attribute
```

Indicates to compilers that a method call or attribute should be ignored unless a specified conditional compilation symbol is defined.

#### Remarks
You can apply the `ConditionalAttribute` attribute to methods and classes. However, its use on classes is valid only for types that are derived from `Attribute`. `ConditionalAttribute` either will be ignored or will produce a compiler warning or error message if you apply it to any other type.

Applying `ConditionalAttribute` to a method indicates to compilers that a call to the method should not be compiled into Microsoft intermediate language (MSIL) unless the conditional compilation symbol that is associated with `ConditionalAttribute` is defined. You will get a compilation error in Visual Studio if you apply this attribute to a method that does not return void. Applying `ConditionalAttribute` to an attribute indicates that the attribute should not be emitted to metadata unless the conditional compilation symbol is defined. Any arguments passed to the method or attribute are still type-checked by the compiler.

You can use the following techniques to define conditional compilation symbols:

- Use compiler command-line options; for example, **/define:DEBUG**.

- Use environment variables in the operating system shell; for example, **set DEBUG=1**.

- Use pragmas in the source code; for example, define the compilation variable as follows:

```csharp
    #define DEBUG
```

```vb
    #Const DEBUG=True
```

To undefine the variable, use the following:

```csharp
    #undef DEBUG
```

```vb
    #Const DEBUG=False
```

Compilers that comply with the Common Language Specification (CLS) are permitted to ignore `ConditionalAttribute`. The C#, F#, Visual Basic, and C++ compilers support `ConditionalAttribute`; the JScript compiler does not support the attribute.

> **Note:**
> In Visual Basic, the `AddressOf` operator is not affected by this attribute. For example, `Call CType(AddressOf delegate, Action)` always invokes `delegate`, although `Call delegate()` might not.

`ConditionalAttribute` is applied to the methods that are defined in the `Debug` and `Trace` classes.

For more information about how to use attributes, see Attributes.

#### Examples
The following example demonstrates the use of `ConditionalAttribute`. The example assumes that the condition is defined with the **/define** compiler option. You can obtain different results by changing the compiler option. You can optionally define the conditions by using pragmas in the sample code instead of identifying them as compiler options.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ConditionalAttribute/Overview/cas.cs._

## ConditionalAttribute.ConditionalAttribute(String) constructor

```csharp
public ConditionalAttribute (string conditionString);
```

Initializes a new instance of the `ConditionalAttribute` class.

Parameters:

- `conditionString`: A string that specifies the case-sensitive conditional compilation symbol that is associated with the attribute.

#### Examples
The following example demonstrates how to use the `ConditionalAttribute.%23ctor` constructor. This example is part of a larger example provided for the `ConditionalAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ConditionalAttribute/Overview/cas.cs._

## ConditionalAttribute.ConditionString property

```csharp
public string ConditionString { get; }
```

Gets the conditional compilation symbol that is associated with the `ConditionalAttribute` attribute.

Returns: A string that specifies the case-sensitive conditional compilation symbol that is associated with the `ConditionalAttribute` attribute.

#### Remarks
This property is read-only.
