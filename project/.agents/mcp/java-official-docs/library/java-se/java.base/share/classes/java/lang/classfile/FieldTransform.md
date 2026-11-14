# FieldTransform interface (java.lang.classfile)

```java
public non-sealed interface FieldTransform extends ClassFileTransform<FieldTransform, FieldElement, FieldBuilder>
```

A transformation on streams of {@link FieldElement}.
<p>
Refer to {@link ClassFileTransform} for general guidance and caution around
the use of transforms for structures in the {@code class} file format.
<p>
A field transform can be lifted to a class transform via {@link
ClassTransform#transformingFields(FieldTransform)}, transforming only
the {@link FieldModel} among the class members and passing all other elements
to the builders.

@see FieldModel
@see ClassBuilder#transformField
@since 24

## FieldTransform.ACCEPT_ALL

```java
FieldTransform ACCEPT_ALL
```

A field transform that passes all elements to the builder.

## FieldTransform.ofStateful(Supplier<FieldTransform>)

```java
static FieldTransform ofStateful(Supplier<FieldTransform> supplier)
```

Creates a stateful field transform from a {@link Supplier}.  The supplier
will be invoked for each transformation.

@param supplier a {@link Supplier} that produces a fresh transform object
                for each traversal
@return the stateful field transform

## FieldTransform.endHandler(Consumer<FieldBuilder>)

```java
static FieldTransform endHandler(Consumer<FieldBuilder> finisher)
```

Creates a field transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

@param finisher the function to call when transformation is complete
@return the field transform

## FieldTransform.dropping(Predicate<FieldElement>)

```java
static FieldTransform dropping(Predicate<FieldElement> filter)
```

Creates a field transform that passes each element through to the builder,
except for those that the supplied {@link Predicate} is true for.

@param filter the predicate that determines which elements to drop
@return the field transform

## FieldTransform.andThen(FieldTransform)

```java
default FieldTransform andThen(FieldTransform t)
```

@implSpec
The default implementation returns this field transform chained with another
field transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.