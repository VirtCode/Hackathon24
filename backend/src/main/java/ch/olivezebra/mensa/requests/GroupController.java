package ch.olivezebra.mensa.requests;

import ch.olivezebra.mensa.database.User;
import ch.olivezebra.mensa.database.group.Group;
import ch.olivezebra.mensa.database.group.GroupRepository;
import ch.olivezebra.mensa.helpers.FieldHelper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController("/group")
@RequiredArgsConstructor
public class GroupController {

    final GroupRepository groups;

    /**
     * Get all groups the logged-in user is member of
     * @return list with group objects
     */
    @GetMapping("/all")
    public List<Group> getAllGroupsForUser(@RequestAttribute User user) {
        // TODO: Add repository method
        return new ArrayList<>();
    }

    /**
     * Get a group by its id
     * @return group object
     */
    @GetMapping("/{id}")
    public Group getGroupById(@PathVariable String id) {
        return groups.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
    }

    /**
     * Leave a group. When the logged-in user is the last member of the group, the group is deleted
     */
    @PostMapping("/{id}/leave")
    public void leaveGroup(@PathVariable String id, @RequestAttribute User user) {
        Group group = groups.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
        Optional<User> member = group.getMembers().stream().filter(m -> m.getId().equals(user.getId())).findFirst();
        if (member.isPresent()) {
            if (group.getMembers().size() == 1) {
                groups.delete(group);
            } else {
                group.getMembers().remove(member.get());
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not member of group");
        }
    }

    /**
     * Create a new group
     * @return newly created group object
     */
    @PostMapping
    public Group createGroup(@RequestBody GroupDefinition def, @RequestAttribute User user) {
        FieldHelper.assertPopulated(def);
        Group group = new Group();
        group.getMembers().add(user);
        group.setName(def.getName());
        return groups.save(group);
    }

    @Getter
    @SuppressWarnings("UnusedDeclaration")
    static class GroupDefinition {
        private String name;
    }
}