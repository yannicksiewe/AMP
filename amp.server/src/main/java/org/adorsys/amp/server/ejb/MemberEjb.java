package org.adorsys.amp.server.ejb;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.adorsys.amp.server.jpa.Member;
import org.adorsys.amp.server.repo.CoreAbstRepo;
import org.adorsys.amp.server.repo.MemberRepo;

@Stateless
public class MemberEjb extends CoreAbstEjb<Member>{
	@Inject
	private MemberRepo repo;

	@Override
	public CoreAbstRepo<Member> getRepo() {
		return repo;
	}
	
}
