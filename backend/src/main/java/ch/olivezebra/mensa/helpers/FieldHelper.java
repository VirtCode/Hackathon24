package ch.olivezebra.mensa.helpers;


import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Field;

/**
 * This class provides some time and sanity saving methods to do repetitive actions.
 * By leveraging a few of java's signature features (yes, even reflection)
 */
public class FieldHelper {

    /**
     * Throws an exception if any of the objects are null
     * @param objects objects to check
     */
    public static void assertPopulated(Object... objects) {
        for (Object object : objects) {
            if (object == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not all required fields are populated");
        }
    }

    /**
     * Edits all mentioned fields on old with the values from next
     * @param next object containing edited fields
     * @param old object to be edited
     * @param names fields to edit
     * @return whether old has received any changes
     */
    public static boolean editAll(Object next, Object old, String... names) {
        boolean changed = false;

        for (String name : names) {
            if (edit(next, old, name)) changed = true;
        }

        return changed;
    }

    /**
     * Edits a field on old with the values from next
     * @param next object containing edited field
     * @param old object to be edited
     * @param name field to edit
     * @return whether old was updated on the field
     */
    public static boolean edit(Object next, Object old, String name) {
        try {
            Field nextField = next.getClass().getDeclaredField(name);
            Field oldField = old.getClass().getDeclaredField(name);

            nextField.setAccessible(true);
            oldField.setAccessible(true);

            if (!nextField.getType().equals(oldField.getType())) throw new RuntimeException("Comparing non similar fields is forbidden");

            if (nextField.get(next) != null && !nextField.get(next).equals(oldField.get(old))) {
                oldField.set(old, nextField.get(next));
                return true;
            }

        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }

        return false;
    }
}