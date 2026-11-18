# groot

```octave
function h = groot ()
```

@deftypefn {} {@var{h} =} groot ()
Return a handle to the root graphics object.

The root graphics object is the ultimate parent of all graphics objects.

In addition, the root object contains information about the graphics
system as a whole such as the @code{ScreenSize}.  Use
@w{@code{get (groot)}}@ to find out what information is available.

Defaults for the graphic system as a whole are specified by setting
properties of the root graphics object that begin with @qcode{"Default"}.
For example, to set the default font for all text objects to FreeSans use

@example
set (groot, "DefaultTextFontName", "FreeSans")
@end example

Default properties can be deleted by using @code{set} with the special
property value of @qcode{"remove"}.  To undo the default font assignment
above use

@example
set (groot, "DefaultTextFontName", "remove")
@end example

Programming Note: The root graphics object is identified by the special
handle value of 0.  At some point this unique value may change, but code can
be made resistant to future changes by using @code{groot} which is
guaranteed to always return the root graphics object.
@seealso{gcf, gca, get, set}
@end deftypefn
