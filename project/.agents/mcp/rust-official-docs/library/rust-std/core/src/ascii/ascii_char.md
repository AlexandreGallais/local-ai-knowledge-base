# core::ascii::ascii_char

This uses the name `AsciiChar`, even though it's not exposed that way right now,
because it avoids a whole bunch of "are you sure you didn't mean `char`?"
suggestions from rustc if you get anything slightly wrong in here, and overall
helps with clarity as we're also referring to `char` intentionally in here.