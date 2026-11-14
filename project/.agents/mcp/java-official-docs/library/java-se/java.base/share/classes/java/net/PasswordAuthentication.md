# PasswordAuthentication class (java.net)

```java
public final class PasswordAuthentication
```

The class PasswordAuthentication is a data holder that is used by
Authenticator.  It is simply a repository for a user name and a password.

@see java.net.Authenticator
@see java.net.Authenticator#getPasswordAuthentication()

@author  Bill Foote
@since   1.2

## PasswordAuthentication.PasswordAuthentication(String, char[])

```java
public PasswordAuthentication(String userName, char[] password)
```

Creates a new {@code PasswordAuthentication} object from the given
user name and password.

<p> Note that the given user password is cloned before it is stored in
the new {@code PasswordAuthentication} object.

@param userName the user name
@param password the user's password

## PasswordAuthentication.getUserName()

```java
public String getUserName()
```

Returns the user name.

@return the user name

## PasswordAuthentication.getPassword()

```java
public char[] getPassword()
```

Returns the user password.

<p> Note that this method returns a reference to the password. It is
the caller's responsibility to zero out the password information after
it is no longer needed.

@return the password