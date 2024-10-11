package ch.olivezebra.mensa.database.group;

import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.Table;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Session {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private Date start;
    private Date end;

    @OneToOne
    private Mensa mensa;

    @ManyToMany
    @Setter(AccessLevel.PRIVATE)
    private Set<Table> tables = new HashSet<>();
}
