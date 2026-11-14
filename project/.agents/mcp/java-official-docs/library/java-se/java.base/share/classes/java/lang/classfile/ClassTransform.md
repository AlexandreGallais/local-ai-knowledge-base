# ClassTransform interface (java.lang.classfile)

```java
public non-sealed interface ClassTransform extends ClassFileTransform<ClassTransform, ClassElement, ClassBuilder>
```

A transformation on streams of {@link ClassElement}.
<p>
Refer to {@link ClassFileTransform} for general guidance and caution around
the use of transforms for structures in the {@code class} file format.

@see ClassModel
@see ClassFile#transformClass(ClassModel, ClassTransform)
@since 24

## ClassTransform.ACCEPT_ALL

```java
static final ClassTransform ACCEPT_ALL
```

A class transform that passes all elements to the builder.

## ClassTransform.ofStateful(Supplier<ClassTransform>)

```java
static ClassTransform ofStateful(Supplier<ClassTransform> supplier)
```

Creates a stateful class transform from a {@link Supplier}.  The supplier
will be invoked for each transformation.

@param supplier a {@link Supplier} that produces a fresh transform object
                for each traversal
@return the stateful class transform

## ClassTransform.endHandler(Consumer<ClassBuilder>)

```java
static ClassTransform endHandler(Consumer<ClassBuilder> finisher)
```

Creates a class transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

@param finisher the function to call when transformation is complete
@return the class transform

## ClassTransform.dropping(Predicate<ClassElement>)

```java
static ClassTransform dropping(Predicate<ClassElement> filter)
```

Creates a class transform that passes each element through to the builder,
except for those that the supplied {@link Predicate} returns true for.

@param filter the predicate that determines which elements to drop
@return the class transform

## ClassTransform.transformingMethods(Predicate<MethodModel>, MethodTransform)

```java
static ClassTransform transformingMethods(Predicate<MethodModel> filter, MethodTransform xform)
```

Creates a class transform that transforms {@link MethodModel} elements
with the supplied method transform for methods that the supplied {@link
Predicate} returns true for, passing other elements through to the
builder.

@param filter a predicate that determines which methods to transform
@param xform the method transform
@return the class transform

## ClassTransform.transformingMethods(MethodTransform)

```java
static ClassTransform transformingMethods(MethodTransform xform)
```

Creates a class transform that transforms {@link MethodModel} elements
with the supplied method transform, passing other elements through to the
builder.

@param xform the method transform
@return the class transform

## ClassTransform.transformingMethodBodies(Predicate<MethodModel>, CodeTransform)

```java
static ClassTransform transformingMethodBodies(Predicate<MethodModel> filter, CodeTransform xform)
```

Creates a class transform that transforms the {@link CodeAttribute} (method body)
of {@link MethodModel} elements with the supplied code transform for
methods that the supplied {@link Predicate} returns true for, passing
other elements through to the builder.

@param filter a predicate that determines which methods to transform
@param xform the code transform
@return the class transform

## ClassTransform.transformingMethodBodies(CodeTransform)

```java
static ClassTransform transformingMethodBodies(CodeTransform xform)
```

Creates a class transform that transforms the {@link CodeAttribute} (method body)
of {@link MethodModel} elements with the supplied code transform, passing
other elements through to the builder.

@param xform the code transform
@return the class transform

## ClassTransform.transformingFields(FieldTransform)

```java
static ClassTransform transformingFields(FieldTransform xform)
```

Creates a class transform that transforms {@link FieldModel} elements
with the supplied field transform, passing other elements through to the
builder.

@param xform the field transform
@return the class transform

## ClassTransform.andThen(ClassTransform)

```java
default ClassTransform andThen(ClassTransform t)
```

@implSpec
The default implementation returns this class transform chained with another
class transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.