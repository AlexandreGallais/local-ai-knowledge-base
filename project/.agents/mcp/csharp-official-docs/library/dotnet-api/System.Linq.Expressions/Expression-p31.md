---
title: "Expression class (part 31 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 31 of 32)

## Expression.Switch(Expression, Expression, MethodInfo, SwitchCase[]) method

```csharp
public static System.Linq.Expressions.SwitchExpression Switch (System.Linq.Expressions.Expression switchValue, System.Linq.Expressions.Expression? defaultBody, System.Reflection.MethodInfo? comparison, params System.Linq.Expressions.SwitchCase[]? cases);
```

Creates a `SwitchExpression` that represents a `switch` statement that has a default case.

Parameters:

- `switchValue`: The value to be tested against each case.
- `defaultBody`: The result of the switch if `switchValue` does not match any of the cases.
- `comparison`: The equality comparison method to use.
- `cases`: The set of cases for this switch expression.

Returns: The created `SwitchExpression`.

To be added.

## Expression.Switch(Type, Expression, Expression, MethodInfo, SwitchCase>) method

```csharp
public static System.Linq.Expressions.SwitchExpression Switch (Type? type, System.Linq.Expressions.Expression switchValue, System.Linq.Expressions.Expression? defaultBody, System.Reflection.MethodInfo? comparison, System.Collections.Generic.IEnumerable<System.Linq.Expressions.SwitchCase>? cases);
```

Creates a `SwitchExpression` that represents a `switch` statement that has a default case.

Parameters:

- `type`: The result type of the switch.
- `switchValue`: The value to be tested against each case.
- `defaultBody`: The result of the switch if `switchValue` does not match any of the cases.
- `comparison`: The equality comparison method to use.
- `cases`: The set of cases for this switch expression.

Returns: The created `SwitchExpression`.

To be added.

## Expression.Switch(Type, Expression, Expression, MethodInfo, SwitchCase[]) method

```csharp
public static System.Linq.Expressions.SwitchExpression Switch (Type? type, System.Linq.Expressions.Expression switchValue, System.Linq.Expressions.Expression? defaultBody, System.Reflection.MethodInfo? comparison, params System.Linq.Expressions.SwitchCase[]? cases);
```

Creates a `SwitchExpression` that represents a `switch` statement that has a default case.

Parameters:

- `type`: The result type of the switch.
- `switchValue`: The value to be tested against each case.
- `defaultBody`: The result of the switch if `switchValue` does not match any of the cases.
- `comparison`: The equality comparison method to use.
- `cases`: The set of cases for this switch expression.

Returns: The created `SwitchExpression`.

To be added.

## Expression.SwitchCase(Expression, Expression>) method

```csharp
public static System.Linq.Expressions.SwitchCase SwitchCase (System.Linq.Expressions.Expression body, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> testValues);
```

Creates a `SwitchCase` object to be used in a `SwitchExpression` object.

Parameters:

- `body`: The body of the case.
- `testValues`: The test values of the case.

Returns: The created `SwitchCase`.

#### Remarks
All `SwitchCase` objects in a `SwitchExpression` object must have the same type, unless the `SwitchExpression` has the type `void`.

Each `SwitchCase` object has an implicit `break` statement, which means that there is no implicit fall through from one case label to another.

#### Examples
The following example demonstrates how to create an expression that represents a switch statement that has a default case.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.SwitchCase(Expression, Expression[]) method

```csharp
public static System.Linq.Expressions.SwitchCase SwitchCase (System.Linq.Expressions.Expression body, params System.Linq.Expressions.Expression[] testValues);
```

Creates a `SwitchCase` for use in a `SwitchExpression`.

Parameters:

- `body`: The body of the case.
- `testValues`: The test values of the case.

Returns: The created `SwitchCase`.

To be added.

## Expression.SymbolDocument(String) method

```csharp
public static System.Linq.Expressions.SymbolDocumentInfo SymbolDocument (string fileName);
```

Creates an instance of `SymbolDocumentInfo`.

Parameters:

- `fileName`: A `String` to set the `SymbolDocumentInfo.FileName` equal to.

Returns: A `SymbolDocumentInfo` that has the `SymbolDocumentInfo.FileName` property set to the specified value.

To be added.

## Expression.SymbolDocument(String, Guid) method

```csharp
public static System.Linq.Expressions.SymbolDocumentInfo SymbolDocument (string fileName, Guid language);
```

Creates an instance of `SymbolDocumentInfo`.

Parameters:

