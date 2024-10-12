package ch.olivezebra.mensa.database.table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.event.internal.DefaultLoadEventListener;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
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
    @JsonIgnore
    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "mensa")
    private Mensa mensa;

    public int getCenterX() {
        return x + width / 2;
    }

    public int getCenterY() {
        return y + height / 2;
    }

    public Table(int x, int y, int width, int height, int level) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.level = level;
    }
}
