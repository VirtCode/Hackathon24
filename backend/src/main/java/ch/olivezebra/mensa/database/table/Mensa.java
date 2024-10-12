package ch.olivezebra.mensa.database.table;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @OneToMany(mappedBy = "mensa", cascade = CascadeType.ALL)
    @Setter(AccessLevel.PRIVATE)
    private Set<Table> tables = new HashSet<>();

    /** viewport of the mensa svg */
    @JsonIgnore
    private int x, y, width, height;

    /**
     * Adds a table and resolves stuff
     */
    public void addTable(Table table) {
        table.setMensa(this);
        this.tables.add(table);
    }
}
