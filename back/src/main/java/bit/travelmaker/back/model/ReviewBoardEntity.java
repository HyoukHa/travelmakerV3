package bit.travelmaker.back.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "reviewboard")
public class ReviewBoardEntity {
    @Id
    private Integer id;

    @NotNull
    private Integer packageBoardId;

}
