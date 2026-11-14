# StructLayout interface (java.lang.foreign)

```java
public sealed interface StructLayout extends GroupLayout permits StructLayoutImpl
```

A group layout whose member layouts are laid out one after the other.

@implSpec
Implementing classes are immutable, thread-safe and
<a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>.

@since 22

## StructLayout.withName(String)

```java
StructLayout withName(String name)
```

{@inheritDoc}

## StructLayout.withoutName()

```java
StructLayout withoutName()
```

{@inheritDoc}

## StructLayout.withByteAlignment(long)

```java
StructLayout withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}