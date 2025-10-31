**Tomcat FAQ**

# How to enable servlet annotation like @WebSocket("/hello")?
Set ```metadata-complete="false"``` in web.xml.
e.g. In ```$TOMCAT_HOME/webapps/app1/WEB-INF/web.xml```
```
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
  metadata-complete="false">
</web-app>
```

# How to get current web app's location in server filesystem?
```
this.getServletContext().getRealPath("/");
```

# How to let tomcat automatically reload web app if a change is detected?
Set ```reloadable="true"``` in the web app's context.
e.g. In file ```$TOMCAT_HOME/webapps/app1/META-INF/context.xml```
```
<Context reloadable="true">
</Context>
```
More info can be found at [Tomcat Context](https://tomcat.apache.org/tomcat-11.0-doc/config/context.html).

# Hello world servlet to show its running context
```java
public class HelloServlet extends HttpServlet {
    @Override
    protected void service(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
        getServletContext().log("service() called");
        String output = "";
        output = "What the Servlet sees\n";
        output += "getLocalAddr():" +  request.getLocalAddr() + "\n";
        output += "getLocalPort():" +  request.getLocalPort() + "\n";
        output += "getLocalName():" +  request.getLocalName() + "\n";
        output += "getProtocol():" +  request.getProtocol() + "\n";
        output += "getRemoteAddr():" +  request.getRemoteAddr() + "\n";
        output += "getRemoteHost():" +  request.getRemoteHost() + "\n";
        output += "getRemotePort():" +  request.getRemotePort() + "\n";
        output += "getScheme():" +  request.getScheme() + "\n";
        output += "getServerName():" +  request.getServerName() + "\n";
        output += "getServerPort():" +  request.getServerPort() + "\n";
        output += "getContextPath():" +  request.getContextPath() + "\n";
        output += "getRequestURI():" +  request.getRequestURI() + "\n";
        output += "getPathInfo():" +  request.getPathInfo() + "\n";
        output += "getMethod():" +  request.getMethod() + "\n";

        String headers = "Headers:\n";
        var headerNames = request.getHeaderNames();
        while(headerNames.hasMoreElements()){
            var name =  headerNames.nextElement();
            headers += name + " = " + request.getHeader(name) + "\n";
        }
        output += headers;

        response.getWriter().write(output);
        response.getWriter().flush();   // flush response
    }
}

```
compile with
```bash
javac -cp $TOMCAT_HOME/lib/servlet-api.jar HelloServlet.java
```

# How HttpServletRequest.getServerName() works?
## read from http header "Host"

If "Host" http header exists (normal case), it is used by splitting it into ServerName and ServerPort.
For example, if the Host header is "example.com:8443", r.getServerName() returns "example.com".

Usually the frontend reverse proxy sets up "Host" header to the backend Tomcat. 
For example,
- Nginx uses ``` proxy_set_header Host $host; ```, 
- Apache uses ``` ProxyPreserveHost On ```

Please be warned that the "Host" header may also be set at Tomcat side by some valves like "RemoteIpValve".
For example,
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
       remoteIpHeader="x-forwarded-for"
       protocolHeader="x-forwarded-proto"
       proxiesHeader="x-forwarded-by"
       hostHeader="x-forwarded-host"           <!-- set "Host" header -->
       internalProxies="192\.168\.0\.10|127\.0\.0\.1|::1"
       requestAttributesEnabled="true" />
```
r.getServerName() returns the value of http header "x-forwarded-host".

## read from proxyName configuration

If the "Host" is missing, it returns the value defined by Tomcat as "proxyName" in the Connector.

For example, ```<Connector proxyName="myhost.com" proxyPort="443" />```, r.getServerName() returns "myhost.com".

