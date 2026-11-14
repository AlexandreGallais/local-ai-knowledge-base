---
title: "XML API documentation comments comments - document APIs using /// comments (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/xmldoc/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XML API documentation comments comments - document APIs using /// comments (part 2 of 2)

## Tools that accept XML documentation input

The following tools create output from XML comments:

- DocFX: *DocFX* is an API documentation generator for .NET, which currently supports C#, Visual Basic, and F#. It also allows you to customize the generated reference documentation. DocFX builds a static HTML website from your source code and Markdown files. Also, DocFX provides you with the flexibility to customize the layout and style of your website through templates. You can also create custom templates.
- Sandcastle: The *Sandcastle tools* create help files for managed class libraries containing both conceptual and API reference pages. The Sandcastle tools are command-line based and have no GUI front-end, project management features, or automated build process. The Sandcastle Help File Builder provides standalone GUI and command-line-based tools to build a help file in an automated fashion. A Visual Studio integration package is also available for it so that help projects can be created and managed entirely from within Visual Studio.
- Doxygen: *Doxygen* generates an online documentation browser (in HTML) or an offline reference manual (in LaTeX) from a set of documented source files. There's also support for generating output in RTF (MS Word), PostScript, hyperlinked PDF, compressed HTML, DocBook, and Unix manual pages. You can configure Doxygen to extract the code structure from undocumented source files.

> **Note:**
> The XML documentation comments aren't metadata. The compiler doesn't include them in the compiled assembly, so they're not accessible through reflection.

### ID strings

The compiler writes each type or member to an element in the output XML file. Each element has a unique ID string that identifies the type or member. The ID string includes information about operators, parameters, return values, generic type parameters, `ref`, `in`, and `out` parameters. To encode all those potential elements, the compiler follows clearly defined rules for generating the ID strings. Programs that process the XML file use the ID string to identify the corresponding .NET metadata or reflection item that the documentation applies to.

The compiler follows these rules when it generates the ID strings:

- The string contains no white space.
- The string starts with a single character and a colon that identifies the kind of member. Use the following member types:

  | Character | Member type  | Notes |
  |-----------|--------------|--|
  | `N`       | namespace    | You can't add documentation comments to a namespace, but you can make `cref` references to them, where supported. |
  | `T`       | type         | A type is a class, interface, struct, enum, or delegate. |
  | `F`       | field        |  |
  | `P`       | property     | Includes indexers or other indexed properties. |
  | `M`       | method       | Includes special methods, such as constructors and operators. |
  | `E`       | event        |  |
  | `!`       | error string | The rest of the string provides information about the error. The C# compiler generates error information for links that can't be resolved. |

- The second part of the string is the fully qualified name of the item, starting at the root of the namespace. The name of the item, its enclosing types, and namespace are separated by periods. If the name of the item itself has periods, the compiler replaces them with the hash-sign ('#'). The grammar assumes that no item has a hash-sign directly in its name. For example, the fully qualified name of the String constructor is "System.String.#ctor".
- For properties and methods, the parameter list enclosed in parentheses follows. If there are no parameters, no parentheses are present. The parameters are separated by commas. The encoding of each parameter follows directly how it's encoded in a .NET signature (See `Microsoft.VisualStudio.CorDebugInterop.CorElementType` for definitions of the all caps elements in the following list):
  - Base types. Regular types (`ELEMENT_TYPE_CLASS` or `ELEMENT_TYPE_VALUETYPE`) are represented as the fully qualified name of the type.
  - Intrinsic types, such as `ELEMENT_TYPE_I4`, `ELEMENT_TYPE_OBJECT`, `ELEMENT_TYPE_STRING`, `ELEMENT_TYPE_TYPEDBYREF`, and `ELEMENT_TYPE_VOID`, are represented as the fully qualified name of the corresponding full type. For example, `System.Int32` or `System.TypedReference`.
  - `ELEMENT_TYPE_PTR` is represented as a '\*' following the modified type.
  - `ELEMENT_TYPE_BYREF` is represented as a '\@' following the modified type.
  - `ELEMENT_TYPE_CMOD_OPT` is represented as a '!' and the fully qualified name of the modifier class, following the modified type.
  - `ELEMENT_TYPE_SZARRAY` is represented as "[]" following the element type of the array.
  - `ELEMENT_TYPE_ARRAY` is represented as [*lower bound*:`size`,*lower bound*:`size`] where the number of commas is the rank - 1, and the lower bounds and size of each dimension, if known, are represented in decimal. The lower bound and size are omitted if they aren't specified. If the lower bound and size for a particular dimension is omitted, the ':' is omitted as well. For example, a two-dimensional array with 1 as the lower bounds and unspecified sizes is [1:,1:].
- For conversion operators only (`op_Implicit` and `op_Explicit`), the method return value is encoded as a `~` followed by the return type. For example:
     `<member name="M:System.Decimal.op_Explicit(System.Decimal arg)~System.Int32">` is the tag for the cast operator `public static explicit operator int (decimal value);` declared in the `System.Decimal` class.
