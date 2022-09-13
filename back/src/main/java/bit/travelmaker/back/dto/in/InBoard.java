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
@Alias(value = "board")
public class InBoard {
    private int id;
}
