package com.KnowledgeCenter.App.User.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = NotDuplicateUsernameValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface NotDuplicateUsername {
	String message() default "Duplicated user name";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
