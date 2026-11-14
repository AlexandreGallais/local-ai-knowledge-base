# NestMembersAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface NestMembersAttribute extends Attribute<NestMembersAttribute>, ClassElement permits BoundAttribute.BoundNestMembersAttribute, UnboundAttribute.UnboundNestMembersAttribute
```

Models the {@link Attributes#nestMembers() NestMembers} attribute (JVMS
{@jvms 4.7.29}), which indicates that this class is the host of a nest
and the other nest members.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 11, major
version {@value ClassFile#JAVA_11_VERSION}.

@see Attributes#nestMembers()
@see NestHostAttribute
@see Class#getNestMembers()
@see Class#isNestmateOf(Class)
@jvms 4.7.29 The {@code NestMembers} Attribute
@since 24

## NestMembersAttribute.nestMembers()

```java
List<ClassEntry> nestMembers()
```

{@return the classes belonging to the nest hosted by this class}

@see Class#getNestMembers()

## NestMembersAttribute.of(List<ClassEntry>)

```java
static NestMembersAttribute of(List<ClassEntry> nestMembers)
```

{@return a {@code NestMembers} attribute}

@param nestMembers the member classes of the nest

## NestMembersAttribute.of(ClassEntry...)

```java
static NestMembersAttribute of(ClassEntry... nestMembers)
```

{@return a {@code NestMembers} attribute}

@param nestMembers the member classes of the nest

## NestMembersAttribute.ofSymbols(List<ClassDesc>)

```java
static NestMembersAttribute ofSymbols(List<ClassDesc> nestMembers)
```

{@return a {@code NestMembers} attribute}

@param nestMembers the member classes of the nest
@throws IllegalArgumentException if any of {@code nestMembers} is primitive

## NestMembersAttribute.ofSymbols(ClassDesc...)

```java
static NestMembersAttribute ofSymbols(ClassDesc... nestMembers)
```

{@return a {@code NestMembers} attribute}

@param nestMembers the member classes of the nest
@throws IllegalArgumentException if any of {@code nestMembers} is primitive