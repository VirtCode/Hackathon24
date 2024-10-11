package ch.olivezebra.mensa.database.table;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.UUID;

@Setter
@Getter
@Entity(name = "eating_table")
public class Table {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private int x, y, width, height;

    /** level id the table is on */
    private int level;

    @JsonIgnore
    @ManyToOne
    private Mensa mensa;
}
