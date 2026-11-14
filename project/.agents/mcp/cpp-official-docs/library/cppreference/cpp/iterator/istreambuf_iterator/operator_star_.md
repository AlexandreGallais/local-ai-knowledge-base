# std::istreambuf_iterator<CharT,Traits>::operator*

`CharT operator*() const;`

Reads a single character by calling `sbuf_->sgetc()` where `sbuf_` is the stored pointer to the stream buffer.

The behavior is undefined if the iterator is end-of-stream iterator.

### Parameters

(none)

### Return value

The value of the obtained character.

### Exceptions

May throw implementation-defined exceptions.
