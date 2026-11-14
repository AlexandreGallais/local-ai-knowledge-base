---
title: "UnconditionalSuppressMessageAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/UnconditionalSuppressMessageAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnconditionalSuppressMessageAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class UnconditionalSuppressMessageAttribute : Attribute
```

Suppresses reporting of a specific rule violation, allowing multiple suppressions on a single code artifact.

#### Remarks

`UnconditionalSuppressMessageAttribute` is different than `SuppressMessageAttribute` in that it doesn't have a `ConditionalAttribute`. It's always preserved in the compiled assembly.
For more information, see Introduction to trim warnings and Introduction to AOT warnings.

## UnconditionalSuppressMessageAttribute.UnconditionalSuppressMessageAttribute(String, String) constructor

```csharp
public UnconditionalSuppressMessageAttribute (string category, string checkId);
```

Initializes a new instance of the `UnconditionalSuppressMessageAttribute` class, specifying the category of the tool and the identifier for an analysis rule.

Parameters:

- `category`: The category for the attribute.
- `checkId`: The identifier of the analysis rule the attribute applies to.

To be added.

## UnconditionalSuppressMessageAttribute.Category property

```csharp
public string Category { get; }
```

Gets the category identifying the classification of the attribute.

Returns: To be added.

#### Remarks

The `Category` property describes the tool or tool analysis category to which a message suppression attribute applies.

## UnconditionalSuppressMessageAttribute.CheckId property

```csharp
public string CheckId { get; }
```

Gets the identifier of the analysis tool rule to be suppressed.

Returns: To be added.

#### Remarks

Concatenated together, the `Category` and `CheckId` properties form a unique check identifier.

## UnconditionalSuppressMessageAttribute.Justification property

```csharp
public string? Justification { get; set; }
```

Gets or sets the justification for suppressing the code analysis message.

Returns: To be added.

To be added.

## UnconditionalSuppressMessageAttribute.MessageId property

```csharp
public string? MessageId { get; set; }
```

Gets or sets an optional argument expanding on exclusion criteria.

Returns: To be added.

#### Remarks

The `MessageId` property is an optional argument that specifies additional exclusion where the literal metadata target is not sufficiently precise. For example, the `UnconditionalSuppressMessageAttribute` cannot be applied within a method, and it may be desirable to suppress a violation against a statement in the method that will give a rule violation, but not against all statements in the method.

## UnconditionalSuppressMessageAttribute.Scope property

```csharp
public string? Scope { get; set; }
```

Gets or sets the scope of the code that is relevant for the attribute.

Returns: To be added.

#### Remarks

The `Scope` property is an optional argument that specifies the metadata scope for which the attribute is relevant.

## UnconditionalSuppressMessageAttribute.Target property

```csharp
public string? Target { get; set; }
```

Gets or sets a fully qualified path that represents the target of the attribute.

Returns: To be added.

#### Remarks

The `Target` property is an optional argument that identifies the analysis target of the attribute. An example value is `System.IO.Stream.ctor():System.Void`.
Because it is fully qualified, it can be long, particularly for targets such as parameters.
The analysis tool user interface should be capable of automatically formatting the parameter.
