package org.adorsys.amp.server.repo;

import org.adorsys.amp.server.jpa.AmpUser;
import org.apache.deltaspike.data.api.Repository;

@Repository(forEntity=AmpUser.class)
public interface AmpUserRepo extends CoreAbstRepo<AmpUser>{
}
