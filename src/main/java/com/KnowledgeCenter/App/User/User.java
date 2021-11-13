package com.KnowledgeCenter.App.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Entity
public class User {
	
	@Id
	@GeneratedValue
	
	private long id;
	@NotBlank(message = "Name can not be empty")
	@Size(min = 4, max = 100 , message = "Name size must be between 4 and 15")
	private String name;
	@NotBlank(message = "Password can not be empty")
	@Size(min = 8, message = "Name size must be between 4 and 15")
	@Pattern(regexp ="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$" , message = "Password must contain one lowercase upercase and number")
	private String password;
}
