# Consumer interface (java.util.function)

```java
public interface Consumer<T>
```

Represents an operation that accepts a single input argument and returns no
result. Unlike most other functional interfaces, {@code Consumer} is expected
to operate via side-effects.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #accept(Object)}.

@param <T> the type of the input to the operation

@since 1.8

## Consumer.accept(T)

```java
void accept(T t)
```

Performs this operation on the given argument.

@param t the input argument

## Consumer.andThen(Consumer<? super T>)

```java
default Consumer<T> andThen(Consumer<? super T> after)
```

Returns a composed {@code Consumer} that performs, in sequence, this
operation followed by the {@code after} operation. If performing either
operation throws an exception, it is relayed to the caller of the
composed operation.  If performing this operation throws an exception,
the {@code after} operation will not be performed.

@param after the operation to perform after this operation
@return a composed {@code Consumer} that performs in sequence this
operation followed by the {@code after} operation
@throws NullPointerException if {@code after} is null