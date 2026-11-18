# get_first_help_sentence

```octave
function [text, status] = get_first_help_sentence (name, max_len = 80)
```

@deftypefn  {} {@var{text} =} get_first_help_sentence (@var{name})
@deftypefnx {} {@var{text} =} get_first_help_sentence (@var{name}, @var{max_len})
@deftypefnx {} {[@var{text}, @var{status}] =} get_first_help_sentence (@dots{})
Return the first sentence of a function's help text.

The first sentence is defined as the text after the function declaration
until either the first period (".") or the first appearance of two
consecutive newlines ("\n\n").  The text is truncated to a maximum length of
@var{max_len}, which defaults to 80.  If the text must be truncated the last
three characters of the text are replaced with @qcode{"..."} to indicate
that more text was available.

The optional output argument @var{status} returns the status reported by
@code{makeinfo}.  If only one output argument is requested, and @var{status}
is nonzero, a warning is displayed.

As an example, the first sentence of this help text is

@example
@group
get_first_help_sentence ("get_first_help_sentence")
@print{} ans = Return the first sentence of a function's help text.
@end group
@end example
@end deftypefn
