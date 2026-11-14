---
title: "FormattableFlags class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/FormattableFlags.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FormattableFlags class (java.util)

```java
public final class FormattableFlags
```

FormattableFlags are passed to the Formattable.formatTo() method and modify the output format for Formattables.  Implementations of `Formattable` are
responsible for interpreting and validating any flags.

**Since:** 1.5

## FormattableFlags.LEFT_JUSTIFY

```java
public static final int LEFT_JUSTIFY
```

Left-justifies the output.  Spaces (`'\u0020'`) will be added
at the end of the converted value as required to fill the minimum width
of the field.  If this flag is not set then the output will be
right-justified.

 This flag corresponds to `'-'` (`'\u002d'`) in
the format specifier.

## FormattableFlags.UPPERCASE

```java
public static final int UPPERCASE
```

Converts the output to upper case according to the rules of the
locale given during creation of the
`formatter` argument of the formatTo() method.  The output should be equivalent the following
invocation of `String.toUpperCase(java.util.Locale)`

```java
    out.toUpperCase()
```

 This flag corresponds to `'S'` (`'\u0053'`) in
the format specifier.

## FormattableFlags.ALTERNATE

```java
public static final int ALTERNATE
```

Requires the output to use an alternate form.  The definition of the
form is specified by the `Formattable`.

 This flag corresponds to `'#'` (`'\u0023'`) in
the format specifier.
