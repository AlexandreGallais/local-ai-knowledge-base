---
title: "ExpressionType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ExpressionType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExpressionType enum

Namespace: `System.Linq.Expressions`

```csharp
public enum ExpressionType
```

Describes the node types for the nodes of an expression tree.

#### Remarks
For more information about each enumeration value of this type, see Dynamic Language Runtime Overview.

## ExpressionType.Add field

```csharp
Add
```

An addition operation, such as `a + b`, without overflow checking, for numeric operands.

## ExpressionType.AddAssign field

```csharp
AddAssign
```

An addition compound assignment operation, such as `(a += b)`, without overflow checking, for numeric operands.

## ExpressionType.AddAssignChecked field

```csharp
AddAssignChecked
```

An addition compound assignment operation, such as `(a += b)`, with overflow checking, for numeric operands.

## ExpressionType.AddChecked field

```csharp
AddChecked
```

An addition operation, such as `(a + b)`, with overflow checking, for numeric operands.

## ExpressionType.And field

```csharp
And
```

A bitwise or logical `AND` operation, such as `(a & b)` in C# and `(a And b)` in Visual Basic.

## ExpressionType.AndAlso field

```csharp
AndAlso
```

A conditional `AND` operation that evaluates the second operand only if the first operand evaluates to `true`. It corresponds to `(a && b)` in C# and `(a AndAlso b)` in Visual Basic.

## ExpressionType.AndAssign field

```csharp
AndAssign
```

A bitwise or logical `AND` compound assignment operation, such as `(a &= b)` in C#.

## ExpressionType.ArrayIndex field

```csharp
ArrayIndex
```

An indexing operation in a one-dimensional array, such as `array[index]` in C# or `array(index)` in Visual Basic.

## ExpressionType.ArrayLength field

```csharp
ArrayLength
```

An operation that obtains the length of a one-dimensional array, such as `array.Length`.

## ExpressionType.Assign field

```csharp
Assign
```

An assignment operation, such as `(a = b)`.

## ExpressionType.Block field

```csharp
Block
```

A block of expressions.

## ExpressionType.Call field

```csharp
Call
```

A method call, such as in the `obj.sampleMethod()` expression.

## ExpressionType.Coalesce field

```csharp
Coalesce
```

A node that represents a null coalescing operation, such as `(a ?? b)` in C# or `If(a, b)` in Visual Basic.

## ExpressionType.Conditional field

```csharp
Conditional
```

A conditional operation, such as `a > b ? a : b` in C# or `If(a > b, a, b)` in Visual Basic.

## ExpressionType.Constant field

```csharp
Constant
```

A constant value.

## ExpressionType.Convert field

```csharp
Convert
```

A cast or conversion operation, such as `(SampleType)obj` in C#or `CType(obj, SampleType)` in Visual Basic. For a numeric conversion, if the converted value is too large for the destination type, no exception is thrown.

## ExpressionType.ConvertChecked field

```csharp
ConvertChecked
```

A cast or conversion operation, such as `(SampleType)obj` in C#or `CType(obj, SampleType)` in Visual Basic. For a numeric conversion, if the converted value does not fit the destination type, an exception is thrown.

## ExpressionType.DebugInfo field

```csharp
DebugInfo
```

Debugging information.

## ExpressionType.Decrement field

```csharp
Decrement
```

A unary decrement operation, such as `(a - 1)` in C# and Visual Basic. The object `a` should not be modified in place.

## ExpressionType.Default field

```csharp
Default
```

A default value.

## ExpressionType.Divide field

```csharp
Divide
```

A division operation, such as `(a / b)`, for numeric operands.

## ExpressionType.DivideAssign field

```csharp
DivideAssign
```

An division compound assignment operation, such as `(a /= b)`, for numeric operands.

## ExpressionType.Dynamic field

```csharp
Dynamic
```

A dynamic operation.

## ExpressionType.Equal field

```csharp
Equal
```

A node that represents an equality comparison, such as `(a == b)` in C# or `(a = b)` in Visual Basic.

## ExpressionType.ExclusiveOr field

```csharp
ExclusiveOr
```

A bitwise or logical `XOR` operation, such as `(a ^ b)` in C# or `(a Xor b)` in Visual Basic.

## ExpressionType.ExclusiveOrAssign field

```csharp
ExclusiveOrAssign
```

A bitwise or logical `XOR` compound assignment operation, such as `(a ^= b)` in C#.

## ExpressionType.Extension field

```csharp
Extension
```

An extension expression.

## ExpressionType.Goto field

```csharp
Goto
```

A "go to" expression, such as `goto Label` in C# or `GoTo Label` in Visual Basic.

