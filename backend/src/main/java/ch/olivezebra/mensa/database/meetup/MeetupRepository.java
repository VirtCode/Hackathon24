package ch.olivezebra.mensa.database.meetup;

import ch.olivezebra.mensa.database.group.Group;
import ch.olivezebra.mensa.database.table.Mensa;
import ch.olivezebra.mensa.database.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MeetupRepository extends CrudRepository<Meetup, UUID> {

    /**
     * Find all meetups that are active
     * @param date now
     * @return meetups
     */
    @Query("SELECT meetup FROM Meetup meetup WHERE meetup.end >= :date")
    List<Meetup> findOtherMeetups(Date date);

    /**
     * Find all meetups for a user
     * @param user user
     * @return meetups
     */
    @Query("SELECT meetup FROM Meetup meetup WHERE meetup.owner = :user")
    List<Meetup> findForUser(User user);

    /**
     * Finds the active meetup for a user
     * @param user user
     * @return meetups
     */
    @Query("SELECT meetup FROM Meetup meetup WHERE meetup.owner = :user AND meetup.end >= :date")
    Optional<Meetup> findActiveForUser(User user, Date date);

    default Meetup requireById(UUID id) {
        return this.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such meetup found"));
    }

}
