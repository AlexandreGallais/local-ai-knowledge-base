# __opengl_info__

```octave
function retval = __opengl_info__ ()
```

@deftypefn  {} {} __opengl_info__
@deftypefnx {} {@var{retval} =} __opengl_info__ ()

Get OpenGL driver information.

If no output values are requested, display information about the
OpenGL subsystem.  If an output is requested, return the information
in a structure.

Fields in the structure are:

@table @asis
@item version
OpenGL Driver version string

@item vendor
OpenGL Driver vendor string

@item renderer
OpenGL renderer string

@item extensions
List of enabled extensions for the OpenGL driver.
@end table

Example Code:

@example
glinfo = __opengl_info__ ();
@end example

@end deftypefn
