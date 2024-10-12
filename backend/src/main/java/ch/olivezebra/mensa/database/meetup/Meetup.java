package ch.olivezebra.mensa.database.meetup;

import ch.olivezebra.mensa.database.group.Group;
import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.Table;
import ch.olivezebra.mensa.database.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Meetup {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    private Date start;

    private Date end;

    /** the user has ended the meeting earlier */
    private boolean ended = false;

    /** user that wants to meetup */
    @NonNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "owner")
    private User owner;

    /** table the meetup is at */
    @NonNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "eating_table")
    private Table table;

    public Meetup(Date start, Date end, @NonNull User owner, @NonNull Table table) {
        this.start = start;
        this.end = end;
        this.owner = owner;
        this.table = table;
    }

    /** mensa of the meetup */
    @JsonProperty
    public Mensa getMensa() {
        return table.getMensa();
    }

    /** is the meetup active */
    @JsonProperty
    public boolean isActive() {
        return end.after(new Date()) && !ended;
    }
}
