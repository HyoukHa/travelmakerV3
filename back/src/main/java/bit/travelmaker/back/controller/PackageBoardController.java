package bit.travelmaker.back.controller;

import bit.travelmaker.back.dto.out.OutPackageCard;
import bit.travelmaker.back.service.PackageBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RestController
@RequestMapping(value = "/api/packageboard")
public class PackageBoardController {

    @Autowired
    private PackageBoardService packageBoardService;

    /**
     * 패키지 상세보기 요청시 데이터를 전송해주는 메소드
     */
    @GetMapping(value = "/detail/{boardId}")
    public ResponseEntity<?> getDetailPackage(@PathVariable int boardId) {
        log.info("/api/packageboard/deatil/{}");
        HttpStatus status = HttpStatus.OK;

        HashMap<String, Object> res = packageBoardService.getDetailPackage(boardId);

        Integer current_to = packageBoardService.joinCount(boardId);

        res.put("current_to", current_to);

        return new ResponseEntity<>(res, status);
    }


    /**
     * 패키지 게시판에서 패키지 카드를 구성하기 위한 데이터를 전송해주는 메소드
     */
    @GetMapping(value = "/{pageNum}")
    public ResponseEntity<?> getPackageCardList(@PathVariable int pageNum){
        log.info("/api/packageboard/{}");
        HashMap<String, Object> response = new HashMap<>();

        List<OutPackageCard> packageData = packageBoardService.getPackageList(pageNum);
        int count = packageBoardService.packageCount();

        List<HashMap<String, Object>> packages = new ArrayList<>();

        for(int i = 0 ; i < packageData.size() ; i++) {
            HashMap<String, Object> item = packageData.get(i).convertToHashmap();
            System.out.println(item);

            Integer packageId = packageData.get(i).getId();

            Integer joinCount = packageBoardService.joinCount(packageId);
            item.put("current_to", joinCount);

            packages.add(item);
        }

        response.put("count", count);
        response.put("packageData", packages);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 패키지 게시판에 글을 작성하는 메소드
     */
    @PostMapping(value = "/write")
    public ResponseEntity<?> writePackage(@AuthenticationPrincipal int userId ,@RequestBody HashMap<String, Object> req) {
        log.info("/api/packageboard/write");
        HttpStatus status = HttpStatus.OK;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, (Integer)req.get("year"));
        calendar.set(Calendar.MONTH, (Integer)req.get("month"));
        calendar.set(Calendar.DATE, (Integer)req.get("day"));
        Date date = calendar.getTime();

        System.out.println(date);

        req.put("startdate", date);

        req.put("userId", userId);

        System.out.println(req);

        Integer res = packageBoardService.writePackageBoard(req);

        return new ResponseEntity<>(res, status);
    }

    /**
     * 패키지 참여 버튼을 누르면 사용되는 메소드
     * Boolean 값을 리턴한다.
     */
    @PostMapping(value = "/join")
    public ResponseEntity<?> joinPackage(@AuthenticationPrincipal int userId, @RequestBody int packageId) {
        log.info("/api/packageboard/join");
        HttpStatus status = HttpStatus.OK;

        HashMap<String, Integer> req = new HashMap<>();

        req.put("userId", userId);
        req.put("packageId", packageId);

        HashMap<String, Object> res = new HashMap<>();
        Boolean isJoin = packageBoardService.doJoin(req);
        Integer current_to = packageBoardService.joinCount(packageId);
        res.put("isJoin", isJoin);
        res.put("current_to", current_to);

        return new ResponseEntity<>(res, status);
    }

    /**
     * packageboard/detail 페이지에 들어갔을때 로그인이 되어있다면 호출되는 메소드
     * 현재 사용자가 해당 패키지에 참여하고 있는지 여부를 확인해준다.
     */
    @PostMapping(value = "/isjoin")
    public ResponseEntity<?> isJoin(@AuthenticationPrincipal int userId, @RequestBody int packageId) {
        log.info("/api/packageboard/isjoin");
        HttpStatus status = HttpStatus.OK;

        HashMap<String, Integer> req = new HashMap<>();

        req.put("userId", userId);
        req.put("packageId", packageId);

        System.out.println(req);
        Boolean res = packageBoardService.isJoin(req);
        System.out.println(res);

        return new ResponseEntity<>(res, status);
    }

    @PostMapping(value = "/wish")
    public ResponseEntity<?> doWish(@AuthenticationPrincipal int userId, @RequestBody int boardId) {
        log.info("/api/packageboard/wish");
        HttpStatus status = HttpStatus.OK;

        HashMap<String, Object> req = new HashMap<>();

        req.put("userId", userId);
        req.put("boardId", boardId);

        Boolean res = packageBoardService.doWish(req);
        System.out.println(res);

        return new ResponseEntity<>(res, status);
    }

    @PostMapping(value = "/iswish")
    public ResponseEntity<?> isWish(@AuthenticationPrincipal int userId, @RequestBody List<Integer> req) {
        log.info("/api/packageboard/iswish");
        HttpStatus status = HttpStatus.OK;

        System.out.println("req");
        System.out.println(req);

        List<Integer> reqForm = new ArrayList<>();

        for (Integer i : req) {
            reqForm.add(i);
        }

        HashMap<String, Object> reqData = new HashMap<>();

        reqData.put("userId", userId);
        reqData.put("boardList", reqForm);

        List<HashMap<String, Object>> resData = packageBoardService.isWish(reqData);

        List<Integer> res = new ArrayList<>();

        for (HashMap<String, Object> item : resData) {
            res.add((Integer) item.get("boardid"));
        }
        System.out.println("res");
        System.out.println(res);


//        for(Integer i : req) {
////            packageBoardService.
//        }

        return new ResponseEntity<>(res, status);
    }

    @GetMapping(value = "/my/{userId}")
    public ResponseEntity<?> getMyPackageList(@PathVariable int userId) {
        log.info("/api/packageboard/my/{}");
        HttpStatus status = HttpStatus.OK;

        List<OutPackageCard> res = packageBoardService.getMyPackageList(userId);

        return new ResponseEntity<>(res, status);
    }

    @GetMapping(value = "/popular")
    public ResponseEntity<?> getPopularPackageList(){
        HttpStatus status = HttpStatus.OK;

        List<HashMap<String, Object>> res = packageBoardService.getPopularPackageList();

        return new ResponseEntity<>(res, status);
    }

    @GetMapping(value = "/joinpackage")
    public ResponseEntity<?> joinPackage(@AuthenticationPrincipal int userId) {
        log.info("/api/packageboard/joinpackage");
        HttpStatus status = HttpStatus.OK;

        List<HashMap<String, Object>> res = packageBoardService.joinPackageList(userId);
        System.out.println(res);

        return new ResponseEntity<>(res, status);
    }
}
