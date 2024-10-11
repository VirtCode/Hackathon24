package ch.olivezebra.mensa.database.group;

import ch.olivezebra.mensa.database.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SessionRepository extends CrudRepository<Session, UUID> {

    /**
     * Finds a session that is active at a given time
     * @param group group the session is in
     * @param now time thingy
     * @return thing
     */
    @Query("SELECT session FROM Session session WHERE session.group = :group AND session.start <= :now AND session.end >= :now")
    Optional<Session> getActiveSession(Group group, Date now);

    @Query("SELECT session FROM Session session WHERE session.group = :group")
    List<Session> getSessionsForGroup(Group group);

    /**
     * requires a session by id
     */
    default Session requireSession(UUID id) {
        return this.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such session"));
    }

    /**
     * requires the session and the user may access it
     */
    default Session requireSessionAccess(UUID id, User user) {
        Session s = this.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such session"));

        if (!s.getGroup().getMembers().contains(user))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This is not a session for this user");

        return s;
    }
}
