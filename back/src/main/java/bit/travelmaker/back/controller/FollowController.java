package bit.travelmaker.back.controller;

import bit.travelmaker.back.dto.common.Follow;
import bit.travelmaker.back.dto.out.OutFollow;
import bit.travelmaker.back.service.FollowService;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api")
public class FollowController {
    @Autowired
    private FollowService followService;

    @PostMapping(value = "/follow")
    public ResponseEntity<?> follow(@AuthenticationPrincipal int userId, @RequestBody JSONObject obj) {
        HttpStatus status = HttpStatus.OK;
        Follow follow = Follow.builder()
                .likeUserId(userId)
                .likedUserId(Integer.valueOf(obj.get("id").toString()))
                .build();

        Boolean success = followService.follow(follow);

        return new ResponseEntity<>(success, status);
    }

    /**
     * PathVariable = userid
     */
    @GetMapping(value = "/follower/{id}")
    public ResponseEntity<?> followerList(@PathVariable String id) {
        HttpStatus status = HttpStatus.OK;

        List<OutFollow> followList = followService.getFollower(Integer.valueOf(id));

        return new ResponseEntity<>(followList, status);
    }

    @GetMapping(value = "/following/{id}")
    public ResponseEntity<?> followingList(@PathVariable String id) {
        HttpStatus status = HttpStatus.OK;

        List<OutFollow> followList = followService.getFollowing(Integer.valueOf(id));

        return new ResponseEntity<>(followList, status);
    }
}
