# compare_versions

```octave
function tf = compare_versions (v1, v2, operator)
```

@deftypefn {} {@var{tf} =} compare_versions (@var{v1}, @var{v2}, @var{operator})
Compare two version strings using the given @var{operator}.

This function assumes that versions @var{v1} and @var{v2} are arbitrarily
long strings made of numeric and period characters possibly followed by an
arbitrary string (e.g., @qcode{"1.2.3"}, @qcode{"0.3"}, @qcode{"0.1.2+"},
or @qcode{"1.2.3.4-test1"}).

The version is first split into numeric and character portions and then
the parts are padded to be the same length (i.e., @qcode{"1.1"} would be
padded to be @qcode{"1.1.0"} when being compared with @qcode{"1.1.1"}, and
separately, the character parts of the strings are padded with nulls).

The operator can be any logical operator from the set

@itemize @bullet
@item
@qcode{"=="}
equal

@item
@qcode{"<"}
less than

@item
@qcode{"<="}
less than or equal to

@item
@qcode{">"}
greater than

@item
@qcode{">="}
greater than or equal to

@item @qcode{"!="}, @qcode{"~="}
not equal

@end itemize

Note that version @qcode{"1.1-test2"} will compare as greater than
@qcode{"1.1-test10"}.  Also, since the numeric part is compared first,
@qcode{"a"} compares less than @qcode{"1a"} because the second string
starts with a numeric part even though @code{double ("a")} is greater than
@code{double ("1").}
@end deftypefn
