# verLessThan

```octave
function tf = verLessThan (package, version)
```

@deftypefn {} {@var{tf} =} verLessThan (@var{package}, @var{version})
Return true if the installed version of the package is less than
@var{version}.

@var{package} is the name of the package to check.  Use @qcode{"Octave"} as
the @var{package} to check the version of Octave itself.

@var{version} is the version to compare it to.  A version is a string in the
format accepted by @code{compare_versions}: an arbitrarily long string
composed of numeric and period characters, possibly followed by an arbitrary
string (e.g., @qcode{"1.2.3"}, @qcode{"0.3"}, @qcode{"0.1.2+"}, or
@qcode{"1.2.3.4-test1"}).

Examples:

@example
@group
tf = verLessThan ("Octave", "5")
@xresult{} tf = 0

tf = verLessThan ("io", "2.4.12")
@xresult{} ...

if (! verLessThan ("Octave", "5"))
  ## ... use new Octave 5 features ...
endif
@end group
@end example

@seealso{compare_versions, version, ver, pkg}
@end deftypefn
