package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.user.User;
import ch.olivezebra.mensa.database.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository users;

    /**
     * Get the currently logged in user
     * @return user that is logged in
     */
    @GetMapping("/current")
    public User getCurrentUser(@RequestAttribute User user) {
        return user;
    }

    /**
     * Get a user by its id.
     * @param uid id of that user
     * @return user that was found
     */
    @GetMapping("/{uid}")
    public User getUserById(@PathVariable String uid) {
        return users.findById(uid).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
