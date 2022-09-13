package bit.travelmaker.back.dto.in;

import bit.travelmaker.back.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "user")
public class InUser implements UserDetails {
    private Integer id;

    private String username;

    private String password;

    private String email;

    private String nickname;

    private Integer gender;

    private String src_photo;

    private String f_name;

    private String l_name;

    private boolean emailAuth;

    private Calendar register_date;

    private Calendar curr_date;

    private String company_num;

    private Integer rank;

    private Boolean disabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        if(this.rank == null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_GHOST"));
        }else if(this.rank == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }else if(this.rank == 2) {
            authorities.add(new SimpleGrantedAuthority("ROLE_PACKAGER"));
        }else if(this.rank == 3) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }else {
            authorities.add(new SimpleGrantedAuthority("ROLE_UNKNOWN"));
        }

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.disabled;
    }

    public UserEntity toEntity() {
        return UserEntity.builder()
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

    public HashMap<String, Object> convertToHashmap() {
        HashMap<String, Object> response = new HashMap<>();

        response.put("id", id);
        response.put("email", email);
        response.put("nickname", nickname);
        response.put("gender", gender);
        response.put("src_photo", src_photo);
        response.put("f_name", f_name);
        response.put("l_name", l_name);
        response.put("company_num", company_num);
        response.put("rank", rank);
        response.put("disabled", disabled);

        return response;
    }

}
