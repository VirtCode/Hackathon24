package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.user.User;
import ch.olivezebra.mensa.database.group.Group;
import ch.olivezebra.mensa.database.group.GroupRepository;
import ch.olivezebra.mensa.helpers.FieldHelper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

/**
 * Handles all requests regarding group stuff
 */
@RestController("/group")
@RequiredArgsConstructor
public class GroupController {

    public final GroupRepository groups;

    /**
     * Get all groups the logged-in user is member of
     * @return list with group objects
    @GetMapping("/all")
    public List<Group> getAllGroupsForUser(@RequestAttribute User user) {
        return groups.findGroupsForUser(user);
    }
    */

    /**
     * Get a group by its id
     * @return group object
     */
    @GetMapping("/{gid}")
    public Group getGroupById(@RequestAttribute User user, @PathVariable UUID gid) {
        return groups.requireAccessGroup(gid, user);
    }

    /**
     * Edit a group
     * @param gid group to edit
     * @param def new group metadata
     * @return edited group
     */
    @PutMapping("/{gid}")
    public Group editGroup(@RequestAttribute User user, @PathVariable UUID gid, @RequestBody GroupDefinition def) {
        Group group = groups.requireAccessGroup(gid, user);

        FieldHelper.editAll(def, group, "name");
        return groups.save(group);
    }

    /**
     * Leave a group. When the logged-in user is the last member of the group, the group is deleted
     * @param gid group to leave
     */
    @PostMapping("/{gid}/leave")
    public void leaveGroup(@PathVariable UUID gid, @RequestAttribute User user) {
        Group group = groups.requireAccessGroup(gid, user);

        // delete group if empty
        if (group.getMembers().size() == 1) groups.delete(group);
        else {
            group.getMembers().remove(user);
            groups.save(group);
        }
    }


    /**
     * Create a new group
     * @param def group definition
     * @return newly created group object
     */
    @PostMapping
    public Group createGroup(@RequestBody GroupDefinition def, @RequestAttribute User user) {
        FieldHelper.assertPopulated(def.name);

        Group group = new Group();
        group.getMembers().add(user);
        group.setName(def.getName());
        return groups.save(group);
    }

    @Getter
    @SuppressWarnings("UnusedDeclaration")
    public static class GroupDefinition {
        /** display name of the group */
        private String name;
    }
}