package org.adorsys.amp.server.jpa;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.adorsys.amp.server.rest.CoreSearchInput;
import org.adorsys.amp.server.rest.CoreSearchResult;

@XmlRootElement
public class MemberSearchResult extends CoreSearchResult<Member> {

	public MemberSearchResult() {
		super();
	}

	public MemberSearchResult(Long count, Long total,
			List<Member> resultList, CoreSearchInput<Member> searchInput) {
		super(count, total, resultList, searchInput);
	}
}
