# CompoundElement interface (java.lang.classfile)

```java
public sealed interface CompoundElement<E extends ClassFileElement> extends ClassFileElement, Iterable<E> permits ClassModel, CodeModel, FieldModel, MethodModel, jdk.internal.classfile.impl.AbstractUnboundModel
```

A {@code class} file structure that can be viewed as a composition of its
member structures.  {@code CompoundElement} allows users to traverse these
member elements with {@link #forEach(Consumer)} or {@link #elementStream()},
or buffer the elements obtained from the traversal through {@link
#iterator()} or {@link #elementList()}.
<p>
Unless otherwise specified, all member elements of compatible type will be
presented during the traversal if they exist in this element.  Some member
elements specify that they may appear at most once in this element; if such
elements are presented multiple times, the latest occurrence is authentic and
all previous occurrences should be ignored.
<p>
{@code CompoundElement}s can be constructed by {@link ClassFileBuilder}s.
{@link ClassFileBuilder#transform(CompoundElement, ClassFileTransform)}
provides an easy way to create a new structure by selectively processing
the original member structures and directing the results to the builder.

@param <E> the member element type
@see ClassFileElement##membership Membership Elements
@see ClassFileBuilder
@sealedGraph
@since 24

## CompoundElement.forEach(Consumer<? super E>)

```java
void forEach(Consumer<? super E> consumer)
```

Invokes the provided handler with each member element in this compound
element.

@param consumer the handler

## CompoundElement.iterator()

```java
default Iterator<E> iterator()
```

{@return an {@link Iterator} describing all member elements in this
compound element}

## CompoundElement.elementStream()

```java
default Stream<E> elementStream()
```

{@return a {@link Stream} containing all member elements in this compound
element}

## CompoundElement.elementList()

```java
default List<E> elementList()
```

{@return a {@link List} containing all member elements in this compound
element}

## CompoundElement.toDebugString()

```java
default String toDebugString()
```

{@return a text representation of the compound element and its contents
for debugging purposes}

The format, structure and exact contents of the returned string are not
specified and may change at any time in the future.