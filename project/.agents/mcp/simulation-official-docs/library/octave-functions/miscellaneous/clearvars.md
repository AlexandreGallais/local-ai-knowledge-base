# clearvars

```octave
function clearvars (varargin)
```

@deftypefn  {} {} clearvars
@deftypefnx {} {} clearvars @var{pattern} @dots{}
@deftypefnx {} {} clearvars -regexp @var{pattern} @dots{}
@deftypefnx {} {} clearvars @dots{} -except @var{pattern} @dots{}
@deftypefnx {} {} clearvars @dots{} -except -regexp @var{pattern} @dots{}
@deftypefnx {} {} clearvars -global @dots{}
Delete the variables matching the given @var{pattern}s from memory.

The @var{pattern} may contain the following special characters:

@table @code
@item ?
Match any single character.

@item *
Match zero or more characters.

@item [ @var{list} ]
Match the list of characters specified by @var{list}.  If the first
character is @code{!} or @code{^}, match all characters except those
specified by @var{list}.  For example, the pattern @code{[a-zA-Z]} will
match all lowercase and uppercase alphabetic characters.
@end table

If the @option{-regexp} option is given then subsequent patterns are treated
as regular expressions and any matches will be cleared.

If the @option{-except} option is given then subsequent patterns select
variables that will @strong{not} be cleared.

If the @option{-global} option is given then all patterns will be applied
to global variables rather than local variables.

When called with no arguments, @code{clearvars} deletes all local variables.

Example Code:

Clear all variables starting with @qcode{'x'} and the specific variable
@qcode{"foobar"}

@example
clearvars x* foobar
@end example

Clear the specific variable @qcode{"foobar"} and use regular expressions to
clear all variables starting with @qcode{'x'} or @qcode{'y'}.

@example
clearvars foobar -regexp ^x ^y
@end example

Clear all variables except for @qcode{"foobar"}

@example
clearvars -except foobar
@end example

Clear all variables beginning with @qcode{"foo"}, except for those ending
in @qcode{"bar"}

@example
clearvars foo* -except -regexp bar$
@end example

@seealso{clear, who, whos, exist}
@end deftypefn
