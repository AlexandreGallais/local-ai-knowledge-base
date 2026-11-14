# DoubleBinaryOperator interface (java.util.function)

```java
public interface DoubleBinaryOperator
```

Represents an operation upon two {@code double}-valued operands and producing a
{@code double}-valued result.   This is the primitive type specialization of
{@link BinaryOperator} for {@code double}.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #applyAsDouble(double, double)}.

@see BinaryOperator
@see DoubleUnaryOperator
@since 1.8

## DoubleBinaryOperator.applyAsDouble(double, double)

```java
double applyAsDouble(double left, double right)
```

Applies this operator to the given operands.

@param left the first operand
@param right the second operand
@return the operator result