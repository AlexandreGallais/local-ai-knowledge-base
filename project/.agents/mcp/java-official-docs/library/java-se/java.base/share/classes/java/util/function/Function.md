# Function interface (java.util.function)

```java
public interface Function<T, R>
```

Represents a function that accepts one argument and produces a result.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #apply(Object)}.

@param <T> the type of the input to the function
@param <R> the type of the result of the function

@since 1.8

## Function.apply(T)

```java
R apply(T t)
```

Applies this function to the given argument.

@param t the function argument
@return the function result

## Function.compose(Function<? super V, ? extends T>)

```java
default <V> Function<V, R> compose(Function<? super V, ? extends T> before)
```

Returns a composed function that first applies the {@code before}
function to its input, and then applies this function to the result.
If evaluation of either function throws an exception, it is relayed to
the caller of the composed function.

@param <V> the type of input to the {@code before} function, and to the
          composed function
@param before the function to apply before this function is applied
@return a composed function that first applies the {@code before}
function and then applies this function
@throws NullPointerException if before is null

@see #andThen(Function)

## Function.andThen(Function<? super R, ? extends V>)

```java
default <V> Function<T, V> andThen(Function<? super R, ? extends V> after)
```

Returns a composed function that first applies this function to
its input, and then applies the {@code after} function to the result.
If evaluation of either function throws an exception, it is relayed to
the caller of the composed function.

@param <V> the type of output of the {@code after} function, and of the
          composed function
@param after the function to apply after this function is applied
@return a composed function that first applies this function and then
applies the {@code after} function
@throws NullPointerException if after is null

@see #compose(Function)

## Function.identity()

```java
static <T> Function<T, T> identity()
```

Returns a function that always returns its input argument.

@param <T> the type of the input and output objects to the function
@return a function that always returns its input argument