- `fileName`: A `String` to set the `SymbolDocumentInfo.FileName` equal to.
- `language`: A `Guid` to set the `SymbolDocumentInfo.Language` equal to.

Returns: A `SymbolDocumentInfo` that has the `SymbolDocumentInfo.FileName` and `SymbolDocumentInfo.Language` properties set to the specified value.

To be added.

## Expression.SymbolDocument(String, Guid, Guid) method

```csharp
public static System.Linq.Expressions.SymbolDocumentInfo SymbolDocument (string fileName, Guid language, Guid languageVendor);
```

Creates an instance of `SymbolDocumentInfo`.

Parameters:

- `fileName`: A `String` to set the `SymbolDocumentInfo.FileName` equal to.
- `language`: A `Guid` to set the `SymbolDocumentInfo.Language` equal to.
- `languageVendor`: A `Guid` to set the `SymbolDocumentInfo.LanguageVendor` equal to.

Returns: A `SymbolDocumentInfo` that has the `SymbolDocumentInfo.FileName` and `SymbolDocumentInfo.Language` and `SymbolDocumentInfo.LanguageVendor` properties set to the specified value.

To be added.

## Expression.SymbolDocument(String, Guid, Guid, Guid) method

```csharp
public static System.Linq.Expressions.SymbolDocumentInfo SymbolDocument (string fileName, Guid language, Guid languageVendor, Guid documentType);
```

Creates an instance of `SymbolDocumentInfo`.

Parameters:

- `fileName`: A `String` to set the `SymbolDocumentInfo.FileName` equal to.
- `language`: A `Guid` to set the `SymbolDocumentInfo.Language` equal to.
- `languageVendor`: A `Guid` to set the `SymbolDocumentInfo.LanguageVendor` equal to.
- `documentType`: A `Guid` to set the `SymbolDocumentInfo.DocumentType` equal to.

Returns: A `SymbolDocumentInfo` that has the `SymbolDocumentInfo.FileName` and `SymbolDocumentInfo.Language` and `SymbolDocumentInfo.LanguageVendor` and `SymbolDocumentInfo.DocumentType` properties set to the specified value.

To be added.

