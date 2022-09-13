package bit.travelmaker.back.model;

import bit.travelmaker.back.dto.out.Reply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Calendar;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "reply")
public class ReplyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "userid", nullable = false)
    private Integer userId;

    @Column(name = "boardid", nullable = false)
    private Integer boardId;

    private String content;

    private Calendar written_date;

    private Calendar updated_date;

    private String imgs;

    public Reply convertToData() {
        return Reply.builder()
                .id(id)
                .userId(userId)
                .content(content)
                .written_date(written_date)
                .imgs(imgs)
                .build();
    }
}
