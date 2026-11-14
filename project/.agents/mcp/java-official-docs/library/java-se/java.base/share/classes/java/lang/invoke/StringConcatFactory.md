---
title: "StringConcatFactory class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/StringConcatFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringConcatFactory class (java.lang.invoke)

```java
public final class StringConcatFactory
```

Methods to facilitate the creation of String concatenation methods, that
can be used to efficiently concatenate a known number of arguments of known
types, possibly after type adaptation and partial evaluation of arguments.
These methods are typically used as *bootstrap methods* for `invokedynamic` call sites, to support the *string concatenation*
feature of the Java Programming Language.

Indirect access to the behavior specified by the provided `MethodHandle` proceeds in order through two phases:

- *Linkage* occurs when the methods in this class are invoked.
They take as arguments a method type describing the concatenated arguments
count and types, and optionally the String *recipe*, plus the
constants that participate in the String concatenation. The details on
accepted recipe shapes are described further below. Linkage may involve
dynamically loading a new class that implements the expected concatenation
behavior. The `CallSite` holds the `MethodHandle` pointing to the
exact concatenation method. The concatenation methods may be shared among
different `CallSite`s, e.g. if linkage methods produce them as pure
functions.

- *Invocation* occurs when a generated concatenation method is
invoked with the exact dynamic arguments. This may occur many times for a
single concatenation method. The method referenced by the behavior `MethodHandle` is invoked with the static arguments and any additional dynamic
arguments provided on invocation, as if by `MethodHandle.invoke(Object...)`.

 This class provides two forms of linkage methods: a simple version
(String, MethodType)) using only the dynamic arguments, and an advanced version
(String, MethodType, String, Object...) using the advanced forms of capturing
the constant arguments. The advanced strategy can produce marginally better
invocation bytecode, at the expense of exploding the number of shapes of
string concatenation methods present at runtime, because those shapes would
include constant static arguments as well.

**API note:** There is a JVM limit (classfile structural constraint): no method
can call with more than 255 slots. This limits the number of static and
dynamic arguments one can pass to bootstrap method. Since there are potential
concatenation strategies that use `MethodHandle` combinators, we need
to reserve a few empty slots on the parameter lists to capture the
temporal results. This is why bootstrap methods in this factory do not accept
more than 200 argument slots. Users requiring more than 200 argument slots in
concatenation are expected to split the large concatenation in smaller
expressions.

**Since:** 9

## StringConcatFactory.makeConcat(MethodHandles.Lookup, String, MethodType)

```java
public static CallSite makeConcat(MethodHandles.Lookup lookup, String name, MethodType concatType) throws StringConcatException
```

Facilitates the creation of optimized String concatenation methods, that
can be used to efficiently concatenate a known number of arguments of
known types, possibly after type adaptation and partial evaluation of
arguments. Typically used as a *bootstrap method* for `invokedynamic` call sites, to support the *string concatenation*
feature of the Java Programming Language.

When the target of the `CallSite` returned from this method is
invoked, it returns the result of String concatenation, taking all
function arguments passed to the linkage method as inputs for
concatenation. The target signature is given by `concatType`.
For a target accepting:

- zero inputs, concatenation results in an empty string;

- one input, concatenation results in the single
    input converted as per JLS  "String Conversion"; otherwise

- two or more inputs, the inputs are concatenated as per
    requirements stated in JLS  "String Concatenation Operator +".
    The inputs are converted as per JLS  "String Conversion",
    and combined from left to right.

Assume the linkage arguments are as follows:

- `concatType`, describing the `CallSite` signature

Then the following linkage invariants must hold:

- The number of parameter slots in `concatType` is
        less than or equal to 200

- The return type in `concatType` is assignable from `java.lang.String`

Parameters:

- `lookup`: Represents a lookup context with the accessibility privileges of the caller. Specifically, the lookup context must have full privilege access. When used with `invokedynamic`, this is stacked automatically by the VM.
- `name`: The name of the method to implement. This name is arbitrary, and has no meaning for this linkage method. When used with `invokedynamic`, this is provided by the `NameAndType` of the `InvokeDynamic` structure and is stacked automatically by the VM.
- `concatType`: The expected signature of the `CallSite`. The parameter types represent the types of concatenation arguments; the return type is always assignable from `java.lang.String`. When used with `invokedynamic`, this is provided by the `NameAndType` of the `InvokeDynamic` structure and is stacked automatically by the VM.

