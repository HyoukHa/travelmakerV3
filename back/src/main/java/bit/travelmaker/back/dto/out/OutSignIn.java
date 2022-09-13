package bit.travelmaker.back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OutSignIn {
    private Integer id;
    private String token;
    private String nickname;
    private String src_photo;
    private Boolean disabled;
}
