package ch.olivezebra.mensa.mail;

import ch.olivezebra.mensa.auth.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.*;

/**
 * This class handles the sending of mails.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class MailHandler {

    private final JavaMailSender mail;

    private final ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();

    @Value("${mail.sender}")
    private String sender;
    @Value("${mail.name}")
    private String name;

    public String getTemplate(String name, Map<String, String> map) {
        String text = new Scanner(MailHandler.class.getResourceAsStream("/mails/" + name + ".html"), "UTF-8")
                .useDelimiter("\\A").next();

        for (Map.Entry<String, String> entry : map.entrySet()) {
            text = text.replaceAll("%%" + entry.getKey() + "%%", entry.getValue());
        }

        return text;
    }

    /**
     * Formulates an E-Mail
     * @param recipient  recipient to receive the mail
     */
    private MimeMessage createMail(String recipient, String html, String subject) {
        MimeMessage message = mail.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {

            helper.setFrom(String.format("%s <%s>", name, sender));
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(html, true);

            log.debug("created mail to `{}` with subject `{}`", recipient, subject);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return message;
    }

    /**
     * Formulates an E-Mail sends it pretty much right away.
     * @param recipient  recipient to receive the mail
     */
    public void sendMail(String recipient, String html, String subject) {
        if (recipient.equals(AuthInterceptor.TEST_EMAIL)) {
            log.warn("not sending mail to test user");
            return;
        }

        MimeMessage message = createMail(recipient, html, subject);

        executor.execute(() -> {
            log.info("sending instant mail to `{}`", recipient);
            try {
                mail.send(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

}
