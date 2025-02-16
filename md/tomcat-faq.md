**Tomcat FAQ**

# How to enable servlet annotation like @WebSocket("/hello")?
Set ```metadata-complete="false"``` in web.xml.
e.g. In ```$TOMCAT_HOME/webapps/app1/WEB-INF/web.xml```
```
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
  metadata-complete="false">
</web-app>
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