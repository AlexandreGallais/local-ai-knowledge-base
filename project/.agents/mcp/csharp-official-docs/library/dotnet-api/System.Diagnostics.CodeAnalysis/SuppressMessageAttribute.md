---
title: "SuppressMessageAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/SuppressMessageAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SuppressMessageAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class SuppressMessageAttribute : Attribute
```

Suppresses reporting of a specific code analysis rule violation, allowing multiple suppressions on a single code artifact. Does not apply to compiler diagnostics.

#### Remarks
This attribute can be applied to any application element. For a complete list of the violations that can be suppressed, see Code quality rules.

> **Note:**
> The `ConditionalAttribute` is applied to this class, specifying the preprocessing symbol "CODE_ANALYSIS" as the conditional symbol that determines whether the attribute call is included or omitted. If the symbol is defined, the attribute call is included; otherwise, the call is omitted.
>
> When you right-click a code analysis warning in Visual Studio and choose **Suppress \<rule-ID> > in Suppression File** or **Suppress \<rule-ID> > in Source (attribute)**, a **SuppressMessage** attribute is added to either the global suppressions file or to the source code file. For more information about the **SuppressMessage** attribute and its use in Visual Studio, see Suppress code analysis violations.

#### Examples
The following code example shows the use of the `SuppressMessageAttribute` attribute to suppress performance warning messages.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.CodeAnalysis/SuppressMessageAttribute/Overview/program.cs._

## SuppressMessageAttribute.SuppressMessageAttribute(String, String) constructor

```csharp
public SuppressMessageAttribute (string category, string checkId);
```

Initializes a new instance of the `SuppressMessageAttribute` class, specifying the category of the code analysis tool and the identifier for an analysis rule.

Parameters:

- `category`: The category for the attribute.
- `checkId`: The identifier of the analysis tool rule the attribute applies to.

#### Remarks

The `category` parameter value is specific to the analysis tool and categorizes the rule identified by the `checkId` parameter. The two parameters concatenated together form a unique identifier for the rule.

> **Note:**
> The preprocessor symbol "CODE_ANALYSIS" must be defined for this attribute to be effective. The absence of the preprocessor symbol results in the attribute not being applied.

#### Examples

The following code example shows the use of the `SuppressMessageAttribute` attribute to suppress warnings for the `Microsoft.Performance` category and the `CA1801` and `CA1804` check identifiers. This code example is part of a larger example provided for the `SuppressMessageAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.CodeAnalysis/SuppressMessageAttribute/Overview/program.cs._

## SuppressMessageAttribute.Category property

```csharp
public string Category { get; }
```

Gets the category identifying the classification of the attribute.

Returns: The category identifying the attribute.

#### Remarks

The `Category` property describes the tool or tool analysis category for which a message suppression attribute applies.

#### Examples
The following code example shows the use of the `SuppressMessageAttribute` attribute to suppress warnings for the `Microsoft.Performance` category and the `CA1801` and `CA1804` check identifiers. This code example is part of a larger example provided for the `SuppressMessageAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.CodeAnalysis/SuppressMessageAttribute/Overview/program.cs._

## SuppressMessageAttribute.CheckId property

```csharp
public string CheckId { get; }
```

Gets the identifier of the code analysis tool rule to be suppressed.

Returns: The identifier of the code analysis tool rule to be suppressed.

#### Remarks

Concatenated together, the `SuppressMessageAttribute.Category` and `SuppressMessageAttribute.CheckId` properties form a unique check identifier.

#### Examples
The following code example shows the use of the `SuppressMessageAttribute` attribute to suppress warnings for the `Microsoft.Performance` category and the `CA1801` and `CA1804` check identifiers. This code example is part of a larger example provided for the `SuppressMessageAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.CodeAnalysis/SuppressMessageAttribute/Overview/program.cs._

## SuppressMessageAttribute.Justification property

```csharp
public string? Justification { get; set; }
```

Gets or sets the justification for suppressing the code analysis message.

Returns: The justification for suppressing the message.

To be added.

## SuppressMessageAttribute.MessageId property

```csharp
public string? MessageId { get; set; }
```

Gets or sets the expanded exclusion criteria.

Returns: A string containing the expanded exclusion criteria.

#### Remarks

The `MessageId` property is an optional argument that specifies additional exclusion where the literal metadata target is not sufficiently precise. For example, the `SuppressMessageAttribute` cannot be applied within a method, but you may want to suppress a violation against a single statement in the method.

> **Note:**
> This property is only respected by legacy code analysis.

#### Examples
The following code example shows the use of the `SuppressMessageAttribute` attribute to suppress warnings for a specific parameter in a method declaration and a specific field in the method. This code example is part of a larger example provided for the `SuppressMessageAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.CodeAnalysis/SuppressMessageAttribute/Overview/program.cs._

## SuppressMessageAttribute.Scope property

```csharp
public string? Scope { get; set; }
```

Gets or sets the scope of the code that is relevant for the attribute.

Returns: The scope of the code that is relevant for the attribute.

#### Remarks

The `Scope` property is an optional argument that specifies the metadata scope for which the attribute is relevant. The following table shows the possible values.

| Value | Description |
| - | - |
| `"member"` | Suppresses warnings against a member. |
| `"module"` | Suppresses warnings against an assembly. It is a global suppression that applies to the entire project. |
| `"namespace"` | This scope suppresses warnings against the namespace itself. It does not suppress warnings against types within the namespace. |
| `"namespaceanddescendants"` | Suppresses warnings in a namespace and all its descendant symbols. This value is ignored by legacy code analysis. |
| `"type"` | Suppresses warnings against a type. |

For legacy code analysis, `"resource"` is also a valid value. For more information about scopes, see Suppress code analysis warnings.

## SuppressMessageAttribute.Target property

```csharp
public string? Target { get; set; }
```

Gets or sets a fully qualified path that represents the code analysis target.

Returns: A fully qualified path that represents the code analysis target.

#### Remarks
The `Target` property is an optional argument identifying the analysis target of the attribute. An example value is "System.IO.Stream.ctor():System.Void". Because it is fully qualified, it can be long, particularly for targets such as parameters. The analysis tool user interface should be capable of automatically formatting the parameter.
