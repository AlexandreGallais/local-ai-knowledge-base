# substruct

```octave
function s = substruct (varargin)
```

@deftypefn {} {@var{s} =} substruct (@var{type}, @var{subs}, @dots{})
Create a subscript structure for use with @code{subsref} or @code{subsasgn}.

For example:

@example
@group
idx = substruct ("()", @{3, ":"@})
  @xresult{} idx =
       scalar structure containing the fields:
         type = ()
         subs =
         @{
           [1,1] =  3
           [1,2] = :
         @}
x = [1, 2, 3;
     4, 5, 6;
     7, 8, 9];
subsref (x, idx)
  @xresult{}   7   8   9
@end group
@end example

Note: The keyword @code{end} cannot be used within @code{subsref} or
@code{subsasgn} for indexing assignments.
@seealso{subsref, subsasgn}
@end deftypefn
