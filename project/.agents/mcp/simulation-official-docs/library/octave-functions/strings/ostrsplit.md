# ostrsplit

```octave
function cstr = ostrsplit (s, sep, strip_empty = false)
```

@deftypefn  {} {[@var{cstr}] =} ostrsplit (@var{s}, @var{sep})
@deftypefnx {} {[@var{cstr}] =} ostrsplit (@var{s}, @var{sep}, @var{strip_empty})
Split the string @var{s} using one or more separators @var{sep} and return
a cell array of strings.

Consecutive separators and separators at boundaries result in empty
strings, unless @var{strip_empty} is true.  The default value of
@var{strip_empty} is false.

2-D character arrays are split at separators and at the original column
boundaries.

Example:

@example
@group
ostrsplit ("a,b,c", ",")
      @xresult{}
          @{
            [1,1] = a
            [1,2] = b
            [1,3] = c
          @}

ostrsplit (["a,b" ; "cde"], ",")
      @xresult{}
          @{
            [1,1] = a
            [1,2] = b
            [1,3] = cde
          @}
@end group
@end example
@seealso{strsplit, strtok}
@end deftypefn
