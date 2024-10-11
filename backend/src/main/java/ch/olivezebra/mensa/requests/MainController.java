package ch.olivezebra.mensa.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * Handles a few rare requests.
 */
@RestController
@RequiredArgsConstructor
public class MainController {

    private static final long START_TIME = System.currentTimeMillis();

    @Value("${version.tag}")
    private String BUILD_VERSION;
    @Value("${version.branch}")
    private String BUILD_BRANCH;
    @Value("${version.commit}")
    private String BUILD_COMMIT;
    @Value("${version.time}")
    private long BUILD_TIME;


    /**
     * Shows the version and start time of the api.
     */
    @GetMapping
    public VersionPingResponse ping(){
        return new VersionPingResponse(BUILD_VERSION, BUILD_BRANCH, BUILD_COMMIT, new Date(BUILD_TIME), new Date(START_TIME));
    }
    @AllArgsConstructor
    @Getter
    @SuppressWarnings("UnusedDeclaration")
    public static class VersionPingResponse {
        private String version;
        private String branch;
        private String commit;
        private Date built;
        private Date started;
    }

    /**
     * Specifies a robots.txt so crawlers can ignore the api.
     */
    @GetMapping(value = "/robots.txt", produces = "text/plain")
    public String crawlerExclusion() {
        return "User-agent: *\nDisallow: /";
    }
}
