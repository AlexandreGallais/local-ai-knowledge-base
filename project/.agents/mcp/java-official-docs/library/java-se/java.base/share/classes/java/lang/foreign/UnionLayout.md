# UnionLayout interface (java.lang.foreign)

```java
public sealed interface UnionLayout extends GroupLayout permits UnionLayoutImpl
```

A group layout whose member layouts are laid out at the same starting offset.

@implSpec
Implementing classes are immutable, thread-safe and
<a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>.

@since 22

## UnionLayout.withName(String)

```java
UnionLayout withName(String name)
```

{@inheritDoc}

## UnionLayout.withoutName()

```java
UnionLayout withoutName()
```

{@inheritDoc}

## UnionLayout.withByteAlignment(long)

```java
UnionLayout withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}