package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.user.User;
import ch.olivezebra.mensa.database.group.Group;
import ch.olivezebra.mensa.database.group.GroupRepository;
import ch.olivezebra.mensa.helpers.FieldHelper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Handles all requests regarding group stuff
 */
@RestController
@RequestMapping("/group")
@RequiredArgsConstructor
public class GroupController {

    public final GroupRepository groups;

    /**
     * Get all groups the logged-in user is member of
     * @return list with group objects
     */
    @GetMapping("/all")
    public List<Group> getAllGroupsForUser(@RequestAttribute User user) {
        return groups.findGroupsForUser(user);
    }

    /**
     * Get a group by its id
     * @return group object
     */
    @GetMapping("/{id}")
    public Group getGroupById(@RequestAttribute User user, @PathVariable UUID id) {
        return groups.requireAccessGroup(id, user);
    }

    /**
     * Edit a group
     * @param id group to edit
     * @param def new group metadata
     * @return edited group
     */
    @PutMapping("/{id}")
    public Group editGroup(@RequestAttribute User user, @PathVariable UUID id, @RequestBody GroupDefinition def) {
        Group group = groups.requireAccessGroup(id, user);

        FieldHelper.editAll(def, group, "name");
        return groups.save(group);
    }

    /**
     * Leave a group. When the logged-in user is the last member of the group, the group is deleted
     * @param id group to leave
     */
    @PostMapping("/{id}/leave")
    public void leaveGroup(@PathVariable UUID id, @RequestAttribute User user) {
        Group group = groups.requireAccessGroup(id, user);

        // delete group if empty
        if (group.getMembers().size() == 1) groups.delete(group);
        else {
            group.getMembers().remove(user);
            groups.save(group);
        }
    }

    /**
     * Join a group
     * @param id group to join
     */
    @PostMapping("/{id}/join")
    public void joinGroup(@PathVariable UUID id, @RequestAttribute User user) {
        Group group = groups.requireGroup(id);

        group.getMembers().add(user);
        groups.save(group);
    }

    /**
     * Create a new group, automatically adds creating user
     * @param def group definition
     * @return newly created group object
     */
    @PostMapping
    public Group createGroup(@RequestBody GroupDefinition def, @RequestAttribute User user) {
        FieldHelper.assertPopulated(def.name);

        Group group = new Group(def.name);
        group.getMembers().add(user);

        return groups.save(group);
    }

    @Getter
    @SuppressWarnings("UnusedDeclaration")
    public static class GroupDefinition {
        /** display name of the group */
        private String name;
    }
}