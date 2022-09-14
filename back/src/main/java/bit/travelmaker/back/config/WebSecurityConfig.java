package bit.travelmaker.back.config;

import bit.travelmaker.back.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception, NullPointerException {
        http
                .httpBasic().disable()
                        .csrf().disable()
                        .cors()
                        .and()
                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        .and()
                        .authorizeRequests()
                                .antMatchers("/api/user/signin", "/api/user/signup", "/api/user/disabled").permitAll()
                                .antMatchers("/api/user/whoami").permitAll()
                                .antMatchers("/api/user/who/**").permitAll()
                                .antMatchers("/api/profile/upload", "/api/board/upload").permitAll()
                                .antMatchers("/api/noticeboard","/api/noticeboard/**").permitAll()
                                .antMatchers("/api/eventboard","/api/eventboard/**").permitAll()
                                .antMatchers("/api/noticeandevent/**").permitAll()
                                .antMatchers("/api/noticeandevent/insert","/api/noticeandevent/delete","/api/noticeandevent/update/**").hasAnyRole("ADMIN")
                                .antMatchers("/api/user/update").hasAnyRole("USER", "PACKAGER", "ADMIN")
                                .antMatchers("/api/user/check/username", "/api/user/check/nickname", "/api/mail/check/email").permitAll()
                                .antMatchers("/api/user/check/pw", "/api/user/update/check/nickname").hasAnyRole("USER", "PACKAGER", "ADMIN")
                                .antMatchers("/api/follow", "/api/follower/**", "/api/following/**").permitAll()
                                .antMatchers("/api/mail/send").permitAll()
                                .antMatchers("/api/user/manage", "/api/user/manage/update").hasAnyRole("ADMIN")
                                .antMatchers("/api/packageboard/write", "/api/packageboard/wish", "/api/packageboard/iswish").hasAnyRole("USER", "PACKAGER", "ADMIN")
                                .antMatchers("/api/packageboard/join", "/api/packageboard/isjoin").hasAnyRole("USER", "PACKAGER", "ADMIN")
                                .antMatchers("/api/packageboard/**").permitAll()
                                .antMatchers("/api/reply/**").permitAll()
                                .antMatchers("/api/search").permitAll()
                                .antMatchers("/").permitAll()
                        .anyRequest().denyAll();


//                .authorizeHttpRequests((authz) ->
//                        authz.anyRequest().authenticated()
//                )
//                .httpBasic().disable()
//                .csrf().disable()
//                .cors()
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // jwt filter 등록
        // 매 요청마다 jwtAuthenticationFilter 실행
        http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);
        return http.build();
    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().antMatchers("/", "/api/user/signin", "/api/user/signup", "/api/user/check/username");
//    }
}