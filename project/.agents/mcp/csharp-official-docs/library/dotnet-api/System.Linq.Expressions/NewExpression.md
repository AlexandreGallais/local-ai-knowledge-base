---
title: "NewExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/NewExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NewExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class NewExpression : System.Linq.Expressions.Expression, System.Linq.Expressions.IArgumentProvider
```

Represents a constructor call.

#### Remarks
Use the `Expression.New` factory methods to create a `NewExpression`.

The value of the `NodeType` property of a `NewExpression` object is `New`.

#### Examples
The following example creates a `NewExpression` that represents the construction of a new instance of a dictionary object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## NewExpression.Arguments property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Arguments { get; }
```

Gets the arguments to the constructor.

Returns: A collection of `Expression` objects that represent the arguments to the constructor.

#### Remarks
The `Arguments` property is an empty collection if the constructor takes no arguments.

## NewExpression.Constructor property

```csharp
public System.Reflection.ConstructorInfo? Constructor { get; }
```

Gets the called constructor.

Returns: The `ConstructorInfo` that represents the called constructor.

To be added.

## NewExpression.Members property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Reflection.MemberInfo>? Members { get; }
```

Gets the members that can retrieve the values of the fields that were initialized with constructor arguments.

Returns: A collection of `MemberInfo` objects that represent the members that can retrieve the values of the fields that were initialized with constructor arguments.

#### Remarks
The `Members` property provides a mapping between the constructor arguments and the type members that correspond to those values. In the case of the construction of an anonymous type, this property maps the constructor arguments to the properties that are exposed by the anonymous type. This mapping information is important because the fields that are initialized by the construction of an anonymous type, or the properties that access those fields, are not discoverable through the `NewExpression.Constructor` or `NewExpression.Arguments` properties of a `NewExpression` node.

## NewExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## NewExpression.System.Linq.Expressions.IArgumentProvider.ArgumentCount property

```csharp
int System.Linq.Expressions.IArgumentProvider.ArgumentCount { get; }
```

Gets the number of arguments to the expression tree node.

Returns: The number of arguments to the expression tree node.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `NewExpression` instance is cast to an `IArgumentProvider` interface.

## NewExpression.Type property

```csharp
public override Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `NewExpression.Type` that represents the static type of the expression.

To be added.

## NewExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## NewExpression.System.Linq.Expressions.IArgumentProvider.GetArgument(Int32) method

```csharp
System.Linq.Expressions.Expression IArgumentProvider.GetArgument (int index);
```

Returns the argument at index, throwing if index is out of bounds.

Parameters:

- `index`: The index of the argument.

Returns: The argument at index, throwing if index is out of bounds.

To be added.

## NewExpression.Update(Expression>) method

```csharp
public System.Linq.Expressions.NewExpression Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `arguments`: The `NewExpression.Arguments` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
