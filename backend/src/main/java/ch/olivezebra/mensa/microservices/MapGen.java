package ch.olivezebra.mensa.microservices;

import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.Table;
import ch.olivezebra.mensa.requests.MensaController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Slf4j
@Service
public class MapGen {

    @Value("${microservices.layout.host}")
    public String layoutHost;

    /**
     * Get the map svg from a mensa
     * @param mensa mensa to get from
     * @return svg string
     */
    public String getMapSvg(Mensa mensa) {
        var request = WebClient.create(layoutHost + "/render").post()
                .bodyValue(new MensaController.MensaSvgPayload(mensa))
                .accept(MediaType.TEXT_XML)
                .retrieve()
                .toEntity(String.class);

        try {
            var response = request.block(Duration.of(10, ChronoUnit.SECONDS));
            if (response == null) {
                throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Microservice response is null");
            }

            return response.getBody();
        } catch (Exception e) {
            log.error("microservices call to render layout svg failed", e);
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Failed to render layout svg");
        }
    }

    /**
     * Get the map svg from a mensa
     * @param mensa mensa to get from
     * @return svg string
     */
    public String getMapPreview(Mensa mensa, Table table) {
        var request = WebClient.create(layoutHost + "/preview?highlight=" + table.getId()).post()
                .bodyValue(new MensaController.MensaSvgPayload(mensa))
                .accept(MediaType.TEXT_XML)
                .retrieve()
                .toEntity(String.class);

        try {
            var response = request.block(Duration.of(10, ChronoUnit.SECONDS));
            if (response == null) {
                throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Microservice response is null");
            }

            return response.getBody();
        } catch (Exception e) {
            log.error("microservices call to render layout svg failed", e);
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Failed to render layout svg");
        }
    }
}
