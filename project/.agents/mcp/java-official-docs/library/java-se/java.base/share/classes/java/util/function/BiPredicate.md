# BiPredicate interface (java.util.function)

```java
public interface BiPredicate<T, U>
```

Represents a predicate (boolean-valued function) of two arguments.  This is
the two-arity specialization of {@link Predicate}.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #test(Object, Object)}.

@param <T> the type of the first argument to the predicate
@param <U> the type of the second argument the predicate

@see Predicate
@since 1.8

## BiPredicate.test(T, U)

```java
boolean test(T t, U u)
```

Evaluates this predicate on the given arguments.

@param t the first input argument
@param u the second input argument
@return {@code true} if the input arguments match the predicate,
otherwise {@code false}

## BiPredicate.and(BiPredicate<? super T, ? super U>)

```java
default BiPredicate<T, U> and(BiPredicate<? super T, ? super U> other)
```

Returns a composed predicate that represents a short-circuiting logical
AND of this predicate and another.  When evaluating the composed
predicate, if this predicate is {@code false}, then the {@code other}
predicate is not evaluated.

<p>Any exceptions thrown during evaluation of either predicate are relayed
to the caller; if evaluation of this predicate throws an exception, the
{@code other} predicate will not be evaluated.

@param other a predicate that will be logically-ANDed with this
             predicate
@return a composed predicate that represents the short-circuiting logical
AND of this predicate and the {@code other} predicate
@throws NullPointerException if other is null

## BiPredicate.negate()

```java
default BiPredicate<T, U> negate()
```

Returns a predicate that represents the logical negation of this
predicate.

@return a predicate that represents the logical negation of this
predicate

## BiPredicate.or(BiPredicate<? super T, ? super U>)

```java
default BiPredicate<T, U> or(BiPredicate<? super T, ? super U> other)
```

Returns a composed predicate that represents a short-circuiting logical
OR of this predicate and another.  When evaluating the composed
predicate, if this predicate is {@code true}, then the {@code other}
predicate is not evaluated.

<p>Any exceptions thrown during evaluation of either predicate are relayed
to the caller; if evaluation of this predicate throws an exception, the
{@code other} predicate will not be evaluated.

@param other a predicate that will be logically-ORed with this
             predicate
@return a composed predicate that represents the short-circuiting logical
OR of this predicate and the {@code other} predicate
@throws NullPointerException if other is null