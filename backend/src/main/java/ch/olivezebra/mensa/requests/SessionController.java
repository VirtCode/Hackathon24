package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.group.Group;
import ch.olivezebra.mensa.database.group.GroupRepository;
import ch.olivezebra.mensa.database.group.Session;
import ch.olivezebra.mensa.database.group.SessionRepository;
import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.table.MensaRepository;
import ch.olivezebra.mensa.database.user.User;
import ch.olivezebra.mensa.helpers.FieldHelper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class SessionController {

    private final GroupRepository groups;
    private final SessionRepository sessions;
    private final MensaRepository mensas;



    /**
     * Get all sessions for a group
     * @param group group to get for
     * @return list of sessions
     */
    @GetMapping("/group/{group}/session")
    public List<Session> getSessions(@RequestAttribute User user, @PathVariable UUID group) {
        Group g = groups.requireAccessGroup(group, user);
        return sessions.getSessionsForGroup(g);
    }

    /**
     * Get active session for group
     * @param group group to get for
     * @return session, returns 404 if it doesn't exist
     */
    @GetMapping("/group/{group}/session/active")
    public Session getActiveSession(@RequestAttribute User user, @PathVariable UUID group) {
        Group g = groups.requireAccessGroup(group, user);

        return sessions.getActiveSession(g, new Date()).orElse(null);
    }

    /**
     * Starts a session for a group
     * @param group group to start session for
     * @param def creation stuff
     * @return created session
     */
    @PostMapping("/group/{group}/session/start")
    public Session startSession(@RequestAttribute User user, @PathVariable UUID group, @RequestBody SessionDefinition def) {
        Group g = groups.requireAccessGroup(group, user);

        FieldHelper.assertPopulated(def.duration, def.start, def.mensa);

        Mensa m = mensas.findById(def.mensa)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such mensa found"));

        // yes, this still opens an edge case of overlapping sessions, but we don't care
        if (sessions.getActiveSession(g, def.start).isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is already a session active at this time");

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(def.start);
        calendar.add(Calendar.MINUTE, def.duration);
        Date end = calendar.getTime();

        Session session = new Session();
        session.setStart(def.start);
        session.setEnd(end);
        session.setGroup(g);
        session.setMensa(m);

        return sessions.save(session);
    }
    @Getter
    public static class SessionDefinition {
        /* time the session starts, set this to current time if i starts immediately */
        private Date start;
        /* duration in minutes the session will take */
        private Integer duration;
        /* id if the mensa it is in */
        private UUID mensa;
    }

    /*
    @PostMapping("/session/{id}")
    public Session addTables(@RequestAttribute User user, @PathVariable UUID id, @RequestBody List<UUID> tables) {
        Session session = sessions.requireSessionAccess(id, user);

        tables.stream().map((table) ->
            session.getTables().stream()
                    .filter(t -> t.getId().equals(table))
                    .findFirst()
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Table " + table + " is not in mensa"))
        )

    }

     */

}
