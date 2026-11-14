# FormattableFlags class (java.util)

```java
public final class FormattableFlags
```

FormattableFlags are passed to the {@link Formattable#formatTo
Formattable.formatTo()} method and modify the output format for {@linkplain
Formattable Formattables}.  Implementations of {@link Formattable} are
responsible for interpreting and validating any flags.

@since  1.5

## FormattableFlags.LEFT_JUSTIFY

```java
public static final int LEFT_JUSTIFY
```

Left-justifies the output.  Spaces (<code>'&#92;u0020'</code>) will be added
at the end of the converted value as required to fill the minimum width
of the field.  If this flag is not set then the output will be
right-justified.

<p> This flag corresponds to {@code '-'} (<code>'&#92;u002d'</code>) in
the format specifier.

## FormattableFlags.UPPERCASE

```java
public static final int UPPERCASE
```

Converts the output to upper case according to the rules of the
{@linkplain java.util.Locale locale} given during creation of the
{@code formatter} argument of the {@link Formattable#formatTo
formatTo()} method.  The output should be equivalent the following
invocation of {@link String#toUpperCase(java.util.Locale)}

<pre>
    out.toUpperCase() </pre>

<p> This flag corresponds to {@code 'S'} (<code>'&#92;u0053'</code>) in
the format specifier.

## FormattableFlags.ALTERNATE

```java
public static final int ALTERNATE
```

Requires the output to use an alternate form.  The definition of the
form is specified by the {@code Formattable}.

<p> This flag corresponds to {@code '#'} (<code>'&#92;u0023'</code>) in
the format specifier.