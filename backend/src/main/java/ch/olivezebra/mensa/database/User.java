package ch.olivezebra.mensa.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    /** user name in headers */
    @Id
    private String id;

    /** real name from headers */
    private String name;

    /** ethz email from headers */
    private String email;
}
