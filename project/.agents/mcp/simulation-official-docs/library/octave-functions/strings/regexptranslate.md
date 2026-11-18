# regexptranslate

```octave
function str = regexptranslate (op, s)
```

@deftypefn {} {@var{str} =} regexptranslate (@var{op}, @var{s})
Translate a string for use in a regular expression.

This may include either wildcard replacement or special character escaping.

The behavior is controlled by @var{op} which can take the following
values

@table @asis
@item @qcode{"wildcard"}
The wildcard characters @code{.}, @code{*}, and @code{?} are replaced with
wildcards that are appropriate for a regular expression.  For example:

@example
@group
regexptranslate ("wildcard", "*.m")
     @xresult{} '.*\.m'
@end group
@end example

@item @qcode{"escape"}
The characters @code{$.?[]}, that have special meaning for regular
expressions are escaped so that they are treated literally.  For example:

@example
@group
regexptranslate ("escape", "12.5")
     @xresult{} '12\.5'
@end group
@end example

@end table
@seealso{regexp, regexpi, regexprep}
@end deftypefn
