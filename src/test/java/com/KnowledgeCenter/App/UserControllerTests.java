package com.KnowledgeCenter.App;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.KnowledgeCenter.App.Error.InvalidUserError;
import com.KnowledgeCenter.App.User.User;
import com.KnowledgeCenter.App.User.UserRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserControllerTests {

	@Autowired
	TestRestTemplate testRestTemplate;
	
	@Autowired
	UserRepository userRepository;	
	
	@BeforeEach
	public void cleanUpDatabase() {
		userRepository.deleteAll();
	}

	@Test
	public void postValidUser_retunsOk() {
		User user = createValidUser();
		ResponseEntity<Object> response = singUpRequestResponse(user);		
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
	}	

	@Test
	public void postValidUser_savesToDatabase() {
		User user = createValidUser();		
	    singUpRequestResponse(user);	   
		assertThat(userRepository.count()).isEqualTo(1);
	}
	
	@Test
	public void postValidUser_hashesThePassword() {		
		User user = createValidUser();
		singUpRequestResponse(user);
		
		List<User> usersInDatabase = userRepository.findAll();
		User savedUser = usersInDatabase.get(0);
		assertThat(savedUser.getPassword()).isNotEqualTo(user.getPassword());		
	}
	
	@Test
	public void postNullUserName_returnsError() {
		User user = createValidUser();
		user.setName(null);
		assertThat(singUpRequestResponse(user).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postUserNameTooShort_returnsError() {
		User user = createValidUser();
		user.setName("na");
		assertThat(singUpRequestResponse(user).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postInvalidUser_recievesInvalidUserError() {
		User user = new User();
		ResponseEntity<InvalidUserError> response = testRestTemplate.postForEntity("/users", user, InvalidUserError.class);
		assertThat(response.getBody().getPath()).isEqualTo("/users");
		assertThat(response.getBody().getMessage()).contains("not valid");		
	}
	
	@Test
	public void postBlankUser_recievesCorrectErrorMessages() {
		User user = new User();
		ResponseEntity<InvalidUserError> response = testRestTemplate.postForEntity("/users", user, InvalidUserError.class);
		assertThat(response.getBody().getError()).contains("Name can not be empty");		
		assertThat(response.getBody().getError()).contains("Password can not be empty");		
	}
	@Test
	public void postInvalidUser_recievesCorrectErrorMessages() {
		User user = new User();
		user.setName("use");
		user.setPassword("missingANumber");
		ResponseEntity<InvalidUserError> response = testRestTemplate.postForEntity("/users", user, InvalidUserError.class);
		assertThat(response.getBody().getError()).contains("Name size must be");		
		assertThat(response.getBody().getError()).contains("Password must contain");		
	}
	
	@Test
	public void postNulldPassword_returnsError() {
		User user = createValidUser();
		user.setPassword(null);
		assertThat(singUpRequestResponse(user).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordTooShort_returnsError() {
		User user = createValidUser();
		user.setPassword("pas");
		assertThat(singUpRequestResponse(user).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordWithoutLowercase_returnsError() {
		User user = createValidUser();
		user.setPassword(user.getPassword().toUpperCase());
		assertThat(singUpRequestResponse(user).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordWithoutUppercase_returnsError() {
		User user = createValidUser();
		user.setPassword(user.getPassword().toLowerCase());
		assertThat(singUpRequestResponse(user).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordWithoutNumber_returnsError() {
		User user = createValidUser();
		user.setPassword("PasswordL");		
		assertThat(singUpRequestResponse(user).getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}	
	
	private ResponseEntity<Object> singUpRequestResponse(User user) {
		return testRestTemplate.postForEntity("/users", user, Object.class);
	}
	
	private User createValidUser() {
		User user = new User();
		user.setName("Test User");
		user.setPassword("Password1");
		return user;
	}
}
