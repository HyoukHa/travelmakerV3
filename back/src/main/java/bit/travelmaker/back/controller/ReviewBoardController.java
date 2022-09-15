package bit.travelmaker.back.controller;

import bit.travelmaker.back.dto.out.OutPackageCard;
import bit.travelmaker.back.dto.out.OutReviewCard;
import bit.travelmaker.back.service.ReviewBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/reviewboard")
public class ReviewBoardController {
    @Autowired
    private ReviewBoardService reviewBoardService;

    /**
     * 후기 게시판의 데이터를 전송해주는 메소드
     */
    @GetMapping(value = "/detail/{reviewId}")
    public ResponseEntity<?> getDetailReview(@PathVariable int reviewId) {
        HttpStatus status = HttpStatus.OK;

        HashMap<String, Object> res = reviewBoardService.getDetailReview(reviewId);

        System.out.println("here");
        System.out.println(res);

        return new ResponseEntity<>(res, status);
    }

    /**
     * 후기 게시판에 글을 작성하는 메소드
     * category는 자동으로 3
     */
    @PostMapping(value = "/write")
    public ResponseEntity<?> writeReview(@AuthenticationPrincipal int userId, @RequestBody HashMap<String, Object> req) {
        HttpStatus status = HttpStatus.OK;

        System.out.println(req);

        req.put("userId", userId);

        Integer res = reviewBoardService.writeReview(req);

        return new ResponseEntity<>(res, status);
    }

    @GetMapping(value = "/{pageNum}")
    public ResponseEntity<?> getReviewCardList(@PathVariable int pageNum) {
        HashMap<String, Object> response = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        List<OutReviewCard> reviewData = reviewBoardService.getReviewList(pageNum);
        Integer count = reviewBoardService.reviewCount();

        List<HashMap<String, Object>> packages = new ArrayList<>();

        System.out.println("flag1");
        System.out.println(reviewData);
        for(int i = 0 ; i < reviewData.size() ; i++) {
            HashMap<String, Object> item = reviewData.get(i).convertToHashmap();

            packages.add(item);
        }

        System.out.println(reviewData);
        System.out.println(reviewData.size());

        response.put("reviewData", packages);
        response.put("count", count);

        return new ResponseEntity<>(response, status);
    }
}