- For generic types, the name of the type is followed by a backtick and then a number that indicates the number of generic type parameters. For example:
     ``<member name="T:SampleClass`2">`` is the tag for a type that is defined as `public class SampleClass<T, U>`.
     For methods that take generic types as parameters, the generic type parameters are specified as numbers prefaced with backticks (for example \`0,\`1). Each number represents a zero-based array notation for the type's generic parameters.
  - `ELEMENT_TYPE_PINNED` is represented as a '^' following the modified type. The C# compiler never generates this encoding.
  - `ELEMENT_TYPE_CMOD_REQ` is represented as a '&#124;' and the fully qualified name of the modifier class, following the modified type. The C# compiler never generates this encoding.
  - `ELEMENT_TYPE_GENERICARRAY` is represented as "[?]" following the element type of the array. The C# compiler never generates this encoding.
  - `ELEMENT_TYPE_FNPTR` is represented as "=FUNC:`type`(*signature*)", where `type` is the return type, and *signature* is the arguments of the method. If there are no arguments, the parentheses are omitted. The C# compiler never generates this encoding.
  - The following signature components aren't represented because they aren't used to differentiate overloaded methods:
    - calling convention
    - return type
    - `ELEMENT_TYPE_SENTINEL`

The following examples show how the compiler generates the ID strings for a class and its members:

```csharp
﻿namespace MyNamespace;

/// <summary>
/// Enter description here for class X.
/// ID string generated is "T:MyNamespace.MyClass".
/// </summary>
public unsafe class MyClass
{
    /// <summary>
    /// Enter description here for the first constructor.
    /// ID string generated is "M:MyNamespace.MyClass.#ctor".
    /// </summary>
    public MyClass() { }

    /// <summary>
    /// Enter description here for the second constructor.
    /// ID string generated is "M:MyNamespace.MyClass.#ctor(System.Int32)".
    /// </summary>
    /// <param name="i">Describe parameter.</param>
    public MyClass(int i) { }

    /// <summary>
    /// Enter description here for field Message.
    /// ID string generated is "F:MyNamespace.MyClass.Message".
    /// </summary>
    public string? Message;

    /// <summary>
    /// Enter description for constant PI.
    /// ID string generated is "F:MyNamespace.MyClass.PI".
    /// </summary>
    public const double PI = 3.14;

    /// <summary>
    /// Enter description for method Func.
    /// ID string generated is "M:MyNamespace.MyClass.Func".
    /// </summary>
    /// <returns>Describe return value.</returns>
    public int Func() => 1;

    /// <summary>
    /// Enter description for method SomeMethod.
    /// ID string generated is "M:MyNamespace.MyClass.SomeMethod(System.String,System.Int32@,System.Void*)".
    /// </summary>
    /// <param name="str">Describe parameter.</param>
    /// <param name="num">Describe parameter.</param>
    /// <param name="ptr">Describe parameter.</param>
    /// <returns>Describe return value.</returns>
    public int SomeMethod(string str, ref int num, void* ptr) { return 1; }

    /// <summary>
    /// Enter description for method AnotherMethod.
    /// ID string generated is "M:MyNamespace.MyClass.AnotherMethod(System.Int16[],System.Int32[0:,0:])".
    /// </summary>
    /// <param name="array1">Describe parameter.</param>
    /// <param name="array">Describe parameter.</param>
    /// <returns>Describe return value.</returns>
    public int AnotherMethod(short[] array1, int[,] array) { return 0; }

    /// <summary>
    /// Enter description for operator.
    /// ID string generated is "M:MyNamespace.MyClass.op_Addition(MyNamespace.MyClass,MyNamespace.MyClass)".
    /// </summary>
    /// <param name="first">Describe parameter.</param>
    /// <param name="second">Describe parameter.</param>
    /// <returns>Describe return value.</returns>
    public static MyClass operator +(MyClass first, MyClass second) { return first; }

    /// <summary>
    /// Enter description for property.
    /// ID string generated is "P:MyNamespace.MyClass.Prop".
    /// </summary>
    public int Prop { get { return 1; } set { } }

    /// <summary>
    /// Enter description for event.
    /// ID string generated is "E:MyNamespace.MyClass.OnHappened".
    /// </summary>
    public event Del? OnHappened;

    /// <summary>
    /// Enter description for index.
    /// ID string generated is "P:MyNamespace.MyClass.Item(System.String)".
    /// </summary>
    /// <param name="str">Describe parameter.</param>
    /// <returns></returns>
    public int this[string s] => 1;

    /// <summary>
    /// Enter description for class Nested.
    /// ID string generated is "T:MyNamespace.MyClass.Nested".
    /// </summary>
    public class Nested { }

    /// <summary>
    /// Enter description for delegate.
    /// ID string generated is "T:MyNamespace.MyClass.Del".
    /// </summary>
    /// <param name="i">Describe parameter.</param>
    public delegate void Del(int i);

    /// <summary>
    /// Enter description for operator.
    /// ID string generated is "M:MyNamespace.MyClass.op_Explicit(MyNamespace.MyClass)~System.Int32".
    /// </summary>
    /// <param name="myParameter">Describe parameter.</param>
    /// <returns>Describe return value.</returns>
    public static explicit operator int(MyClass myParameter) => 1;
}
```
## C# language specification

For more information, see the C# Language Specification annex on documentation comments.
