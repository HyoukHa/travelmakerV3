package bit.travelmaker.back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "outFollow")
public class OutFollow {
    private int id;
    private int targetUserId;
    private String targetNickname;
    private String userImg;
}
