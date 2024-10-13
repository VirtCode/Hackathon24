package ch.olivezebra.mensa.database.table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

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

    /** coordinates of the mensa */
    private double lat, lng;

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

    /* is the mensa currently open? (only a rough approx) */
    @JsonProperty
    public boolean isOpen() {
        // this is always open
        if (this.id.equals(UUID.fromString("6d930285-affe-47a3-af8f-2e04df87af38")))
            return true;

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());

        // FIXME: this just pretends we know opening hours
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        return (hour >= 11 && hour <= 13) || (hour >= 17 && hour <= 18);
    }
}
