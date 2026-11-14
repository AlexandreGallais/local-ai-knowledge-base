# ClassFileBuilder interface (java.lang.classfile)

```java
public sealed interface ClassFileBuilder<E extends ClassFileElement, B extends ClassFileBuilder<E, B>> extends Consumer<E> permits ClassBuilder, FieldBuilder, MethodBuilder, CodeBuilder
```

A builder for a {@link CompoundElement}, which accepts the member elements
to be integrated into the built structure.  Builders are usually passed as
an argument to {@link Consumer} handlers, such as in {@link
ClassFile#build(ClassDesc, Consumer)}.  The handlers should deliver elements
to a builder similar to how a {@link CompoundElement} traverses its member
elements.
<p>
The basic way a builder accepts elements is through {@link #with}, which
supports call chaining.  Concrete subtypes of builders usually define extra
methods to define elements directly to the builder, such as {@link
ClassBuilder#withFlags(int)} or {@link CodeBuilder#aload(int)}.
<p>
Whether a member element can appear multiple times in a compound structure
affects the behavior of the element in {@code ClassFileBuilder}s.  If an
element can appear at most once but multiple instances are supplied to a
{@code ClassFileBuilder}, the last supplied instance appears on the built
structure.  If an element appears exactly once but no instance is supplied,
an unspecified default value element may be used in that structure.
<p>
Due to restrictions of the {@code class} file format, certain member elements
that can be modeled by the API cannot be represented in the built structure
under specific circumstances.  Passing such elements to the builder causes
{@link IllegalArgumentException}.  Some {@link ClassFile.Option}s control
whether such elements should be altered or dropped to produce valid {@code
class} files.

@param <E> the member element type
@param <B> the self type of this builder
@see CompoundElement
@see ClassFileTransform
@sealedGraph
@since 24

## ClassFileBuilder.accept(E)

```java
default void accept(E e)
```

Integrates the member element into the structure being built.

@apiNote
This method exists to implement {@link Consumer}; users can use {@link
#with} for call chaining.

@param e the member element
@throws IllegalArgumentException if the member element cannot be
        represented in the {@code class} file format

## ClassFileBuilder.with(E)

```java
B with(E e)
```

Integrates the member element into the structure being built.

@param e the member element
@return this builder
@throws IllegalArgumentException if the member element cannot be
        represented in the {@code class} file format

## ClassFileBuilder.constantPool()

```java
ConstantPoolBuilder constantPool()
```

{@return the constant pool builder associated with this builder}

## ClassFileBuilder.transform(CompoundElement<E>, ClassFileTransform<?, E, B>)

```java
default B transform(CompoundElement<E> model, ClassFileTransform<?, E, B> transform)
```

Applies a transform to a compound structure, directing results to this
builder.
<p>
The transform will receive each element of the compound structure, as
well as this builder for building the structure.  The transform is free
to preserve, remove, or replace elements as it sees fit.
<p>
A builder can run multiple transforms against different compound
structures, integrating member elements of different origins.

@apiNote
Many subinterfaces have methods like {@link ClassBuilder#transformMethod}
or {@link MethodBuilder#transformCode}.  However, calling them is
fundamentally different from calling this method: those methods call the
{@code transform} on the child builders instead of on itself.  For
example, {@code classBuilder.transformMethod} calls {@code
methodBuilder.transform} with a new method builder instead of calling
{@code classBuilder.transform} on itself.

@param model the structure to transform
@param transform the transform to apply
@return this builder
@see ClassFileTransform