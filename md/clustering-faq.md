**clustering**

# What's session-in-cookie? 
"session-in-cookie" is a simple session clustering option. Whatever backend node is hit, the request always
holds cookies where the node can extract session data.

May apps adopt this session clustering tech. One example is Shibboleth IdP.

A Java implementation can be found [here](https://shinesolutions.com/2012/12/18/simple-session-sharing-in-tomcat-cluster-using-the-session-in-cookie-pattern/#:~:text=external%20session%20cache.-,Session%2DIn%2DCookie,every%20request%20the%20user%20makes.).
