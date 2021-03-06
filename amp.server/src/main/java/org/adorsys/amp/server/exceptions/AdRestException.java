package org.adorsys.amp.server.exceptions;

import javax.ws.rs.core.Response.StatusType;

public class AdRestException extends AdException {

	private static final long serialVersionUID = -2437471045479402320L;
	private final StatusType status;

	public AdRestException(StatusType status) {
		super(""+status.getStatusCode());
		this.status = status;
	}

	public StatusType getStatus() {
		return status;
	}
}
