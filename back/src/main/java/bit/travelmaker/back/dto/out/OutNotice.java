package bit.travelmaker.back.dto.out;

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
@Alias(value = "OutNotice")
public class OutNotice {
    private Integer Id;
    private Integer userId;
    private String title;
    private String content;
    private Calendar written_date;
    private Calendar updated_date;
    private Integer viewCount;
    private String nickname;
}
