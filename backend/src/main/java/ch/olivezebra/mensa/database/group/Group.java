package ch.olivezebra.mensa.database.group;

import ch.olivezebra.mensa.database.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity(name = "eating_group")
@Getter
@Setter
public class Group {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private String name;

    @ManyToMany
    @Setter(AccessLevel.PRIVATE)
    private Set<User> members = new HashSet<>();

    @OneToMany
    @Setter(AccessLevel.PRIVATE)
    private Set<Session> sessions = new HashSet<>();
}
