# AnnotatedWildcardType interface (java.lang.reflect)

```java
public interface AnnotatedWildcardType extends AnnotatedType
```

{@code AnnotatedWildcardType} represents the potentially annotated use of a
wildcard type argument, whose upper or lower bounds may themselves represent
annotated uses of types.

@jls 4.5.1 Type Arguments of Parameterized Types
@since 1.8

## AnnotatedWildcardType.getAnnotatedLowerBounds()

```java
AnnotatedType[] getAnnotatedLowerBounds()
```

Returns the potentially annotated lower bounds of this wildcard type.
If no lower bound is explicitly declared, the lower bound is the
type of null. In this case, a zero length array is returned.

@apiNote While to date a wildcard may have at most one lower
bound, callers of this method should be written to accommodate
multiple bounds.

@return the potentially annotated lower bounds of this wildcard type or
an empty array if no lower bound is explicitly declared.
@see WildcardType#getLowerBounds()

## AnnotatedWildcardType.getAnnotatedUpperBounds()

```java
AnnotatedType[] getAnnotatedUpperBounds()
```

Returns the potentially annotated upper bounds of this wildcard type.
If no upper bound is explicitly declared, the upper bound is
unannotated {@code Object}

@apiNote While to date a wildcard may have at most one upper
bound, callers of this method should be written to accommodate
multiple bounds.

@return the potentially annotated upper bounds of this wildcard type
@see WildcardType#getUpperBounds()

## AnnotatedWildcardType.getAnnotatedOwnerType()

```java
AnnotatedType getAnnotatedOwnerType()
```

Returns the potentially annotated type that this type is a member of, if
this type represents a nested type. For example, if this type is
{@code @TA O<T>.I<S>}, return a representation of {@code @TA O<T>}.

<p>Returns {@code null} for an {@code AnnotatedType} that is an instance
    of {@code AnnotatedWildcardType}.

@return {@code null}

@since 9