## Expression.Throw(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression Throw (System.Linq.Expressions.Expression? value);
```

Creates a `UnaryExpression` that represents a throwing of an exception.

Parameters:

- `value`: An `Expression`.

Returns: A `UnaryExpression` that represents the exception.

#### Examples
The following example demonstrates how to create a `TryExpression` object that uses the `Expression.Throw` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Throw(Expression, Type) method

```csharp
public static System.Linq.Expressions.UnaryExpression Throw (System.Linq.Expressions.Expression? value, Type type);
```

Creates a `UnaryExpression` that represents a throwing of an exception with a given type.

Parameters:

- `value`: An `Expression`.
- `type`: The new `Type` of the expression.

Returns: A `UnaryExpression` that represents the exception.

To be added.

## Expression.ToString() method

```csharp
public override string ToString ();
```

Returns a textual representation of the `Expression`.

Returns: A textual representation of the `Expression`.

To be added.

## Expression.TryCatch(Expression, CatchBlock[]) method

```csharp
public static System.Linq.Expressions.TryExpression TryCatch (System.Linq.Expressions.Expression body, params System.Linq.Expressions.CatchBlock[]? handlers);
```

Creates a `TryExpression` representing a try block with any number of catch statements and neither a fault nor finally block.

Parameters:

- `body`: The body of the try block.
- `handlers`: The array of zero or more `CatchBlock` expressions representing the catch statements to be associated with the try block.

Returns: The created `TryExpression`.

#### Examples
The following example demonstrates how to create a `TryExpression` object that contains a catch statement.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.TryCatchFinally(Expression, Expression, CatchBlock[]) method

```csharp
public static System.Linq.Expressions.TryExpression TryCatchFinally (System.Linq.Expressions.Expression body, System.Linq.Expressions.Expression? finally, params System.Linq.Expressions.CatchBlock[]? handlers);
```

Creates a `TryExpression` representing a try block with any number of catch statements and a finally block.

Parameters:

- `body`: The body of the try block.
- `finally`: The body of the finally block.
- `handlers`: The array of zero or more `CatchBlock` expressions representing the catch statements to be associated with the try block.

Returns: The created `TryExpression`.

#### Examples
The following example demonstrates how to create a `TryExpression` object that contains a catch statement and a finally statement.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.TryFault(Expression, Expression) method

```csharp
public static System.Linq.Expressions.TryExpression TryFault (System.Linq.Expressions.Expression body, System.Linq.Expressions.Expression? fault);
```

Creates a `TryExpression` representing a try block with a fault block and no catch statements.

Parameters:

- `body`: The body of the try block.
- `fault`: The body of the fault block.

Returns: The created `TryExpression`.

To be added.

## Expression.TryFinally(Expression, Expression) method

```csharp
public static System.Linq.Expressions.TryExpression TryFinally (System.Linq.Expressions.Expression body, System.Linq.Expressions.Expression? finally);
```

Creates a `TryExpression` representing a try block with a finally block and no catch statements.

Parameters:

- `body`: The body of the try block.
- `finally`: The body of the finally block.

Returns: The created `TryExpression`.

To be added.

## Expression.TryGetActionType(Type[], Type) method

```csharp
public static bool TryGetActionType (Type[] typeArgs, out Type? actionType);
```

Creates a `Expression.Type` object that represents a generic System.Action delegate type that has specific type arguments.

Parameters:

- `typeArgs`: An array of Type objects that specify the type arguments for the System.Action delegate type.
- `actionType`: When this method returns, contains the generic System.Action delegate type that has specific type arguments. Contains null if there is no generic System.Action delegate that matches the `typeArgs`. This parameter is passed uninitialized.

Returns: `true` if generic System.Action delegate type was created for specific `typeArgs`; otherwise, `false`.

To be added.

## Expression.TryGetFuncType(Type[], Type) method

```csharp
public static bool TryGetFuncType (Type[] typeArgs, out Type? funcType);
```

Creates a `Expression.Type` object that represents a generic System.Func delegate type that has specific type arguments. The last type argument specifies the return type of the created delegate.

Parameters:

- `typeArgs`: An array of Type objects that specify the type arguments for the System.Func delegate type.
- `funcType`: When this method returns, contains the generic System.Func delegate type that has specific type arguments. Contains null if there is no generic System.Func delegate that matches the `typeArgs`. This parameter is passed uninitialized.

Returns: `true` if generic System.Func delegate type was created for specific `typeArgs`; otherwise, `false`.

To be added.

## Expression.TypeAs(Expression, Type) method

```csharp
public static System.Linq.Expressions.UnaryExpression TypeAs (System.Linq.Expressions.Expression expression, Type type);
```

Creates a `UnaryExpression` that represents an explicit reference or boxing conversion where `null` is supplied if the conversion fails.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `type`: A `Type` to set the `Expression.Type` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.TypeAs` and the `UnaryExpression.Operand` and `Expression.Type` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `expression` or `type` is `null`.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is `null`. The `UnaryExpression.IsLifted` and `UnaryExpression.IsLiftedToNull` properties are both `false`.

#### Examples
The following example demonstrates how to use the `TypeAs` method to create a `UnaryExpression` that represents the reference conversion of a non-nullable integer expression to the nullable integer type.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.TypeEqual(Expression, Type) method

```csharp
public static System.Linq.Expressions.TypeBinaryExpression TypeEqual (System.Linq.Expressions.Expression expression, Type type);
```

Creates a `TypeBinaryExpression` that compares run-time type identity.

Parameters:

- `expression`: An `Expression` to set the `Expression` property equal to.
- `type`: A `Expression.Type` to set the `TypeBinaryExpression.TypeOperand` property equal to.

Returns: A `TypeBinaryExpression` for which the `Expression.NodeType` property is equal to `Expression.TypeEqual` and for which the `Expression` and `TypeBinaryExpression.TypeOperand` properties are set to the specified values.

To be added.

## Expression.TypeIs(Expression, Type) method

```csharp
public static System.Linq.Expressions.TypeBinaryExpression TypeIs (System.Linq.Expressions.Expression expression, Type type);
```

Creates a `TypeBinaryExpression`.

Parameters:

- `expression`: An `Expression` to set the `TypeBinaryExpression.Expression` property equal to.
- `type`: A `Expression.Type` to set the `TypeBinaryExpression.TypeOperand` property equal to.

Returns: A `TypeBinaryExpression` for which the `Expression.NodeType` property is equal to `ExpressionType.TypeIs` and for which the `TypeBinaryExpression.Expression` and `TypeBinaryExpression.TypeOperand` properties are set to the specified values.

Exceptions:

- `ArgumentNullException`: `expression` or `type` is `null`.

#### Remarks
The `Type` property of the resulting `UnaryExpression` represents `Boolean`.

#### Examples
The following example demonstrates how to use the `TypeIs` method to create a `TypeBinaryExpression` that represents a type test of a string value against the `Int32` type.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._
