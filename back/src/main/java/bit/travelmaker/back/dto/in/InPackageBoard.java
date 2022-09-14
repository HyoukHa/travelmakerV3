package bit.travelmaker.back.dto.in;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "packageBoard")
public class InPackageBoard {
    private Integer id;
    private Integer userId;
    private Integer category;
    private String title;
    private String content;
    private Date written_date;
    private Date updated_date;
    private Integer viewCount;
    private String tags;
    private String imgs;
    private String videos;

    private Integer limit_to;
    private Integer current_to;
    private Integer duration;
    private Integer budget;
    private String location;
    private Date start_date;
}
