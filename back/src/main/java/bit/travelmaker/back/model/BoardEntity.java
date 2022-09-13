package bit.travelmaker.back.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "board")
/**
 * BoardEntity
 *
 * 작성자 : 권혁하 <mindcypher97@gmail.com>
 * board table 에 매핑되는 entity
 */
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    private Integer userId;

    @NotNull
    private Integer category;
    // 1. 공지  2. 패키지  3. 후기

    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private Date written_date;

    @NotNull
    private Date updated_date;

    @NotNull
    private Integer viewCount;

    private String tags;

    private String imgs;

    private String videos;
}
