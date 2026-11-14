# AnnotatedArrayType interface (java.lang.reflect)

```java
public interface AnnotatedArrayType extends AnnotatedType
```

{@code AnnotatedArrayType} represents the potentially annotated use of an
array type, whose component type may itself represent the annotated use of a
type.

@jls 10.1 Array Types
@since 1.8

## AnnotatedArrayType.getAnnotatedGenericComponentType()

```java
AnnotatedType getAnnotatedGenericComponentType()
```

Returns the potentially annotated generic component type of this array type.

@return the potentially annotated generic component type of this array type
@see GenericArrayType#getGenericComponentType()

## AnnotatedArrayType.getAnnotatedOwnerType()

```java
AnnotatedType getAnnotatedOwnerType()
```

Returns the potentially annotated type that this type is a member of, if
this type represents a nested class or interface. For example, if this
type is {@code @TA O<T>.I<S>}, return a representation of {@code @TA O<T>}.

<p>Returns {@code null} for an {@code AnnotatedType} that is an instance
    of {@code AnnotatedArrayType}.

@return {@code null}

@since 9