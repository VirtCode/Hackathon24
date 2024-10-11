package ch.olivezebra.mensa.oauth.interception;

import ch.olivezebra.mensa.database.User;
import ch.olivezebra.mensa.database.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.WebUtils;

import java.util.Arrays;

@Slf4j
public class OAuthInterceptor implements HandlerInterceptor {
    @Value("${oauth.headers.username:X-authentik-username}")
    String usernameHeader;

    @Value("${oauth.headers.email:X-authentik-email}")
    String emailHeader;

    @Value("${oauth.headers.name:X-authentik-name}")
    String nameHeader;

    @Value("${oauth.params.override.username:username}")
    String overrideUsername;

    @Value("${oauth.params.override.email:email}")
    String overrideEmail;

    @Value("${oauth.params.override.name:name}")
    String overrideName;

    @Value("${oauth.override.enable:false}")
    boolean enableUserOverride;

    @Autowired
    UserRepository users;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ResponseStatusException {
        String username = request.getHeader(usernameHeader);
        String email = request.getHeader(emailHeader);
        String name = request.getHeader(nameHeader);

        if (enableUserOverride) {
            if (username == null) username = request.getParameter(overrideUsername);
            if (email == null) email = request.getParameter(overrideEmail);
            if (name == null) name = request.getParameter(overrideName);
        }

        if (username == null || email == null || name == null || username.isEmpty() || email.isEmpty() || name.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The user is not logged using the oauth");
        }

        String finalEmail = email;
        String finalName = name;
        String finalUsername = username;
        User user = users.findById(username).orElseGet(() -> users.save(new User(finalUsername, finalName, finalEmail)));

        log.info("Logged in user {}", user.getId());
        request.setAttribute("user", user);

        return true;
    }
}
