# MethodTransform interface (java.lang.classfile)

```java
public non-sealed interface MethodTransform extends ClassFileTransform<MethodTransform, MethodElement, MethodBuilder>
```

A transformation on streams of {@link MethodElement}.
<p>
Refer to {@link ClassFileTransform} for general guidance and caution around
the use of transforms for structures in the {@code class} file format.
<p>
A method transform can be lifted to a class transform via {@link
ClassTransform#transformingMethods(MethodTransform)}, transforming only
the {@link MethodModel} among the class members and passing all other
elements to the builders.

@see MethodModel
@see ClassBuilder#transformMethod
@since 24

## MethodTransform.ACCEPT_ALL

```java
MethodTransform ACCEPT_ALL
```

A method transform that passes all elements to the builder.

## MethodTransform.ofStateful(Supplier<MethodTransform>)

```java
static MethodTransform ofStateful(Supplier<MethodTransform> supplier)
```

Creates a stateful method transform from a {@link Supplier}.  The supplier
will be invoked for each transformation.

@param supplier a {@link Supplier} that produces a fresh transform object
                for each traversal
@return the stateful method transform

## MethodTransform.endHandler(Consumer<MethodBuilder>)

```java
static MethodTransform endHandler(Consumer<MethodBuilder> finisher)
```

Creates a method transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

@param finisher the function to call when transformation is complete
@return the method transform

## MethodTransform.dropping(Predicate<MethodElement>)

```java
static MethodTransform dropping(Predicate<MethodElement> filter)
```

Creates a method transform that passes each element through to the builder,
except for those that the supplied {@link Predicate} is true for.

@param filter the predicate that determines which elements to drop
@return the method transform

## MethodTransform.transformingCode(CodeTransform)

```java
static MethodTransform transformingCode(CodeTransform xform)
```

Creates a method transform that transforms {@link CodeModel} elements
with the supplied code transform, passing every other element through to
the builder.

@param xform the method transform
@return the class transform

## MethodTransform.andThen(MethodTransform)

```java
default MethodTransform andThen(MethodTransform t)
```

@implSpec
The default implementation returns this method transform chained with another
method transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.