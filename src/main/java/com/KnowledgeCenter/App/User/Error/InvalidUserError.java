package com.KnowledgeCenter.App.User.Error;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.validation.FieldError;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InvalidUserError {

	private List<String> error;
	private String path;
	private String message;
	private String status;
	private long timestamp;
	public InvalidUserError(List<FieldError> errorList, String path, String message, String status) {
		super();
		this.error = processErrorList(errorList);
		this.path = path;
		this.message = message;
		this.status = status;
		this.timestamp = new Date().getTime();
	}
	private List<String> processErrorList(List<FieldError> errorList) {
		List<String> stringListOfErrors = new ArrayList<String>();
		for (FieldError error : errorList) {
			stringListOfErrors.add(error.getField() + ": " + error.getDefaultMessage());
	    }
		return stringListOfErrors;		
	}
}
