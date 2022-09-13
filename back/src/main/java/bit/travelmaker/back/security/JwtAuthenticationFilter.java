package bit.travelmaker.back.security;

import bit.travelmaker.back.dto.in.InUser;
import bit.travelmaker.back.model.UserEntity;
import bit.travelmaker.back.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // bearer 토큰을 받아온다.
            String token = parseBearerToken(request);
            // log를
            System.out.println("token type: " + token.getClass().getName());
            log.info("JwtAuthenticationFilter : success action parseBearerToken");
            log.info("token: {" + token + "}");


            int userId = tokenProvider.validateAndGetUserId(token);

            if(token != null && !token.equalsIgnoreCase("null") && userId != 0) {
                InUser userData = userService.whoAmI(userId);

                log.info("Authentication ID : " + userId);

                AbstractAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userId, null, userData.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authenticationToken);

                SecurityContextHolder.setContext(securityContext);
            }else if(token == null) {
                log.info("token is null");
            }
        }catch (Exception e) {
//            e.printStackTrace();
//            log.error("jwt token error");
        }

        filterChain.doFilter(request, response);
    }

    // http 요청의 헤더를 파싱하여 bearer 토큰을 리턴한다.
    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}