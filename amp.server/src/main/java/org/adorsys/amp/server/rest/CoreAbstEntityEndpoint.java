package org.adorsys.amp.server.rest;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.metamodel.SingularAttribute;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.adorsys.amp.server.ejb.CoreAbstEjb;
import org.adorsys.amp.server.exceptions.AdException;
import org.adorsys.amp.server.jpa.CoreAbstEntity;
import org.adorsys.amp.server.vo.StringListHolder;

public abstract class CoreAbstEntityEndpoint<E extends CoreAbstEntity> {

	protected abstract CoreAbstEjb<E> getEjb();
	protected abstract Field[] getEntityFields();
	protected abstract CoreSearchInput<E> newSearchInput();
	protected abstract CoreSearchResult<E> newSearchResult(Long count, Long total, List<E> resultList, CoreSearchInput<E> searchInput);

	@GET
	@Path("/{id}")
	@Produces({ "application/json"})
	public Response findById(@PathParam("id") String id) {
		E found = getEjb().findById(id);
		if (found == null)
			return Response.status(Status.NOT_FOUND).build();
		return Response.ok(detach(found)).build();
	}

	@GET
	@Produces({ "application/json"})
	public CoreSearchResult<E> listAll(
			@QueryParam("start") int start, @QueryParam("max") int max) {
		// Limit the max of items queryable.
		max = CoreSearchInput.checkMax(max);
		Long total = getEjb().count();
		List<E> resultList = getEjb().listAll(start, max);
		CoreSearchInput<E> searchInput = newSearchInput();
		searchInput.setStart(start);
		searchInput.setMax(max);
		return newSearchResult(new Long(resultList.size()), total,
				detach(resultList), detach(searchInput));
	}

	@POST
	@Path("/findByIdIn")
	@Produces({ "application/json"})
	public CoreSearchResult<E> findByIdentifIn(StringListHolder identifs) {
		List<E> resultList = getEjb().findByIdIn(identifs.getList());
		CoreSearchInput<E> searchInput = newSearchInput();
		searchInput.setStart(identifs.getStart());
		searchInput.setMax(identifs.getMax());
		Long size = new Long(resultList.size());
		return newSearchResult(size, size,
				detach(resultList), detach(searchInput));
	}
	
	@GET
	@Path("/count")
	public Long count() {
		return getEjb().count();
	}

	@POST
	@Path("/findBy")
	@Produces({ "application/json"})
	@Consumes({ "application/json"})
	public CoreSearchResult<E> findBy(
			CoreSearchInput<E> searchInput) {
		SingularAttribute<E, ?>[] attributes = readSeachAttributes(searchInput);
		Long count = getEjb().countBy(searchInput.getEntity(), attributes);
		Long total = getEjb().count();
		List<E> resultList = getEjb().findBy(
				searchInput.getEntity(), searchInput.getStart(),
				searchInput.getMax(), attributes);
		return newSearchResult(count,total, detach(resultList),
				detach(searchInput));
	}

	@POST
	@Path("/countBy")
	@Consumes({ "application/json"})
	public Long countBy(CoreSearchInput<E> searchInput) {
		SingularAttribute<E, ?>[] attributes = readSeachAttributes(searchInput);
		return getEjb().countBy(searchInput.getEntity(), attributes);
	}

	@POST
	@Path("/findByLike")
	@Produces({ "application/json"})
	@Consumes({ "application/json"})
	public CoreSearchResult<E> findByLike(
			CoreSearchInput<E> searchInput) {
		SingularAttribute<E, ?>[] attributes = readSeachAttributes(searchInput);
		Long countLike = getEjb().countByLike(searchInput.getEntity(), attributes);
		Long total = getEjb().count();
		List<E> resultList = getEjb().findByLike(
				searchInput.getEntity(), searchInput.getStart(),
				searchInput.getMax(), attributes);
		return newSearchResult(countLike, total,
				detach(resultList), detach(searchInput));
	}

	@POST
	@Path("/countByLike")
	@Consumes({ "application/json"})
	public Long countByLike(CoreSearchInput<E> searchInput) {
		SingularAttribute<E, ?>[] attributes = readSeachAttributes(searchInput);
		return getEjb().countByLike(searchInput.getEntity(), attributes);
	}

	@SuppressWarnings("unchecked")
	protected SingularAttribute<E, ?>[] readSeachAttributes(
			CoreSearchInput<E> searchInput) {
		List<String> fieldNames = searchInput.getFieldNames();
		List<SingularAttribute<E, ?>> result = new ArrayList<SingularAttribute<E, ?>>();
		for (String fieldName : fieldNames) {
			Field[] fields = getEntityFields();
			for (Field field : fields) {
				if (field.getName().equals(fieldName)) {
					try {
						result.add((SingularAttribute<E, ?>) field
								.get(null));
					} catch (IllegalArgumentException e) {
						throw new IllegalStateException(e);
					} catch (IllegalAccessException e) {
						throw new IllegalStateException(e);
					}
				}
			}
		}
		return result.toArray(new SingularAttribute[result.size()]);
	}

	protected E detach(E entity) {
		if (entity == null)
			return null;

		return entity;
	}

	protected List<E> detach(List<E> list) {
		if (list == null)
			return list;
		List<E> result = new ArrayList<E>();
		for (E entity : list) {
			result.add(detach(entity));
		}
		return result;
	}

	protected CoreSearchInput<E> detach(
			CoreSearchInput<E> searchInput) {
		searchInput.setEntity(detach(searchInput.getEntity()));
		return searchInput;
	}

	@POST
	@Consumes({ "application/json"})
	@Produces({ "application/json"})
	public E create(E entity) throws AdException {
		return detach(getEjb().create(entity));
	}

	@DELETE
	@Path("/{id}")
	public Response deleteById(@PathParam("id") String id) {
		E deleted = getEjb().deleteById(id);
		if (deleted == null)
			return Response.status(Status.NOT_FOUND).build();

		return Response.ok(detach(deleted)).build();
	}

	@PUT
	@Path("/{id}")
	@Produces({ "application/json"})
	@Consumes({ "application/json"})
	public E update(E entity, @PathParam("id") String id) {
		// TODO: verify id integrity.
		return detach(getEjb().update(entity));
	}
}