## ExpressionType.GreaterThan field

```csharp
GreaterThan
```

A "greater than" comparison, such as `(a > b)`.

## ExpressionType.GreaterThanOrEqual field

```csharp
GreaterThanOrEqual
```

A "greater than or equal to" comparison, such as `(a >= b)`.

## ExpressionType.Increment field

```csharp
Increment
```

A unary increment operation, such as `(a + 1)` in C# and Visual Basic. The object `a` should not be modified in place.

## ExpressionType.Index field

```csharp
Index
```

An index operation or an operation that accesses a property that takes arguments.

## ExpressionType.Invoke field

```csharp
Invoke
```

An operation that invokes a delegate or lambda expression, such as `sampleDelegate.Invoke()`.

## ExpressionType.IsFalse field

```csharp
IsFalse
```

A `false` condition value.

## ExpressionType.IsTrue field

```csharp
IsTrue
```

A `true` condition value.

## ExpressionType.Label field

```csharp
Label
```

A label.

## ExpressionType.Lambda field

```csharp
Lambda
```

A lambda expression, such as `a => a + a` in C# or `Function(a) a + a` in Visual Basic.

## ExpressionType.LeftShift field

```csharp
LeftShift
```

A bitwise left-shift operation, such as `(a << b)`.

## ExpressionType.LeftShiftAssign field

```csharp
LeftShiftAssign
```

A bitwise left-shift compound assignment, such as `(a <<= b)`.

## ExpressionType.LessThan field

```csharp
LessThan
```

A "less than" comparison, such as `(a < b)`.

## ExpressionType.LessThanOrEqual field

```csharp
LessThanOrEqual
```

A "less than or equal to" comparison, such as `(a <= b)`.

## ExpressionType.ListInit field

```csharp
ListInit
```

An operation that creates a new `IEnumerable` object and initializes it from a list of elements, such as `new List<SampleType>(){ a, b, c }` in C# or `Dim sampleList = { a, b, c }` in Visual Basic.

## ExpressionType.Loop field

```csharp
Loop
```

A loop, such as `for` or `while`.

## ExpressionType.MemberAccess field

```csharp
MemberAccess
```

An operation that reads from a field or property, such as `obj.SampleProperty`.

## ExpressionType.MemberInit field

```csharp
MemberInit
```

An operation that creates a new object and initializes one or more of its members, such as `new Point { X = 1, Y = 2 }` in C# or `New Point With {.X = 1, .Y = 2}` in Visual Basic.

## ExpressionType.Modulo field

```csharp
Modulo
```

An arithmetic remainder operation, such as `(a % b)` in C# or `(a Mod b)` in Visual Basic.

## ExpressionType.ModuloAssign field

```csharp
ModuloAssign
```

An arithmetic remainder compound assignment operation, such as `(a %= b)` in C#.

## ExpressionType.Multiply field

```csharp
Multiply
```

A multiplication operation, such as `(a * b)`, without overflow checking, for numeric operands.

## ExpressionType.MultiplyAssign field

```csharp
MultiplyAssign
```

A multiplication compound assignment operation, such as `(a *= b)`, without overflow checking, for numeric operands.

## ExpressionType.MultiplyAssignChecked field

```csharp
MultiplyAssignChecked
```

A multiplication compound assignment operation, such as `(a *= b)`, that has overflow checking, for numeric operands.

## ExpressionType.MultiplyChecked field

```csharp
MultiplyChecked
```

An multiplication operation, such as `(a * b)`, that has overflow checking, for numeric operands.

## ExpressionType.Negate field

```csharp
Negate
```

An arithmetic negation operation, such as `(-a)`. The object `a` should not be modified in place.

## ExpressionType.NegateChecked field

```csharp
NegateChecked
```

An arithmetic negation operation, such as `(-a)`, that has overflow checking. The object `a` should not be modified in place.

## ExpressionType.New field

```csharp
New
```

An operation that calls a constructor to create a new object, such as `new SampleType()`.

## ExpressionType.NewArrayBounds field

```csharp
NewArrayBounds
```

An operation that creates a new array, in which the bounds for each dimension are specified, such as `new SampleType[dim1, dim2]` in C# or `New SampleType(dim1, dim2)` in Visual Basic.

## ExpressionType.NewArrayInit field

```csharp
NewArrayInit
```

An operation that creates a new one-dimensional array and initializes it from a list of elements, such as `new SampleType[]{a, b, c}` in C# or `New SampleType(){a, b, c}` in Visual Basic.

## ExpressionType.Not field

```csharp
Not
```

