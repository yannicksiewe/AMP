package org.adorsys.amp.server.rest;

import java.util.List;

import org.codehaus.jackson.annotate.JsonTypeInfo;
import org.codehaus.jackson.annotate.JsonTypeInfo.As;
import org.codehaus.jackson.annotate.JsonTypeInfo.Id;

@JsonTypeInfo(use=Id.CLASS, include=As.PROPERTY, property="className")
public class CoreSearchResult<T> {

	/*
	 * The number of entities matching this search.
	 */
	private Long count;
	
	/*
	 * The total number of  T entities existing in database.
	 */
	private Long total;

	/*
	 * The result list.
	 */
	private List<T> resultList;

	private String className;

	/*
	 * The original search input object. For stateless clients.
	 */
	private CoreSearchInput<T> searchInput;

	public CoreSearchResult() {
		this.className = this.getClass().getName();
	}

	public CoreSearchResult(Long count, List<T> resultList,
			CoreSearchInput<T> searchInput) {
		super();
		this.count = count;
		this.resultList = resultList;
		this.searchInput = searchInput;
	}

	public CoreSearchResult(Long count, Long total, List<T> resultList,
			CoreSearchInput<T> searchInput) {
		this(count, resultList, searchInput);
		this.total = total;
	}

	public Long getCount() {
		return count;
	}

	public List<T> getResultList() {
		return resultList;
	}

	public CoreSearchInput<T> getSearchInput() {
		return searchInput;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public void setResultList(List<T> resultList) {
		this.resultList = resultList;
	}

	public void setSearchInput(CoreSearchInput<T> searchInput) {
		this.searchInput = searchInput;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}
	
}
