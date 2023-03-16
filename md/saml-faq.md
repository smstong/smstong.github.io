**SAML FAQ**

# What is NameID?
NameID is "name identifier" used to uniquely identify a single subject. 

- NameID is optional for SAML assertion. SPs may not be interested in it at all. E.g. an SP may not have a profile file each subject, and it doesn't need to identify a subject, instead it only care about an "group" attribute in the assertion. e.g. the SAML assertion for "mark" and "tammy" may be the same as they all blong to "admin" group. Even when a name identifier is needed, it can be represented by a normal SAML assertion attribute rather than a NameID.

- NameID is NOT login name. The login happends on IDP side which can make use of any methods to authenticate the user. Currently, username/password pair is the most common way for IDP to authenticate users. But the "username" here is different from the NameID in SAML assertion. Sometimes they may share the same value (e.g. when username is email address), but in most cases, they should NOT. The reason is a username usually is a meaningful name, while the NameID usually is opaque for privacy reasons. e.g. the username "jackgod2" has a NameID "B5534C4F2223@example.com".

# What's the best way to control NameID format generated for the certain SP?
Shibboleth IdP selects NameID generation based on the [process](https://shibboleth.atlassian.net/wiki/spaces/IDP4/pages/1265631671/NameIDGenerationConfiguration#%5BinlineExtension%5DFormat-Selection)
```
In most cases, it is better to control the Format selected by including a <NameIDFormat> element in the SP's metadata. 
```
[Shib](https://shibboleth.atlassian.net/wiki/spaces/IDP4/pages/1265631686/ProfileConfiguration-SAML2SSO)

# How to enable Duo 2FA for Shibboleth IdP v4.3 with JDK 17

```
bin/plugin.sh -I net.shibboleth.idp.plugin.nashorn     # Nashorn JS engine for scripted MFA auth flow
bin/plugin.sh -I net.shibboleth.oidc.common            # OIDC base
bin/plugin.sh -I net.shibboleth.idp.plugin.authn.duo.nimbus # DuoOIDC plugin shib version

```
[DuoOIDC Plugin](https://shibboleth.atlassian.net/wiki/spaces/IDPPLUGINS/pages/1374027959/DuoOIDCAuthnConfiguration)
[Shib AUthn flow selection](https://shibboleth.atlassian.net/wiki/spaces/IDP4/pages/1265631603/AuthenticationFlowSelection)

# What're the common causes of SAML auth failure?
- SP's clock is not synced with IdP
- SP's ACS url and httpd method are not configured properly
