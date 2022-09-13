package bit.travelmaker.back.controller;

import bit.travelmaker.back.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @PostMapping(value = "")
    public ResponseEntity<?> searchKeyword(@RequestBody HashMap<String, Object> req) {
        HttpStatus status = HttpStatus.OK;
        List<HashMap<String, Object>> noticeBoard = new ArrayList<>();
        List<HashMap<String, Object>> packageBoard = new ArrayList<>();
        List<HashMap<String, Object>> reviewBoard = new ArrayList<>();

        List<HashMap<String, Object>> resData = searchService.searching(req);

        for (HashMap<String, Object> item : resData) {
            switch ((Integer) item.get("category")) {
                case 1:
                    noticeBoard.add(item);
                    System.out.println("1");
                    break;
                case 2:
                    packageBoard.add(item);
                    System.out.println("2");
                    break;
                case 3:
                    reviewBoard.add(item);
                    System.out.println("3");
                    break;
            }
        }


        HashMap<String, Object> res = new HashMap<>();

        res.put("notice", noticeBoard);
        res.put("package", packageBoard);
        res.put("review", reviewBoard);

        return new ResponseEntity<>(res, status);
    }
}
