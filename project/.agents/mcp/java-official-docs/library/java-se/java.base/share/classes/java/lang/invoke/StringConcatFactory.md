# StringConcatFactory class (java.lang.invoke)

```java
public final class StringConcatFactory
```

<p>Methods to facilitate the creation of String concatenation methods, that
can be used to efficiently concatenate a known number of arguments of known
types, possibly after type adaptation and partial evaluation of arguments.
These methods are typically used as <em>bootstrap methods</em> for {@code
invokedynamic} call sites, to support the <em>string concatenation</em>
feature of the Java Programming Language.

<p>Indirect access to the behavior specified by the provided {@code
MethodHandle} proceeds in order through two phases:

<ol>
    <li><em>Linkage</em> occurs when the methods in this class are invoked.
They take as arguments a method type describing the concatenated arguments
count and types, and optionally the String <em>recipe</em>, plus the
constants that participate in the String concatenation. The details on
accepted recipe shapes are described further below. Linkage may involve
dynamically loading a new class that implements the expected concatenation
behavior. The {@code CallSite} holds the {@code MethodHandle} pointing to the
exact concatenation method. The concatenation methods may be shared among
different {@code CallSite}s, e.g. if linkage methods produce them as pure
functions.</li>

<li><em>Invocation</em> occurs when a generated concatenation method is
invoked with the exact dynamic arguments. This may occur many times for a
single concatenation method. The method referenced by the behavior {@code
MethodHandle} is invoked with the static arguments and any additional dynamic
arguments provided on invocation, as if by {@link MethodHandle#invoke(Object...)}.</li>
</ol>

<p> This class provides two forms of linkage methods: a simple version
({@link #makeConcat(java.lang.invoke.MethodHandles.Lookup, String,
MethodType)}) using only the dynamic arguments, and an advanced version
({@link #makeConcatWithConstants(java.lang.invoke.MethodHandles.Lookup,
String, MethodType, String, Object...)} using the advanced forms of capturing
the constant arguments. The advanced strategy can produce marginally better
invocation bytecode, at the expense of exploding the number of shapes of
string concatenation methods present at runtime, because those shapes would
include constant static arguments as well.

@author Aleksey Shipilev
@author Remi Forax
@author Peter Levart

@apiNote
<p>There is a JVM limit (classfile structural constraint): no method
can call with more than 255 slots. This limits the number of static and
dynamic arguments one can pass to bootstrap method. Since there are potential
concatenation strategies that use {@code MethodHandle} combinators, we need
to reserve a few empty slots on the parameter lists to capture the
temporal results. This is why bootstrap methods in this factory do not accept
more than 200 argument slots. Users requiring more than 200 argument slots in
concatenation are expected to split the large concatenation in smaller
expressions.

@since 9

## StringConcatFactory.makeConcat(MethodHandles.Lookup, String, MethodType)

```java
public static CallSite makeConcat(MethodHandles.Lookup lookup, String name, MethodType concatType) throws StringConcatException
```

Facilitates the creation of optimized String concatenation methods, that
can be used to efficiently concatenate a known number of arguments of
known types, possibly after type adaptation and partial evaluation of
arguments. Typically used as a <em>bootstrap method</em> for {@code
invokedynamic} call sites, to support the <em>string concatenation</em>
feature of the Java Programming Language.

<p>When the target of the {@code CallSite} returned from this method is
invoked, it returns the result of String concatenation, taking all
function arguments passed to the linkage method as inputs for
concatenation. The target signature is given by {@code concatType}.
For a target accepting:
<ul>
    <li>zero inputs, concatenation results in an empty string;</li>
    <li>one input, concatenation results in the single
    input converted as per JLS {@jls 5.1.11} "String Conversion"; otherwise</li>
    <li>two or more inputs, the inputs are concatenated as per
    requirements stated in JLS {@jls 15.18.1} "String Concatenation Operator +".
    The inputs are converted as per JLS {@jls 5.1.11} "String Conversion",
    and combined from left to right.</li>
</ul>

<p>Assume the linkage arguments are as follows:

<ul>
    <li>{@code concatType}, describing the {@code CallSite} signature</li>
</ul>

<p>Then the following linkage invariants must hold:

<ul>
    <li>The number of parameter slots in {@code concatType} is
        less than or equal to 200</li>
    <li>The return type in {@code concatType} is assignable from {@link java.lang.String}</li>
</ul>

@param lookup   Represents a lookup context with the accessibility
                privileges of the caller. Specifically, the lookup
                context must have
                {@linkplain MethodHandles.Lookup#hasFullPrivilegeAccess()
                full privilege access}.
                When used with {@code invokedynamic}, this is stacked
                automatically by the VM.
@param name     The name of the method to implement. This name is
                arbitrary, and has no meaning for this linkage method.
                When used with {@code invokedynamic}, this is provided by
                the {@code NameAndType} of the {@code InvokeDynamic}
                structure and is stacked automatically by the VM.
@param concatType The expected signature of the {@code CallSite}.  The
                  parameter types represent the types of concatenation
                  arguments; the return type is always assignable from {@link
                  java.lang.String}.  When used with {@code invokedynamic},
                  this is provided by the {@code NameAndType} of the {@code
                  InvokeDynamic} structure and is stacked automatically by
                  the VM.
