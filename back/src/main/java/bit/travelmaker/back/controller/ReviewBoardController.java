package bit.travelmaker.back.controller;

import bit.travelmaker.back.service.ReviewBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping(value = "/api/reviewboard")
public class ReviewBoardController {
    @Autowired
    private ReviewBoardService reviewBoardService;

    /**
     * 후기 게시판의 데이터를 전송해주는 메소드
     */
    @PostMapping(value = "/detail/{boardId}")
    public ResponseEntity<?> getDetailReview(@PathVariable int boardId) {
        HttpStatus status = HttpStatus.OK;

        return new ResponseEntity<>(status);
    }

    /**
     * 후기 게시판에 글을 작성하는 메소드
     * category는 자동으로 3
     */
    @PostMapping(value = "/write")
    public ResponseEntity<?> writeReview(@AuthenticationPrincipal int userId, @RequestBody HashMap<String, Object> req) {
        HttpStatus status = HttpStatus.OK;

        return new ResponseEntity<>(status);
    }
}
