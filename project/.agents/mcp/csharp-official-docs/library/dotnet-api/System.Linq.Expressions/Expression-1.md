---
title: "Expression<TDelegate> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression<TDelegate> class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class Expression<TDelegate> : System.Linq.Expressions.LambdaExpression
```

Represents a strongly typed lambda expression as a data structure in the form of an expression tree. This class cannot be inherited.

Parameters:

- `TDelegate`: The type of the delegate that the `Expression<T>` represents.

#### Remarks
When a lambda expression is assigned to a variable, field, or parameter whose type is `Expression<T>`, the compiler emits instructions to build an expression tree.

> **Note:**
>  A conversion from a lambda expression to type `Expression<D>` (`Expression(Of D)` in Visual Basic) exists if a conversion from the lambda expression to a delegate of type `D` exists. However, the conversion may fail, for example, if the body of the lambda expression is a block. This means that delegates and expression trees behave similarly with regard to overload resolution.

The expression tree is an in-memory data representation of the lambda expression. The expression tree makes the structure of the lambda expression transparent and explicit. You can interact with the data in the expression tree just as you can with any other data structure.

The ability to treat expressions as data structures enables APIs to receive user code in a format that can be inspected, transformed, and processed in a custom manner. For example, the LINQ to SQL data access implementation uses this facility to translate expression trees to Transact-SQL statements that can be evaluated by the database.

Many standard query operators defined in the `Queryable` class have one or more parameters of type `Expression<T>`.

The `Expression.NodeType` of an `Expression<T>` is `Lambda`.

Use the `Lambda<T>` or `Lambda<T>` method to create an `Expression<T>` object.

#### Examples
The following code example demonstrates how to represent a lambda expression both as executable code in the form of a delegate and as data in the form of an expression tree. It also demonstrates how to turn the expression tree back into executable code by using the `Expression<T>.Compile` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/ExpressionTDelegate/Overview/ExpressionT.cs._

## Expression<TDelegate>.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## Expression<TDelegate>.Compile() method

```csharp
public TDelegate Compile ();
```

Compiles the lambda expression described by the expression tree into executable code and produces a delegate that represents the lambda expression.

Returns: A delegate of type `TDelegate` that represents the compiled lambda expression described by the `Expression<T>`.

#### Remarks
The `Expression<T>.Compile` method produces a delegate of type `TDelegate` at runtime. When that delegate is executed, it has the behavior described by the semantics of the `Expression<T>`.

The `Expression<T>.Compile` method can be used to obtain the value of any expression tree. First, create a lambda expression that has the expression as its body by using the `Expression.Lambda` method. Then call `Expression<T>.Compile` to obtain a delegate, and execute the delegate to obtain the value of the expression.

#### Examples
The following code example demonstrates how `Expression<T>.Compile` is used to execute an expression tree.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/ExpressionTDelegate/Overview/ExpressionT.cs._

## Expression<TDelegate>.Compile(Boolean) method

```csharp
public TDelegate Compile (bool preferInterpretation);
```

Compiles the lambda expression described by the expression tree into interpreted or compiled code and produces a delegate that represents the lambda expression.

Parameters:

- `preferInterpretation`: `true` to indicate that the expression should be compiled to an interpreted form, if it is available; `false` otherwise.

Returns: A delegate that represents the compiled lambda expression described by the `Expression<T>`.

To be added.

## Expression<TDelegate>.Compile(DebugInfoGenerator) method

```csharp
public TDelegate Compile (System.Runtime.CompilerServices.DebugInfoGenerator debugInfoGenerator);
```

Produces a delegate that represents the lambda expression.

Parameters:

- `debugInfoGenerator`: Debugging information generator used by the compiler to mark sequence points and annotate local variables.

Returns: A delegate containing the compiled version of the lambda.

To be added.

## Expression<TDelegate>.Update(Expression, ParameterExpression>) method

```csharp
public System.Linq.Expressions.Expression<TDelegate> Update (System.Linq.Expressions.Expression body, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `body`: The `LambdaExpression.Body` property of the result.
- `parameters`: The `LambdaExpression.Parameters` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
