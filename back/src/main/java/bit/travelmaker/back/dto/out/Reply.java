package bit.travelmaker.back.dto.out;

import bit.travelmaker.back.model.ReplyEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.util.Calendar;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "reply")
public class Reply {
    private Integer id;

    private Integer userId;

    private Integer boardId;

    private String content;

    private Calendar written_date;

    private String imgs;

    public ReplyEntity toEntity() {
        return ReplyEntity.builder()
                .id(id)
                .userId(userId)
                .boardId(boardId)
                .content(content)
                .written_date(written_date)
                .imgs(imgs)
                .build();
    }
}
