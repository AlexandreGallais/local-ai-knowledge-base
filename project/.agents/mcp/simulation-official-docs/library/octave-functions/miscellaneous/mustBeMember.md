# mustBeMember

```octave
function mustBeMember (x, valid)
```

@deftypefn {} {} mustBeMember (@var{x}, @var{valid})

Require that input @var{x} is a member of a set of given valid values.

Raise an error if any element of the input @var{x} is not a member
of the set @var{valid}, as determined by @code{ismember (@var{x})}.

Programming Note: char inputs may behave strangely because of the
interaction between chars and cellstrings when calling @code{ismember} on
them.  But it will probably "do what you mean" if you just use it naturally.
To guarantee operation, convert all char arrays to cellstrings with
@code{cellstr}.

@seealso{mustBeNonempty, ismember}
@end deftypefn
