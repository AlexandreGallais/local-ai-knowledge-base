---
title: "Expression class (part 17 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 17 of 32)

## Expression.ListBind(MemberInfo, ElementInit>) method

```csharp
public static System.Linq.Expressions.MemberListBinding ListBind (System.Reflection.MemberInfo member, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ElementInit> initializers);
```

Creates a `MemberListBinding` where the member is a field or property.

Parameters:

- `member`: A `MemberInfo` that represents a field or property to set the `MemberBinding.Member` property equal to.
- `initializers`: An `IEnumerable<T>` that contains `ElementInit` objects to use to populate the `MemberListBinding.Initializers` collection.

Returns: A `MemberListBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.ListBinding` and the `MemberBinding.Member` and `MemberListBinding.Initializers` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `member` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `member` does not represent a field or property.

-or-

The `FieldInfo.FieldType` or `PropertyInfo.PropertyType` of the field or property that `member` represents does not implement `IEnumerable`.

To be added.

## Expression.ListBind(MemberInfo, ElementInit[]) method

```csharp
public static System.Linq.Expressions.MemberListBinding ListBind (System.Reflection.MemberInfo member, params System.Linq.Expressions.ElementInit[] initializers);
```

Creates a `MemberListBinding` where the member is a field or property.

Parameters:

- `member`: A `MemberInfo` that represents a field or property to set the `MemberBinding.Member` property equal to.
- `initializers`: An array of `ElementInit` objects to use to populate the `MemberListBinding.Initializers` collection.

Returns: A `MemberListBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.ListBinding` and the `MemberBinding.Member` and `MemberListBinding.Initializers` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `member` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `member` does not represent a field or property.

-or-

The `FieldInfo.FieldType` or `PropertyInfo.PropertyType` of the field or property that `member` represents does not implement `IEnumerable`.

To be added.

## Expression.ListBind(MethodInfo, ElementInit>) method

```csharp
public static System.Linq.Expressions.MemberListBinding ListBind (System.Reflection.MethodInfo propertyAccessor, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ElementInit> initializers);
```

Creates a `MemberListBinding` based on a specified property accessor method.

Parameters:

- `propertyAccessor`: A `MethodInfo` that represents a property accessor method.
- `initializers`: An `IEnumerable<T>` that contains `ElementInit` objects to use to populate the `MemberListBinding.Initializers` collection.

Returns: A `MemberListBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.ListBinding`, the `MemberBinding.Member` property set to the `MemberInfo` that represents the property accessed in `propertyAccessor`, and `MemberListBinding.Initializers` populated with the elements of `initializers`.

Exceptions:

- `ArgumentNullException`: `propertyAccessor` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `propertyAccessor` does not represent a property accessor method.

-or-

The `PropertyInfo.PropertyType` of the property that the method represented by `propertyAccessor` accesses does not implement `IEnumerable`.

To be added.

## Expression.ListBind(MethodInfo, ElementInit[]) method

```csharp
public static System.Linq.Expressions.MemberListBinding ListBind (System.Reflection.MethodInfo propertyAccessor, params System.Linq.Expressions.ElementInit[] initializers);
```

Creates a `MemberListBinding` object based on a specified property accessor method.

Parameters:

- `propertyAccessor`: A `MethodInfo` that represents a property accessor method.
- `initializers`: An array of `ElementInit` objects to use to populate the `MemberListBinding.Initializers` collection.

Returns: A `MemberListBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.ListBinding`, the `MemberBinding.Member` property set to the `MemberInfo` that represents the property accessed in `propertyAccessor`, and `MemberListBinding.Initializers` populated with the elements of `initializers`.

Exceptions:

- `ArgumentNullException`: `propertyAccessor` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `propertyAccessor` does not represent a property accessor method.

-or-

The `PropertyInfo.PropertyType` of the property that the method represented by `propertyAccessor` accesses does not implement `IEnumerable`.

To be added.

## Expression.ListInit(NewExpression, ElementInit>) method

```csharp
public static System.Linq.Expressions.ListInitExpression ListInit (System.Linq.Expressions.NewExpression newExpression, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ElementInit> initializers);
```

Creates a `ListInitExpression` that uses specified `ElementInit` objects to initialize a collection.

Parameters:

- `newExpression`: A `NewExpression` to set the `ListInitExpression.NewExpression` property equal to.
- `initializers`: An `IEnumerable<T>` that contains `ElementInit` objects to use to populate the `ListInitExpression.Initializers` collection.

Returns: A `ListInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ListInit` and the `ListInitExpression.NewExpression` and `ListInitExpression.Initializers` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `newExpression` or `initializers` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `newExpression`.Type does not implement `IEnumerable`.

#### Remarks
The `Type` property of `newExpression` must represent a type that implements `IEnumerable`.

The `Type` property of the resulting `ListInitExpression` is equal to `newExpression`.Type.

#### Examples
The following example demonstrates how to use the `ListInit` method to create a `ListInitExpression` that represents the initialization of a new dictionary instance with two key-value pairs.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.ListInit(NewExpression, Expression>) method

