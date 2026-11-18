# setfield

```octave
function sout = setfield (s, varargin)
```

@deftypefn  {} {@var{sout} =} setfield (@var{s}, @var{field}, @var{val})
@deftypefnx {} {@var{sout} =} setfield (@var{s}, @var{sidx1}, @var{field1}, @var{fidx1}, @var{sidx2}, @var{field2}, @var{fidx2}, @dots{}, @var{val})

Return a @emph{copy} of the structure @var{s} with the field member
@var{field} set to the value @var{val}.

For example:

@example
@group
@var{s} = struct ();
@var{s} = setfield (@var{s}, "foo bar", 42);
@end group
@end example

@noindent
This is equivalent to

@example
@var{s}.("foo bar") = 42;
@end example

@noindent
Note that ordinary structure syntax @code{@var{s}.foo bar = 42} cannot be
used here, as the field name is not a valid Octave identifier because of
the space character.  Using arbitrary strings for field names is
incompatible with @sc{matlab}, and this usage will emit a warning if the
warning ID @code{Octave:language-extension} is enabled.
@xref{XREFwarning_ids,,warning_ids}.

With the second calling form, set a field of a structure array.  The
input @var{sidx} selects an element of the structure array, @var{field}
specifies the field name of the selected element, and @var{fidx} selects
which element of the field (in the case of an array or cell array).
The @var{sidx}, @var{field}, and @var{fidx} inputs can be repeated to
address nested structure array elements.  The structure array index and
field element index must be cell arrays while the field name must be a
string.

For example:

@example
@group
@var{s} = struct ("baz", 42);
setfield (@var{s}, @{1@}, "foo", @{1@}, "bar", 54)
@xresult{}
  ans =
    scalar structure containing the fields:
      baz =  42
      foo =
        scalar structure containing the fields:
          bar =  54
@end group
@end example

The example begins with an ordinary scalar structure to which a nested
scalar structure is added.  In all cases, if the structure index @var{sidx}
is not specified it defaults to 1 (scalar structure).  Thus, the example
above could be written more concisely as
@code{setfield (@var{s}, "foo", "bar", 54)}

Finally, an example with nested structure arrays:

@example
@group
@var{sa}.foo = 1;
@var{sa} = setfield (@var{sa}, @{2@}, "bar", @{3@}, "baz", @{1, 4@}, 5);
@var{sa}(2).bar(3)
@xresult{}
  ans =
    scalar structure containing the fields:
      baz =  0   0   0   5
@end group
@end example

Here @var{sa} is a structure array whose field at elements 1 and 2 is in
turn another structure array whose third element is a simple scalar
structure.  The terminal scalar structure has a field which contains a
matrix value.

Note that the same result as in the above example could be achieved by:

@example
@group
@var{sa}.foo = 1;
@var{sa}(2).bar(3).baz(1,4) = 5
@end group
@end example
@seealso{getfield, rmfield, orderfields, isfield, fieldnames, isstruct,
struct}
@end deftypefn
