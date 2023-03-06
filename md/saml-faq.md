**SAML FAQ**

# What's the best way to control NameID format generated for the certain SP?
Shibboleth IdP selects NameID generation based on the [process](https://shibboleth.atlassian.net/wiki/spaces/IDP4/pages/1265631671/NameIDGenerationConfiguration#%5BinlineExtension%5DFormat-Selection)
```
In most cases, it is better to control the Format selected by including a <NameIDFormat> element in the SP's metadata. 
```
[Shib](https://shibboleth.atlassian.net/wiki/spaces/IDP4/pages/1265631686/ProfileConfiguration-SAML2SSO)