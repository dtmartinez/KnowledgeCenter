package com.KnowledgeCenter.App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class KnowledgeCenterApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnowledgeCenterApplication.class, args);
	}

}
