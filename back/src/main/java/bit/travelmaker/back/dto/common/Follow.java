package bit.travelmaker.back.dto.common;

import bit.travelmaker.back.model.FollowEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "follow")
public class Follow {
    private int id;
    private int likeUserId;
    private Integer likedUserId;

    public FollowEntity convertToEntity(){
        return FollowEntity.builder()
                .id(id)
                .likeUserId(likeUserId)
                .likedUserId(likedUserId)
                .build();
    }
}
