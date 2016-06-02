package org.adorsys.amp.server.ejb;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.adorsys.amp.server.jpa.PartnerService;
import org.adorsys.amp.server.repo.CoreAbstRepo;
import org.adorsys.amp.server.repo.PartnerServiceRepo;

@Stateless
public class PartnerServiceEjb extends CoreAbstEjb<PartnerService>{
	@Inject
	private PartnerServiceRepo repo;

	@Override
	public CoreAbstRepo<PartnerService> getRepo() {
		return repo;
	}
	
}
