package org.adorsys.amp.server.rest;

public class CoreSortOrder {

	private String fieldName;
	
	private Boolean ASC = Boolean.FALSE;

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public Boolean getASC() {
		return ASC;
	}

	public void setASC(Boolean aSC) {
		ASC = aSC;
	}
	
}
