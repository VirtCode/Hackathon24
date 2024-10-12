# backend

Backend for the *<insert-name-here>* application 

## configuration

The following environment variables can be set:

```bash
OAUTH_HEADERS_USERNAME=<string>     # header used to get usernames from requests. Default: X-authentik-username
OAUTH_HEADERS_EMAIL=<string>        # header used to get email addresses from requests. Default: X-authentik-email
OAUTH_HEADERS_NAME=<string>         # header used to get names from requests. Default: X-authentik-name
AUTH_IMPERSONATE=<bool>             # impersonate test user if headers are not set

MICROSERVICES_LAYOUT_HOST=<string>  # hostname under which the layout microservice is available
```