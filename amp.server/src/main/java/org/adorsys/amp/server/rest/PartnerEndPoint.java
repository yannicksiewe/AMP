package org.adorsys.amp.server.rest;

import java.lang.reflect.Field;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Path;

import org.adorsys.amp.server.ejb.PartnerEjb;
import org.adorsys.amp.server.ejb.CoreAbstEjb;
import org.adorsys.amp.server.jpa.Partner;
import org.adorsys.amp.server.jpa.PartnerSearchInput;
import org.adorsys.amp.server.jpa.PartnerSearchResult;
import org.adorsys.amp.server.jpa.Partner_;

@Path("partner")
public class PartnerEndPoint extends CoreAbstEntityEndpoint<Partner>{
	@Inject
	private PartnerEjb ejb;
	
	@Override
	protected CoreAbstEjb<Partner> getEjb() {
		return ejb;
	}

	@Override
	protected Field[] getEntityFields() {
		return Partner_.class.getFields();
	}

	@Override
	protected CoreSearchInput<Partner> newSearchInput() {
		return new PartnerSearchInput() {
		};
	}

	@Override
	protected CoreSearchResult<Partner> newSearchResult(Long count, Long total, List<Partner> resultList,
			CoreSearchInput<Partner> searchInput) {
		return new PartnerSearchResult(count, total, resultList, searchInput);
	}

}
