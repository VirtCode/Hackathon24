package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.User;
import ch.olivezebra.mensa.database.UserRepository;
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

    @GetMapping("/current")
    public User getCurrentUser(@RequestAttribute User user) {
        return user;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return users.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
