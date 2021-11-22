package com.KnowledgeCenter.App.User;

import java.beans.Transient;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.KnowledgeCenter.App.User.Constraint.NotDuplicateUsername;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Data
@Entity
public class User implements UserDetails{
		
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@JsonView(JsonViews.Public.class)
	private long id;
	
	@NotBlank(message = "Name can not be empty")
	@Size(min = 4, max = 100 , message = "Name size must be between 4 and 15")
	@NotDuplicateUsername
	@JsonView(JsonViews.Public.class)
	private String name;
	
	@NotBlank(message = "Password can not be empty")
	@Size(min = 8, message = "Password must be at least 8 characters long")
	@Pattern(regexp ="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$" , message = "Password must contain one lowercase upercase and number")
	@JsonView(JsonViews.Internal.class)
	private String password;
	
	
	@Override
	@Transient
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("ROLE_USER");
	}
	@Transient
	@Override
	public String getUsername() {
		return getName();
	}
	@Transient
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Transient
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Transient
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Transient
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
