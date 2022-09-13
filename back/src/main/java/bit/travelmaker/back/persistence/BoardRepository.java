package bit.travelmaker.back.persistence;

import bit.travelmaker.back.model.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, String> {
}
