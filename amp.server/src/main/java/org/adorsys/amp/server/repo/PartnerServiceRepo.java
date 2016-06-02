package org.adorsys.amp.server.repo;

import org.adorsys.amp.server.jpa.PartnerService;
import org.apache.deltaspike.data.api.Repository;

@Repository(forEntity=PartnerService.class)
public interface PartnerServiceRepo extends CoreAbstRepo<PartnerService>{
}
