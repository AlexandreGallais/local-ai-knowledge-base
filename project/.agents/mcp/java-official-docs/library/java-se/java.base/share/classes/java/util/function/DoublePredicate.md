# DoublePredicate interface (java.util.function)

```java
public interface DoublePredicate
```

Represents a predicate (boolean-valued function) of one {@code double}-valued
argument. This is the {@code double}-consuming primitive type specialization
of {@link Predicate}.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #test(double)}.

@see Predicate
@since 1.8

## DoublePredicate.test(double)

```java
boolean test(double value)
```

Evaluates this predicate on the given argument.

@param value the input argument
@return {@code true} if the input argument matches the predicate,
otherwise {@code false}

## DoublePredicate.and(DoublePredicate)

```java
default DoublePredicate and(DoublePredicate other)
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

## DoublePredicate.negate()

```java
default DoublePredicate negate()
```

Returns a predicate that represents the logical negation of this
predicate.

@return a predicate that represents the logical negation of this
predicate

## DoublePredicate.or(DoublePredicate)

```java
default DoublePredicate or(DoublePredicate other)
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