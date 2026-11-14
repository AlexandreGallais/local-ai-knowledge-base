# ExceptionsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ExceptionsAttribute extends Attribute<ExceptionsAttribute>, MethodElement permits BoundAttribute.BoundExceptionsAttribute, UnboundAttribute.UnboundExceptionsAttribute
```

Models the {@link Attributes#exceptions() Exceptions} attribute (JVMS {@jvms
4.7.5}), which records the exceptions declared to be thrown by this
method.
<p>
This attribute only appears on methods, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a method.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java Platform version 1.0.2, major
version {@value ClassFile#JAVA_1_VERSION}.

@apiNote
Generic exceptions types thrown by a method and potentially annotated use of
those types are defined by {@link SignatureAttribute} and {@link
RuntimeVisibleTypeAnnotationsAttribute} respectively, which requires this
attribute to be present.

@see Attributes#exceptions()
@jvms 4.7.5 The {@code Exceptions} Attribute
@since 24

## ExceptionsAttribute.exceptions()

```java
List<ClassEntry> exceptions()
```

{@return the exceptions declared to be thrown by this method}

@see Executable#getExceptionTypes()

## ExceptionsAttribute.of(List<ClassEntry>)

```java
static ExceptionsAttribute of(List<ClassEntry> exceptions)
```

{@return an {@code Exceptions} attribute}
@param exceptions the exceptions that may be thrown from this method

## ExceptionsAttribute.of(ClassEntry...)

```java
static ExceptionsAttribute of(ClassEntry... exceptions)
```

{@return an {@code Exceptions} attribute}
@param exceptions the exceptions that may be thrown from this method

## ExceptionsAttribute.ofSymbols(List<ClassDesc>)

```java
static ExceptionsAttribute ofSymbols(List<ClassDesc> exceptions)
```

{@return an {@code Exceptions} attribute}
@param exceptions the exceptions that may be thrown from this method

## ExceptionsAttribute.ofSymbols(ClassDesc...)

```java
static ExceptionsAttribute ofSymbols(ClassDesc... exceptions)
```

{@return an {@code Exceptions} attribute}
@param exceptions the exceptions that may be thrown from this method