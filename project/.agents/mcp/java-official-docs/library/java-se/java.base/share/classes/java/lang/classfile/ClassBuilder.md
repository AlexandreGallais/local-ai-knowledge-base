# ClassBuilder interface (java.lang.classfile)

```java
public sealed interface ClassBuilder extends ClassFileBuilder<ClassElement, ClassBuilder> permits ChainedClassBuilder, DirectClassBuilder
```

A builder for a {@code class} file.  {@link ClassFile} provides different
{@code build} methods that accept handlers to configure such a builder;
{@link ClassFile#build(ClassDesc, Consumer)} suffices for basic usage, while
{@link ClassFile#build(ClassEntry, ConstantPoolBuilder, Consumer)} allows
fine-grained control over {@linkplain ClassFileBuilder#constantPool() the
constant pool}.
<p>
Refer to {@link ClassFileBuilder} for general guidance and caution around
the use of builders for structures in the {@code class} file format.

@see ClassFile#build(ClassEntry, ConstantPoolBuilder, Consumer)
@see ClassModel
@see ClassTransform
@since 24

## ClassBuilder.withVersion(int, int)

```java
default ClassBuilder withVersion(int major, int minor)
```

Sets the version of this class.

@param major the major version number
@param minor the minor version number
@return this builder
@see ClassFileVersion

## ClassBuilder.withFlags(int)

```java
default ClassBuilder withFlags(int flags)
```

Sets the access flags of this class.

@param flags the access flags, as a bit mask
@return this builder
@see AccessFlags
@see AccessFlag.Location#CLASS

## ClassBuilder.withFlags(AccessFlag...)

```java
default ClassBuilder withFlags(AccessFlag... flags)
```

Sets the access flags of this class.

@param flags the access flags, as flag enums
@return this builder
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#CLASS} location
@see AccessFlags
@see AccessFlag.Location#CLASS

## ClassBuilder.withSuperclass(ClassEntry)

```java
default ClassBuilder withSuperclass(ClassEntry superclassEntry)
```

Sets the superclass of this class.

@param superclassEntry the superclass
@return this builder
@see Superclass

## ClassBuilder.withSuperclass(ClassDesc)

```java
default ClassBuilder withSuperclass(ClassDesc desc)
```

Sets the superclass of this class.

@param desc the superclass
@return this builder
@throws IllegalArgumentException if {@code desc} represents a primitive type
@see Superclass

## ClassBuilder.withInterfaces(List<ClassEntry>)

```java
default ClassBuilder withInterfaces(List<ClassEntry> interfaces)
```

Sets the interfaces of this class.

@param interfaces the interfaces
@return this builder
@see Interfaces

## ClassBuilder.withInterfaces(ClassEntry...)

```java
default ClassBuilder withInterfaces(ClassEntry... interfaces)
```

Sets the interfaces of this class.

@param interfaces the interfaces
@return this builder
@see Interfaces

## ClassBuilder.withInterfaceSymbols(List<ClassDesc>)

```java
default ClassBuilder withInterfaceSymbols(List<ClassDesc> interfaces)
```

Sets the interfaces of this class.

@param interfaces the interfaces
@return this builder
@throws IllegalArgumentException if any element of {@code interfaces} is primitive
@see Interfaces

## ClassBuilder.withInterfaceSymbols(ClassDesc...)

```java
default ClassBuilder withInterfaceSymbols(ClassDesc... interfaces)
```

Sets the interfaces of this class.

@param interfaces the interfaces
@return this builder
@throws IllegalArgumentException if any element of {@code interfaces} is primitive
@see Interfaces

## ClassBuilder.withField(Utf8Entry, Utf8Entry, Consumer<? super FieldBuilder>)

```java
ClassBuilder withField(Utf8Entry name, Utf8Entry descriptor, Consumer<? super FieldBuilder> handler)
```

Adds a field.

@param name the field name
@param descriptor the field descriptor string
@param handler handler to supply the contents of the field
@return this builder
@see FieldModel

## ClassBuilder.withField(Utf8Entry, Utf8Entry, int)

```java
default ClassBuilder withField(Utf8Entry name, Utf8Entry descriptor, int flags)
```

Adds a field, with only access flags.

@param name the field name
@param descriptor the field descriptor string
@param flags the access flags for this field, as a bit mask
@return this builder
@see FieldModel
@see FieldBuilder#withFlags(int)

## ClassBuilder.withField(String, ClassDesc, Consumer<? super FieldBuilder>)

```java
default ClassBuilder withField(String name, ClassDesc descriptor, Consumer<? super FieldBuilder> handler)
```

Adds a field.

@param name the field name
@param descriptor the symbolic field descriptor
@param handler handler to supply the contents of the field
@return this builder
@see FieldModel

## ClassBuilder.withField(String, ClassDesc, int)

```java
default ClassBuilder withField(String name, ClassDesc descriptor, int flags)
```

Adds a field, with only access flags.

@param name the field name
@param descriptor the symbolic field descriptor
@param flags the access flags for this field, as a bit mask
@return this builder
@see FieldModel
@see FieldBuilder#withFlags(int)

## ClassBuilder.transformField(FieldModel, FieldTransform)

```java
ClassBuilder transformField(FieldModel field, FieldTransform transform)
```

Adds a field by transforming a field from another class.
<p>
This method behaves as if:
{@snippet lang=java :
// @link substring=withField target="#withField(Utf8Entry, Utf8Entry, Consumer)" :
withField(field.fieldName(), field.fieldType(),
          fb -> fb.transform(field, transform)) // @link regex="transform(?=\()" target="FieldBuilder#transform"
}

@param field the field to be transformed
@param transform the transform to apply to the field
@return this builder
@see FieldTransform

## ClassBuilder.withMethod(Utf8Entry, Utf8Entry, int, Consumer<? super MethodBuilder>)

```java
ClassBuilder withMethod(Utf8Entry name, Utf8Entry descriptor, int methodFlags, Consumer<? super MethodBuilder> handler)
```

Adds a method.  The bit for {@link ClassFile#ACC_STATIC ACC_STATIC} flag
cannot be modified by the {@code handler} later, and must be set through
{@code methodFlags}.

@param name the method name
@param descriptor the method descriptor
@param methodFlags the access flags as a bit mask, with the {@code
       ACC_STATIC} bit definitely set
@param handler handler to supply the contents of the method
@return this builder
@see MethodModel

## ClassBuilder.withMethodBody(Utf8Entry, Utf8Entry, int, Consumer<? super CodeBuilder>)

```java
default ClassBuilder withMethodBody(Utf8Entry name, Utf8Entry descriptor, int methodFlags, Consumer<? super CodeBuilder> handler)
```

Adds a method, with only access flags and a {@link CodeModel}.  The bit
for {@link ClassFile#ACC_STATIC ACC_STATIC} flag cannot be modified by
the {@code handler} later, and must be set through {@code methodFlags}.
<p>
This method behaves as if:
{@snippet lang=java :
// @link substring=withMethod target="#withMethod(Utf8Entry, Utf8Entry, int, Consumer)" :
withMethod(name, descriptor, methodFlags, mb -> mb.withCode(handler)) // @link substring=withCode target="MethodBuilder#withCode"
}

@param name the method name
@param descriptor the method descriptor
@param methodFlags the access flags as a bit mask, with the {@code
       ACC_STATIC} bit definitely set
@param handler handler to supply the contents of the method body
@return this builder
@see MethodModel

## ClassBuilder.withMethod(String, MethodTypeDesc, int, Consumer<? super MethodBuilder>)

```java
default ClassBuilder withMethod(String name, MethodTypeDesc descriptor, int methodFlags, Consumer<? super MethodBuilder> handler)
```

Adds a method.  The bit for {@link ClassFile#ACC_STATIC ACC_STATIC} flag
cannot be modified by the {@code handler}, and must be set through
{@code methodFlags}.

@param name the method name
@param descriptor the method descriptor
@param methodFlags the access flags as a bit mask, with the {@code
       ACC_STATIC} bit definitely set
@param handler handler to supply the contents of the method
@return this builder
@see MethodModel

## ClassBuilder.withMethodBody(String, MethodTypeDesc, int, Consumer<? super CodeBuilder>)

```java
default ClassBuilder withMethodBody(String name, MethodTypeDesc descriptor, int methodFlags, Consumer<? super CodeBuilder> handler)
```

Adds a method, with only access flags and a {@link CodeModel}.  The bit
for {@link ClassFile#ACC_STATIC ACC_STATIC} flag cannot be modified by
the {@code handler}, and must be set through {@code methodFlags}.
<p>
This method behaves as if:
{@snippet lang=java :
// @link substring=withMethod target="#withMethod(String, MethodTypeDesc, int, Consumer)" :
withMethod(name, descriptor, methodFlags, mb -> mb.withCode(handler)) // @link substring=withCode target="MethodBuilder#withCode"
}

@param name the method name
@param descriptor the method descriptor
@param methodFlags the access flags as a bit mask, with the {@code
       ACC_STATIC} bit definitely set
@param handler handler to supply the contents of the method body
@return this builder
@see MethodModel

## ClassBuilder.transformMethod(MethodModel, MethodTransform)

```java
ClassBuilder transformMethod(MethodModel method, MethodTransform transform)
```

Adds a method by transforming a method from another class.  The transform
cannot modify the {@link ClassFile#ACC_STATIC ACC_STATIC} flag of the
original method.
<p>
This method behaves as if:
{@snippet lang=java :
// @link substring=withMethod target="#withMethod(Utf8Entry, Utf8Entry, int, Consumer)" :
withMethod(method.methodName(), method.methodType(), method.flags().flagMask(),
           mb -> mb.transform(method, transform)) // @link regex="transform(?=\()" target="MethodBuilder#transform"
}

@param method the method to be transformed
@param transform the transform to apply to the method
@return this builder
@see MethodTransform