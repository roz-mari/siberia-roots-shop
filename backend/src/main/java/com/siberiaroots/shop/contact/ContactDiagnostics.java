package com.siberiaroots.shop.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Endpoint(id = "contact-diagnostics")
public class ContactDiagnostics {

    private static final Logger log = LoggerFactory.getLogger(ContactDiagnostics.class);
    private final String mailFrom;
    private final String mailTo;

    public ContactDiagnostics(@Value("${app.mail.from:no-reply@siberia-roots.local}") String mailFrom,
                             @Value("${app.mail.to:}") String mailTo) {
        this.mailFrom = mailFrom;
        this.mailTo = mailTo;
    }

    @ReadOperation
    public Map<String, Object> diagnostics() {
        String actualRecipient = mailTo.isBlank() ? mailFrom : mailTo;
        return Map.of(
                "mailFrom", mailFrom != null ? mailFrom : "not set",
                "mailTo", mailTo != null && !mailTo.isBlank() ? mailTo : "not set (will use mailFrom)",
                "actualRecipient", actualRecipient,
                "status", mailFrom != null && !mailFrom.contains("local") ? "configured" : "needs configuration"
        );
    }
}

