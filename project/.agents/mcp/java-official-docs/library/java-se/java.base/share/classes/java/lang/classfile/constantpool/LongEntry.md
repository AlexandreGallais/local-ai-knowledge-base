# LongEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface LongEntry extends AnnotationConstantValueEntry, ConstantValueEntry permits AbstractPoolEntry.LongEntryImpl
```

Models a {@code CONSTANT_Long_info} structure, or a {@code long} constant, in
the constant pool of a {@code class} file.
<p>
The use of a {@code LongEntry} is modeled by a {@code long}.  Conversions are
through {@link ConstantPoolBuilder#longEntry(long)} and {@link #longValue()}.
<p>
A long entry has a {@linkplain #width() width} of {@code 2}, making its
subsequent constant pool index valid and unusable.

@see ConstantPoolBuilder#longEntry ConstantPoolBuilder::longEntry
@jvms 4.4.5 The {@code CONSTANT_Long_info} and {@code CONSTANT_Double_info}
            Structures
@since 24

## LongEntry.longValue()

```java
long longValue()
```

{@return the {@code long} value}

@see ConstantPoolBuilder#longEntry(long)
     ConstantPoolBuilder::longEntry(long)

## LongEntry.typeKind()

```java
default TypeKind typeKind()
```

{@return the type of the constant}