# web

```octave
function [status, h, url] = web (url, varargin)
```

@deftypefn  {} {@var{status} =} web ()
@deftypefnx {} {@var{status} =} web (@var{url})
@deftypefnx {} {@var{status} =} web (@var{url}, @var{option})
@deftypefnx {} {@var{status} =} web (@var{url}, @var{option_1}, @dots{}, @var{option_N})
@deftypefnx {} {[@var{status}, @var{h}, @var{url}] =} web (@dots{})

Open @var{url} in the default system web browser.

With no arguments given, the address @url{https://www.octave.org} is
opened.

Additional options can be passed for @sc{matlab} compatibility, but are
ignored.

@itemize @bullet
@item
@samp{-browser} Open @var{url} in the default system browser.

@item
@samp{-new} No effect on the system browser.

@item
@samp{-noaddressbox} No effect on the system browser.

@item
@samp{-notoolbar} No effect on the system browser.

@end itemize

The return value @var{status} has one of the values:

@itemize @bullet
@item
@samp{0} Found and opened system browser successfully.

@item
@samp{1} Cannot find the system browser.

@item
@samp{2} System browser found, but an error occurred.

@end itemize

The return values @var{handle} and @var{url} are currently unimplemented
but given for compatibility.

@seealso{weboptions, webread, webwrite, urlread, urlwrite}
@end deftypefn
