package ch.olivezebra.mensa.database.table;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Mensa {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private String name;

    @OneToMany
    @Setter(AccessLevel.PRIVATE)
    private Set<Table> tables = new HashSet<>();
}
