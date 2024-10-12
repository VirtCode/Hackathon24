package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.MensaRepository;
import ch.olivezebra.mensa.database.table.Table;
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

    @Value("${microservices.layout.host}")
    public String layoutHost;

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

    @GetMapping("/{id}/layout")
    public ResponseEntity<String> getLayout(@PathVariable UUID id) {
        Set<Table> tables = mensas.requireById(id).getTables();

        var request = WebClient.create(layoutHost + "/render").post()
                .bodyValue(tables)
                .accept(MediaType.TEXT_XML)
                .retrieve()
                .toEntity(String.class);

        try {
            var response = request.block(Duration.of(10, ChronoUnit.SECONDS));
            if (response == null) {
                throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Microservice response is null");
            }

            return ResponseEntity.ok().contentType(MediaType.TEXT_XML).body(response.getBody());
        } catch (Exception e) {
            log.error("microservices call to render layout svg failed", e);
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Failed to render layout svg");
        }
    }
}
