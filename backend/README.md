# backend

Backend for the *<insert-name-here>* application 

## configuration

The following environment variables can be set:

```bash
OAUTH_HEADERS_USERNAME=<string> # header used to get usernames from requests. Default: X-authentik-username
OAUTH_HEADERS_EMAIL=<string> # header used to get email addresses from requests. Default: X-authentik-email
OAUTH_HEADERS_NAME=<string> # header used to get names from requests. Default: X-authentik-name
OAUTH_PARAMS_OVERRIDE_USERNAME=<string> # overwritten user username. Default: username
OAUTH_PARAMS_OVERRIDE_EMAIL=<string> # overwritten user email. Default: email
OAUTH_PARAMS_OVERRIDE_NAME=<string> # overwritten user name. Default: user
OAUTH_OVERRIDE_ENABLE=<string> # enable user overriding
```