package bit.travelmaker.back.persistence;

import bit.travelmaker.back.model.PackageBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageBoardRepository extends JpaRepository<PackageBoardEntity, Integer> {

}
