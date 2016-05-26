package org.adorsys.amp.server.rest;

import java.lang.reflect.Field;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Path;

import org.adorsys.amp.server.ejb.AmpUserEjb;
import org.adorsys.amp.server.ejb.CoreAbstEjb;
import org.adorsys.amp.server.jpa.AmpUser;
import org.adorsys.amp.server.jpa.AmpUser_;

@Path("ampuser")
public class AmpUserEndPoint extends CoreAbstEntityEndpoint<AmpUser>{
	@Inject
	private AmpUserEjb ejb;
	
	@Override
	protected CoreAbstEjb<AmpUser> getEjb() {
		return ejb;
	}

	@Override
	protected Field[] getEntityFields() {
		return AmpUser_.class.getFields();
	}

	@Override
	protected CoreSearchInput<AmpUser> newSearchInput() {
		return new CoreSearchInput<AmpUser>() {
		};
	}

	@Override
	protected CoreSearchResult<AmpUser> newSearchResult(Long count, Long total, List<AmpUser> resultList,
			CoreSearchInput<AmpUser> searchInput) {
		return new CoreSearchResult<AmpUser>(count, total, resultList, searchInput);
	}

}
