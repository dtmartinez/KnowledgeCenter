package com.KnowledgeCenter.App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class KnowledgeCenterApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnowledgeCenterApplication.class, args);
	}

}
