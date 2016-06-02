package org.adorsys.amp.server.ejb;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.adorsys.amp.server.jpa.Partner;
import org.adorsys.amp.server.repo.CoreAbstRepo;
import org.adorsys.amp.server.repo.PartnerRepo;

@Stateless
public class PartnerEjb extends CoreAbstEjb<Partner>{
	@Inject
	private PartnerRepo repo;

	@Override
	public CoreAbstRepo<Partner> getRepo() {
		return repo;
	}
	
}
