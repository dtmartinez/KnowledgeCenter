package com.KnowledgeCenter.App;

import static org.assertj.core.api.Assertions.assertThat;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;

import com.KnowledgeCenter.App.User.UserRepository;
import com.KnowledgeCenter.App.User.UserService;
import com.KnowledgeCenter.App.User.User;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class LoginControllerTests {

	@Autowired
	TestRestTemplate testRestTemplate;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@BeforeEach
	public void cleanUp() {
		userRepository.deleteAll();
		testRestTemplate.getRestTemplate().getInterceptors().clear();
	}

	@Test
	public void postLoginWithNoCredentials_returnsUnauthorized() {
		HttpStatus responseCode = loginRequestResponse().getStatusCode();
		assertThat(responseCode).isEqualTo(HttpStatus.UNAUTHORIZED);
	}

	@Test
	public void postLoginWithIncorrectCredentials_returnsUnauthorized() {
		changeAuthenticationUser("unathorised-user", "Password1");
		HttpStatus responseCode = loginRequestResponse().getStatusCode();
		assertThat(responseCode).isEqualTo(HttpStatus.UNAUTHORIZED);
	}

	@Test
	public void postLoginWithCorrectCredentials_returnsOK() {
		authenticateValidUser();
		HttpStatus responseCode = loginRequestResponse().getStatusCode();
		assertThat(responseCode).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void postLoginWithCorrectCredentials_returnsCurrentUserId() {
		User user = authenticateValidUser();	 
		String responseBody = testRestTemplate.exchange("/login", HttpMethod.POST, null, String.class).getBody();
		assertThat(responseBody).contains(String.valueOf(user.getId()));
	}
	
	@Test
	public void postLoginWithCorrectCredentials_returnsCurrentUserName() {
		User user = authenticateValidUser();	 
		String responseBody = testRestTemplate.exchange("/login", HttpMethod.POST, null, String.class).getBody();
		assertThat(responseBody).contains(user.getName());
	}
	
	@Test
	public void postLoginWithCorrectCredentials_returnsCurrentUserWithoutPasswordField() {
		User user = authenticateValidUser();	 
		String responseBody = testRestTemplate.exchange("/login", HttpMethod.POST, null, String.class).getBody();
		assertThat(responseBody).doesNotContain(user.getPassword());
	}


	private ResponseEntity<Object> loginRequestResponse() {
		return testRestTemplate.postForEntity("/login", null, Object.class);
	}

	private User authenticateValidUser() {
		User user = new User();
		user.setName("Test User");
		user.setPassword("Password1");
		userService.save(user);
		changeAuthenticationUser(user.getName(), "Password1");
		return user;
	}

	private void changeAuthenticationUser(String userName, String password) {
		testRestTemplate.getRestTemplate().getInterceptors()
				.add(new BasicAuthenticationInterceptor(userName, password));
	}
}
