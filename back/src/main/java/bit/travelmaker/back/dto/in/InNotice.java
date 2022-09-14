package bit.travelmaker.back.dto.in;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "InNotice")
public class InNotice {
    private Integer userId;
    private String title;
    private String content;
    private String imgs;
    private Integer category;
}
