# PermittedSubclassesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface PermittedSubclassesAttribute extends Attribute<PermittedSubclassesAttribute>, ClassElement permits BoundAttribute.BoundPermittedSubclassesAttribute, UnboundAttribute.UnboundPermittedSubclassesAttribute
```

Models the {@link Attributes#permittedSubclasses() PermittedSubclasses}
attribute (JVMS {@jvms 4.7.31}), which indicates this class or interface
is {@linkplain java.compiler/javax.lang.model.element.Modifier#SEALED sealed},
and which classes or interfaces may extend or implement this class or
interface.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 17, major
version {@value ClassFile#JAVA_17_VERSION}.

@see Attributes#permittedSubclasses()
@see Class#isSealed()
@see Class#getPermittedSubclasses()
@jls 8.1.1.2 {@code sealed}, {@code non-sealed}, and {@code final} Classes
@jls 9.1.1.4 {@code sealed} and {@code non-sealed} Interfaces
@jvms 4.7.31 The {@code PermittedSubclasses} Attribute
@since 24

## PermittedSubclassesAttribute.permittedSubclasses()

```java
List<ClassEntry> permittedSubclasses()
```

{@return the list of permitted subclasses or subinterfaces}

@see Class#getPermittedSubclasses()

## PermittedSubclassesAttribute.of(List<ClassEntry>)

```java
static PermittedSubclassesAttribute of(List<ClassEntry> permittedSubclasses)
```

{@return a {@code PermittedSubclasses} attribute}

@param permittedSubclasses the permitted subclasses or subinterfaces

## PermittedSubclassesAttribute.of(ClassEntry...)

```java
static PermittedSubclassesAttribute of(ClassEntry... permittedSubclasses)
```

{@return a {@code PermittedSubclasses} attribute}

@param permittedSubclasses the permitted subclasses or subinterfaces

## PermittedSubclassesAttribute.ofSymbols(List<ClassDesc>)

```java
static PermittedSubclassesAttribute ofSymbols(List<ClassDesc> permittedSubclasses)
```

{@return a {@code PermittedSubclasses} attribute}

@param permittedSubclasses the permitted subclasses or subinterfaces
@throws IllegalArgumentException if any of {@code permittedSubclasses} is primitive

## PermittedSubclassesAttribute.ofSymbols(ClassDesc...)

```java
static PermittedSubclassesAttribute ofSymbols(ClassDesc... permittedSubclasses)
```

{@return a {@code PermittedSubclasses} attribute}

@param permittedSubclasses the permitted subclasses or subinterfaces
@throws IllegalArgumentException if any of {@code permittedSubclasses} is primitive