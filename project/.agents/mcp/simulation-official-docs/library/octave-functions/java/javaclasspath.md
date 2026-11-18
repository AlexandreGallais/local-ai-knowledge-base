# javaclasspath

```octave
function [path1, path2] = javaclasspath (what = "")
```

@deftypefn  {} {} javaclasspath ()
@deftypefnx {} {@var{dpath} =} javaclasspath ()
@deftypefnx {} {[@var{dpath}, @var{spath}] =} javaclasspath ()
@deftypefnx {} {@var{clspath} =} javaclasspath (@var{what})
Return the class path of the Java virtual machine in the form of a cell
array of strings.

If called with no inputs:

@itemize
@item If no output is requested, the dynamic and static classpaths are
printed to the standard output.

@item If one output value @var{dpath} is requested, the result is the
dynamic classpath.

@item If two output values@var{dpath} and @var{spath} are requested, the
first variable will contain the dynamic classpath and the second will
contain the static classpath.
@end itemize

If called with a single input parameter @var{what}:

@table @asis
@item @qcode{"-dynamic"}
Return the dynamic classpath.

@item @qcode{"-static"}
Return the static classpath.

@item @qcode{"-all"}
Return both the static and dynamic classpath in a single cellstr.
@end table
@seealso{javaaddpath, javarmpath}
@end deftypefn
