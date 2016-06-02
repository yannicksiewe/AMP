package org.adorsys.amp.server.repo;

import org.adorsys.amp.server.jpa.Partner;
import org.apache.deltaspike.data.api.Repository;

@Repository(forEntity=Partner.class)
public interface PartnerRepo extends CoreAbstRepo<Partner>{
}
