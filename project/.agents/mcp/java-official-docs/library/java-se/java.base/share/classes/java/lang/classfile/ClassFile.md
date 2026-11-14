# ClassFile interface (java.lang.classfile)

```java
public sealed interface ClassFile permits ClassFileImpl
```

Provides ability to parse, transform, and generate {@code class} files.
A {@code ClassFile} is a context with a set of options that condition how
parsing and generation are done.

@since 24

## ClassFile.of()

```java
static ClassFile of()
```

{@return a context with default options}  Each subtype of {@link Option}
specifies its default.
<p>
The default {@link AttributeMapperOption} and {@link
ClassHierarchyResolverOption} may be unsuitable for some {@code class}
files and result in parsing or generation errors.

## ClassFile.of(Option...)

```java
static ClassFile of(Option... options)
```

{@return a context with options altered from the default}  Equivalent to
{@link #of() ClassFile.of().withOptions(options)}.
@param options the desired processing options

## ClassFile.withOptions(Option...)

```java
ClassFile withOptions(Option... options)
```

{@return a context with altered options from this context}
@param options the desired processing options

## ClassFile.of(Function<Utf8Entry, AttributeMapper<?>>)

```java
static AttributeMapperOption of(Function<Utf8Entry, AttributeMapper<?>> attributeMapper)
```

{@return an option describing user-defined attributes for parsing}

@param attributeMapper a function mapping attribute names to attribute mappers

## ClassFile.attributeMapper()

```java
Function<Utf8Entry, AttributeMapper<?>> attributeMapper()
```

{@return the function mapping attribute names to attribute mappers}

## ClassFile.of(ClassHierarchyResolver)

```java
static ClassHierarchyResolverOption of(ClassHierarchyResolver classHierarchyResolver)
```

{@return an option describing the class hierarchy resolver to use}

@param classHierarchyResolver the resolver

## ClassFile.classHierarchyResolver()

```java
ClassHierarchyResolver classHierarchyResolver()
```

{@return the class hierarchy resolver}

## ClassFile.the

```java
SHARED_POOL, /** * Creates a new constant pool when transforming the
```

Extend the new constant pool from the original constant pool when
transforming the {@code class} file.
<p>
These two transformations below are equivalent:
{@snippet lang=java :
ClassModel originalClass = null; // @replace substring=null; replacement=...
ClassDesc resultClassName = null; // @replace substring=null; replacement=...
ClassTransform classTransform = null; // @replace substring=null; replacement=...
var resultOne = ClassFile.of(ConstantPoolSharingOption.SHARED_POOL)
        .transformClass(originalClass, resultClassName, classTransform);
var resultTwo = ClassFile.of().build(resultClassName, ConstantPoolBuilder.of(originalClass),
        clb -> clb.transform(originalClass, classTransform));
}

@see ConstantPoolBuilder#of(ClassModel) ConstantPoolBuilder::of(ClassModel)

## ClassFile.is

```java
NEW_POOL } /** * The option describing whether to patch out unreachable code for stack map * generation. The default is
```

Creates a new constant pool when transforming the {@code class} file.
<p>
These two transformations below are equivalent:
{@snippet lang=java :
ClassModel originalClass = null; // @replace substring=null; replacement=...
ClassDesc resultClassName = null; // @replace substring=null; replacement=...
ClassTransform classTransform = null; // @replace substring=null; replacement=...
var resultOne = ClassFile.of(ConstantPoolSharingOption.NEW_POOL)
        .transformClass(originalClass, resultClassName, classTransform);
var resultTwo = ClassFile.of().build(resultClassName, ConstantPoolBuilder.of(),
        clb -> clb.transform(originalClass, classTransform));
}

@see ConstantPoolBuilder#of() ConstantPoolBuilder::of()

## ClassFile.generated

```java
PATCH_DEAD_CODE, /** * Keep the unreachable code for the accuracy of the generated
```

Patch unreachable code with dummy code, and generate valid dummy
stack map entries.  This ensures the generated code can pass
verification (JVMS {@jvms 4.10.1}).

## ClassFile.filter

```java
KEEP_DEAD_CODE } /** * The option describing whether to filter
```

Keep the unreachable code for the accuracy of the generated {@code
class} file.  Users should set {@link StackMapsOption#DROP_STACK_MAPS}
to prevent stack map generation from running and provide their own
{@link StackMapTableAttribute} to a {@link CodeBuilder}.

## ClassFile.Filter

```java
FAIL_ON_DEAD_LABELS, /** * Filter
```

Fail fast on {@linkplain CodeBuilder#labelBinding(Label) unbound
labels}.  This also ensures the accuracy of the generated {@code
class} files.

## ClassFile.debug

```java
DROP_DEAD_LABELS } /** * The option describing whether to process or discard debug
```

Filter {@link PseudoInstruction}s with {@linkplain
CodeBuilder#labelBinding(Label) unbound labels}.  Note that
instructions with unbound labels still cause an {@link
IllegalArgumentException}.

## ClassFile.discard

```java
PASS_DEBUG, /** * Drop debug pseudo-instructions from traversal and builders. */ DROP_DEBUG } /** * The option describing whether to process or discard
```

Process debug pseudo-instructions like other member elements of a
{@link CodeModel}.

## ClassFile.discard

```java
DROP_DEBUG } /** * The option describing whether to process or discard
```

Drop debug pseudo-instructions from traversal and builders.

## ClassFile.Drop

```java
PASS_LINE_NUMBERS, /** * Drop
```

Process {@link LineNumber} like other member elements of a {@link
CodeModel}.

## ClassFile.DROP_LINE_NUMBERS

```java
DROP_LINE_NUMBERS
```

Drop {@link LineNumber} from traversal and builders.

## ClassFile.an

```java
FIX_SHORT_JUMPS, /** * Fail with an
```

Automatically convert short jumps to long when necessary.
<p>
For an invalid instruction model, a {@link CodeBuilder} may generate
another or a few other instructions to accomplish the same effect.

## ClassFile.FAIL_ON_SHORT_JUMPS } /** * The option describing whether to generate stack maps. The default is *

```java
FAIL_ON_SHORT_JUMPS } /** * The option describing whether to generate stack maps. The default is *
```

Fail with an {@link IllegalArgumentException} if short jump overflows.
<p>
This is useful to ensure the physical accuracy of a generated {@code
class} file and avoids the overhead from a failed first attempt for
overflowing forward jumps in some cases.

## ClassFile.STACK_MAPS_WHEN_REQUIRED, /** * Forces running stack map generation. This runs stack map generation * unconditionally and fails fast if the generation fails due to any * reason. */ GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *

```java
STACK_MAPS_WHEN_REQUIRED, /** * Forces running stack map generation. This runs stack map generation * unconditionally and fails fast if the generation fails due to any * reason. */ GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *
```

Generate stack maps or reuse existing ones if compatible.  Stack maps
are present on major versions {@value #JAVA_6_VERSION} or above.  For
these versions, {@link CodeBuilder} tries to reuse compatible stack
maps information if the code array and exception handlers are still
compatible after a transformation; otherwise, it runs stack map
generation.  However, it does not fail fast if the major version is
{@value #JAVA_6_VERSION}, which allows jump subroutine instructions
that are incompatible with stack maps to exist in the {@code code}
array.

## ClassFile.GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *

```java
GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *
```

Forces running stack map generation.  This runs stack map generation
unconditionally and fails fast if the generation fails due to any
reason.

## ClassFile.is

```java
DROP_STACK_MAPS } /** * The option describing whether to retain or discard attributes that cannot * verify their correctness after a transformation. The default is
```

Do not run stack map generation.  Users must supply their own
{@link StackMapTableAttribute} to a {@link CodeBuilder} if the code
has branches or exception handlers; otherwise, the generated code
will fail verification (JVMS {@jvms 4.10.1}).
<p>
This option is required for user-supplied {@link StackMapTableAttribute}
to be respected.  Stack maps on an existing {@link CodeAttribute Code}
attribute can be reused as below with this option:
{@snippet lang=java file="PackageSnippets.java" region="manual-reuse-stack-maps"}

## ClassFile.with

```java
PASS_ALL_ATTRIBUTES, /** * Drop attributes with
```

Retain all original attributes during transformation.

## ClassFile.with

```java
DROP_UNKNOWN_ATTRIBUTES, /** * Drop attributes with
```

Drop attributes with {@link AttributeStability#UNKNOWN} data
dependency during transformation.

## ClassFile.a

```java
DROP_UNSTABLE_ATTRIBUTES } /** * Parses a
```

Drop attributes with {@link AttributeStability#UNSTABLE} or higher
data dependency during transformation.

## ClassFile.parse(byte[])

```java
ClassModel parse(byte[] bytes)
```

Parses a {@code class} file into a {@link ClassModel}.
<p>
Due to the on-demand nature of {@code class} file parsing, an {@link
IllegalArgumentException} may be thrown on any accessor method invocation
on the returned model or any structure returned by the accessors in the
structure hierarchy.

@param bytes the bytes of the {@code class} file
@return the class model
@throws IllegalArgumentException if the {@code class} file is malformed
        or of a version {@linkplain #latestMajorVersion() not supported}
        by the current runtime

## ClassFile.parse(Path)

```java
default ClassModel parse(Path path) throws IOException
```

Parses a {@code class} into a {@link ClassModel}.
<p>
Due to the on-demand nature of {@code class} file parsing, an {@link
IllegalArgumentException} may be thrown on any accessor method invocation
on the returned model or any structure returned by the accessors in the
structure hierarchy.

@param path the path to the {@code class} file
@return the class model
@throws IOException if an I/O error occurs
@throws IllegalArgumentException if the {@code class} file is malformed
        or of a version {@linkplain #latestMajorVersion() not supported}
        by the current runtime
@see #parse(byte[])

## ClassFile.build(ClassDesc, Consumer<? super ClassBuilder>)

```java
default byte[] build(ClassDesc thisClass, Consumer<? super ClassBuilder> handler)
```

Builds a {@code class} file into a byte array.

@param thisClass the name of the class to build
@param handler a handler that receives a {@link ClassBuilder}
@return the {@code class} file bytes
@throws IllegalArgumentException if {@code thisClass} represents a
        primitive type or building encounters a failure

## ClassFile.build(ClassEntry, ConstantPoolBuilder, Consumer<? super ClassBuilder>)

```java
byte[] build(ClassEntry thisClassEntry, ConstantPoolBuilder constantPool, Consumer<? super ClassBuilder> handler)
```

Builds a {@code class} file into a byte array using the provided constant
pool builder.

@param thisClassEntry the name of the class to build
@param constantPool the constant pool builder
@param handler a handler that receives a {@link ClassBuilder}
@return the {@code class} file bytes
@throws IllegalArgumentException if building encounters a failure

## ClassFile.buildTo(Path, ClassDesc, Consumer<ClassBuilder>)

```java
default void buildTo(Path path, ClassDesc thisClass, Consumer<ClassBuilder> handler) throws IOException
```

Builds a {@code class} file into a file in a file system.

@param path the path to the file to write
@param thisClass the name of the class to build
@param handler a handler that receives a {@link ClassBuilder}
@throws IOException if an I/O error occurs
@throws IllegalArgumentException if building encounters a failure

## ClassFile.buildTo(Path, ClassEntry, ConstantPoolBuilder, Consumer<? super ClassBuilder>)

```java
default void buildTo(Path path, ClassEntry thisClassEntry, ConstantPoolBuilder constantPool, Consumer<? super ClassBuilder> handler) throws IOException
```

Builds a {@code class} file into a file in a file system using the
provided constant pool builder.

@param path the path to the file to write
@param thisClassEntry the name of the class to build
@param constantPool the constant pool builder
@param handler a handler that receives a {@link ClassBuilder}
@throws IOException if an I/O error occurs
@throws IllegalArgumentException if building encounters a failure

## ClassFile.buildModule(ModuleAttribute)

```java
default byte[] buildModule(ModuleAttribute moduleAttribute)
```

Builds a module descriptor into a byte array.

@param moduleAttribute the {@code Module} attribute
@return the {@code class} file bytes
@throws IllegalArgumentException if building encounters a failure

## ClassFile.buildModule(ModuleAttribute, Consumer<? super ClassBuilder>)

```java
default byte[] buildModule(ModuleAttribute moduleAttribute, Consumer<? super ClassBuilder> handler)
```

Builds a module descriptor into a byte array.

@param moduleAttribute the {@code Module} attribute
@param handler a handler that receives a {@link ClassBuilder}
@return the {@code class} file bytes
@throws IllegalArgumentException if building encounters a failure

## ClassFile.buildModuleTo(Path, ModuleAttribute)

```java
default void buildModuleTo(Path path, ModuleAttribute moduleAttribute) throws IOException
```

Builds a module descriptor into a file in a file system.

@param path the file to write
@param moduleAttribute the {@code Module} attribute
@throws IOException if an I/O error occurs
@throws IllegalArgumentException if building encounters a failure

## ClassFile.buildModuleTo(Path, ModuleAttribute, Consumer<? super ClassBuilder>)

```java
default void buildModuleTo(Path path, ModuleAttribute moduleAttribute, Consumer<? super ClassBuilder> handler) throws IOException
```

Builds a module descriptor into a file in a file system.

@param path the file to write
@param moduleAttribute the {@code Module} attribute
@param handler a handler that receives a {@link ClassBuilder}
@throws IOException if an I/O error occurs
@throws IllegalArgumentException if building encounters a failure

## ClassFile.transformClass(ClassModel, ClassTransform)

```java
default byte[] transformClass(ClassModel model, ClassTransform transform)
```

Transform one {@code class} file into a new {@code class} file according
to a {@link ClassTransform}.  The transform will receive each element of
this class, as well as a {@link ClassBuilder} for building the new class.
The transform is free to preserve, remove, or replace elements as it
sees fit.
<p>
This method behaves as if:
{@snippet lang=java :
ConstantPoolBuilder cpb = null; // @replace substring=null; replacement=...
this.build(model.thisClass(), cpb,
           clb -> clb.transform(model, transform));
}
where {@code cpb} is determined by {@link ConstantPoolSharingOption}.

@apiNote
This is named {@code transformClass} instead of {@code transform} for
consistency with {@link ClassBuilder#transformField}, {@link
ClassBuilder#transformMethod}, and {@link MethodBuilder#transformCode},
and to distinguish from {@link ClassFileBuilder#transform}, which is
more generic and powerful.

@param model the class model to transform
@param transform the transform
@return the bytes of the new class
@throws IllegalArgumentException if building encounters a failure
@see ConstantPoolSharingOption

## ClassFile.transformClass(ClassModel, ClassDesc, ClassTransform)

```java
default byte[] transformClass(ClassModel model, ClassDesc newClassName, ClassTransform transform)
```

Transform one {@code class} file into a new {@code class} file according
to a {@link ClassTransform}.  The transform will receive each element of
this class, as well as a {@link ClassBuilder} for building the new class.
The transform is free to preserve, remove, or replace elements as it
sees fit.

@apiNote
This is named {@code transformClass} instead of {@code transform} for
consistency with {@link ClassBuilder#transformField}, {@link
ClassBuilder#transformMethod}, and {@link MethodBuilder#transformCode},
and to distinguish from {@link ClassFileBuilder#transform}, which is
more generic and powerful.

@param model the class model to transform
@param newClassName new class name
@param transform the transform
@return the bytes of the new class
@throws IllegalArgumentException if building encounters a failure
@see ConstantPoolSharingOption

## ClassFile.transformClass(ClassModel, ClassEntry, ClassTransform)

```java
byte[] transformClass(ClassModel model, ClassEntry newClassName, ClassTransform transform)
```

Transform one {@code class} file into a new {@code class} file according
to a {@link ClassTransform}.  The transform will receive each element of
this class, as well as a {@link ClassBuilder} for building the new class.
The transform is free to preserve, remove, or replace elements as it
sees fit.
<p>
This method behaves as if:
{@snippet lang=java :
ConstantPoolBuilder cpb = null; // @replace substring=null; replacement=...
this.build(newClassName, cpb, clb -> clb.transform(model, transform));
}
where {@code cpb} is determined by {@link ConstantPoolSharingOption}.

@apiNote
This is named {@code transformClass} instead of {@code transform} for
consistency with {@link ClassBuilder#transformField}, {@link
ClassBuilder#transformMethod}, and {@link MethodBuilder#transformCode},
and to distinguish from {@link ClassFileBuilder#transform}, which is
more generic and powerful.

@param model the class model to transform
@param newClassName new class name
@param transform the transform
@return the bytes of the new class
@throws IllegalArgumentException if building encounters a failure
@see ConstantPoolSharingOption

## ClassFile.verify(ClassModel)

```java
List<VerifyError> verify(ClassModel model)
```

Verify a {@code class} file.  All verification errors found will be returned.

@param model the class model to verify
@return a list of verification errors, or an empty list if no error is
found

## ClassFile.verify(byte[])

```java
List<VerifyError> verify(byte[] bytes)
```

Verify a {@code class} file.  All verification errors found will be returned.

@param bytes the {@code class} file bytes to verify
@return a list of verification errors, or an empty list if no error is
found

## ClassFile.verify(Path)

```java
default List<VerifyError> verify(Path path) throws IOException
```

Verify a {@code class} file.  All verification errors found will be returned.

@param path the {@code class} file path to verify
@return a list of verification errors, or an empty list if no error is
found
@throws IOException if an I/O error occurs

## ClassFile.MAGIC_NUMBER

```java
int MAGIC_NUMBER
```

The magic number identifying the {@code class} file format,  {@value
"0x%04x" #MAGIC_NUMBER}.  It is a big-endian 4-byte value.

## ClassFile.ACC_PUBLIC

```java
int ACC_PUBLIC
```

The bit mask of {@link AccessFlag#PUBLIC} access and property modifier.

## ClassFile.ACC_PROTECTED

```java
int ACC_PROTECTED
```

The bit mask of {@link AccessFlag#PROTECTED} access and property modifier.

## ClassFile.ACC_PRIVATE

```java
int ACC_PRIVATE
```

The bit mask of {@link AccessFlag#PRIVATE} access and property modifier.

## ClassFile.ACC_INTERFACE

```java
int ACC_INTERFACE
```

The bit mask of {@link AccessFlag#INTERFACE} access and property modifier.

## ClassFile.ACC_ENUM

```java
int ACC_ENUM
```

The bit mask of {@link AccessFlag#ENUM} access and property modifier.

## ClassFile.ACC_ANNOTATION

```java
int ACC_ANNOTATION
```

The bit mask of {@link AccessFlag#ANNOTATION} access and property modifier.

## ClassFile.ACC_SUPER

```java
int ACC_SUPER
```

The bit mask of {@link AccessFlag#SUPER} access and property modifier.

## ClassFile.ACC_ABSTRACT

```java
int ACC_ABSTRACT
```

The bit mask of {@link AccessFlag#ABSTRACT} access and property modifier.

## ClassFile.ACC_VOLATILE

```java
int ACC_VOLATILE
```

The bit mask of {@link AccessFlag#VOLATILE} access and property modifier.

## ClassFile.ACC_TRANSIENT

```java
int ACC_TRANSIENT
```

The bit mask of {@link AccessFlag#TRANSIENT} access and property modifier.

## ClassFile.ACC_SYNTHETIC

```java
int ACC_SYNTHETIC
```

The bit mask of {@link AccessFlag#SYNTHETIC} access and property modifier.

## ClassFile.ACC_STATIC

```java
int ACC_STATIC
```

The bit mask of {@link AccessFlag#STATIC} access and property modifier.

## ClassFile.ACC_FINAL

```java
int ACC_FINAL
```

The bit mask of {@link AccessFlag#FINAL} access and property modifier.

## ClassFile.ACC_SYNCHRONIZED

```java
int ACC_SYNCHRONIZED
```

The bit mask of {@link AccessFlag#SYNCHRONIZED} access and property modifier.

## ClassFile.ACC_BRIDGE

```java
int ACC_BRIDGE
```

The bit mask of {@link AccessFlag#BRIDGE} access and property modifier.

## ClassFile.ACC_VARARGS

```java
int ACC_VARARGS
```

The bit mask of {@link AccessFlag#VARARGS} access and property modifier.

## ClassFile.ACC_NATIVE

```java
int ACC_NATIVE
```

The bit mask of {@link AccessFlag#NATIVE} access and property modifier.

## ClassFile.ACC_STRICT

```java
int ACC_STRICT
```

The bit mask of {@link AccessFlag#STRICT} access and property modifier.

## ClassFile.ACC_MODULE

```java
int ACC_MODULE
```

The bit mask of {@link AccessFlag#MODULE} access and property modifier.

## ClassFile.ACC_OPEN

```java
int ACC_OPEN
```

The bit mask of {@link AccessFlag#OPEN} access and property modifier.

## ClassFile.ACC_MANDATED

```java
int ACC_MANDATED
```

The bit mask of {@link AccessFlag#MANDATED} access and property modifier.

## ClassFile.ACC_TRANSITIVE

```java
int ACC_TRANSITIVE
```

The bit mask of {@link AccessFlag#TRANSITIVE} access and property modifier.

## ClassFile.ACC_STATIC_PHASE

```java
int ACC_STATIC_PHASE
```

The bit mask of {@link AccessFlag#STATIC_PHASE} access and property modifier.

## ClassFile.JAVA_1_VERSION

```java
int JAVA_1_VERSION
```

The class major version of the initial version of Java, {@value}.

@see ClassFileFormatVersion#RELEASE_0
@see ClassFileFormatVersion#RELEASE_1

## ClassFile.JAVA_2_VERSION

```java
int JAVA_2_VERSION
```

The class major version introduced by Java 2 SE 1.2, {@value}.

@see ClassFileFormatVersion#RELEASE_2

## ClassFile.JAVA_3_VERSION

```java
int JAVA_3_VERSION
```

The class major version introduced by Java 2 SE 1.3, {@value}.

@see ClassFileFormatVersion#RELEASE_3

## ClassFile.JAVA_4_VERSION

```java
int JAVA_4_VERSION
```

The class major version introduced by Java 2 SE 1.4, {@value}.

@see ClassFileFormatVersion#RELEASE_4

## ClassFile.JAVA_5_VERSION

```java
int JAVA_5_VERSION
```

The class major version introduced by Java 2 SE 5.0, {@value}.

@see ClassFileFormatVersion#RELEASE_5

## ClassFile.JAVA_6_VERSION

```java
int JAVA_6_VERSION
```

The class major version introduced by Java SE 6, {@value}.

@see ClassFileFormatVersion#RELEASE_6

## ClassFile.JAVA_7_VERSION

```java
int JAVA_7_VERSION
```

The class major version introduced by Java SE 7, {@value}.

@see ClassFileFormatVersion#RELEASE_7

## ClassFile.JAVA_8_VERSION

```java
int JAVA_8_VERSION
```

The class major version introduced by Java SE 8, {@value}.

@see ClassFileFormatVersion#RELEASE_8

## ClassFile.JAVA_9_VERSION

```java
int JAVA_9_VERSION
```

The class major version introduced by Java SE 9, {@value}.

@see ClassFileFormatVersion#RELEASE_9

## ClassFile.JAVA_10_VERSION

```java
int JAVA_10_VERSION
```

The class major version introduced by Java SE 10, {@value}.

@see ClassFileFormatVersion#RELEASE_10

## ClassFile.JAVA_11_VERSION

```java
int JAVA_11_VERSION
```

The class major version introduced by Java SE 11, {@value}.

@see ClassFileFormatVersion#RELEASE_11

## ClassFile.JAVA_12_VERSION

```java
int JAVA_12_VERSION
```

The class major version introduced by Java SE 12, {@value}.

@see ClassFileFormatVersion#RELEASE_12

## ClassFile.JAVA_13_VERSION

```java
int JAVA_13_VERSION
```

The class major version introduced by Java SE 13, {@value}.

@see ClassFileFormatVersion#RELEASE_13

## ClassFile.JAVA_14_VERSION

```java
int JAVA_14_VERSION
```

The class major version introduced by Java SE 14, {@value}.

@see ClassFileFormatVersion#RELEASE_14

## ClassFile.JAVA_15_VERSION

```java
int JAVA_15_VERSION
```

The class major version introduced by Java SE 15, {@value}.

@see ClassFileFormatVersion#RELEASE_15

## ClassFile.JAVA_16_VERSION

```java
int JAVA_16_VERSION
```

The class major version introduced by Java SE 16, {@value}.

@see ClassFileFormatVersion#RELEASE_16

## ClassFile.JAVA_17_VERSION

```java
int JAVA_17_VERSION
```

The class major version introduced by Java SE 17, {@value}.

@see ClassFileFormatVersion#RELEASE_17

## ClassFile.JAVA_18_VERSION

```java
int JAVA_18_VERSION
```

The class major version introduced by Java SE 18, {@value}.

@see ClassFileFormatVersion#RELEASE_18

## ClassFile.JAVA_19_VERSION

```java
int JAVA_19_VERSION
```

The class major version introduced by Java SE 19, {@value}.

@see ClassFileFormatVersion#RELEASE_19

## ClassFile.JAVA_20_VERSION

```java
int JAVA_20_VERSION
```

The class major version introduced by Java SE 20, {@value}.

@see ClassFileFormatVersion#RELEASE_20

## ClassFile.JAVA_21_VERSION

```java
int JAVA_21_VERSION
```

The class major version introduced by Java SE 21, {@value}.

@see ClassFileFormatVersion#RELEASE_21

## ClassFile.JAVA_22_VERSION

```java
int JAVA_22_VERSION
```

The class major version introduced by Java SE 22, {@value}.

@see ClassFileFormatVersion#RELEASE_22

## ClassFile.JAVA_23_VERSION

```java
int JAVA_23_VERSION
```

The class major version introduced by Java SE 23, {@value}.

@see ClassFileFormatVersion#RELEASE_23

## ClassFile.JAVA_24_VERSION

```java
int JAVA_24_VERSION
```

The class major version introduced by Java SE 24, {@value}.

@see ClassFileFormatVersion#RELEASE_24

## ClassFile.JAVA_25_VERSION

```java
int JAVA_25_VERSION
```

The class major version introduced by Java SE 25, {@value}.

@see ClassFileFormatVersion#RELEASE_25
@since 25

## ClassFile.PREVIEW_MINOR_VERSION

```java
int PREVIEW_MINOR_VERSION
```

A minor version number {@value} indicating a class uses preview features
of a Java SE release since 12, for major versions {@value
#JAVA_12_VERSION} and above.

## ClassFile.latestMajorVersion()

```java
static int latestMajorVersion()
```

{@return the latest class major version supported by the current runtime}

## ClassFile.latestMinorVersion()

```java
static int latestMinorVersion()
```

{@return the latest class minor version supported by the current runtime}

@apiNote
This does not report the {@link #PREVIEW_MINOR_VERSION} when the current
runtime has preview feature enabled, as {@code class} files with a major
version other than {@link #latestMajorVersion()} and the preview minor
version are not supported.