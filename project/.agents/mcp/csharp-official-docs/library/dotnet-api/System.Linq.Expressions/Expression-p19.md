---
title: "Expression class (part 19 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 19 of 32)

## Expression.MakeDynamic(Type, CallSiteBinder, Expression[]) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, params System.Linq.Expressions.Expression[]? arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## Expression.MakeDynamic(Type, CallSiteBinder, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and two arguments.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## Expression.MakeDynamic(Type, CallSiteBinder, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and three arguments.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## Expression.MakeDynamic(Type, CallSiteBinder, Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and four arguments.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.
- `arg3`: The fourth argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## Expression.MakeGoto(GotoExpressionKind, LabelTarget, Expression, Type) method

```csharp
public static System.Linq.Expressions.GotoExpression MakeGoto (System.Linq.Expressions.GotoExpressionKind kind, System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? value, Type type);
```

Creates a `GotoExpression` representing a jump of the specified `GotoExpressionKind`. The value passed to the label upon jumping can also be specified.

Parameters:

- `kind`: The `GotoExpressionKind` of the `GotoExpression`.
- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `value`: The value that will be passed to the associated label upon jumping.
- `type`: An `Type` to set the `Expression.Type` property equal to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to `kind`, the `GotoExpression.Target` property set to `target`, the `Expression.Type` property set to `type`, and `value` to be passed to the target label upon jumping.

To be added.

## Expression.MakeIndex(Expression, PropertyInfo, Expression>) method

```csharp
public static System.Linq.Expressions.IndexExpression MakeIndex (System.Linq.Expressions.Expression instance, System.Reflection.PropertyInfo? indexer, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates an `IndexExpression` that represents accessing an indexed property in an object.

Parameters:

- `instance`: The object to which the property belongs. It should be null if the property is `static` (`shared` in Visual Basic).
- `indexer`: An `Expression` representing the property to index.
- `arguments`: An `IEnumerable<Expression>` (`IEnumerable (Of Expression)` in Visual Basic) that contains the arguments that will be used to index the property.

Returns: The created `IndexExpression`.

To be added.

## Expression.MakeMemberAccess(Expression, MemberInfo) method

```csharp
public static System.Linq.Expressions.MemberExpression MakeMemberAccess (System.Linq.Expressions.Expression? expression, System.Reflection.MemberInfo member);
```

Creates a `MemberExpression` that represents accessing either a field or a property.

Parameters:

- `expression`: An `Expression` that represents the object that the member belongs to. This can be null for static members.
- `member`: The `MemberInfo` that describes the field or property to be accessed.

Returns: The `MemberExpression` that results from calling the appropriate factory method.

Exceptions:

- `ArgumentNullException`: `member` is `null`.
- `ArgumentException`: `member` does not represent a field or property.

#### Remarks
This method can be used to create a `MemberExpression` that represents accessing either a field or a property, depending on the type of `member`. If `member` is of type `FieldInfo`, this method calls `Expression.Field` to create the `MemberExpression`. If `member` is of type `PropertyInfo`, this method calls `Expression.Property` to create the `MemberExpression`.

## Expression.MakeTry(Type, Expression, Expression, Expression, CatchBlock>) method

```csharp
public static System.Linq.Expressions.TryExpression MakeTry (Type? type, System.Linq.Expressions.Expression body, System.Linq.Expressions.Expression? finally, System.Linq.Expressions.Expression? fault, System.Collections.Generic.IEnumerable<System.Linq.Expressions.CatchBlock>? handlers);
```

Creates a `TryExpression` representing a try block with the specified elements.

Parameters:

- `type`: The result type of the try expression. If null, body and all handlers must have identical type.
- `body`: The body of the try block.
- `finally`: The body of the finally block. Pass null if the try block has no finally block associated with it.
- `fault`: The body of the fault block. Pass null if the try block has no fault block associated with it.
- `handlers`: A collection of `CatchBlock`s representing the catch statements to be associated with the try block.

Returns: The created `TryExpression`.

To be added.

## Expression.MakeUnary(ExpressionType, Expression, Type) method

```csharp
public static System.Linq.Expressions.UnaryExpression MakeUnary (System.Linq.Expressions.ExpressionType unaryType, System.Linq.Expressions.Expression operand, Type type);
```

Creates a `UnaryExpression`, given an operand, by calling the appropriate factory method.

Parameters:

- `unaryType`: The `ExpressionType` that specifies the type of unary operation.
- `operand`: An `Expression` that represents the operand.
- `type`: The `Type` that specifies the type to be converted to (pass `null` if not applicable).

Returns: The `UnaryExpression` that results from calling the appropriate factory method.

Exceptions:

- `ArgumentNullException`: `operand` is `null`.
- `ArgumentException`: `unaryType` does not correspond to a unary expression node.

#### Remarks
The `unaryType` parameter determines which `UnaryExpression` factory method this method calls. For example, if `unaryType` is equal to `Convert`, this method invokes `Expression.Convert`. The `type`parameter is ignored if it does not apply to the factory method that is called.

## Expression.MakeUnary(ExpressionType, Expression, Type, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression MakeUnary (System.Linq.Expressions.ExpressionType unaryType, System.Linq.Expressions.Expression operand, Type type, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression`, given an operand and implementing method, by calling the appropriate factory method.