@return a CallSite whose target can be used to perform String
concatenation, with dynamic concatenation arguments described by the given
{@code concatType}.
@throws StringConcatException If any of the linkage invariants described
                              here are violated, or the lookup context
                              does not have private access privileges.
@throws NullPointerException If any of the incoming arguments is null.
                             This will never happen when a bootstrap method
                             is called with invokedynamic.

@jls  5.1.11 String Conversion
@jls 15.18.1 String Concatenation Operator +

## StringConcatFactory.makeConcatWithConstants(MethodHandles.Lookup, String, MethodType, String, Object...)

```java
public static CallSite makeConcatWithConstants(MethodHandles.Lookup lookup, String name, MethodType concatType, String recipe, Object... constants) throws StringConcatException
```

Facilitates the creation of optimized String concatenation methods, that
can be used to efficiently concatenate a known number of arguments of
known types, possibly after type adaptation and partial evaluation of
arguments. Typically used as a <em>bootstrap method</em> for {@code
invokedynamic} call sites, to support the <em>string concatenation</em>
feature of the Java Programming Language.

<p>When the target of the {@code CallSite} returned from this method is
invoked, it returns the result of String concatenation, taking all
function arguments and constants passed to the linkage method as inputs for
concatenation. The target signature is given by {@code concatType}, and
does not include constants.
For a target accepting:
<ul>
    <li>zero inputs, concatenation results in an empty string;</li>
    <li>one input, concatenation results in the single
    input converted as per JLS {@jls 5.1.11} "String Conversion"; otherwise</li>
    <li>two or more inputs, the inputs are concatenated as per
    requirements stated in JLS {@jls 15.18.1} "String Concatenation Operator +".
    The inputs are converted as per JLS {@jls 5.1.11} "String Conversion",
    and combined from left to right.</li>
</ul>

<p>The concatenation <em>recipe</em> is a String description for the way to
construct a concatenated String from the arguments and constants. The
recipe is processed from left to right, and each character represents an
input to concatenation. Recipe characters mean:

<ul>

  <li><em>\1 (Unicode point 0001)</em>: an ordinary argument. This
  input is passed through dynamic argument, and is provided during the
  concatenation method invocation. This input can be null.</li>

  <li><em>\2 (Unicode point 0002):</em> a constant. This input passed
  through static bootstrap argument. This constant can be any value
  representable in constant pool. If necessary, the factory would call
  {@code toString} to perform a one-time String conversion.</li>

  <li><em>Any other char value:</em> a single character constant.</li>
</ul>

<p>Assume the linkage arguments are as follows:

<ul>
  <li>{@code concatType}, describing the {@code CallSite} signature</li>
  <li>{@code recipe}, describing the String recipe</li>
  <li>{@code constants}, the vararg array of constants</li>
</ul>

<p>Then the following linkage invariants must hold:

<ul>
  <li>The number of parameter slots in {@code concatType} is less than
      or equal to 200</li>

  <li>The parameter count in {@code concatType} is equal to number of \1 tags
  in {@code recipe}</li>

  <li>The return type in {@code concatType} is assignable
  from {@link java.lang.String}, and matches the return type of the
  returned {@link MethodHandle}</li>

  <li>The number of elements in {@code constants} is equal to number of \2
  tags in {@code recipe}</li>
</ul>

@param lookup    Represents a lookup context with the accessibility
                 privileges of the caller. Specifically, the lookup
                 context must have
                 {@linkplain MethodHandles.Lookup#hasFullPrivilegeAccess()
                 full privilege access}.
                 When used with {@code invokedynamic}, this is stacked
                 automatically by the VM.
@param name      The name of the method to implement. This name is
                 arbitrary, and has no meaning for this linkage method.
                 When used with {@code invokedynamic}, this is provided
                 by the {@code NameAndType} of the {@code InvokeDynamic}
                 structure and is stacked automatically by the VM.
@param concatType The expected signature of the {@code CallSite}.  The
                 parameter types represent the types of dynamic concatenation
                 arguments; the return type is always assignable from {@link
                 java.lang.String}.  When used with {@code
                 invokedynamic}, this is provided by the {@code
                 NameAndType} of the {@code InvokeDynamic} structure and
                 is stacked automatically by the VM.
@param recipe    Concatenation recipe, described above.
@param constants A vararg parameter representing the constants passed to
                 the linkage method.
@return a CallSite whose target can be used to perform String
concatenation, with dynamic concatenation arguments described by the given
{@code concatType}.
@throws StringConcatException If any of the linkage invariants described
                              here are violated, or the lookup context
                              does not have private access privileges.
@throws NullPointerException If any of the incoming arguments is null, or
                             any constant in {@code recipe} is null.
                             This will never happen when a bootstrap method
                             is called with invokedynamic.
@apiNote Code generators have three distinct ways to process a constant
string operand S in a string concatenation expression.  First, S can be
materialized as a reference (using ldc) and passed as an ordinary argument
(recipe '\1'). Or, S can be stored in the constant pool and passed as a
constant (recipe '\2') . Finally, if S contains neither of the recipe
tag characters ('\1', '\2') then S can be interpolated into the recipe
itself, causing its characters to be inserted into the result.

@jls  5.1.11 String Conversion
@jls 15.18.1 String Concatenation Operator +