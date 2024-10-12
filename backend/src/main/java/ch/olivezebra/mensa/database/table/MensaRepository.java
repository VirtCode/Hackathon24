package ch.olivezebra.mensa.database.table;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MensaRepository extends CrudRepository<Mensa, UUID> {

    @Query("select t from eating_table t where t.id = :id")
    Optional<Table> findTableById(UUID id);

    @Query("select t from eating_table t where t.mensa = :mensa")
    List<Table> findAllTables(Mensa mensa);

    @Query("select t from eating_table t where t.mensa = :mensa AND t.id = :id")
    Optional<Table> findTable(Mensa mensa, UUID id);

    List<Mensa> findAll();

    /**
     * does what it says
     */
    default Mensa requireById(UUID id) {
        return this.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such mensa found"));
    }

    default Table requireTableById(UUID id) {
        return this.findTableById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such table found"));
    }

}
