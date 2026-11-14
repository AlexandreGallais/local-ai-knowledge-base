# PackageEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface PackageEntry extends PoolEntry permits AbstractPoolEntry.PackageEntryImpl
```

Models a {@code CONSTANT_Package_info}, representing a package, in the
constant pool of a {@code class} file.
<p>
The use of a {@code PackageEntry} is represented by a {@link PackageDesc}
that does not represent the unnamed package.  Conversions are through
{@link ConstantPoolBuilder#packageEntry(PackageDesc)} and
{@link #asSymbol()}.
<p>
A package entry is composite:
{@snippet lang=text :
// @link substring="PackageEntry" target="ConstantPoolBuilder#packageEntry(Utf8Entry)" :
PackageEntry(Utf8Entry name) // @link substring="name" target="#name()"
}
where {@code name} is the {@linkplain ClassEntry##internalname internal form}
of a binary package name and is not empty.

@jvms 4.4.12 The {@code CONSTANT_Package_info} Structure
@since 24

## PackageEntry.name()

```java
Utf8Entry name()
```

{@return the {@linkplain ClassEntry##internalname internal form} of the
{@linkplain #asSymbol() package} name}

## PackageEntry.asSymbol()

```java
PackageDesc asSymbol()
```

{@return a symbolic descriptor for the {@linkplain #name() package name}}

@apiNote
If only symbol equivalence is desired, {@link #matches(PackageDesc)
matches} should be used.  It requires reduced parsing and can
improve {@code class} file reading performance.

## PackageEntry.matches(PackageDesc)

```java
boolean matches(PackageDesc desc)
```

{@return whether this entry describes the given package}

@param desc the package descriptor
@since 25