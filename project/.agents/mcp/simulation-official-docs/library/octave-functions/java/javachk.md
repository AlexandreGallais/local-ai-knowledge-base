# javachk

```octave
function msg = javachk (feature, caller = "")
```

@deftypefn  {} {@var{msg} =} javachk (@var{feature})
@deftypefnx {} {@var{msg} =} javachk (@var{feature}, @var{caller})
Check for the presence of the Java @var{feature} in the current session.
Return an error structure if @var{feature} is not available, not enabled,
or not recognized.

Possible recognized features are:

@table @asis
@item @nospell{@qcode{"awt"}}
Abstract Window Toolkit for GUIs.

@item @qcode{"desktop"}
Interactive desktop is running.

@item @qcode{"jvm"}
Java Virtual Machine.

@item @qcode{"swing"}
Swing components for lightweight GUIs.
@end table

If @var{feature} is not supported, a scalar struct with field
@qcode{"message"} and @qcode{"identifier"} is returned.  The field
@qcode{"message"} contains an error message mentioning @var{feature} as
well as the optional user-specified @var{caller}.  This structure is
suitable for passing in to the @code{error} function.

If @var{feature} is supported and available, an empty struct array is
returned with fields @qcode{"message"} and @qcode{"identifier"}.

@code{javachk} determines if specific Java features are available in an
Octave session.  This function is provided for scripts which may alter
their behavior based on the availability of Java or specific Java runtime
features.

Compatibility Note: The feature @qcode{"desktop"} is never available since
Octave has no Java-based desktop.

@seealso{usejava, error}
@end deftypefn
