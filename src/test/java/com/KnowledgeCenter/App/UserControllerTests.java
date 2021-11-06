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

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserControllerTests {

	@Autowired
	TestRestTemplate testRestTemplate;

	@Test
	public void postValidUser_retunsOk() {
		User user = new User();
		user.setName("Test User");
		user.setPassword("Password1");
		ResponseEntity<Object> response = testRestTemplate.postForEntity("/users", user, Object.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

	}
}
