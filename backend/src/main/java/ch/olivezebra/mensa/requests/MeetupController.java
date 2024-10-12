package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.meetup.Meetup;
import ch.olivezebra.mensa.database.meetup.MeetupRepository;
import ch.olivezebra.mensa.database.table.MensaRepository;
import ch.olivezebra.mensa.database.table.Table;
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
@RequestMapping("/meetup")
@RequiredArgsConstructor
public class MeetupController {

    private MensaRepository mensas;
    private MeetupRepository meetups;

    /**
     * Starts a meetup now. The user cannot create multiple meetups.
     * @param def meetup definition stuff
     * @return newly created meetup
     */
    @PostMapping
    public Meetup startMeetup(@RequestAttribute User user, @RequestBody MeetupDefinition def) {
        FieldHelper.assertPopulated(def.table, def.duration);

        if (meetups.findActiveForUser(user, new Date()).isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user already has active meetup");

        Table table = mensas.requireTableById(def.table);

        Date start = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(start);
        calendar.add(Calendar.MINUTE, def.duration);
        Date end = calendar.getTime();

        return meetups.save(new Meetup(start, end, user, table));
    }

    @Getter
    public static class MeetupDefinition {
        private UUID table;
        /** planned duration in minutes */
        private Integer duration;
    }

    /**
     * Gets a meetup by its id
     * @param id id of the meetup
     * @return meetup
     */
    @GetMapping("/{id}")
    public Meetup getMeetup(@PathVariable UUID id) {
        return meetups.requireById(id);
    }

    /**
     * Edits a meetup
     * @param id id of the meetup
     * @param def definition stuff, attributes that are zero are left intact
     * @return edited meetup
     */
    @PutMapping("/{id}")
    public Meetup editMeetup(@PathVariable UUID id, @RequestAttribute User user, @RequestBody MeetupDefinition def) {
        Meetup meetup = meetups.requireById(id);

        if (!meetup.getOwner().equals(user))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "user not allowed to edit meetup");

        if (def.duration != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(meetup.getStart());
            calendar.add(Calendar.MINUTE, def.duration);

            meetup.setEnd(calendar.getTime());
        }
        if (def.table != null) {
            Table table = mensas.requireTableById(def.table);

            meetup.setTable(table);
        }

        return meetups.save(meetup);
    }

    /**
     * Get all meetups for the logged in user. Only one meetup might have active=true
     * @return list of meetups
     */
    @GetMapping("/own")
    public List<Meetup> ownMeetups(@RequestAttribute User user) {
        return meetups.findForUser(user);
    }

    /**
     * Get all active meetups that you could join.
     * @return list of meetups
     */
    @GetMapping("/active")
    public List<Meetup> activeMeetups() {
        return meetups.findOtherMeetups(new Date());
    }
}
