# std::sys::random::unix_legacy

Random data from `/dev/urandom`

Before `getentropy` was standardized in 2024, UNIX didn't have a standardized
way of getting random data, so systems just followed the precedent set by
Linux and exposed random devices at `/dev/random` and `/dev/urandom`. Thus,
for the few systems that support neither `arc4random_buf` nor `getentropy`
yet, we just read from the file.