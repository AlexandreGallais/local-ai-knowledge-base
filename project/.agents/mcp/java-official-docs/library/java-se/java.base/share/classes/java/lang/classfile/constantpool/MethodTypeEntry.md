# MethodTypeEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface MethodTypeEntry extends LoadableConstantEntry permits AbstractPoolEntry.MethodTypeEntryImpl
```

Models a {@code CONSTANT_MethodType_info} structure, or a symbolic reference
to a method type, in the constant pool of a {@code class} file.
<p>
The use of a {@code MethodTypeEntry} is modeled by a {@link MethodTypeDesc}.
Conversions are through {@link ConstantPoolBuilder#methodTypeEntry(MethodTypeDesc)}
and {@link #asSymbol()}.
<p>
A method type entry is composite:
{@snippet lang=text :
// @link substring="MethodTypeEntry" target="ConstantPoolBuilder#methodTypeEntry(Utf8Entry)" :
MethodTypeEntry(Utf8Entry descriptor) // @link substring="descriptor" target="#descriptor()"
}
where {@code descriptor} is a {@linkplain #asSymbol() method descriptor}
string.

@jvms 4.4.9 The {@code CONSTANT_MethodType_info} Structure
@since 24

## MethodTypeEntry.constantValue()

```java
default ConstantDesc constantValue()
```

{@inheritDoc}
<p>
This is equivalent to {@link #asSymbol() asSymbol()}.

## MethodTypeEntry.descriptor()

```java
Utf8Entry descriptor()
```

{@return the {@linkplain #asSymbol() method descriptor} string}

## MethodTypeEntry.asSymbol()

```java
MethodTypeDesc asSymbol()
```

{@return a symbolic descriptor for the {@linkplain #descriptor() method
type}}

@apiNote
If only symbol equivalence is desired, {@link #matches(MethodTypeDesc)
matches} should be used.  It requires reduced parsing and can
improve {@code class} file reading performance.

## MethodTypeEntry.matches(MethodTypeDesc)

```java
boolean matches(MethodTypeDesc desc)
```

{@return whether this entry describes the given method type}

@param desc the method type descriptor
@since 25