package ch.olivezebra.mensa.database.table;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.event.internal.DefaultLoadEventListener;

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

    @NonNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "mensa")
    private Mensa mensa;
}
