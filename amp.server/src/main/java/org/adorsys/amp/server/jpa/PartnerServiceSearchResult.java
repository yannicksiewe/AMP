package org.adorsys.amp.server.jpa;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.adorsys.amp.server.rest.CoreSearchInput;
import org.adorsys.amp.server.rest.CoreSearchResult;

@XmlRootElement
public class PartnerServiceSearchResult extends CoreSearchResult<PartnerService> {

	public PartnerServiceSearchResult() {
		super();
	}

	public PartnerServiceSearchResult(Long count, Long total,
			List<PartnerService> resultList, CoreSearchInput<PartnerService> searchInput) {
		super(count, total, resultList, searchInput);
	}
}
