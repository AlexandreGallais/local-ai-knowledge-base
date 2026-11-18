# substr

```octave
function str = substr (s, offset, len)
```

@deftypefn  {} {@var{str} =} substr (@var{s}, @var{offset})
@deftypefnx {} {} substr (@var{s}, @var{offset}, @var{len})
Return the substring of @var{s} which starts at character number
@var{offset} and is @var{len} characters long.

Position numbering for offsets begins with 1.  If @var{offset} is negative,
extraction starts that far from the end of the string.

If @var{len} is omitted, the substring extends to the end of @var{s}.  A
negative value for @var{len} extracts to within @var{len} characters of
the end of the string

Examples:

@example
@group
substr ("This is a test string", 6, 9)
     @xresult{} "is a test"
substr ("This is a test string", -11)
     @xresult{} "test string"
substr ("This is a test string", -11, -7)
     @xresult{} "test"
@end group
@end example

This function is patterned after the equivalent function in Perl.
@end deftypefn
