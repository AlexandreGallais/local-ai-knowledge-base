# Predicate interface (java.util.function)

```java
public interface Predicate<T>
```

Represents a predicate (boolean-valued function) of one argument.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #test(Object)}.

@param <T> the type of the input to the predicate

@since 1.8

## Predicate.test(T)

```java
boolean test(T t)
```

Evaluates this predicate on the given argument.

@param t the input argument
@return {@code true} if the input argument matches the predicate,
otherwise {@code false}

## Predicate.and(Predicate<? super T>)

```java
default Predicate<T> and(Predicate<? super T> other)
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

## Predicate.negate()

```java
default Predicate<T> negate()
```

Returns a predicate that represents the logical negation of this
predicate.

@return a predicate that represents the logical negation of this
predicate

## Predicate.or(Predicate<? super T>)

```java
default Predicate<T> or(Predicate<? super T> other)
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

## Predicate.isEqual(Object)

```java
static <T> Predicate<T> isEqual(Object targetRef)
```

Returns a predicate that tests if two arguments are equal according
to {@link Objects#equals(Object, Object)}.

@param <T> the type of arguments to the predicate
@param targetRef the object reference with which to compare for equality,
              which may be {@code null}
@return a predicate that tests if two arguments are equal according
to {@link Objects#equals(Object, Object)}

## Predicate.not(Predicate<? super T>)

```java
static <T> Predicate<T> not(Predicate<? super T> target)
```

Returns a predicate that is the negation of the supplied predicate.
This is accomplished by returning result of the calling
{@code target.negate()}.

@param <T>     the type of arguments to the specified predicate
@param target  predicate to negate

@return a predicate that negates the results of the supplied
        predicate

@throws NullPointerException if target is null

@since 11