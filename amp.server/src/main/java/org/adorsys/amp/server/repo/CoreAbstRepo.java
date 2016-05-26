package org.adorsys.amp.server.repo;

import org.apache.deltaspike.data.api.EntityManagerDelegate;
import org.apache.deltaspike.data.api.FullEntityRepository;

public interface CoreAbstRepo<E> extends FullEntityRepository<E, String>, EntityManagerDelegate<E> {

}
