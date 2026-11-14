# CookieManager class (java.net)

```java
public class CookieManager extends CookieHandler
```

CookieManager provides a concrete implementation of {@link CookieHandler},
which separates the storage of cookies from the policy surrounding accepting
and rejecting cookies. A CookieManager is initialized with a {@link CookieStore}
which manages storage, and a {@link CookiePolicy} object, which makes
policy decisions on cookie acceptance/rejection.

<p> The HTTP cookie management in java.net package looks like:
<blockquote>
<pre>{@code
                 use
CookieHandler <------- HttpURLConnection
      ^
      | impl
      |         use
CookieManager -------> CookiePolicy
            |   use
            |--------> HttpCookie
            |              ^
            |              | use
            |   use        |
            |--------> CookieStore
                           ^
                           | impl
                           |
                 Internal in-memory implementation
}</pre>
<ul>
  <li>
    CookieHandler is at the core of cookie management. User can call
    CookieHandler.setDefault to set a concrete CookieHandler implementation
    to be used.
  </li>
  <li>
    CookiePolicy.shouldAccept will be called by CookieManager.put to see whether
    or not one cookie should be accepted and put into cookie store. User can use
    any of three pre-defined CookiePolicy, namely ACCEPT_ALL, ACCEPT_NONE and
    ACCEPT_ORIGINAL_SERVER, or user can define his own CookiePolicy implementation
    and tell CookieManager to use it.
  </li>
  <li>
    CookieStore is the place where any accepted HTTP cookie is stored in.
    If not specified when created, a CookieManager instance will use an internal
    in-memory implementation. Or user can implements one and tell CookieManager
    to use it.
  </li>
  <li>
    Currently, only CookieStore.add(URI, HttpCookie) and CookieStore.get(URI)
    are used by CookieManager. Others are for completeness and might be needed
    by a more sophisticated CookieStore implementation, e.g. a NetscapeCookieStore.
  </li>
</ul>
</blockquote>

<p>There're various ways user can hook up his own HTTP cookie management behavior, e.g.
<blockquote>
<ul>
  <li>Use CookieHandler.setDefault to set a brand new {@link CookieHandler} implementation
  <li>Let CookieManager be the default {@link CookieHandler} implementation,
      but implement user's own {@link CookieStore} and {@link CookiePolicy}
      and tell default CookieManager to use them:
    <blockquote><pre>
      // this should be done at the beginning of an HTTP session
      CookieHandler.setDefault(new CookieManager(new MyCookieStore(), new MyCookiePolicy()));
    </pre></blockquote>
  <li>Let CookieManager be the default {@link CookieHandler} implementation, but
      use customized {@link CookiePolicy}:
    <blockquote><pre>
      // this should be done at the beginning of an HTTP session
      CookieHandler.setDefault(new CookieManager());
      // this can be done at any point of an HTTP session
      ((CookieManager)CookieHandler.getDefault()).setCookiePolicy(new MyCookiePolicy());
    </pre></blockquote>
</ul>
</blockquote>

<p>The implementation conforms to <a href="http://www.ietf.org/rfc/rfc2965.txt">RFC 2965</a>, section 3.3.

@spec https://www.rfc-editor.org/info/rfc2965 RFC 2965: HTTP State Management Mechanism
@see CookiePolicy
@author Edward Wang
@since 1.6

## CookieManager.CookieManager()

```java
public CookieManager()
```

Create a new cookie manager.

<p>This constructor will create new cookie manager with default
cookie store and accept policy. The effect is same as
{@code CookieManager(null, null)}.

## CookieManager.CookieManager(CookieStore, CookiePolicy)

```java
public CookieManager(CookieStore store, CookiePolicy cookiePolicy)
```

Create a new cookie manager with specified cookie store and cookie policy.

@param store     a {@code CookieStore} to be used by cookie manager.
                 if {@code null}, cookie manager will use a default one,
                 which is an in-memory CookieStore implementation.
@param cookiePolicy      a {@code CookiePolicy} instance
                         to be used by cookie manager as policy callback.
                         if {@code null}, ACCEPT_ORIGINAL_SERVER will
                         be used.

## CookieManager.setCookiePolicy(CookiePolicy)

```java
public void setCookiePolicy(CookiePolicy cookiePolicy)
```

To set the cookie policy of this cookie manager.

<p> An instance of {@code CookieManager} will have
cookie policy ACCEPT_ORIGINAL_SERVER by default. Users always
can call this method to set another cookie policy.

@param cookiePolicy      the cookie policy. Can be {@code null}, which
                         has no effects on current cookie policy.

## CookieManager.getCookieStore()

```java
public CookieStore getCookieStore()
```

To retrieve current cookie store.

@return  the cookie store currently used by cookie manager.