**Returns:** a CallSite whose target can be used to perform String
concatenation, with dynamic concatenation arguments described by the given
`concatType`.

**JLS:** 5.1.11 String Conversion

**JLS:** 15.18.1 String Concatenation Operator +

Throws:

- `StringConcatException`: If any of the linkage invariants described here are violated, or the lookup context does not have private access privileges.
- `NullPointerException`: If any of the incoming arguments is null. This will never happen when a bootstrap method is called with invokedynamic.

## StringConcatFactory.makeConcatWithConstants(MethodHandles.Lookup, String, MethodType, String, Object...)

```java
public static CallSite makeConcatWithConstants(MethodHandles.Lookup lookup, String name, MethodType concatType, String recipe, Object... constants) throws StringConcatException
```

Facilitates the creation of optimized String concatenation methods, that
can be used to efficiently concatenate a known number of arguments of
known types, possibly after type adaptation and partial evaluation of
arguments. Typically used as a *bootstrap method* for `invokedynamic` call sites, to support the *string concatenation*
feature of the Java Programming Language.

When the target of the `CallSite` returned from this method is
invoked, it returns the result of String concatenation, taking all
function arguments and constants passed to the linkage method as inputs for
concatenation. The target signature is given by `concatType`, and
does not include constants.
For a target accepting:

- zero inputs, concatenation results in an empty string;

- one input, concatenation results in the single
    input converted as per JLS  "String Conversion"; otherwise

- two or more inputs, the inputs are concatenated as per
    requirements stated in JLS  "String Concatenation Operator +".
    The inputs are converted as per JLS  "String Conversion",
    and combined from left to right.

The concatenation *recipe* is a String description for the way to
construct a concatenated String from the arguments and constants. The
recipe is processed from left to right, and each character represents an
input to concatenation. Recipe characters mean:

- *\1 (Unicode point 0001)*: an ordinary argument. This
  input is passed through dynamic argument, and is provided during the
  concatenation method invocation. This input can be null.

- *\2 (Unicode point 0002):* a constant. This input passed
  through static bootstrap argument. This constant can be any value
  representable in constant pool. If necessary, the factory would call
  `toString` to perform a one-time String conversion.

- *Any other char value:* a single character constant.

Assume the linkage arguments are as follows:

- `concatType`, describing the `CallSite` signature

- `recipe`, describing the String recipe

- `constants`, the vararg array of constants

Then the following linkage invariants must hold:

- The number of parameter slots in `concatType` is less than
      or equal to 200

- The parameter count in `concatType` is equal to number of \1 tags
  in `recipe`

- The return type in `concatType` is assignable
  from `java.lang.String`, and matches the return type of the
  returned `MethodHandle`

- The number of elements in `constants` is equal to number of \2
  tags in `recipe`

Parameters:

- `lookup`: Represents a lookup context with the accessibility privileges of the caller. Specifically, the lookup context must have full privilege access. When used with `invokedynamic`, this is stacked automatically by the VM.
- `name`: The name of the method to implement. This name is arbitrary, and has no meaning for this linkage method. When used with `invokedynamic`, this is provided by the `NameAndType` of the `InvokeDynamic` structure and is stacked automatically by the VM.
- `concatType`: The expected signature of the `CallSite`. The parameter types represent the types of dynamic concatenation arguments; the return type is always assignable from `java.lang.String`. When used with `invokedynamic`, this is provided by the `NameAndType` of the `InvokeDynamic` structure and is stacked automatically by the VM.
- `recipe`: Concatenation recipe, described above.
- `constants`: A vararg parameter representing the constants passed to the linkage method.

**Returns:** a CallSite whose target can be used to perform String
concatenation, with dynamic concatenation arguments described by the given
`concatType`.

**API note:** Code generators have three distinct ways to process a constant
string operand S in a string concatenation expression.  First, S can be
materialized as a reference (using ldc) and passed as an ordinary argument
(recipe '\1'). Or, S can be stored in the constant pool and passed as a
constant (recipe '\2') . Finally, if S contains neither of the recipe
tag characters ('\1', '\2') then S can be interpolated into the recipe
itself, causing its characters to be inserted into the result.

**JLS:** 5.1.11 String Conversion

**JLS:** 15.18.1 String Concatenation Operator +

Throws:

- `StringConcatException`: If any of the linkage invariants described here are violated, or the lookup context does not have private access privileges.
- `NullPointerException`: If any of the incoming arguments is null, or any constant in `recipe` is null. This will never happen when a bootstrap method is called with invokedynamic.
