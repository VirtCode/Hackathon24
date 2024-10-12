package ch.olivezebra.mensa.database.group;

import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Session {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    @Setter(AccessLevel.PRIVATE)
    private Date created;

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

    public Session(Date start, Date end, Mensa mensa, @NonNull Group group) {
        this.start = start;
        this.end = end;
        this.mensa = mensa;
        this.group = group;

        this.created = new Date();
    }

    /** is the meetup active */
    @JsonProperty
    public boolean isActive() {
        return start.before(new Date()) && end.after(new Date());
    }

    /** is the meetup pending (in the future) */
    @JsonProperty
    public boolean isPending() {
        return start.after(new Date());
    }
}
