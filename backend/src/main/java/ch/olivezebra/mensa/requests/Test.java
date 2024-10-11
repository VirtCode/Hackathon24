package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.User;
import ch.olivezebra.mensa.database.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class Test {

    private final UserRepository users;

    @GetMapping("/test")
    public User getUser(@RequestAttribute User user) {
        return user;
    }
}
