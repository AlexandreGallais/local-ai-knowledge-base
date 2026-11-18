# optimget

```octave
function optval = optimget (options, optname, default)
```

@deftypefn  {} {@var{val} =} optimget (@var{options}, @var{par})
@deftypefnx {} {@var{val} =} optimget (@var{options}, @var{par}, @var{default})
Return the value of the specific parameter @var{par} from the optimization
options structure @var{options} created by @code{optimset}.

If @var{par} is not defined then return the @var{default} value if
supplied, otherwise return an empty matrix.

If @var{par} does not exactly match the name of a standard parameter,
@code{optimget} will attempt to match @var{par} to a standard parameter
and will return that parameter's value if a match is found.  Matching is
case insensitive and is based on character matching at the start of the
parameter name.  @code{optimget} produces an error if it finds multiple
ambiguous matches.  If no standard parameter matches are found a warning is
issued.  See @code{optimset} for information about the standard options
list.

Note: Only parameter names from the standard list are considered when
matching short parameter names, and @var{par} will always be expanded to
match a standard parameter even if an exact non-standard match exists.  The
value of a non-standard parameter that is ambiguous with one or more
standard parameters cannot be returned by @code{optimget} and can only be
accessed using @code{getfield} or dot notation for structs.
@seealso{optimset}
@end deftypefn
