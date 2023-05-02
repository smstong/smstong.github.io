# Some faqs for random things

## Web Auth passing

* CGI        Meta-Variables ( e.g. Environment variables) AUTH_TYPE, REMOTE_USER
* AJP        {attributes: ?auth_type ?remote_user }
* FastCGI    {FCGI_PARAMS,          1, "REMOTE_USER...AUTH_TYPE..."}
