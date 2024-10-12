package ch.olivezebra.mensa.database.group;

import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.Table;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

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

    @ManyToOne
    private Mensa mensa;

    @JsonIgnore
    @NonNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "eating_group")
    private Group group;

    @ManyToMany
    @Setter(AccessLevel.PRIVATE)
    private Set<Table> tables = new HashSet<>();
}
