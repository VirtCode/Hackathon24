package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.MensaRepository;
import ch.olivezebra.mensa.database.table.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mensa")
public class MensaController {

    private final MensaRepository mensas;

    /**
     * Returns all mensas in the app
     * @return list of mensas
     */
    @GetMapping
    public List<Mensa> getAllMensas() {
        return mensas.findAll();
    }

    /**
     * Get a mensa with its id
     * @param id id of the mensa
     * @return mensa
     */
    @GetMapping("/{id}")
    public Mensa getMensa(@PathVariable UUID id) {
        return mensas.requireById(id);
    }

    /**
     * Get all tables at a mensa
     * @param id mensa id
     * @return tables ond so
     */
    @GetMapping("/{id}/tables")
    public Set<Table> getTables(@PathVariable UUID id) {
        return mensas.requireById(id).getTables();
    }
}
