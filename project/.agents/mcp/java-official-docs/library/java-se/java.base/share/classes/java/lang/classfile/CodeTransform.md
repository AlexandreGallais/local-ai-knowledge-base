# CodeTransform interface (java.lang.classfile)

```java
public non-sealed interface CodeTransform extends ClassFileTransform<CodeTransform, CodeElement, CodeBuilder>
```

A transformation on streams of {@link CodeElement}.  The stream can come
from a {@link CodeModel}, or a handler to a {@link CodeBuilder} as in
{@link CodeBuilder#transforming}.
<p>
Refer to {@link ClassFileTransform} for general guidance and caution around
the use of transforms for structures in the {@code class} file format.
<p>
A code transform can be lifted to a method or a class transform via {@link
MethodTransform#transformingCode(CodeTransform)} and {@link
ClassTransform#transformingMethodBodies(CodeTransform)}, transforming only
the {@link CodeModel} within those structures and passing all other elements
to the builders.

@see CodeModel
@see MethodBuilder#transformCode
@see CodeBuilder#transforming
@since 24

## CodeTransform.ACCEPT_ALL

```java
CodeTransform ACCEPT_ALL
```

A code transform that passes all elements to the builder.

## CodeTransform.ofStateful(Supplier<CodeTransform>)

```java
static CodeTransform ofStateful(Supplier<CodeTransform> supplier)
```

Creates a stateful code transform from a {@link Supplier}.  The supplier
will be invoked for each transformation.

@param supplier a {@link Supplier} that produces a fresh transform object
                for each traversal
@return the stateful code transform

## CodeTransform.endHandler(Consumer<CodeBuilder>)

```java
static CodeTransform endHandler(Consumer<CodeBuilder> finisher)
```

Creates a code transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

@param finisher the function to call when transformation is complete
@return the code transform

## CodeTransform.andThen(CodeTransform)

```java
default CodeTransform andThen(CodeTransform t)
```

@implSpec
The default implementation returns this code transform chained with another
code transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.