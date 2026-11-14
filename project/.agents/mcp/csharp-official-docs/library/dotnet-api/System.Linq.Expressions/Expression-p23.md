---
title: "Expression class (part 23 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 23 of 32)

## Expression.NegateChecked(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression NegateChecked (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents an arithmetic negation operation that has overflow checking. The implementing method can be specified.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `method`: A `MethodInfo` to set the `UnaryExpression.Method` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.NegateChecked` and the `UnaryExpression.Operand` and `UnaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly one argument.
- `InvalidOperationException`: `method` is `null` and the unary minus operator is not defined for `expression`.Type.

-or-

`expression`.Type (or its corresponding non-nullable type if it is a nullable value type) is not assignable to the argument type of the method represented by `method`.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are false.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes one argument, it is the implementing method for the node.

- If `expression`.Type is a user-defined type that defines the unary minus operator, the `MethodInfo` that represents that operator is the implementing method.

- Otherwise, if `expression`.Type is a numeric type, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `expression`.Type is assignable to the argument type of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `expression`.Type is a nullable value type and the corresponding non-nullable value type is equal to the argument type of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`, the type of the node is `expression`.Type. If `expression`.Type is non-nullable, the node is not lifted. Otherwise, the node is lifted.

## Expression.New(ConstructorInfo) method

```csharp
public static System.Linq.Expressions.NewExpression New (System.Reflection.ConstructorInfo constructor);
```

Creates a `NewExpression` that represents calling the specified constructor that takes no arguments.

Parameters:

- `constructor`: The `ConstructorInfo` to set the `NewExpression.Constructor` property equal to.

Returns: A `NewExpression` that has the `Expression.NodeType` property equal to `ExpressionType.New` and the `NewExpression.Constructor` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `constructor` is `null`.
- `ArgumentException`: The constructor that `constructor` represents has at least one parameter.

#### Remarks
The `NewExpression.Arguments` and `NewExpression.Members` properties of the resulting `NewExpression` are empty collections. The `Type` property represents the declaring type of the constructor represented by `constructor`.

## Expression.New(Type) method

```csharp
public static System.Linq.Expressions.NewExpression New (Type type);
```

Creates a `NewExpression` that represents calling the parameterless constructor of the specified type.

Parameters:

- `type`: A `Type` that has a constructor that takes no arguments.

Returns: A `NewExpression` that has the `Expression.NodeType` property equal to `ExpressionType.New` and the `NewExpression.Constructor` property set to the `ConstructorInfo` that represents the constructor without parameters for the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: The type that `type` represents does not have a constructor without parameters.

#### Remarks
The `type` parameter must represent a type that has a constructor without parameters.

The `NewExpression.Arguments` and `NewExpression.Members` properties of the resulting `NewExpression` are empty collections. The `Type` property is equal to `type`.

#### Examples
The following example demonstrates how to use the `New` method to create a `NewExpression` that represents constructing a new instance of a dictionary object by calling the constructor without parameters.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.New(ConstructorInfo, Expression>) method

```csharp
public static System.Linq.Expressions.NewExpression New (System.Reflection.ConstructorInfo constructor, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a `NewExpression` that represents calling the specified constructor with the specified arguments.

Parameters:

- `constructor`: The `ConstructorInfo` to set the `NewExpression.Constructor` property equal to.
- `arguments`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `NewExpression.Arguments` collection.

Returns: A `NewExpression` that has the `Expression.NodeType` property equal to `ExpressionType.New` and the `NewExpression.Constructor` and `NewExpression.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `constructor` is `null`.

-or-

An element of `arguments` is `null`.
- `ArgumentException`: The `arguments` parameter does not contain the same number of elements as the number of parameters for the constructor that `constructor` represents.

-or-

The `Expression.Type` property of an element of `arguments` is not assignable to the type of the corresponding parameter of the constructor that `constructor` represents.

#### Remarks
The `arguments` parameter must contain the same number of elements as the number of parameters for the constructor represented by `constructor`. If `arguments` is `null`, it is considered empty, and the `Arguments` property of the resulting `NewExpression` is an empty collection.

The `Type` property of the resulting `NewExpression` represents the declaring type of the constructor represented by `constructor`. The `Members` property is an empty collection.

## Expression.New(ConstructorInfo, Expression[]) method

```csharp
public static System.Linq.Expressions.NewExpression New (System.Reflection.ConstructorInfo constructor, params System.Linq.Expressions.Expression[]? arguments);
```

Creates a `NewExpression` that represents calling the specified constructor with the specified arguments.

Parameters:

- `constructor`: The `ConstructorInfo` to set the `NewExpression.Constructor` property equal to.
- `arguments`: An array of `Expression` objects to use to populate the `NewExpression.Arguments` collection.

Returns: A `NewExpression` that has the `Expression.NodeType` property equal to `ExpressionType.New` and the `NewExpression.Constructor` and `NewExpression.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `constructor` is `null`.

-or-

An element of `arguments` is `null`.
- `ArgumentException`: The length of `arguments` does match the number of parameters for the constructor that `constructor` represents.

-or-

The `Expression.Type` property of an element of `arguments` is not assignable to the type of the corresponding parameter of the constructor that `constructor` represents.

#### Remarks
The `arguments` parameter must contain the same number of elements as the number of parameters for the constructor represented by `constructor`. If `arguments` is `null`, it is considered empty, and the `Arguments` property of the resulting `NewExpression` is an empty collection.

The `Type` property of the resulting `NewExpression` represents the declaring type of the constructor represented by `constructor`. The `Members` property is an empty collection.

## Expression.New(ConstructorInfo, Expression>, MemberInfo>) method

```csharp
public static System.Linq.Expressions.NewExpression New (System.Reflection.ConstructorInfo constructor, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments, System.Collections.Generic.IEnumerable<System.Reflection.MemberInfo>? members);
```

Creates a `NewExpression` that represents calling the specified constructor with the specified arguments. The members that access the constructor initialized fields are specified.

Parameters:

- `constructor`: The `ConstructorInfo` to set the `NewExpression.Constructor` property equal to.
- `arguments`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `NewExpression.Arguments` collection.
- `members`: An `IEnumerable<T>` that contains `MemberInfo` objects to use to populate the `NewExpression.Members` collection.

Returns: A `NewExpression` that has the `Expression.NodeType` property equal to `ExpressionType.New` and the `NewExpression.Constructor`, `NewExpression.Arguments` and `NewExpression.Members` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `constructor` is `null`.

-or-

An element of `arguments` is `null`.

-or-

An element of `members` is `null`.
- `ArgumentException`: The `arguments` parameter does not contain the same number of elements as the number of parameters for the constructor that `constructor` represents.

-or-

The `Expression.Type` property of an element of `arguments` is not assignable to the type of the corresponding parameter of the constructor that `constructor` represents.

-or-

The `members` parameter does not have the same number of elements as `arguments`.

-or-

An element of `arguments` has a `Expression.Type` property that represents a type that is not assignable to the type of the member that is represented by the corresponding element of `members`.

#### Remarks
The `arguments` parameter must contain the same number of elements as the number of parameters for the constructor represented by `constructor`. If `arguments` is `null`, it is considered empty, and the `Arguments` property of the resulting `NewExpression` is an empty collection.

If `members` is `null`, the `Members` property of the resulting `NewExpression` is an empty collection. If `members` is not `null`, it must have the same number of elements as `arguments` and each element must not be `null`. Each element of `members` must be a `PropertyInfo`, `FieldInfo` or `MethodInfo` that represents an instance member on the declaring type of the constructor represented by `constructor`. If it represents a property, the property must have a `get` accessor. The corresponding element of `arguments` for each element of `members` must have a `Type` property that represents a type that is assignable to the type of the member that the `members` element represents.

The `Type` property of the resulting `NewExpression` represents the declaring type of the constructor that `constructor` represents.

## Expression.New(ConstructorInfo, Expression>, MemberInfo[]) method

```csharp
public static System.Linq.Expressions.NewExpression New (System.Reflection.ConstructorInfo constructor, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments, params System.Reflection.MemberInfo[]? members);
```

Creates a `NewExpression` that represents calling the specified constructor with the specified arguments. The members that access the constructor initialized fields are specified as an array.

Parameters:

- `constructor`: The `ConstructorInfo` to set the `NewExpression.Constructor` property equal to.
- `arguments`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `NewExpression.Arguments` collection.
- `members`: An array of `MemberInfo` objects to use to populate the `NewExpression.Members` collection.

Returns: A `NewExpression` that has the `Expression.NodeType` property equal to `ExpressionType.New` and the `NewExpression.Constructor`, `NewExpression.Arguments` and `NewExpression.Members` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `constructor` is `null`.

-or-

An element of `arguments` is `null`.

-or-

An element of `members` is `null`.
- `ArgumentException`: The `arguments` parameter does not contain the same number of elements as the number of parameters for the constructor that `constructor` represents.

-or-

The `Expression.Type` property of an element of `arguments` is not assignable to the type of the corresponding parameter of the constructor that `constructor` represents.

-or-

The `members` parameter does not have the same number of elements as `arguments`.

-or-

An element of `arguments` has a `Expression.Type` property that represents a type that is not assignable to the type of the member that is represented by the corresponding element of `members`.

#### Remarks
The `arguments` parameter must contain the same number of elements as the number of parameters for the constructor represented by `constructor`. If `arguments` is `null`, it is considered empty, and the `Arguments` property of the resulting `NewExpression` is an empty collection.

If `members` is `null`, the `Members` property of the resulting `NewExpression` is an empty collection. If `members` is not `null`, it must have the same number of elements as `arguments` and each element must not be `null`. Each element of `members` must be a `PropertyInfo`, `FieldInfo` or `MethodInfo` that represents an instance member on the declaring type of the constructor represented by `constructor`. If it represents a property, the property must be able to retrieve the value of the associated field. The corresponding element of `arguments` for each element of `members` must have a `Type` property that represents a type that is assignable to the type of the member that the `members` element represents.

The `Type` property of the resulting `NewExpression` represents the declaring type of the constructor that `constructor` represents.
