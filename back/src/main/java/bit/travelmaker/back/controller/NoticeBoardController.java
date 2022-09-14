package bit.travelmaker.back.controller;

import bit.travelmaker.back.dto.in.InNotice;
import bit.travelmaker.back.dto.out.OutNotice;
import bit.travelmaker.back.dto.out.OutPackageCard;
import bit.travelmaker.back.service.NoticeBoardService;
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
@RequestMapping(value = "/api")
public class NoticeBoardController {

    @Autowired
    private NoticeBoardService noticeBoardService;

    @PostMapping(value = "/noticeboard")
    public ResponseEntity<?> noticeBoardList(@RequestBody final int category){
        HashMap<String, Object> response = new HashMap<>();

        List<OutNotice> outNotices = noticeBoardService.noticeBoardList(category);

        List<HashMap<String, Object>> noti = new ArrayList<>();

        for(int i = 0 ; i < outNotices.size() ; i++) {
            HashMap<String, Object> item = outNotices.get(i).convertToHashmap();

            noti.add(item);
        }

        return new ResponseEntity<>(noti, HttpStatus.OK);
    }
    @PostMapping(value = "/noticeandevent/{id}")
    public ResponseEntity<?> noticeBoardCount(@PathVariable final int id, @RequestBody final int viewCount){
        noticeBoardService.noticeBoardCount(id,viewCount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/eventboard")
    public ResponseEntity<?> eventBoardList(@RequestBody final int category){
        HashMap<String, Object> response = new HashMap<>();

        List<OutNotice> outNotices = noticeBoardService.noticeBoardList(category);

        List<HashMap<String, Object>> event = new ArrayList<>();

        for(int i = 0 ; i < outNotices.size() ; i++) {
            HashMap<String, Object> item = outNotices.get(i).convertToHashmap();

            event.add(item);
        }

        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @PostMapping(value = "/noticeandevent/insert")
    public ResponseEntity<?> insert(@RequestBody final InNotice inNotice){
        noticeBoardService.insert(inNotice);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/noticeandevent/delete")
    public ResponseEntity<?> delete(@RequestBody final Integer id){
        noticeBoardService.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}