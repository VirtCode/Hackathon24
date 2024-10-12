package ch.olivezebra.mensa.auth;

import ch.olivezebra.mensa.database.user.User;
import ch.olivezebra.mensa.database.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class AuthInterceptor implements HandlerInterceptor {
    @Value("${oauth.headers.username:X-authentik-username}")
    String usernameHeader;

    @Value("${oauth.headers.email:X-authentik-email}")
    String emailHeader;

    @Value("${oauth.headers.name:X-authentik-name}")
    String nameHeader;

    @Value("${auth.impersonate:false}")
    boolean enable;

    @Autowired
    UserRepository users;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ResponseStatusException {
        String username = request.getHeader(usernameHeader);
        String email = request.getHeader(emailHeader);
        String name = request.getHeader(nameHeader);

        if (enable && username == null) {
            log.info("overriding auth user");
            username = "test";
            email = "test@student.ethz.ch";
            name = "Testing User";
        }

        if (username == null || email == null || name == null || username.isEmpty() || email.isEmpty() || name.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The user is not logged using the oauth");
        }

        String finalEmail = email;
        String finalName = name;
        String finalUsername = username;
        User user = users.findById(username)
                .orElseGet(() -> users.save(new User(finalUsername, finalName, finalEmail)));

        log.info("Logged in user {}", user.getId());
        request.setAttribute("user", user);

        return true;
    }
}
