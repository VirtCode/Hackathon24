package ch.olivezebra.mensa.database.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {

    /** user name in headers */
    @Id
    private String id;

    /** real name from headers */
    private String name;

    /** ethz email from headers */
    private String email;

    @Setter(AccessLevel.PRIVATE)
    private Date joined;

    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;

        this.joined = new Date();
    }
}
