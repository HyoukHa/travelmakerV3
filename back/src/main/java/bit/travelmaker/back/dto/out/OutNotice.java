package bit.travelmaker.back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "OutNotice")
public class OutNotice {

    private Integer id;
    private Integer userId;
    private String title;
    private String content;
    private Date written_date;
    private Date updated_date;
    private Integer viewCount;
    private String nickname;

    public HashMap<String, Object> convertToHashmap() {
        HashMap<String, Object> response = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");

        response.put("id",id);
        response.put("userId",userId);
        response.put("title",title);
        response.put("content",content);
        response.put("written_date",sdf.format(written_date));
        response.put("updated_date",sdf.format(updated_date));
        response.put("viewCount",viewCount);
        response.put("nickname",nickname);

        return response;
    }
}
