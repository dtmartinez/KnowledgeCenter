package com.KnowledgeCenter.App.User;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.KnowledgeCenter.App.User.Error.InvalidUserError;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("users")
	@ResponseStatus(HttpStatus.CREATED)
	public void addUser(@RequestBody @Valid User user) {
			userService.save(user);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public InvalidUserError handleInvalidUserExceptions(MethodArgumentNotValidException exception) {
		
		InvalidUserError error = new InvalidUserError(
					exception.getFieldErrors(),
					"/users",
					"User is not valid",
					"400");
		return error;
	}
}
