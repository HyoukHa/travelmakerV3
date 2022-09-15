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
@Alias(value = "OutReviewCard")
public class OutReviewCard {
    /**
     * user table에서 가져올 데이터
     */
    private String userImg;

    /**
     * reviewboard table에서 가져올 데이터
     */

    private Integer id;

    private Integer packageBoardId;

    /**
     * board table 에서 가져올 데이터
     */
    private Integer userId;

    private String title;

    private String content;

    private String contentImg;

    private Date written_date;


    public HashMap<String, Object> convertToHashmap() {
        HashMap<String, Object> response = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");

        response.put("id", id);
        response.put("packageBoardId", packageBoardId);
        response.put("userId", userId);
        response.put("title", title);
        response.put("content", content);
        response.put("contentImg", contentImg);
        response.put("written_date", sdf.format(written_date));
        response.put("userImg", userImg);
//        response.put("", );

        return response;
    }

//    b.id as id,
//    b.userId as userId,
//    b.title as title,
//    b.content as content,
//    b.imgs as contentImg,
//    b.written_date,
//    u.src_photo as userImg,
//    p.budget as budget,
//    p.duration as duration,
//    p.limit_to as limit_to,
//    p.current_to as current_to
}