```csharp
public static System.Linq.Expressions.ListInitExpression ListInit (System.Linq.Expressions.NewExpression newExpression, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> initializers);
```

Creates a `ListInitExpression` that uses a method named "Add" to add elements to a collection.

Parameters:

- `newExpression`: A `NewExpression` to set the `ListInitExpression.NewExpression` property equal to.
- `initializers`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `ListInitExpression.Initializers` collection.

Returns: A `ListInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ListInit` and the `ListInitExpression.NewExpression` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `newExpression` or `initializers` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `newExpression`.Type does not implement `IEnumerable`.
- `InvalidOperationException`: There is no instance method named "Add" (case insensitive) declared in `newExpression`.Type or its base type.

-or-

The add method on `newExpression`.Type or its base type does not take exactly one argument.

-or-

The type represented by the `Expression.Type` property of the first element of `initializers` is not assignable to the argument type of the add method on `newExpression`.Type or its base type.

-or-

More than one argument-compatible method named "Add" (case-insensitive) exists on `newExpression`.Type and/or its base type.

#### Remarks
The `Type` property of `newExpression` must represent a type that implements `IEnumerable`.

In order to use this overload of `ListInit`, `newExpression`.Type or its base type must declare a single method named "Add" (case insensitive) that takes exactly one argument. The type of the argument must be assignable from the type represented by the `Type` property of the first element of `initializers`.

The `Initializers` property of the returned `ListInitExpression` contains one element of type `ElementInit` for each element of `initializers`. The `Arguments` property of each element of `ListInitExpression.Initializers` is a singleton collection that contains the corresponding element of `initializers`. The `AddMethod` property of each element of `ListInitExpression.Initializers` represents the add method that was discovered on `newExpression`.Type or its base type.

The `Type` property of the resulting `ListInitExpression` is equal to `newExpression`.Type.

## Expression.ListInit(NewExpression, ElementInit[]) method

```csharp
public static System.Linq.Expressions.ListInitExpression ListInit (System.Linq.Expressions.NewExpression newExpression, params System.Linq.Expressions.ElementInit[] initializers);
```

Creates a `ListInitExpression` that uses specified `ElementInit` objects to initialize a collection.

Parameters:

- `newExpression`: A `NewExpression` to set the `ListInitExpression.NewExpression` property equal to.
- `initializers`: An array of `ElementInit` objects to use to populate the `ListInitExpression.Initializers` collection.

Returns: A `ListInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ListInit` and the `ListInitExpression.NewExpression` and `ListInitExpression.Initializers` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `newExpression` or `initializers` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `newExpression`.Type does not implement `IEnumerable`.

#### Remarks
The `Type` property of `newExpression` must represent a type that implements `IEnumerable`.

The `Type` property of the resulting `ListInitExpression` is equal to `newExpression`.Type.

#### Examples
The following example demonstrates how to use the `ListInit` method to create a `ListInitExpression` that represents the initialization of a new dictionary instance with two key-value pairs.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.ListInit(NewExpression, Expression[]) method

```csharp
public static System.Linq.Expressions.ListInitExpression ListInit (System.Linq.Expressions.NewExpression newExpression, params System.Linq.Expressions.Expression[] initializers);
```

Creates a `ListInitExpression` that uses a method named "Add" to add elements to a collection.

Parameters:

- `newExpression`: A `NewExpression` to set the `ListInitExpression.NewExpression` property equal to.
- `initializers`: An array of `Expression` objects to use to populate the `ListInitExpression.Initializers` collection.

Returns: A `ListInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ListInit` and the `ListInitExpression.NewExpression` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `newExpression` or `initializers` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `newExpression`.Type does not implement `IEnumerable`.
- `InvalidOperationException`: There is no instance method named "Add" (case insensitive) declared in `newExpression`.Type or its base type.

-or-

The add method on `newExpression`.Type or its base type does not take exactly one argument.

-or-

The type represented by the `Expression.Type` property of the first element of `initializers` is not assignable to the argument type of the add method on `newExpression`.Type or its base type.

-or-

More than one argument-compatible method named "Add" (case-insensitive) exists on `newExpression`.Type and/or its base type.

#### Remarks
The `Type` property of `newExpression` must represent a type that implements `IEnumerable`.

In order to use this overload of `ListInit`, `newExpression`.Type or its base type must declare a single method named "Add" (case insensitive) that takes exactly one argument. The type of the argument must be assignable from the type represented by the `Type` property of the first element of `initializers`.

The `Initializers` property of the returned `ListInitExpression` contains one element of type `ElementInit` for each element of `initializers`. The `Arguments` property of each element of `ListInitExpression.Initializers` is a singleton collection that contains the corresponding element of `initializers`. The `AddMethod` property of each element of `ListInitExpression.Initializers` represents the add method that was discovered on `newExpression`.Type or its base type.

The `Type` property of the resulting `ListInitExpression` is equal to `newExpression`.Type.
