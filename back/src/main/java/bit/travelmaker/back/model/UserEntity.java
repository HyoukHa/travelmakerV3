package bit.travelmaker.back.model;


import bit.travelmaker.back.dto.in.InUser;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Calendar;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String email;

    @NotNull
    private String nickname;

    private Integer gender;

    private String src_photo;

    @NotNull
    private String f_name;

    @NotNull
    private String l_name;

    @Column(name = "emailauth")
    private boolean emailAuth;

    private Calendar register_date;

    private Calendar curr_date;

    private String company_num;

    @NotNull
    private Integer rank;

    @NotNull
    private Boolean disabled;

    public InUser makeData() {
        return InUser.builder()
                .id(id)
                .username(username)
                .password(null)
                .email(email)
                .nickname(nickname)
                .gender(gender)
                .src_photo(src_photo)
                .f_name(f_name)
                .l_name(l_name)
                .emailAuth(emailAuth)
                .register_date(register_date)
                .curr_date(curr_date)
                .company_num(company_num)
                .rank(rank)
                .disabled(disabled)
                .build();
    }

    public InUser makeDataToUpdate() {
        return InUser.builder()
                .id(id)
                .username(username)
                .password(password)
                .email(email)
                .nickname(nickname)
                .gender(gender)
                .src_photo(src_photo)
                .f_name(f_name)
                .l_name(l_name)
                .emailAuth(emailAuth)
                .register_date(register_date)
                .curr_date(curr_date)
                .company_num(company_num)
                .rank(rank)
                .disabled(disabled)
                .build();
    }
}
