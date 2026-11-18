# inputParser

```octave
function addRequired (this, name, val = inputParser.def_val)
```

@deftypefn {} {@var{p} =} inputParser ()
Create object @var{p} of the inputParser class.

This class is designed to allow easy parsing of function arguments.  The
class supports four types of arguments:

@enumerate
@item mandatory (see @code{addRequired});

@item optional (see @code{addOptional});

@item named (see @code{addParameter});

@item switch (see @code{addSwitch}).
@end enumerate

After defining the function API with these methods, the supplied arguments
can be parsed with the @code{parse} method and the results accessed with
the @code{Results} accessor.
@end deftypefn

@deftypefn {} {} inputParser.Parameters
Return the list of parameter names already defined.  (read-only)
@end deftypefn

@deftypefn {} {} inputParser.Results
Return a structure with argument names as fieldnames and corresponding
values.  (read-only)
@end deftypefn

@deftypefn {} {} inputParser.Unmatched
Return a structure similar to @code{Results}, but for unmatched
parameters.  (read-only)
See the @code{KeepUnmatched} property.
@end deftypefn

@deftypefn {} {} inputParser.UsingDefaults
Return cell array with the names of arguments that are using default
values.  (read-only)
@end deftypefn

@deftypefn {} {} inputParser.FunctionName = @var{name}
Set function name to be used in error messages; Defaults to empty string.
@end deftypefn

@deftypefn {} {} inputParser.CaseSensitive = @var{boolean}
Set whether matching of argument names should be case sensitive; Defaults
to false.
@end deftypefn

@deftypefn {} {} inputParser.KeepUnmatched = @var{boolean}
Set whether string arguments which do not match any Parameter are parsed
and stored in the @code{Unmatched} property; Defaults to false.  If false,
an error will be emitted at the first unrecognized argument and parsing
will stop.  Note that since @code{Switch} and @code{Parameter} arguments
can be mixed, it is not possible to know the type of the unmatched
argument.  Octave assumes that all unmatched arguments are of the
@code{Parameter} type and therefore must be followed by a value.
@end deftypefn

@deftypefn {} {} inputParser.PartialMatching = @var{boolean}
Set whether argument names for @code{Parameter} and @code{Switch} options
may be given in shortened form as long as the name uniquely identifies
an option; Defaults to true.  For example, the argument @qcode{'opt'} will
match a parameter @qcode{'opt_color'}, but will fail if there is also a
parameter @qcode{'opt_case'}.
@end deftypefn

@deftypefn {} {} inputParser.StructExpand = @var{boolean}
Set whether a structure passed to the function is expanded into
parameter/value pairs (parameter = fieldname); Defaults to true.

The following example shows how to use this class:

@example
function check (varargin)
@c The next two comments need to be indented by one for alignment
  p = inputParser ();                      # create object
  p.FunctionName = "check";                # set function name
  p.addRequired ("pack", @@ischar);         # mandatory argument
  p.addOptional ("path", pwd(), @@ischar);  # optional argument

  ## Create anonymous function handle for validators
  valid_vec = @@(x) isvector (x) && all (x >= 0) && all (x <= 1);
  p.addOptional ("vec", [0 0], valid_vec);

  ## Create two arguments of type "Parameter"
  vld_type = @@(x) any (strcmp (x, @{"linear", "quadratic"@}));
  p.addParameter ("type", "linear", vld_type);
  vld_tol = @@(x) any (strcmp (x, @{"low", "medium", "high"@}));
  p.addParameter ("tolerance", "low", vld_tol);

  ## Create a switch type of argument
  p.addSwitch ("verbose");

  p.parse (varargin@{:@});  # Run created parser on inputs

  ## The rest of the function can access inputs by using p.Results.
  ## For example, get the tolerance input with p.Results.tolerance
endfunction
@end example

@example
@group
check ("mech");           # valid, use defaults for other arguments
check ();                 # error, one argument is mandatory
check (1);                # error, since ! ischar
check ("mech", "~/dev");  # valid, use defaults for other arguments

check ("mech", "~/dev", [0 1 0 0], "type", "linear");  # valid

## following is also valid.  Note how the Switch argument type can
## be mixed in with or before the Parameter argument type (but it
## must still appear after any Optional arguments).
check ("mech", "~/dev", [0 1 0 0], "verbose", "tolerance", "high");

## following returns an error since an Optional argument, 'path',
## was given after the Parameter argument 'type'.
check ("mech", "type", "linear", "~/dev");
@end group
@end example

@emph{Note 1}: A function can have any mixture of the four API types but
they must appear in a specific order.  @code{Required} arguments must be
first and can be followed by any @code{Optional} arguments.  Only the
@code{Parameter} and @code{Switch} arguments may be mixed together and
they must appear following the first two types.

@emph{Note 2}: If both @code{Optional} and @code{Parameter} arguments
are mixed in a function API then once a string Optional argument fails to
validate it will be considered the end of the @code{Optional} arguments.
The remaining arguments will be compared against any @code{Parameter} or
@code{Switch} arguments.

@seealso{nargin, validateattributes, validatestring, varargin}
@end deftypefn
