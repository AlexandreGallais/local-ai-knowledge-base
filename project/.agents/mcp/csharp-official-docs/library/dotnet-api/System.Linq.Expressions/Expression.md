---
title: "Expression class (part 1 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class

Namespace: `System.Linq.Expressions`

```csharp
public abstract class Expression
```

Provides the base class from which the classes that represent expression tree nodes are derived. It also contains `static` (`Shared` in Visual Basic) factory methods to create the various node types. This is an `abstract` class.

#### Examples
The following code example shows how to create a block expression. The block expression consists of two `MethodCallExpression` objects and one `ConstantExpression` object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Expression() constructor

```csharp
protected Expression ();
```

Constructs a new instance of `Expression`.

To be added.

## Expression.Expression(ExpressionType, Type) constructor

```csharp
protected Expression (System.Linq.Expressions.ExpressionType nodeType, Type type);
```

Initializes a new instance of the `Expression` class.

Parameters:

- `nodeType`: The `ExpressionType` to set as the node type.
- `type`: The `Expression.Type` of this `Expression`.

To be added.

## Expression.CanReduce property

```csharp
public virtual bool CanReduce { get; }
```

Indicates that the node can be reduced to a simpler node. If this returns true, Reduce() can be called to produce the reduced form.

Returns: `true` if the node can be reduced; otherwise, `false`.

To be added.

## Expression.NodeType property

```csharp
public virtual System.Linq.Expressions.ExpressionType NodeType { get; }
```

Gets the node type of this `Expression`.

Returns: One of the `ExpressionType` values.

#### Remarks
The `NodeType` property provides a more specialized description of an `Expression` than just its derived type. For example, a `BinaryExpression` can be used to represent many different kinds of binary expressions, such as a division operation or a "greater than" operation. The `NodeType` property would describe these binary expressions as `Divide` and `GreaterThan`, respectively.

The static CLR type of the expression that the `Expression` object represents is represented by the `Type` property.

## Expression.Type property

```csharp
public virtual Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `Type` that represents the static type of the expression.

#### Remarks
The `Expression.NodeType` is the type of the expression tree node, whereas the `Expression.Type` represents the static common language runtime (CLR) type of the expression that the node represents. For example, two nodes with different node types can have the same `Expression.Type`, as shown in the following code example.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Accept(ExpressionVisitor) method

```csharp
protected internal virtual System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## Expression.Add(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Add (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an arithmetic addition operation that does not have overflow checking.

Parameters:

- `left`: A `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: A `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Add` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The addition operator is not defined for `left`.Type and `right`.Type.

The `Expression.Add` method returns a `BinaryExpression` that has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing method

The following rules determine the selected implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the addition operator, the `MethodInfo` that represents that method is the implementing method.
- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node type and lifted versus non-lifted

If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.
- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.
- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined addition operator.
- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined addition operator.

The following code example shows how to create an expression that adds two integers.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Add(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression Add (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an arithmetic addition operation that does not have overflow checking. The implementing method can be specified.

Parameters:

- `left`: A `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: A `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Add` and the `BinaryExpression.Left`, `BinaryExpression.Right` and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the addition operator is not defined for `left`.Type and `right`.Type.

The `Expression.Add` method returns a `BinaryExpression` that has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing method

The following rules determine the selected implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the addition operator, the `MethodInfo` that represents that method is the implementing method.
- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node type and lifted versus non-lifted

If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.
- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.
- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined addition operator.
- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined addition operator.

## Expression.AddAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression AddAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an addition assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AddAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

#### Examples
The following code example shows how to create an expression that adds a value to an integer variable and then assigns the result of the operation to the variable.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.AddAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression AddAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an addition assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AddAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.AddAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression AddAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents an addition assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AddAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.

## Expression.AddAssignChecked(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression AddAssignChecked (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an addition assignment operation that has overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AddAssignChecked` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.AddAssignChecked(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression AddAssignChecked (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an addition assignment operation that has overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AddAssignChecked` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.
