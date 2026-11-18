# native2unicode

```octave
function utf8_str = native2unicode (native_bytes, codepage = "")
```

@deftypefn  {} {@var{utf8_str} =} native2unicode (@var{native_bytes}, @var{codepage})
@deftypefnx {} {@var{utf8_str} =} native2unicode (@var{native_bytes})
Convert byte stream @var{native_bytes} to UTF-8 using @var{codepage}.

The numbers in the vector @var{native_bytes} are rounded and clipped to
integers between 0 and 255.  This byte stream is then mapped into the
code page given by the string @var{codepage} and returned in the string
@var{utf8_str}.  Octave uses UTF-8 as its internal encoding.  The string
@var{codepage} must be an identifier of a valid code page.  Examples for
valid code pages are @qcode{"ISO-8859-1"}, @qcode{"Shift-JIS"}, or
@qcode{"UTF-16"}.  For a list of supported code pages, see
@url{https://www.gnu.org/software/libiconv}.  If @var{codepage} is omitted
or empty, the system default codepage is used.

If @var{native_bytes} is a string vector, it is returned as is.

@seealso{unicode2native}
@end deftypefn
