package com.KnowledgeCenter.App.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.KnowledgeCenter.App.User.User;
import com.KnowledgeCenter.App.User.UserRepository;

@Service
public class UserAuthenticationService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByName(username);

		if (null == user)
			throw new UsernameNotFoundException("User name not found");
		else
			return user;
	}

}
