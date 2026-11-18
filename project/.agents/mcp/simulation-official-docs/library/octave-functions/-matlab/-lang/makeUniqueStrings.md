# makeUniqueStrings

```octave
function [uniqstr, ismodified] = makeUniqueStrings (str, ex = {}, maxlength = Inf)
```

@deftypefn  {} {@var{uniqstr} =} matlab.lang.makeUniqueStrings (@var{str})
@deftypefnx {} {@var{uniqstr} =} matlab.lang.makeUniqueStrings (@var{str}, @var{ex})
@deftypefnx {} {@var{uniqstr} =} matlab.lang.makeUniqueStrings (@var{str}, @var{ex}, @var{maxlength})
@deftypefnx {} {[@var{uniqstr}, @var{ismodified}] =} matlab.lang.makeUniqueStrings (@dots{})

Construct a list of unique strings from a list of strings.

The input @var{str} must be a string or a cell array of strings.
The output @var{uniqstr} will be of the same type.

The algorithm makes two strings unique by appending an underscore
(@qcode{"_"} and a numeric count to the second string.

If @var{ex} is a string or a cell array of strings, @var{uniqstr} will
contain elements that are unique between themselves and with respect to
@var{ex}.

If @var{ex} is an index array or a logical array for @var{str} then it
selects the subset of @var{str} that are made unique.  Unselected elements
are not modified.

The optional input @var{maxlength} specifies the maximum length of any
string in @var{uniqstr}.  If an input string cannot be made unique without
exceeding @var{maxlength} an error is emitted.

The optional output @var{ismodified} is a logical array indicating whether
each element in @var{str} was modified to make it unique.

@seealso{unique, matlab.lang.makeValidName}
@end deftypefn
