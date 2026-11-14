# NestHostAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface NestHostAttribute extends Attribute<NestHostAttribute>, ClassElement permits BoundAttribute.BoundNestHostAttribute, UnboundAttribute.UnboundNestHostAttribute
```

Models the {@link Attributes#nestHost() NestHost} attribute (JVMS {@jvms
4.7.28}), which indicates this class is a member of a nest and the host
class of the nest.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 11, major
version {@value ClassFile#JAVA_11_VERSION}.

@see Attributes#nestHost()
@see NestMembersAttribute
@see Class#getNestHost()
@see Class#isNestmateOf(Class)
@jvms 4.7.28 The {@code NestHost} Attribute
@since 24

## NestHostAttribute.nestHost()

```java
ClassEntry nestHost()
```

{@return the host class of the nest to which this class belongs}

@see Class#getNestHost()

## NestHostAttribute.of(ClassEntry)

```java
static NestHostAttribute of(ClassEntry nestHost)
```

{@return a {@code NestHost} attribute}

@param nestHost the host class of the nest

## NestHostAttribute.of(ClassDesc)

```java
static NestHostAttribute of(ClassDesc nestHost)
```

{@return a {@code NestHost} attribute}

@param nestHost the host class of the nest
@throws IllegalArgumentException if {@code nestHost} represents a primitive type