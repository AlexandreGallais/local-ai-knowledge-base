# ToLongBiFunction interface (java.util.function)

```java
public interface ToLongBiFunction<T, U>
```

Represents a function that accepts two arguments and produces a long-valued
result.  This is the {@code long}-producing primitive specialization for
{@link BiFunction}.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #applyAsLong(Object, Object)}.

@param <T> the type of the first argument to the function
@param <U> the type of the second argument to the function

@see BiFunction
@since 1.8

## ToLongBiFunction.applyAsLong(T, U)

```java
long applyAsLong(T t, U u)
```

Applies this function to the given arguments.

@param t the first function argument
@param u the second function argument
@return the function result