package com.KnowledgeCenter.App;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.KnowledgeCenter.App.User.User;
import com.KnowledgeCenter.App.User.UserRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserControllerTests {

	@Autowired
	TestRestTemplate testRestTemplate;
	
	@Autowired
	UserRepository userRepository;	

	@Test
	public void postValidUser_retunsOk() {
		User user = createValidUser();

		ResponseEntity<Object> response = testRestTemplate.postForEntity("/users", user, Object.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void postValidUser_savesToDatabase() {

		User user = createValidUser();
		
	    testRestTemplate.postForEntity("/users", user, Object.class);
	   
		assertThat(userRepository.count()).isEqualTo(1);
	}
	
	
	
	

	private User createValidUser() {
		User user = new User();
		user.setName("Test User");
		user.setPassword("Password1");
		return user;
	}

}
