package com.siberiaroots.shop.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private final JavaMailSender mailSender;
    private final String mailFrom;
    private final String mailTo;
    private final boolean strictMode;

    public ContactService(JavaMailSender mailSender,
                          @Value("${app.mail.from:no-reply@siberia-roots.local}") String mailFrom,
                          @Value("${app.mail.to:}") String mailTo,
                          @Value("${app.contact.strict:false}") boolean strictMode) {
        this.mailSender = mailSender;
        this.mailFrom = mailFrom;
        this.mailTo = mailTo;
        this.strictMode = strictMode;
        log.info("ContactService initialized: from={}, to={}, strict={}", mailFrom, mailTo.isBlank() ? mailFrom : mailTo, strictMode);
    }

    public ResponseEntity<Void> send(ContactRequest request) {
        try {
            String recipient = mailTo.isBlank() ? mailFrom : mailTo;
            log.info("Sending contact form message from {} ({}) to {}", request.name(), request.email(), recipient);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailFrom);
            message.setTo(recipient);
            message.setSubject("[Siberia Roots Shop] New contact message from " + request.name());
            message.setText("""
                    Name: %s
                    Email: %s

                    Message:
                    %s
                    """.formatted(request.name(), request.email(), request.message()));
            mailSender.send(message);
            log.info("Contact message sent successfully to {}", recipient);

            // Auto-acknowledgement to the sender
            if (request.email() != null && !request.email().isBlank()) {
                SimpleMailMessage ack = new SimpleMailMessage();
                ack.setFrom(mailFrom);
                ack.setTo(request.email());
                ack.setSubject("We received your message");
                ack.setText("Thank you, we received your message and will get back to you soon.");
                mailSender.send(ack);
                log.info("Auto-acknowledgement sent to {}", request.email());
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            log.error("Failed to send contact email (strict={}): {}", strictMode, ex.getMessage(), ex);
            // Fallback: don't fail user request unless strict mode is enabled
            if (strictMode) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            log.warn("Contact form accepted but email not sent (returning 202)");
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
    }
}


