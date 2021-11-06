package com.KnowledgeCenter.App.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class User {
	
	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	private String password;
}
