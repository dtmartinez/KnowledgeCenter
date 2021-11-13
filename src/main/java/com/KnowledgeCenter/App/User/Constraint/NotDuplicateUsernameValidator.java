package com.KnowledgeCenter.App.User.Constraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.KnowledgeCenter.App.User.User;
import com.KnowledgeCenter.App.User.UserRepository;

public class NotDuplicateUsernameValidator implements ConstraintValidator<NotDuplicateUsername, String> {

	@Autowired
	UserRepository userRepository;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		User userInDB = userRepository.findByName(value);
		if (null == userInDB)
			return true;
		else
			return false;
	}

}
