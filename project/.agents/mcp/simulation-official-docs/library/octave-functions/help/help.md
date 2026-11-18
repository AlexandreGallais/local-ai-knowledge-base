# help

```octave
function retval = help (name)
```

@deftypefn  {} {} help @var{name}
@deftypefnx {} {} help --list
@deftypefnx {} {} help .
@deftypefnx {} {} help
@deftypefnx {} {@var{help_text} =} help (@dots{})
Display the help text for @var{name}.

For example, the command @kbd{help help} prints a short message describing
the @code{help} command.

Given the single argument @code{--list}, list all operators, keywords,
built-in functions, and loadable functions available in the current session
of Octave.

Given the single argument @code{.}, list all operators available in the
current session of Octave.

If invoked without any arguments, @code{help} displays instructions on how
to access help from the command line.

The help command can provide information about most operators, but
@var{name} must be enclosed by single or double quotes to prevent
the Octave interpreter from acting on @var{name}.  For example,
@code{help "+"} displays help on the addition operator.
@seealso{doc, lookfor, which, info}
@end deftypefn
