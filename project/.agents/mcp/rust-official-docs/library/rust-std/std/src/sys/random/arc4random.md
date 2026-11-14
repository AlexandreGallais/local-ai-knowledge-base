# std::sys::random::arc4random

Random data generation with `arc4random_buf`.

Contrary to its name, `arc4random` doesn't actually use the horribly-broken
RC4 cypher anymore, at least not on modern systems, but rather something
like ChaCha20 with continual reseeding from the OS. That makes it an ideal
source of large quantities of cryptographically secure data, which is
exactly what we need for `SystemRng`. Unfortunately, it's not available on
all UNIX systems, most notably Linux (until recently, but it's just a
wrapper for `getrandom`. Since we need to hook into `getrandom` directly for
`HashMap` keys anyway, we just keep our version).