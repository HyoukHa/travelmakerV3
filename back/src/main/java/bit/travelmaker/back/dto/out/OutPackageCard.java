package bit.travelmaker.back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "OutPackageCard")
public class OutPackageCard {
    /**
     * user table에서 가져올 데이터
     */
    private String userImg;

    /**
     * board table에서 가져올 데이터
     */

    private Integer id;

    private Integer userId;

    private String title;

    private String imgs;

    private Date written_date;

    private String location;

    /**
     * packageboard에서 가져올 데이터
     */

    private Integer limit_to;

    private Integer current_to;

    private Integer budget;

    private Integer duration;

    public HashMap<String, Object> convertToHashmap() {
        HashMap<String, Object> response = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");

        response.put("id", id);
        response.put("userId", userId);
        response.put("title", title);
        response.put("imgs", imgs);
        response.put("written_date", sdf.format(written_date));
        response.put("limit_to", limit_to);
        response.put("current_to", current_to);
        response.put("budget", budget);
        response.put("duration", duration);
        response.put("userImg", userImg);

        return response;
    }
}