A bitwise complement or logical negation operation. In C#, it is equivalent to `(~a)` for integral types and to `(!a)` for Boolean values. In Visual Basic, it is equivalent to `(Not a)`. The object `a` should not be modified in place.

## ExpressionType.NotEqual field

```csharp
NotEqual
```

An inequality comparison, such as `(a != b)` in C# or `(a <> b)` in Visual Basic.

## ExpressionType.OnesComplement field

```csharp
OnesComplement
```

A ones complement operation, such as `(~a)` in C#.

## ExpressionType.Or field

```csharp
Or
```

A bitwise or logical `OR` operation, such as `(a | b)` in C# or `(a Or b)` in Visual Basic.

## ExpressionType.OrAssign field

```csharp
OrAssign
```

A bitwise or logical `OR` compound assignment, such as `(a |= b)` in C#.

## ExpressionType.OrElse field

```csharp
OrElse
```

A short-circuiting conditional `OR` operation, such as `(a || b)` in C# or `(a OrElse b)` in Visual Basic.

## ExpressionType.Parameter field

```csharp
Parameter
```

A reference to a parameter or variable that is defined in the context of the expression. For more information, see `ParameterExpression`.

## ExpressionType.PostDecrementAssign field

```csharp
PostDecrementAssign
```

A unary postfix decrement, such as `(a--)`. The object `a` should be modified in place.

## ExpressionType.PostIncrementAssign field

```csharp
PostIncrementAssign
```

A unary postfix increment, such as `(a++)`. The object `a` should be modified in place.

## ExpressionType.Power field

```csharp
Power
```

A mathematical operation that raises a number to a power, such as `(a ^ b)` in Visual Basic.

## ExpressionType.PowerAssign field

```csharp
PowerAssign
```

A compound assignment operation that raises a number to a power, such as `(a ^= b)` in Visual Basic.

## ExpressionType.PreDecrementAssign field

```csharp
PreDecrementAssign
```

A unary prefix decrement, such as `(--a)`. The object `a` should be modified in place.

## ExpressionType.PreIncrementAssign field

```csharp
PreIncrementAssign
```

A unary prefix increment, such as `(++a)`. The object `a` should be modified in place.

## ExpressionType.Quote field

```csharp
Quote
```

An expression that has a constant value of type `Expression`. A `ExpressionType.Quote` node can contain references to parameters that are defined in the context of the expression it represents.

## ExpressionType.RightShift field

```csharp
RightShift
```

A bitwise right-shift operation, such as `(a >> b)`.

## ExpressionType.RightShiftAssign field

```csharp
RightShiftAssign
```

A bitwise right-shift compound assignment operation, such as `(a >>= b)`.

## ExpressionType.RuntimeVariables field

```csharp
RuntimeVariables
```

A list of run-time variables. For more information, see `RuntimeVariablesExpression`.

## ExpressionType.Subtract field

```csharp
Subtract
```

A subtraction operation, such as `(a - b)`, without overflow checking, for numeric operands.

## ExpressionType.SubtractAssign field

```csharp
SubtractAssign
```

A subtraction compound assignment operation, such as `(a -= b)`, without overflow checking, for numeric operands.

## ExpressionType.SubtractAssignChecked field

```csharp
SubtractAssignChecked
```

A subtraction compound assignment operation, such as `(a -= b)`, that has overflow checking, for numeric operands.

## ExpressionType.SubtractChecked field

```csharp
SubtractChecked
```

An arithmetic subtraction operation, such as `(a - b)`, that has overflow checking, for numeric operands.

## ExpressionType.Switch field

```csharp
Switch
```

A switch operation, such as `switch` in C# or `Select Case` in Visual Basic.

## ExpressionType.Throw field

```csharp
Throw
```

An operation that throws an exception, such as `throw new Exception()`.

## ExpressionType.Try field

```csharp
Try
```

A `try-catch` expression.

## ExpressionType.TypeAs field

```csharp
TypeAs
```

An explicit reference or boxing conversion in which `null` is supplied if the conversion fails, such as `(obj as SampleType)` in C# or `TryCast(obj, SampleType)` in Visual Basic.

## ExpressionType.TypeEqual field

```csharp
TypeEqual
```

An exact type test.

## ExpressionType.TypeIs field

```csharp
TypeIs
```

A type test, such as `obj is SampleType` in C# or `TypeOf obj is SampleType` in Visual Basic.

## ExpressionType.UnaryPlus field

```csharp
UnaryPlus
```

A unary plus operation, such as `(+a)`. The result of a predefined unary plus operation is the value of the operand, but user-defined implementations might have unusual results.

## ExpressionType.Unbox field

```csharp
Unbox
```

An unbox value type operation, such as `unbox` and `unbox.any` instructions in MSIL.
