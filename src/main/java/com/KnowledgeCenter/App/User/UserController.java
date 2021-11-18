package com.KnowledgeCenter.App.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("users")
	void addUser(@RequestBody User user) {
			userService.save(user);
	}
}
