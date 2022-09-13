package bit.travelmaker.back.model;

import bit.travelmaker.back.dto.common.Follow;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "follow")
public class FollowEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @NotNull
    private Integer likeUserId;

    @NotNull
    private Integer likedUserId;

    public Follow convertToDto() {
        return Follow.builder()
                .id(id)
                .likeUserId(likeUserId)
                .likedUserId(likedUserId)
                .build();
    }
}
