package org.adorsys.amp.server.rest;

import java.lang.reflect.Field;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Path;

import org.adorsys.amp.server.ejb.PartnerServiceEjb;
import org.adorsys.amp.server.ejb.CoreAbstEjb;
import org.adorsys.amp.server.jpa.PartnerService;
import org.adorsys.amp.server.jpa.PartnerServiceSearchInput;
import org.adorsys.amp.server.jpa.PartnerServiceSearchResult;
import org.adorsys.amp.server.jpa.PartnerService_;

@Path("partnerservice")
public class PartnerServiceEndPoint extends CoreAbstEntityEndpoint<PartnerService>{
	@Inject
	private PartnerServiceEjb ejb;
	
	@Override
	protected CoreAbstEjb<PartnerService> getEjb() {
		return ejb;
	}

	@Override
	protected Field[] getEntityFields() {
		return PartnerService_.class.getFields();
	}

	@Override
	protected CoreSearchInput<PartnerService> newSearchInput() {
		return new PartnerServiceSearchInput() {
		};
	}

	@Override
	protected CoreSearchResult<PartnerService> newSearchResult(Long count, Long total, List<PartnerService> resultList,
			CoreSearchInput<PartnerService> searchInput) {
		return new PartnerServiceSearchResult(count, total, resultList, searchInput);
	}

}
