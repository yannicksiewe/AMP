package org.adorsys.amp.server.repo;

import org.adorsys.amp.server.jpa.Member;
import org.apache.deltaspike.data.api.Repository;

@Repository(forEntity=Member.class)
public interface MemberRepo extends CoreAbstRepo<Member>{
}
