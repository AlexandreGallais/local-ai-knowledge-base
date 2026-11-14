# EnclosingMethodAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface EnclosingMethodAttribute extends Attribute<EnclosingMethodAttribute>, ClassElement permits BoundAttribute.BoundEnclosingMethodAttribute, UnboundAttribute.UnboundEnclosingMethodAttribute
```

Models the {@link Attributes#enclosingMethod() EnclosingMethod} attribute
(JVMS {@jvms 4.7.7}), which indicates that this class is a local or
anonymous class, and indicates the enclosing method or constructor of this
class if this class is enclosed in exactly one method or constructor.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 5.0, major
version {@value ClassFile#JAVA_5_VERSION}.

@see Attributes#enclosingMethod()
@jvms 4.7.7 The {@code EnclosingMethod} Attribute
@since 24

## EnclosingMethodAttribute.enclosingClass()

```java
ClassEntry enclosingClass()
```

{@return the class that encloses the declaration of the current
class}  If the {@link #enclosingMethod()} is present, this is the
declaring class of that enclosing method or constructor.

@see Class#getEnclosingClass()

## EnclosingMethodAttribute.enclosingMethod()

```java
Optional<NameAndTypeEntry> enclosingMethod()
```

{@return the name and type of the enclosing method, if the class is
immediately enclosed by exactly one method or constructor}  This may
be empty if the anonymous or local class appears in a field initializer
(JLS {@jls 8.3.2}), an instance initializer (JLS {@jls 8.6}), or a static
initializer (JLS {@jls 8.7}).  As a result, this never describes a class
initialization method {@value ConstantDescs#CLASS_INIT_NAME}.

@see Class#getEnclosingMethod()
@see Class#getEnclosingConstructor()

## EnclosingMethodAttribute.enclosingMethodName()

```java
default Optional<Utf8Entry> enclosingMethodName()
```

{@return the name of the enclosing method, if the class is immediately
enclosed by exactly one method or constructor}

@see #enclosingMethod()

## EnclosingMethodAttribute.enclosingMethodType()

```java
default Optional<Utf8Entry> enclosingMethodType()
```

{@return the name of the enclosing method, if the class is immediately
enclosed by exactly one method or constructor}

@see #enclosingMethod()

## EnclosingMethodAttribute.enclosingMethodTypeSymbol()

```java
default Optional<MethodTypeDesc> enclosingMethodTypeSymbol()
```

{@return the name of the enclosing method, if the class is immediately
enclosed by exactly one method or constructor}

@see #enclosingMethod()

## EnclosingMethodAttribute.of(ClassEntry, Optional<NameAndTypeEntry>)

```java
static EnclosingMethodAttribute of(ClassEntry className, Optional<NameAndTypeEntry> method)
```

{@return an {@code EnclosingMethod} attribute}
@param className the class name
@param method the name and type of the enclosing method or {@code Optional.empty()} if
              the class is not immediately enclosed by exactly one method or constructor

## EnclosingMethodAttribute.of(ClassDesc, Optional<String>, Optional<MethodTypeDesc>)

```java
static EnclosingMethodAttribute of(ClassDesc className, Optional<String> methodName, Optional<MethodTypeDesc> methodType)
```

{@return an {@code EnclosingMethod} attribute}
@param className the class name
@param methodName the name of the enclosing method or {@code Optional.empty()} if
                  the class is not immediately enclosed by exactly one method or constructor
@param methodType the type of the enclosing method or {@code Optional.empty()} if
                  the class is not immediately enclosed by exactly one method or constructor
@throws IllegalArgumentException if {@code className} represents a primitive type