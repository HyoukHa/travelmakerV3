package bit.travelmaker.back.controller;

import bit.travelmaker.back.dto.in.InUser;
import bit.travelmaker.back.dto.out.OutFollow;
import bit.travelmaker.back.security.TokenProvider;
import bit.travelmaker.back.service.FollowService;
import bit.travelmaker.back.service.UserService;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Value("http://localhost:3000")
    String REDIRECT_URL;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    /**
     * isDuplicateUsername
     *
     * 작성자 : 권혁하 <mindcypher97@gmail.com>
     * username 중복검사
     */
    @PostMapping(value = "/check/username")
    public ResponseEntity<?> isDuplicateUsername(@RequestBody InUser inSignUp){
        Boolean exist = userService.isDuplicateUsername(inSignUp.getUsername());
        log.info("request isExistUsername : " + inSignUp.getUsername());
        log.info("isExistUsername : " + exist);


        return new ResponseEntity<>(!exist, HttpStatus.OK);
    }

    /**
     * isDuplicateNickname
     *
     * 작성자 : 권혁하 <mindcypher97@gmail.com>
     * 닉네임 중복검사
     */
    @PostMapping(value = "/check/nickname")
    public ResponseEntity<?> isDuplicateNickname(@RequestBody InUser user){
        Boolean exist = userService.isDuplicateNickname(user.getNickname());

        log.info("request isExistNickname : " + user.getNickname());
        log.info("isExistNickname : " + exist);
        log.info("success : \"/api/user/check/nickname\"");

        return new ResponseEntity<>(!exist, HttpStatus.OK);
    }

    @PostMapping(value = "/update/check/nickname")
    public ResponseEntity<?> isDuplicateNicknameInUpdate(@AuthenticationPrincipal int id, @RequestBody InUser user){

        Boolean exist = userService.isDuplicateNicknameInUpdate(id, user.getNickname());

        log.info("success : \"/api/user/update/check/nickname\"");

        return new ResponseEntity<>(!exist, HttpStatus.OK);
    }


    /**
     * signUp
     *
     * 작성자 : 권혁하 <mindcypher97@gmail.com>
     * InSignUp 데이터를 받아 회원가입을 시키고
     * 이후 SignUp을 시킴 -- 자동로그인 기능
     */
    @PostMapping(value = "/signup")
    public ResponseEntity<?> signUp(@RequestBody InUser user) {
        try{
            /**
             * 수신한 데이터의 유효성을 판별하는 로직
             */
            if(user == null || user.getUsername() == null || user.getPassword() == null) {
                if(user == null) {
                    log.error("Signup Error insignup");
                    throw new RuntimeException("UserController registerUser inSignUp");
                }else if(user.getUsername() == null) {
                    log.error("Signup Error insignup.username");
                    throw new RuntimeException("UserController registerUser inSignUp.username");
                }else if(user.getPassword() == null) {
                    log.error("Signup Error insignup.password");
                    throw new RuntimeException("UserController registerUser inSignUp.password");
                }
            }

            /**
             * 회원가입시 자동으로 로그인이 가능하도록
             * builder 패턴을 이용하여
             * 로그인에 필요한 데이터 생성
             */
            InUser inSignIn = InUser.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .build();

            /**
             * ㅎ
             */
            userService.signUp(user);

            ResponseEntity<?> response = signIn(inSignIn);

            return response;
//            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            log.error("Signup Error");
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    /**
     * signIn
     *
     * 작성자 : 권혁하 <mindcypher97@gmail.com>
     * InSignIn 데이터를 받아 jwt 토큰을 발행
     */
    @PostMapping(value = "/signin")
    public ResponseEntity<?> signIn(@RequestBody InUser inUser) {
        HashMap<String, Object> response = new HashMap<>();

        InUser user = userService.signIn(inUser.getUsername(), inUser.getPassword());

        /**
         * 해당 유저가 존재하는지 확인
         */
        if(user != null) {
            /**
             * 존재하는 유저일시 token 을 발급해준다.
             */
            final String token = tokenProvider.create(Integer.toString(user.getId()));

            response.put("id", user.getId());
            response.put("nickname", user.getNickname());
            response.put("src_photo", user.getSrc_photo());
            response.put("rank", user.getRank());
            response.put("token", token);
            log.info("data : {}", response);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }else {
            /**
             * 아이디, 비밀번호가 일치하는 회원이 존재하지 않을시
             * not found 에러를 반환해준다.
             */
            log.error("not exist user");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * update
     *
     * 작성자 : 권혁하 <mindcypher97@gmail.com>
     * 회원정보 수정시 사용하는 메소드
     * UserEntity 타입으로 받아 jpa 를 통해 수정
     *
     * 주의사항 : view 에서 id 값이 필수적으로 포함되어 넘어와야함
     *
     */
    @PostMapping(value = "/update")
    public ResponseEntity<?> update(@AuthenticationPrincipal int id, @RequestBody InUser user) {

        userService.update(id, user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * disabled -- 회원탈퇴 로직
     *
     * 작성자 : 작성자 : 권혁하 <mindcypher97@gmail.com>
     *
     */
    @PostMapping(value = "/disabled")
    public ResponseEntity<?> disabled(@AuthenticationPrincipal int userId) {
        /**
         * AuthenticationPrincipal annotation 은 token spring security 에서 제공하는 인터페이스로,
         * token 의 subject 에 담겨있는 데이터를 자동으로 받아올 수 있다.
         */

        userService.disabled(userId);

        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

    /**
     * header 의 token 을 기반으로 사용자 탐색 이후
     * 회원정보 리턴
     *
     * 작성자 : 권혁하 <mindcypher97@gmail.com>
     *
     * parameter : 없음.
     */
    @GetMapping(value = "/whoami")
    public ResponseEntity<?> whoAmI(@AuthenticationPrincipal int userId) {
        HashMap<String, Object> response = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        InUser user = userService.whoAmI(userId);
        if(user == null) {
            status = HttpStatus.NOT_FOUND;
        }

        List<OutFollow> follower = followService.getFollower(userId);
        int followerCount = follower.size();

        List<OutFollow> following = followService.getFollowing(userId);
        int followingCount = following.size();

        response.putAll(user.convertToHashmap());
        response.put("follower", followerCount);
        response.put("following", followingCount);

        return new ResponseEntity<>(response, status);
    }

    @GetMapping(value = "/who/{id}")
    public ResponseEntity<?> whoid(@PathVariable String id) {
        System.out.println("flag1 : " + id);
        HashMap<String, Object> response = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        int followerCount = 0;
        int followingCount = 0;

        InUser user = userService.whoAmI(Integer.valueOf(id));
        if(user == null) {
            status = HttpStatus.NOT_FOUND;
        }

        List<OutFollow> follower = followService.getFollower(Integer.valueOf(id));
        if(follower != null) {
            followerCount = follower.size();
        }


        List<OutFollow> following = followService.getFollowing(Integer.valueOf(id));
        if(following != null){
            followingCount = following.size();
        }


        response.putAll(user.convertToHashmap());
        response.put("follower", followerCount);
        response.put("following", followingCount);

        return new ResponseEntity<>(response, status);
    }

    @PostMapping(value = "/check/pw")
    public ResponseEntity<?> passwordCheck(@AuthenticationPrincipal int id, @RequestBody JSONObject obj) {
        System.out.println("flag1: " + id);
        System.out.println("flag2: " + obj.get("password").toString());
        HttpStatus status = HttpStatus.OK;

        InUser user = userService.passwordCheck(id, obj.get("password").toString());
        System.out.println("flag6: " + user);
        if(user == null) {
            status = HttpStatus.CONFLICT;
        }

        return new ResponseEntity<>(user, status);
    }

    @PostMapping(value = "/manage")
    public ResponseEntity<?> manageUserList() {
        HttpStatus status = HttpStatus.OK;

        List<HashMap<String, Object>> response = new ArrayList<>();

        response = userService.getUserList();

        return new ResponseEntity<>(response, status);
    }

    @PostMapping(value = "/manage/update")
    public ResponseEntity<?> manageUpdate(@RequestBody List<HashMap<String, Object>> request) {

        System.out.println("list abc : " + request);

        userService.updateRank(request);

        HttpStatus status = HttpStatus.OK;


        return new ResponseEntity<>(status);
    }


    @PostMapping(value = "/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestBody Map<String, String> params, HttpServletResponse res) {
        HashMap<String, Object> response = new HashMap<>();

        String kakaoToken = params.get("token");
        log.info("kakaoToken : " + kakaoToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private String getKakaoToken(String kakaoCode) {
        try {
            URL url = new URL("https://kauth.kakao.com/oauth/token");

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

            StringBuilder builder = new StringBuilder();

            builder.append("grant_type=authorization_code");
            builder.append("&client_id=64d51fdf358d85de491940a4b5523cfd");
            builder.append("&redirect_uri=" + REDIRECT_URL + "/kakaoredirect");
            builder.append("&code=" + kakaoCode);

            writer.write(builder.toString());
            writer.flush();

            if( conn.getResponseCode() != 200 ) {
                log.info("connection : {}", conn);

                return null;
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String body = reader.readLine();



            try {
//                JSONObject jsonObject = JSONParser

            }catch (Exception e) {
                e.printStackTrace();
            }

            return null;
        } catch( Exception e ) {
            return null;
        }
    }
}
