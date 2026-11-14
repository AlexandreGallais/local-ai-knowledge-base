# ElementType enum (java.lang.annotation)

```java
public enum ElementType
```

The constants of this enumerated class provide a simple classification of the
syntactic locations where annotations may appear in a Java program. These
constants are used in {@link java.lang.annotation.Target Target}
meta-annotations to specify where it is legal to write annotations of a
given type.

<p>The syntactic locations where annotations may appear are split into
<em>declaration contexts</em>, where annotations apply to declarations, and
<em>type contexts</em>, where annotations apply to types used in
declarations and expressions.

<p>The constants {@link #ANNOTATION_TYPE}, {@link #CONSTRUCTOR}, {@link
#FIELD}, {@link #LOCAL_VARIABLE}, {@link #METHOD}, {@link #PACKAGE}, {@link
#MODULE}, {@link #PARAMETER}, {@link #TYPE}, and {@link #TYPE_PARAMETER}
correspond to the declaration contexts in JLS {@jls 9.6.4.1}.

<p>For example, an annotation whose interface is meta-annotated with
{@code @Target(ElementType.FIELD)} may only be written as a modifier for a
field declaration.

<p>The constant {@link #TYPE_USE} corresponds to the type contexts in JLS
{@jls 4.11}, as well as to two declaration contexts: class and interface
declarations (including annotation declarations) and type parameter
declarations.

<p>For example, an annotation whose interface is meta-annotated with
{@code @Target(ElementType.TYPE_USE)} may be written on the class or
interface of a field (or within the class or interface of the field, if it
is a nested or parameterized class or interface, or array class), and may
also appear as a modifier for, say, a class declaration.

<p>The {@code TYPE_USE} constant includes class and interface declarations
and type parameter declarations as a convenience for designers of
type checkers which give semantics to annotation interfaces. For example,
if the annotation interface {@code NonNull} is meta-annotated with
{@code @Target(ElementType.TYPE_USE)}, then {@code @NonNull}
{@code class C {...}} could be treated by a type checker as indicating that
all variables of class {@code C} are non-null, while still allowing
variables of other classes to be non-null or not non-null based on whether
{@code @NonNull} appears at the variable's declaration.

@author  Joshua Bloch
@since 1.5
@jls 9.6.4.1 @Target
@jls 4.1 The Kinds of Types and Values