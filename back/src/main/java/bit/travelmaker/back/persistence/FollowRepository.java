package bit.travelmaker.back.persistence;

import bit.travelmaker.back.dto.common.Follow;
import bit.travelmaker.back.model.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<FollowEntity, String> {

    List<FollowEntity> findAllByLikeUserId(int likeUserId);
    List<FollowEntity> findAllByLikedUserId(int likedUserId);

    Boolean existsByLikeUserIdAndLikedUserId(int likeUserId, int likedUserId);

    Optional<FollowEntity> findByLikeUserIdAndLikedUserId(int likeUserId, int likedUserId);

    void delete(FollowEntity follow);
}
