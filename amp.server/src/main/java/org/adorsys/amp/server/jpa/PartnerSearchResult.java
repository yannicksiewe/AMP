package org.adorsys.amp.server.jpa;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.adorsys.amp.server.rest.CoreSearchInput;
import org.adorsys.amp.server.rest.CoreSearchResult;

@XmlRootElement
public class PartnerSearchResult extends CoreSearchResult<Partner> {

	public PartnerSearchResult() {
		super();
	}

	public PartnerSearchResult(Long count, Long total,
			List<Partner> resultList, CoreSearchInput<Partner> searchInput) {
		super(count, total, resultList, searchInput);
	}
}
