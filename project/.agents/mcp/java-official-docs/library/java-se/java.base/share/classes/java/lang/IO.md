# IO class (java.lang)

```java
public final class IO
```

A collection of static methods that provide convenient access to {@link System#in}
and {@link System#out} for line-oriented input and output.
<p>
The {@link #readln()} and {@link #readln(String)} methods decode bytes read from
{@code System.in} into characters. The charset used for decoding is specified by the
{@link System##stdin.encoding stdin.encoding} property. If this property is not present,
or if the charset it names cannot be loaded, then UTF-8 is used instead. Decoding
always replaces malformed and unmappable byte sequences with the charset's default
replacement string.
<p>
Charset decoding is set up upon the first call to one of the {@code readln} methods.
Decoding may buffer additional bytes beyond those that have been decoded to characters
returned to the application. After the first call to one of the {@code readln} methods,
any subsequent use of {@code System.in} results in unspecified behavior.

@apiNote
The expected use case is that certain applications will use only the {@code readln}
methods to read from the standard input, and they will not mix these calls with
other techniques for reading from {@code System.in}.

@since 25

## IO.println(Object)

```java
public static void println(Object obj)
```

Writes a string representation of the specified object and then writes
a line separator to the standard output.

<p> The effect is as if {@link java.io.PrintStream#println(Object) println(obj)}
had been called on {@code System.out}.

@param obj the object to print, may be {@code null}

## IO.println()

```java
public static void println()
```

Writes a line separator to the standard output.

<p> The effect is as if {@link java.io.PrintStream#println() println()}
had been called on {@code System.out}.

## IO.print(Object)

```java
public static void print(Object obj)
```

Writes a string representation of the specified object to the
standard output.

<p> The effect is as if {@link java.io.PrintStream#print(Object) print(obj)}
had been called on {@code System.out}.

@param obj the object to print, may be {@code null}

## IO.readln()

```java
public static String readln()
```

Reads a single line of text from the standard input.
<p>
One line is read from the decoded input as if by
{@link java.io.BufferedReader#readLine() BufferedReader.readLine()}
and then the result is returned.
<p>
If necessary, this method first sets up charset decoding, as described in
above in the class specification.

@return a string containing the line read from the standard input, not
including any line separator characters. Returns {@code null} if an
end of stream has been reached without having read any characters.

@throws IOError if an I/O error occurs

## IO.readln(String)

```java
public static String readln(String prompt)
```

Writes a prompt and then reads a line of input.
<p>
Writes a prompt as if by calling {@link #print print}, and then reads a single
line of text as if by calling {@link #readln() readln}.
<p>
If necessary, this method first sets up charset decoding, as described in
above in the class specification.

@param prompt the prompt string, may be {@code null}

@return a string containing the line read from the standard input, not
including any line separator characters. Returns {@code null} if an
end of stream has been reached without having read any characters.

@throws IOError if an I/O error occurs