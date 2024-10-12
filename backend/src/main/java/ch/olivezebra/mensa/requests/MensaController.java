package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.auth.NoAuth;
import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.MensaRepository;
import ch.olivezebra.mensa.database.table.Table;
import ch.olivezebra.mensa.microservices.MapGen;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/mensa")
public class MensaController {

    private final MensaRepository mensas;
    private final MapGen mapGen;

    /**
     * Returns all mensas in the app
     * @return list of mensas
     */
    @NoAuth
    @GetMapping
    public List<Mensa> getAllMensas() {
        return mensas.findAll();
    }

    /**
     * Get a mensa with its id
     * @param id id of the mensa
     * @return mensa
     */
    @NoAuth
    @GetMapping("/{id}")
    public Mensa getMensa(@PathVariable UUID id) {
        return mensas.requireById(id);
    }

    /**
     * Returns a mensa for a table.
     * @param id id of the TABLE
     * @return mensa of the table
     */
    @NoAuth
    @GetMapping("/table/{id}")
    public Mensa getMensaByTable(@PathVariable UUID id) {
        return mensas.requireTableById(id).getMensa();
    }

    /**
     * Get all tables at a mensa
     * @param id mensa id
     * @return tables ond so
     */
    @NoAuth
    @GetMapping("/{id}/tables")
    public Set<Table> getTables(@PathVariable UUID id) {
        return mensas.requireById(id).getTables();
    }

    /**
     * Get the layout svg for a given mensa
     * @param id id to fetch for
     * @return svg string (hopefully)
     */
    @NoAuth
    @GetMapping("/{id}/layout")
    public ResponseEntity<String> getLayout(@PathVariable UUID id) {
        Mensa mensa = mensas.requireById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/svg+xml"))
                .body(mapGen.getMapPreview(mensa, mensa.getTables().stream().findFirst().get()));
    }

    @Getter
    public static class MensaSvgPayload {
        int x, y, width, height;
        UUID id;
        Set<Table> tables;

        public MensaSvgPayload(Mensa mensa) {
            this.x = mensa.getX();
            this.y = mensa.getY();
            this.width = mensa.getWidth();
            this.height = mensa.getHeight();
            this.id = mensa.getId();
            this.tables = mensa.getTables();
        }
    }
}
