# FloatEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface FloatEntry extends AnnotationConstantValueEntry, ConstantValueEntry permits AbstractPoolEntry.FloatEntryImpl
```

Models a {@code CONSTANT_Float_info} structure, or a {@code float} constant,
in the constant pool of a {@code class} file.
<p>
The use of a {@code FloatEntry} is modeled by a {@code float}.  Conversions
are through {@link ConstantPoolBuilder#floatEntry} and {@link #floatValue()}.
In the conversions, all NaN values of the {@code float} may or may not be
collapsed into a single {@linkplain Float#NaN "canonical" NaN value}.

@see ConstantPoolBuilder#floatEntry ConstantPoolBuilder::floatEntry
@jvms 4.4.4 The {@code CONSTANT_Integer_info} and {@code CONSTANT_Float_info}
            Structures
@since 24

## FloatEntry.floatValue()

```java
float floatValue()
```

{@return the {@code float} value}

@see ConstantPoolBuilder#floatEntry(float)