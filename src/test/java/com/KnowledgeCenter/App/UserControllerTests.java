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

import com.KnowledgeCenter.App.User.User;
import com.KnowledgeCenter.App.User.UserRepository;
import com.KnowledgeCenter.App.User.Error.InvalidUserError;

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
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.CREATED);
	}	

	@Test
	public void postValidUser_savesToDatabase() {
		User user = createValidUser();		
	    signUpRequestResponse(user);	   
		assertThat(userRepository.count()).isEqualTo(1);
	}
	
	@Test
	public void postValidUser_hashesThePassword() {		
		User user = createValidUser();
		signUpRequestResponse(user);
		
		List<User> usersInDatabase = userRepository.findAll();
		User savedUser = usersInDatabase.get(0);
		assertThat(savedUser.getPassword()).isNotEqualTo(user.getPassword());		
	}
	
	@Test
	public void postNullUserName_returnsError() {
		User user = createValidUser();
		user.setName(null);
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postUserNameTooShort_returnsError() {
		User user = createValidUser();
		user.setName("na");
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postInvalidUser_recievesInvalidUserError() {
		User user = new User();
		InvalidUserError responseBody = invalidSignUpRequestResponse(user).getBody();
		String bodyPath = responseBody.getPath();
		String bodyMessage = responseBody.getMessage();
		
		assertThat(bodyPath).isEqualTo("/users");
		assertThat(bodyMessage).contains("not valid");		
	}	
	
	@Test
	public void postBlankUser_recievesCorrectErrorMessages() {
		User user = new User();
		InvalidUserError responseBody = invalidSignUpRequestResponse(user).getBody();
		String bodyError = responseBody.getError().toString();
		assertThat(bodyError).contains("Name can not be empty");		
		assertThat(bodyError).contains("Password can not be empty");		
	}
	
	@Test
	public void postInvalidUser_recievesCorrectErrorMessages() {
		User user = new User();
		user.setName("use");
		user.setPassword("missingANumber");
		InvalidUserError responseBody = invalidSignUpRequestResponse(user).getBody();
		String bodyError = responseBody.getError().toString();
		assertThat(bodyError).contains("Name size must be");		
		assertThat(bodyError).contains("Password must contain");		
	}
	
	@Test
	public void postUserWithDuplicateName_recievesErrorCode() {
		User user = createValidUser();
		userRepository.save(user);
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);	
	}
	@Test
	public void postUserWithDuplicateName_recievesErrorMessage() {
		User user = createValidUser();
		userRepository.save(user);
		String responseBodyAsString = signUpRequestResponse(user).getBody().toString();
		assertThat(responseBodyAsString).containsIgnoringCase("duplicated");	
	}
	
	
	@Test
	public void postNulldPassword_returnsError() {
		User user = createValidUser();
		user.setPassword(null);
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordTooShort_returnsError() {
		User user = createValidUser();
		user.setPassword("pas");
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordWithoutLowercase_returnsError() {
		User user = createValidUser();
		user.setPassword(user.getPassword().toUpperCase());
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordWithoutUppercase_returnsError() {
		User user = createValidUser();
		user.setPassword(user.getPassword().toLowerCase());
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test
	public void postPasswordWithoutNumber_returnsError() {
		User user = createValidUser();
		user.setPassword("PasswordL");		
		HttpStatus responseStatusCode = signUpRequestResponse(user).getStatusCode();
		assertThat(responseStatusCode).isEqualTo(HttpStatus.BAD_REQUEST);
	}	
	
	private ResponseEntity<Object> signUpRequestResponse(User user) {
		return testRestTemplate.postForEntity("/users", user, Object.class);
	}
	
	private ResponseEntity<InvalidUserError> invalidSignUpRequestResponse(User user) {
		return testRestTemplate.postForEntity("/users", user, InvalidUserError.class);
	}
	
	private User createValidUser() {
		User user = new User();
		user.setName("Test User");
		user.setPassword("Password1");
		return user;
	}
}
