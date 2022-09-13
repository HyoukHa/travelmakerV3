package bit.travelmaker.back.controller;

import bit.travelmaker.back.service.NoticeBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/api")
public class NoticeBoardController {

    @Autowired
    private NoticeBoardService noticeBoardService;

    @PostMapping(value = "/noticeboard")
    public ResponseEntity<?> NoticeBoardList(@RequestBody final int category){

        return new ResponseEntity<>(noticeBoardService.NoticeBoardList(category), HttpStatus.OK);
    }
    @PostMapping(value = "/noticeboard/{id}")
    public ResponseEntity<?> NoticeBoardUpdate(@RequestParam final int id){

        return new ResponseEntity<>(noticeBoardService.NoticeBoardUpdate(id), HttpStatus.OK);
    }

    @PostMapping(value = "/eventboard")
    public ResponseEntity<?> EventBoardList(@RequestBody final int category){

        System.out.println("category : " + category);
        System.out.println(noticeBoardService.EventBoardList(category));

        return new ResponseEntity<>(noticeBoardService.EventBoardList(category), HttpStatus.OK);
    }

}