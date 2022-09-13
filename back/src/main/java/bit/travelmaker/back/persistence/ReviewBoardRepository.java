package bit.travelmaker.back.persistence;

import bit.travelmaker.back.model.ReviewBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewBoardRepository extends JpaRepository<ReviewBoardEntity, Integer> {
}
