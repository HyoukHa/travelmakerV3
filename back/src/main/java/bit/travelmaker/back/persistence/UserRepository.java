package bit.travelmaker.back.persistence;

import bit.travelmaker.back.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findByUsername(String username);

    Optional<UserEntity> findById(Integer id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByNickname(String nickname);
}
