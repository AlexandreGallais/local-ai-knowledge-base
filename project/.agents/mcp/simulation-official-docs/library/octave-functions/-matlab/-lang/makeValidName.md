# makeValidName

```octave
function [varname, ismodified] = makeValidName (varargin)
```

@deftypefn  {} {@var{varname} =} matlab.lang.makeValidName (@var{str})
@deftypefnx {} {@var{varname} =} matlab.lang.makeValidName (@dots{}, @qcode{"ReplacementStyle"}, @var{rs})
@deftypefnx {} {@var{varname} =} matlab.lang.makeValidName (@dots{}, @qcode{"Prefix"}, @var{pfx})
@deftypefnx {} {[@var{varname}, @var{ismodified}] =} matlab.lang.makeValidName (@dots{})

Create valid variable name @var{varname} from @var{str}.

The input @var{str} must be a string or a cell array of strings.
The output @var{varname} will be of the same type.

A valid variable name is a sequence of letters, digits, and underscores that
does not begin with a digit.

The @qcode{"ReplacementStyle"} option specifies how invalid characters
are handled.  Acceptable values are

@table @asis
@item @qcode{"underscore"} (default)
Replace all invalid characters with an underscore (@qcode{"_"}).

@item @qcode{"delete"}
Remove any invalid character.

@item @qcode{"hex"}
Replace all invalid characters with their hexadecimal representation.
@end table

Whitespace characters are always removed @strong{prior} to the application
of the @qcode{"ReplacementStyle"}.  Lowercase letters following a whitespace
will be changed to uppercase.

The @qcode{"Prefix"} option specifies the string @var{pfx} to add as a
prefix to the input if it begins with a digit.  @var{pfx} must be a valid
variable name itself.  The default prefix is @qcode{"x"}.

The optional output @var{ismodified} is a logical array indicating whether
the respective element in @var{str} was a valid name or not.

@seealso{iskeyword, isvarname, matlab.lang.makeUniqueStrings}
@end deftypefn
