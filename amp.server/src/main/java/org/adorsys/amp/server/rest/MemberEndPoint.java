package org.adorsys.amp.server.rest;

import java.lang.reflect.Field;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Path;

import org.adorsys.amp.server.ejb.MemberEjb;
import org.adorsys.amp.server.ejb.CoreAbstEjb;
import org.adorsys.amp.server.jpa.Member;
import org.adorsys.amp.server.jpa.MemberSearchInput;
import org.adorsys.amp.server.jpa.MemberSearchResult;
import org.adorsys.amp.server.jpa.Member_;

@Path("member")
public class MemberEndPoint extends CoreAbstEntityEndpoint<Member>{
	@Inject
	private MemberEjb ejb;
	
	@Override
	protected CoreAbstEjb<Member> getEjb() {
		return ejb;
	}

	@Override
	protected Field[] getEntityFields() {
		return Member_.class.getFields();
	}

	@Override
	protected CoreSearchInput<Member> newSearchInput() {
		return new MemberSearchInput() {
		};
	}

	@Override
	protected CoreSearchResult<Member> newSearchResult(Long count, Long total, List<Member> resultList,
			CoreSearchInput<Member> searchInput) {
		return new MemberSearchResult(count, total, resultList, searchInput);
	}

}
