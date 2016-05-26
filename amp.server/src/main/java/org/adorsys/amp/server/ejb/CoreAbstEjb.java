package org.adorsys.amp.server.ejb;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.metamodel.SingularAttribute;

import org.adorsys.amp.server.repo.CoreAbstRepo;

public abstract class CoreAbstEjb<E> {
	
	public abstract CoreAbstRepo<E> getRepo();

	public E findById(String id) {
		return getRepo().findBy(id);
	}

	public Long count() {
		return getRepo().count();
	}

	public List<E> listAll(int start, int max) {
		return getRepo().findAll(start, max);
	}

	public List<E> findByIdIn(List<String> identifs) {
		List<E> result = new ArrayList<>();
		for (String identif : identifs) {
			E found = findById(identif);
			if(found!=null) result.add(found);
		}
		return result;
	}

	public Long countBy(E entity, SingularAttribute<E, ?>[] attributes) {
		return getRepo().count(entity, attributes);
	}

	public List<E> findBy(E entity, int start, int max, SingularAttribute<E, ?>[] attributes) {
		return getRepo().findBy(entity, start, max, attributes);
	}

	public Long countByLike(E entity, SingularAttribute<E, ?>[] attributes) {
		return getRepo().countLike(entity, attributes);
	}

	public List<E> findByLike(E entity, int start, int max, SingularAttribute<E, ?>[] attributes) {
		return getRepo().findByLike(entity, start, max, attributes);
	}

	public E create(E entity) {
		E attached = attach(entity);
		getRepo().persist(attached);
		return attached;
	}

	public E deleteById(String id) {
		E entity = getRepo().findBy(id);
		getRepo().remove(entity);
		return entity;
	}

	public E update(E entity) {
		E saved = getRepo().save(attach(entity));
		return saved;
	}

	protected E attach(E entity) {
		return entity;
	}
}
