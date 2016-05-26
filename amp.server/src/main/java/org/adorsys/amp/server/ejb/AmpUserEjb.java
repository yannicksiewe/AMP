package org.adorsys.amp.server.ejb;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.adorsys.amp.server.jpa.AmpUser;
import org.adorsys.amp.server.repo.AmpUserRepo;
import org.adorsys.amp.server.repo.CoreAbstRepo;

@Stateless
public class AmpUserEjb extends CoreAbstEjb<AmpUser>{
	@Inject
	private AmpUserRepo repo;

	@Override
	public CoreAbstRepo<AmpUser> getRepo() {
		return repo;
	}
	
}
