# ToLongFunction interface (java.util.function)

```java
public interface ToLongFunction<T>
```

Represents a function that produces a long-valued result.  This is the
{@code long}-producing primitive specialization for {@link Function}.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #applyAsLong(Object)}.

@param <T> the type of the input to the function

@see Function
@since 1.8

## ToLongFunction.applyAsLong(T)

```java
long applyAsLong(T value)
```

Applies this function to the given argument.

@param value the function argument
@return the function result