---
title: "Syntax used by DebugView property"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/advanced-topics/expression-trees/debugview-syntax.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DebugView syntax

The **DebugView** property (available only when debugging) provides a string rendering of expression trees. Most of the syntax is fairly straightforward to understand; the special cases are described in the following sections.

Each example is followed by a block comment, containing the **DebugView**.

## ParameterExpression

`System.Linq.Expressions.ParameterExpression` variable names are displayed with a `$` symbol at the beginning.

If a parameter doesn't have a name, it's assigned an automatically generated name, such as `$var1` or `$var2`.

```csharp
ParameterExpression numParam =  Expression.Parameter(typeof(int), "num");
/*
    $num
*/

ParameterExpression numParam =  Expression.Parameter(typeof(int));
/*
    $var1
*/
```

## ConstantExpression

For `System.Linq.Expressions.ConstantExpression` objects that represent integer values, strings, and `null`, the value of the constant is displayed.

For numeric types that have standard suffixes as C# literals, the suffix is added to the value. The following table shows the suffixes associated with various numeric types.

| Type                                               | Keyword                                                                           | Suffix |
|----------------------------------------------------|-----------------------------------------------------------------------------------|--------|
| `System.UInt32`  | uint          | U      |
| `System.Int64`   | long          | L      |
| `System.UInt64`  | ulong         | UL     |
| `System.Double`  | double  | D      |
| `System.Single`  | float   | F      |
| `System.Decimal` | decimal | M      |

```csharp
int num = 10;
ConstantExpression expr = Expression.Constant(num);
/*
    10
*/

double num = 10;
ConstantExpression expr = Expression.Constant(num);
/*
    10D
*/
```

## BlockExpression

If the type of a `System.Linq.Expressions.BlockExpression` object differs from the type of the last expression in the block, the type is displayed within angle brackets (`<` and `>`). Otherwise, the type of the `System.Linq.Expressions.BlockExpression` object isn't displayed.

```csharp
BlockExpression block = Expression.Block(Expression.Constant("test"));
/*
    .Block() {
        "test"
    }
*/

BlockExpression block =  Expression.Block(typeof(Object), Expression.Constant("test"));
/*
    .Block<System.Object>() {
        "test"
    }
*/
```

## LambdaExpression

`System.Linq.Expressions.LambdaExpression` objects are displayed together with their delegate types.

If a lambda expression doesn't have a name, it's assigned an automatically generated name, such as `#Lambda1` or `#Lambda2`.

```csharp
LambdaExpression lambda =  Expression.Lambda<Func<int>>(Expression.Constant(1));
/*
    .Lambda #Lambda1<System.Func'1[System.Int32]>() {
        1
    }
*/

LambdaExpression lambda =  Expression.Lambda<Func<int>>(Expression.Constant(1), "SampleLambda", null);
/*
    .Lambda #SampleLambda<System.Func'1[System.Int32]>() {
        1
    }
*/
```

## LabelExpression

If you specify a default value for the `System.Linq.Expressions.LabelExpression` object, this value is displayed before the `System.Linq.Expressions.LabelTarget` object.

The `.Label` token indicates the start of the label. The `.LabelTarget` token indicates the destination of the target to jump to.

If a label doesn't have a name, it's assigned an automatically generated name, such as `#Label1` or `#Label2`.

```csharp
LabelTarget target = Expression.Label(typeof(int), "SampleLabel");
BlockExpression block = Expression.Block(
    Expression.Goto(target, Expression.Constant(0)),
    Expression.Label(target, Expression.Constant(-1))
);
/*
    .Block() {
        .Goto SampleLabel { 0 };
        .Label
            -1
        .LabelTarget SampleLabel:
    }
*/

LabelTarget target = Expression.Label();
BlockExpression block = Expression.Block(
    Expression.Goto(target),
    Expression.Label(target)
);
/*
    .Block() {
        .Goto #Label1 { };
        .Label
        .LabelTarget #Label1:
    }
*/
```

## Checked Operators

Checked operators are displayed with the `#` symbol in front of the operator. For example, the checked addition operator is displayed as `#+`.

```csharp
Expression expr = Expression.AddChecked( Expression.Constant(1), Expression.Constant(2));
/*
    1 #+ 2
*/

Expression expr = Expression.ConvertChecked( Expression.Constant(10.0), typeof(int));
/*
    #(System.Int32)10D
*/
```
