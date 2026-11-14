# std::basic_streambuf<CharT,Traits>::overflow

`protected: virtual int_type overflow( int_type ch = Traits::eof() );`

Ensures that there is space at the put area for at least one character by saving some initial subsequence of characters starting at `pbase()` to the output sequence and updating the pointers to the put area (if needed). If `ch` is not `Traits::eof()` (i.e. `Traits::eq_int_type(ch, Traits::eof()) != true`), it is either put to the put area or directly saved to the output sequence.

The function may update `pptr`, `epptr` and `pbase` pointers to define the location to write more data. On failure, the function ensures that either `pptr() == nullptr` or `pptr() == epptr`.

The base class version of the function does nothing. The derived classes may override this function to allow updates to the put area in the case of exhaustion.

### Parameters

ch - the character to store in the put area

### Return value

Returns unspecified value not equal to `Traits::eof()` on success, `Traits::eof()` on failure.

The base class version of the function returns `Traits::eof()`.

### Note

The `sputc()` and `sputn()` call this function in case of an overflow (`pptr() == nullptr` or `pptr() >= epptr()`).

### Example

```cpp
#include <array>
#include <cstddef>
#include <iostream>

// Buffer for std::ostream implemented by std::array
template<std::size_t size, class CharT = char>
struct ArrayedStreamBuffer : std::basic_streambuf<CharT>
{
    using Base = std::basic_streambuf<CharT>;
    using char_type = typename Base::char_type;
    using int_type = typename Base::int_type;

    ArrayedStreamBuffer()
    {
        // put area pointers to work with 'buffer'
        Base::setp(buffer.data(), buffer.data() + size);
    }

    int_type overflow(int_type ch)
    {
        std::cout << "overflow\n";
        return Base::overflow(ch);
    }

    void print_buffer()
    {
        for (char_type i : buffer)
        {
            if (i == 0)
                std::cout << "\\0";
            else
                std::cout << i;
            std::cout << ' ';
        }
        std::cout << '\n';
    }

private:
    std::array<char_type, size> buffer{}; // value-initialize buffer
};

int main()
{
    ArrayedStreamBuffer<10> streambuf;
    std::ostream stream(&streambuf);

    stream << "hello";
    streambuf.print_buffer();
    if (stream.good())
        std::cout << "stream is good\n";

    stream << "world";
    streambuf.print_buffer();
    if (stream.good())
        std::cout << "stream is good\n";

    stream << "!";
    streambuf.print_buffer();
    if (!stream.good())
        std::cout << "stream is not good\n";
}
```

Output:

```text
h e l l o \0 \0 \0 \0 \0
stream is good
h e l l o w o r l d
stream is good
overflow
h e l l o w o r l d
stream is not good
```

### See also

|  |  |
| --- | --- |
| uflow [virtual] | reads characters from the associated input sequence to the get area and advances the next pointer (virtual protected member function) |
| underflow [virtual] | reads characters from the associated input sequence to the get area (virtual protected member function) |
| overflow [virtual] | writes characters to the associated file from the put area (virtual protected member function of `std::basic_filebuf<CharT,Traits>`) |
| overflow [virtual] | appends a character to the output sequence (virtual protected member function of `std::basic_stringbuf<CharT,Traits,Allocator>`) |
| overflow [virtual] | appends a character to the output sequence, may reallocate or initially allocate the buffer if dynamic and not frozen (virtual protected member function of `std::strstreambuf`) |
