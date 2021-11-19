package com.KnowledgeCenter.App;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class LoginControllerTests {

	@Autowired
	TestRestTemplate testRestTemplate;

	@Test
	public void postLoginWithNoCredentials_returnsUnauthorized() {
		ResponseEntity<Object> response = testRestTemplate.postForEntity("/login", null, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
	}

	@Test
	public void postLoginWithIncorrectCredentials_returnsUnauthorized() {
		changeAuthenticationUser("unathorised-user", "P4ssword1");
		ResponseEntity<Object> response = testRestTemplate.postForEntity("/login", null, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
	}

	private void changeAuthenticationUser(String userName , String password) {
		testRestTemplate.getRestTemplate().getInterceptors()
				.add(new BasicAuthenticationInterceptor(userName , password));
	}

}
