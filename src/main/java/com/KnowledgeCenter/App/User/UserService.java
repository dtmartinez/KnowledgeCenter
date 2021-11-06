package com.KnowledgeCenter.App.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
		
	UserRepository userRepository;

	public UserService(@Autowired UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	public User save( User user) {
		return userRepository.save(user);
	}

}
