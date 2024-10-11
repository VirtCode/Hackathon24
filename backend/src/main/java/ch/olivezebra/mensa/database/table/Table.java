package ch.olivezebra.mensa.database.table;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

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

}
