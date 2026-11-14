# DoubleUnaryOperator interface (java.util.function)

```java
public interface DoubleUnaryOperator
```

Represents an operation on a single {@code double}-valued operand that produces
a {@code double}-valued result.  This is the primitive type specialization of
{@link UnaryOperator} for {@code double}.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #applyAsDouble(double)}.

@see UnaryOperator
@since 1.8

## DoubleUnaryOperator.applyAsDouble(double)

```java
double applyAsDouble(double operand)
```

Applies this operator to the given operand.

@param operand the operand
@return the operator result

## DoubleUnaryOperator.compose(DoubleUnaryOperator)

```java
default DoubleUnaryOperator compose(DoubleUnaryOperator before)
```

Returns a composed operator that first applies the {@code before}
operator to its input, and then applies this operator to the result.
If evaluation of either operator throws an exception, it is relayed to
the caller of the composed operator.

@param before the operator to apply before this operator is applied
@return a composed operator that first applies the {@code before}
operator and then applies this operator
@throws NullPointerException if before is null

@see #andThen(DoubleUnaryOperator)

## DoubleUnaryOperator.andThen(DoubleUnaryOperator)

```java
default DoubleUnaryOperator andThen(DoubleUnaryOperator after)
```

Returns a composed operator that first applies this operator to
its input, and then applies the {@code after} operator to the result.
If evaluation of either operator throws an exception, it is relayed to
the caller of the composed operator.

@param after the operator to apply after this operator is applied
@return a composed operator that first applies this operator and then
applies the {@code after} operator
@throws NullPointerException if after is null

@see #compose(DoubleUnaryOperator)

## DoubleUnaryOperator.identity()

```java
static DoubleUnaryOperator identity()
```

Returns a unary operator that always returns its input argument.

@return a unary operator that always returns its input argument