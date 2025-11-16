package com.siberiaroots.shop.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final JavaMailSender mailSender;
    private final String mailFrom;
    private final String mailTo;

    public ContactService(JavaMailSender mailSender,
                          @Value("${app.mail.from:no-reply@siberia-roots.local}") String mailFrom,
                          @Value("${app.mail.to:}") String mailTo) {
        this.mailSender = mailSender;
        this.mailFrom = mailFrom;
        this.mailTo = mailTo;
    }

    public void send(ContactRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setTo(mailTo.isBlank() ? mailFrom : mailTo);
        message.setSubject("[Siberia Roots Shop] New contact message from " + request.name());
        message.setText("""
                Name: %s
                Email: %s

                Message:
                %s
                """.formatted(request.name(), request.email(), request.message()));
        mailSender.send(message);

        // Auto-acknowledgement to the sender
        if (request.email() != null && !request.email().isBlank()) {
            SimpleMailMessage ack = new SimpleMailMessage();
            ack.setFrom(mailFrom);
            ack.setTo(request.email());
            ack.setSubject("We received your message");
            ack.setText("Thank you, we received your message and will get back to you soon.");
            mailSender.send(ack);
        }
    }
}


