/**
 * PackageEntity
 *
 * 작성자 :
 */

package bit.travelmaker.back.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "sellerboard")
public class PackageBoardEntity {
    /**
     * foreign key(id) references board(id)
     */
    @Id
    private Integer id;

    /**
     * limit number of people
     */
    @NotNull
    private Integer limit_to;

    /**
     * current number of people
     */
    @NotNull
    private Integer current_to;

    private Integer duration;

    private Integer budget;
}
