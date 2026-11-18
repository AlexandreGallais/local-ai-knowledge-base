# usejava

```octave
function tf = usejava (feature)
```

@deftypefn {} {@var{tf} =} usejava (@var{feature})
Return true if the Java element @var{feature} is available.

Possible features are:

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

@code{usejava} determines if specific Java features are available in an
Octave session.  This function is provided for scripts which may alter
their behavior based on the availability of Java.  The feature
@qcode{"desktop"} always returns @code{false} as Octave has no Java-based
desktop.  Other features may be available if Octave was compiled with the
Java Interface and Java is installed.
@seealso{javachk}
@end deftypefn
