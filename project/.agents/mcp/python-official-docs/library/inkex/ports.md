# inkex.ports

Common access to serial and other computer ports.

## class Serial

```python
class Serial
```

Attempt to get access to the computer's serial port.

with Serial(port_name, ...) as com:
    com.write(...)

Provides access to the debug/testing ports which are pretend ports
able to accept the same input but allow for debugging.

## Serial.set_options

```python
def set_options(self, stop=1, size=8, flow=None, parity=None)
```

Set further options on the serial port

## Serial.has_serial

```python
def has_serial()
```

Late importing of pySerial module

## Serial.list_ports

```python
def list_ports()
```

Return a list of available serial ports