package org.adorsys.amp.server.jpa;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.adorsys.amp.server.rest.CoreSearchInput;
import org.adorsys.amp.server.rest.CoreSearchResult;

@XmlRootElement
public class AmpUserSearchResult extends CoreSearchResult<AmpUser> {

	public AmpUserSearchResult() {
		super();
	}

	public AmpUserSearchResult(Long count, Long total,
			List<AmpUser> resultList, CoreSearchInput<AmpUser> searchInput) {
		super(count, total, resultList, searchInput);
	}
}
