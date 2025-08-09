package com.code_screening.demo;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FormController {

    private String getUsernameOrAnonymous() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            return "anonymous";
        }
        return authentication.getName();
    }

    @GetMapping("/")
    public String redirectToForm() {
        return "redirect:/form";
    }

    @GetMapping("/form")
    public String formPage(Model model) {
        model.addAttribute("username", getUsernameOrAnonymous());
        return "form";
    }

    @GetMapping("/confirm")
    public String confirmPage(Model model) {
        model.addAttribute("username", getUsernameOrAnonymous());
        return "confirm";
    }
}
