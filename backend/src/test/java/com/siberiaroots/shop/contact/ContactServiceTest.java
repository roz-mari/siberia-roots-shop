package com.siberiaroots.shop.contact;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("ContactService")
class ContactServiceTest {

    private JavaMailSender mailSender;
    private ContactService service;
    private ContactService strictService;

    @BeforeEach
    void setUp() {
        mailSender = mock(JavaMailSender.class);
        service = new ContactService(mailSender, "from@example.com", "to@example.com", false);
        strictService = new ContactService(mailSender, "from@example.com", "to@example.com", true);
    }

    @Nested
    @DisplayName("send(ContactRequest)")
    class Send {

        @Test
        void returns204WhenEmailSentSuccessfully() {
            ContactRequest request = new ContactRequest("John Doe", "john@example.com", "Hello");

            ResponseEntity<Void> response = service.send(request);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
            verify(mailSender, times(2)).send(any(org.springframework.mail.SimpleMailMessage.class)); // Main message + auto-ack
        }

        @Test
        void sendsEmailToConfiguredRecipient() {
            ContactRequest request = new ContactRequest("John Doe", "john@example.com", "Hello");

            service.send(request);

            verify(mailSender, times(2)).send(any(org.springframework.mail.SimpleMailMessage.class));
        }

        @Test
        void usesMailFromWhenMailToIsBlank() {
            ContactService serviceWithoutTo = new ContactService(mailSender, "from@example.com", "", false);
            ContactRequest request = new ContactRequest("John Doe", "john@example.com", "Hello");

            serviceWithoutTo.send(request);

            verify(mailSender, times(2)).send(any(org.springframework.mail.SimpleMailMessage.class));
        }

        @Test
        void returns202WhenEmailFailsInNonStrictMode() {
            doThrow(new RuntimeException("SMTP error")).when(mailSender).send(any(org.springframework.mail.SimpleMailMessage.class));
            ContactRequest request = new ContactRequest("John Doe", "john@example.com", "Hello");

            ResponseEntity<Void> response = service.send(request);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
        }

        @Test
        void returns500WhenEmailFailsInStrictMode() {
            doThrow(new RuntimeException("SMTP error")).when(mailSender).send(any(org.springframework.mail.SimpleMailMessage.class));
            ContactRequest request = new ContactRequest("John Doe", "john@example.com", "Hello");

            ResponseEntity<Void> response = strictService.send(request);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        @Test
        void sendsAutoAckOnlyIfEmailProvided() {
            ContactRequest request = new ContactRequest("John Doe", "john@example.com", "Hello");

            service.send(request);

            verify(mailSender, times(2)).send(any(org.springframework.mail.SimpleMailMessage.class)); // Main + ack
        }

        @Test
        void doesNotSendAutoAckIfEmailIsBlank() {
            ContactRequest request = new ContactRequest("John Doe", "", "Hello");

            service.send(request);

            verify(mailSender, times(1)).send(any(org.springframework.mail.SimpleMailMessage.class)); // Only main
        }
    }
}

