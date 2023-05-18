package rs.ac.bg.fon.social_network.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.social_network.domain.Reaction;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    Page<Reaction> findByPostId(Long id, Pageable pageable);
}