Parameters:

- `unaryType`: The `ExpressionType` that specifies the type of unary operation.
- `operand`: An `Expression` that represents the operand.
- `type`: The `Type` that specifies the type to be converted to (pass `null` if not applicable).
- `method`: The `MethodInfo` that represents the implementing method.

Returns: The `UnaryExpression` that results from calling the appropriate factory method.

Exceptions:

- `ArgumentNullException`: `operand` is `null`.
- `ArgumentException`: `unaryType` does not correspond to a unary expression node.

#### Remarks
The `unaryType` parameter determines which `UnaryExpression` factory method this method calls. For example, if `unaryType` is equal to `Convert`, this method invokes `Expression.Convert`. The `type` and `method` parameters are ignored if they do not apply to the factory method that is called.

## Expression.MemberBind(MemberInfo, MemberBinding>) method

```csharp
public static System.Linq.Expressions.MemberMemberBinding MemberBind (System.Reflection.MemberInfo member, System.Collections.Generic.IEnumerable<System.Linq.Expressions.MemberBinding> bindings);
```

Creates a `MemberMemberBinding` that represents the recursive initialization of members of a field or property.

Parameters:

- `member`: The `MemberInfo` to set the `MemberBinding.Member` property equal to.
- `bindings`: An `IEnumerable<T>` that contains `MemberBinding` objects to use to populate the `MemberMemberBinding.Bindings` collection.

Returns: A `MemberMemberBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.MemberBinding` and the `MemberBinding.Member` and `MemberMemberBinding.Bindings` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `member` or `bindings` is `null`.
- `ArgumentException`: `member` does not represent a field or property.

-or-

The `MemberBinding.Member` property of an element of `bindings` does not represent a member of the type of the field or property that `member` represents.

#### Remarks
The `member` parameter must represent a field or property.

## Expression.MemberBind(MemberInfo, MemberBinding[]) method

```csharp
public static System.Linq.Expressions.MemberMemberBinding MemberBind (System.Reflection.MemberInfo member, params System.Linq.Expressions.MemberBinding[] bindings);
```

Creates a `MemberMemberBinding` that represents the recursive initialization of members of a field or property.

Parameters:

- `member`: The `MemberInfo` to set the `MemberBinding.Member` property equal to.
- `bindings`: An array of `MemberBinding` objects to use to populate the `MemberMemberBinding.Bindings` collection.

Returns: A `MemberMemberBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.MemberBinding` and the `MemberBinding.Member` and `MemberMemberBinding.Bindings` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `member` or `bindings` is `null`.
- `ArgumentException`: `member` does not represent a field or property.

-or-

The `MemberBinding.Member` property of an element of `bindings` does not represent a member of the type of the field or property that `member` represents.

#### Remarks
The `member` parameter must represent a field or property.

## Expression.MemberBind(MethodInfo, MemberBinding>) method

```csharp
public static System.Linq.Expressions.MemberMemberBinding MemberBind (System.Reflection.MethodInfo propertyAccessor, System.Collections.Generic.IEnumerable<System.Linq.Expressions.MemberBinding> bindings);
```

Creates a `MemberMemberBinding` that represents the recursive initialization of members of a member that is accessed by using a property accessor method.

Parameters:

- `propertyAccessor`: The `MethodInfo` that represents a property accessor method.
- `bindings`: An `IEnumerable<T>` that contains `MemberBinding` objects to use to populate the `MemberMemberBinding.Bindings` collection.

Returns: A `MemberMemberBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.MemberBinding`, the `MemberBinding.Member` property set to the `PropertyInfo` that represents the property accessed in `propertyAccessor`, and `MemberMemberBinding.Bindings` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `propertyAccessor` or `bindings` is `null`.
- `ArgumentException`: `propertyAccessor` does not represent a property accessor method.

-or-

The `MemberBinding.Member` property of an element of `bindings` does not represent a member of the type of the property accessed by the method that `propertyAccessor` represents.

To be added.
