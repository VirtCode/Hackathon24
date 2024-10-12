package ch.olivezebra.mensa.database.group;

import ch.olivezebra.mensa.database.user.User;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity(name = "eating_group")
@Getter
@Setter
@NoArgsConstructor
public class Group {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private String name;

    @ManyToMany
    @Setter(AccessLevel.PRIVATE)
    private Set<User> members = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    @Setter(AccessLevel.PRIVATE)
    private Set<Session> sessions = new HashSet<>();
}
