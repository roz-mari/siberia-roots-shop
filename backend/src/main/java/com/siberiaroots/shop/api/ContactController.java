package com.siberiaroots.shop.api;

import com.siberiaroots.shop.contact.ContactRequest;
import com.siberiaroots.shop.contact.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Contact", description = "Contact form endpoint")
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @Operation(summary = "Send contact message")
    @PostMapping
    public ResponseEntity<Void> send(@Valid @RequestBody ContactRequest request) {
        return contactService.send(request);
    }
}


