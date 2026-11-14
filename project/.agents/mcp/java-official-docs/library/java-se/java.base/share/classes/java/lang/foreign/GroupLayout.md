# GroupLayout interface (java.lang.foreign)

```java
public sealed interface GroupLayout extends MemoryLayout permits StructLayout, UnionLayout
```

A compound layout that is an aggregation of multiple, heterogeneous
<em>member layouts</em>. There are two ways in which member layouts can be combined:
if member layouts are laid out one after the other, the resulting group layout is a
{@linkplain StructLayout struct layout}; conversely, if all member layouts are laid
out at the same starting offset, the resulting group layout is a
{@linkplain UnionLayout union layout}.

@implSpec
This class is immutable, thread-safe and
<a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>.

@sealedGraph
@since 22

## GroupLayout.memberLayouts()

```java
List<MemoryLayout> memberLayouts()
```

{@return the member layouts of this group layout}

@apiNote the order in which member layouts are returned is the same order in which
         member layouts have been passed to one of the group layout factory methods
         (see {@link MemoryLayout#structLayout(MemoryLayout...)} and
         {@link MemoryLayout#unionLayout(MemoryLayout...)}).

## GroupLayout.withName(String)

```java
GroupLayout withName(String name)
```

{@inheritDoc}

## GroupLayout.withoutName()

```java
GroupLayout withoutName()
```

{@inheritDoc}

## GroupLayout.withByteAlignment(long)

```java
GroupLayout withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@throws IllegalArgumentException if {@code byteAlignment} is less than {@code M},
        where {@code M} is the maximum alignment constraint in any of the
        member layouts associated with this group layout