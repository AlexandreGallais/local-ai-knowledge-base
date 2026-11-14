---
title: "RegularExpressionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/RegularExpressionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegularExpressionAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class RegularExpressionAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies that a data field value in ASP.NET Dynamic Data must match the specified regular expression.

#### Remarks

You apply the RegularExpressionAttribute attribute to a property when you need to validate values for the property against a regular expression. The regular expression enables you to specify very precisely the format of valid values. The Pattern property contains the regular expression. If the value of the property is null or an empty string (""), the value automatically passes validation for the RegularExpressionAttribute attribute. To validate that the value is not `null` or an empty string, use the **RequiredAttribute** attribute.

The regular expression searches for an exact match, not using `^` before and `$` at the end of the pattern produces the same results as using it. For a search hit, prepend and append the pattern with `.*`.

#### Examples

The following example shows how to use the `RegularExpressionAttribute` attribute to validate the FirstName and LastName data fields. The regular expression allows up to 40 uppercase and lowercase characters. The example performs the following tasks:

- Implements a metadata partial class and the associated metadata class.
- In the associated metadata class, applies the `RegularExpressionAttribute` attribute to the FirstName and LastName data fields, specifying the pattern and custom error messages.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.RegularExpressionAttribute/CS/Customer.cs._

## RegularExpressionAttribute.RegularExpressionAttribute(String) constructor

```csharp
public RegularExpressionAttribute (string pattern);
```

Initializes a new instance of the `RegularExpressionAttribute` class.

Parameters:

- `pattern`: The regular expression that is used to validate the data field value.

Exceptions:

- `ArgumentNullException`: `pattern` is `null`.

#### Examples
The following example shows how to apply the `RegularExpressionAttribute` to a data field. If validation fails, the code in the example displays the validation error message that is provided by Dynamic Data.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.RegularExpressionAttribute/CS/Customer.cs._

## RegularExpressionAttribute.MatchTimeout property

```csharp
public TimeSpan MatchTimeout { get; }
```

Gets the timeout to use when matching the regular expression pattern

Returns: To be added.

To be added.

## RegularExpressionAttribute.MatchTimeoutInMilliseconds property

```csharp
public int MatchTimeoutInMilliseconds { get; set; }
```

Gets or sets the amount of time in milliseconds to execute a single matching operation before the operation times out.

Returns: The amount of time in milliseconds to execute a single matching operation.

To be added.

## RegularExpressionAttribute.Pattern property

```csharp
public string Pattern { get; }
```

Gets the regular expression pattern.

Returns: The pattern to match.

To be added.

## RegularExpressionAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Formats the error message to display if the regular expression validation fails.

Parameters:

- `name`: The name of the field that caused the validation failure.

Returns: The formatted error message.

Exceptions:

- `InvalidOperationException`: The current attribute is ill-formed.
- `ArgumentException`: The `RegularExpressionAttribute.Pattern` is not a valid regular expression.

#### Remarks
The `RegularExpressionAttribute.FormatErrorMessage` creates the error message by using the name of the data field that caused the validation failure. You can override this method in custom validation attributes to customize how errors are created or to provide a more complex message that contains parameters that you evaluate at run time.

## RegularExpressionAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## RegularExpressionAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Checks whether the value entered by the user matches the regular expression pattern.

Parameters:

- `value`: The data field value to validate.

Returns: `true` if validation is successful; otherwise, `false`.

Exceptions:

- `ValidationException`: The data field value did not match the regular expression pattern.
- `InvalidOperationException`: The current attribute is ill-formed.
- `ArgumentException`: `RegularExpressionAttribute.Pattern` is not a valid regular expression.

This override performs the specific regular expression matching of `value` field.
