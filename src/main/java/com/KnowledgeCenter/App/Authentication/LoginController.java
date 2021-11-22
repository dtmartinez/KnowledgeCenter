package com.KnowledgeCenter.App.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KnowledgeCenter.App.User.JsonViews;
import com.KnowledgeCenter.App.User.User;
import com.fasterxml.jackson.annotation.JsonView;

@RestController
public class LoginController {
	
	@PostMapping("/login")
	@JsonView(JsonViews.Public.class)
	public User requestLogin() {
		User loggedUser = 
		(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();		
		return loggedUser;
	}
}
