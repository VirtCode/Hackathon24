package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.user.User;
import ch.olivezebra.mensa.database.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
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
     * @param id id of that user
     * @return user that was found
     */
    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return users.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
