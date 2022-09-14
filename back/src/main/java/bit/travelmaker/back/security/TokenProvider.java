package bit.travelmaker.back.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {

    // 30분
    private final long ACCESS_TOKEN_VALIDATION_SECOND = 60 * 60 * 3;

    // 1개월
    private final long REFRESH_TOKEN_VALIDATION_SECOND = 60 * 60 * 24 * 30;

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    /**
     * payload : token을 생성할때 subject로 넣어줄 데이터
     */
    public String create(final String payload) {
        // 토큰의 만료기한을 현재(요청시간)으로부터 하루뒤로 설정한다.
        Date expireDate = Date.from(Instant.now().plus(ACCESS_TOKEN_VALIDATION_SECOND, ChronoUnit.SECONDS));

        Key key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                // header 에 들어갈 내용 및 서명을 하기위한 jwt secret 설정
                .signWith(key, SignatureAlgorithm.HS256)
                // payload 에 들어갈 내용
                .setSubject(payload)
                // token 이 발급된 시간을 등록, 해당 값을 통해 토큰이 얼마나 오래되었는지 확인 가능함.
                .setIssuedAt(new Date())
                // token 의 만료시간, 항상 현재시간보다 이후로 설정되어있어야한다.
                .setExpiration(expireDate)
                //
                .compact();
    }

    /**
     * 사용자로부터 토큰을 받아와 해당 토큰을 가진 사용자 id 추출
     * 토큰을 디코딩 및 파싱하여 토큰의 위조 여부를 확인하는 메서드
     */
    public Integer validateAndGetUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(JWT_SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
        System.out.println("validateAndGetUserId : " + claims);
        System.out.println("payload: " + claims.getSubject());

        return Integer.parseInt(claims.getSubject());
    }
}