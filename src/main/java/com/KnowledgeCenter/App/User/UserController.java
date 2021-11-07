package com.KnowledgeCenter.App.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("users")
	@ResponseStatus(HttpStatus.CREATED)
	void addUser(@RequestBody User user) {
			userService.save(user);
	}
}
