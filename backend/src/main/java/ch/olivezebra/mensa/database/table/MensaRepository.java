package ch.olivezebra.mensa.database.table;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface MensaRepository extends CrudRepository<Mensa, UUID> {

    @Query("select t from eating_table t where t.mensa = :mensa AND t.id = :id")
    Optional<Table> findTable(Mensa mensa, UUID id);


}
