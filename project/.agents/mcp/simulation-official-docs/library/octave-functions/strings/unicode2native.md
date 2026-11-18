# unicode2native

```octave
function native_bytes = unicode2native (utf8_str, codepage = "")
```

@deftypefn  {} {@var{native_bytes} =} unicode2native (@var{utf8_str}, @var{codepage})
@deftypefnx {} {@var{native_bytes} =} unicode2native (@var{utf8_str})
Convert UTF-8 string @var{utf8_str} to byte stream using @var{codepage}.

The character vector @var{utf8_str} is converted to a byte stream
@var{native_bytes} using the code page given by @var{codepage}.  The
string @var{codepage} must be an identifier of a valid code page.
Examples for valid code pages are @qcode{"ISO-8859-1"},
@qcode{"Shift-JIS"}, or @qcode{"UTF-16"}.  For a list of supported code
pages, see @url{https://www.gnu.org/software/libiconv}.  If @var{codepage}
is omitted or empty, the system default codepage is used.

If any of the characters cannot be mapped into the codepage @var{codepage},
they are replaced with the appropriate substitution sequence for that
codepage.

@seealso{native2unicode}
@end deftypefn
