# strjoin

```octave
function rval = strjoin (cstr, delimiter = " ")
```

@deftypefn  {} {@var{str} =} strjoin (@var{cstr})
@deftypefnx {} {@var{str} =} strjoin (@var{cstr}, @var{delimiter})
Join the elements of the cell string array, @var{cstr}, into a single
string.

If no @var{delimiter} is specified, the elements of @var{cstr} are
separated by a space.

If @var{delimiter} is specified as a string, the cell string array is
joined using the string.  Escape sequences are supported.

If @var{delimiter} is a cell string array whose length is one less than
@var{cstr}, then the elements of @var{cstr} are joined by interleaving the
cell string elements of @var{delimiter}.  Escape sequences are not
supported.

@example
@group
strjoin (@{'Octave','Scilab','Lush','Yorick'@}, '*')
      @xresult{} 'Octave*Scilab*Lush*Yorick'
@end group
@end example
@seealso{strsplit}
@end deftypefn
